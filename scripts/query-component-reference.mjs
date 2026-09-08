import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import ts from 'typescript'
import { publicComponentContracts } from '../quality/component-manifest.ts'

function usesComponent(source, exportName) {
  const localNames = new Set()
  const namespaces = new Set()
  for (const statement of source.statements) {
    if (
      !ts.isImportDeclaration(statement) ||
      !ts.isStringLiteral(statement.moduleSpecifier) ||
      statement.moduleSpecifier.text !== '@langyspace/ui' ||
      statement.importClause?.isTypeOnly
    )
      continue
    const bindings = statement.importClause?.namedBindings
    if (bindings && ts.isNamespaceImport(bindings)) {
      namespaces.add(bindings.name.text)
    } else if (bindings && ts.isNamedImports(bindings)) {
      for (const element of bindings.elements) {
        if (
          !element.isTypeOnly &&
          (element.propertyName ?? element.name).text === exportName
        ) {
          localNames.add(element.name.text)
        }
      }
    }
  }
  function visit(node) {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tag = node.tagName
      if (ts.isIdentifier(tag) && localNames.has(tag.text)) return true
      if (
        ts.isPropertyAccessExpression(tag) &&
        ts.isIdentifier(tag.expression) &&
        namespaces.has(tag.expression.text) &&
        tag.name.text === exportName
      )
        return true
    }
    return ts.forEachChild(node, visit)
  }
  return Boolean(visit(source))
}

function verifyConsumer(consumer, exportName, workspace) {
  const repositoryRoot = resolve(workspace, consumer.repository)
  const packageJson = JSON.parse(
    readFileSync(resolve(repositoryRoot, 'package.json'), 'utf8'),
  )
  const declaredDependency = packageJson.dependencies?.['@langyspace/ui']
  if (typeof declaredDependency !== 'string') {
    throw new Error(
      `Missing @langyspace/ui dependency: ${consumer.repository}/package.json`,
    )
  }
  const sourcePath = resolve(repositoryRoot, consumer.path)
  const source = ts.createSourceFile(
    sourcePath,
    readFileSync(sourcePath, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  )
  if (!usesComponent(source, exportName)) {
    throw new Error(
      `Missing runtime import and JSX use of ${exportName}: ${consumer.repository}/${consumer.path}`,
    )
  }
  return {
    ...consumer,
    verification: 'import_and_jsx_verified',
    declaredDependency,
    declaredVersion:
      declaredDependency.match(/\/releases\/download\/v([^/]+)\//)?.[1] ?? null,
  }
}

export function describeComponent(contract, workspace) {
  const reference = contract.reference
  return {
    exportName: contract.exportName,
    ownerPath: contract.ownerPath,
    propsPath: reference?.propsPath ?? null,
    documentation: reference
      ? `${reference.documentation.path}#${reference.documentation.anchor}`
      : null,
    story: contract.story,
    test: contract.test,
    consumerStatus: !reference
      ? 'not_inventoried'
      : reference.consumers.length === 0
        ? 'no_example_recorded'
        : 'examples_recorded',
    consumers: (reference?.consumers ?? []).map((consumer) =>
      workspace
        ? verifyConsumer(consumer, contract.exportName, workspace)
        : { ...consumer, verification: 'not_requested' },
    ),
  }
}

export function queryComponent(exportName, workspace) {
  const contract = publicComponentContracts.find(
    (candidate) => candidate.exportName === exportName,
  )
  if (!contract) throw new Error(`Unknown public component: ${exportName}`)
  return describeComponent(contract, workspace)
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  try {
    const [exportName, option, workspace, ...extra] = process.argv.slice(2)
    if (
      !exportName ||
      extra.length > 0 ||
      (option !== undefined &&
        (option !== '--workspace' || !workspace || workspace.startsWith('--')))
    ) {
      throw new Error(
        'Usage: node scripts/query-component-reference.mjs <Component> [--workspace <directory>]',
      )
    }
    console.log(JSON.stringify(queryComponent(exportName, workspace), null, 2))
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}
