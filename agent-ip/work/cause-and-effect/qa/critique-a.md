---
artifact: critique
course: cause-and-effect
artifact_under_review: content/import/cause-and-effect/ (46 chapters, 8 modules, course.yaml)
reviewer: critic-a
review_type: pedagogy + assessment
version: 1
---

# Critique: Why Things Happen, G5, Critic A (pedagogy and assessment)

## Scope and method

Read blind: all 46 chapters, `course.yaml`, `curriculum-roadmap.md` (outcomes O1 to O8, gate evidence), and `research.md`. Did not read the writer pack, decision log or writer notes. Re-computed every sum and table in the chapters, re-derived the three provided capstone cases from their tables, and parsed all 75 `quiz` fences (keys, explanations, option lengths). Ran `audit-course.mjs`: it reports "no diagram" on all 46 chapters (it does not count Mermaid fences) and "prose 0<700" on the six Check chapters (by design), so I did not score from it.

Not reviewed: the two canvases (`five-whys-chain`, `laptop-charging-detective`; no spec or QA report in my brief), whether answer keys are stripped server side, accessibility, IP, diagram quality. Those dimensions are left unscored below for the other critics.

Arithmetic result: every sum and table in the chapters is correct. The three provided capstone cases are sound (details in S2-1).

## Scorecard

| Dimension | Score | Note |
|---|---|---|
| Outcome alignment | 3 | O8 assessed only by recognition; 1.3 and 1.4 serve no stated outcome; "direct cause" taught then dropped |
| Domain specificity | 4 | Everyday cases for these fellows; real numbers throughout |
| Depth over coverage | 4 | Worked numbers and failure modes; module 6 is the widest |
| Prose quality | not scored | Slop lens |
| Chapter structure | 4 | Hook, method, worked case, "where it goes wrong", check, recap, bridge, applied consistently |
| Interaction purpose | 4 | Predict-before-reveal at real decision points; quizzes after, not before |
| Assessment quality | 3 | Good explanations and clean keys; too many recall, duplicate and cue-leaking items; rubrics lack levels |
| Difficulty calibration | 3 | Support never fades; no cumulative retrieval; capstone jump and time |
| Cognitive load | 4 | One idea per chapter mostly; 2.3 and 6.3 carry three each |
| Prerequisite integrity | 4 | Order is sound; forward references are labelled as previews |
| Technical accuracy | 4 | Sums right; a few overstated inferences (S3-1, S3-5) |
| Production-grade coverage | not scored | Not applicable to a soft-skills course |
| Security and integrity | not scored | Key stripping not verified |
| Accessibility | not scored | Out of lens |
| IP protection | not scored | Out of lens |
| Variant distinctiveness | not scored | No variants in v1 |
| Continuity | 3 | Recycled names for different people; Huda's facts drift (S3-9) |
| Learner agency | 4 | Own problem or provided case at every gate; real choices in worked cases |
| Instructor alignment | not scored | Roadmap `instructors_reviewed: []`, confirmation table empty |
| Interactive canvas quality | not scored | No spec or QA report supplied |
| Explanatory depth | 4 | Prose carries mechanism, worked example, trade-off, failure mode |
| Visual explanation quality | not scored | Diagram review not in my lens |

Average over the 13 scored dimensions: 3.69.

## Defects

### S1

None.

### S2

