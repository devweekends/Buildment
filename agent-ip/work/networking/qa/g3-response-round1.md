---
artifact: critique-response
course: networking
gate: G3
round: 1
chapter: 02.02-an-address-is-one-32-bit-number
---

# Response to the G3 round 1 critiques of chapter 2.2

Critic A: Gemini 3.8 Flash (pedagogy and assessment), average 3.59, revise. Critic B: GPT-OSS 120B (slop, technical, canvas), average 4.64, revise. Every defect was checked against the files before acting.

## Critic A

| ID | Verdict | Resolution |
|---|---|---|
| DEF-01 | Valid | The hand method is now taught visibly in a new beat 3, "Walk the places, subtract what fits", with a worked diagram for 172, before the drill in beat 4. |
| DEF-02 | Valid | The intro no longer names 255. The predict drops the lamp analogy and asks about "places" worth 128 to 1, answerable by addition. |
| DEF-03 | Valid | The restating three-views diagram is gone; its content moved into the beat 2 fold. Beat 3's diagram shows the subtraction walk step by step. |
| DEF-04 | Valid | Both quiz items are new and not solved in the text: the carry from `10.0.0.255` to `10.0.1.0` (taught visibly in beat 2), and "which can be a real address" with misconception distractors (three parts; a part of 256). |
| DEF-05 | Valid | The 2.2 outcome in roadmap v3.1 now reads: convert each part between decimal and binary by hand, explain why no part goes above 255, and explain how the four bytes make one 32-bit number; full number conversion is done in code (2.5). |
| DEF-06 | Partly valid | The text QA reported no overflow, but the out-of-range feedback was the longest string. It now reads "256 is above 255: it cannot exist" (model and test updated). |
| DEF-07 | Not valid | The drill is ungraded practice, not an assessment block; the audit counts 3 assessment interactions (one predict, two quiz). |
| DEF-08 | Not valid after revision | The audit's own visible-word count was within range before; after the revision it is still 300 to 700 (audit: no flags). |
| DEF-09 | Valid | Beat 4 is now "Five conversions, no calculator", which names what the picture shows. |
| DEF-10 | Already fixed | The hint now says "Tap the bits, then press Check" while a byte-to-bits question is open; the screenshot predated the fix. |
| DEF-11 | Not for this chapter | Answer keys in `quiz` fences are the platform's authoring format; moving grading server-side is a platform question, not a chapter defect. |
| DEF-12 | Valid | Beat 1's visible text is four sentences. |

Scorecard notes: dimension 5 (a decision step) and 18 (engineering decisions) do not apply to a beats concept chapter; the course's decisions start in 2.3 (chapter brief, Decision: none).

## Critic B

| ID | Verdict | Resolution |
|---|---|---|
| D1 | Not valid | `ControlButton` renders a native `<button type="button">` (bit-parts.tsx), so Enter and Space work. |
| D2 | Valid | The screen-reader summary no longer repeats the overflow sentence that the verdict reads next. |
