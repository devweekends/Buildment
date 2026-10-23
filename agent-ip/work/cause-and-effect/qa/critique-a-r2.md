---
artifact: critique
course: cause-and-effect
artifact_under_review: content/import/cause-and-effect/ (47 chapters, 8 modules, course.yaml) with curriculum-roadmap.md
reviewer: critic-a
review_type: pedagogy + assessment
version: 2
---

# Critique: Why Things Happen, G5 round 2, Critic A

## Scope and method

Blind re-review of the artifact, roadmap and dossier only. Re-read all eight gates, all seven Check chapters (including the new 08.03 mixed review), the capstone (08.04) with its mentor key, the course gate (08.05), 08.01, 08.02, and every inline quiz in 01 to 08.02. Re-derived every table and sum in the changed sections (the three capstone cases and the mentor key, the new 6.1 stock table, the quiz stems with facts). Ran `audit-course.mjs` (47 chapters; prose minimums met; Gate chapters 728 to 1,039 words). Checked the importer for how `modelAnswer` and `ChapterRecap` are handled. Still not reviewed: the two canvases, accessibility, IP, diagram quality.

Result in one line: all six S2 defects and fourteen of eighteen S3 defects are fixed, four S3 are partly fixed, none is untouched. The revision introduced one new S2 (a provided gate case whose intended answer contradicts its own description), and five new S3.

## Fix table

