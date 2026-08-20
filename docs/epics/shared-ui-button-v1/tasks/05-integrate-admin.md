# Task 05 — Integrate langyspace-admin

## Responsibility

Install the release and use the shared Button for the audited admin login submit only.

## Subtasks

- [x] 05.1 Create isolated branch/worktree without touching the dirty feature worktree.
- [x] 05.2 Install exact release URL and import shared CSS once.
- [x] 05.3 Replace only `/login` submit import and map trailing icon to the v1 API.
- [x] 05.4 Run focused unit/build checks and full UI validation.
- [x] 05.5 Inspect login screenshots at 390, densest boundary and 2048, including focus/loading
      evidence from design-system/unit coverage.
- [x] 05.6 Review/stage explicit diff, commit and verify dirty user work is unchanged.

## Completion conditions

- Local admin Button remains authoritative for brand, danger and ghost variants.
- Login submit retains full width, lg size, submit type, loading and icon.
- No unrelated admin billing/data work is committed.

## Visual gate

`direct`; `/login` normal and dense widths must pass alongside design-system/a11y gates.

## Evidence

- Isolated branch `feat/shared-ui-button-v1` from `origin/main`; original dirty feature worktree
  status remained unchanged.
- Consumer commit `bc4559c` (`feat(ui): adopt shared admin login button`).
- Node 26 required the known temporary localStorage file and serial Vitest execution; 224/224 tests
  passed. Build, 11 accessibility flows, 45 design-system scenarios and every remaining
  `validate:ui` stage passed.
- Layout audit: 1,716 scenarios, 780 table reads, 18,122 cell reads and zero geometry issues.
- Visual evidence: `.local/admin-layout-audit/2026-08-20T15-44-51.517Z`; `/login` screenshots at
  390, 1281 and 2048 inspected. Full-width CTA, label, end icon and responsive containment passed.
- Shared package unit/showcase evidence covers loading, disabled, focus and reduced-motion states.
- Local admin Button and its brand/danger/ghost API were not changed.
- Visual gate review: passed; exact Node 24 aggregate command remains a production-CI rollout gate.
