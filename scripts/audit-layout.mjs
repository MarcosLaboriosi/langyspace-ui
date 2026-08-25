import { mkdir, writeFile } from 'node:fs/promises'
import { createServer } from 'node:net'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { createServer as createViteServer } from 'vite'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const artifacts = resolve(
  root,
  '.local',
  'layout-audit',
  new Date().toISOString().replaceAll(':', '-'),
)
const tolerance = 2
const height = 1100
const captureScreenshots = process.env.LAYOUT_AUDIT_SCREENSHOTS === '1'
const timeoutMs = Number(process.env.LAYOUT_AUDIT_TIMEOUT_MS ?? 300_000)
const requestedWidths = (process.env.LAYOUT_AUDIT_WIDTHS ?? '')
  .split(',')
  .map(Number)
  .filter((width) => Number.isInteger(width) && width > 0)
const widths =
  requestedWidths.length > 0
    ? requestedWidths
    : [390, 768, 1280, 1281, 1440, 1536, 1551, 1552, 2048]
const screenshotWidths = new Set([390, 1281, 2048])

function openPort() {
  return new Promise((resolvePort, reject) => {
    const server = createServer()
    server.unref()
    server.once('error', reject)
    server.listen(0, '127.0.0.1', () => {
      const address = server.address()

      if (!address || typeof address === 'string') {
        server.close()
        reject(new Error('layout_audit_port_unavailable'))
        return
      }

      server.close((error) =>
        error ? reject(error) : resolvePort(address.port),
      )
    })
  })
}

async function inspect(page, scenario) {
  return page.evaluate(
    ({ acceptedTolerance, currentScenario }) => {
      const issues = []
      const viewportWidth = document.documentElement.clientWidth
      const rootWidth = Math.max(
        document.documentElement.scrollWidth,
        document.body.scrollWidth,
      )

      if (rootWidth > viewportWidth + acceptedTolerance) {
        issues.push({
          actual: rootWidth,
          expected: viewportWidth,
          kind: 'page-horizontal-overflow',
        })
      }

      const visible = (element) => {
        const style = window.getComputedStyle(element)
        const rect = element.getBoundingClientRect()

        return (
          style.display !== 'none' &&
          style.visibility !== 'hidden' &&
          rect.width > 0
        )
      }

      const containedSelectors = [
        '.showcase__card',
        '.showcase__narrow-card',
        '.lsui-sc-action-link',
        '.lsui-sc-button',
        '.lsui-sc-pressable',
      ]

      containedSelectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((element, index) => {
          if (!visible(element)) return

          const rect = element.getBoundingClientRect()

          if (
            rect.left < -acceptedTolerance ||
            rect.right > viewportWidth + acceptedTolerance
          ) {
            issues.push({
              index,
              kind: 'element-outside-viewport',
              left: rect.left,
              right: rect.right,
              selector,
            })
          }

          if (
            element.scrollWidth > element.clientWidth + acceptedTolerance ||
            element.scrollHeight > element.clientHeight + acceptedTolerance
          ) {
            issues.push({
              clientHeight: element.clientHeight,
              clientWidth: element.clientWidth,
              index,
              kind: 'element-content-overflow',
              scrollHeight: element.scrollHeight,
              scrollWidth: element.scrollWidth,
              selector,
            })
          }
        })
      })

      document
        .querySelectorAll('.lsui-sc-action-link, .lsui-sc-button')
        .forEach((element, index) => {
          if (!visible(element)) return

          const rect = element.getBoundingClientRect()
          const style = window.getComputedStyle(element)
          const size = element.getAttribute('data-size') ?? 'md'
          const expectedHeight = size === 'sm' ? 32 : size === 'lg' ? 48 : 40

          if (rect.height + acceptedTolerance < expectedHeight) {
            issues.push({
              actual: rect.height,
              expected: expectedHeight,
              index,
              kind: 'button-minimum-height',
            })
          }

          if (
            element.getAttribute('data-density') === 'compact' &&
            size === 'md' &&
            (style.fontSize !== '14px' ||
              style.paddingLeft !== '16px' ||
              style.paddingRight !== '16px')
          ) {
            issues.push({
              actual: {
                fontSize: style.fontSize,
                paddingLeft: style.paddingLeft,
                paddingRight: style.paddingRight,
              },
              expected: {
                fontSize: '14px',
                paddingLeft: '16px',
                paddingRight: '16px',
              },
              index,
              kind: 'compact-md-recipe',
            })
          }

          if (element.getAttribute('data-loading') === 'true') {
            const spinners = element.querySelectorAll('.lsui-sc-spinner')
            const spinner = spinners.item(0)
            const reducedMotion = window.matchMedia(
              '(prefers-reduced-motion: reduce)',
            ).matches

            if (
              spinners.length !== 1 ||
              !spinner ||
              element.lastElementChild?.querySelector('.lsui-sc-spinner') !==
                spinner
            ) {
              issues.push({
                actual: spinners.length,
                expected: 1,
                index,
                kind: 'loading-spinner-ending-slot',
              })
            } else {
              const spinnerStyle = window.getComputedStyle(spinner)

              if (
                (reducedMotion && spinnerStyle.animationName !== 'none') ||
                (!reducedMotion && spinnerStyle.animationName === 'none')
              ) {
                issues.push({
                  actual: spinnerStyle.animationName,
                  expected: reducedMotion ? 'none' : 'running animation',
                  index,
                  kind: 'loading-spinner-motion-preference',
                })
              }
            }
          }
        })

      const focusedButton = document.querySelector('[data-audit-focus]')
      const focusedStyle = focusedButton
        ? window.getComputedStyle(focusedButton)
        : null

      if (
        !focusedButton ||
        document.activeElement !== focusedButton ||
        !focusedStyle ||
        focusedStyle.boxShadow === 'none'
      ) {
        issues.push({ kind: 'focus-indicator-missing' })
      }

      const focusedLink = document.querySelector('[data-audit-link-focus]')
      focusedLink?.focus()
      const focusedLinkStyle = focusedLink
        ? window.getComputedStyle(focusedLink)
        : null

      if (
        !focusedLink ||
        document.activeElement !== focusedLink ||
        !focusedLinkStyle ||
        focusedLinkStyle.boxShadow === 'none'
      ) {
        issues.push({ kind: 'action-link-focus-indicator-missing' })
      }

      return {
        issues: issues.map((issue) => ({ ...issue, ...currentScenario })),
        stats: {
          actions: document.querySelectorAll(
            '.lsui-sc-action-link, .lsui-sc-button',
          ).length,
          buttons: document.querySelectorAll('.lsui-sc-button').length,
          containers: document.querySelectorAll(containedSelectors.join(','))
            .length,
        },
      }
    },
    { acceptedTolerance: tolerance, currentScenario: scenario },
  )
}

