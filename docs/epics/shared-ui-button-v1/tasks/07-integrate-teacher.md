# Task 07 — Integrate langyspace-teacher

## Responsibility

Install the release beneath the audited auth submit wrapper while preserving auth-specific layout.

## Subtasks

- [x] 07.1 Create isolated branch/worktree without touching dirty Function work.
- [x] 07.2 Install exact release URL and import shared CSS once.
- [x] 07.3 Refactor `AuthSubmitButton` to compose shared Button behavior and keep local styled geometry.
- [x] 07.4 Update focused auth submit tests when needed; run build and full UI validation.
- [x] 07.5 Inspect `/login` screenshots at 390, 1281 and 2048, including compact-height behavior.
- [x] 07.6 Review/stage explicit diff, commit and verify original dirty worktree is unchanged.

## Completion conditions

- Public wrapper props and login copy/handlers remain unchanged.
- Loading spinner/aria/disabled behavior comes from shared Button.
- No Firebase auth contract or Function code changes.

## Visual gate

`direct`; `/login` normal/stress across approved widths must pass.

## Evidence

- Isolated branch `feat/shared-ui-button-v1` from `origin/main`; original Function/billing worktree
  status remained unchanged.
- Final consumer commit `4f083dd` (`feat(ui): compose shared auth button`), rebased cleanly on
  `5bfb4a2` after `origin/main` advanced.
- The exact `@langyspace/ui@0.1.0` pnpm 11 publication-age exception passed all 794 lockfile policy
  checks.
- Two focused wrapper tests passed: submit/full-width/size defaults and shared loading semantics.
- `pnpm run validate:ui`: build and 162 normal/stress scenarios across `/login`, `/cadastro` and
  portal/public routes passed with zero geometry issues.
- Visual evidence: `.local/layout-audit/2026-08-20T16-14-44.712Z`; `/login` stress screenshots at
  390, 1281 and 2048 inspected. Compact-height 390x667 evidence:
  `.local/layout-audit/2026-08-20T16-14-07.820Z`.
- The audit now accepts `LAYOUT_AUDIT_HEIGHT` and records `viewportHeight`, enabling repeatable
  compact-height regression checks without changing the default gate.
- Post-rebase validation passed build and all 162 scenarios again; artifact:
  `.local/layout-audit/2026-08-20T17-29-31.969Z`.
- The deploy workflow now treats root frontend manifest/lockfile changes as Hosting-only; Function
  codebase manifests under `functions/packages/*` remain the Function dependency invalidation path.
  The production run proved target `hosting:teacher` while all Function build/deploy preparation
  steps were skipped.
- Public wrapper props, login/cadastro copy and handlers remained unchanged; no Firebase/Function
  contract changed.
- Visual gate review: passed.
