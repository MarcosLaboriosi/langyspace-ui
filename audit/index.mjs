import { readdir, readFile } from 'node:fs/promises'
import { dirname, extname, relative, resolve } from 'node:path'

const sourceExtensions = new Set(['.js', '.jsx', '.ts', '.tsx'])
const ignoredSource = /(?:^|\/)[^/]+\.(?:test|spec)\.[cm]?[jt]sx?$|\.d\.ts$/
const forbiddenRecipeDeclaration =
  /^\s*(?:background(?:-color)?|border(?:-color|-radius|-style|-width)?|box-shadow|color|font-size|font-weight|height|max-height|min-height|opacity|padding(?:-bottom|-left|-right|-top)?)\s*:/m

export function defineAuditConfig(config) {
  return config
}

async function collectSourceFiles(directory, sourceRoot) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = resolve(directory, entry.name)

      if (entry.isDirectory()) return collectSourceFiles(path, sourceRoot)
      if (!sourceExtensions.has(extname(entry.name))) return []
      if (ignoredSource.test(relative(sourceRoot, path))) return []

      return [path]
    }),
  )

  return files.flat()
}

function exceptionPaths(exceptions, label) {
  const paths = new Set()

  for (const exception of exceptions ?? []) {
    if (!exception.path || !exception.reason || !exception.owner) {
      throw new Error(`${label} entries require exact path, reason and owner`)
    }
    paths.add(exception.path)
  }

  return paths
}

function descendantOverrideKeys(exceptions) {
  const keys = new Set()

  for (const exception of exceptions ?? []) {
    if (
      !exception.path ||
      !exception.selector ||
      !exception.reason ||
      !exception.owner
    ) {
      throw new Error(
        'allowedDescendantActionOverrides entries require exact path, selector, reason and owner',
      )
    }
    keys.add(`${exception.path}::${exception.selector}`)
  }

  return keys
}

function sourceLayer(path, sourceRoot, layerDependencies) {
  const [layer] = relative(sourceRoot, path).split('/')
  return layerDependencies?.[layer] ? layer : undefined
}

function lineAt(source, index) {
  return source.slice(0, index).split('\n').length
}

