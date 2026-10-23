---
artifact: critique
course: cause-and-effect
artifact_under_review: content/import/cause-and-effect/ (47 chapters, 8 modules, course.yaml) plus frontend/src/canvas/five-whys-chain/data.ts and frontend/src/canvas/laptop-charging-detective/data.ts
reviewer: critic-b
review_type: slop, continuity, factual accuracy against the dossier
version: 2
round: 2
---

# Critique B, round 2: Why Things Happen (cause-and-effect), G5

Blind re-review of the revised course. I re-read all 47 chapters, `course.yaml`, both canvas data files and the dossier. I did not read the writer pack, decision log or writer notes. The earlier critique is `critique-b.md`.

Mechanical checks repeated this round:

- Em and en dashes (U+2012 to U+2015, U+2212): zero in all chapters, `course.yaml` and both canvas files.
- Real company or product names: none. The Goldratt book title is gone ("in his 1984 book"). Real people named: Ohno, Ishikawa, Goldratt, Bastiat, Goodhart, Strathern, Campbell, all within the dossier's phrasings.
- War, politics, religion, the avoided stories (aircraft armour, cobra, bounty, flight school, monument): none.
- Stale cross references: none. 8.1 to 8.5 all point to the new numbering (8.3 quiz, 8.4 capstone, 8.5 gate). `course.yaml` lists the five module 8 files with matching titles. Summed `estimatedMinutes` is 1,130 (18.8 hours) and matches `estimatedHours: 19`.
- Every table sum was recomputed again, including the new 6.01 stock table (waiting orders and extra waits follow from the 36 a week oven), the 07.04 pilot table, the 08.04 case tables and the new fact-based quiz items. All agree except the item in N-S3-6.
- Sentence length: mean 12.4 words, 0.1 percent over 35 words (was 1 percent). Quiz stems are a separate matter (N-S3-3).
- ChapterRecap now appears in the 8 gate chapters and in no other chapter. BigWordAlert is in 14 chapters (was 21).
- `node agent-ip/scripts/audit-course.mjs content/import/cause-and-effect` reports 21 of 47 chapters as "needs work", now only with the flag "no interactive" on Learn chapters; prose depth, component counts and the quiz chapters no longer fail except where noted in the cross-lens note.

## Fix table

