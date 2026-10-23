# Decision log: system-design

## 2026-10-23: Consistent prefix is reproduced in 11.4, not 8.4

**Raised by:** G3 critique, defect 1 (`qa/g3-critique-08.04-10.06.md`).

**Decision:** 8.4 teaches and assesses read-your-writes and monotonic reads, and only introduces consistent prefix. 11.4 reproduces a consistent prefix violation (a reply shown before its question) on the history renderer and fixes it. The 8.4 and 11.4 roadmap rows now say so.

**Why:** the 8.4 canvas has one writer and one record, so it cannot show a reordering between two writes honestly. 11.4 already has the history renderer and the "reply before question" story.

## 2026-10-23: 8.8 tests go beyond the 8.4 snippet

**Raised by:** G3 critique, defect 17.

**Decision:** the 8.4 code snippet shows only the position comparison and the fallback to the leader. Code exercise 8.8 tests what the snippet leaves out: raising the token on reads, a cap on leader fallback during a lag spike, and a replica whose position moves backwards.

## 2026-10-23: Corrections from the research dossier

**Decision:** learner repositories use Node.js 24 LTS; moto replaces LocalStack as the default local AWS emulator (LocalStack now needs an account and a token); the module 17 AWS note maps to CloudWatch and OpenTelemetry (X-Ray SDKs are in maintenance mode); learner-facing text says "architecture labs", not "ScaleDojo-style"; the Alice and Bob unfriend story is a course example, not attributed to the Spanner paper; every Docker image is pinned to a version tag.

## 2026-10-23: Fixes found in the reader click-through

**Decision:** the timeline's phone viewBox is narrower (320 units), so labels render larger on a 375px screen, and lane names get the same halo as labels. `GlossaryTerm`'s closed tooltip is now `display: none` instead of `invisible`, because an invisible 256px tooltip near the right edge made the whole reader column scroll sideways on phones. This affects every course that uses `GlossaryTerm`.

## 2026-10-23: Canvas changes after the G3 critique

**Decision:** the TrueTime canvas starts T1 at 20 ms (no range below 0 ms), adds Alice's app as a lane, and draws commit wait on its own row. The replica-lag canvas caps lag at 1,500 ms and the first refresh at 1,000 ms so labels fit a phone, numbers its refresh dots, and lists each refresh in words under the timeline. Both canvases have a test that fails when two labels overlap, for every input combination, on phone and desktop layouts. Shared canvas text no longer uses faded opacity, and selected segments use the accent token.
