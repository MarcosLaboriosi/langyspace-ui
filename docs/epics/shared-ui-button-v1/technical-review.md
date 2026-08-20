# Technical review

## Review outcome

`approved for implementation`

## Tech Lead review

- A repository boundary is appropriate because consumers deploy independently.
- Release tarballs avoid a hidden credential dependency and preserve a future npm migration path.
- React is a peer and external, preventing duplicate runtimes.
- CSS has an explicit import and low specificity; there is no implicit global injection.
- Exact URLs/lockfiles make builds deterministic and rollback auditable.
- V1 avoids a theme abstraction before shared tokens themselves are packaged.

## Senior Engineer review

- The API prevents invalid variant combinations with a union instead of boolean flags.
- `forwardRef`, native props and default `type="button"` cover composition without polymorphism.
- Loading keeps label and button semantics, and uses no consumer icon dependency.
- Consumer changes are intentionally asymmetric because existing contracts differ; forcing one
  migration shape would expand scope.
- Admin-specific danger/brand/ghost behavior remains local instead of leaking into v1.
- Teacher auth-specific spacing remains in a styled wrapper while shared behavior moves underneath.

## QA review

- Every affected surface already has a deterministic audit case: landing, admin login, student edit
  profile, teacher login and coupon report.
- A new library audit covers all public Button states and content extremes.
- Loading is covered in unit/showcase; consumer gates cover normal geometry. No production action is
  executed to manufacture loading.
- Required widths and screenshots are explicit in each task.
- Final production verification checks workflow conclusions and public Hosting responses.

## Accessibility review

- Native button semantics, default type, disabled and aria-busy are testable.
- Focus ring is visible on both light and dark backgrounds in showcase.
- Labels remain present during loading.
- Icon is consumer-owned and must remain decorative or have context outside the Button label; the
  package's spinner is aria-hidden.
- Tertiary pressed state remains expressed by native `aria-pressed` supplied by the cupom page.

## Operational review

- The library release is recoverable and does not mutate app production.
- Consumer promotion relies on existing tested workflows. Rollout evidence required one narrow
  Teacher correction: root frontend manifest/lockfile changes now select Hosting without selecting
  Function codebases, whose own `functions/packages/*` paths remain authoritative.
- pnpm 11's minimum-release-age verification remains active; only the immutable, checksum-verified
  `@langyspace/ui@0.1.0` GitHub Release selector is excluded from an inapplicable npmjs lookup.
- Direct pushes to main are allowed by current repository settings, but each push must be a
  fast-forward of observed `origin/main`.
- If any gate fails, that product is not pushed/deployed until corrected; already deployed products
  remain on the same immutable library version.

## Final pre-code checklist

- [x] Product outcome and non-goals are unambiguous.
- [x] Distribution choice is supported by current authentication evidence.
- [x] API is smaller than any one full local design-system API.
- [x] Task order follows release-before-consumer dependency.
- [x] Visual fixtures and widths are mapped.
- [x] Dirty worktree preservation is explicit.
- [x] Rollback and production verification are defined.

## Post-rollout review

`approved and completed` — the public artifact, all final consumer SHAs, five successful Hosting
workflows, HTTP responses and deployed `lsui-button` asset markers were verified. The failed
pre-existing Teacher auth deployment was isolated from the UI release; the successful UI run
proved a Hosting-only target and skipped all Function preparation/deploy steps.

## Styled-components 0.2.0 technical review

### Review outcome

`approved for implementation`

### Tech Lead

- React and styled-components remain peer dependencies and Rollup externals; the library never owns
  duplicate framework/runtime instances.
- Removing `./styles.css` is intentionally versioned as `0.2.0`; the immutable `0.1.0` release is
  the rollback path.
- No ThemeProvider contract is introduced. Library styles use fixed internal values matching the
  approved v1 visual contract.

### Senior Engineer

- `src/Button/index.tsx`, `styles.ts` and `types.ts` give render, styling and contracts one
  responsibility each.
- Typed `css` maps and transient props express the existing bounded variants/sizes without leaking
  styling-only props into the DOM.
- The Cupom range control moves from a plain class override to `styled(Button)` because both layers
  then share the same runtime and deterministic extension mechanism.
- Clean-consumer smoke must declare styled-components explicitly, compile without CSS imports and
  prove the bundled app still contains the Button runtime marker.

### QA and accessibility

- Existing fixtures cover every affected state and width; no audit assertion or fixture changes are
  justified.
- Full package and five consumer gates remain mandatory because runtime injection could affect
  focus, first render, prerender, local extension and no-ThemeProvider behavior.
- Screenshots at 390, 1281 and 2048 plus Teacher 390x667 must preserve hierarchy, containment and
  contrast. Unit tests preserve native semantics, ref, className, loading and aria contracts.

### Operational review

- Publish/verify the tarball before consumer edits. Every consumer pins the exact release asset and
  pnpm 11 exception where applicable.
- Consumer work happens only in clean isolated branches; original Admin/Teacher changes stay
  untouched.
- Final rollout requires strict fast-forwards, successful Hosting workflows and public asset probes.

### Pre-code checklist

- [x] Product outcome and non-goals are explicit.
- [x] Peer/external and SemVer decisions are resolved.
- [x] Component/type/style file boundaries are explicit.
- [x] Every rendered surface and width has deterministic coverage.
- [x] Release-before-consumer dependency order and rollback are defined.

### SSR compatibility review

`v0.2.0` is rejected for rollout after the real Landing prerender failed with
`TypeError: t.button is not a function`. The failure is isolated to Node loading the externalized
default styled-components import; browser/unit/layout checks passed. The smallest safe correction
is the supported named `styled` export plus a direct Node import smoke. Publish it as immutable
`v0.2.1`; do not replace the existing release or add runtime fallbacks/bundled duplicates.
