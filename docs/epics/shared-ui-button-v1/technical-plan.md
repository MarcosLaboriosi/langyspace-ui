# Technical plan

## Architecture

```text
langyspace-ui (public)
  src/Button.tsx
  src/button.css
  src/index.ts
  showcase/
  scripts/audit-layout.mjs
  .github/workflows/ci.yml
  .github/workflows/release.yml
       |
       | v0.1.0 .tgz + sha256
       v
five package.json + pnpm-lock.yaml
       |
       v
existing Firebase Hosting workflows
```

## Package implementation

- React 19 peer dependency; no runtime dependencies.
- `forwardRef<HTMLButtonElement, ButtonProps>` over a native button.
- `variant`, `size`, `fullWidth`, `icon`, `iconPosition`, `isLoading` are translated to bounded data
  attributes and content.
- Loading uses an internal CSS spinner so consumers do not need `lucide-react`.
- `src/index.ts` exports values/types and owns the stylesheet build entry.
- Vite library mode emits ESM/CSS; TypeScript emits declaration files after Vite empties `dist`.
- Package exports `.` and `./styles.css`; `files` limits the tarball.

## CSS strategy

- Base metrics mirror the common Langy.space button scale: 32/40/48 px heights, pill radius,
  Montserrat/inherited font, black primary, white secondary and transparent tertiary.
- All package selectors use `:where(...)` to keep specificity zero.
- Consumers can compose a local class without `!important`; no theme provider or global token
  contract is introduced in v1.
- Focus uses a two-ring aqua/white/ink treatment and does not depend only on color.
- Long labels use bounded wrapping; icons do not shrink.
- `prefers-reduced-motion` disables translate/spinner motion where appropriate while preserving a
  static busy indicator.

## Validation strategy

### Unit and package

- Vitest + Testing Library/jsdom for semantic behavior.
- `pnpm pack --dry-run` and a smoke install/build in a temporary Vite consumer.
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

### `langyspace-cupom`

- Add dependency and stylesheet import.
- Render period range controls with shared tertiary Button plus the existing local class. Local CSS
  remains authoritative due to higher specificity.

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
| broad production deploy from teacher repo             | integration touches only Hosting-detected paths; verify workflow target detection        |
| new public repo exposes proprietary app logic         | repository contains only generic UI code/docs and is `UNLICENSED`                        |

## External references

- GitHub npm registry authentication:
  <https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry>
- npm trusted publishing prerequisites: <https://docs.npmjs.com/trusted-publishers/>
