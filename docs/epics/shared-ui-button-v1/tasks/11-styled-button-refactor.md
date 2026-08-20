# Task 11 — Refactor Button to styled-components and separated types

## Responsibility

Replace the Button CSS artifact with a folder-based styled-components implementation while
preserving the public behavioral and visual contract.

## Subtasks

- [x] 11.1 Complete product/technical refinement, dependency decision, visual coverage map and
      critical review before runtime edits.
- [x] 11.2 Add/externalize the styled-components peer and update package metadata for `0.2.0`.
- [x] 11.3 Create `src/Button/index.tsx`, `styles.ts` and `types.ts`; migrate tests and delete legacy
      CSS/type-declaration files.
- [x] 11.4 Update showcase, README and clean-consumer package smoke for the CSS-free contract.
- [x] 11.5 Run focused tests/build/package checks and review the package diff.
- [x] 11.6 Run the complete library visual gate and inspect normal/stress screenshots at 390, 1281
      and 2048.

## Completion conditions

- No `button.css`, CSS import, CSS export or generated package stylesheet remains.
- Public Button API/types/ref/native-prop/loading behavior remain compatible.
- React and styled-components are external peers; a clean Vite consumer builds without CSS import.
- Visual parity passes the complete deterministic showcase gate.

## Visual gate

`direct`; the existing showcase covers all affected states, extremes and widths.

## Evidence

- 11.1: product review, technical plan, technical review and dependency-ordered Tasks 11–14 were
  completed before runtime edits. Decision: `0.2.0`, React/styled-components external peers,
  `src/Button/{index.tsx,styles.ts,types.ts}`, no CSS export/import, Cupom composition through
  `styled(Button)`, and existing deterministic audit coverage for all six rendered surfaces.
- 11.2: package version is `0.2.0`; CSS side effect/subpath and Vite CSS filename were removed;
  styled-components is declared as `>=6 <7` peer, `^6.4.0` dev dependency and Rollup external.
  Lockfile install resolves one development instance and metadata/format/diff checks passed.
- 11.3: Button render, styled-components and public/internal types now live in separate folder files;
  test moved beside the component and includes explicit `styled(Button)` composition coverage. The
  legacy component/CSS/wildcard declaration were deleted. Six tests and the CSS-free ESM/declaration
  build pass; built ESM imports styled-components externally.
- 11.4: README now installs `0.2.0` with its peer and requires no CSS import; showcase version/dark
  state composes local `styled(Button)`; package smoke declares the peer, rejects any CSS asset and
  requires the Button marker in the bundled JavaScript. CSS-free build/tarball and clean Vite
  consumer smoke passed.
- 11.5: lint, full format check, six unit tests, CSS-free ESM/declaration build and package smoke all
  passed. Final package diff review found no API, native-prop/ref, accessibility or scope regression;
  the tarball contains only ESM/declarations/docs/license and built ESM keeps styled-components as
  an external import.
- 11.6: `pnpm run validate:ui` passed six tests, the CSS-free package/clean-consumer smoke and all 18
  deterministic scenarios at nine widths. Normal and stress screenshots at 390, 1281 and 2048 px
  were inspected under `.local/layout-audit/2026-08-20T18-58-04.234Z`; variants, sizes, long labels,
  full-width, focus, loading and the dark local `styled(Button)` composition remained legible,
  contained and visually consistent without clipping or overflow.
