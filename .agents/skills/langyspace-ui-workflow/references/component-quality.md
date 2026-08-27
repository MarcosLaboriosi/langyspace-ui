# Shared component quality

- Inspect the existing component, stories, tests, root exports, tokens, audit configuration, API
  snapshot, bundle budgets, and representative downstream composition before implementation.
- Design semantic, composable APIs. Keep domain labels, routes, billing states, and application data
  ownership outside the library.
- Cover meaningful variants and interaction states in Storybook: default, hover/focus where
  applicable, keyboard use, disabled, loading, invalid, selected, compact, long content, and narrow
  containers.
- Preserve accessible names, roles, focus visibility/order, hit targets, contrast, reduced-motion
  behavior, and native semantics.
- Prefer theme tokens and established primitives. Avoid duplicate controls, consumer-order CSS,
  broad global selectors, and styling contracts that require undocumented markup.
- Run focused tests/typecheck first. For public API changes run `check:api`; update the snapshot only
  after deliberate compatibility review. For release-ready work run the complete `validate:ui`,
  which includes tests, coverage, build, API, bundle, package, and screenshot layout checks.
- Inspect generated screenshots rather than relying only on geometry. Never weaken an audit or
  budget merely to make a change pass; document and review intentional exceptions.
