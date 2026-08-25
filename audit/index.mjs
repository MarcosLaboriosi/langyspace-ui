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

function validateExpiry(exception, label, config, warnings) {
  if (!exception.expiresAt) {
    if (config.requireExceptionExpiry) {
      throw new Error(`${label} entries require expiresAt in YYYY-MM-DD format`)
    }
    warnings.push(
      `${label}:${exception.path}: missing expiresAt; it will be required in the next audit major`,
    )
    return
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(exception.expiresAt)) {
    throw new Error(`${label} expiresAt must use YYYY-MM-DD format`)
  }

  const today = config.today ?? new Date().toISOString().slice(0, 10)
  if (exception.expiresAt < today) {
    throw new Error(
      `${label} exception expired on ${exception.expiresAt}: ${exception.path}`,
    )
  }
}

function exceptionPaths(exceptions, label, config, warnings) {
  const paths = new Set()

  for (const exception of exceptions ?? []) {
    if (!exception.path || !exception.reason || !exception.owner) {
      throw new Error(`${label} entries require exact path, reason and owner`)
    }
    validateExpiry(exception, label, config, warnings)
    paths.add(exception.path)
  }

  return paths
}

function descendantOverrideKeys(exceptions, config, warnings) {
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
    validateExpiry(
      exception,
      'allowedDescendantActionOverrides',
      config,
      warnings,
    )
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
  const diagnostics = []
  const warnings = []
  const report = ({
    index = 0,
    message,
    remediation,
    ruleId,
    source,
    path,
  }) => {
    const diagnostic = {
      line: lineAt(source, index),
      message,
      path,
      remediation,
      ruleId,
    }
    diagnostics.push(diagnostic)
    failures.push(
      `[${ruleId}] ${path}:${diagnostic.line} ${message}. Remediation: ${remediation}`,
    )
  }
  const allowedDirectButtonImports = exceptionPaths(
    config.allowedDirectButtonImports,
    'allowedDirectButtonImports',
    config,
    warnings,
  )
  const allowedDomainMotion = exceptionPaths(
    config.allowedDomainMotion,
    'allowedDomainMotion',
    config,
    warnings,
  )
  const nativeButtonOwners = exceptionPaths(
    config.nativeButtonOwners,
    'nativeButtonOwners',
    config,
    warnings,
  )
  const spinnerOwners = exceptionPaths(
    config.spinnerOwners,
    'spinnerOwners',
    config,
    warnings,
  )
  const allowedDescendantActionOverrides = descendantOverrideKeys(
    config.allowedDescendantActionOverrides,
    config,
    warnings,
  )
  const canonicalNames = config.canonicalComponents ?? ['Button', 'IconButton']
  const canonicalDescendantPattern =
    />\s*(?:button|a)(?:[^,{]*)\s*\{([\s\S]*?)\}/g

  for (const file of files) {
    const source = await readFile(file, 'utf8')
    const sourcePath = relative(root, file)
    const localCanonicalNames = new Set(canonicalNames)

    for (const importMatch of source.matchAll(
      /import\s+(?:type\s+)?\{([\s\S]*?)\}\s+from\s+['"]@langyspace\/ui['"]/g,
    )) {
      for (const canonicalName of canonicalNames) {
        const alias = new RegExp(
          `(?:^|,)\\s*${canonicalName}\\s+as\\s+([A-Za-z_$][\\w$]*)`,
        ).exec(importMatch[1])?.[1]
        if (alias) localCanonicalNames.add(alias)
      }
    }

    const canonicalAlternation = [...localCanonicalNames]
      .map((name) => name.replaceAll('$', '\\$'))
      .join('|')
    const canonicalWrapperPattern = new RegExp(
      `styled\\((${canonicalAlternation})\\)(?:\\.attrs\\([\\s\\S]*?\\))?(?:<[^\\x60]*>)?\\x60([\\s\\S]*?)\\x60`,
      'g',
    )

    const spinnerMatch = /rotate\(\s*360deg\s*\)/.exec(source)
    if (spinnerMatch && !spinnerOwners.has(sourcePath)) {
      report({
        index: spinnerMatch.index,
        message: 'local wait spinner',
        path: sourcePath,
        remediation: 'use Spinner or Button isLoading from @langyspace/ui',
        ruleId: 'LSUI001',
        source,
      })
    }

    const motionMatch = /(?:\bkeyframes\s*`|@keyframes\s+[\w-]+)/.exec(source)
    if (
      motionMatch &&
      !allowedDomainMotion.has(sourcePath) &&
      !spinnerOwners.has(sourcePath)
    ) {
      report({
        index: motionMatch.index,
        message: 'unclassified motion',
        path: sourcePath,
        remediation:
          'add exact path, reason, owner and expiresAt to allowedDomainMotion',
        ruleId: 'LSUI002',
        source,
      })
    }

    for (const match of source.matchAll(/<button(?=[\s>])/g)) {
      if (!nativeButtonOwners.has(sourcePath)) {
        report({
          index: match.index,
          message: 'native JSX button',
          path: sourcePath,
          remediation:
            'compose the approved local action or Pressable boundary',
          ruleId: 'LSUI003',
          source,
        })
      }
    }

    for (const match of source.matchAll(/styled\.button\b/g)) {
      if (!nativeButtonOwners.has(sourcePath)) {
        report({
          index: match.index,
          message: 'styled.button declaration',
          path: sourcePath,
          remediation: 'style Pressable or an approved action component',
          ruleId: 'LSUI003',
          source,
        })
      }
    }

    const privateImportMatch = /from\s+['"]@langyspace\/ui\/(?!audit['"])/.exec(
      source,
    )
    if (privateImportMatch) {
      report({
        index: privateImportMatch.index,
        message: 'private @langyspace/ui import',
        path: sourcePath,
        remediation: 'use the package public entrypoint',
        ruleId: 'LSUI004',
        source,
      })
    }

    const packageImports = source.matchAll(
      /(?:import|export)\s+(?:type\s+)?(?:\{([\s\S]*?)\}|[^'"]+)\s+from\s+['"]@langyspace\/ui['"]/g,
    )
    for (const match of packageImports) {
      if (
        /\bButton(?:\s+as\s+\w+)?\b/.test(match[1] ?? match[0]) &&
        !allowedDirectButtonImports.has(sourcePath)
      ) {
        report({
          index: match.index,
          message: 'direct Button import bypasses this product boundary',
          path: sourcePath,
          remediation: 'use the approved local composition',
          ruleId: 'LSUI005',
          source,
        })
      }
    }

    const removedPropMatch = new RegExp(
      `<(?:${canonicalAlternation})\\b[^>]*\\b(?:iconOnly|shape|tone)\\s*=`,
    ).exec(source)
    if (removedPropMatch) {
      report({
        index: removedPropMatch.index,
        message: 'Button uses a removed action prop',
        path: sourcePath,
        remediation: 'select Button or IconButton directly',
        ruleId: 'LSUI006',
        source,
      })
    }

    const copiedUnionMatch =
      /type\s+\w*Button\w*\s*=\s*(?!Extract\b|Exclude\b|Pick\b|Omit\b)(?=[^;]*['"]primary['"])(?=[^;]*['"]secondary['"])[^;]+/.exec(
        source,
      )
    if (copiedUnionMatch) {
      report({
        index: copiedUnionMatch.index,
        message: 'copied Button union',
        path: sourcePath,
        remediation: 'derive it from the public @langyspace/ui types',
        ruleId: 'LSUI007',
        source,
      })
    }

    for (const match of source.matchAll(canonicalWrapperPattern)) {
      const declaration = match[2]
        .match(forbiddenRecipeDeclaration)?.[0]
        ?.trim()
      if (declaration) {
        report({
          index: match.index,
          message: `styled(${match[1]}) overrides canonical recipe with ${declaration}`,
          path: sourcePath,
          remediation:
            'keep local styles to external layout or request a semantic variant',
          ruleId: 'LSUI008',
          source,
        })
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
          report({
            index: match.index,
            message: `descendant action selector overrides canonical recipe with ${declaration}`,
            path: sourcePath,
            remediation:
              'remove the override or register an exact temporary exception',
            ruleId: 'LSUI009',
            source,
          })
        }
      }
    }

    for (const rule of config.additionalRules ?? []) {
      const match = rule.pattern.exec(source)
      rule.pattern.lastIndex = 0
      if (match)
        report({
          index: match.index,
          message: rule.message,
          path: sourcePath,
          remediation:
            rule.remediation ?? 'follow the configured project policy',
          ruleId: rule.id ?? 'LSUI099',
          source,
        })
    }

    if (config.auditPrivateStyles) {
      for (const match of source.matchAll(/from\s+['"]([^'"]+\/styles)['"]/g)) {
        const importedStyles = resolve(dirname(file), match[1])
        if (dirname(importedStyles) !== dirname(file)) {
          report({
            index: match.index,
            message: "component imports another component's private styles",
            path: sourcePath,
            remediation: 'use its public entrypoint',
            ruleId: 'LSUI010',
            source,
          })
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
        report({
          index: match.index,
          message: `${ownerLayer} cannot depend on the higher ${dependencyLayer} layer`,
          path: sourcePath,
          remediation:
            'move the shared contract down or invert the composition owner',
          ruleId: 'LSUI011',
          source,
        })
      }
    }
  }

  return {
    diagnostics,
    failures,
    files: files.map((file) => relative(root, file)),
    warnings,
  }
}
