# Task 01 — Establish repository and package foundation

## Responsibility

Create a minimal, reproducible public library repository before component implementation.

## Subtasks

- [x] 01.1 Add package metadata, Node/pnpm contract, TypeScript/Vite/test/lint/format configuration,
      ignore rules and README skeleton.
- [x] 01.2 Install dependencies and commit a frozen pnpm lockfile.
- [x] 01.3 Create `MarcosLaboriosi/langyspace-ui` as a public GitHub repository, add origin and verify
      visibility/default branch.
- [x] 01.4 Run config-level lint/type/build smoke checks and review the diff.
- [x] 01.5 Update epic progress/evidence and mark Task 01 complete.

## Evidence

- Foundation commit: `7e3c672`.
- `pnpm run lint`: passed.
- `pnpm run build`: passed after adding the TypeScript 6 `rootDir` requirement.
- `pnpm exec prettier --check .`: passed.
- GitHub repository: public, default branch `main`.
- Local Node 26 exposed an unnecessary upper engine bound; the supported contract is now Node 24+
  while release CI remains pinned to Node 24.

## Completion conditions

- Repository builds an empty public entry without credentials.
- Package metadata names `@langyspace/ui`, React is a peer and license is `UNLICENSED`.
- GitHub repository is public and contains no app source, secrets or generated local artifacts.

## Focused validation

- `pnpm install --frozen-lockfile`
- `pnpm run lint`
- `pnpm run build`
- `pnpm exec prettier --check .`
- `gh repo view MarcosLaboriosi/langyspace-ui --json visibility,defaultBranchRef,url`

## Visual gate

Visual gate review: not applicable — this task introduced repository/package configuration only;
no rendered component exists yet. The epic remains `direct` and Task 02 owns the first visual gate.
