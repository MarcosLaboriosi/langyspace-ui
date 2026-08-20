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

## In progress

Task 01.1 — minimal repository/package configuration.

## Next subtask

Task 01.2 — install dependencies and commit a frozen pnpm lockfile.

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
