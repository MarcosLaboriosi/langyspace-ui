# Task 14 — Validate and roll out v0.2.0 to production

## Responsibility

Prove visual/runtime parity in every consumer, promote only scoped commits and verify all five
production sites.

## Subtasks

- [ ] 14.1 Run all five complete UI gates and inspect each surface at 390, 1281 and 2048; also inspect
      Teacher 390x667.
- [ ] 14.2 Review all six repositories as Product/Tech Lead/Senior/QA and repeat visual impact.
- [ ] 14.3 Commit consumer diffs and push only strict fast-forwards to `main`.
- [ ] 14.4 Monitor all five Hosting workflows through success and verify correct target isolation.
- [ ] 14.5 Probe production routes/assets, confirm exact commits and preserve original worktrees.
- [ ] 14.6 Close all epic documents with validation, release and production evidence.

## Completion conditions

- Every gate and required screenshot review passes without weakening assertions.
- Five remote mains and workflows match the reviewed commits.
- Public production routes return 200 and load the CSS-free shared Button bundle.
- Progress has no ambiguous next step and includes the explicit final visual verdict.

## Visual gate

`direct`; completion requires `Visual gate review: passed` with per-product evidence.

## Evidence

Pending.
