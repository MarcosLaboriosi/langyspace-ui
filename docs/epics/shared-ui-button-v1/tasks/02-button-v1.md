# Task 02 — Implement and validate Button v1

## Responsibility

Implement exactly one production component and prove its semantic, package and visual contracts.

## Subtasks

- [x] 02.1 Implement typed native Button behavior and exports.
- [x] 02.2 Implement zero-specificity primary/secondary/tertiary and sm/md/lg styles.
- [x] 02.3 Add unit tests for native behavior, props/ref, icons, loading and class composition.
- [x] 02.4 Add deterministic showcase with normal, disabled, loading, icon and long-content states.
- [x] 02.5 Add offline Playwright layout audit for all approved widths and screenshots.
- [x] 02.6 Add tarball smoke install/build test and document the public API.
- [x] 02.7 Run full validation, inspect screenshots, review diff and update progress.

## Evidence

- `pnpm run validate:ui`: passed.
- Vitest: 1 file, 5 tests passed.
- Vite/TypeScript build: `dist/index.js` 1.09 kB and `dist/styles.css` 2.92 kB before gzip.
- Package smoke: clean Vite/TypeScript consumer installed the local `.tgz`, imported JS/types/CSS
  and built successfully.
- `npm pack --dry-run --json`: 9 public files, 4,445-byte tarball; no source/test declaration.
- Layout audit: 18 scenarios, 9 widths, 16 buttons per scenario, 0 issues.
- Artifact: `.local/layout-audit/2026-08-20T15-18-57.555Z/summary.json`.
- Inspected normal/stress screenshots at 390, 1281 and 2048 px. Hierarchy, contrast, focus,
  loading, density and long-content wrapping are acceptable.

## Completion conditions

- API contains no props outside the approved requirements.
- Tests and a real Vite consumer prove package use.
- No page/control overflow or clipped label in normal/stress showcase.

## Focused validation

- `pnpm test`
- `pnpm run build`
- `pnpm run test:package`
- `LAYOUT_AUDIT_SCREENSHOTS=1 pnpm run test:layout`
- `pnpm run validate:ui`

## Visual gate

Visual gate review: passed — `pnpm run validate:ui`, 18 scenarios across 9 widths, with
normal/stress screenshots inspected at 390, 1281 and 2048 px.
