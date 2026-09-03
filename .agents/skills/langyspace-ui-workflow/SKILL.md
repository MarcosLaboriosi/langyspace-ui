---
name: langyspace-ui-workflow
description: Use for shared component or public API implementation, visual/interaction changes, tokens or theming, Storybook/layout audits, packaging, or library release work. Do not load for simple read-only answers or isolated documentation edits.
---

# Langyspace UI workflow

Preserve root invariants and read `references/component-quality.md` for any component, public API,
visual, Storybook, package, or release change.

For medium/large work, create a reviewed and resumable `docs/epics/<name>/` with product and
technical requirements, dependency-ordered tasks, progress, risks, and acceptance criteria. Execute
one small task at a time and validate narrowly before the full applicable gate. Batch independent
read-only discovery and checks in one tool round; keep writes dependency-ordered and do not rerun an
unchanged gate.

Do not infer permission to publish a package, push tags, deploy, or mutate downstream applications.
