# Task 06 — Integrate langyspace-student

## Responsibility

Install the release and use the shared Button for the audited edit-profile actions.

## Subtasks

- [x] 06.1 Create isolated branch/worktree from current `origin/main`.
- [x] 06.2 Install exact release URL and import shared CSS once.
- [x] 06.3 Replace only the `/perfil/editar` Button import; preserve props/handlers/copy and update
      the focused loading assertion from the local Lucide implementation to the shared spinner and
      `aria-busy` contract.
- [x] 06.4 Run focused profile tests/build and full UI validation.
- [x] 06.5 Audit edit-profile geometry in normal/stress modes and inspect the repository's stable
      representative stress screenshots at 390, 1281 and 2048.
- [x] 06.6 Review/stage explicit diff and commit.

## Completion conditions

- Cancel/save semantics and loading/disabled behavior are unchanged.
- Other student Button primitives remain local.
- No checkout, portal data or production operation is exercised.

## Visual gate

`direct`; `/perfil/editar` normal/stress and action containment must pass.

## Evidence

- Isolated branch `feat/shared-ui-button-v1` from `origin/main`; original worktree remained clean.
- Final consumer commit `126a518` (`feat(ui): adopt shared profile buttons`), including the exact
  `@langyspace/ui@0.1.0` pnpm 11 publication-age exception. Frozen install passed all 506 lockfile
  policy checks.
- Six focused edit-profile tests passed, including save, normalized update and loading semantics.
- `pnpm run validate:ui`: build and 216 normal/stress layout scenarios passed with zero geometry
  issues.
- Stable visual evidence: `.local/layout-audit/2026-08-20T16-08-06.975Z`; stress screenshots at
  390, 1281 and 2048 inspected. Cancel/save hierarchy, long e-mail containment and mobile stacking
  passed.
- Cancel/save handlers and copy remained unchanged; local Button remains for other portal surfaces.
- No checkout, portal write or production data path was exercised.
- Visual gate review: passed.
