# Technical plan

## Architecture

```text
langyspace-ui (public)
  src/Button/index.tsx
  src/Button/styles.ts
  src/Button/types.ts
  src/index.ts
  showcase/
  scripts/audit-layout.mjs
  .github/workflows/ci.yml
  .github/workflows/release.yml
       |
       | v0.2.0 .tgz + sha256
       v
five package.json + pnpm-lock.yaml
       |
       v
existing Firebase Hosting workflows
```

## Package implementation

- React 19 and styled-components 6 peer dependencies; both externalized from the ESM bundle.
- `forwardRef<HTMLButtonElement, ButtonProps>` over a native button.
- `variant`, `size`, `fullWidth`, `icon`, `iconPosition`, `isLoading` are translated to bounded data
  attributes and content.
- Loading uses an internal CSS spinner so consumers do not need `lucide-react`.
- `src/Button/index.tsx` owns rendering, `styles.ts` owns all styled-components, and `types.ts` owns
  public/internal TypeScript contracts.
- `src/index.ts` exports values/types only. Vite emits ESM; TypeScript emits declaration files after
  Vite empties `dist`.
- Package exports only `.`; `files` limits the tarball. There is no side-effect CSS entry.

## Styled-components strategy

- Base metrics mirror the common Langy.space button scale: 32/40/48 px heights, pill radius,
  Montserrat/inherited font, black primary, white secondary and transparent tertiary.
- Variant and size maps use the styled-components `css` helper with typed transient props.
- Consumers use `styled(Button)` for visual composition; generated `className` is forwarded and
  merged by styled-components. No ThemeProvider or app theme contract is introduced.
- Focus uses a two-ring aqua/white/ink treatment and does not depend only on color.
- Long labels use bounded wrapping; icons do not shrink.
- `prefers-reduced-motion` disables translate/spinner motion where appropriate while preserving a
  static busy indicator.
- The internal spinner and icon wrappers are styled components; no Button selector or keyframe is
  left in a CSS file.

### Consumer composition boundary

- `fullWidth` é a primeira escolha para `width: 100%` porque expressa a necessidade sem CSS local.
- `className` já é combinado com `lsui-button`, e `forwardRef` mantém o componente compatível com
  `styled(Button)`; nenhuma nova prop ou versão do pacote é necessária.
- CSS local pode controlar apenas layout externo (`width` específica, `margin`, posição no owner) e
  estados contextuais ausentes da API (`aria-pressed` sobre fundo inverso).
- CSS local não deve reaplicar `min-height`, padding, font-size/weight, radius, border ou tons
  primary/secondary/tertiary. Essas propriedades pertencem ao par `variant`/`size`.
- Uma exceção recorrente em dois produtos exige nova revisão de produto; ela não vira uma sequência
  de overrides por consumidor.

## Validation strategy

### Unit and package

- Vitest + Testing Library/jsdom for semantic behavior.
- `pnpm pack --dry-run` and a smoke install/build in a temporary Vite consumer that declares both
  peers and imports no CSS.
- ESLint, Prettier, TypeScript and Vite build.

### Visual audit

- Local showcase renders three variants, three sizes, icons, full width, disabled and loading.
- Stress mode replaces labels with long spaced/unbroken content.
- Playwright blocks all external requests and asserts viewport/container/control containment,
  minimum target sizes, no clipped visible text and no page overflow.
- Widths: 390, 768, 1280, 1281, 1440, 1536, 1551, 1552, 2048.
- Screenshots: normal/stress at 390, 1281 and 2048.

### Consumer gates

- `langyspace`: full `pnpm run validate:ui`, landing screenshots.
- `langyspace-admin`: full `pnpm run validate:ui`, login screenshots including submit control.
- `langyspace-student`: full `pnpm run validate:ui`, edit-profile screenshots.
- `langyspace-teacher`: full `pnpm run validate:ui`, login screenshots.
- `langyspace-cupom`: full `pnpm run validate:ui`, report screenshots and pressed range state.

Consumers running pnpm 11 add the exact `@langyspace/ui@0.1.0` selector to
`minimumReleaseAgeExclude`. This prevents pnpm from looking up a non-npm GitHub Release package in
npmjs while retaining publication-age verification for every registry dependency.

