---
artifact: critique
course: faith-and-resilience
artifact_under_review: content/import/faith-and-resilience
reviewer: critic-a
review_type: pedagogy and assessment
version: 2
---

# Critique, round 2: content/import/faith-and-resilience (course 11, Steady Hearts)

## Scope and method

Round 2 re-review of the revised course (git commits after `8db94da`). I stayed blind to the writers' rationale and to any other critique; I did not open `qa/revision-1.md` or `qa/critique-b*.md`. I re-read every quiz and predict in all 40 chapters (68 MCQs, 26 predicts), the changed chapters' structure and key passages, the gates, the capstone, `course.yaml`, and the canvas files that changed (`little-and-often`, `help-passes-on`, `words-for-the-day`, `yusuf-waiting-well`, `worry-or-next-step`, `gratitude-three-ways`).

Checks run again:
- `audit-course.mjs`: 40 chapters, 50,673 prose words, 0 flagged.
- My form-guessing scripts on the new item set (option length, absolute words, grammar shape, key position per chapter).
- Dash scan of all content: 0 en or em dashes.
- Numbers in the new `little-and-often` model (17 h 9 min and 11 h 26 min averages, 12 h small plan at three bad days) recomputed by hand: correct.

Not verified by me: religious accuracy beyond the dossier (scholar review still pending), rendering and click-through, accessibility, vitest results (I read the test file, I did not run it), and the second-family blind key re-run, which is in progress. The round 1 blind run (94 of 94 matched) was on the old item set; most items have since been rewritten, so it no longer covers them.

## Status of round 1 defects

