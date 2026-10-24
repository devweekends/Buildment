---
artifact: canvas-spec
course: data-engineering
chapter: 08.04-backfills-and-schema-evolution
slug: schema-change-path
version: 1
owner: interaction-designer
renderer: state-machine (3 columns by 2 rows)
---

# Canvas spec: What happens when the batch changes shape

## Teaching claim
A contract check sorts a changed batch into two paths. An added optional field is accepted and older rows get NULL for it. A batch that loses a required field is stopped with nothing written, the source is fixed, and a backfill reruns the affected days. A backfill is safe because a rerun gives the same result as the first run.

## Why a canvas
The two paths share the same first two states and split at the check. Stepping through the accepted path and then the stopped path lets the learner say which path a change takes before the picture shows it.

## Model
- Inputs: the shared stepper controls only.
- Outputs: the lit state, the lit edge, a note, chips and outcome badges (accepted, stopped, totals match).
- Rule (from `contracts/price_reports.yml`): nine required fields and one optional field, `unit`, since 2026-03-15. Extra optional fields are accepted. A missing required field raises a contract error and nothing is written.
- Facts used: 14 upload days before 15 March have no `unit`; the unit values are kg, litre, tray of 30 and pack. The missing `price` is an example, not seed-7 data.
- Limitations: one contract version; renamed fields and type changes are breaking changes handled by agreement with the source owner.

## Rendering
- The shared state machine renderer, 3 columns by 2 rows. Row 0: New batch, Contract check, Landed. Row 1: Batch stopped, Source fixed, Backfill.
- Labels: "sent", "new field ok", "stop", "fix", "resend", "ok". The one same-column arrow (Backfill to Landed) is 2 characters; the diagonal ("stop") has short labels beside it, so none overlap on a phone.
- Static fallback: chapter 8.4 tells both paths in prose.

## Copy
- What this shows: how the contract check sorts a changed batch into accepted or stopped, and how a backfill repairs the stopped days.
- Try this: say why old days needed no rewrite; check what the lake holds at the stopped step; name one more accepted and one more stopped change.
- What changed: each step note says what was written, what was refused and why.
- Limits: as in `limits`.

## Accessibility
Shared stepper keyboard support and focus ring; the `summary` is read to screen readers; tone always has a text badge.

## Acceptance criteria
- [x] The claim is testable: the 8.4 quiz asks which path a changed batch takes.
- [x] Names and numbers match the contract and tests (`test_a_new_unknown_field_is_allowed_and_kept`, `test_a_batch_missing_a_required_field_fails_with_a_clear_message`).
- [x] Layout and label tests pass (columns 0 to 2, rows 0 to 1, no overlapping labels).
- [x] Predict before (8.4 predict), transfer after (8.4 quiz, 8.5 build).

## Build plan
`packages/learning-ui/src/canvas/schema-change-path/data.ts` (export `schemaChangePath`), registered by the orchestrator.