For `0.2.0`, every pnpm 11 consumer replaces the exception with the exact new selector. Landing uses
pnpm 10 and needs no publication-age exception.

## Consumer changes

### `langyspace`

- Add exact release URL dependency and stylesheet import.
- Keep the local base component as a compatibility re-export so existing imports remain stable.
- Hero remains the audited production consumer.

### `langyspace-admin`

- Add dependency and stylesheet import.
- Use shared Button only for `/login` submit; map the existing trailing icon to
  `icon`/`iconPosition="end"`.
- Retain local Button for brand, danger and ghost contracts that are out of v1.

### `langyspace-student`

- Add dependency and stylesheet import.
- Use shared Button directly in `/perfil/editar`; existing props are compatible.
- Retain local Button elsewhere until a later migration.

### `langyspace-teacher`

- Add dependency and stylesheet import.
- Refactor `AuthSubmitButton` to style/compose the shared Button while preserving its public API and
  responsive auth-specific geometry.
- Keep root manifest/lockfile changes in the Hosting detector. Function build/deploy invalidation
  follows the manifests and source beneath `functions/packages/*`, so a frontend-only dependency
  update cannot redeploy every Function.

### `langyspace-cupom`

- Add the package/peer dependencies without a stylesheet import.
- Render period range controls with a local `styled(Button)` that owns only equal width and the
  inverse pressed/unpressed context.

## Styled-components 0.2.0 migration

### Package refactor

- Move `Button.tsx` and its test into `src/Button/`.
- Move public API types and styled transient props into `src/Button/types.ts`.
- Translate every declaration, state, reduced-motion rule and spinner keyframe from `button.css` to
  `src/Button/styles.ts` without changing computed visual contracts.
- Delete `button.css` and the obsolete wildcard CSS declaration; remove CSS entry/export,
  `sideEffects` and `cssFileName` configuration.
- Add `styled-components >=6 <7` as a peer plus `^6.4.0` for development, and externalize it in
  Vite.
- Update showcase dark-surface composition to a local `styled(Button)` so the library proves the
  preferred extension path.

### Consumer migration

- All five consumers remove `@langyspace/ui/styles.css` and pin the immutable `0.2.0` release URL.
- Landing/Admin/Student/Teacher already declare compatible styled-components and need no new peer.
- Cupom adds `styled-components ^6.4.0`, creates a local `styles.ts` RangeButton composed from the
  shared Button, and removes the obsolete range declarations from page CSS.
- Copy, handlers, refs, semantics, loading/disabled behavior and local layout remain unchanged.

### SemVer and release

`0.2.0` is required because the `./styles.css` export is removed and styled-components becomes a
required peer. `0.1.0` remains immutable and installable for rollback; no release asset is edited.

### Visual coverage

The rendered component and all five production surfaces remain `direct` impact. Existing offline
fixtures already exercise variants/sizes/loading/focus/long labels plus Landing `/`, Admin `/login`,
Student `/perfil/editar`, Teacher `/login` and Cupom `/relatorio/:id` across the nine required
widths. No new route or state is introduced, so audit code changes are unnecessary. Inspect 390,
1281 and 2048 screenshots for each surface, plus Teacher 390x667.

### Critical plan review

- Product Manager: this is an implementation simplification, not a new variant or redesign. Visual
  acceptance requires parity with the approved `0.1.0` surface.
- Tech Lead: a peer dependency is preferable to bundling styled-components because duplicate
  instances break theme/context behavior and inflate consumers. Removing the CSS export makes the
  SemVer boundary explicit.
- Senior Engineer: folder separation keeps render, styles and types single-purpose. Cupom must use
  `styled(Button)` because generated runtime style order makes plain CSS overrides less reliable.
- QA: source and tarball searches must prove that no legacy stylesheet/import remains; full gates
  and screenshots prove runtime parity, including prerender and no-ThemeProvider consumption.
- Operations: publish and verify `0.2.0` before touching consumer lockfiles; deploy only immutable
  release URLs and preserve original dirty Admin/Teacher worktrees through isolated branches.

## Task 10 implementation refinement

### Affected files

- Library: `README.md` and this epic only; `src/Button.tsx`/`button.css` remain unchanged.
- Teacher: `src/components/layout/AuthSubmitButton/styles.ts` only. Keep responsive external
  `margin-top`; remove duplicated geometry, tones, borders, typography and states. The wrapper keeps
  `fullWidth size="lg"` in JSX.