| Id | Round 1 defect | Status | Evidence |
|---|---|---|---|
| S2-1 | Keys and predicts guessable from form | **Fixed** | Same scripts, new set: correct option is the strictly longest in 13 of 68 MCQs (19%) and 5 of 26 predicts, never more than 7% longer than the longest distractor; strictly shortest in 15 of 68 (22%), was 46%. Absolute words: 2 of 204 distractors and 1 of 68 keys, was 41% against 3%. Guess-without-reading accuracy 26% (drop absolutes then shortest) and 25% (drop absolutes then guess), was 51% and 41%; chance is 25%. Distractors are now sincere half-truths in the key's register (for example 2.5 Q4, 3.5 Q1, 4.4 Q5). Small grammar tells remain (new defect R2-2). |
| S2-2 | Key positions repeat across check chapters | **Fixed** | Check chapters now read 2.5 DBACB, 3.5 ACDBC, 4.4 CABDA, 5.5 BDCAD, 6.5 ABDCC, 7.4 CACBD. No shared sequence; Q2 and Q3 vary. Whole course A 17, B 16, C 19, D 16 of 68. |
| S2-3 | Predicts confirm the prose, "No" bias, strawmen | **Partly fixed** | Learn-chapter predicts were rewritten and moved above the paragraph that answers them (1.2 now a new case, Rami; 3.2, 3.3, 3.4, 4.2, 5.3, 6.4 new prompts; 2.2 places the predict before the hadith is quoted; 6.2 before the Muslim 130 section). Residue is smaller and no longer blocks: see R2-1 (re-filed S3). |
| S2-4 | Items test the paragraph above; predict and quiz test the same fact; repeated items | **Fixed** | In every Learn chapter the predict, Q1 and Q2 now test three different claims (checked all 19). The cross-chapter repeats are gone (5.5 Q3 is now "istikhara only for big decisions"; 5.3 Q1 and 5.5 Q2 differ in structure; 6.2 Q2 and 6.5 Q1 differ; 3.5 Q1 and 7.4 Q2 differ). The verbatim keys are replaced by new cases with competing plausible options. One key still paraphrases its paragraph (7.2 Q1), minor. |
| S2-5 | Keys on disputed ground (12:42; post-istikhara) | **Fixed** | 3.4 no longer keys on the reading of 12:42: the chapter and canvas now say "Scholars read this verse in more than one way; ask a scholar you trust", the predict and Q2 moved to 12:100 and Yunus's dua. 5.4 Q1 now tests only that istikhara does not replace reading and asking; no key says "go ahead" for the no-inclination case. |
| S2-6 | Mixed review was module-ordered re-skins | **Fixed** | 7.4 has five new cases, each combining two situations, in mixed order; Q3 needs module 1 (sort what is hers), Q2 needs module 7 (tell a real person), Q4 module 5, Q5 modules 6 and 7. `course.yaml` goal now says "each combine two situations ... including sorting what is yours to do and asking a real person for help". |
| S2-7 | Ambiguous key (1.4 Q1; 2.5 Q3) | **Fixed** | 1.4 Q1 distractor D is now "sit round two the same way as before", clearly wrong. 2.5 Q3 distractor D now uploads at 17:00 and asks the teacher, so it is weaker than the key. New near-ambiguity found elsewhere: R2-2. |
| S3-1 | O8 defence not evidenced | **Fixed** | 7.5 rubric has a seventh line "Defence", read in the walk-through; pass rule now needs lines 1, 2, 6 and 7 Met. |
| S3-2 | Support never fades; no stretch | **Fixed** | 6.6 says "the help here is lighter on purpose", drops the weak-answer paragraph, shortens the example, and adds an optional harder part (two plans that pull against each other). |
| S3-3 | Canvas replays the worked example | **Fixed** | Worked examples now use a new person (Rami, Nada, Ghassan, Dalia, Hamza, Shahd, Firas, Nuha, Najwa, Alaa, Wijdan, Zuhair, Ehab) while the canvas keeps the lead case, so the learner meets a transfer case, not a retelling. Canvases are still click-through for 16 of 19 (S4 observation below). |
| S3-4 | `little-and-often` rigs the bad days | **Fixed** | New input "Bad days a week" (0 to 4) applies to both plans; at 0 bad days the long plan leads (20 h against 18 h), at 3 the small plan keeps 4 sessions; the asymmetry (a short session can move, a long one cannot) is stated in the intro and limits. Test file rewritten (9 cases). |
| S3-5 | `help-passes-on` shows help returning | **Fixed** | Purpose now "the return is with Allah, not with the person you helped"; badge removed; new final step where nobody has helped Ahmad back and he helps again. |
| S3-6 | Canvas and chapter mismatches | **Fixed** | `worry-or-next-step` now "a week ago ... 7 days"; `words-for-the-day` has one claim (consoling moved to 7.2); the 4.2 canvas starts from "does not feel grateful tonight" and its prediction now matches; the stairs arithmetic in 7.2 is gone with the old worked example. |
| S3-7 | Diagrams restate prose; same template | **Fixed** | Sampled and confirmed 2.2 (same plan, two places for the heart), 3.3 (one day as a clock), 4.2 (a chain from one heart to another), 5.2 (two loops), 3.2 (return loop), 3.4 (the fourth box now explained as working differently), 5.4 (obstacle loop back to facts). The "What to notice / takeaway" wrapper appears in 2 files. I did not re-read every unchanged diagram (scenes 3.1 and 4.1 keep their fork shape). |
| S3-8 | Continuity: reused names, day count, CRLF | **Partly fixed** | Names: none of the six pairs remains (checked by grep). Day count aligned. CRLF line endings got worse: 12 files now (01.03, 01.05, 02.01, 02.02, 02.04, 02.06, 07.01 to 07.06), was 4. Re-filed S4 below. |
| S3-9 | 5.4 reads the way opening as the answer | **Fixed** | New text "An obstacle is a reason to check the facts and the plan again. It is not a verdict from Allah"; new worked example (Najwa) where an obstacle sends her back to the facts and the answer is a new fact, not a sign; the diagram draws the loop. |
| S3-10 | Absolute "not a sign of anger" graded | **Partly fixed** | 1.3 heading and 4.3 keys now say "proof"/"cannot be read as proof". Two places still use the absolute wording: the 7.6 toolkit line and the `course.yaml` goal for 1.3. Re-filed as R2-4. |
| S3-11 | Gates grade a personal wrong; O4 "practise" | **Fixed** | 4.5 and 6.6 now say "you may use a small or imagined example; the mentor checks the reasoning"; 4.5 adds a "What you noticed" line and requires four Met parts. |
| S3-12 | Two skills in one chapter | **Fixed** | Consoling moved out of 3.3 into 7.2 ("Consoling is service too"); 3.3 is now words for moments only, with a day-as-a-clock diagram. 5.2 and 7.3 still dense but each now has one new hard idea. |
| S3-13 | Taught sources never assessed | **Fixed** | Now keyed: Bukhari 1283 (3.5 Q1), Yunus's dua 3505 (3.4 Q2), Umm Salamah's dua 918 (3.3 Q1), 51:56 (1.3 Q1), 94:5 to 6 (1.3 Q2), Ibn Rajab (2.2 Q2). |
| S3-14 | Process evidence missing | **Partly fixed** | Done: blind-key run r0 recorded, spec acceptance boxes now unticked, roadmap evidence lines updated. Still missing: canvas QA reports on 14B, an assessment plan, a saved course audit report, the second-family re-run of the revised keys (in progress), and the roadmap confirmation record. Re-filed as R2-5. |

