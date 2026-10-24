---
artifact: critique
course: building-habits
artifact_under_review: content/import/building-habits (course.yaml, 40 chapters, 19 embedded canvases)
reviewer: critic-a
review_type: pedagogy + assessment (with interactive canvas quality)
version: 1
---

# Critique A: Building Habits That Last (pedagogy, assessment, canvas quality)

Reviewed blind: all 40 chapters and course.yaml in full, the roadmap and brief, the 19 canvas specs and data files, and research.md only to check taught claims. I did not read context packs, the decision log, the run log or qa/. To see what a mentor sees, I also read the importer (`server/scripts/import-course.ts`) and the mentor review page. I ran `audit-course.mjs` (0 errors) and wrote a throwaway script, kept outside the repo, to recount every table and to measure option length, position and form across all 68 quiz items and 24 predicts. Nothing in the course files was edited.

## Headline

The course is humane, specific and unusually well sourced, and its arithmetic is clean. The pedagogy is sound at the level of the chapter (story, mechanism, worked example, predict, canvas, transfer item) and every Learn chapter has all of it. The problems are in how the checks are built and in two structural promises:

- The answer-key hygiene fix for "correct = longest" was overcorrected. The correct option is now the shortest or tied-shortest in 24 of 24 predicts and 32 of 68 quiz items, and it is the only punctuated option in 17 of the 18 items where exactly one option is punctuated. A learner who skips the chapters can pass by form.
- Most predicts are not predictions: the sentence above them states the answer.
- A technique the gates and capstone depend on ("second anchor") is first used in a quiz key and never taught.
- The 30-day plan cannot be run inside the stated course pace.

Scorecard average (15 scored dimensions): **3.6**. S1: 0. S2: 6. S3: 18. Recommendation: **revise**.

## Scorecard

| Dimension | Score | Note |
|---|---|---|
| 1. Outcome alignment | 3 | Every chapter serves O1 to O7 and every outcome has an instrument. But O7 says "design, run and review a 30-day plan" and most learners cannot run 30 days inside the course pace (S2-4). O1 "explain what research says about how long habits take" is evidenced only by recognition items (S3-17). |
| 2. Domain specificity | 5 | Power-cut-proof habits, paper cards, prayer times as fixed points, shekels, shared rooms, client time zones. The recurring cast carries one domain throughout. No generic example found. |
| 3. Depth over coverage | 4 | A small, well chosen scope taught with a mechanism, a worked example and a limit each time. Five chapters carry too many sub-ideas (S3-9). |
| 4. Prose quality | not scored: other lens | Read for pedagogy only. |
| 5. Chapter structure | 4 | Hook, concept, worked example, decision, try-it, check, bridge, in every Learn chapter. The same story is told four times inside a chapter (S3-10). |
| 6. Interaction purpose | 3 | Density is inside budget and every Learn chapter has predict, canvas and transfer. But at least 15 of 24 predicts restate a sentence just above them (S2-2), 12 of 19 canvases are fixed narrations of the chapter's own story, and predict and quiz items repeat each other (S3-3). |
| 7. Assessment quality | 3 | Many items are strong, diagnostic applications on stated evidence (3.5 Q1, 4.3 Q1, 4.5 Q2, 5.2 Q1, 6.3 Q1, 7.2 Q1). But the form leaks (S2-1), some items test arithmetic or a slogan (S3-2), keys sometimes rest on hint-level evidence (S3-4), and the mentor does not see the rubric (S3-6). |
| 8. Difficulty calibration | 3 | Right level of language and maths for beginners. Support does not visibly fade (S3-8), a keyed technique is untaught (S2-3), and gates ask a lot for 25 minutes (S3-9). |
| 9. Cognitive load | 3 | Learn chapters are 1,540 to 2,080 prose words plus canvas, predict and two items in 25 minutes, for second-language readers on phones. 1.4, 5.4, 6.2, 6.4 and 7.2 hold three to five ideas each (S3-9). |
| 10. Prerequisite integrity | 3 | One real gap: "second anchor" is a keyed answer in 5.2 and the central fix in gate 5, capstone case 1 and gate 7, but is never taught (S2-3). Everything else is taught before use. |
| 11. Technical accuracy | 4 | Every taught research claim I checked matches the dossier and its "phrase it this way" notes. All tables and canvas numbers recount correctly (see Recount). Misses: one canvas sentence is wrong (S3-12), one chapter overclaims (S3-13), one canvas limit contradicts its chapter (S3-11). |
| 12. Production-grade coverage | not scored: not applicable (soft-skills course, no software) | |
| 13. Security and integrity | not scored: other lens | Noted only that mentor keys map to a mentor-only field, and that MCQ retry is unlimited (S3-18). |
| 14. Accessibility | not scored: other lens | |
| 15. IP protection | 4 | No canvas or chapter reveals a capstone answer; mentor keys sit in a mentor-only field. Gate exemplars are close enough to quiz keys to be copyable (S3-5). |
| 16. Variant distinctiveness | not scored: not applicable (no variants in v1) | |
| 17. Continuity | not scored: other lens | Noted only the confusable names (S3-14). |
| 18. Learner agency and curiosity | 4 | Real decisions: weighting anchors and first habits, choosing a hardest-day version, choosing own data or a case with no penalty. Curiosity is dulled by predicts that are already answered. |
| 19. Instructor alignment | not scored: no roadmap confirmation record exists (`instructors_reviewed: []`, confirmation table blank) | |
| 20. Interactive canvas quality | 3 | Models are correct and limits honest; all 19 have a spec, a predict before and a transfer after. Several canvases carry more than one claim or compare unequal things, one copy sentence is wrong, and 12 of 19 only replay the chapter's story (S3-10, S3-11, S3-12). QA reports were not read, as instructed. |
| 21. Explanatory depth | 4 | Audit passes (Learn chapters 1,540 to 2,080 prose words, 0 flags). Prose carries mechanism, worked example, trade-off and failure modes. Repetition rather than thinness is the issue. |
| 22. Visual explanation quality | 4 | One diagram per non-gate chapter. Most argue (decision loops, two exits, cause to change in 7.2). Scene-setting diagrams in 1.1, 2.1, 5.1 and 6.1 mostly re-draw the story. Rendering and mobile legibility not tested here. |

