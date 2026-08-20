# Task 10 — Normalize Button composition and redeploy affected consumers

## Responsibility

Make `variant`/`size` authoritative for subtle visual metrics while preserving only genuine
consumer layout and contextual-state requirements.

## Subtasks

- [x] 10.1 Record product refinement, technical refinement, critical review and audit coverage in
      the epic; update README with the approved composition contract.
- [x] 10.2 Normalize Teacher `AuthSubmitButton` to retain only external responsive spacing; run
      focused tests and review its diff.
- [x] 10.3 Run the complete Teacher visual gate and inspect `/login` at 390, 1281, 2048 and compact
      390x667.
- [x] 10.4 Normalize Cupom range-button CSS to retain equal width and inverse pressed state; run
      focused tests and review its diff.
- [x] 10.5 Run the complete Cupom visual gate and inspect the sanitized report at 390, 1281 and 2048.
- [x] 10.6 Review all final diffs, commit with Conventional Commits, push only fast-forward mains and
      monitor the two Hosting workflows.
- [x] 10.7 Verify production responses/assets, update all epic evidence and close with the repeated
      visual-gate verdict.

## Completion conditions

- No package runtime, version, release asset, package URL or lockfile changes.
- README explains `fullWidth`, `className` and `styled(Button)` with explicit local-style limits.
- Teacher inherits canonical `lg` appearance while keeping auth layout rhythm and full width.
- Cupom inherits canonical `sm` geometry/typography while keeping equal-width inverse selection.
- Both full visual gates pass and the representative screenshots are manually inspected.
- Teacher and Cupom Hosting workflows succeed at the exact final commits.

## Visual gate

`direct`; use the existing deterministic offline coverage. Do not authenticate, call product data or
weaken an audit assertion.

## Evidence

- 10.1: repository audit confirmed `className` composition, native props/ref forwarding and
  `fullWidth` already exist in `0.1.0`; product/technical/PM/Tech Lead/Senior/QA reviews are recorded
  before consumer code changes. README and epic Markdown pass Prettier.
- 10.2: Teacher `AuthSubmitButton/styles.ts` now contains only responsive external `margin-top`.
  Shared `fullWidth size="lg"` owns width and internal appearance. Two focused tests, production
  build, Prettier and diff checks passed.
- 10.3: `pnpm run validate:ui` passed build and 162 scenarios with zero geometry issues; artifact
  `.local/layout-audit/2026-08-20T18-04-59.070Z`. Login stress screenshots at 390, 1281 and 2048
  were inspected for hierarchy, width, label/icon alignment and contrast. A 390x667 audit passed 18
  more scenarios and its login screenshot was inspected; artifact
  `.local/layout-audit/2026-08-20T18-05-57.789Z`.
- 10.4: Cupom range CSS now retains only equal `min-width`, inverse unpressed color/background and
  pressed color/background. Shared `size="sm"` owns padding, border, radius, cursor and typography.
  All 15 tests, production build, Prettier and diff checks passed.
- 10.5: `pnpm run validate:ui` passed 15 tests, production build and 36 scenarios with zero geometry
  issues; artifact `.local/layout-audit/2026-08-20T18-07-25.162Z`. Sanitized report stress
  screenshots at 390, 1281 and 2048 were inspected; equal widths, selected/unselected contrast,
  compact height and header containment remain correct.
- 10.6: final Product/Tech Lead/Senior/QA diff review found no scope, contract, accessibility or
  operational regression. Teacher commit `6d910f6` and Cupom commit `02024fb` were pushed as strict
  fast-forwards to `main`. Hosting workflows `32401579654` and `32401574690` completed successfully;
  Teacher skipped emulators, Function builds, secrets and Function deploy preparation.
- 10.7: public Teacher `/login` and Cupom `/relatorio/:id` probes returned HTTP 200. Deployed assets
  exactly match the local builds (`index-Cnq1geQk.js`/`index-YoOWI3J5.css` and
  `index-39hg3lRm.js`/`index-SSY1wmkj.css`) and contain `lsui-button`. Original dirty Teacher/Admin
  work remained untouched; the Cupom original worktree remained clean.

## Final review

- Product: subtle differences now converge without adding props or hiding genuine full-width and
  selected-state needs.
- Tech Lead: the public API stays narrow; `fullWidth`, `className` and `styled(Button)` cover the
  approved composition boundary without a new release.
- Senior Engineer: the final application diffs only delete duplicated style ownership; no handler,
  markup, package, lockfile, Firebase or data contract changed.
- QA: both complete gates passed, required screenshots were inspected and the exact production
  commits/assets were verified.
- Repeated visual classification: `direct`.
- Visual gate review: passed — Teacher 162 default scenarios plus 18 compact scenarios; Cupom 36
  scenarios; screenshots inspected at 390, 1281 and 2048, plus Teacher 390x667.
