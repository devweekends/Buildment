---
artifact: critique
course: build-with-ai
artifact_under_review: content/import/build-with-ai/ (course.yaml, 6 modules, 40 chapters) and frontend/src/canvas/<slug>/data.ts for the 22 Learn-chapter canvases
reviewer: critic A (agent-ip G5), round 2
review_type: pedagogy, with assessment
version: 2
scorecard_average: 4.14
blocking_defects: 0 S1, 0 S2 (3 round 1 S2 items survive in part, re-rated S3)
recommendation: revise (narrow), then human review board
---

# Critique A, round 2 (pedagogy and assessment): Learn and Build with AI

## Review basis

Read blind again: all 40 chapters, `course.yaml` and all 22 canvas `data.ts` files, from the files as they now stand (no file changed in the last hour, so the restart did not affect the read). I did not read the writers' rationale, the revision brief or anything under `context-packs/`. No course file was edited.

Ran, read-only:
- `node agent-ip/scripts/audit-course.mjs content/import/build-with-ai`: 40 chapters, 0 needs-work, no warnings. Chapter minutes now total 1,080 (18 hours) plus about 4.5 hours of labs; `estimatedHours` is 22.
- My option-cue scan of all 68 MCQs and 25 Predicts (length rank of the key, reason clauses, key position). Results in the next section.
- A script that recomputed every canvas total quoted in the chapters. The factor canvases match: for example Khaled's store leads in exactly 2 of the 243 weight settings (22 to 20 and 25 to 24), as 01.05 now says; the cache counter wins in exactly 1 of 81 (21 to 20).
- A scan for em and en dashes in the chapters and canvases: none.

Not done, so dimensions 11, 14, 19 and 20 stay provisional: no render at 375px, no Docker or GitHub command run, no independent blind-key run by a second model family (I answered each key while reading and found one ambiguous key, N-2 below, but I am the same family as the drafters, so this is not the independent check). No canvas QA report exists in `agent-ip/work/build-with-ai/qa/` (only the two critiques), and there is still no `roadmap-confirmation.md`.

## Option-cue scan, re-run

| Measure | Round 1 | Round 2 |
|---|---|---|
| MCQ keys that are the longest option | 0 of 68 | 23 of 68 (34%) |
| MCQ keys that are the shortest option | 25 of 68 | 26 of 68 |
| MCQ keys at least 10% longer than the longest wrong option | 0 | 0 |
| Mean length of key against longest wrong option | -6.2% | -4.4% |
| Predict keys longer than the other label | 0 of 26 | 14 of 25 (56%) |
| Wrong MCQ options with a "since/because/as" clause | 33% (68 of 204) | 79% (162 of 204) |
| Correct MCQ options with such a clause | 3% (2 of 68) | 76% (52 of 68) |
| Expected score of "drop reason clauses, then drop the longest" | 48% (chance 25%) | 24% (chance 25%) |
| Key positions (first to fourth) | 15 / 19 / 19 / 15 | 16 / 18 / 19 / 15 |
| Predict key positions (first, second) | 14 / 12 | 11 / 14 |

The length and reason-clause cues are gone: the key is now sometimes longest, sometimes shortest, nearly always carries a reason like its neighbours, and a content-blind rule scores at chance. No set has the key longest in half or more of its questions once it has three or more items (05.06 and 02.05 and 03.07 sit at 2 of 5). Positions are well spread. One residual structural tell: `05.06` item 4 (three options start "A new database" or "Either one" against one "The staff's spreadsheet"); see S4 below.

## Round 1 defects and their status

Counting each numbered item once, with the four S4 items counted as a single item: **23 items. Fixed 14, partly fixed 9, not fixed 0.** Where an item is only partly fixed, the residual is re-rated S3 (the S2 part is cleared) and carried into "Open items".

