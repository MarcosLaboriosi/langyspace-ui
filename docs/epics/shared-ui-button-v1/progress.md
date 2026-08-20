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

## In progress

None.

## Next subtask

Task 03.1 — add CI for pull requests and main.

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