Average of the 15 scored dimensions: (3+5+4+4+3+3+3+3+3+4+4+4+3+4+4) / 15 = 54 / 15 = 3.6.

## Recount of every table and key number

All counts below were recomputed from the rows, not read from the keys.

| Table | Result |
|---|---|
| 7.1 Samir card (5 rows) | 6+7+4+5+1 = 23 done, 7 misses (days 7, 17, 18, 21, 24, 27, 29), halves 14/1 and 9/6, run 9 (days 8 to 16), gap 2, 22 of 23 ordinary evenings. Correct. |
| 5.2 Yousef week | 4 ticks, 3 crosses, both "tired" notes are ticks. Correct. |
| 5.1 and 5.3 Yousef month | 25 of 30, streak 2, longest run 23, gap 5; waiting would give 23 of 30 and gap 7. Correct. |
| 6.1 Dina card | Week 1 17 of 35, week 2 2 of 35. Correct, but the row label "All five" reads as "days all five were done" when it is total ticks (S3-7). |
| 7.4 Fares worked example | 5+6+3+5+2 = 21 done, 9 misses, 8 delivery-night mornings with 7 missed, 20 of 20 ordinary mornings, halves 11 and 10, restart days all done. Correct. |
| 7.4 Case 1 Nada (30 rows) | 24 done, 6 misses (9, 15, 17, 18, 25, 28), gap 2, halves 13 and 11, three "no breakfast" misses. Matches key and gate 5 card (14 of 18). |
| 7.4 Case 2 Ziad (30 rows) | 20 done, 10 misses, gap 5 (days 4 to 8), 6 of 6 late-shift days missed, 20 of 24 ordinary days done. Matches key. |
| 7.4 Case 3 Rasha (30 rows) | 22 done, 8 misses, gap 2, 6 of 7 guest nights missed. Matches key. The key's "20 of 22 weekday nights" only works if "weekday" means every night except Thursday and Friday (S3-7). |
| 5.3 Karim and Rana, 5.5 Karim, 5.2 Duaa, 7.2 Layla, gate 5 Duaa | All counts, streaks, runs and gaps correct. |
| 4.2 Hiba, 4.2 canvas, 2.4 and 6.2 totals, 6.2 Jamal | 42, 35, 17; 37/31/30, 27/29/22, 41; 32/26/25, 36/34/31, 27/33. All correct. |
| 2.2 and 3.3 canvas series | Days 1, 2, 8 at effort 7; 12 and 2 with a hard week; 2, 9, 8, 10 study evenings. Correct. |
| Gate 4 Hamza | 30, 120, 25, 100 shekels. Correct. |
| 1.4 curve | 27, 47, 61, 85, 95, 60, 97, 22, 54 percent from the stated formula. Correct. |

