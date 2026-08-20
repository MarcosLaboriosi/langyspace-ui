# Progress

## Status

Implementation in progress.

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
- Task 05 — admin login integration committed as `bc4559c`; 224 tests and all visual gate stages
  passed with 1,716 layout scenarios.
- Task 06 — student profile integration committed as `149f0e3`; six focused tests and 216 layout
  scenarios passed.
- Task 07 — teacher auth wrapper integration committed as `f1942ff`; two focused tests, 162 layout
  scenarios and compact-height visual review passed.
- Task 08 — cupom report-range integration committed as `95f4537`; 15 tests, 36 layout scenarios
  and visual review at 390, 1281 and 2048 px passed.

## In progress

Task 09.3 — promote each clean, fast-forward consumer commit to `main` sequentially.

## Next subtask

Task 09.4 — monitor each Firebase Hosting workflow to successful completion before continuing.

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