| ID | Round 1 defect | Status | Evidence |
|---|---|---|---|
| B-S2-1 | Huda's facts contradict across modules | fixed | One timeline. `01.01` "This story takes place last summer", "her son delivers the orders on foot". `06.01` "You met Huda in module 1, last summer", "This spring", "her son delivers them on his bicycle", sister renamed Wiam. Volume now reconciles: module 1 has about 30 birthday cakes a month, module 6 starts at 8 cakes a week. `08.04` case 1 "This autumn. Since the spring, Huda has had a second oven", which matches the second oven bought in `06.04` "Fix it in the right order". |
| B-S2-2 | Core cast names reused for different people | fixed | Samira is only Huda's neighbour (`01.01`); Amal's mother is Ruwaida (`04.01`, `04.04`, `04.05`). Rawan is only the marketing colleague (module 2). Yazan is only Amal's brother; Nour's brother is Faisal (`05.01`) and cousin Jamil (`05.03`). Khaled and Lina appear only in module 1. Mahmoud is only Amal's father. The cousin, friend and sister of Sami are named once (Suha, Ghassan, Dalia) and later reused explicitly as "Sami's cousin", "Sami's designer friend", "Sami's sister" (`04.03`, `04.05`, `04.06`), which is good continuity. Residual one-off collisions are in N-S3-1. |
| B-S2-3 | ChapterRecap in every chapter; BigWordAlert overused; definitions repeated | fixed | ChapterRecap only in `01.05`, `02.06`, `03.06`, `04.07`, `05.06`, `06.06`, `07.06`, `08.05`. BigWordAlert down to 14 chapters, and Key words tables no longer repeat the alert term in 01.01, 02.01, 05.01, 06.01, 07.01 and 08.01. Later chapters now point back ("the word at the top of this chapter", "from the key words in chapter 5.1"). Residual: "Fair test" (`03.01`) and "Root cause" (`04.01`) still appear in both the alert and the Key words table, and "Cause" (`01.01`) is a known word. Minor, see N-S3-4. |
| B-S2-4 | Prediction asked after the answer was given; duplicate with canvas | partly | Fixed in the page: `04.03` now has the prediction before the chain ("Amal's problem, stated exactly", then predict, then canvas, then "The chain in writing"). In `05.03` the page prediction now asks something different (which suspect to test last). Not fixed in the canvas: `five-whys-chain/data.ts` `tryThis[0]` still reads "Before step 6, predict what the root cause will be. Is it a person or a missing step?", which is the same question as the page prediction directly above it. |
| B-S2-5 | Impossible average order in 07.04 | fixed | `07.04` table now 95 before and 112 during the pilot, consistent with mugs at 80 to 150 shekels and "most customers bought one mug". |
| B-S3-1 | Unsupported superlatives | fixed | "most common mistake" and "most expensive mistake" removed. Remaining "best way" is the sourced `02.02` claim about random assignment. |
| B-S3-2 | Idioms and figurative words | fixed | "bend/bent" replaced by "shortcut" and "pushed to look good" (`07.03`). "first aid", "pay twice", "crown the trick", "put some people off", "invisible wall", "lands on your desk", "get the credit", "word of mouth" gone. "Rule of thumb" is now glossed at first use (`05.01` GlossaryTerm). New small issue in N-S3-4. |
| B-S3-3 | Long sentences | fixed | Eight sentences over 45 words in round 1; now three over 40 (`04.05` line 32 at 53 words, `02.04` line 14 quote, `05.02` line 104). |
| B-S3-4 | Repeated scenario types | partly | Printers, phone repair and the late online session are gone. The module 4 gate case is now Murad's fee records (`04.07`), no longer a copy of Ziad's chain. New clusters have appeared (N-S3-2). |
| B-S3-5 | Generic actors in quizzes | fixed | Every quiz stem now opens with a named person, a place and a number (checked all 80 items). |
| B-S3-6 | Further name reuse; near-identical names | partly | Hiba, Rasha, Yasmin, Ziad, Reem, Rana, Karim, Jana, Fadi, Salma, Tamer, Rami, Ahmad no longer repeat. Organisation names now differ: Hilltop Study Centre, Young Coders Club, Bridge to Work. Still open: "Samir" (`01.04`) next to Sami, and three new collisions (N-S3-1). |
| B-S3-7 | Numbers and details | fixed | `06.01` waiting and extra wait columns now follow from the pile (22 orders is "almost 4 days", matching `06.03`). `04.01` and the canvas say "late on 11 of the last 20 delivery days" with "one delivery round a day". `01.02` says "20 degrees Celsius". `04.05` now has a "1" misread as "4". |
| B-S3-8 | Seed Steps plot hole | fixed | `08.01` now says Wael "went straight to the form's settings page, where the entries themselves are not shown" and the box "did not say how many entries would go"; `08.02` timeline and causes carry it. |
| B-S3-9 | 05.03 charger test overreach; toothpick | fixed | `05.03` "almost certainly clears", "strong evidence, but not proof", plug condition stated, "without pushing hard", "If the dust had not come out easily, her next step would have been a repair shop"; canvas steps 4 and 5 agree. |
| B-S3-10 | "strong hint"; NGO example without caveat | fixed | `03.02` "So this result is a hint: run it again". `03.03` NGO example "20 fellows in each group is a small test ... So this is a hint". |
| B-S3-11 | Repeated assessment items; restating diagrams; tic phrases | partly | Stock arithmetic is now asked once (predict); the blame rewrite items differ. Diagrams in `01.04`, `03.04`, `05.03` now argue. Still open: the `02.01` diagram lists the explanations named in the paragraph just above; "honest" still appears 36 times in 20 chapters and "In this example" 29 times in 19 chapters (down from 41 and 47). |
| B-S3-12 | Predict answers always the cautious option | fixed | Several predictions now have an intuitive correct answer (`01.03` yes-real, `03.01` yes-more, `06.04` yes-more, `07.04` average-rises, `08.01` most-sign-up-again). Correct position 18 and 12 of 30. |
| B-S3-13 | Leftover option ids | fixed | `07.02` ids are `other-shops-copy` and `jawad-rushing`; `08.02` ids are `wael-should-check` and `task-list-old-date`. |
| B-S3-14 | 08.03 length; wide tables; 07.06 model answer | fixed | The capstone is now `08.04` at about 2,470 words, inside budget; the Lama table is 4 columns; the `07.06` model answer is Eyad's, not Huda's provided case. A new concern on the capstone model answer is N-S3-8. |
| B-S3-15 | Naming thinkers and the book title | fixed | `06.04` reads "introduced by Eliyahu Goldratt in his 1984 book" with no title. Names elsewhere match the dossier phrasings. |

Counts: fixed 16, partly 4, not fixed 0.

## New defects

### S1

None.

### S2