No arithmetic error found in any table or key.

## Defects

### S1

None.

### S2

- id: S2-1
  location: all 24 `predict` fences and all 68 `quiz` fences (script output available on request; examples below).
  observation: Option length and form now predict the key. (a) In the 24 predicts the correct label is shorter than the other label in 21 and equal in 3: "pick the shorter" scores 24 of 24. Examples: 1.2 (35 vs 44 chars, correct is the shorter), 2.2 (36 vs 44), 5.4 (33 vs 40), 6.2 (37 vs 47), 7.1 (36 vs 43). (b) In the 68 quiz items the correct option is never strictly longest (0 of 68) and is shortest or tied-shortest in 32 (47%, chance is about 26%); it is shorter than the mean of the distractors in 45 (66%). (c) In 18 items exactly one option contains a semicolon or a mid-sentence colon; in 17 of the 18 it is the correct one. Items: 1.2 Q2 "The habit works: it starts her study; the exercises stay hard", 4.4 Q1 and Q2, 4.5 Q4, 5.3 Q1, 5.4 Q1 and Q2, 5.5 Q4 and Q5, 6.5 Q5, 7.2 Q2, 7.3 Q1, Q2 and Q3, 2.5 Q5, plus predicts 1.1 and 1.3. (d) Several distractor sets lean on absolute words that the correct option avoids: 6.5 Q4 ("Never add...", "...at all"), 7.2 Q2 ("proven", "failed"), 3.5 Q3.
  why it matters: `04-interactive-playbook.md` says option length is never evidence of correctness. The fix for "longest = correct" was applied so hard that it created the mirror leak, and the form tell is stronger still. The audit only warns on "longest", so it passed. This is the guesser and skimmer red team: a learner who has read nothing can pass every predict and about half of the quizzes by form. It also makes the quiz marks weak evidence for O1 to O6.
  required fix: Rewrite every predict and quiz option set in parallel form (all fragments or all full sentences, same punctuation), with lengths varied in both directions so the correct option is longest in roughly a quarter of 4-option items and within 10% either way. Remove semicolon and colon asides from correct options or add them to distractors. Remove absolutes from distractors or add hedges to them. Re-run a length, position and punctuation count on the set before the next review and report it in the assessment plan.

- id: S2-2
  location: predicts in 1.1, 1.2, 1.3, 1.4, 2.3, 2.4, 3.1, 3.2, 3.3, 3.4, 4.1, 4.2, 4.4, 5.4, 6.3, 6.4, 7.1 (at least 15 of the 24).
  observation: The prose immediately above the predict states the answer, so the learner copies instead of predicting. Examples: 1.3 predict asks what Rami's hand does on Friday night with no reward, after the paragraph "That is what happened on Friday night. The reward was gone, and sitting down still started the routine." 1.4 asks whether a missed day resets strength, after "One miss is not a reset." 2.4 asks whether the power anchor or Fajr wins when "same time" is very important, after "a moving anchor is weaker than one that stays." 3.2 asks early link or late link, after "You can change one early link, and the rest of the chain changes with it." 4.1 asks whether the deleted app will stay deleted, after the story has already said she used a browser and reinstalled it. 4.4 asks notice versus stop thinking, after the research paragraph on thought rebound. 6.4 asks event anchor versus clock alarm, after "A habit tied to an event moves with that event. A habit tied to a clock time stays at the same number." The predicts also repeat the transfer items: 4.4 predict and Q2 (suppression versus noticing), 5.4 predict and Q2 (double session versus small restart), 3.2 predict and 3.5 Q2 (early link), 6.4 predict, 6.4 Q1 and 7.3 Q5 (clock versus event), 2.2 predict and Q1.
  why it matters: `10-interactive-canvases.md` asks for a prediction before the learner touches the canvas so that the surprise does the teaching. Here the claim is taught first, then predicted, then replayed. The predict produces no evidence, and the second assessment item on the same discrimination adds nothing. Interaction purpose and learner curiosity both suffer.
  required fix: Move each predict to before the paragraph that states its answer (after the story, before the research or mechanism), or choose a prediction the text has not answered. Where the canvas holds numbers, predict the number (for example "on how many of the 14 days will the one-hour plan happen: 2, 7 or 12?"). Where a predict and a quiz item test the same discrimination, keep the predict and write a different transfer item, or drop the quiz item.