| ID | Status | Evidence |
|---|---|---|
| S2-1 Rubrics cannot be applied the same way by two mentors | fixed | `08.04:How your mentor will read it` now has a Met / Partly / Not yet table per part, a pass rule (lines 1, 3, 4 Met, none Not yet), a fallback for line 4 when no comparison is possible, a source rule for own-problem evidence, and a defence table showing what a good answer does. The mentor key in the `modelAnswer` field is correct against the tables: Case 1 lost 22 baked orders by week 6, 16 turned down, market requests down 5 to 6, other areas flat at 29 to 30; Case 2 Wednesday 11 to 6 while Sunday stays 10 to 11, 6 of 7 absentees name the time; Case 3 rush jobs average 2.5 against 4.83, restaurant 2 and 2, app ruled out. `sampleAnswer` is stripped from the learner view (`server/src/shared/blocks/open-question/schema.ts`), so the key is mentor only. Gates 01.05 to 07.06 each have a level table, a pass rule and a stated mentor follow-up. |
| S2-2 O8 assessed only by recognition | fixed | `08.05:Your review without blame` adds an `openquestion` (120 words), a provided incident, a four-line level table, a pass rule and a model answer. Roadmap O8 evidence now reads "the written review in gate 8.5". `08.01:Why this matters at work` now promises exactly this and nothing more. |
| S2-3 Recall, duplicate and cue-leaking quiz items | fixed | All seven Check chapters are rewritten as evidence items with stated facts and distractors that each fail on a named fact (for example `03.05` Anas, Ibrahim, Diyaa; `04.06` Ward, Mona, Osama; `05.05` Aseel, Bushra; `06.05` Muath, Adnan piles; `07.05` Firas, Wedad). The named duplicates are gone: the 16-step item (now Khadija, `05.04`), the "most important sentence" item (`04.06` Q4), the verbatim measure item (`03.05` Q4), the "bending question" item (`07.03` Q2, now Rasmi), the third stock copy (`06.05` Q2). Residual cues are minor (see S3-10 below). |
| S2-4 Jumana evidence did not license main against contributing | fixed | `08.04:Worked example, Part 3` now gives separate counts: 14 of 22 inside the overlap, 5 outside it but measured in shoes, 3 neither (22), and notes that 3 in three weeks is the old rate. Ranges are now 115 to 130 cm and 125 to 140 cm. Part 4 tests the chart alone and leaves the measuring line for a second test. |
| S2-5 "Direct cause" used for parts of the effect | fixed | `01.02:Huda's chain` Step 2 is now "break the effect into parts", with the sentence "These groups are not causes yet"; Step 3 finds the direct cause of each part; the diagram labels the part counts on the arrows; the Yasmin quiz distractor is now "the 15 minutes her students spent waiting", an effect, not a cause. |
| S2-6 No fading or cumulative retrieval | fixed | New `08.03-quiz.md` (five fresh cases from modules 2 to 6, "which habit first"); `08.05` text points back to it. Gates 06.06 and 07.06 no longer carry a worked answer, only a list of what a good answer contains. `course.yaml` and the roadmap include the new chapter (1,130 minutes, 19 hours, consistent). |
| S3-1 Small-sample overclaims | fixed | `02.04` Jana: "Thirty people is a small group, so this is a hint, not proof". `03.02` Sami: "So this result is a hint: run it again". `03.03` Reading the result: "Be careful here, though... only a hint"; NGO example: "3 fellows can easily come from luck". `03.03` Yusra item: "may add about 15 shekels each: a hint worth testing again". |
| S3-2 Fadi item | fixed | `02.04` Fadi no longer gives a total, so 15 complaints cannot be read as a small share; the key explanation drops "a real problem worth fixing". |
| S3-3 Leila advert timing | fixed | `06.05` Q3: the first advert shows in week 3 (12 to 18), the three week 2 adverts show together in week 4; the explanation says exactly that. |
| S3-4 Trade-off never exercised | fixed | `05.03:Likely, cheap, or both?` now has an unlikely but cheap socket, a likely but slower port, a possible but costly battery, plus a predict on which to test last. |
| S3-5 Phone test overstated | fixed | `05.03:Step through Nour's search`: "strong evidence, but not proof. A phone takes much less power than a laptop", and the final charge test "confirmed what the phone test had only suggested". |
| S3-6 Seed Steps case hole | fixed | `08.01:A week of sign-ups, gone` and `08.02:Causes`: Wael deletes from a settings page that hides the entries; the warning "did not say how many entries would go"; the tool branch and timeline row say so. |
| S3-7 Before and after fix tests | partly | Fixed in `04.03` ("That comparison has a weakness, which module 3 warned about... alternate weeks") and `04.05:Test it` (repeat or compare with paper notes). `07.04:Step 5` still compares with the two weeks before and says only "a small test... a hint"; it does not name the drift-back weakness. |
| S3-8 Reverse loop against the data | fixed | `06.02:The same loop in reverse` now says "In chapter 6.1 this did not happen" and names the extra push (waits past a week, complaints posted) that would turn the loop. |
| S3-9 Recycled names and Huda drift | partly | Names are now unique except deliberate callbacks (Suha, Ghassan, Dalia, Maha, Nadine, Hana). Two reuses remain: Layan (phone battery in `03.02`, butcher in `04.06`) and Mona (bag seller in `03.06`, library in `04.06`). Huda is fixed: `06.01` says "last summer... about 60 orders a month", son delivers, a sister decorates; capstone Case 1 says she has had a second oven since spring. |
| S3-10 Option length points away from the key | partly | Correct option is the longest in 5 of 78 (was 1 of 71) but still among the two shortest in 46 of 78. Gaps are a few characters, so no audit warning, and the pattern is much weaker. |
| S3-11 Strawman distractors and AI answers | fixed | `05.05` Q4 and `03.05` Q5 AI answers now sound reasonable and each wrong option is a mistake a learner might make; `05.03` Q2 replaced; `01.02` Q1 option 4 is now a plausible effect-for-cause confusion. |
| S3-12 Gate 1 had no submission field | fixed | `01.05` has an `openquestion` (60 words minimum), a model answer and a level table. |
| S3-13 Capstone time and table width | fixed | `08.04` is 110 minutes (roadmap updated); Case 3 table is four columns (Job and week, Deadline and client, App, Rating). |
| S3-14 Only three capstone cases | partly | `08.04:Provided case 3` adds "Your mentor may give you a case by your learner number". Still three cases for a whole cohort, so answers can be shared inside a digit group; the five-minute walk-through is the real check. |
| S3-15 No chance item in 2.5 | fixed | `02.05` Q4 (Wafa, 5 to 12 jars, two Fridays at 9 and 11) tests small numbers directly. |
| S3-16 First against second effect | fixed | `07.02:The idea` defines order by chain position ("the order of an effect is only its place in the chain"); `07.05` Q1 states the definition in the stem; Kamal's key now reads "early results can mislead either way". |
| S3-17 Heavy chapters | fixed | `02.03` and `06.03` are 30 minutes and open with a one line map of the three ideas. |
| S3-18 Chapters without an outcome | fixed | Roadmap O1 now includes listing causes and asking for evidence beyond order, with quizzes in 1.2 to 1.4. |

