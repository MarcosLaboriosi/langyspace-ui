import { createHash } from 'node:crypto'
import { readFile, readdir, writeFile } from 'node:fs/promises'
import { relative, resolve } from 'node:path'
import ts from 'typescript'

const root = resolve(import.meta.dirname, '..')
const reportPath = resolve(root, 'quality/public-api.json')
const shouldWrite = process.argv.includes('--write')

async function collectDeclarations(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const path = resolve(directory, entry.name)
      if (entry.isDirectory()) return collectDeclarations(path)
      return entry.name.endsWith('.d.ts') ? [path] : []
    }),
  )

  return nested.flat()
}

const entrypointPath = resolve(root, 'src/index.ts')
const entrypoint = await readFile(entrypointPath, 'utf8')
const sourceFile = ts.createSourceFile(
  entrypointPath,
  entrypoint,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TS,
)
const exportsByKind = { types: [], values: [] }

for (const statement of sourceFile.statements) {
  if (!ts.isExportDeclaration(statement)) continue
  if (!statement.exportClause || !ts.isNamedExports(statement.exportClause))
    continue

  for (const element of statement.exportClause.elements) {
    const kind = statement.isTypeOnly || element.isTypeOnly ? 'types' : 'values'
    exportsByKind[kind].push(element.name.text)
  }
}

exportsByKind.types.sort()
exportsByKind.values.sort()

const declarationFiles = (
  await collectDeclarations(resolve(root, 'dist'))
).sort()
const declarations = {}

for (const file of declarationFiles) {
  const source = (await readFile(file, 'utf8')).replace(
    /\n\/\/# sourceMappingURL=.*$/,
    '',
  )
  declarations[relative(root, file)] = createHash('sha256')
    .update(source)
    .digest('hex')
}

const report = `${JSON.stringify(
  {
    declarations,
    entrypoint: exportsByKind,
    schemaVersion: 1,
  },
  null,
  2,
)}\n`

if (shouldWrite) {
  await writeFile(reportPath, report)
  console.log(`Public API report written: ${relative(root, reportPath)}`)
} else {
  const expected = await readFile(reportPath, 'utf8')
  if (expected !== report) {
    throw new Error(
      'public_api_changed: review SemVer, then run pnpm run write:api and commit the report',
    )
  }
  console.log(
    `Public API report passed: ${exportsByKind.values.length} values, ${exportsByKind.types.length} types, ${declarationFiles.length} declarations.`,
  )
}