- id: S2-3
  location: 5.2 Q1 ("A second anchor for busy mornings, like filling her water glass"), 5.6 gate and Nada key ("after I fill my water bottle"), 7.4 case 1 and its key, 7.5 Nada plan; first taught explicitly nowhere. Closest text: 6.2 (a second anchor for Fridays and Saturdays, one clause) and 7.2 (diagram line "add or move the anchor").
  observation: Module 2 teaches choosing one anchor with four questions. No chapter teaches what to do when the anchor does not happen on some days (a second, alternative anchor for those days). That is the keyed answer in 5.2 Q1, the intended fix in gate 5 (Nada has no breakfast cup on some mornings), the repair Nada already uses in the capstone, and the "no breakfast at home" example in 7.2. The first time the learner meets it is in the explanation of a quiz option, and later in a gate where it is the point of the task. Yousef's worked fix in 5.2 is a backup version, not a second anchor.
  why it matters: A concept is assessed before it is taught (prerequisite integrity), and learners who write "try harder" or "start over" in gate 5 have not been given the tool. Gate 5 and the capstone would then fail on content the course never supplied.
  required fix: Teach it where anchors are taught: add to 2.4 (or 5.2) a short worked case of an anchor that disappears on some days and a second anchor for those days, with one line in the toolkit in 7.5. Then keep the quiz item and gate key as they are.

- id: S2-4
  location: roadmap "Timing" paragraph ("about 25 days between gate 2 and capstone"), 7.4 "Your turn" and "If you tracked your own habit but have fewer than 30 days", course.yaml projectGoal, outcome O7, brief "Demo".
  observation: Between the end of gate 2 and the start of 7.4 there are 27 chapters whose `estimatedMinutes` sum to 580 minutes (3.1 to 6.6 is 520, plus 7.1 to 7.3 is 60). The brief's pace is 45 to 60 minutes a day, which is 10 to 13 study days, so a learner on that pace reaches the capstone with 10 to 18 calendar days of tracking, not 30. Even the roadmap's "one chapter a day" gives 27 days, not 25, and 40 days for the whole course, not the three to four weeks in the brief. So the "run" part of O7 and the brief's success signal "Capstone reviews show real tracking data" cannot be met by a learner following the course as scheduled; most will review a provided case or a partial month. The capstone does accept those, but the outcome, the project goal and the title still promise a 30-day plan that was run.
  why it matters: The outcome is not evidenced for most learners, and gate 5 (about 7 to 9 days of own data at the stated pace) asks for cause counts that a 9-day card with one or two misses cannot support. Honest design and honest promise should agree.
  required fix: Either (a) state the real calendar in the course intro, gate 2 and the roadmap (the capstone window opens when the learner has tracked about 30 days, the course takes about 6 weeks end to end) and correct the arithmetic, or (b) restate O7 and the capstone as "design a 30-day plan and review a real or provided month", and say that running 30 days continues after the content. Fix the roadmap sentence either way.

- id: S2-5
  location: 6.1 (`openquestion`, `required: true`, `minWords: 25`) and 2.1 (`openquestion`, `required: false`).
  observation: Both are mentor-reviewed OpenQuestion blocks in a Read (set-the-scene) chapter. 6.1 asks "Why do you think her five habits faded... Name two reasons" immediately after a section titled "Why five at once faded" that lists them; 2.1 asks the same of Lina's plan after "What went wrong". Neither has a rubric, a pass rule or a follow-up step, and the `modelAnswer` gives away the module's thesis.
  why it matters: The playbook limits OpenQuestion to gates and defenses, and its placement matrix says "Never" for orientation chapters. A required human-reviewed response at 6.1 adds a mentor queue item per learner outside the 15-minute-per-capstone budget, with no key beyond the sample, and measures reading the paragraph above.
  required fix: Convert both to a predict or a LearningLog prompt (ungraded), or delete them. If a pre-test is wanted, make it a `predict` before the explanation.

