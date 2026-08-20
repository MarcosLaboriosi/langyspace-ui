# Task 03 — Automate and publish release v0.1.0

## Responsibility

Create CI/release automation and publish the first immutable installable artifact.

## Subtasks

- [x] 03.1 Add CI for pull requests and main.
- [x] 03.2 Add tag release workflow with version verification, full validation, pack and SHA-256.
- [ ] 03.3 Commit/push the reviewed library to main.
- [ ] 03.4 Tag `v0.1.0`, monitor the workflow and verify release assets/metadata.
- [ ] 03.5 Download/install the public asset without auth and rerun package smoke build.
- [ ] 03.6 Update progress and mark the immutable consumer URL.

## Completion conditions

- CI and release workflows succeed on GitHub-hosted runners.
- Public `.tgz` and checksum match locally calculated values.
- Unauthenticated release URL is stable and ready for five consumers.

## Focused validation

- `gh run list --repo MarcosLaboriosi/langyspace-ui`
- `gh release view v0.1.0 --repo MarcosLaboriosi/langyspace-ui`
- unauthenticated `curl` download plus `shasum -a 256 -c`
- `pnpm run test:package -- <release-url>` when supported by the smoke script

## Visual gate

`Visual gate review: passed` must be inherited from the exact commit/tag validated by the release
workflow; inspect the workflow artifact if local evidence differs.
