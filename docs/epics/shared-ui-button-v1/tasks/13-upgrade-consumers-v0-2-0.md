# Task 13 — Upgrade all five consumers to v0.2.1

## Responsibility

Pin every product to the immutable styled-components release and remove the legacy global CSS
integration.

## Subtasks

- [x] 13.1 Create clean isolated branches from current remote mains and preserve original worktrees.
- [x] 13.2 Upgrade Landing and remove its stylesheet import; run focused build/checks.
- [x] 13.3 Upgrade Admin and remove its stylesheet import; run focused build/checks.
- [x] 13.4 Upgrade Student and remove its stylesheet import; run focused build/checks.
- [x] 13.5 Upgrade Teacher and remove its stylesheet import; run focused tests/build.
- [x] 13.6 Upgrade Cupom, add the peer and compose the range control with `styled(Button)`; run
      focused tests/build.
- [x] 13.7 Run a static cross-repository audit proving one exact release and zero legacy CSS imports.

## Completion conditions

- Five manifests/lockfiles resolve the same public `0.2.1` tarball.
- No consumer imports `@langyspace/ui/styles.css`.
- Cupom owns one compatible styled-components runtime and retains its pressed-state design.
- All focused builds/tests pass before full visual validation.

## Visual gate

`direct`; full app gates and screenshot review are owned by Task 14.

## Evidence

- 13.1: all five clean integration worktrees were fetched, confirmed equal to their current
  `origin/main` and switched to isolated `refactor/styled-button-v0-2-0` branches. The original dirty
  Admin and Teacher worktrees remain outside this work.
- 13.2: Landing pins the immutable `v0.2.1` tarball and no longer imports the package stylesheet.
  Install, formatting, lint, client build, SSR build and prerender passed; this directly confirms the
  named-import correction at the consumer boundary that exposed the `v0.2.0` failure.
- 13.3: Admin pins `v0.2.1`, updates only the package-specific pnpm age exception and removes the
  stylesheet import. Install, changed-file formatting, lint, production build and diff checks passed
  in its isolated worktree.
- 13.4: Student pins `v0.2.1`, updates only the package-specific pnpm age exception and removes the
  stylesheet import. Changed-file formatting, six focused profile-edit/Button tests with explicit
  jsdom localStorage, production build and diff checks passed. The optional whole-repository lint
  still reports 15 pre-existing React-rule errors in unrelated files; the versioned Student visual
  gate does not include that baseline lint command.
- 13.5: Teacher pins `v0.2.1`, updates only the package-specific pnpm age exception and removes the
  stylesheet import. Changed-file formatting, both `AuthSubmitButton` composition/loading tests,
  production build and diff checks passed without touching the original dirty Teacher worktree.
- 13.6: Cupom pins `v0.2.1`, adds one compatible styled-components dependency, removes the global
  package stylesheet import and moves only range width/pressed-context colors into a dedicated local
  `styles.ts` composed with `styled(Button)`. All 15 tests, production build, focused formatting and
  diff checks passed; the pnpm lockfile was regenerated without an unrelated formatting rewrite.
- 13.7: an automated read-only audit across all five manifests, lockfiles, workspace configs and
  sources proved the exact immutable `v0.2.1` URL/version everywhere, zero `styles.css` imports and
  zero remaining `v0.1.0`/`v0.2.0` consumer references; every consumer diff check passed.