None. I looked for: a core cast name for two people (none left among Huda, Basel, Sami, Amal, Nour and their relatives), Huda's or Amal's facts against each other, canvas facts against chapters, claims beyond the dossier, stale chapter numbers, and unsafe device advice. All clear.

### S3

- id: N-S3-1
  location: `03.02-change-one-thing.md:"A second, quicker example"` and `04.06-quiz.md` Q5 (Layan); `03.06-checklist.md` and `04.06-quiz.md` Q3 (Mona); `04.05-causes-not-culprits.md` quiz Q2 and `04.07-checklist.md:"If you prefer not to use your own situation"` (Murad); `01.04-after-is-not-because.md` quiz Q1 (Samir)
  observation: The renames created three new collisions. Layan is a phone battery case (03.02) and a butcher's family (04.06). Mona sells bags (03.06) and volunteers at a school library (04.06). Murad is an NGO volunteer who sends a wrong invite (04.05) and then the keeper of a football club's fee records (04.07), in the same module. "Samir" in 01.04 is one letter from Sami, who anchors module 3.
  suggested fix: Rename the second use of each (for example a new name for the 04.06 butcher, the 04.06 librarian and the 04.07 fee keeper) and rename Samir.

- id: N-S3-2
  location: Water delivery rounds in `02.05`, `04.02`, `05.03`, `05.05`, `06.03`, `07.06`; tailors or alteration shops in `01.05`, `03.05`, `05.04`, `05.05`, `06.01`, `06.02`, `06.04`, `08.02`; bus offices or bus stations in `01.04`, `02.03`, `02.05`, `03.04`, `04.04`, `04.06`, `05.04`, `07.02`; pharmacies in `02.04`, `04.06`, `05.02`, `05.06`, `07.01`, `07.05`; clinics in six chapters
  observation: The printer, phone repair and late-session clusters from round 1 are gone, but the replacement cases cluster in the same way. Water delivery alone appears as a case in six chapters across five modules. The problems differ, but the setting is the same.
  suggested fix: Spread the repeats: keep at most two chapters per setting and swap the others for other everyday settings (a barber, a school bus, a bakery stall, a taxi).

- id: N-S3-3
  location: Quiz stems, for example `04.03-five-whys.md` quiz Q2 (100 words), `03.05-quiz.md` Q1 (91), `04.06-quiz.md` Q1 and Q2 (89 and 87), `02.05-quiz.md` Q5 (87)
  observation: The quizzes were rewritten into fact-based cases with numbered facts. This improves the items, but the mean stem is now 57 words (66 in the quiz chapters), 11 stems exceed 80 words, and several run over 90. On a phone in a second language that is a heavy read before the learner sees the options. Correct answers also cluster at option 2 (28 of 80 items, against 14 at option 4).
  suggested fix: Keep the facts but cut the story: remove the background sentence, name the place once, and keep each fact to one short line. Move some correct answers to the last position.

- id: N-S3-4
  location: `02.01-set-the-scene.md:"Moving together is a clue, not proof"` (line 32), `02.04` (line 22), `04.01` (line 56), `08.02` (line 93); also `03.01` and `04.01` Key words tables
  observation: Later chapters now refer to the alert as "the big word at the top of this chapter" or "the word at the top". "Big word" is itself an idiom, and the learner may not see the alert as the word meant. The alert term is also repeated in the Key words table in `03.01` (Fair test) and `04.01` (Root cause), and the root cause definition appears three times in `04.01`.
  suggested fix: Name the term ("correlation", "selection bias") and drop the pointer. Remove the alert term from the Key words tables in 03.01 and 04.01.

- id: N-S3-5
  location: `03.01-set-the-scene.md` predict block after "Other things changed too"; `01.03` predict (yes-real)
  observation: The 03.01 prediction has two defensible answers ("the photo and portfolio would be ruled out" and "the season could still explain the whole rise"), and the explanation starts "Your first thought is right", which is wrong for a learner who chose the other option. In `01.03` the wrong option ("what customers say cannot be trusted at all") is a straw man.
  suggested fix: Make the options exclusive (ask what Sami would know about the price, not about the rise) and start the explanation from the answer, not from "your first thought". Use a plausible wrong option in 01.03.

- id: N-S3-6
  location: `06-systems-and-feedback-loops/06.04-bottlenecks.md` quiz Q1 and Q2
  observation: Rima's shop has two sewing machines making 8 uniforms a day, so each makes about 4. Adding a third machine is said to raise sewing to 24 a day. One extra machine would give about 12, and 12 would still be the slowest step, so the key (20) would change. The same pattern was in the old print shop item.
  suggested fix: Change the numbers so the arithmetic holds, for example sewing at 8 with two machines and 16 with four, or state that the new machines are bigger.

