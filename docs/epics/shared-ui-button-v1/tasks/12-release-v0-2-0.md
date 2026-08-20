# Task 12 — Publish and verify the immutable styled-components release

## Responsibility

Publish the validated CSS-free styled-components package as an immutable public GitHub Release.

## Subtasks

- [x] 12.1 Commit/push the scoped package change and require main CI success.
- [x] 12.2 Tag exact validated main as `v0.2.0` and monitor the release workflow.
- [x] 12.3 Verify public tarball/checksum, package contents, peer metadata and external smoke install.
- [x] 12.4 Correct the Node SSR styled-components interop, add regression smoke and validate locally.
- [ ] 12.5 Publish/verify immutable `v0.2.1` after the complete gate; do not promote `v0.2.0`.

## Completion conditions

- Tag/version match and release workflow succeeds.
- Public `.tgz` and `.sha256` resolve anonymously and checksum matches.
- External release compiles in a clean consumer without CSS import or bundled styled-components.
- Direct Node import succeeds before any SSR consumer is upgraded.

## Visual gate

`direct`; release uses the same complete library gate approved in Task 11.

## Evidence

- 12.1: scoped package/refinement commit `72fa16e` was pushed as a strict fast-forward to `main`;
  GitHub Actions run `32406316475` passed the package and complete visual-layout gate.
- 12.2: annotated tag `v0.2.0` points to exact validated commit `72fa16e`; release workflow
  `32406503412` passed and published the public non-draft release.
- 12.3: anonymous downloads of the tarball and checksum returned successfully; SHA-256
  `d4f24975a051d82ed6fddfbc2fba8db23b6f8829c18631684aa5747e63970e3e` matched. The archive
  contains ESM/declarations/docs only, declares React and styled-components peers, contains no CSS,
  and the external clean Vite consumer compiled successfully without a stylesheet import.
- Consumer discovery: Landing prerender rejected `v0.2.0` with `TypeError: t.button is not a
function`; this exposed missing Node SSR coverage, so that immutable artifact is not eligible for
  rollout. Product/technical review approved a named-import patch and direct Node smoke in `v0.2.1`.
- 12.4: package/showcase use the named `styled` export, version is `0.2.1`, and package smoke now
  imports `@langyspace/ui` directly in Node before the Vite build. Formatting, lint, six tests,
  CSS-free build, Node/Vite package smoke and diff checks passed; built ESM imports named `styled`.
