# Task 13 — Upgrade all five consumers to v0.2.0

## Responsibility

Pin every product to the immutable styled-components release and remove the legacy global CSS
integration.

## Subtasks

- [ ] 13.1 Create clean isolated branches from current remote mains and preserve original worktrees.
- [ ] 13.2 Upgrade Landing and remove its stylesheet import; run focused build/checks.
- [ ] 13.3 Upgrade Admin and remove its stylesheet import; run focused build/checks.
- [ ] 13.4 Upgrade Student and remove its stylesheet import; run focused build/checks.
- [ ] 13.5 Upgrade Teacher and remove its stylesheet import; run focused tests/build.
- [ ] 13.6 Upgrade Cupom, add the peer and compose the range control with `styled(Button)`; run
      focused tests/build.
- [ ] 13.7 Run a static cross-repository audit proving one exact release and zero legacy CSS imports.

## Completion conditions

- Five manifests/lockfiles resolve the same public `0.2.0` tarball.
- No consumer imports `@langyspace/ui/styles.css`.
- Cupom owns one compatible styled-components runtime and retains its pressed-state design.
- All focused builds/tests pass before full visual validation.

## Visual gate

`direct`; full app gates and screenshot review are owned by Task 14.

## Evidence

Pending.
