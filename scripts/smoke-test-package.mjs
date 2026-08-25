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
    `import { ActionLink, AuthNotice, AuthTokenDigits, Button, EmptyState, FieldRoot, FilterPills, IconButton, LoadingState, Pressable, SearchInput, SegmentedControl, Spinner, StatePanel, StatusChip, TextInput } from '@langyspace/ui'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <>
    <Button iconEnd={<span aria-hidden="true">→</span>} variant="brand">
      Package smoke passed
    </Button>
    <ActionLink href="/next" iconEnd={<span aria-hidden="true">→</span>}>
      ActionLink smoke passed
    </ActionLink>
    <IconButton aria-label="Open menu">
      <span aria-hidden="true">+</span>
    </IconButton>
    <Pressable aria-pressed="false">Pressable smoke passed</Pressable>
    <Spinner size="md" />
    <StatusChip indicator tone="success">Package status passed</StatusChip>
    <EmptyState title="Package empty state passed" />
    <LoadingState title="Package loading state passed" />
    <StatePanel state="error" title="Package error state passed" />
    <FieldRoot label="Name"><TextInput defaultValue="Maria" /></FieldRoot>
    <SearchInput aria-label="Search" defaultValue="Maria" />
    <FilterPills aria-label="Filters" options={[{ label: 'All', value: 'all' }]} value="all" onChange={() => undefined} />
    <SegmentedControl aria-label="Range" options={[{ label: '30 days', value: '30' }]} value="30" onChange={() => undefined} />
    <AuthTokenDigits aria-label="Code" autoFocus={false} digitLabel="Digit" idPrefix="code" length={4} onTokenChange={() => undefined} />
    <AuthNotice tone="info">Package auth notice passed</AuthNotice>
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
  await writeFile(
    join(consumerDirectory, 'audit.config.mjs'),
    `import { defineAuditConfig } from '@langyspace/ui/audit'

export default defineAuditConfig({
  root: import.meta.dirname,
  allowedDirectButtonImports: [
    {
      owner: 'Smoke consumer',
      path: 'src/main.tsx',
      reason: 'direct package contract smoke',
    },
  ],
})
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
  run(
    'node',
    ['--input-type=module', '--eval', "await import('@langyspace/ui/audit')"],
    consumerDirectory,
  )
  run(
    'pnpm',
    ['exec', 'langyspace-ui-audit', 'audit.config.mjs'],
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

  if (!javascript.includes('lsui-sc-action-link')) {
    throw new Error('shared_action_link_runtime_missing_from_consumer_build')
  }

  if (!javascript.includes('lsui-sc-icon-button')) {
    throw new Error('shared_icon_button_runtime_missing_from_consumer_build')
  }

  if (!javascript.includes('lsui-sc-pressable')) {
    throw new Error('shared_pressable_runtime_missing_from_consumer_build')
  }

  if (!javascript.includes('lsui-sc-spinner')) {
    throw new Error('shared_spinner_runtime_missing_from_consumer_build')
  }

  if (!javascript.includes('lsui-sc-status-chip')) {
    throw new Error('shared_status_chip_runtime_missing_from_consumer_build')
  }

  if (!javascript.includes('lsui-sc-state-panel')) {
    throw new Error('shared_state_panel_runtime_missing_from_consumer_build')
  }

  for (const componentId of [
    'lsui-sc-auth-notice',
    'lsui-sc-auth-token-digits',
    'lsui-sc-field-root',
    'lsui-sc-filter-pills',
    'lsui-sc-search-input',
    'lsui-sc-segmented-control',
    'lsui-sc-text-input',
  ]) {
    if (!javascript.includes(componentId)) {
      throw new Error(`shared_component_runtime_missing_${componentId}`)
    }
  }

  console.log(
    `Package smoke passed for ${externalPackageSpec ? 'external release' : 'local tarball'}.`,
  )
} finally {
  await rm(smokeRoot, { force: true, recursive: true })
}
