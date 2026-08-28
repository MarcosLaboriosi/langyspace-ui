const publicRootPattern = /^lsui-sc-[a-z0-9-]+$/

export async function inspectStory(page, scenario, tolerance) {
  const inspection = await page.evaluate(
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

      document
        .querySelectorAll('[data-ui-action-menu="true"]')
        .forEach((menu, index) => {
          if (!isVisible(menu)) {
            issues.push({ index, rule: 'action-menu/not-positioned' })
            return
          }

          const rect = menu.getBoundingClientRect()
          const labelledBy = menu.getAttribute('aria-labelledby')
          const reducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
          ).matches
          const style = window.getComputedStyle(menu)

          if (
            rect.left < -acceptedTolerance ||
            rect.top < -acceptedTolerance ||
            rect.right > viewportWidth + acceptedTolerance ||
            rect.bottom > window.innerHeight + acceptedTolerance
          ) {
            issues.push({
              bottom: rect.bottom,
              index,
              left: rect.left,
              right: rect.right,
              rule: 'action-menu/outside-viewport',
              top: rect.top,
            })
          }

          if (
            menu.getAttribute('role') !== 'menu' ||
            !labelledBy ||
            !document.getElementById(labelledBy)
          ) {
            issues.push({ index, rule: 'action-menu/accessibility' })
          }

          if (
            (reducedMotion && style.animationName !== 'none') ||
            (!reducedMotion && style.animationName === 'none')
          ) {
            issues.push({
              actual: style.animationName,
              expected: reducedMotion ? 'none' : 'running animation',
              index,
              rule: 'action-menu/motion-preference',
            })
          }
        })

      document
        .querySelectorAll('[data-ui-operational-list="true"]')
        .forEach((list, index) => {
          const table = list.querySelector(
            '[data-ui-operational-list-table="true"]',
          )
          const expandedTriggers = list.querySelectorAll(
            '[aria-haspopup="menu"][aria-expanded="true"]',
          )
          const rootRect = list.getBoundingClientRect()

          if (
            !table ||
            table.tagName !== 'TABLE' ||
            (!table.hasAttribute('aria-label') &&
              !table.hasAttribute('aria-labelledby'))
          ) {
            issues.push({ index, rule: 'operational-list/table-accessibility' })
          }

          if (expandedTriggers.length > 1) {
            issues.push({
              actual: expandedTriggers.length,
              expected: 1,
              index,
              rule: 'operational-list/menu-exclusivity',
            })
          }

          if (
            list.scrollWidth > list.clientWidth + acceptedTolerance ||
            rootRect.right > viewportWidth + acceptedTolerance
          ) {
            issues.push({
              clientWidth: list.clientWidth,
              index,
              rule: 'operational-list/horizontal-overflow',
              scrollWidth: list.scrollWidth,
            })
          }

          list
            .querySelectorAll('[data-ui-operational-list-cell="true"]')
            .forEach((cell, cellIndex) => {
              const references = (cell.getAttribute('headers') ?? '')
                .split(/\s+/)
                .filter(Boolean)

              if (
                references.length !== 2 ||
                references.some((id) => !document.getElementById(id))
              ) {
                issues.push({
                  cellIndex,
                  index,
                  rule: 'operational-list/header-association',
                })
              }
            })

          list
            .querySelectorAll('[data-ui-operational-list-row="true"]')
            .forEach((row, rowIndex) => {
              const actionCell = row.querySelector(
                '[data-ui-operational-list-actions="true"]',
              )
              if (!actionCell || !isVisible(actionCell)) return

              const actionRect = actionCell.getBoundingClientRect()
              const siblings = row.querySelectorAll(
                '[data-ui-operational-list-primary="true"], [data-ui-operational-list-cell="true"]',
              )

              siblings.forEach((cell, cellIndex) => {
                if (!isVisible(cell)) return
                const cellRect = cell.getBoundingClientRect()
                const overlapWidth =
                  Math.min(actionRect.right, cellRect.right) -
                  Math.max(actionRect.left, cellRect.left)
                const overlapHeight =
                  Math.min(actionRect.bottom, cellRect.bottom) -
                  Math.max(actionRect.top, cellRect.top)

                if (
                  overlapWidth > acceptedTolerance &&
                  overlapHeight > acceptedTolerance
                ) {
                  issues.push({
                    cellIndex,
                    index,
                    rowIndex,
                    rule: 'operational-list/action-cell-overlap',
                  })
                }
              })
            })

          list
            .querySelectorAll('[data-sortable="true"] button')
            .forEach((button, sortIndex) => {
              if (!isVisible(button)) return
              button.focus()
              const style = window.getComputedStyle(button)
              const hasOutline =
                style.outlineStyle !== 'none' &&
                Number.parseFloat(style.outlineWidth) > 0

              if (document.activeElement !== button || !hasOutline) {
                issues.push({
                  index,
                  sortIndex,
                  rule: 'operational-list/sort-focus-indicator',
                })
              }
            })
        })

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

  const operationalLists = page.locator('[data-ui-operational-list="true"]')
  const operationalListCount = await operationalLists.count()

  for (let index = 0; index < operationalListCount; index += 1) {
    const list = operationalLists.nth(index)
    const renderedRows = await list
      .locator('[data-ui-operational-list-row="true"]')
      .count()
    const renderedCells = await list
      .locator(
        '[data-ui-operational-list-cell="true"], [data-ui-operational-list-actions="true"]',
      )
      .count()
    const tableRoles = await list.getByRole('table').count()
    const rowHeaderRoles = await list.getByRole('rowheader').count()
    const cellRoles = await list.getByRole('cell').count()

    if (
      tableRoles !== 1 ||
      rowHeaderRoles !== renderedRows ||
      (renderedRows > 0 && cellRoles !== renderedCells)
    ) {
      inspection.issues.push({
        actual: { cellRoles, rowHeaderRoles, tableRoles },
        expected: {
          cellRoles: renderedRows > 0 ? renderedCells : 'empty-state-cell',
          rowHeaderRoles: renderedRows,
          tableRoles: 1,
        },
        index,
        rule: 'operational-list/browser-roles',
        ...scenario,
      })
    }
  }

  return inspection
}