async function run() {
  await mkdir(artifacts, { recursive: true })

  const port = await openPort()
  const baseUrl = `http://127.0.0.1:${port}`
  const vite = await createViteServer({
    configFile: resolve(root, 'vite.config.ts'),
    logLevel: 'error',
    root,
    server: { host: '127.0.0.1', port, strictPort: true },
  })
  const browser = await chromium.launch({ headless: true })
  const results = []

  try {
    await vite.listen()

    for (const width of widths) {
      for (const mode of ['normal', 'stress']) {
        for (const motion of ['normal', 'reduced']) {
          const page = await browser.newPage({ viewport: { height, width } })
          const scenario = {
            mode,
            motion,
            path: mode === 'stress' ? '/?stress=1' : '/',
            width,
          }

          await page.emulateMedia({
            reducedMotion: motion === 'reduced' ? 'reduce' : 'no-preference',
          })

          await page.route('**/*', async (route) => {
            if (route.request().url().startsWith(baseUrl)) {
              await route.continue()
              return
            }

            await route.abort('blockedbyclient')
          })
          await page.goto(`${baseUrl}${scenario.path}`, {
            timeout: timeoutMs,
            waitUntil: 'networkidle',
          })
          await page
            .locator(`[data-audit-mode="${mode}"]`)
            .waitFor({ timeout: timeoutMs })

          const result = await inspect(page, scenario)
          const shouldScreenshot =
            captureScreenshots && screenshotWidths.has(width)

          if (shouldScreenshot || result.issues.length > 0) {
            await page.screenshot({
              fullPage: true,
              path: resolve(artifacts, `${mode}-${motion}-${width}.png`),
            })
          }

          results.push({ ...scenario, ...result })
          await page.close()
        }
      }
    }
  } finally {
    await browser.close()
    await vite.close()
  }

  const issues = results.flatMap((result) => result.issues)
  const summary = {
    artifactDirectory: artifacts,
    issueCount: issues.length,
    issues,
    scenarioCount: results.length,
    scenarios: results,
  }

  await writeFile(
    resolve(artifacts, 'summary.json'),
    `${JSON.stringify(summary, null, 2)}\n`,
  )

  if (issues.length > 0) {
    console.error(`Layout audit failed with ${issues.length} issue(s).`)
    console.error(`Report: ${resolve(artifacts, 'summary.json')}`)
    process.exitCode = 1
    return
  }

  console.log(
    `Layout audit passed: ${results.length} scenarios, ${widths.length} widths.`,
  )
  console.log(`Report: ${resolve(artifacts, 'summary.json')}`)
}

await run()
