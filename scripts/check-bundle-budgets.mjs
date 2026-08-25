import { gzipSync } from 'node:zlib'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { build } from 'vite'

const root = resolve(import.meta.dirname, '..')
const budgets = JSON.parse(
  await readFile(resolve(root, 'quality/budgets.json'), 'utf8'),
)
const peers = ['react', 'react-dom', 'react/jsx-runtime', 'styled-components']
const measurements = {}

function measure(code) {
  return {
    gzipBytes: gzipSync(code).byteLength,
    rawBytes: Buffer.byteLength(code),
  }
}

measurements.library = measure(await readFile(resolve(root, 'dist/index.js')))

for (const entry of ['actions', 'fields', 'molecules']) {
  const result = await build({
    build: {
      lib: {
        entry: resolve(root, `quality/bundle-entries/${entry}.ts`),
        formats: ['es'],
      },
      minify: true,
      rollupOptions: {
        external: peers,
        treeshake: { moduleSideEffects: false },
      },
      write: false,
    },
    configFile: false,
    logLevel: 'silent',
  })
  const output = Array.isArray(result)
    ? result.flatMap(({ output }) => output)
    : result.output
  const code = output
    .filter((item) => item.type === 'chunk')
    .map((item) => item.code)
    .join('\n')
  measurements[entry] = measure(code)
}

const failures = []
for (const [entry, measurement] of Object.entries(measurements)) {
  for (const metric of ['rawBytes', 'gzipBytes']) {
    const budget = budgets[metric][entry]
    if (measurement[metric] > budget) {
      failures.push(
        `${entry}.${metric} ${measurement[metric]} exceeds budget ${budget}`,
      )
    }
  }
}

const reportDirectory = resolve(root, '.local/quality')
await mkdir(reportDirectory, { recursive: true })
await writeFile(
  resolve(reportDirectory, 'bundle-report.json'),
  `${JSON.stringify({ budgets, measurements }, null, 2)}\n`,
)

if (failures.length > 0) {
  throw new Error(`bundle_budget_failed:\n${failures.join('\n')}`)
}

console.log('Bundle budgets passed:', measurements)
