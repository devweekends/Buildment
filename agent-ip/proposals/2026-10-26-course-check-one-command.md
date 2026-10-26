---
artifact: proposal
status: open, for the architect, delivery lead and one reviewer
date: 2026-10-26
exposed_by: the networking course (merged as #85, fixed in #86)
---

# Proposal: one command runs every pre-PR course check

## Problem

`06-quality-gates.md` (Before a pull request) already lists the server's source validation and structure audit, but as a manual checklist. In the networking course they were skipped while GitHub Actions could not start, and the course merged with 15 chapters the importer rejects and 54 strict structure errors (set-the-scene files, gate checklist names, two-option predicts). The agent-ip audit and a raw-Markdown preview both passed it.

## Proposal

1. `agent-ip/scripts/course-check.mjs <slug>` runs every check a course needs and exits 1 on any failure:
   - **Core, every course:** the course audit; the server's source validation (the same import and MDX compile the release runs); the server's strict structure audit; a warning for fence fields holding a double quote or backslash (they break raw-Markdown previews only).
   - **Code, when a chapter has a code exercise:** every solution passes its tests in the same sandbox the app grades with, and every starter fails.
2. The checks are picked from what the course contains, so a text-only course runs the core set without configuration. Later profiles (labs, canvases, challenge repositories) plug in the same way.
3. The orchestrator runs it before opening a course PR and pastes its output into the PR description. A course with a failing check does not open a PR.

## Evidence

- Networking after #86: 5 of 5 checks pass.
- System design (published): the core passes, and the code check finds that `26.05-code-a-polite-frontier` uses `URL`, which the grading sandbox does not provide, so its reference solution fails 12 of 14 tests in the app. The warning lists 10 fence fields with quotes.

## Platform impact

None. One script. It needs the server's dependencies installed, as the server scripts do.
