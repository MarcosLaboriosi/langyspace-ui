import { readFileSync } from 'node:fs'
import { access } from 'node:fs/promises'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import {
  publicComponentContracts,
  type ComponentContract,
} from './component-manifest'

const root = resolve(import.meta.dirname, '..')

describe('public component manifest', () => {
  it('matches every public component value export', () => {
    const entrypoint = readFileSync(resolve(root, 'src/index.ts'), 'utf8')
    const componentExports = Array.from(
      entrypoint.matchAll(/^export \{ ([A-Z][A-Za-z0-9]*) \}/gm),
      ([, exportName]) => exportName,
    ).sort()
    const manifestExports = publicComponentContracts
      .map(({ exportName }) => exportName)
      .sort()

    expect(manifestExports).toEqual(componentExports)
    expect(new Set(manifestExports).size).toBe(manifestExports.length)
  })

  it('points every component at an owner in its declared layer', async () => {
    for (const contractValue of publicComponentContracts) {
      const contract: ComponentContract = contractValue
      expect(contract.ownerPath).toMatch(
        new RegExp(
          `^src/${contract.layer}s/${contract.exportName}/index\\.tsx$`,
        ),
      )
      await expect(
        access(resolve(root, contract.ownerPath)),
      ).resolves.toBeUndefined()
      expect(contract.runtimeMarker).toMatch(/^lsui-sc-[a-z-]+$/)
    }
  })

  it('keeps every known coverage gap explicitly owned by an epic task', async () => {
    for (const contractValue of publicComponentContracts) {
      const contract: ComponentContract = contractValue
      expect(contract.test.path).toBe(
        `src/${contract.layer}s/${contract.exportName}/${contract.exportName}.test.tsx`,
      )
      expect(contract.story.path).toBe(
        `src/${contract.layer}s/${contract.exportName}/${contract.exportName}.stories.tsx`,
      )

      for (const coverage of [
        contract.test,
        contract.story,
        contract.browserSmoke,
        contract.ssrSmoke,
      ]) {
        if (coverage.status === 'pending') {
          expect(['T02', 'T04', 'T10']).toContain(coverage.task)
        }
      }

      if (contract.test.status === 'complete') {
        await expect(
          access(resolve(root, contract.test.path)),
        ).resolves.toBeUndefined()
      }

      if (contract.story.status === 'complete') {
        await expect(
          access(resolve(root, contract.story.path)),
        ).resolves.toBeUndefined()
      }
    }
  })

  it('keeps quality tooling outside the published package files', () => {
    const packageJson = JSON.parse(
      readFileSync(resolve(root, 'package.json'), 'utf8'),
    ) as { files?: string[] }

    expect(packageJson.files).not.toContain('quality')
  })
})