**S2-1**
- location: `08-learning-from-what-went-wrong/08.03-capstone-investigate-a-problem.md:How your mentor will read it` and `:Your five-minute walk-through`; the same pattern in the "How your mentor will read it" paragraph of 01.05, 02.06, 03.06, 04.07, 05.06, 06.06, 07.06 and 08.04
- observation: The capstone rubric is a presence checklist per part. It has no performance levels, no pass rule across the five lines, no descriptor for "backed by evidence" or "strong", and no mentor key for the three provided cases. I derived the keys myself. Case 1: main cause is the oven seal (16 to 17 of the 22 lost orders), contributing is the new shop near the market (5 to 6; market requests fall 20 to 14, other areas stay at 29 to 30), ruled out is the price rise (other areas flat; market area flat in week 2). Case 2: main cause is the Wednesday move to 8 am (Wednesday 11 to 6; Sunday 11 to 11 although Nabil attended both), Nabil ruled out, mid-terms contributing. Case 3: main cause is the two-day rush jobs (average 2.5 against 4.83 for five-day jobs of other clients), contributing is the restaurant (both jobs rated 2), app ruled out (rush jobs average 2.5 on either app; clinic jobs score 5 on either). The data supports these. But nothing tells a mentor which trap name to accept for the AI answers (each fits "after is not because", "single cause" and "unfair comparison" in part). Rubric line 4 demands "a comparison", which is impossible for Case 1 (one oven repair) and strained for Case 2 (one group of 12). Line 3 demands evidence, which a mentor cannot check for a learner's own problem. The four defence questions have no criteria for a good answer. Only 07.06 states what happens after the mentor reads (one or two short questions).
- why it matters: Two mentors will give different outcomes on the same submission, and learners cannot see the bar. The roadmap promises "a five-line rubric, about 15 minutes". The assessment checklist requires inter-rater agreement and a follow-up step for every mentor-read answer.
- required fix: For the capstone and each gate, add three-level descriptors per line (Met, Partly, Not yet) with observable thresholds; state a pass rule (for example Parts 1, 3 and 4 Met, none Not yet); write a mentor-only key for each provided case with the accepted trap labels; add a rule for line 4 ("if no comparison is possible, say why and name the substitute: before and after with a repeat"); add criteria for each defence answer; state the follow-up step at every gate.