| ID | Defect (short) | Status | Evidence in the revision |
|---|---|---|---|
| S2-1 | O7 explain-back unscored; provided route cannot test it | Fixed | `06.05` rubric has a sixth row "Walk-through" with Met, Partly, Not yet; the pass rule needs rows 3 and 6; on Ibrahim's route the mentor asks about the fellow's own plan or notes page; a written or voice fallback for weak data |
| S2-2 | Capstone part 5 contradicts itself; O8 not evidenced on provided route | Fixed | `06.05` Ibrahim item 5 now asks for an honest post plus a 100-word second version; rubric row 5 and the mentor key agree |
| S2-3 | Gate 3 "AI checked" unreachable on the provided topic | Fixed | `03.08` prints an AI review plan to check (three reviews bunched, then 18 days with none); the row is now "Checked against a source" and accepts an audio or text-to-speech claim |
| S2-4 | Gate 4 one rubric for two tasks | Fixed | `04.07` has a Route 1 table and a Route 2 table for Shahd's log, each with counts and its own pass rule; password change is a must-meet |
| S2-5 | Predicts are not predictions | Partly fixed | About 20 of 25 are now genuine guesses with the answer moved after the predict (for example `01.02`, `02.01`, `02.04`, `03.06`, `04.02`, `05.02`, `05.03`, `06.02`, `06.03`); duplicates in canvas `tryThis` removed. Residual, re-rated S3: see O-1 |
| S2-6 | Test-wise cues in the MCQ set | Fixed | Table above: length and reason-clause cues removed, content-blind score at chance |
| S2-7 | Retrieval blocked by module; mixed review not mixed | Fixed | `06.04` is shuffled, has a module 6 item and a two-habit item (item 1); `03.07` item 3, `04.06` item 5 and `05.06` item 3 are tagged review items from earlier modules. Minor gap: S4 N-4 |
| S2-8 | Time estimates too low; follow-up not counted | Partly fixed | Gate estimates raised to 30, 40, 45, 50, 40 and 30 minutes and `04.07` says plainly it includes running the lab; capstone says "two or three sittings". Residual, re-rated S3: see O-2 |
| S2-9 | Support never fades | Partly fixed | A fading statement in `04.01` and `06.01`; `05.03` shows steps 1 and 2 in full and steps 3 to 5 as an outline; `06.05` shows parts 1 and 3 in full and 2, 4 and 5 as outlines; gate 6 drops the weak example. Residual, re-rated S3: see O-3 |
| S3-1 | Required open questions in Read chapters | Partly fixed | `01.01` and `05.01` are now `required: false`. But `03.01` gained a new optional open question, so three Read chapters still hold a mentor-reviewable reflection (O-4) |
| S3-2 | Canvases retell the chapter; triple telling | Partly fixed | The duplicate prediction is gone from every `tryThis`, and `tryThis` now points to the step that answers the chapter's predict; recaps shortened in `04.04` and `03.05`. Still 18 of 22 are step-throughs the learner cannot change (O-5) |
| S3-3 | Cognitive load; "angles" name collision | Partly fixed | `04.04` cut to cache then database with the restart policy in one paragraph; `05.04` renamed "five questions", SQL injection moved to a Callout; `03.02` try-it now uses an invented library rule. Module 3 canvases still use subnetting and routing (O-6) |
| S3-4 | Undefined terms, idioms, long sentences | Fixed | API, endpoint, framework, Docker, terminal, rate limits, deploy, issues, pull requests, virtualisation now glossed; none of the listed idioms remain; lesson sentences over 30 words fell from 17 to about 12 |
| S3-5 | Quiz items test the paragraph above; key and wording problems | Fixed | Items rewritten as numbered fact lists on new cases (for example `01.05` both items, `04.06`, `06.04`); `06.03` item 1 wording matches; `04.05` item 1 now reads "The entry and .gitignore" |
| S3-6 | Rubric gaps; classification; follow-up reply | Fixed | Every gate states counts in Met and Partly cells and adds "your reply ... answers it with evidence" to the pass rule; Ibrahim's required problems are listed (a to e); `06.06` has a "Look back" row; canvas `ai-missing-context` step 3 now files all four facts under context. One small new gap: N-3 |
| S3-7 | Ibrahim route hard to achieve | Fixed | `06.05` "What you produce for Ibrahim's case": plan for the five angles (not done), three recall questions (no result), day 5 notes page from the information given |
| S3-8 | Voice note against `minWords` | Fixed | The shorter-written-part sentence is gone; every gate says dictate with the microphone and add a voice link "as well" |
| S3-9 | Restating diagrams; fixed templates | Partly fixed | Diagrams rebuilt or replaced in `01.01`, `01.03`, `03.06`, `04.01`, `05.03`, `06.02`; the "What to notice / takeaway" frame fell from 29 to 12 uses. The "The first mistake ... second ..." frame still opens "Where it goes wrong" in 17 chapters (O-7) |
| S3-10 | Yara's timeline | Partly fixed | A week table in `05.03` and `06.05` now places containers in week 5 and caching in week 7, and `03.03` and `04.01` agree. Three statements still disagree on when the lab log starts (N-1) |
| S3-11 | Capstone hands over a full template | Fixed | `06.05` shows parts 1 and 3 in full and parts 2, 4, 5 as outlines |
| S3-12 | No named human contact | Fixed | `01.01` and `06.06` both say to talk to the mentor or the fellowship coordinator |
| S3-13 | O4 audio not assessed | Fixed | `03.08` checklist says "when audio is available"; the "Checked against a source" row accepts an audio or text-to-speech claim. I did not check that the brief and roadmap wording of O4 was updated; that is for the orchestrator |
| S4 | Four polish items | Partly fixed | `03.07` item 1 now says "In his case"; `05.05` now has a "Worked example" heading; the tool-scores caveat is in the chapter text (`02.03`). The "Mentor key" label in model answers is unchanged (unverified whether it reaches learners) |

