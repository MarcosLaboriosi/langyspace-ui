import { mkdir, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { chromium } from 'playwright'
import { auditConfig, widthsForStory } from './layout-audit/config.mjs'
import { inspectStory } from './layout-audit/rules.mjs'
import { startStaticStorybook } from './layout-audit/server.mjs'

const root = resolve(import.meta.dirname, '..')
const staticRoot = resolve(root, 'storybook-static')
const artifacts = resolve(root, '.local/layout-audit/latest')
const captureScreenshots = process.env.LAYOUT_AUDIT_SCREENSHOTS === '1'
const requestedStories = (process.env.LAYOUT_AUDIT_STORIES ?? '')
  .split(',')
  .map((storyId) => storyId.trim())
  .filter(Boolean)
const results = []

await rm(artifacts, { force: true, recursive: true })
await mkdir(artifacts, { recursive: true })

const server = await startStaticStorybook(staticRoot)
const browser = await chromium.launch({ headless: true })

try {
  const indexResponse = await fetch(`${server.baseUrl}/index.json`)
  if (!indexResponse.ok) {
    throw new Error(`storybook_index_${indexResponse.status}`)
  }

  const index = await indexResponse.json()
  const stories = Object.values(index.entries)
    .filter((entry) => entry.type === 'story')
    .map((entry) => ({ id: entry.id, tags: entry.tags ?? [] }))
    .filter(
      (entry) =>
        requestedStories.length === 0 || requestedStories.includes(entry.id),
    )
    .sort((left, right) => left.id.localeCompare(right.id))

  for (const story of stories) {
    for (const width of widthsForStory(story.tags)) {
      for (const motion of auditConfig.motions) {
        const page = await browser.newPage({
          viewport: { height: auditConfig.height, width },
        })
        const pageErrors = []
        const scenario = { motion, storyId: story.id, width }

        page.on('pageerror', (error) => pageErrors.push(error.message))
        await page.emulateMedia({
          reducedMotion: motion === 'reduced' ? 'reduce' : 'no-preference',
        })
        await page.route('**/*', async (route) => {
          if (route.request().url().startsWith(server.baseUrl)) {
            await route.continue()
            return
          }

          await route.abort('blockedbyclient')
        })

        await page.goto(
          `${server.baseUrl}/iframe.html?id=${story.id}&viewMode=story`,
          {
            timeout: auditConfig.timeoutMs,
            waitUntil: 'domcontentloaded',
          },
        )
        const storyRoot = page.locator('#storybook-root')
        await storyRoot.waitFor({ timeout: auditConfig.timeoutMs })
        await storyRoot
          .locator(':scope > *')
          .first()
          .waitFor({ state: 'visible', timeout: auditConfig.timeoutMs })
        await page.evaluate(() => document.fonts.ready)

        const inspection = await inspectStory(
          page,
          scenario,
          auditConfig.tolerance,
        )
        const issues = [
          ...inspection.issues,
          ...pageErrors.map((message) => ({
            ...scenario,
            message,
            rule: 'render/page-error',
          })),
        ]
        const shouldCapture =
          issues.length > 0 ||
          (captureScreenshots &&
            motion === 'normal' &&
            story.tags.includes('visual-review') &&
            auditConfig.screenshotWidths.has(width))

        if (shouldCapture) {
          await page.screenshot({
            fullPage: true,
            path: resolve(artifacts, `${story.id}-${motion}-${width}.png`),
          })
        }

        results.push({ ...scenario, ...inspection, issues })
        await page.close()
      }
    }
  }
} finally {
  await browser.close()
  await server.close()
}

const issues = results.flatMap((result) => result.issues)
const summary = {
  artifactDirectory: artifacts,
  issueCount: issues.length,
  issues,
  scenarioCount: results.length,
  storyCount: new Set(results.map((result) => result.storyId)).size,
}

await writeFile(
  resolve(artifacts, 'summary.json'),
  `${JSON.stringify(summary, null, 2)}\n`,
)

if (issues.length > 0) {
  console.error(`Story layout audit failed with ${issues.length} issue(s).`)
  console.error(`Report: ${resolve(artifacts, 'summary.json')}`)
  process.exitCode = 1
} else {
  console.log(
    `Story layout audit passed: ${summary.scenarioCount} scenarios, ${summary.storyCount} stories.`,
  )
  console.log(`Report: ${resolve(artifacts, 'summary.json')}`)
}
