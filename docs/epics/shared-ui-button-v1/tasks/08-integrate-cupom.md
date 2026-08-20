# Task 08 — Integrate langyspace-cupom

## Responsibility

Install the release and use tertiary Button for the existing audited report period controls.

## Subtasks

- [x] 08.1 Create isolated branch/worktree from current `origin/main`.
- [x] 08.2 Install exact release URL and import shared CSS once.
- [x] 08.3 Replace native range buttons with shared tertiary Button while preserving local class,
      `aria-pressed`, key, type and handler.
- [x] 08.4 Run unit/build and full UI validation.
- [x] 08.5 Inspect report screenshots at 390, 1281 and 2048, including pressed/unpressed contrast.
- [x] 08.6 Review/stage explicit diff and commit.

## Completion conditions

- Period selection and report data requests are unchanged.
- Existing segmented dark-surface visual stays authoritative.
- Redirect routes and production data are not exercised.

## Visual gate

`direct`; sanitized demo report normal/stress must pass.

## Evidence

- Final commit: `afc44a6` (`feat(ui): adopt shared report range buttons`), including the exact
  `@langyspace/ui@0.1.0` pnpm 11 publication-age exception. Frozen install passed all 173 lockfile
  policy checks.
- `pnpm run validate:ui`: 4 test files / 15 tests, production build and 36 layout scenarios passed
  with zero geometry issues.
- Visual artifact: `.local/layout-audit/2026-08-20T16-20-17.806Z`.
- Manually inspected stress screenshots at 390, 1281 and 2048 px; pressed `7d` and unpressed
  `30d`/`90d` remain legible on the dark report header without overflow or clipping.
- The existing local class, `aria-pressed`, `key`, `type`, state handler and downstream report
  request flow were preserved. Redirect routes and production data were not exercised.
- The original `langyspace-cupom` worktree remained clean.
- Visual gate review: `passed`.
