# Task 12 — Publish and verify immutable release v0.2.0

## Responsibility

Publish the validated CSS-free styled-components package as an immutable public GitHub Release.

## Subtasks

- [ ] 12.1 Commit/push the scoped package change and require main CI success.
- [ ] 12.2 Tag exact validated main as `v0.2.0` and monitor the release workflow.
- [ ] 12.3 Verify public tarball/checksum, package contents, peer metadata and external smoke install.

## Completion conditions

- Tag/version match and release workflow succeeds.
- Public `.tgz` and `.sha256` resolve anonymously and checksum matches.
- External release compiles in a clean consumer without CSS import or bundled styled-components.

## Visual gate

`direct`; release uses the same complete library gate approved in Task 11.

## Evidence

Pending.
