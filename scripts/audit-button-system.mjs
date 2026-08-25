import { readdir, readFile } from 'node:fs/promises'
import { dirname, extname, relative, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const sourceRoot = resolve(root, 'src')
const sourceExtensions = new Set(['.js', '.jsx', '.ts', '.tsx'])
const ignoredSource = /(?:^|\/)[^/]+\.(?:test|spec)\.[cm]?[jt]sx?$|\.d\.ts$/
const spinnerOwner = 'src/Spinner/styles.ts'
const nativeButtonOwner = 'src/Pressable/styles.ts'

async function collectSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = resolve(directory, entry.name)

      if (entry.isDirectory()) return collectSourceFiles(path)
      if (!sourceExtensions.has(extname(entry.name))) return []
      if (ignoredSource.test(relative(sourceRoot, path))) return []

      return [path]
    }),
  )

  return files.flat()
}

const files = await collectSourceFiles(sourceRoot)
const failures = []

for (const file of files) {
  const source = await readFile(file, 'utf8')
  const sourcePath = relative(root, file)

  if (/rotate\(\s*360deg\s*\)/.test(source) && sourcePath !== spinnerOwner) {
    failures.push(
      `${sourcePath}: local wait spinner; compose the public Spinner atom`,
    )
  }

  if (/styled\.button\b/.test(source) && sourcePath !== nativeButtonOwner) {
    failures.push(`${sourcePath}: native button ownership belongs to Pressable`)
  }

  for (const match of source.matchAll(/from\s+['"]([^'"]+\/styles)['"]/g)) {
    const importedStyles = resolve(dirname(file), match[1])
    if (dirname(importedStyles) !== dirname(file)) {
      failures.push(
        `${sourcePath}: atom imports another atom's private styles; import its public entrypoint`,
      )
    }
  }
}

if (failures.length > 0) {
  console.error('Button architecture audit failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exitCode = 1
} else {
  console.log(
    `Button architecture audit passed: ${files.length} production files, atomic ownership preserved.`,
  )
}
