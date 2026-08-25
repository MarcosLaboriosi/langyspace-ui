const publicRootPattern = /^lsui-sc-[a-z0-9-]+$/

export async function inspectStory(page, scenario, tolerance) {
  return page.evaluate(
    ({ acceptedTolerance, currentScenario, rootClassPattern }) => {
      const issues = []
      const viewportWidth = document.documentElement.clientWidth
      const pageWidth = Math.max(
        document.documentElement.scrollWidth,
        document.body.scrollWidth,
      )
      const isVisible = (element) => {
        const style = window.getComputedStyle(element)
        const rect = element.getBoundingClientRect()

        return (
          style.display !== 'none' &&
          style.visibility !== 'hidden' &&
          rect.width > 0 &&
          rect.height > 0
        )
      }
      const matchesPublicRoot = (element) =>
        Array.from(element.classList).some((className) =>
          new RegExp(rootClassPattern).test(className),
        )
      const componentRoots = Array.from(
        document.querySelectorAll('[class*="lsui-sc-"]'),
      ).filter(
        (element) =>
          matchesPublicRoot(element) &&
          !Array.from(
            element.parentElement?.closest('[class*="lsui-sc-"]')?.classList ??
              [],
          ).some((className) => new RegExp(rootClassPattern).test(className)),
      )

      if (pageWidth > viewportWidth + acceptedTolerance) {
        issues.push({
          actual: pageWidth,
          expected: viewportWidth,
          rule: 'layout/page-horizontal-overflow',
        })
      }

      if (!document.querySelector('#storybook-root > *')) {
        issues.push({ rule: 'render/empty-story' })
      }

      componentRoots.forEach((element, index) => {
        if (!isVisible(element)) return

        const rect = element.getBoundingClientRect()
        const style = window.getComputedStyle(element)
        const allowsOwnOverflow = ['auto', 'clip', 'hidden', 'scroll'].includes(
          style.overflowX,
        )

        if (
          rect.left < -acceptedTolerance ||
          rect.right > viewportWidth + acceptedTolerance
        ) {
          issues.push({
            index,
            left: rect.left,
            right: rect.right,
            rule: 'layout/component-outside-viewport',
          })
        }

        if (
          !allowsOwnOverflow &&
          (element.scrollWidth > element.clientWidth + acceptedTolerance ||
            element.scrollHeight > element.clientHeight + acceptedTolerance)
        ) {
          issues.push({
            clientHeight: element.clientHeight,
            clientWidth: element.clientWidth,
            index,
            rule: 'layout/component-content-overflow',
            scrollHeight: element.scrollHeight,
            scrollWidth: element.scrollWidth,
          })
        }
      })

      const actions = document.querySelectorAll(
        '.lsui-sc-action-link, .lsui-sc-button, .lsui-sc-icon-button',
      )

      actions.forEach((element, index) => {
        if (!isVisible(element)) return

        const rect = element.getBoundingClientRect()
        const style = window.getComputedStyle(element)
        const size = element.getAttribute('data-size') ?? 'md'
        const expectedHeight = size === 'sm' ? 32 : size === 'lg' ? 48 : 40

        if (rect.height + acceptedTolerance < expectedHeight) {
          issues.push({
            actual: rect.height,
            expected: expectedHeight,
            index,
            rule: 'action/minimum-height',
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
            rule: 'action/compact-md-recipe',
          })
        }

        if (element.getAttribute('data-loading') !== 'true') return

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
            rule: 'action/loading-spinner-ending-slot',
          })
          return
        }

        const spinnerStyle = window.getComputedStyle(spinner)
        if (
          (reducedMotion && spinnerStyle.animationName !== 'none') ||
          (!reducedMotion && spinnerStyle.animationName === 'none')
        ) {
          issues.push({
            actual: spinnerStyle.animationName,
            expected: reducedMotion ? 'none' : 'running animation',
            index,
            rule: 'motion/loading-spinner-preference',
          })
        }
      })

      document
        .querySelectorAll('.lsui-sc-state-panel')
        .forEach((element, index) => {
          const state = element.getAttribute('data-state')
          const role = element.getAttribute('role')

          if (
            (state === 'error' && role !== 'alert') ||
            ((state === 'loading' || state === 'partial') &&
              role !== 'status') ||
            (state === 'loading' &&
              element.getAttribute('aria-busy') !== 'true')
          ) {
            issues.push({
              index,
              role,
              rule: 'state-panel/accessibility',
              state,
            })
          }
        })

      document
        .querySelectorAll('.lsui-sc-field-root[data-invalid="true"]')
        .forEach((field, index) => {
          const input = field.querySelector('input, select, textarea')
          const describedByIds =
            input?.getAttribute('aria-describedby')?.split(/\s+/) ?? []

          if (
            !input ||
            input.getAttribute('aria-invalid') !== 'true' ||
            describedByIds.length === 0 ||
            describedByIds.some((id) => !document.getElementById(id))
          ) {
            issues.push({ index, rule: 'field/accessibility' })
          }
        })

      document
        .querySelectorAll('.lsui-sc-filter-pills, .lsui-sc-segmented-control')
        .forEach((group, index) => {
          const selected = group.querySelectorAll('[aria-pressed="true"]')
          const hasName =
            group.hasAttribute('aria-label') ||
            group.hasAttribute('aria-labelledby')

          if (
            group.getAttribute('role') !== 'group' ||
            !hasName ||
            selected.length !== 1
          ) {
            issues.push({ index, rule: 'selection/group-contract' })
          }
        })

      document
        .querySelectorAll('.lsui-sc-auth-token-digits')
        .forEach((group, index) => {
          const inputs = group.querySelectorAll('input')
          const hasName =
            group.hasAttribute('aria-label') ||
            group.hasAttribute('aria-labelledby')

          if (
            !hasName ||
            inputs.length < 4 ||
            Array.from(inputs).some(
              (input) => !input.getAttribute('aria-label'),
            )
          ) {
            issues.push({ index, rule: 'auth-token/accessibility' })
          }
        })

      actions.forEach((element, index) => {
        if (!isVisible(element) || element.matches(':disabled')) return

        element.focus()
        const style = window.getComputedStyle(element)
        const hasOutline =
          style.outlineStyle !== 'none' &&
          Number.parseFloat(style.outlineWidth) > 0
        const hasShadow = style.boxShadow !== 'none'

        if (document.activeElement !== element || (!hasOutline && !hasShadow)) {
          issues.push({ index, rule: 'focus/action-indicator' })
        }
      })

      return {
        componentCount: componentRoots.length,
        issues: issues.map((issue) => ({ ...issue, ...currentScenario })),
      }
    },
    {
      acceptedTolerance: tolerance,
      currentScenario: scenario,
      rootClassPattern: publicRootPattern.source,
    },
  )
}
