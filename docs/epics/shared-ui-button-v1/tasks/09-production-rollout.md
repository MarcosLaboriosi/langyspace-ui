# Task 09 — Complete cross-repository release and production rollout

## Responsibility

Perform final cross-repository review, land each scoped commit on main, verify automated production
deploys and close the epic with evidence.

## Subtasks

- [ ] 09.1 Re-run final library and five consumer validations from exact commits.
- [ ] 09.2 Review all six diffs as Product, Tech Lead, Senior Engineer and QA; repeat visual impact
      classification.
- [ ] 09.3 Push each consumer commit to `main` only if it fast-forwards current `origin/main`.
- [ ] 09.4 Monitor all five Firebase Hosting workflows to successful completion.
- [ ] 09.5 Verify public production responses and deployed commit/version evidence.
- [ ] 09.6 Confirm original dirty worktrees are preserved and no secret/config was added.
- [ ] 09.7 Update all epic docs, check all tasks and record final visual gate verdict.

## Completion conditions

- Library release and five consumer mains reference the same `0.1.0` asset.
- Five workflows succeed and public sites respond after deployment.
- Every acceptance criterion has current evidence.
- `progress.md` has no ambiguous next step.

## Final visual gate

Repeat `direct` classification. Record per-repository command, scenario count, screenshot paths and
inspection verdict. The epic is incomplete if any surface is blocked.
