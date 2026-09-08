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

  it('keeps every public component completely covered', async () => {
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
        expect(coverage.status).toBe('complete')
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

  it('keeps inventoried props and documentation references valid', async () => {
    for (const contractValue of publicComponentContracts) {
      const contract: ComponentContract = contractValue
      if (!contract.reference) continue

      const { propsPath, documentation, consumers } = contract.reference
      await expect(access(resolve(root, propsPath))).resolves.toBeUndefined()
      const markdown = readFileSync(resolve(root, documentation.path), 'utf8')
      const headings = [...markdown.matchAll(/^#{1,6} (.+)$/gm)].map(
        ([, heading]) => heading.toLowerCase().replaceAll(' ', '-'),
      )
      expect(headings).toContain(documentation.anchor)
      for (const consumer of consumers) {
        expect(consumer.repository).toMatch(/^langyspace(?:-[a-z]+)?$/)
        expect(consumer.path).toMatch(/^src\/.+\.tsx$/)
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
