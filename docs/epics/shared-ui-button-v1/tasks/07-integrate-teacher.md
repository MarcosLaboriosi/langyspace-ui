# Task 07 — Integrate langyspace-teacher

## Responsibility

Install the release beneath the audited auth submit wrapper while preserving auth-specific layout.

## Subtasks

- [ ] 07.1 Create isolated branch/worktree without touching dirty Function work.
- [ ] 07.2 Install exact release URL and import shared CSS once.
- [ ] 07.3 Refactor `AuthSubmitButton` to compose shared Button behavior and keep local styled geometry.
- [ ] 07.4 Update focused auth submit tests when needed; run build and full UI validation.
- [ ] 07.5 Inspect `/login` screenshots at 390, 1281 and 2048, including compact-height behavior.
- [ ] 07.6 Review/stage explicit diff, commit and verify original dirty worktree is unchanged.

## Completion conditions

- Public wrapper props and login copy/handlers remain unchanged.
- Loading spinner/aria/disabled behavior comes from shared Button.
- No Firebase auth contract or Function code changes.

## Visual gate

`direct`; `/login` normal/stress across approved widths must pass.