- id: S2-6
  location: 7.4 "Submit your plan and review" (`minWords: 250`, `allowUrl: true`, `urlRequired: false`) and its sentence "If writing is hard today, add a voice note link and keep the written part shorter"; same pattern in gates 1 to 7 ("You answer in writing or in a voice note").
  observation: The text promises a shorter written answer plus a voice link, but the block enforces 250 written words (90 to 120 at the gates). The playbook says a link-only answer must set `minWords: 0` or it "stays a draft and never reaches the mentor"; a shorter text with a link has the same problem. The target learners are Arabic-first, on phones, with a 250-word, five-part answer in English as the capstone evidence; the chapter does not say whether an Arabic answer or a recording in Arabic is accepted.
  why it matters: The accommodation the course advertises does not exist in the block, and the people it is meant for hit a hard wall at the final submission.
  required fix: Set `minWords: 0` on the capstone and gate blocks and put the "all five parts must be covered" rule in the rubric (the mentor already checks it), or remove the voice-note sentence. State in the capstone and each gate which languages and formats are accepted.

### S3

- id: S3-1
  location: 3.4 Q1, 5.5 Q4, 6.5 Q1, 6.5 Q4, 7.2 Q2 and others.
  observation: Distractor quality is uneven. 3.4 Q1 offers "Full: stream a lesson. Backup: stream a short lesson..." when the stem says half the ride has no signal, "Backup: none, she rests on bad days" and "an hour of study at home on Friday instead", so the correct set is the only workable one. 5.5 Q4 compares one concrete note ("Van broken Mon, Tue. Wed after parking: 5 minutes of the lesson.") against three emotional caricatures ("Lazy again. No more excuses"). 6.5 Q1 B, C and D are contradicted by the stem. 6.5 Q2 names the three things she already does and leaves one change, answerable by elimination.
  suggested fix: Make at least two distractors per item a plausible half-fix that a learner who half understood might choose (a backup that still needs the internet, a restart note that blames nobody but has no cue), as 3.5 Q1 and 4.5 Q2 do.

- id: S3-2
  location: 4.2 Q1 (Hiba, 42 to 17 give-ins), 6.2 Q1 (Jamal, 33 to 27), 5.2 Q2, 3.4 Q2, 6.2 Q2.
  observation: Some items measure arithmetic on a toy rule or restate a sentence. 4.2 Q1 and 6.2 Q1 need multiplication and addition of weighted scores; the chapters themselves say a one or two point gap means both choices are reasonable. 5.2 Q2 asks "which line is most useful to track", which is the chapter's own three-part definition. 3.4 Q2 ("Go back to the full version") is step 6 of the worked example. 6.2 Q2 is keyed by the chapter's own slogan "more evidence".
  suggested fix: Replace with diagnostic items on stated evidence, like 3.5 Q1, 4.3 Q1, 5.2 Q1 and 6.3 Q1, where the learner must read a short log and choose the cause or the change.

- id: S3-3
  location: 1.4 Q1, 2.5 Q2, 7.3 Q1 (all "21 days"); 6.4 predict, 6.4 Q1, 7.3 Q5 (clock versus event); 4.4 predict and Q2; 5.4 predict, 5.4 Q2, 7.3 Q4 (double session versus small restart); 3.2 predict and 3.5 Q2.
  observation: The same discrimination, with the same distractor structure, is tested three or four times. 7.3 is meant to interleave, but it draws one item each from modules 1, 3, 4, 5 and 6 and none from module 2 (starting small, if-then plans), and three of its five repeat earlier items.
  suggested fix: One transfer item per discrimination; give 7.3 one module 2 item (for example a vague plan to rewrite) and new cases for the rest.

- id: S3-4
  location: 1.3 Q2 and predict, 3.3 Q2, 5.5 Q1, 6.5 Q3, 6.4 Q1, 7.3 Q5.
  observation: Some keys rest on weaker ground than the grading implies. 1.3 Q2 keys "enjoyment helps more than knowing it is useful", which the text itself calls "a single exploratory study" and "a hint". 3.3 Q2 says "Based on the phone study", but that study tested a pause and an easy exit, not a drawer in another room. 5.5 Q1 treats two missed days in a row as covered by research on one missed day. 6.5 Q3 keys "bed at 23:00, up at 6:00, every day" from "health agencies" with no source shown to the learner. 6.4 Q1 and 7.3 Q5 key "tie it to the meal" although 6.4 says clock and routine cues worked about equally and "a clock time is fine if you check it when the season changes"; the option "reset the alarm to the new meal time" is not offered, and an expert could defend it.
  suggested fix: Re-word each stem so the key follows from the evidence given in the stem, or offer the defensible rival and key on the course's stated criterion.