**S2-2**
- location: `08.01-set-the-scene.md:What Ruba did next / Why this matters at work`; `08.02-blameless-reviews.md:Check your understanding`; `08.03-capstone...md:The five parts`; `08.04-checklist.md:Course checklist`
- observation: O8 is "Run a short review without blame and write what will change", with evidence "Chapter 8.2; capstone". The learner never writes a review. 8.1 says "You will run that review on the Seed Steps case", but 8.2 runs it for them (timeline, impact, causes, owners and dates all supplied). The 8.2 quiz has two items: pick the no-blame wording, and spot deliberate harm. The capstone has no review part, and 8.4 has no box for it.
- why it matters: The outcome is at create level and is assessed at recognise level, with no production evidence at all. A fellow can finish the course without ever writing an action with an owner and a date.
- required fix: Add one `openquestion` to the 8.4 gate (the module gate is the allowed place): a 120 word review of a short incident (a second provided mini-incident or the learner's own) with timeline, impact, two causes in steps or tools, and two actions each with an owner and a date; add its criteria to the S2-1 rubric. Remove the promise in 8.1 or make it true.

**S2-3**
- location: `03-testing-a-cause/03.05-quiz.md` (Q1, Q3, Q4); `04-root-causes/04.06-quiz.md` (Q3, Q4) and `04.03` Q2; `05-solve-it-like-a-detective/05.04-split-the-problem-in-half.md` (Q2); `06.05-quiz.md` (Q2); `07.03-incentives-and-targets.md` (Q2); `02.05-quiz.md` (Q3, Q5); `05.03` Q2; `05.02` Q2; `04.06` Q1 and Q2
- observation: Many items measure the paragraph above or can be solved without the skill. Recall of the chapter's own wording: 05.04 Q2 (16 steps, answer 4) is the chapter's own predict and the sentence "With 16 steps... at most 4 tests"; 04.06 Q4's key is the sentence 4.4 calls "the most important one in this chapter"; 03.05 Q4's key is 3.4's measure verbatim ("completed orders for every 100 visitors") with 3.4's own "clicks" trap; 07.03 Q2's key is the chapter's own "bending question". Duplicates: 04.06 Q3 repeats 04.03 Q2 (confident guess, check first); 03.05 Q3 restates 3.4's Wednesday predict; 03.05 Q1 restates 3.2's Rasha item; 06.05 Q2 is the third copy of one stock template (6.3 predict, 6.3 Q1); 02.05 Q3 repeats 02.3's café item, and 02.05 Q5 reuses the Basel data already analysed in 2.1 and 2.2. Stem cues: 05.03 Q2 says "all at the same time"; 04.03 Q2 puts "Probably" in the stem; 05.02 Q2's key is the only option with facts; in 4.2 and 4.6 the key is the only option phrased as a missing step ("never asks", "never say") or the only non-person option, so 6 of 9 module 4 items are solvable by form.
- why it matters: Outcomes O2 to O7 are application outcomes. These items show a learner can match a slogan. A skimmer or guesser passes (red team 2, 3 and 14).
- required fix: In each Check chapter replace at least two items with evidence items: a small table or three to four stated facts, a question about which conclusion or next check the facts support, and distractors that each fail because of a different stated fact. Remove duplicates. Keep the key wording out of the stem and out of the chapter text. Keep the AI item but give it a case the learner has not analysed.

**S2-4**
- location: `08.03-capstone...md:Worked example: Jumana's returned uniforms, Part 3 and Part 4`
- observation: The worked example is the model learners copy, and it fails its own rubric line 3. The decisive figure is "17 of the 22 returned uniforms were for children whose height fell inside an overlap, or who had been measured in shoes". That lumps two causes into one count, so it cannot show that overlapping ranges are "the main cause" and the missing measuring line is "a contributing cause". The overlap itself (size 8 to 130 cm, size 10 from 128 cm) is only 2 cm wide, so it is implausible as the main driver of 17 returns. Part 4 also tests a bundled fix (no overlaps plus a measuring line), against the "one change" rule of 3.2.
- why it matters: Learners are told to rank causes by evidence, and the model shows a ranking the data does not license.
- required fix: Give separate counts (returns inside the overlap; returns measured in shoes; returns with neither) or drop the main/contributing claim to match the data; test one change or say the chart is tested as one unit and why.

**S2-5**
- location: `01-why-things-happen/01.02-chains-of-cause-and-effect.md:Huda's chain, step by step (Step 2) and the chain diagram`
- observation: The definition is "direct cause: the last link before the effect". Step 2 then says "the direct causes of the drop can now be counted: twelve school orders... seven regular orders... one new-customer order", and the diagram links "12 school orders lost" and "4 regular orders lost" to "20 orders missing". These are the parts of the effect (where the drop happened), not causes. The quiz (Yasmin) and the gate (Ziad, Hana) use the definition correctly.
- why it matters: This is the central worked example of O1. A learner who copies Step 2 will list pieces of the effect as "direct causes" in the gate log.
- required fix: Rename Step 2 "break the effect into parts" and keep the cause chain beneath each part; make the diagram nodes causes only, with the part counts as labels.

**S2-6**
- location: `08.04-checklist.md:Your cause-and-effect toolkit` ("Part of the skill is choosing which two or three lines fit"); gates `02.06` to `07.06`; `08.03`
- observation: Every quiz covers only its own module, and every gate hands the learner the method, a worked example and a provided case in the same shape (seven times). The first time the learner must choose a tool is the capstone, which also adds five integrated parts and a 250 word minimum. 8.4 names tool choice as "part of the skill" but nothing practises or assesses it.
- why it matters: Support does not fade and there is no spaced or mixed retrieval, so the capstone is the first test of the transfer the course promises.
- required fix: Add a mixed Check (five fresh short cases, each needing a different module's habit; ask which habit first and why) before the capstone, and update `course.yaml` and the roadmap totals. Reduce gates 6 and 7 from a full worked answer to a list of what a good answer contains.

### S3

**S3-1** location: `02.04:A second example` (Jana: "Quitting early was not the secret", 30 people); `03.02:What Sami found` ("strong hint", 20 against 21 enquiries); `03.03:Reading the result` (the one-reply difference between 4 of 20 and 5 of 19 is used as proof that "part of that rise would have happened anyway") and `:A second example` ("the workshop's effect... is about 3 extra fellows", 12 against 9, no hint caveat); `03.05` Q2 key wording ("raised spending by about 15"). observation: Small gaps are stated as findings, against the course's own rule that a small test is a hint. suggested fix: End each with the module 3 sentence ("a hint, run it again") and drop "strong".

**S3-2** location: `02.04-survivors-and-selection.md:Check your understanding` (Fadi). observation: 15 complaints from 300 repairs is 5 percent, so "most customers are unhappy" is unsupported on the arithmetic alone, and the key explanation calls it "a real problem worth fixing". The item measures selection but the case gives a simpler reason to reject the conclusion. suggested fix: Use a case where the complaint share is large or the stem gives no usable share.

**S3-3** location: `06.05-quiz.md` Q3 (Leila). observation: With a two-week delay, the week 1 advert lands in week 3 and the week 2 adverts land in week 4, so "four adverts landing at the same time" is inexact. suggested fix: Put all four adverts in week 2, or reword the explanation.

**S3-4** location: `05.03-guess-test-repeat.md:Nour's first test`. observation: The rule of thumb is "weigh how likely and how cheap". The table rates all three live suspects "Possible", so the order is set by cost alone and the trade-off is never exercised. suggested fix: Give one suspect that is likely but costly and one that is cheap but unlikely, and show the choice.

**S3-5** location: `05.03:Step through Nour's search` and `05.04:The idea`. observation: A phone charging from the laptop charger is said to have "cleared" socket, charger and cable. A phone draws far less power than a laptop, so this is strong evidence, not proof. suggested fix: One sentence of caution, consistent with "confirm with a test".

**S3-6** location: `08.01:A week of sign-ups, gone` and `08.02:Worked example`. observation: Wael is back online on the 8th, sign-ups "poured in all week", yet on the 15th he presses "Delete all" believing the form has not opened. The review never asks what he saw on screen (about 140 responses, not 6) or why the confirm box did not state the count, though Ruba asks him exactly that. suggested fix: State what he saw and add "the confirmation did not show how many entries would go" to the tool branch.

**S3-7** location: `04.03:Worked example`, `04.05:Test it`, `07.04:Step 5`. observation: Fixes are checked by comparing with the month or two weeks before, picked after a bad period. 4.03 calls this "a test... just as module 3 taught", but module 3 and 2.3 teach a comparison group and warn about the drift back to normal. suggested fix: Add one sentence naming the weakness and a cheap strengthening (repeat, or alternate weeks).

**S3-8** location: `06.02:The same loop in reverse` against `06.01:Then it stopped` and `06.03:A loop that pulls back`. observation: The data show demand settling at 36 with five-day waits; 6.2 then imagines the same waits driving orders down to 11. The two accounts are never reconciled. suggested fix: Say what extra push (late cakes missing birthdays) would make the reinforcing loop win.

**S3-9** location: names across modules; `01.01` and `06.01` and `08.03` (Huda). observation: One name serves several people: Rasha is four different people (3.2, 4.6, 5.4, 7.2), Hiba three, Rana three, Ziad three; Khaled, Rawan, Yazan, Lina, Mahmoud and Samira each switch role. Huda's bakery shifts: her son delivers in M1, her cousin in M6; 60 orders a month in M1, 36 cakes a week in M6, 50 weekend requests in capstone Case 1. suggested fix: Rename the later uses; add one line saying the bakery grew.

**S3-10** location: all quiz fences. observation: In the 71 text-option items the correct option is the longest once, the shortest 26 times and below the wrong-option average 53 times. The gaps are a few characters, so the audit warning is quiet, but length now points away from the key. suggested fix: Randomise length within a few characters either way.

**S3-11** location: `01.02` Q1 option 3; `03.05` Q5 options B and C; `05.03` Q2 option D; `05.05` Q4 (the AI says the priciest part is the likeliest) and option C. observation: Several distractors and one AI answer are strawmen no learner would choose or believe, so the item reduces to three or two options. suggested fix: Write each wrong option as a mistake a learner of this course would really make, and make the AI answer sound reasonable.

**S3-12** location: `01.05-checklist.md:Learning log / Your cause chain`. observation: Gate 1 has no `openquestion`, no length floor and no model answer; the chain is a free-text learning log answer. Gates 2 to 7 have all three. 8.4 asks the learner to reopen this chain. suggested fix: Make the chain an `openquestion` with a floor and a model answer.

**S3-13** location: `08.03:Plan for about 75 minutes`. observation: About 1,900 words of prose plus three data tables and three AI answers to read, a table analysis and 250 or more words of second-language writing is realistically 100 to 120 minutes. Case 3 is six columns by twelve rows on a phone. suggested fix: Set the estimate to about 110 minutes and give Case 3 four columns.

**S3-14** location: `08.03:Provided case 1, 2, 3`. observation: Only three provided cases serve a whole cohort, and the answers are short and shareable. suggested fix: Add two more cases or have mentors assign a case by learner number; keep the five-minute walk-through as the check.

**S3-15** location: `02.05-quiz.md`. observation: O2 names chance, but none of the five items tests small numbers or luck. suggested fix: Replace one third-factor item with a small-numbers item.

**S3-16** location: `07.02:The idea`, `07.05` Q1 and Q4. observation: The chapter defines the first effect as the one you aimed for and the second as reactions, but Hamza's "more customers" is also a reaction, and in Q1 option B ("people leave sooner") is a reaction too. Q4's key says "new things get a short burst", where the dossier says short tests mislead in both directions. suggested fix: Define the orders by chain position ("the effect of the effect"); reword Q4.

**S3-17** location: `02.03` and `06.03`. observation: Each carries three hard ideas in 25 minutes (reverse cause, chance and regression; stocks, balancing loops and delay). suggested fix: Raise `estimatedMinutes` to 30 and open each with a one line map of the three ideas.

**S3-18** location: `curriculum-roadmap.md:Outcomes`; `01.03`, `01.04`. observation: O1 covers chains and direct against contributing causes. Listing causes and sizing them (1.3) and "after is not because" (1.4) have no outcome, yet are assessed in the gate and the quizzes. suggested fix: Add them to O1 or O2.

## What works

- Every number reconciles and the chapters teach the habit of checking the sum (1.2, 1.3, 2.2, 2.4, 3.4, 6.2, 7.1, 8.3).
- Each chapter has a "where it goes wrong" section that names the over-correction (for example "correlation never means cause", the deepest why is not always the best place to fix). Keep this.
- Quiz explanations name the misconception behind every option, and the key is marked "Right." with no mismatch in any of the 75 items.
- Module 3 is the strongest: tangle, one change, comparison, plan. Sami's price result and Yasmin's 9 to 4 start that ends 66 to 61 teach the stopping rule better than any statement of it.
- The three capstone cases have AI answers whose numbers are true and whose reasoning fails, and each case has a data-supported main cause, contributing cause and ruled-out cause. That is a hard thing to build and it works.
- Hana's phone (1.5 to 8.4) and Huda's bakery (1, 6, 7, 8) give real spaced retrieval threads.
- Honest limits are taught: the five whys criticism, half-splitting limits, strong against weak fixes, the just culture line. The dossier's attributions (Strathern wording, no cobra or armour stories) are respected.

## Recommendation

**Revise.** No S1. Six S2 defects: rubrics that two mentors cannot apply the same way, no production evidence for O8, recall and duplicate quiz items, a capstone worked example whose evidence does not license its ranking, the "direct cause" muddle in 1.2, and no fading or cumulative retrieval. Eighteen S3 defects. Re-review the changed sections plus 08.03, 08.04 and the Check chapters.

## Scorecard

```yaml
---
artifact: scorecard
course: cause-and-effect
artifact_under_review: content/import/cause-and-effect/
version: 1
reviewer: critic-a
lens: pedagogy + assessment
---

dimensions:
  outcome_alignment: 3
  domain_specificity: 4
  depth_over_coverage: 4
  prose_quality: null            # slop lens, not scored here
  chapter_structure: 4
  interaction_purpose: 4
  assessment_quality: 3
  difficulty_calibration: 3
  cognitive_load: 4
  prerequisite_integrity: 4
  technical_accuracy: 4
  production_grade_coverage: null  # not applicable
  security_integrity: null         # key stripping not verified
  accessibility: null              # out of lens
  ip_protection: null              # out of lens
  variant_distinctiveness: null    # no variants in v1
  continuity: 3
  learner_agency: 4
  instructor_alignment: null       # no confirmation record
  interactive_canvas_quality: null # no spec or QA report supplied
  explanatory_depth: 4
  visual_explanation_quality: null # diagram review not in this lens

scored_dimensions: 13
average: 3.69
blocking_defects: 6   # 0 S1, 6 S2
s3_defects: 18
recommendation: revise
```

```yaml
artifact: critique
course: cause-and-effect
artifact_under_review: content/import/cause-and-effect/
lens: pedagogy, assessment
scorecard_average: 3.69
blocking_defects: 6
recommendation: revise
```
