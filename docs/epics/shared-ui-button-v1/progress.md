# Progress

## Status

In progress — migrate the shared Button implementation from a global CSS artifact to
styled-components with separated TypeScript types, publish `0.2.0`, upgrade all five consumers and
roll it out to production.

## Visual impact

`direct` — shared rendered control across five applications. Coverage and screenshot requirements
are defined in `epic.md` and `technical-plan.md`.

## Completed

- Repository/worktree/CI inventory for all five consumers.
- npm authentication check and GitHub registry/release tradeoff review.
- Existing Button APIs, theme metrics and audit routes mapped.
- Product plan, requirements, product review, technical plan and technical review completed.
- Dependency-ordered task breakdown completed.
- Task 01 — repository/package foundation (`7e3c672`), public GitHub repository and frozen lockfile.
- Task 02 — Button v1, 5 unit tests, clean-consumer package smoke and 18-scenario visual audit.
- Task 03.3 — CI/release automation committed and pushed; GitHub CI run `32385834404` passed.
- Task 03 — `v0.1.0` published, checksum verified anonymously and public package smoke passed.
- Task 04 — landing integration committed as `272633a`; 198 layout scenarios and visual review
  passed.
- Task 05 — admin login integration live at `7218b4b`; 224 tests and all visual gate stages passed
  with 1,716 layout scenarios.
- Task 06 — student profile integration live at `126a518`; six focused tests and 216 layout
  scenarios passed.
- Task 07 — teacher auth wrapper integration live at `4f083dd`; two focused tests, 162 layout
  scenarios, compact-height review and Hosting-only workflow proof passed.
- Task 08 — cupom report-range integration live at `afc44a6`; 15 tests, 36 layout scenarios
  and visual review at 390, 1281 and 2048 px passed.
- Task 09 — Landing `32393691284`, Admin `32394417756`, Student `32397183049`, Teacher
  `32399347546` and Cupom `32399833309` deployed successfully; every production probe returned 200
  and served `lsui-button` assets.
- Task 10 — composition contract documented; Teacher `6d910f6` and Cupom `02024fb` normalized,
  visually validated and deployed through successful runs `32401579654` and `32401574690`.
- Task 11 — Button migrated to `src/Button/{index.tsx,styles.ts,types.ts}` with no CSS artifact or
  stylesheet import/export; six tests, CSS-free clean-consumer packaging and the complete
  18-scenario visual gate passed. Screenshots at 390, 1281 and 2048 px were inspected from
  `.local/layout-audit/2026-08-20T18-58-04.234Z`.

## In progress

Task 12 — publish and verify the immutable `v0.2.0` release.

## Next subtask

12.1 — commit and push the scoped package change, then require the main CI run to pass.

## Blockers

None.

## Known unrelated work to preserve

- `langyspace-admin`: dirty feature branch with billing/data refresh work.
- `langyspace-teacher`: dirty main worktree with billing/admin Function work.

## Discoveries

- The five products are `langyspace`, `langyspace-admin`, `langyspace-student`,
  `langyspace-teacher` and `langyspace-cupom`.
- All use React 19 and pnpm; four use styled-components, cupom uses plain CSS.
- Four theme files already share the same primary/secondary sizes and base palette.
- GitHub CLI is authenticated; npm CLI is not.
- GitHub Packages npm installs require auth even when public, so v1 uses a public release tarball.
- TypeScript 6 needs a `types` condition for the CSS export and test files excluded from declaration
  emit; the clean-consumer smoke test now protects both contracts.
- Task 02 visual evidence: `.local/layout-audit/2026-08-20T15-18-57.555Z`, 18 scenarios, 0 issues.
- The student edit-profile loading test asserted the old Lucide spinner class; Task 06 now checks
  the shared spinner plus semantic disabled/`aria-busy` behavior while preserving the visible label.
- Student normal-mode screenshots are captured before its async renderer is visually stable; the
  unchanged audit intentionally screenshots stress only while still checking geometry in both modes.
- pnpm 11 applies a 1-day registry publication-age policy by default. Direct GitHub Release
  tarballs require a version-specific `minimumReleaseAgeExclude`; the exclusion is pinned to
  `@langyspace/ui@0.1.0` and does not weaken checks for other dependencies.
- Teacher root manifest/lockfile changes belong to the Vite app. Function dependency invalidation
  now follows `functions/packages/*`, preventing frontend library updates from redeploying hundreds
  of Cloud Functions.
- Unrelated Teacher auth run `32393492196` partially updated Functions but failed on multiple Cloud
  Run health-check/readiness deadlines. This did not block the independently scoped, successful
  Hosting run `32399347546` and remains outside this UI epic.
- The shared component already combines consumer `className`, forwards refs/native props and exposes
  `fullWidth`; the new requirement needs no package runtime or release change.
- Teacher duplicates the canonical palette but raises `lg` from 48 px to 52/56 px and changes mobile
  typography. Cupom's range class raises `sm` through padding and duplicates compact typography.
- Existing Teacher `/login` and Cupom sanitized report audits cover every affected state and the
  required 390/1281/2048 widths, so no new fixture or layout-audit case is needed.
- Task 10 final visual gate passed: Teacher 162 default plus 18 compact scenarios and Cupom 36
  scenarios, with all required screenshots inspected. Public probes returned HTTP 200 and exact
  deployed assets matched the local production builds.
- `styled-components ^6.4.0` already exists in Landing, Admin, Student and Teacher; Cupom is the only
  consumer that must add it explicitly.
- Removing `./styles.css` and adding a required peer is a real package boundary change, so the next
  immutable version is `0.2.0`, not a patch release.
- Existing audits cover every affected surface/state/width. Cupom's contextual range control will
  move to `styled(Button)` to avoid depending on runtime style injection order.