Round 1 totals: 7 S2 (6 fixed, 1 partly fixed and the residue re-filed as S3), 14 S3 (11 fixed, 3 partly fixed and re-filed).

## Scorecard

| Dimension | Score | Note |
|---|---|---|
| 1. Outcome alignment | 5 | Every chapter maps to an outcome and the minutes still total 945. 7.4 now gives evidence for O1 and O7; 7.5 has a Defence line for O8; 4.5 adds a "what you noticed" line for O4. |
| 2. Domain specificity | 5 | Unchanged strength; new worked examples (Najwa's connection drops, Ehab's month, Zuhair's domain) keep the same local detail and correct numbers. |
| 3. Depth over coverage | 4 | Scope is still wide (8 outcomes, about 60 sources), but every taught source now has an item, and 3.3 is no longer overloaded. |
| 4. Prose quality | 4 | Plain, kind, zero dashes; the repeated wrapper phrases have mostly gone. Stems for items are long (R2-3). Slop critic to confirm. |
| 5. Chapter structure | 4 | Predict now sits before the paragraph that answers it in nearly every Learn chapter; the worked example is a transfer case on a new person. Scene chapters keep objectives after the story (S4), and the seven scene predicts are unchanged (R2-1). |
| 6. Interaction purpose | 4 | Each Learn chapter now assesses three different claims; canvases no longer duplicate the worked example. Scene predicts and the click-through canvases still add little evidence (R2-1, S4). |
| 7. Assessment quality | 4 | Guessability removed (26% by form), positions varied, no paragraph recall of the old kind, disputed ground removed. Residual grammar tells and four near-ambiguous keys (R2-2) keep it at 4; the second-family key check is not back yet. |
| 8. Difficulty calibration | 4 | Prerequisites secure, cue-free items, support lightened from 5.6 and 6.6 on with an optional harder part. No stretch path before module 5. |
| 9. Cognitive load | 4 | One new hard idea per chapter; retelling gone. Item stems average 46 words, 71 at most (R2-3), a load for second-language readers on phones. |
| 10. Prerequisite integrity | 4 | Terms and sources are used only after they are taught; the 7.1 predict explanation still cites Bukhari 5199 ahead of 7.3. |
| 11. Technical accuracy | 4 | References unchanged in kind and all traced to the dossier in round 1; I re-read the new sums and they are right. Scholar review still pending. |
| 12. Production-grade coverage | 5 | Not applicable: no software product. |
| 13. Security and integrity | 4 | Keys remain in fences and `modelAnswer` only; server path untested by me; the re-run of the blind key check is in progress. |
| 14. Accessibility | 4 | Provisional, from source: every diagram is introduced and explained in prose; canvases keep text summaries; keyboard, contrast and 375px not tested by me. |
| 15. IP protection | 4 | Mentor keys stay in `modelAnswer`; the Hani plan is for a fourth case. Server handling untested. |
| 16. Variant distinctiveness | 5 | Not applicable: variants not applicable for version 1. |
| 17. Continuity | 4 | Name pairs and day count fixed; `course.yaml` 7.4 goal corrected. CRLF endings in 12 files (S4) and a few residual absolute wordings (R2-4). |
| 18. Learner agency and curiosity | 4 | Choices sit in gates, the capstone, optional harder parts and "This week"; Learn-chapter canvases are still step-throughs. |
| 19. Instructor alignment | 3 | Procedural and unchanged: `critic.md` forbids a passing score until the roadmap confirmation record exists, and the confirmation table is still blank. The course matches the drafted roadmap. |
| 20. Interactive canvas quality | 4 | Models are fair (`little-and-often` bad days apply to both plans), claims are single, limits are honest, help does not return by design. Canvas QA reports on 14B are still missing. |
| 21. Explanatory depth | 5 | Audit passes for all 40 chapters; the prose carries mechanism, a worked example on a new person, the misunderstanding and the failure path, without retelling the same case three times. |
| 22. Visual explanation quality | 4 | The diagrams I re-read now argue a relationship (clock, loops, obstacle path). Not every unchanged diagram was re-read, and the fork shape remains in two scenes. |

**Average: 92 / 22 = 4.18.**

Threshold check: zero S1 (met); zero S2 (met); every dimension at least 4 (not met: dimension 19 is 3, a procedural gate condition); average at least 4.3 (not met). Without dimension 19 the average is 4.24.

## Defects

### S1

None.

### S2

None. All seven round 1 S2 defects are closed (six fixed, S2-3 partly fixed with its residue below at S3).

### S3

**R2-1. Predict residue (from S2-3).**
- location: predicts in 1.1, 2.1, 3.1, 4.1, 5.1, 6.1, 7.1 (the seven scene chapters), and the 5.4, 6.2 and 1.3 wrong options.
- observation: Of 15 yes/no predicts, 10 are still keyed to the "No" side (1.4, 2.2, 2.3, 3.3, 5.1, 5.2, 5.4, 6.1, 6.2, 6.4); the "Yes" keys are 2.1, 3.2, 4.2, 5.3, 7.2. The scene predicts are unchanged and several are answered by the paragraph above (7.1: "Her doctor told her to rest" directly before it). Some wrong options are still positions no learner holds ("a dream would show her the answer", "only work he finishes can count", "a fair sample of how their life is going", "more work means more pay").
- why it matters: Lower stakes than before, since the Learn-chapter predicts now commit the learner first, but the scene predicts still record nothing about prior belief.
- required fix: Rewrite the seven scene predicts so the wrong option is a view a sincere learner could hold, keep the answer out of the paragraph above, and make about half of the yes/no keys "Yes". Tracked, not blocking.

**R2-2. Residual form tells and four keys at risk of a second defensible answer.**
- location: grammar: 1.3 Q1 and Q2, 4.4 Q4 (the key alone starts differently from the other three); 6.4 Q2 and 7.3 Q2 (the key is the only option with a colon). Ambiguity risk: 2.3 Q1 (distractor D, "a backup for each item on the list first, then trust", is bounded and arguably tie-it-and-trust), 4.4 Q5 (distractor B, "some fear and some hope", is the course's own balance), 7.2 Q1 (distractor D, give her time alone then visit with food, is a kind and sourced custom), 7.4 Q4 (distractor A, pray istikhara again, which the course says "you may repeat").
- observation: The form-guessing script is at chance, so these are single items, not a pattern. The four ambiguity candidates are items where a careful expert might hesitate; the explanation of each distractor does answer it, which reduces the risk.
- why it matters: The rule is one defensible key.
- required fix: Keep these items on the list for the blind check; if the second family disagrees on any of the four, reword the distractor so it fails on a stated fact in the stem. Reword the five form tells so the key is not the odd one out.

**R2-3. Item stems are long for second-language readers on phones.**
- location: mean 46 words, 71 at most (3.5 Q1), five items at 58 words or more (3.5 Q1 and Q5, 5.5 Q1 and Q5, 7.4 Q1).
- observation: Round 1 stems were shorter. The new cases need the detail, but several carry two sentences of background that the options do not use.
- why it matters: Reading load works against the brief (short sentences, weak data, phones) and can make a language problem look like a belief problem.
- required fix: Cut each stem to the facts the options turn on; target about 40 words, none over 55.

**R2-4. Absolute "not a sign of anger" wording remains in two places (from S3-10).**
- location: `07.06-checklist.md` toolkit row "Life as a test"; `course.yaml` goal for 1.3.
- observation: Both still say "hardship is not a sign of Allah's anger" while the chapter and keys now say "cannot be read as proof".
- why it matters: Consistency, and the scholar may want the softer wording everywhere.
- required fix: Use the chapter's wording in both places; put the sentence on the scholar's list.

**R2-5. Process evidence still missing (from S3-14).**
- location: `agent-ip/work/faith-and-resilience/`.
- observation: Missing: canvas QA reports (14B) for the 19 canvases; an assessment plan recording the answer-key check; a saved course audit report (13A); the blind-key result for the revised items (second-family run in progress); and the roadmap confirmation and scholar review (dimension 19).
- why it matters: These are gate package items and `critic.md` conditions for scoring canvas quality and instructor alignment.
- required fix: Record each as it completes; the click-through at 375px produces the canvas QA reports.

### S4 (not counted)

- CRLF line endings in 12 files (01.03, 01.05, 02.01, 02.02, 02.04, 02.06, 07.01 to 07.06); normalise.
- Scene chapters still put `LearningObjectives` and Key words after the story.
- 16 of 19 canvases are click-through. This meets the v0.4 rule ("steps through"), and the worked examples now give the transfer, so I no longer count it, but a choice step in two or three of them (for example the sort in 1.2) would add agency.

## What works

- **Item set.** Distractors are now the half-truths the course itself warns about (the plan-only heart in 2.5 Q4, the quiet hour after the istirja in 3.5 Q1, the "balanced" answer that is wrong in 4.4 Q5 and 7.4 Q4). Stems carry a decision, the keys vary in shape and length, and the guessing rate is at chance.
- **Predict-before-reveal.** In 1.4, 2.2, 3.2, 3.3, 4.2, 4.3, 5.3 and 6.2 the learner commits before the paragraph that answers it, and in 6.3 the prompt gives the assumption so the sum can be done. This is the structure the playbook asks for.
- **Transfer.** Each worked example now moves to a new person (Rami, Nada, Ghassan, Najwa, Ehab and others), the canvas keeps the lead case, and the quizzes use a third case, so the same idea is met three times with different surfaces.
- **Scholar-sensitive handling.** The 12:42 sentence, the "obstacle is not a verdict" teaching in 5.4, and the "ask a scholar you trust" lines are in the places the dossier needs them.
- **Gates and capstone.** The scaffold now fades from 5.6 and 6.6 on, an optional harder part exists, personal examples may be small or imagined, and the walk-through is graded on its own line.
- **Canvas fairness.** `little-and-often` lets bad days hit both plans and shows the setting where the long plan wins; `help-passes-on` no longer implies repayment; `words-for-the-day` has one claim.

## Recommendation

**Revise (narrow).** There are no S1 or S2 defects and the pedagogy and assessment work is at the standard; no further item rewrite is needed beyond the S3 list. The scorecard thresholds are not yet met, only because dimension 19 cannot be scored without the roadmap confirmation and scholar record, and the average is 4.18 against 4.3. To close:

1. Fix R2-1 to R2-4 (a small edit pass), then re-review only those items.
2. Return the second-family blind key result for the revised set and reconcile any disagreement (the four items in R2-2 first).
3. Record the roadmap confirmation and scholar review (R2-5), run the 375px click-through, and write the canvas QA reports.

```yaml
artifact: critique
course: faith-and-resilience
artifact_under_review: content/import/faith-and-resilience
lens: pedagogy and assessment
scorecard_average: 4.18
blocking_defects: 0
recommendation: revise
```
