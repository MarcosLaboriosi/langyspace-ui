# Task 04 — Integrate langyspace landing

## Responsibility

Install the release and make the existing Hero CTA consume the shared Button without changing copy
or behavior.

## Subtasks

- [x] 04.1 Create an isolated branch/worktree from current `origin/main` and confirm clean scope.
- [x] 04.2 Install the exact release URL and import shared CSS once.
- [x] 04.3 Convert the local base Button into a compatibility re-export.
- [x] 04.4 Run focused build/lint and full UI validation.
- [x] 04.5 Inspect landing normal/stress screenshots at 390, 1281 and 2048.
- [x] 04.6 Review/stage explicit diff, commit Conventional Commit and update central progress.

## Completion conditions

- Hero CTA copy/handler/data attributes are unchanged.
- SSR/prerender build succeeds.
- Only dependency/style import/base Button adapter, lockfile and required audit evidence change.

## Visual gate

`direct`; landing route, Hero CTA, long copy and responsive widths must pass.

## Evidence

- Isolated branch `feat/shared-ui-button-v1` from `origin/main`; original worktree untouched.
- Consumer commit `272633a` (`feat(ui): adopt shared landing button`).
- `pnpm run validate:ui`: lint, SSR/prerender build and 198 layout scenarios passed with zero
  geometry issues.
- Visual evidence: `.local/layout-audit/2026-08-20T15-32-44.107Z`; normal/stress screenshots at
  390, 1281 and 2048 inspected for hierarchy, density, wrapping and CTA containment.
- Hero copy, handler and data attributes remained unchanged.
- Visual gate review: passed.
