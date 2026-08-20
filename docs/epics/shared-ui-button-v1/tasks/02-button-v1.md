# Task 02 — Implement and validate Button v1

## Responsibility

Implement exactly one production component and prove its semantic, package and visual contracts.

## Subtasks

- [ ] 02.1 Implement typed native Button behavior and exports.
- [ ] 02.2 Implement zero-specificity primary/secondary/tertiary and sm/md/lg styles.
- [ ] 02.3 Add unit tests for native behavior, props/ref, icons, loading and class composition.
- [ ] 02.4 Add deterministic showcase with normal, disabled, loading, icon and long-content states.
- [ ] 02.5 Add offline Playwright layout audit for all approved widths and screenshots.
- [ ] 02.6 Add tarball smoke install/build test and document the public API.
- [ ] 02.7 Run full validation, inspect screenshots, review diff and update progress.

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

Inspect normal/stress screenshots at 390, 1281 and 2048 px. Record scenario count and exact artifact
directory in progress.
