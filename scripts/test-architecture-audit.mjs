import assert from 'node:assert/strict'
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { auditArchitecture, defineAuditConfig } from '../audit/index.mjs'

const root = await mkdtemp(join(tmpdir(), 'langyspace-ui-audit-'))

try {
  await mkdir(join(root, 'src', 'atoms', 'Broken'), { recursive: true })
  await mkdir(join(root, 'src', 'foundations'), { recursive: true })
  await mkdir(join(root, 'src', 'molecules'), { recursive: true })
  await writeFile(
    join(root, 'src', 'atoms', 'Broken', 'index.tsx'),
    `import { Button } from '@langyspace/ui/private'
import { Higher } from '../../molecules/Higher'
import styled, { keyframes } from 'styled-components'

type BrokenButtonVariant = 'primary' | 'secondary'
const spin = keyframes\`to { transform: rotate(360deg); }\`
const Broken = styled(Button)\`border-radius: 3px;\`
const Parent = styled.div\`> button { height: 41px; }\`
export const Native = () => <button>Broken</button>
`,
  )
  await writeFile(
    join(root, 'src', 'molecules', 'Higher.ts'),
    'export const Higher = true\n',
  )
  await writeFile(
    join(root, 'src', 'foundations', 'tokens.ts'),
    'export const token = 1\n',
  )

  const result = await auditArchitecture(
    defineAuditConfig({
      root,
      sourceRoots: ['src'],
      canonicalComponents: ['Button'],
      auditDescendantActions: true,
      layerDependencies: {
        atoms: ['atoms', 'foundations'],
        foundations: ['foundations'],
        molecules: ['atoms', 'foundations', 'molecules'],
      },
    }),
  )
  const output = result.failures.join('\n')

  for (const expected of [
    'local wait spinner',
    'unclassified motion',
    'native JSX button',
    'private @langyspace/ui import',
    'copied Button union',
    'overrides canonical recipe',
    'descendant action selector',
    'atoms cannot depend on the higher molecules layer',
  ]) {
    assert.match(output, new RegExp(expected))
  }

  await assert.rejects(
    () =>
      auditArchitecture({
        root,
        allowedDomainMotion: [{ path: 'src/file.ts', reason: 'missing owner' }],
      }),
    /exact path, reason and owner/,
  )

  await assert.rejects(
    () =>
      auditArchitecture({
        root,
        allowedDescendantActionOverrides: [
          {
            owner: 'Missing selector fixture',
            path: 'src/file.ts',
            reason: 'selector is intentionally absent',
          },
        ],
      }),
    /exact path, selector, reason and owner/,
  )

  console.log(
    'Architecture audit negative fixtures passed: 10 contracts proved.',
  )
} finally {
  await rm(root, { force: true, recursive: true })
}
