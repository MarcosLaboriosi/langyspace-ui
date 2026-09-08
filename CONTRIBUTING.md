# Contributing to Langyspace UI

## Decide ownership before writing code

1. Keep route-level pages, screens, views and containers in the product. The product owns routing,
   data fetching, domain state, business rules and feature orchestration.
2. Promote a visual or interactive unit when it has a stable contract reusable across products, or
   when an explicit platform requirement establishes that shared contract. Size is not the
   boundary: `Button`, `SearchInput`, `Card`, `Drawer`, a complete `Chat` section and `Calendar` can
   all belong here.
3. For a large shared component, inject product data and actions through semantic props, slots or
   callbacks. Do not make it aware of product routes, Firebase, services, permission systems or
   lifecycle rules; pass only the UI capabilities it needs.
4. Add a closed semantic prop when real callsites need another state of the same component.
5. Converge accidental visual differences to an existing recipe instead of preserving them.
6. Promote a new public component only when adoption creates one shared owner and makes consumers
   simpler. Do not create generic shared views such as `CrudPage` or `OperationalWorkspace` merely
   to compose library components.

`Pressable` is the boundary for product-owned controls. It is not a shortcut for copying Button
geometry. Public components do not accept free `color`, `radius`, `spacing`, `padding` or `height`
props.

## Maturity gate for a public component

A candidate is accepted only when the change proves all of the following:

- at least two real callsites or one explicit platform requirement;
- one stable semantic responsibility and a native element/ARIA model;
- fewer product props/adapters after adoption, not merely moved code;
- a closed recipe built from foundations plus named private constants;
- keyboard, focus, disabled, busy, error and reduced-motion behavior when applicable;
- `Component.test.tsx` and co-located `Component.stories.tsx` with relevant states;
- entrypoint export, component manifest, browser smoke, SSR smoke and package consumer coverage;
- layout evidence at global widths and declared component boundaries;
- migration, SemVer and rollback plan.

Failure in an essential item is a valid no-go: the component remains local. Route-level product
views and business rules never enter the package merely because their markup repeats. Conversely,
do not reject a reusable component merely because it is large or would be called an organism; its
ownership and stable cross-product contract decide the boundary.

## Component shape

Use the lowest layer that owns the behavior:

```text
foundations -> primitives/internal -> atoms/molecules -> shared compound components
                                                     -> product pages and orchestration stay local
```

Each public owner uses its explicit name in tests and stories. `index.tsx` remains only the concise
local/public entrypoint; do not create `index.test.tsx`. Keep styles private to the owner and import
other components from their entrypoint, never another folder's `styles.ts`.

## Required checks

Run focused tests while developing, then once before handoff:

```bash
pnpm run validate:ui
```

The gate covers architecture rules, format/lint/types, unit and Storybook/axe tests, coverage,
library build, API snapshot, bundle budgets, tarball consumer and the layout matrix.

## Exceptions and deprecations

Architecture exceptions require exact `path`, `owner`, `reason` and `expiresAt`. The expiry is an
ISO date and must be renewed by re-review, not silently moved. Consumers without expiry receive a
compatibility warning in v1; the library itself blocks them.

Public props/types follow SemVer. Additive alternatives land before removals. Mark the old contract
deprecated, migrate all known products, keep a release rollback path, and remove it only in a major.
After an intentional API change, review the declaration diff and run `pnpm run write:api`.
