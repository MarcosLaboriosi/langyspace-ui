# Task 06 — Integrate langyspace-student

## Responsibility

Install the release and use the shared Button for the audited edit-profile actions.

## Subtasks

- [ ] 06.1 Create isolated branch/worktree from current `origin/main`.
- [ ] 06.2 Install exact release URL and import shared CSS once.
- [ ] 06.3 Replace only the `/perfil/editar` Button import; preserve props/handlers/copy and update
      the focused loading assertion from the local Lucide implementation to the shared spinner and
      `aria-busy` contract.
- [ ] 06.4 Run focused profile tests/build and full UI validation.
- [ ] 06.5 Inspect edit-profile screenshots at 390, 1281 and 2048 in normal/stress modes.
- [ ] 06.6 Review/stage explicit diff and commit.

## Completion conditions

- Cancel/save semantics and loading/disabled behavior are unchanged.
- Other student Button primitives remain local.
- No checkout, portal data or production operation is exercised.

## Visual gate

`direct`; `/perfil/editar` normal/stress and action containment must pass.
