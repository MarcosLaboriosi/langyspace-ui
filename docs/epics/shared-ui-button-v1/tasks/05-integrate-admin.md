# Task 05 — Integrate langyspace-admin

## Responsibility

Install the release and use the shared Button for the audited admin login submit only.

## Subtasks

- [ ] 05.1 Create isolated branch/worktree without touching the dirty feature worktree.
- [ ] 05.2 Install exact release URL and import shared CSS once.
- [ ] 05.3 Replace only `/login` submit import and map trailing icon to the v1 API.
- [ ] 05.4 Run focused unit/build checks and full UI validation.
- [ ] 05.5 Inspect login screenshots at 390, densest boundary and 2048, including focus/loading
      evidence from design-system/unit coverage.
- [ ] 05.6 Review/stage explicit diff, commit and verify dirty user work is unchanged.

## Completion conditions

- Local admin Button remains authoritative for brand, danger and ghost variants.
- Login submit retains full width, lg size, submit type, loading and icon.
- No unrelated admin billing/data work is committed.

## Visual gate

`direct`; `/login` normal and dense widths must pass alongside design-system/a11y gates.