- id: S3-5
  location: 2.6 gate (Fadi, apron anchor), 5.6 gate (Duaa, water glass second anchor), 6.6 gate (Rana, lesson planning after the evening meal), 3.6 gate (Iyad).
  observation: The "strong answer" shown in a gate is the keyed answer of an earlier quiz item (2.3 Q2 apron, 5.2 Q1 water glass, 6.5 Q1 lesson planning, 3.4 Q2 and 3.5 Q4 Iyad). A learner can model a plan on it nearly word for word.
  suggested fix: Use exemplars from a different case and anchor than any quiz key.

- id: S3-6
  location: all `openquestion` fences; `server/scripts/import-course.ts` (`openquestion` config has `prompt`, `minWords`, `sampleAnswer`, no `rubric`); review page shows "Reference answer (mentor only)".
  observation: The Met, Partly and Not yet tables and the pass rules exist only in the learner-facing chapter text. The mentor sees the prompt and the `modelAnswer` key but not the table or the pass rule.
  suggested fix: Append the rubric table and pass rule to each `modelAnswer` (mentor key), keeping the learner copy. This is what makes 15 minutes and inter-rater agreement realistic.

- id: S3-7
  location: 4.6 rubric "Cue and need: ... linked to something noticed"; 7.5 rubric "A clear cue and a small first step | vague"; 7.4 rubric part 2; 3.6 Nada brief versus prompt; 7.4 Rasha key; 6.1 table row "All five".
  observation: (a) "Linked to something noticed" and "clear/vague" are not countable. (b) 7.4 part 2 "Met" needs "one thing made harder", but Nada's and Ziad's cases contain nothing made harder, so a faithful review of those cases cannot reach Met on that line (the pass rule only needs parts 3 and 5, so it is survivable but unfair as worded). (c) 3.6 asks the Nada reviewer for "her full version and her smallest version", the open-question prompt asks for full, backup and smallest, and only the key reconciles them. (d) The Rasha key says "on weekday nights the plan worked 20 of 22 times", which counts 22 nights that are not Thursday or Friday; counting nights without guests it is 21 of 23. (e) 6.1 row "All five" holds total ticks.
  suggested fix: Give each fuzzy level a count or a test ("names a place you could point to"); reword 7.4 part 2 for review mode ("says what was made easier or harder, or what was missing"); align the 3.6 brief with the prompt; say "nights without Thursday or Friday" in the key; rename the 6.1 row "Ticks, all habits".

- id: S3-8
  location: whole course, Learn chapters 2.2 to 7.2; gate prompts 2.6 to 7.5.
  observation: Support does not fade. Every Learn chapter in module 6 and 7 still has the nine-beat template with a full worked example before the learner attempts anything, and every gate prompt from gate 2 to gate 7 enumerates the numbered parts ("Include five parts. First... Second..."). No chapter tells the learner that help is being removed on purpose, which the standards ask for. The first time the learner reads a raw table independently is gate 5 (Nada, 18 rows), then the capstone (90 raw rows).
  suggested fix: From module 5, put the learner's attempt before the worked example in two Learn chapters (count a raw 12-row card in 5.3; map your own day before Dina's in 6.4), shorten gate prompts to a headline and a checklist in gates 6 and 7, and say so in the text.

- id: S3-9
  location: 1.4, 5.4, 6.2, 6.4, 7.2 (Learn); gates 1 to 7 (25 minutes each).
  observation: One hard thing at a time is broken in places. 1.4 holds the curve shape, the 66-day median, the 18 to 254 range, the 21-day origin, one miss, the gap result and the 2024 review. 5.4 holds slow results, slip versus giving up, self-compassion research, a three-part restart plan and the fresh-start effect. 6.2 holds a four-criterion weighting, one-at-a-time, identity and difficulty reading. 6.4 holds anchors, clock versus event, sleep, health, family and changed days. 7.2 holds five review questions plus a 54-programme study. Each is 25 minutes with 1,540 to 2,080 prose words, a canvas, a predict and two items, for second-language readers on phones. Gates are 25 minutes for a checklist, four learning-log prompts and a 120-word five-part answer, and 7.4 is 90 minutes for 2,550 words of reading, 90 table rows and 250 written words.
  suggested fix: Make the research asides in 1.4, 5.4 and 7.2 an optional "Where this comes from" block; split 6.4 into rhythm and changed days; set gate time to 35 to 40 minutes or cut the learning log prompts that duplicate the task (2.6 prompt 3, 3.6 prompt 2, 4.6 prompt 3).

