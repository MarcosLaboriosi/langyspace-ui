import { execFileSync } from 'node:child_process'
import {
  copyFile,
  mkdtemp,
  mkdir,
  readFile,
  readdir,
  rm,
  writeFile,
} from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = resolve(import.meta.dirname, '..')
const externalPackageSpec = process.argv
  .slice(2)
  .find((argument) => argument !== '--')
const smokeRoot = await mkdtemp(join(tmpdir(), 'langyspace-ui-smoke-'))
const packageDirectory = join(smokeRoot, 'package')
const consumerDirectory = join(smokeRoot, 'consumer')

function run(command, args, cwd) {
  execFileSync(command, args, {
    cwd,
    env: { ...process.env, CI: '1' },
    stdio: 'inherit',
  })
}

async function createLocalPackageSpec() {
  await mkdir(packageDirectory, { recursive: true })
  run('pnpm', ['pack', '--pack-destination', packageDirectory], root)

  const tarballs = (await readdir(packageDirectory)).filter((file) =>
    file.endsWith('.tgz'),
  )

  if (tarballs.length !== 1) {
    throw new Error(`expected_one_package_tarball_received_${tarballs.length}`)
  }

  return pathToFileURL(join(packageDirectory, tarballs[0])).href
}

async function writeConsumer(packageSpec) {
  await mkdir(join(consumerDirectory, 'src'), { recursive: true })
  await writeFile(
    join(consumerDirectory, 'package.json'),
    `${JSON.stringify(
      {
        name: 'langyspace-ui-smoke-consumer',
        private: true,
        type: 'module',
        scripts: { build: 'tsc -b && vite build' },
        dependencies: {
          '@langyspace/ui': packageSpec,
          react: '19.2.5',
          'react-dom': '19.2.5',
          'styled-components': '^6.4.0',
        },
        devDependencies: {
          '@types/react': '19.2.14',
          '@types/react-dom': '19.2.3',
          '@vitejs/plugin-react': '6.0.1',
          typescript: '6.0.2',
          vite: '8.0.9',
        },
      },
      null,
      2,
    )}\n`,
  )
  await writeFile(
    join(consumerDirectory, 'index.html'),
    '<!doctype html><html><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>\n',
  )
  await writeFile(
    join(consumerDirectory, 'src', 'main.tsx'),
    `import { Button, Pressable } from '@langyspace/ui'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <>
    <Button iconEnd={<span aria-hidden="true">→</span>} tone="brand">
      Package smoke passed
    </Button>
    <Pressable aria-pressed="false">Pressable smoke passed</Pressable>
  </>,
)
`,
  )
  await writeFile(
    join(consumerDirectory, 'tsconfig.json'),
    `${JSON.stringify(
      {
        compilerOptions: {
          isolatedModules: true,
          jsx: 'react-jsx',
          lib: ['ES2024', 'DOM', 'DOM.Iterable'],
          module: 'ESNext',
          moduleResolution: 'Bundler',
          noEmit: true,
          skipLibCheck: true,
          strict: true,
          target: 'ES2022',
        },
        include: ['src', 'vite.config.ts'],
      },
      null,
      2,
    )}\n`,
  )
  await writeFile(
    join(consumerDirectory, 'vite.config.ts'),
    `import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({ plugins: [react()] })
`,
  )
}

try {
  const packageSpec = externalPackageSpec ?? (await createLocalPackageSpec())

  await writeConsumer(packageSpec)
  await copyFile(
    join(root, 'scripts', 'ssr-smoke-consumer.mjs'),
    join(consumerDirectory, 'ssr-smoke.mjs'),
  )
  run(
    'pnpm',
    ['install', '--ignore-scripts', '--no-frozen-lockfile'],
    consumerDirectory,
  )
  run(
    'node',
    ['--input-type=module', '--eval', "await import('@langyspace/ui')"],
    consumerDirectory,
  )
  run('node', ['ssr-smoke.mjs'], consumerDirectory)
  run('pnpm', ['run', 'build'], consumerDirectory)

  const assetDirectory = join(consumerDirectory, 'dist', 'assets')
  const assets = await readdir(assetDirectory)
  const cssFiles = assets.filter((file) => file.endsWith('.css'))
  const javascriptFiles = assets.filter((file) => file.endsWith('.js'))
  const javascript = (
    await Promise.all(
      javascriptFiles.map((file) =>
        readFile(join(assetDirectory, file), 'utf8'),
      ),
    )
  ).join('\n')

  if (cssFiles.length > 0) {
    throw new Error('unexpected_css_asset_in_styled_components_consumer')
  }

  if (!javascript.includes('lsui-sc-button')) {
    throw new Error('shared_button_runtime_missing_from_consumer_build')
  }

  if (!javascript.includes('lsui-sc-pressable')) {
    throw new Error('shared_pressable_runtime_missing_from_consumer_build')
  }

  console.log(
    `Package smoke passed for ${externalPackageSpec ? 'external release' : 'local tarball'}.`,
  )
} finally {
  await rm(smokeRoot, { force: true, recursive: true })
}
