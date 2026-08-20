# Task 14 — Validate and roll out v0.2.1 to production

## Responsibility

Prove visual/runtime parity in every consumer, promote only scoped commits and verify all five
production sites.

## Subtasks

- [x] 14.1 Run all five complete UI gates and inspect each surface at 390, 1281 and 2048; also inspect
      Teacher 390x667.
- [x] 14.2 Review all six repositories as Product/Tech Lead/Senior/QA and repeat visual impact.
- [x] 14.3 Commit consumer diffs and push only strict fast-forwards to `main`.
- [x] 14.4 Monitor all five Hosting workflows through success and verify correct target isolation.
- [x] 14.5 Probe production routes/assets, confirm exact commits and preserve original worktrees.
- [x] 14.6 Close all epic documents with validation, release and production evidence.

## Completion conditions

- Every gate and required screenshot review passes without weakening assertions.
- Five remote mains and workflows match the reviewed commits.
- Public production routes return 200 and load the CSS-free shared Button bundle.
- Progress has no ambiguous next step and includes the explicit final visual verdict.

## Visual gate

`direct`; completion requires `Visual gate review: passed` with per-product evidence.

## Evidence

- 14.1: all complete gates passed without assertion changes: Landing 198 scenarios
  (`2026-08-20T19-23-44.330Z`); Admin 224 tests, 11 accessibility flows, 45 design-system scenarios
  and 1,716 layout scenarios (`2026-08-20T19-28-25.934Z`); Student 216 scenarios
  (`2026-08-20T19-42-32.902Z`); Teacher 162 scenarios plus 18 login scenarios at 667 px height
  (`2026-08-20T19-44-38.051Z`, `2026-08-20T19-46-20.837Z`); Cupom 15 tests and 36 scenarios
  (`2026-08-20T19-46-56.039Z`). Required 390/1281/2048 screenshots and Teacher 390x667 were
  inspected. Buttons retained hierarchy, contrast, loading/pressed state, containment and local
  composition with no clipping or overflow. Admin tests required the documented temporary Node
  localStorage file; no code/assertion changed.
- 14.2: final six-repository diff review reconfirmed `direct` impact limited to the same Button
  surfaces. Product review found no new variants/copy/flow; technical review found only exact release
  pins, lock resolution, import removal and Cupom's bounded context wrapper; senior review found no
  duplicated metrics or runtime fallback; QA confirmed all diffs/checks, semantics, visual evidence
  and original dirty Admin/Teacher worktree isolation. Approved for scoped commits.
- 14.3: five clean commits were created and strict-fast-forwarded to current remote mains: Landing
  `716056b`, Admin `d40b367`, Student `edc2b7e`, Teacher `f20aa74` and Cupom `3a469c4`. Each staging
  set was explicit and every worktree was clean before push.
- 14.4: all five push-triggered workflows completed successfully: Landing `32410680419`, Admin
  `32410680747`, Student `32410682154`, Teacher `32410680456` and Cupom `32410680085`. Teacher's
  change detector skipped Java/emulators, both Function builds, secrets, settings, Function package
  preparation and Storage Rules; only the frontend validation and Firebase Hosting target ran.
  Concurrent Teacher main `b3ddccf` later passed workflow `32412157863` with the same target
  isolation and became the current production deployment.
- 14.5: public Landing `/`, Admin `/login`, Student `/login`, Teacher `/login` and Cupom's sanitized
  report route all returned HTTP 200. Current assets are Landing `index-D_7_VlbB.js`, Admin
  `index-D3Qab4ay.js`, Student `index-BLhW1hyM.js`, Teacher `index-NgbI4TbJ.js` and Cupom
  `index-B5rl8Ta2.js`; every JavaScript bundle contains the shared Button runtime markers and every
  emitted CSS asset contains zero legacy `lsui-button` rules. Admin, Student and Cupom matched the
  validated local bundle hashes byte for byte; Landing and current Teacher asset names match their
  environment-specific successful workflow build output. Remote mains for Landing, Admin, Student
  and Cupom equal their rollout commits. Teacher `b3ddccf` contains `f20aa74` as an ancestor and
  retains the exact `v0.2.1` URL with no stylesheet import. All five integration worktrees are clean;
  the original dirty Admin and Teacher worktrees remain preserved and outside this rollout.
- 14.6: epic status, outcome, task index, release evidence, consumer evidence and production proof
  were reconciled with no ambiguous next subtask. Final verdict: `Visual gate review: passed`.