Counts: fixed 20 (6 S2, 14 S3), partly 4 (all S3), not fixed 0.

## Defects introduced or still open

### S1

None.

### S2

**N-1**
- location: `05-solve-it-like-a-detective/05.06-checklist.md:The provided case: Thaer's speaker`
- observation: The description says "Thaer's phone still plays music through its own small speaker", and the intended cause is that his phone sends sound to the wireless earbuds in his bag ("the sound is set to go to the wireless earbuds"; switching them off restores the cable and speaker). A phone that is sending sound to earbuds does not play it from its own loudspeaker, so the intended cause fails the "is not" side of the description. The module's central rule (5.2) is that a cause must explain both sides.
- why it matters: This is the provided case for gate 5. A learner who applies the rubric row "Causes: each fits the description" will find that the correct cause does not fit, and a mentor has no key to settle it. It teaches the opposite of 5.2.
- required fix: Replace the sentence with a fact that is true under earbud routing, for example "Thaer's phone plays music normally through the earbuds when he tests them at home", and keep the is-not side to facts the real cause explains (the centre manager's phone works on the same cable; the speaker's power light is on).

### S3

**N-2** location: `08.05-checklist.md:modelAnswer` (Marwan's stall). observation: Two customers change their address on Wednesday evening, yet the impact is "five vegetable boxes to the wrong addresses". Two changes cannot produce five wrong boxes. suggested fix: Make it five address changes, or two wrong boxes.

**N-3** location: `06.04-bottlenecks.md:Check your understanding` (Rima, two items). observation: The first stem says "sewing 8 (two machines)" and the second says a third machine raises sewing "to 24". If 8 is the total for two machines, three machines give 12, not 24. The key (20) follows from the stated 24, so the item is answerable, but a careful learner will find the numbers do not agree. suggested fix: Write "sewing 16 (two machines, 8 each)" and keep 24.

**N-4** location: `08.03-quiz.md` (Q4 Emad) and `08.01:The capstone`, roadmap row 8.3. observation: The explanation says "the email and the laptop work", but the facts only say the laptop "is on and online", not that it passes the email on. Also 8.1 and the roadmap promise cases "from every module", but the five items cover modules 2 to 6 only; modules 1, 7 and 8 are not practised. suggested fix: Say "the email works and the laptop is online" in the explanation, and add one item for 7 (a pilot or a target) or change the promise to "five modules".

**N-5** location: `01.05` to `08.05`, every `ChapterRecap` (now only in the eight Gate chapters); `server/scripts/import-course.ts` line 748 (`isFocusChapter` then `stripFocusChapterEnrichment`, which removes `ChapterRecap`). observation: Recaps were moved from the Learn chapters into the gates, but the importer strips `ChapterRecap` from every file ending in `-checklist.md`. If that code runs as written, the imported course has no recap anywhere. suggested fix: Confirm with `pnpm --dir server content:import --course cause-and-effect` and view a gate. If the recap is stripped, return a two line "if you remember one thing" sentence to each Learn chapter, or raise the importer question with the platform owner.

**N-6** location: gate provided cases `01.05` (Hana), `02.06` (front row), `03.06` (Haneen), `04.07` (Murad), `05.06` (Thaer), `06.06` (Salma), `07.06` (Huda). observation: Only the capstone has a mentor key. The gate rubrics are generic, so a mentor must decide for themselves what the intended cause is in each case (N-1 shows why this matters). suggested fix: Add a two line mentor key (intended direct or root cause, one ruled out cause) to each gate's `modelAnswer` or a mentor note, as was done for the capstone.

## What works (preserve)

- The Check chapters are now genuine application items: stated facts, a conclusion to choose, and each wrong option refuted by a numbered fact. Keep this form for any new item.
- The capstone rubric, pass rule, line 4 fallback, defence table and mentor key together let two mentors reach the same result. I rebuilt each case answer from the tables and they match.
- The 6.1 stock table (waiting and extra wait columns) now makes the stock lesson in 6.3 checkable from the data: weeks 19 and 20 ask for more than 36 and the pile still grows, week 21 is level.
- `08.05` review task with its own rubric closes the O8 gap, and the Young Coders Club case now includes the real tool failure (hidden entries, no count).
- 08.03 is well built: one habit per module, each distractor names the wrong habit and why it fails.

## Recommendation

**Revise** (narrow). No S1. One S2 (N-1, a single sentence in one gate case) and five S3. All round one S2 defects are closed. This is round two, so the revision loop allows one more targeted pass: fix N-1 to N-6, then re-review only `05.06`, `06.04`, `08.03`, `08.05` and the importer check. The course does not yet meet the agent-ip pass condition (zero S2, average 4.3 or above).

## Scorecard

| Dimension | Score | Note |
|---|---|---|
| Outcome alignment | 4 | Every outcome has evidence at its level; roadmap updated; O8 and O1 closed |
| Domain specificity | 4 | Everyday cases for these fellows; names now distinct |
| Depth over coverage | 4 | Worked numbers and failure modes; module 6 still widest |
| Chapter structure | 4 | Consistent; recaps may not survive import (N-5) |
| Interaction purpose | 4 | Predicts at decisions; evidence quizzes after |
| Assessment quality | 4 | Evidence items, rubrics with levels, capstone key; one faulty gate case (N-1), no keys for gate cases (N-6) |
| Difficulty calibration | 4 | Support fades, mixed review added, 110 minute capstone |
| Cognitive load | 4 | Heavy chapters mapped and lengthened |
| Prerequisite integrity | 4 | Order sound |
| Technical accuracy | 4 | Sums verified; three case or sum faults (N-1, N-2, N-3) |
| Continuity | 4 | Huda explained; two name reuses remain |
| Learner agency | 4 | Own problem or provided case throughout |
| Explanatory depth | 5 | Mechanism, worked example, trade-off and failure mode in every Learn chapter |
| Prose quality, production-grade coverage, security, accessibility, IP, variants, instructor alignment, canvas, visual explanation | not scored | Out of lens, not applicable, or no record supplied |

Average over the 13 scored dimensions: 4.08.

```yaml
---
artifact: scorecard
course: cause-and-effect
artifact_under_review: content/import/cause-and-effect/
version: 2
reviewer: critic-a
lens: pedagogy + assessment
---

dimensions:
  outcome_alignment: 4
  domain_specificity: 4
  depth_over_coverage: 4
  prose_quality: null
  chapter_structure: 4
  interaction_purpose: 4
  assessment_quality: 4
  difficulty_calibration: 4
  cognitive_load: 4
  prerequisite_integrity: 4
  technical_accuracy: 4
  production_grade_coverage: null
  security_integrity: null
  accessibility: null
  ip_protection: null
  variant_distinctiveness: null
  continuity: 4
  learner_agency: 4
  instructor_alignment: null
  interactive_canvas_quality: null
  explanatory_depth: 5
  visual_explanation_quality: null

scored_dimensions: 13
average: 4.08
blocking_defects: 1   # 0 S1, 1 S2
s3_defects_new: 5
s3_defects_open_partly: 4
recommendation: revise
```

```yaml
artifact: critique
course: cause-and-effect
artifact_under_review: content/import/cause-and-effect/
lens: pedagogy, assessment
round: 2
scorecard_average: 4.08
blocking_defects: 1
recommendation: revise
```
