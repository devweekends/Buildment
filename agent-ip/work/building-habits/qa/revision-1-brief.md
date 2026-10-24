---
artifact: revision-brief
course: building-habits
round: 1
source: qa/critique-a.md, qa/critique-b.md, qa/blind-keys (91 of 92 matched)
---

# Revision round 1: orchestrator decisions

Both critics recommend revise (A: 0 S1, 6 S2, 18 S3, average 3.6; B: 0 S1, 4 S2, 32 S3, average 3.86). agent-ip requires zero S1 and S2 and every dimension at 4 before G5 passes. Read both critique files in full; fix every S2 and every S3 that falls in your modules, using the decisions below where a critic offered options. The writer pack still applies.

## Rules for every writer

1. **Option form and length (A S2-1, B S3).** Rewrite every predict and quiz option set in parallel form: all fragments or all full sentences, the same punctuation in every option (no colon or semicolon in the correct option unless the others have one too), and no absolute words ("never", "always", "at all", "proven") only in distractors. Vary lengths in both directions. In each quiz chapter the correct option is the strictly longest in one or two of the five items, and then at most 10 percent longer than the longest wrong option; it is the shortest in at most one. Across your predicts, the correct label is the longer one in about half. Not every correct explanation needs to start with "Right."; vary it ("Yes.", "That fits the facts.", "Right.").
2. **Predicts that predict (A S2-2, B S3).** Each predict must sit before the paragraph that states its answer: after the story, before the research or mechanism. Or predict something the text has not answered, such as a number the canvas shows ("on how many of the 14 days...: about 2, about 7, about 12" is not allowed since predicts have two options; use "fewer than half" versus "more than half"). If a predict needs data, put the data in its prompt (A S3-16). No predict and quiz item may test the same discrimination; if they do, keep the predict and write a new transfer item on a different discrimination.
3. **Quiz items on evidence (A S3-1 to S3-4).** Replace items that test arithmetic on a toy rule, restate a chapter sentence, or repeat a discrimination already tested elsewhere (21 days, clock versus event, double session versus small restart, early link). Use the diagnostic style the critics praise (3.5 Q1, 4.3 Q1, 4.5 Q2, 5.2 Q1, 6.3 Q1, 7.2 Q1 and Q2): a short log or three to four facts, and the learner chooses the cause, the change or the plan. At least two distractors per item are plausible half-fixes. Keys must follow from the stem's evidence and what the course taught; where the course hedges (clock versus event cues worked about equally), do not key one over the other.
4. **One missed day only (B S2-1).** Research tested one missed day. For longer gaps say: "A longer gap makes the next start harder. The days you practised are not wasted, and the way to protect them is to restart at the next cue." Never "is still there", "not erased" or "a short gap" as research statements.
5. **Mentor rubric in the key (A S3-6).** In every gate and capstone `modelAnswer`, after the mentor key, add the rubric in plain text ("Rubric: Part 1, Met: ..., Partly: ..., Not yet: .... Pass rule: ...") so mentors see it on the review page. Keep the learner-facing table too. Make fuzzy levels countable (A S3-7).
6. **Voice notes and language (A S2-6).** Remove any sentence that says a voice note can replace or shorten the written answer. Say instead: "Write your answer in plain English. Short sentences are fine. You may add a voice note link as an extra." Keep `minWords` as it is. (Whether Arabic answers are accepted is now an open decision for instructors.)
7. **Gate exemplars (A S3-5, B S3).** A gate's strong-answer example must not reuse a case, person or anchor that is the key of an earlier quiz item.
8. **Names (A S3-14, B S3).** Rename lookalikes: Nadia becomes **Hanan** everywhere; avoid adding new names that differ from an existing one by a letter or two. Do not give one name two histories; check with grep across the whole course before you change a name. Vary trades: no more water-delivery drivers or bakery workers in new items.
9. **Practice checks (A S3-18).** Call the quiz chapters "practice checks" in learner text; do not call them "graded".
10. **Fading (A S3-8).** In module 5 and 6 Learn chapters, where the pack's notes allow, let the learner try first (count a short card, map their own day) before the worked example, and say once that the help is getting lighter on purpose. Gate prompts in modules 6 and 7 may be a headline plus a short checklist instead of "First... Second...".
11. **Keep the bar.** After your edits every scene, Learn and capstone chapter still has at least 1,200 prose words and every gate at least 700 (trim repetition such as "What the stepper showed" paragraphs that only retell the canvas, but replace with explanation where needed). No em or en dashes. Run the checks in the pack's section 10 and `node agent-ip/scripts/audit-course.mjs content/import/building-habits`. Canvas text changes must keep the registry tests passing (`node node_modules/vitest/vitest.mjs run tests/unit/canvas` from `frontend/`).

## Course-level decisions (orchestrator)

- **Second anchor (A S2-3):** taught in 2.4 with a short worked case (an anchor that disappears on some days, and a second anchor for those days); one line in the 7.5 toolkit.
- **The 30 days (A S2-4):** O7 and the capstone now read "design a 30-day plan, run as much of it as you can while you take the course, and review the real days you have, or review a provided month; keep the plan running after the course and send the full 30-day review to your mentor later if you like". At the course's pace, a learner reaches the capstone with about two to three weeks of tracking. Gate 2 and 7.4 say this plainly. Roadmap, brief outcome 7 and `course.yaml` are updated by the orchestrator.
- **Open questions in 2.1 and 6.1 (A S2-5, B S2-3):** replace each with a predict placed before the explanation.
- **Toolkit (B S2-4):** 7.5 must not say "tie habits to events, not clock times"; say an event or a clock time both work, and an event moves with the season.
- **Blind key mismatch (3.3 predict):** reframe so the answer follows from the friction idea, not the toy rule (for example "more tired evenings than before" versus "about the same as before").