- id: N-S3-7
  location: `05-solve-it-like-a-detective/05.02-describe-the-problem-exactly.md:"A second example: a warm fridge"`; `laptop-charging-detective/data.ts` step "List the possible causes"
  observation: (a) Majed's pharmacy fridge holds cold-chain medicines at 11 to 12 degrees for days; the example fixes the door and never says what happens to the medicines. A health-aware reader will ask. (b) The canvas still says "test the cheapest likely one first", while `05.03` now teaches "weigh likely against cheap, not cheapest first" and tests the unlikely socket first; the canvas reads as the rule the chapter warns about.
  suggested fix: (a) Add one sentence: medicines kept too warm are not sold until the supplier or a pharmacist says they are safe. (b) Change the canvas line to "weigh how likely each cause is against how cheap it is to check".

- id: N-S3-8
  location: `08-learning-from-what-went-wrong/08.04-capstone-investigate-a-problem.md`, openquestion `modelAnswer` ("Mentor key for the provided cases ...")
  observation: The `modelAnswer` field now holds a full answer key for all three provided cases (main cause, contributing cause, ruled out cause, accepted AI traps and the fair test). If this field is shown to learners after submission, it hands out the capstone solution; other gates keep the model answer to a different case.
  suggested fix: Confirm the field is mentor-only and not returned to the learner. If it cannot be hidden, move the key to the mentor guide and put a short answer for a different case in `modelAnswer`.

- id: N-S3-9
  location: `07-consequences/07.01-set-the-scene.md:"Why it went wrong"` (line 53) against `07.02` (lines 22 to 24) and `07.05` quiz Q1
  observation: Not introduced by this revision; I missed it in round 1. 07.01 calls students staying home "its second effect", although it is a direct reaction to the fine. 07.02 defines the first effect as what the decision does directly and a second effect as the effect of that effect, and 07.05 Q1 then keys "students leave after one coffee" (a direct reaction to turning off Wi-Fi) as a first effect. The labels do not agree.
  suggested fix: In 07.01 call it "a second branch" or "an effect nobody planned", and keep "second effect" for what comes after it ("students fall behind").

- id: N-S3-10
  location: `08-learning-from-what-went-wrong/08.03-quiz.md` Q4 (Emad)
  observation: The explanation says "The email and the laptop work", but the stem only says the laptop is on and online, which does not show that it forwards the bookings. The key (test the forwarding app) is still the middle-of-what-is-left answer, but a careful reader can defend "restart the laptop".
  suggested fix: Add the fact "the laptop shows the forwarded bookings in its outbox" or change the explanation to "the laptop is on and online, so the middle of the remaining steps is the app".

## What works