## Scorecard

Thresholds from `06-quality-gates.md`: every dimension at 4 or more, average 4.3 or more, no S1 or S2. Every dimension is now at 4 or more and there is no open S1 or S2. The average is 4.14, which is below 4.3, so the gate is not yet met.

| # | Dimension | Score | Note |
|---|---|---|---|
| 1 | Outcome alignment | 4 | O7 now has a scored walk-through, O8 is evidenced on both routes, O4 has a gate row; spacing (O3) is still a date list. |
| 2 | Domain specificity | 5 | Gaza fellows, phones, shekels, Palestine access checks, one running fellow; cases are still the strongest feature. |
| 3 | Depth over coverage | 4 | Seventeen habits in about 22 hours; each has a failure story, worked example and transfer item; 05.04 is still the densest chapter. |
| 4 | Prose quality | 4 | Idioms removed, jargon glossed, about 12 long sentences left in lessons; the "first mistake" frame still repeats. |
| 5 | Chapter structure | 4 | Failure story, concept, worked example, predict, canvas, mistakes, transfer in every Learn chapter; reflection only at gates and in three optional Read prompts. |
| 6 | Interaction purpose | 4 | About 20 of 25 predicts are real guesses; 18 of 22 canvases remain step-throughs the learner cannot change; five predicts still weak (O-1). |
| 7 | Assessment quality | 4 | Cues removed, fact-list cases, counted rubrics, follow-up in every pass rule; one ambiguous key (N-2) and one rubric gap (N-3). |
| 8 | Difficulty calibration | 4 | Fading stated and partly built in; gate time raised; chapter minutes and the follow-up round untested with fellows (O-2, O-3). |
| 9 | Cognitive load | 4 | 04.04 and 05.04 trimmed; module 3 canvases still lean on networking; the story told fewer times. |
| 10 | Prerequisite integrity | 4 | Terms defined on first use; networking topics in module 3 still assume willingness to follow unfamiliar domains (marked "you do not need to know"). |
| 11 | Technical accuracy | 4 | Provisional. Claims match the dossier; every recomputed total is right; no commands run. |
| 12 | Production-grade coverage | 5 | Not applicable: a foundation course with no product build. |
| 13 | Security and integrity | 4 | Secrets and privacy teaching exact; the walk-through and the evidence-bearing follow-up reply now guard the model-completable cases. |
| 14 | Accessibility | 4 | Provisional. Phone-first, no images, audio optional, text after each diagram; four-column rubric tables at 375px not checked. |
| 15 | IP protection | 4 | No hidden solution leaks; the capstone example is now partial. Rubrics are visible by design. |
| 16 | Variant distinctiveness | 5 | Not applicable: the brief says no variants. |
| 17 | Continuity | 4 | Names, numbers, week table and canvases agree closely; the lab-log start week does not (N-1). |
| 18 | Learner agency and curiosity | 4 | Own project or provided case at every gate; predicts now ask for a real guess more often than not. |
| 19 | Instructor alignment | 4 | Not a valid gate score: no confirmation record. Provisional 4 for fidelity to the drafted roadmap only. |
| 20 | Interactive canvas quality | 4 | Four model canvases are correct and tested by my recomputation; step-throughs no longer duplicate the predict; no canvas QA report exists, so this is provisional. |
| 21 | Explanatory depth | 4 | Audit passes (lowest Learn chapter 1,242 prose words); mechanism, worked example and failure modes present. |
| 22 | Visual explanation quality | 4 | 29 flowcharts; the restating ones were rebuilt to argue (for example the loops in `01.01` and `01.04`); the frame fell from 29 to 12 uses. |

