# langyspace-ui agent guide

## Project

- Shared React, TypeScript, Vite, styled-components, and Storybook component library; use `pnpm`.
- Keep components product-agnostic. Teacher, Student, Admin, and Cupom own their business behavior
  and compose this library's semantic primitives.
- Public source exports, generated package output, README examples, and the API snapshot form one
  compatibility contract.

## Always-on workflow

- Preserve unrelated worktree changes and public API stability. Inspect current stories, tests,
  exports, tokens, and downstream usage before changing a component.
- Classify rendered impact before acting: `direct` changes UI/copy/layout/interaction; `indirect`
  changes component contracts or behavior that can alter rendering; `none` has no plausible
  rendered effect.
- Direct/indirect work identifies component variants, states, content extremes, and widths, adds
  story/audit coverage, runs `pnpm run validate:ui`, and includes screenshot inspection.
- Every final handoff contains exactly one verdict: `Visual gate review: passed` with evidence,
  `not applicable` with a concrete reason, or `blocked` with the failing surface.
- Medium/large work uses reviewed, resumable `docs/epics/<name>/` documents and one small task at a
  time. Tiny isolated changes still require inspection, focused validation, and diff review.

## Library contracts

- Prefer semantic props and tokens over application-specific conditionals or one-off CSS.
- Preserve accessibility across interaction states, keyboard/focus behavior, labels, and disabled or
  loading variants.
- Update root exports intentionally. Never bypass `pnpm run check:api`; use `write:api` only after
  reviewing and accepting the compatibility change.
- Component changes normally require focused tests and Storybook variants. Public releases also
  require bundle and package smoke checks.
- Do not add an implicit global stylesheet requirement or rely on consumer import order.

## Progressive guidance

Use `.agents/skills/langyspace-ui-workflow/SKILL.md` for component/API implementation, visual or
interaction work, tokens/theming, Storybook/layout auditing, packaging, or release changes. Do not
load it for simple read-only answers or isolated documentation.

## Common commands

- Focused checks: `pnpm run typecheck`, `pnpm run test:unit`, `pnpm run test:storybook`
- API/package: `pnpm run check:api`, `pnpm run test:bundle`, `pnpm run test:package`
- Mandatory direct/indirect UI gate: `pnpm run validate:ui`
- Storybook: `pnpm run storybook`, `pnpm run build:storybook`
