# Contributing to Langyspace UI

## Decide ownership before writing code

1. Keep the component in the product when its semantics, data or behavior belong to one domain.
2. Add a closed semantic prop when real callsites need another state of the same component.
3. Converge accidental visual differences to an existing recipe instead of preserving them.
4. Promote a new public component only when composition becomes simpler in its consumers.

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

Failure in an essential item is a valid no-go: the component remains local. Product organisms and
business rules never enter the package merely because their markup repeats.

## Component shape

Use the lowest layer that owns the behavior:

```text
foundations -> primitives/internal -> atoms -> molecules -> product compositions
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