Average: 91 / 22 = **4.14** (4.14 also without dimension 19 once rounded: 87 / 21 = 4.14).

## New defects introduced by the revision

### S1

None. I found no wrong key that has an unambiguous alternative, no unsafe instruction and no learner-visible answer key.

### S2

None.

### S3

**N-1. The start week of Yara's lab log is stated three ways.**
- location: `05-a-project-worth-six-months/05.02-why-strong-projects-take-months.md`, section "Feeling faster is not being faster" ("From week 5, when her lab log starts"); `04-daily-labs/04.01-set-the-scene.md` ("In week 7 ... she started a lab log"); `06-share-the-work/06.05-capstone-your-project-start.md` Part 3 ("Her log began in week 7 ... 17 days in weeks 7 to 9"); `05-a-project-worth-six-months/05.05-learn-from-open-source.md` ("on lab day 9, in week 7"; the reuse happens "in week 9").
- observation: week 5 against week 7 for the same event, and lab day 9 of a 17-day log that began in week 7 cannot fall in week 7.
- why it matters: the revision introduced the week table to fix the old timeline; a careful learner now finds a fresh contradiction on the exact point (plan first, then log) that the chapters teach.
- required fix: choose week 7 everywhere; change 05.02 to "from week 7, when her lab log starts" and 05.05 to "on lab day 9, in week 9".

**N-2. One key depends on an unstated page layout.**
- location: `03-learn-deeply-with-ai/03.07-quiz.md` item 3 ("Review from module 2 ... Noor").
- observation: the stem says the guide's "last page" lists the volunteers' names and phone numbers and "Page 6" shows the Wi-Fi password. If the guide has six pages, the last page is page 6 and only one page needs removing, but the key says "Remove two pages first" and the explanation says "those two pages".
- why it matters: an ambiguous key is a disagreement under `05-assessment-and-motivation.md` (Answer-key check) and a careful learner can argue the item.
- required fix: say "page 5 lists the volunteers' names" or "its last page, page 9"; keep the key.

**N-3. Gate 2 "Checked and dated" row has an uncovered case.**
- location: `02-your-ai-toolkit/02.06-checklist.md`, rubric row "Checked and dated".
- observation: "Partly" needs a date on every row; "Not yet" is "No dates, or three or more rows with no answers". A page with dates on some rows and not others is in neither cell.
- why it matters: this is exactly the case two mentors will see most often and grade differently.
- required fix: Partly: "most rows have a date, but up to two rows miss an answer or rely on a video or a friend"; Not yet: "half or more of the rows have no date, or three or more rows have no answers".

### S4 (polish)

- N-4. `06.04-quiz.md` says "five fresh cases from across the whole course" but has no module 4 item and two items from module 2 and 6; add one lab case or change the summary.
- N-5. `01.05` item 2 (Applicant B against C) rests on weighing a one-week wait against a demo that breaks on a wrong date; defensible, and the explanation says why, but an expert could pick C. Add "the demo cannot be fixed before the library opens" or make C free in week 4.
- N-6. `02.03` item 2 key reads "Use a computer in the browser, since the laptop has one"; "one" has no clear referent (a browser). Rewrite as "since the laptop has a browser".
- N-7. `05.06` item 4: the key is the only option that does not begin "A new database" or "Either"; rewrite so the two database options differ in their first words.

## Open items (round 1 residuals, re-rated S3)

**O-1. Five predicts are still weak.**
- location: `02.03` (scores set by the author; the chat label "does a bit of everything" nudges the key), `04.01` ("Do you expect him to keep it up for a month?" is a forecast about a person), `04.05` (answerable from the module 2 rule that passwords never go in), `05.04` (reading the table above gives the answer), `06.01` (the key label "public is not the same as easy to find" states the lesson).
- required fix: for each, either cut the predict or move the clue after it, as was done in `02.04`, `03.06` and `05.02`.

**O-2. Timings and the follow-up round are not tested.**
- location: `estimatedMinutes` in `01.06` (30), `02.06` (40), `03.08` (45), `04.07` (50), `05.07` (40), `06.06` (30), `06.05` (120) and every Learn chapter (25).
- observation: gate estimates were raised, but none counts the mentor's follow-up reply, and no estimate says it was timed with a fellow on a phone. Learn chapters carry 2,200 to 2,500 raw words plus a predict, a canvas and two long-stem MCQs.
- required fix: time two or three fellows on a phone, record the result in `qa/`, and adjust.

