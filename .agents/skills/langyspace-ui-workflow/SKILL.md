---
name: langyspace-ui-workflow
description: Use for shared component or public API implementation, visual/interaction changes, tokens or theming, Storybook/layout audits, packaging, or library release work. Do not load for simple read-only answers or isolated documentation edits.
---

# Langyspace UI workflow

Preserve root invariants and read `references/component-quality.md` for any component, public API,
visual, Storybook, package, or release change.

For medium/large work, create a reviewed and resumable `docs/epics/<name>/` with product and
technical requirements, dependency-ordered tasks, progress, risks, and acceptance criteria. Execute
one small task at a time. Batch independent read-only discovery and checks in one tool round; keep
writes dependency-ordered. Run only the smallest local check that can detect a regression in the
changed scope, with a default budget of two checks and three only for high-risk work. CI owns full
suites, `validate:ui`, broad Storybook/layout audits, and release validation. Do not rerun a
successful check while its relevant inputs are unchanged, and do not monitor CI or release after
pushing unless a failure is reported or the user explicitly requests it.

Do not infer permission to publish a package, push tags, deploy, or mutate downstream applications.
