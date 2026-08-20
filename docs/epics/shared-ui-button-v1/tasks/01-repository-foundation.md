# Task 01 — Establish repository and package foundation

## Responsibility

Create a minimal, reproducible public library repository before component implementation.

## Subtasks

- [ ] 01.1 Add package metadata, Node/pnpm contract, TypeScript/Vite/test/lint/format configuration,
      ignore rules and README skeleton.
- [ ] 01.2 Install dependencies and commit a frozen pnpm lockfile.
- [ ] 01.3 Create `MarcosLaboriosi/langyspace-ui` as a public GitHub repository, add origin and verify
      visibility/default branch.
- [ ] 01.4 Run config-level lint/type/build smoke checks and review the diff.
- [ ] 01.5 Update epic progress/evidence and mark Task 01 complete.

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

Not yet applicable inside this task because no rendered component exists. The epic remains `direct`
and Task 02 owns the first visual gate.