- id: S3-10
  location: every Learn chapter; canvases rami-decide-or-cue, habit-loop-repeats, if-then-moment, khaled-evening-cues, power-cut-backup-plan, maha-night-loop, slip-or-give-up, prayer-time-anchors, thirty-day-review, tracker-week-notes, dina-study-block, phone-out-of-the-bedroom.
  observation: The story is told in the opener, again in the canvas, again in "What the stepper showed", again in the worked example, and again in the diagram. 12 of 19 canvases (5 sequence, 7 state machine) are fixed narrations with no input. The worst case is thirty-day-review: Samir's card is read in 7.1 ("A closer look"), replayed step by step in the canvas, and written out a third time in "Samir's month, step by step". It is also the least interactive point of the whole course, since the learner never does a review on a new card before the capstone.
  suggested fix: Cut the "What the stepper showed" paragraphs or fold them into the canvas notes; for the review chapter, give the learner a second raw card (for example Yousef's week-5 data) to count and cause-group inside the canvas before Samir's answer appears.

- id: S3-11
  location: canvas fewer-temptations (4.2); phone-out-of-the-bedroom (4.4); khaled-evening-cues (3.2); habit-strength-curve (1.4); streak-or-done-count (5.3).
  observation: (a) fewer-temptations compares halving the temptations (a 50% cut) with resisting 10 points more (a 20% relative cut at 50%), so the arithmetic favours halving by construction; resisting at 75% would match it. A learner can state "arithmetic beats willpower" rather than the dossier's actual claim (disciplined people face fewer temptations). (b) Its `limits` say "fewer fights may even leave more energy for the ones that remain", which restates the depletion idea the chapter has just shown failed replication. (c) phone-out-of-the-bedroom's spec claims removal "does more than a promise", but no promise night is shown. (d) khaled-evening-cues' predict is early versus late link, but the late-link fight never appears in the canvas, so it cannot confirm the prediction. (e) habit-strength-curve teaches three claims (shape, spread between people, one miss) and the learner can finish ten minutes without stating any single one. (f) streak-or-done-count uses a 0/1 range slider for "Spread out" and silently moves the first miss earlier to make the misses fit.
  suggested fix: (a) show the resistance level at which the two plans tie ("halving needs resisting 75% instead of 50%, every night"); (b) delete the energy clause; (c) add one promise night or retitle the claim; (d) add the late-link attempt to the canvas; (e) split into shape and spread or state one claim in the spec; (f) use a toggle and show the move in the stat line.

- id: S3-12
  location: 6.2 canvas copy ("What changed: raising 'Helps the rest of the day' moved sleep from third to first").
  observation: At the default weights the totals are English 32, sleep 26, walk 25, so sleep starts second, not third.
  suggested fix: "moved sleep from second to first".

- id: S3-13
  location: 4.4 "What research found" ("Removing a cue is something you do in advance, and it is one of the strongest tools for unwanted habits").
  observation: The dossier ranks no tool, and the next sentences report that avoiding the situation helped with temptations but not with strong habits. An unsupported superlative.
  suggested fix: "a main tool, which works best together with noticing the start".

- id: S3-14
  location: names across 68 quiz items and 7 modules.
  observation: Near-identical names that second-language readers will confuse: Nada (gates, capstone) and Nadia (1.5, 2.3 library corner); Salma, Sana, Sara, Samir, Shahd; Asma and Aya; Lina, Layla and Lama. The recurring cast is good, the lookalikes are not.
  suggested fix: Rename Nadia and one of each lookalike pair.

- id: S3-15
  location: 7.4 "Choosing your habit or case", "Choosing your habit" AI step.
  observation: "Read all three before you choose" asks a learner on weak data to read 90 table rows before deciding. The own-plan path needs an AI chat tool (fallback to popular advice is given, which is good). The language of the learner's answer is not stated.
  suggested fix: Add a one-line pattern summary per case so the choice is possible without reading the tables; state accepted answer languages.

- id: S3-16
  location: the `predict` prompts in 2.2 and 6.2.
  observation: Two predicts cannot be answered from what the learner has seen. 2.2 asks "needs an effort of 7 on this example's scale of 0 to 10... on how many days" before the scale or the series is shown (they are in the canvas intro). 6.2 asks about re-weighting before the scores and weights table, which comes after the canvas.
  suggested fix: Show the data the prediction needs inside the predict prompt, or move the prediction after the table.

- id: S3-17
  location: 1.5 learning log item 3; O1 in the roadmap.
  observation: "Explain what research says about how long habits take" is evidenced by MCQs (1.4 Q1, Q2; 2.5 Q2; 7.3 Q1), which are recognition. The gate task does not ask for it and the learning log is not assessed; for a learner who picks the Nada case, the capstone checks the 21-day myth, otherwise nothing does. Several learning-log prompts duplicate the open question (2.6 item 3, 3.6 item 2, 4.6 item 3).
  suggested fix: Add a one-sentence "what to expect in week one and after a missed day" line to the gate 1 task and its rubric, and drop log prompts that duplicate the task.

- id: S3-18
  location: server import (`import-course.ts`, MCQ `allowRetry: true`) and chapters that call 2.5, 3.5, 4.5, 5.5, 6.5, 7.3 "graded".
  observation: Every MCQ allows unlimited retry with an explanation shown per option, so a learner can click through to completion. The quizzes are formative, not graded evidence, and with the length and form tells they are weaker still.
  suggested fix: Call them "practice checks" in the text, and keep the weight of O1 to O7 on the gates and capstone; or turn retry off for 7.3.

## What works

- Every Learn chapter, all 19, has a predict before its canvas and two transfer items after it on a new case, within the interaction budget. This is rarer than it sounds and worth preserving.
- The canvas specs state a claim, list inputs and worked values, and the numbers hold. Limits are honest and specific ("can", not "will", for reward-insensitive habits; "a hint, not proof" for two weeks).
- The best quiz items are diagnostic: 3.5 Q1 (four facts to choose a cue), 4.3 Q1 (infer the need from where she does and does not scroll), 4.5 Q2 (Sara's five logged evenings), 5.2 Q1 (cause from grouped notes), 6.3 Q1 (time-leak accounting), 7.2 Q1 and Q2 (cause chooses change, then judge a result honestly). Keep this style and use it to replace the weaker items.
- The AI-answer check (2.5 Q2, 4.5 Q1, 5.5 Q1, then each capstone case) is a good fit for the audience and carries into the capstone coherently.
- Gate and capstone design: stated pass condition before the learner starts, strong and weak exemplars, a provided case with no penalty, mentor keys with "do not accept" lists, and a follow-up step. The capstone's three cases are all arithmetically exact, each has a different dominant pattern, and each AI answer contains a course-taught error.
- Scoring models (anchors, first habit) are consistent across 2.4 and 6.2, labelled as the learner's own judgement, with the "a gap of one or two points means both are fine" warning.
- Hardship is handled correctly: every personal prompt has a fictional alternative, nothing asks for or grades hardship, and the single therapy boundary is stated once and kindly in 4.1 and 4.6.
- The research claims are carried with the dossier's cautions intact (21 days as a myth, 66 as one study's median, anchors and tiny steps as advice, streak and fresh-start as supported but not proven).

## Recommendation

**Revise.** No S1. Six S2 defects, all fixable without restructuring the course: rewrite the option sets and move the predicts (S2-1, S2-2); teach "second anchor" in module 2 or 5 (S2-3); state the true calendar or restate O7 (S2-4); remove the two open questions from the openers (S2-5); align the voice-note promise with `minWords` (S2-6). Re-review the changed predicts and quiz items with the full length, position and punctuation count, and re-score dimensions 1, 6, 7, 8, 9, 10 and 20 after the S2 fixes. After one round the scorecard should reach the 4.3 average if the S3 items on fading, overload and canvas claims are also handled.

Notes outside the count (S4): eight source files (03.01, 03.02, 03.04, 03.05, 04.01, 04.03, 04.04, 04.05) use CRLF line endings while the other 32 use LF; the importer normalises them, but mixed endings will show up in diffs. 2.2 Q2 keys "a printed word list by the window" on an evening with the power off from 18:00; say "by a candle or the phone torch" or move the hour.
