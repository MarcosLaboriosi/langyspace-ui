# AvailabilityCalendar

Canonical product epic: [Admin availability-led enrollment](../../../../langyspace-admin/docs/epics/admin-availability-led-enrollment/epic.md), task T06.1.

User authorized implementation through completion and parallel agents on 2026-09-14. This bounded UI task supplies a controlled reusable component; Admin owns dates, teacher intersection, plan, routing, persistence and confirmation. Root coordinates package publication and downstream updates; this agent does not commit or publish.

Rendered impact: direct. Desktop week columns and narrow-container day lists share native accessible toggle buttons. Selected items remain removable if availability changes. Unavailable items show a reason and cannot be activated. Loading, empty and error replace stale selectable content; optional retry action stays supplied by consumer.

Technical review: additive API; semantic data and callbacks; stable existing exports remain unchanged. Token-based styled Pressable controls, StatePanel status composition, no global stylesheet or domain imports. Native Tab/Enter/Space semantics, aria-pressed selection, named day regions and announced selection summary. No custom keyboard grid model because the interaction is a collection of independent toggle buttons, not editable calendar cells.

Acceptance: controlled multi-selection and deselection, disabled activation blocked, long reason/day labels contained, weekly/narrow layouts, accessibility stories and meaningful unit tests, API review, bundle/package checks and full validate:ui. Visual gate review: pending human.

Task: [x] T06.1 implement, verify and hand off reviewed API. Progress: implementation and full validation complete; root owns the scoped commit and package release.

Bundle compatibility review: the same-toolchain pre-calendar library measured
87,473 raw bytes / 19,046 gzip bytes. The additive calendar measures 92,026 raw
bytes / 19,964 gzip bytes: +4,553 raw bytes and +918 gzip bytes. Root reviewed and
approved a library-only raw budget of 94,000 bytes on 2026-09-14, retaining the
20,000-byte gzip budget and every consumer entry budget unchanged. This allowance
covers the explicit new public contract; no audit or interaction was weakened.

Validation: focused eight tests passed. Final `pnpm run validate:ui` passed
with 128 Storybook tests, 143 unit tests, public API/build/bundle/package SSR
checks and 1,150 layout scenarios across 128 stories with zero issues. Calendar
code has 100% line, branch and function coverage. Reviewed mobile 390, desktop
1281, narrow container on 2048 and final responsive threshold 928 screenshots.
Initial geometry checks at 672/704/768 passed, but visual inspection found the
seven columns too narrow at 704. The final container threshold is 56rem;
supplementary existing-rule checks at 896/928/1024 passed with one then seven
readable columns. Final boundary artifacts: `.local/layout-audit/calendar-final-boundary/`;
full report and primary screenshots: `.local/layout-audit/latest/`. Human review
remains pending.

Release target: additive minor `@langyspace/ui` 1.7.0 / tag v1.7.0. Root publishes the validated source and verifies the release artifact before Admin adoption.