export async function auditArchitecture(config) {
  if (!config?.root) throw new Error('audit config requires an absolute root')

  const root = resolve(config.root)
  const sourceRoots = (config.sourceRoots ?? ['src']).map((path) =>
    resolve(root, path),
  )
  const files = (
    await Promise.all(
      sourceRoots.map((sourceRoot) =>
        collectSourceFiles(sourceRoot, sourceRoot),
      ),
    )
  ).flat()
  const failures = []
  const allowedDirectButtonImports = exceptionPaths(
    config.allowedDirectButtonImports,
    'allowedDirectButtonImports',
  )
  const allowedDomainMotion = exceptionPaths(
    config.allowedDomainMotion,
    'allowedDomainMotion',
  )
  const nativeButtonOwners = exceptionPaths(
    config.nativeButtonOwners,
    'nativeButtonOwners',
  )
  const spinnerOwners = exceptionPaths(config.spinnerOwners, 'spinnerOwners')
  const allowedDescendantActionOverrides = descendantOverrideKeys(
    config.allowedDescendantActionOverrides,
  )
  const canonicalNames = config.canonicalComponents ?? ['Button', 'IconButton']
  const canonicalAlternation = canonicalNames
    .map((name) => name.replaceAll('$', '\\$'))
    .join('|')
  const canonicalWrapperPattern = new RegExp(
    `styled\\((${canonicalAlternation})\\)(?:\\.attrs\\([\\s\\S]*?\\))?(?:<[^\\x60]*>)?\\x60([\\s\\S]*?)\\x60`,
    'g',
  )
  const canonicalDescendantPattern =
    />\s*(?:button|a)(?:[^,{]*)\s*\{([\s\S]*?)\}/g

  for (const file of files) {
    const source = await readFile(file, 'utf8')
    const sourcePath = relative(root, file)

    if (
      /rotate\(\s*360deg\s*\)/.test(source) &&
      !spinnerOwners.has(sourcePath)
    ) {
      failures.push(
        `${sourcePath}: local wait spinner; use Spinner or Button isLoading from @langyspace/ui`,
      )
    }

    if (
      /(?:\bkeyframes\s*`|@keyframes\s+[\w-]+)/.test(source) &&
      !allowedDomainMotion.has(sourcePath) &&
      !spinnerOwners.has(sourcePath)
    ) {
      failures.push(
        `${sourcePath}: unclassified motion; add exact path, reason and owner to allowedDomainMotion`,
      )
    }

    for (const match of source.matchAll(/<button(?=[\s>])/g)) {
      if (!nativeButtonOwners.has(sourcePath)) {
        failures.push(
          `${sourcePath}:${lineAt(source, match.index)}: native JSX button`,
        )
      }
    }

    for (const match of source.matchAll(/styled\.button\b/g)) {
      if (!nativeButtonOwners.has(sourcePath)) {
        failures.push(
          `${sourcePath}:${lineAt(source, match.index)}: styled.button declaration`,
        )
      }
    }

    if (/from\s+['"]@langyspace\/ui\//.test(source)) {
      failures.push(
        `${sourcePath}: private @langyspace/ui import; use the package public entrypoint`,
      )
    }

    const packageImports = source.matchAll(
      /(?:import|export)\s+(?:type\s+)?(?:\{([\s\S]*?)\}|[^'"]+)\s+from\s+['"]@langyspace\/ui['"]/g,
    )
    for (const match of packageImports) {
      if (
        /\bButton(?:\s+as\s+\w+)?\b/.test(match[1] ?? match[0]) &&
        !allowedDirectButtonImports.has(sourcePath)
      ) {
        failures.push(
          `${sourcePath}: direct Button import bypasses this product boundary; use the approved local composition`,
        )
      }
    }

    if (/<Button\b[^>]*\b(?:iconOnly|shape|tone)\s*=/.test(source)) {
      failures.push(
        `${sourcePath}: Button uses a removed action prop; select Button or IconButton directly`,
      )
    }

    if (
      /type\s+\w*Button\w*\s*=\s*(?!Extract\b|Exclude\b|Pick\b|Omit\b)(?=[^;\n]*['"]primary['"])(?=[^;\n]*['"]secondary['"])[^;\n]+/.test(
        source,
      )
    ) {
      failures.push(
        `${sourcePath}: copied Button union; derive it from the public @langyspace/ui types`,
      )
    }

    for (const match of source.matchAll(canonicalWrapperPattern)) {
      const declaration = match[2]
        .match(forbiddenRecipeDeclaration)?.[0]
        ?.trim()
      if (declaration) {
        failures.push(
          `${sourcePath}: styled(${match[1]}) overrides canonical recipe with ${declaration}`,
        )
      }
    }

    if (config.auditDescendantActions) {
      for (const match of source.matchAll(canonicalDescendantPattern)) {
        const declaration = match[1]
          .match(forbiddenRecipeDeclaration)?.[0]
          ?.trim()
        const selectorStart = source.lastIndexOf('\n', match.index) + 1
        const selectorEnd = source.indexOf('{', match.index)
        const selector = source.slice(selectorStart, selectorEnd).trim()
        if (
          declaration &&
          !allowedDescendantActionOverrides.has(`${sourcePath}::${selector}`)
        ) {
          failures.push(
            `${sourcePath}: descendant action selector overrides canonical recipe with ${declaration}`,
          )
        }
      }
    }

    for (const rule of config.additionalRules ?? []) {
      if (rule.pattern.test(source))
        failures.push(`${sourcePath}: ${rule.message}`)
    }

    if (config.auditPrivateStyles) {
      for (const match of source.matchAll(/from\s+['"]([^'"]+\/styles)['"]/g)) {
        const importedStyles = resolve(dirname(file), match[1])
        if (dirname(importedStyles) !== dirname(file)) {
          failures.push(
            `${sourcePath}: component imports another component's private styles; use its public entrypoint`,
          )
        }
      }
    }

    const sourceRoot = sourceRoots.find((candidate) =>
      file.startsWith(`${candidate}/`),
    )
    const ownerLayer = sourceRoot
      ? sourceLayer(file, sourceRoot, config.layerDependencies)
      : undefined
    if (!ownerLayer) continue

    for (const match of source.matchAll(/from\s+['"](\.[^'"]+)['"]/g)) {
      const dependencyLayer = sourceLayer(
        resolve(dirname(file), match[1]),
        sourceRoot,
        config.layerDependencies,
      )
      if (
        dependencyLayer &&
        !config.layerDependencies[ownerLayer].includes(dependencyLayer)
      ) {
        failures.push(
          `${sourcePath}: ${ownerLayer} cannot depend on the higher ${dependencyLayer} layer`,
        )
      }
    }
  }

  return { failures, files: files.map((file) => relative(root, file)) }
}