- The Huda timeline is now one story that also carries the numbers. Module 1 (about 30 birthday cakes a month last summer), module 6 (8 cakes a week this spring, the 36 cake plateau, the second oven) and the capstone case (this autumn, second oven, 50 weekend orders) agree, and the 6.01 table now obeys the stock rule taught in 6.03.
- Amal's family is consistent across eight chapters, and the revised numbers ("one round a day", "late on 11 of the last 20 delivery days", about 25 customers affected) now fit a bicycle round and match the canvas word for word.
- Reusing named people on purpose is good continuity: Nadine from module 3 returns in 4.4, and Suha, Ghassan and Dalia are introduced as Sami's circle and then used as such.
- Dossier fidelity stayed high through the rewrite. Goodhart, Strathern and Campbell are still handled exactly as the dossier asks; the five whys origin, Card's criticisms, the fishbone limits and the just culture limit are intact; regression to the mean still has no percentage; and "hint" is now used consistently for small tests.
- The prediction fixes are real: 04.03 now asks before it tells, and several predictions have an intuitive answer so they no longer teach "always pick the cautious one".
- The new fact-based quiz items (Anas, Kinda, Aseel, Bushra, Muath, Adnan's piles, Firas, Wedad) test the method on data rather than the paragraph above, and the keys follow from the facts.
- Recaps in gates, mentor rubric tables with pass rules, and the new mixed review in 8.3 give the module 8 sequence a clear path from review to capstone to final gate.
- Device safety is now handled with a stop rule and an honest limit, in both the chapter and the canvas.

## Scorecard

Scores are for the lenses I ran. "provisional" marks dimensions outside my lenses.

| Dimension | Score | Note |
|---|---|---|
| outcome_alignment | 4 | Chapter goals in `course.yaml` match chapters; new 8.3 and 8.5 fit the stated project goal. |
| domain_specificity | 4 | Cases are concrete; settings repeat (N-S3-2). |
| depth_over_coverage | 4 | |
| prose_quality | 4 | Superlatives, idioms and long sentences fixed; tic phrases and "big word" pointer remain (N-S3-4, B-S3-11). |
| chapter_structure | 4 | |
| interaction_purpose | 4 | Recap and alert pattern fixed; one canvas duplicate (B-S2-4) and two weak predictions (N-S3-5). |
| assessment_quality | 4 | provisional. Much better items; long stems (N-S3-3). |
| difficulty_calibration | 4 | provisional. |
| cognitive_load | 4 | provisional. Chapters about 1,300 to 1,700 words; quiz stems heavy (N-S3-3). |
| prerequisite_integrity | 5 | Terms are now defined before use ("rule of thumb" at first use, Key words tables, back references). |
| technical_accuracy | 4 | Dossier agreement excellent; N-S3-6 and N-S3-7 are small slips. |
| production_grade_coverage | n/a | Soft-skills course, no software capstone. |
| security_integrity | 4 | Device and safety advice now correct and conservative; mentor key location unconfirmed (N-S3-8). |
| accessibility | 4 | provisional. Tables are narrower; mermaid alt text not checked. |
| ip_protection | 4 | provisional. See N-S3-8. |
| variant_distinctiveness | n/a | No variants in this artifact. |
| continuity | 4 | Cast and Huda/Amal facts now consistent; residual one-off collisions and setting repeats. |
| learner_agency | 4 | provisional. |
| instructor_alignment | not scored | No confirmation record reviewed in this blind review. |
| interactive_canvas_quality | 4 | provisional, from `data.ts` only: both canvases agree with the chapters; two wording items (B-S2-4, N-S3-7). |
| explanatory_depth | 5 | Every teaching chapter has the mechanism, a worked example with checkable numbers, trade-offs, failure modes and limits. |
| visual_explanation_quality | 4 | provisional. Most diagrams argue; 02.01 still restates. |

Average over the 19 scored dimensions: 4.1. agent-ip passes only at every dimension 4 or above, average 4.3 or above, zero S1 and S2. Every dimension is now 4 or above and there are zero S1 and S2 defects, but the average is below 4.3, so the course does not pass yet.

## Recommendation

revise (light)

No S1 or S2 defects remain. The path to 4.3 is the S3 list: the remaining partial fixes (the canvas duplicate in B-S2-4, the repeated settings, the tic phrases) and the new items above. The most valuable edits are N-S3-1 (names), N-S3-3 (quiz stems), N-S3-6 (an arithmetic key), N-S3-8 (confirm the capstone key is mentor-only) and the one canvas line in B-S2-4. If those land, I would score interaction purpose, assessment quality, continuity and technical accuracy at 5 and expect the average to pass.

Cross-lens notes for the orchestrator (not filed as defects by me):

- The course audit now reports "no interactive" on Learn chapters whose assessments are fenced `quiz` and `predict` blocks rather than components. This looks like a detection issue; the technical validator should confirm.
- Instructor alignment and the canvas spec and QA report were not part of this blind review.

```yaml
---
artifact: scorecard
course: cause-and-effect
artifact_under_review: content/import/cause-and-effect/
version: 2
reviewer: critic-b
lens: slop, continuity, factual accuracy against the dossier
---

dimensions:
  outcome_alignment: 4
  domain_specificity: 4
  depth_over_coverage: 4
  prose_quality: 4
  chapter_structure: 4
  interaction_purpose: 4
  assessment_quality: 4            # provisional, outside my lenses
  difficulty_calibration: 4        # provisional
  cognitive_load: 4                # provisional
  prerequisite_integrity: 5
  technical_accuracy: 4
  production_grade_coverage: null  # not applicable, soft-skills course
  security_integrity: 4
  accessibility: 4                 # provisional
  ip_protection: 4                 # provisional
  variant_distinctiveness: null    # not applicable, no variants
  continuity: 4
  learner_agency: 4                # provisional
  instructor_alignment: null       # not scored, no confirmation record reviewed
  interactive_canvas_quality: 4    # provisional, from data.ts only
  explanatory_depth: 5
  visual_explanation_quality: 4    # provisional

average: 4.1                       # over 19 scored dimensions
blocking_defects: 0                # S1: 0, S2: 0
s1: 0
s2: 0
s3: 10                             # new this round; 4 earlier items are partly fixed
round_1_fix_status: { fixed: 16, partly: 4, not_fixed: 0 }
recommendation: revise
```