**O-3. Gates 1 to 5 still share one scaffold.**
- location: `01.06`, `02.06`, `03.08`, `04.07`, `05.07`.
- observation: each gate has a strong example, a weak example, a provided case, a full rubric and a mentor key; fading is stated in `04.01` and `06.01` but the gates themselves do not get lighter until gate 6.
- required fix: drop the weak example from gates 4 and 5, and say in each so ("this gate gives you less help than the last").

**O-4. Three optional reflection prompts in Read chapters.**
- location: `01.01`, `03.01` (new), `05.01` open questions (`required: false`, with model answers).
- required fix: convert to `LearningLog` prompts, or remove the model answers so no mentor review is invited.

**O-5. Eighteen of twenty-two canvases are step-throughs.**
- location: all `sequence` and `state-machine` canvases.
- observation: nothing the learner does changes the outcome; the contract's "what changed" is satisfied only by the chapter paragraph.
- required fix: for the three or four that model a choice (`url-shortener-stop-a-part`, `plan-a-lab-with-ai`, `week-plan-check-resources`, `reuse-open-source-safely`), let the learner pick the next step and show the consequence; write the canvas QA report.

**O-6. Module 3 canvases still lean on networking.**
- location: canvases `close-it-and-recall` (subnetting), `listen-then-read` (routing tables), chapters `03.01`, `03.03` (DNS), `03.04` (TCP and UDP), `03.05`.
- observation: the 03.02 try-it moved to an everyday topic and says "you do not need to understand those two steps", which helps, but four more chapters use networking for fellows from "mixed backgrounds".
- required fix: use one everyday example (the library rule) as the second topic in `03.03` and `03.04`.

**O-7. The "Where it goes wrong" frame.**
- location: 17 chapters open it with "The first mistake is ..." or a close variant.
- required fix: vary the frame in at least half of them (a single worked failure, as `04.04` now does).

## What works (preserve it)

- The predicts that were rebuilt are the best interaction in the course: `04.02` (capital letters at the cache), `05.03` (a real author does not prove the book), `06.02` (five numbers after "add no facts"), `02.04` (which habit saves the week). Each puts a plausible wrong answer in front of the learner, then lets the canvas answer.
- The capstone is now a real instrument: a sixth Walk-through row with a pass effect, Ibrahim's five required problems listed (a to e) with credited extras separate, "What you produce for Ibrahim's case" stated exactly, and a written or voice fallback for the live question.
- Gates 4 and 5 are the clearest rubrics in the course: two routes with counts, a must-meet row (the password), and a mentor key that begins with the provided case.
- Fading is now visible in the right places: `05.03` and `06.05` show part of the work in full and the rest as an outline, and say why.
- The MCQ set no longer teaches test-wise tricks: reasons on every option, keys spread across lengths and positions, explanations that say what to do next, and "review from module X" items that give retrieval across modules.
- The provided topic in gate 3 now carries a real AI plan to check (reviews bunched, then 18 days of nothing), which turns the weakest provided case into the best check of "does the learner apply the habit".
- Canvas data and chapter numbers still agree to the digit; the "two of 243 settings" claim in `01.05` is exactly right.

## Recommendation

**Revise (narrow).** There is no S1, no S2 and every dimension is at 4 or more, but the average is 4.14 against the 4.3 threshold, so the gate is not met. The remaining items are small and local, not structural; no rewrite from the brief is warranted. Fix, in this order:
1. N-1, N-2 and N-3, which are quick edits that remove the only new contradictions.
2. O-1 and O-4: cut or reorder the five weak predicts and the three reflection prompts.
3. O-2 and O-3: time the gates with two or three fellows on a phone, and lighten gates 4 and 5.
4. O-5 to O-7 as time allows; the canvas QA report is needed before dimension 20 can be scored on evidence.

`06-quality-gates.md` allows two review rounds; items O-1 to O-3 survived round 1 in part. Because they are now S3 and local, I recommend sending the course to the human review board with these listed, rather than a third critic pass. Also still needed from outside this review: an independent blind key check by a second model family or a person, `roadmap-confirmation.md`, and a click-through at 375px.
