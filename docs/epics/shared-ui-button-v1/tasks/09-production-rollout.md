# Task 09 — Complete cross-repository release and production rollout

## Responsibility

Perform final cross-repository review, land each scoped commit on main, verify automated production
deploys and close the epic with evidence.

## Subtasks

- [x] 09.1 Re-run final library and five consumer validations from exact commits.
- [x] 09.2 Review all six diffs as Product, Tech Lead, Senior Engineer and QA; repeat visual impact
      classification.
- [x] 09.3 Push each consumer commit to `main` only if it fast-forwards current `origin/main`.
- [x] 09.4 Monitor all five Firebase Hosting workflows to successful completion.
- [x] 09.5 Verify public production responses and deployed commit/version evidence.
- [x] 09.6 Confirm original dirty worktrees are preserved and no secret/credential was added.
- [x] 09.7 Update all epic docs, check all tasks and record final visual gate verdict.

## Completion conditions

- Library release and five consumer mains reference the same `0.1.0` asset.
- Five workflows succeed and public sites respond after deployment.
- Every acceptance criterion has current evidence.
- `progress.md` has no ambiguous next step.

## Final visual gate

Repeat `direct` classification. Record per-repository command, scenario count, screenshot paths and
inspection verdict. The epic is incomplete if any surface is blocked.

## Pre-production evidence

- UI library `68d7930`: `pnpm run validate:ui` passed with 5 tests, production/declaration build,
  clean-consumer tarball smoke and 18 visual scenarios. Artifact:
  `.local/layout-audit/2026-08-20T16-27-31.723Z`.
- Landing `272633a`: `pnpm run validate:ui` passed with build/prerender and 198 layout scenarios.
  Artifact: `.local/layout-audit/2026-08-20T16-25-46.910Z`.
- Admin `bc4559c`: 224 tests, build, 11 accessibility flows, 45 design-system scenarios and 1,716
  layout scenarios passed. The Node 26 local runner used an isolated `localStorage` file and serial
  test files; the production workflow uses Node 24. Layout artifact:
  `.local/admin-layout-audit/2026-08-20T16-34-54.429Z`.
- Student UI diff (final SHA `126a518`): `pnpm run validate:ui` passed with build and 216 layout
  scenarios. Artifact:
  `.local/layout-audit/2026-08-20T16-26-22.364Z`.
- Teacher final UI SHA `4f083dd`: post-rebase `pnpm run validate:ui` passed with build and 162
  layout scenarios. Artifact: `.local/layout-audit/2026-08-20T17-29-31.969Z`.
- Cupom UI diff (final SHA `afc44a6`): `pnpm run validate:ui` passed with 15 tests, build and 36
  layout scenarios.
  Artifact: `.local/layout-audit/2026-08-20T16-24-44.635Z`.
- The immutable public artifact still resolves anonymously with SHA-256
  `950ebe1190d047a42469ed740af5da956fc73686e5695dc468df10c2be4545d2`; UI Library main CI run
  `32391635517` passed for `68d7930`.

## Final review before rollout

- Product: the first adoption stays intentionally narrow—one existing, representative Button
  surface per product—and preserves each surface's copy, hierarchy and actions.
- Tech Lead: all five consumers pin the same immutable release URL, import shared CSS once and keep
  product-specific composition local; no new registry credential is needed at install or CI time.
- Senior Engineer: diffs are scoped and fast-forward current `origin/main`; native props, refs,
  handlers and semantic states remain owned by the shared primitive without contract-forcing casts.
- QA: unit/build/package/a11y/design/layout gates passed, with manual screenshot inspection already
  recorded in Tasks 02 and 04–08. No production data or destructive flow was exercised.
- Repeated visual classification: `direct`; pre-production visual gate `passed` for every affected
  surface.

## Production evidence

| Product | Final main SHA | Successful workflow | Firebase Hosting                     |
| ------- | -------------- | ------------------- | ------------------------------------ |
| Landing | `272633a`      | `32393691284`       | `https://langyspace-564b5.web.app`   |
| Admin   | `7218b4b`      | `32394417756`       | `https://langyspace-admin.web.app`   |
| Student | `126a518`      | `32397183049`       | `https://langyspace-student.web.app` |
| Teacher | `4f083dd`      | `32399347546`       | `https://langyspace-teacher.web.app` |
| Cupom   | `afc44a6`      | `32399833309`       | `https://langyspace-cupom.web.app`   |

- Every remote `main` exactly matched its final integration worktree SHA after deployment.
- Production probes returned HTTP 200 for Landing `/`, Admin `/login`, Student `/perfil/editar`,
  Teacher `/login` and Cupom `/` without executing client code, authentication, redirects or data
  calls.
- The deployed entry CSS and JavaScript for every site contained the `lsui-button` marker. Observed
  CSS assets: Landing `index-DgLn2jMW.css`, Admin `index-CucIyVYJ.css`, Student and Teacher
  `index-YoOWI3J5.css`, Cupom `index-G-5BFAPW.css`.
- Admin's first run `32394025720` exposed pnpm 11's default registry age lookup for the GitHub
  Release tarball. The version-specific exception retained the policy for every other dependency;
  exact pnpm `11.2.2` frozen installs passed in Admin, Student, Teacher and Cupom before rollout.
- Teacher `origin/main` advanced during rollout. The integration was rebased and fully revalidated.
  A pre-existing auth deployment run `32393492196` then failed independently after partial Function
  updates with Cloud Run health-check/readiness deadlines. The UI workflow was narrowed to its
  correct `hosting:teacher` target; run `32399347546` skipped all Function preparation/deploy work
  and released Hosting successfully.
- Integration worktrees were clean. Original Landing, Student and Cupom worktrees remained clean;
  original Admin billing/data-refresh work and Teacher billing/Function work remained uncommitted
  and untouched. No secret, `.env` value or provider credential entered an integration diff.
- Final visual classification: `direct`.
- Final visual gate: `passed` for Library, Landing, Admin, Student, Teacher and Cupom, with the
  command/scenario/screenshot evidence above and in Tasks 02 and 04–08.