- Cupom: `src/pages/CouponMetricsPage/styles.css` only. Keep equal `min-width` and the inverse
  pressed/unpressed colors; remove duplicated padding, border, radius, cursor and typography.

### Validation and rollout

- Library documentation: Prettier plus existing CI; no tag/release because runtime files and public
  API do not change.
- Teacher: focused `AuthSubmitButton` tests, build and full `pnpm run validate:ui`; inspect `/login`
  stress at 390, 1281 and 2048 plus compact-height 390x667.
- Cupom: focused tests/build through full `pnpm run validate:ui`; inspect sanitized report stress at
  390, 1281 and 2048 with pressed/unpressed controls.
- Push only fast-forward commits from clean isolated branches, monitor the two Hosting workflows and
  verify the production bundles still contain `lsui-button`.

### Critical plan review

- Product Manager: normalization reduces arbitrary visual vocabulary without hiding real width or
  selected-state requirements; no new variant or migration of unrelated buttons is justified.
- Tech Lead: the current native-prop/ref/className contract already supports styled-components and
  plain CSS. Releasing `0.1.1` would add operational risk without a runtime change.
- Senior Engineer: declarations are removed only where the shared `lg`/`sm` values already own the
  same responsibility. Teacher's external rhythm and Cupom's contextual inverse state remain local.
- QA: both changed surfaces already have deterministic offline fixtures at all required widths. The
  existing audit needs no new route/state; current cases cover loading and the selected range.
- Security/operations: no Firebase, auth, data, package URL or lockfile changes. Deploy scope is only
  Teacher and Cupom Hosting.

## Release and versioning

- SemVer starts at `0.1.0` because API is intentionally pre-1.0.
- `release.yml` runs on `v*`, verifies exact tag/version match, validates, packs, writes SHA-256 and
  creates the GitHub Release.
- Consumers pin the immutable release asset URL. No floating tag or branch is accepted.
- Rollback is a dependency URL/lockfile revert followed by existing app deployment.

## Repository/worktree safety

- `langyspace-admin` and `langyspace-teacher` have unrelated dirty changes.
- Integrations will use isolated worktrees/branches from current `origin/main` and stage explicit
  files only.
- Before updating `main`, fetch and require a fast-forward base; never reset or clean user work.
- Final diff checks compare each commit against its parent and verify original dirty worktrees are
  unchanged.

## Security and privacy

- No registry token, `.npmrc`, Firebase credential or cross-repository PAT is added.
- Release workflow uses the repository-scoped `GITHUB_TOKEN` only for contents write.
- Showcase/audits run offline with synthetic content and reject external requests.
- The package has no network, storage or Firebase code.

## Risks and mitigations

| Risk                                                  | Mitigation                                                                               |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| release asset URL unavailable during consumer install | wait for workflow completion and verify unauthenticated HEAD/download before integration |
| CSS order changes a consumer                          | zero-specificity package selectors, focused screenshots and full gates                   |
| package tag/version mismatch                          | release workflow hard-fails before creating release                                      |
| React bundled twice                                   | externalize React and declare peer dependency                                            |
| dirty work mixed into commits                         | isolated worktrees and explicit staging                                                  |
| pnpm 11 treats GitHub tarball as unpublished npm name | version-specific age exception; keep policy active for all registry dependencies         |
| broad production deploy from teacher repo             | separate root frontend files from `functions/packages/*`; prove `hosting:teacher` target |
| new public repo exposes proprietary app logic         | repository contains only generic UI code/docs and is `UNLICENSED`                        |
| duplicate styled-components runtime                   | peer dependency plus Vite external; every consumer declares one compatible v6 instance   |
| runtime injection changes override order              | use `styled(Button)` for contextual visual composition; full screenshot gates            |
| consumer keeps removed CSS subpath                    | static cross-repository search plus build in every consumer                              |
| landing prerender renders an unstyled Button          | production prerender/build plus Landing visual audit before rollout                      |

## External references

- GitHub npm registry authentication:
  <https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry>
- npm trusted publishing prerequisites: <https://docs.npmjs.com/trusted-publishers/>
