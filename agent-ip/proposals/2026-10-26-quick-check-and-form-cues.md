# Proposal: the closing quick check in beats chapters, and a form-cue check for quiz keys

**Status:** proposed, not applied. For delivery lead and IP owner review under `09-review-and-governance.md`.
**Evidence:** the course 13 v2 build (PR #73, 2026-10-25 and 26), recorded in `work/build-with-ai/decision-log.md` and `work/build-with-ai/qa/v2-critique-b-r1.md` on that branch.

## 1. The closing quick check in a beats chapter

**Problem.** `03-authoring-standards.md` asks every beats chapter to end with a quick check (one or two quiz questions) after the last beat, and the writer packs ask for a `**Next:**` line. `scripts/audit-course.mjs` counts every `## ` section as a beat once fences are removed, so a `## Quick check` section that holds the quiz and the Next line is counted as a beat whose first block is not a visual, and the chapter fails. Seven parallel writers met this on the same day and each found a different way round it: a bold line, a `### Quick check` heading inside the last beat, or a recap diagram that opens a pretend beat. The system design chapters avoid it only because they have no Next line.

**Proposed change.** Pick one of these and write it into `03-authoring-standards.md` (Visual-first Learn chapters) and the chapter writer prompt:

- (a) The audit skips a final section whose heading is "Quick check" and whose remaining text is only a `**Next:**` line; or
- (b) the standard says the quick check sits under `### Quick check` inside the last beat.

Option (a) keeps the reader's table of contents clean and needs a three-line change to `auditBeats()`. Option (b) needs no code. Either way, recap diagrams added only to satisfy the audit should be discouraged.

## 2. A form-cue check for graded keys

**Problem.** `04-interactive-playbook.md` controls option length and key position. Critic B in course 13 v2 showed that keys were still guessable by grammar: 70% of wrong options carried a reason clause ("because", "since", "so") against 35% of keys; 31% of wrong options carried an absolute word ("never", "every", "only") against 14% of keys; and when exactly one option mentioned checking a source it was the key in 17 of 30 items. After the rewrite the shares were 38% and 40% for reason clauses and 7% and 11% for absolutes, with the key never the odd one out on reason clauses. A second, smaller cue (the only option with a comma or colon was the key in 18 of 27 items) was found in round 2 and fixed the same way.

**Proposed change.**

- Add to Option-length hygiene: write all options in an item in the same grammatical shape; do not give wrong options absolute words the key lacks; vary which kind of option is right (sometimes "use the draft", not always "check the source").
- Add a script, `scripts/cue-check.mjs`, next to `blind-keys.mjs`, that reports for a course: reason-clause, absolute-word and "check"-word shares in keys and in wrong options, the odd-one-out items where the key is the odd one, and (to be added the same way) the items where the key is the only option with a comma or colon. A draft of the script is attached as `proposals/2026-10-26-cue-check.mjs` (the version the course 13 v2 build used); it moves to `scripts/` only if this proposal is accepted.
- Add the cue report to `06-quality-gates.md` → Assessment validation and to the PR checklist, next to the length and position checks.

## Not proposed

No change to the beat budgets, the quiz size or the blind key procedure.
