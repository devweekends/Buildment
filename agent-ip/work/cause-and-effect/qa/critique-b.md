---
artifact: critique
course: cause-and-effect
artifact_under_review: content/import/cause-and-effect/ (46 chapters, 8 modules, course.yaml) plus frontend/src/canvas/five-whys-chain/data.ts and frontend/src/canvas/laptop-charging-detective/data.ts
reviewer: critic-b
review_type: slop, continuity, factual accuracy against the source dossier
version: 1
---

# Critique B: Why Things Happen (cause-and-effect), G5

Lenses: slop, continuity, factual accuracy against `agent-ip/work/cause-and-effect/research.md`. Review was blind: I did not read the writer pack, decision log or writer notes. I read all 46 chapters, `course.yaml`, both canvas data files and the dossier (every "Phrase it this way" note, the unverified table U1 to U16 and the source table).

What I checked mechanically, in addition to reading:

- Em and en dashes (U+2012 to U+2015, U+2212): zero in all 46 chapters, `course.yaml` and both canvas files.
- Real company or product names: none. Real people named: Ohno, Ishikawa, Goldratt, Strathern, Campbell, Goodhart, Bastiat, all as the dossier's phrasings allow. One real book title (see S3-15).
- War, politics, religion: none. Power cuts appear only as ordinary background (03.02, 08.02 quiz), and the weak-electricity guess in module 5 is a distractor that evidence rules out.
- The stories the dossier says to avoid (aircraft armour, cobra and rat bounty, flight school, monument lights): none appear.
- Every sum, table total and percentage in the worked cases was recomputed. All add up except the items listed in S2-5 and S3-7.
- Chapter titles and numbering match `course.yaml` for all 46 files. Summed `estimatedMinutes` is 1,070 (17.8 hours), consistent with `estimatedHours: 18`.
- Sentence length across the course: mean about 13 words, about 1 percent of sentences over 35 words. This is good for the audience.
- Quiz answer keys: correct position is spread (0:16, 1:24, 2:21, 3:14 of 75); the correct option is the longest in only 11 of 75. No option-length giveaway.

## Scorecard

Scores are for the lenses I ran. Dimensions marked "provisional" are outside my lenses and were scored only from what I saw while reading.

| Dimension | Score | Note |
|---|---|---|
| outcome_alignment | 4 | Chapter goals in `course.yaml` match what each chapter delivers. |
| domain_specificity | 4 | Cases are concrete and local (bakery, family shop, laptop). Quiz actors are often generic (S3-5). |
| depth_over_coverage | 4 | Eight modules, each with one worked case and a transfer case. |
| prose_quality | 4 | Plain, short sentences, no forbidden filler. Deductions: unsupported superlatives, figurative words, tic phrases (S3-1, S3-2, S3-11). |
| chapter_structure | 4 | Same sound skeleton in every chapter; slightly template-bound. |
| interaction_purpose | 3 | ChapterRecap in all 32 non-gate teaching chapters and none at a gate; BigWordAlert in 21 chapters; one prediction that asks for an answer already given (S2-3, S2-4). |
| assessment_quality | 4 | provisional. Good spread, plausible distractors. Predict answers follow a pattern (S3-12). |
| difficulty_calibration | 4 | provisional. |
| cognitive_load | 4 | provisional. One idea per chapter; 08.03 is heavy (S3-14). |
| prerequisite_integrity | 4 | "Rule of thumb" is used in 05.01 before it is defined in 05.03 (S3-2). |
| technical_accuracy | 4 | Excellent agreement with the dossier. Deductions: one impossible average (S2-5), small overreach in 05.03 (S3-9). |
| production_grade_coverage | n/a | Soft-skills course, no software capstone. |
| security_integrity | 4 | Device safety callouts are present and correct. Small note on the toothpick step (S3-9). |
| accessibility | 4 | provisional. Several 5 and 6 column tables on a phone (S3-14). Mermaid alt text not checked. |
| ip_protection | 4 | provisional. One model answer solves the provided case (S3-14). |
| variant_distinctiveness | n/a | No variants in this artifact. |
| continuity | 3 | Inside each module, numbers and facts are excellent. Across modules, Huda's facts and several cast names collide (S2-1, S2-2). |
| learner_agency | 4 | provisional. Provided cases are always offered as an alternative to the learner's own life. |
| instructor_alignment | not scored | No confirmation record was part of this blind review. |
| interactive_canvas_quality | 4 | provisional, from `data.ts` only: both canvases match the chapter text exactly (numbers, times, evidence, wrong ending). No spec or QA report was reviewed. |
| explanatory_depth | 4 | Prose carries the mechanism, a worked example, a failure mode and a limit in every teaching chapter. |
| visual_explanation_quality | 4 | provisional. Most diagrams argue (branches in 04.03, funnel in 02.04, loops in module 6). A few restate the steps above them (S3-11). |

Average over the 19 scored dimensions: 3.9. Threshold is 4.3 with no dimension at 3 or below. Both thresholds fail.

## Defects

### S1

None found. I looked specifically for: unsafe device or charger advice, a claim that contradicts the dossier or uses an avoided story, misattribution of the Goodhart/Strathern sentence, war, politics or religion, real brands, dashes, AI or tool attribution, and personal data. The dossier agreement is the strongest part of this course (see What works).

### S2

- id: B-S2-1
  location: `01-why-things-happen/01.01-set-the-scene.md:"Twenty missing orders"`; `06-systems-and-feedback-loops/06.01-set-the-scene.md:"Three good months"` and `06.03`, `06.04`; `08-learning-from-what-went-wrong/08.03-capstone-investigate-a-problem.md:"Provided case 1"`; `07-consequences/07.06-checklist.md:"If you prefer a provided case"`
  observation: The same Huda has incompatible facts. (1) Who delivers: 01.01 says "her son delivers in the neighbourhood after school"; 06.01 and 06.04 say "her cousin delivers them on a bicycle". (2) Who decorates: 06.01 says her sister Rawan decorates every cake; Rawan is already the marketing employee at the app company in 02.01 to 02.06 (about 20 mentions). (3) Volume: 01.01 gives a normal month of about 60 orders and about 30 birthday cakes a month; 06.01 and 06.02 have her at 8 cakes a week growing to 36 to 40 cakes a week (about 150 a month) with the plateau forced by an oven limit of 6 a day; 08.03 case 1 has 50 weekend orders in one week. (4) Timing: 01.01 is a summer month with schools out and a drop to 40 orders; 06.01 opens "This spring" with growth to week 20. (5) 07.06 and 08.03 tell the learner this is "the home bakery from modules 1 and 6", so the learner is told it is one business.
  why it matters: Huda is the first recurring case and the course teaches learners to check sums. A reader who compares 60 orders a month with 36 cakes a week finds that the story cannot be true. Second-language readers on phones will not know which version to trust. Capstone case 1 and the 07.06 gate case both depend on this setting.
  required fix: Fix one set of Huda facts and apply it to modules 1, 6, 7 and 8. Either rescale module 6 to module 1's size, or state explicitly that module 6 is a later, busier period and give the new volume. Name one deliverer. Rename the module 6 sister (or the module 2 marketing colleague). Re-check 07.06 and 08.03 case 1 against the chosen facts.

- id: B-S2-2
  location: core cast: `01.01`, `04.01`, `04.04`, `04.05` (Samira); `02.01` to `02.06` and `06.01`, `06.03`, `06.04` (Rawan); `04.04`, `04.05` and `05.01` (Yazan); `01.01` and `03.01` (Khaled); `01.01` to `01.04` and `03.02` (Lina); `04.01` to `04.05` and `06.06` (Mahmoud); `02.01`, `02.02` and `06.05` (Tariq); `03.01`, `06.02`, `07.04` (Dalia)
  observation: Names of the recurring cast are reused for different people. Samira is Huda's neighbour (01.01) and Amal's mother (04.01, 04.04, 04.05). Rawan is the marketing employee (module 2) and Huda's sister (module 6). Yazan is Amal's younger brother (04.04, 04.05) and Nour's brother (05.01). Khaled is Huda's brother (01.01, 01.04) and Sami's friend (03.01). "Lina's phone battery" in 03.02 has no marker, but Lina is Huda's daughter in module 1. Mahmoud is Amal's father (module 4) and a support inbox owner (06.06). Tariq is Basel's friend (02.01, 02.02) and a freelance editor (06.05). Dalia is Sami's sister (03.01), a new freelancer (06.02) and a team lead (07.04).
  why it matters: The dossier calls these five families the cast the course is built on. Fellows who read one module a day will meet "Samira" or "Yazan" in a new family and either think it is the same person or lose the thread. This is the exact confusion the continuity lens exists to catch.
  required fix: Give each person in the five recurring families (Huda, Basel, Sami, Amal, Nour and their relatives and colleagues) a name used nowhere else in the course. Rename the one-off people who currently share them. Keep a name list in the decision log so later edits do not reintroduce collisions.

- id: B-S2-3
  location: `ChapterRecap` in all 32 Read, Learn and Build chapters (for example `01.02` line 121, `04.03` line 133, `08.03` line 183) and in none of the 8 gate chapters; `BigWordAlert` in 21 chapters; "Root cause" defined in `04.01` (BigWordAlert line 10, body line 56, Key words table line 89, chapter summary and recap) and again in `04.02` (line 20)
  observation: The component pattern is inverted from the standard. `00-principles.md` and `03-authoring-standards.md` say ChapterRecap appears at a module gate, not after every chapter, and that BigWordAlert is reserved for a genuinely new, load-bearing term. Here every teaching chapter ends with a recap that restates the frontmatter summary and the "Next:" line, and no gate has one. BigWordAlert is on more than half of the teaching chapters, including words the learner already knows ("Cause" in 01.01, "Capstone" in 08.01, "System", "Troubleshooting"). Central terms are defined up to five times in two chapters (BigWordAlert, body, Key words table, GlossaryTerm, recap). Likewise "Cause" is defined in 01.01 (alert, table) and again in 01.02 (body).
  why it matters: This is the "duplicate summary of the same idea in the intro, body, recap, and next-step block" failure named in the anti-slop contract. On a phone with weak data it adds scroll and reading load with no new understanding, for readers who are reading in a second language.
  required fix: Remove ChapterRecap from the 32 teaching chapters and keep one per module at the gate (or none). Keep BigWordAlert only for the one load-bearing new term in each module (for example Root cause, Fair test, Feedback loop) and delete it where the term is already known. Keep each definition once in prose plus the Key words table in the set-the-scene chapter, and use GlossaryTerm for later uses.

- id: B-S2-4
  location: `04-root-causes/04.03-five-whys.md`, the `predict` block after "Worked example: Amal's five whys" (line 46), and the canvas "Try this" sentence (line 61); same canvas duplication in `05-solve-it-like-a-detective/05.03-guess-test-repeat.md` (predict at line 53 and canvas tryThis in `laptop-charging-detective/data.ts`)
  observation: In 04.03 the worked example lists all five whys, names the cut-off time and gives the fix before the learner reaches the prediction "Before you reach the last step of the chain, what kind of thing do you expect the root cause to be?". The explanation then repeats the answer. The canvas try-this asks the same prediction a second time ("Before step 6, predict what the root cause will be"). The learner is asked to predict something the page has already told them twice. In 05.03 the page prediction and the canvas try-this ask the same question about the phone test back to back.
  why it matters: An interaction that tests the paragraph above is a forbidden pattern, and in 04.03 it is on the chapter that carries the course's main canvas. It trains learners that predictions do not matter.
  required fix: In 04.03 move the prediction before the worked example (ask what kind of cause the chain will end at, then reveal it), or delete the page-level prediction and let the canvas try-this be the only prediction. In 05.03 keep one prediction, either the page block or the canvas try-this, not both.

- id: B-S2-5
  location: `07-consequences/07.04-side-effects.md:"Free delivery, and a pile of coasters"` (line 14) and the pilot table (lines 53 to 58)
  observation: The chapter says Yara's mugs cost 80 to 150 shekels and "Most customers bought one mug and nothing else", yet the table gives the average order before the offer as 70 shekels. An average of 70 is impossible when most orders are a single mug of at least 80. The after figure of 105 and the stop rule arithmetic (3 in 60 equals 5 in 100; 10 in 66 equals about 15 in 100) are correct.
  why it matters: The chapter teaches "decide what you will watch from the numbers", and the course trains learners to check sums. A wrong baseline in a worked table undermines the lesson and is the sort of slip a careful fellow will notice.
  required fix: Change the before average to a value consistent with the prices (for example 92 shekels before, and a larger rise after) and re-check that the 100 shekel free delivery threshold still produces the "add a coaster" behaviour the chapter describes.

### S3

- id: B-S3-1
  location: `03.03:"Where it goes wrong"` (line 88), `04.03:"One why, and a wrong answer"` (line 16) and "It stops at blame" (line 71), `05.01` (line 92), `05.02` (line 96), `06.03` (line 41), `07.02` (line 93), `07.03` (line 80), `04.04` (the "most important sentence")
  observation: Unsupported superlatives: "the most common mistake", "the most common way a search for causes goes wrong", "the most expensive mistake", "one of the most common mistakes", "the best way to spot a new trick early". None is sourced and the dossier does not support any of them.
  suggested fix: Replace with "a common mistake" or remove the ranking. Keep "the best way to reduce the risk of a hidden third factor" in 02.02, which the dossier supports.

- id: B-S3-2
  location: `07.03` (the verb "bend", "bent", "bending" about 13 times, first at line 54; also 07.05 option explanations); `04.02` line 69 "first aid"; `05.01` line 80 and `05.03` lines 28 to 34, 139 "rule of thumb"; `03.04` line 34 "crown the trick"; `06.01` lines 37, 49 and 73 "invisible wall" and "put some people off"; `01.01` line 61 "pay twice"; `08.04` line 75 "lands on your desk"; `03.03` and `03.05` "get the credit"; `06.02` "word of mouth"
  observation: Figurative or idiomatic English with no gloss. The most important is "bend a number" in 07.03, which carries the whole Goodhart and Campbell lesson ("Numbers used to make big decisions get bent", "the bending question"). "Rule of thumb" is used in 05.01 as a plain phrase and only defined in 05.03.
  suggested fix: Replace with plain words, or gloss once: "bent" becomes "pushed to look good without the work being good". Define "rule of thumb" at first use in 05.01. Replace "crown the trick", "put people off", "lands on your desk", "pay twice" with literal wording.

- id: B-S3-3
  location: `04.02` line 24 (59 words), `03.01` line 70 (59), `04.05` line 32 (57), `02.06` line 32 (56), `02.01` line 72 (54), `03.03` line 61 (50), `04.07` line 44 (47), `07.06` line 52 (46)
  observation: About 1 percent of sentences exceed 35 words, and eight exceed 45. Most are lists inside one sentence ("Under steps: ...; under people: ...").
  suggested fix: Split into one idea per sentence, as the standard asks (about 20 words).

- id: B-S3-4
  location: Online session or meeting that starts late: `01.02` quiz (Yasmin), `01.05` worked example (Ziad's study group), `04.04` quiz, `04.07` provided case (Laila). Printers and print shops: `04.02` quiz, `04.06` quiz, `05.02` (Majed and Hiba), `05.05` quiz, `06.04` quiz. Phone repair: `02.03`, `02.04` (Fadi), `03.05` (Ward), `07.02` (Hamza). Online English teacher: `01.02`, `04.07`, `07.05`, `03.06`, `08.03` model answer. Small online clothes shop: `03.04` (Yasmin), `05.02` (Rana), `05.04` (Rasha). Freelance designer: Sami, Jana, Dalia, Lubna, Lama, and Rasha's design team.
  observation: The same scenario types recur across modules. The worst case is the module 4 gate case (Laila: a new meeting link each session, found late in a busy chat) which is a near copy of the module 1 gate worked example (Ziad: a new link each week, sent between 8:05 and 8:15). A learner who remembers Ziad can write Laila's chain from memory.
  suggested fix: Vary the settings. Replace the Laila case with a different problem type (for example a repeated mistake in an invoice or a delivery step). Spread the repeated printer, phone repair and online English cases across other settings (a clinic desk, a school canteen, a bus ticket, a farm stall).

- id: B-S3-5
  location: Quiz actors: `02.05` ("A manager", "A teacher"), `03.05` ("A fictional study centre", "A small online shop", "A shop owner"), `04.03` ("A small team", "A study group"), `04.04` ("A training team", "a three-person freelance team"), `04.05` ("A three-person freelance team"), `04.06` ("A small online shop", "A tutoring team", "A study group"), `05.05` ("a small office"), `07.05` ("A small helpline", "A small writing team"), `08.02` ("A small design team", "a small print shop")
  observation: About 20 quiz items use a generic actor where a named person is possible. The teaching chapters themselves are specific; the quizzes drift to "a team" and "a shop".
  suggested fix: Give each quiz actor a name, a place and a number, as the teaching chapters do.

- id: B-S3-6
  location: Whole course
  observation: Further reuse of names for different people: Hiba (translator 02.05, shop owner 03.03, print shop worker 05.02, club leader 08.03), Rasha (soap seller 03.02, print shop 04.06, alterations 05.04, design lead 07.02), Yasmin (online teacher 01.02, banner test 03.04, spreadsheet 05.05), Ziad (01.05, 03.05, 05.04), Reem (copywriter 02.06, English group 03.06), Rana (01.03, 03.01, 05.02), Karim (01.02 quiz, Nour's cousin 05.03), Jana (02.04, 04.02), Fadi (02.04, 04.07), Salma (05.03, 06.06), Ahmad, Tamer, Rami, Mariam, Leila. Near-identical names: Samir (01.04) and Sami; organisations Bright Steps (07.01), Seed Steps (08.01), Next Step (03.03).
  suggested fix: After B-S2-2, give one-off people distinct names too, at least within the same module and in adjacent modules. Rename the three "Step" organisations.

- id: B-S3-7
  location: `06.01:"Three good months"` table; `04.01` and canvas `five-whys-chain/data.ts` ("11 of 20 deliveries"); `01.02` line 40; `04.05` line 14
  observation: (a) The 06.01 table's "Typical wait" column cannot come from its own numbers. Demand exceeds the 36 cake capacity by only 4, 2 and 0 cakes in weeks 16, 18 and 20 (a pile of roughly 10 cakes at most, under two days), but the table shows waits of 4 and 5 days. Chapter 06.03 then teaches that wait equals pile divided by 6 a day. (b) "11 of 20 deliveries in the last month" means about one delivery per working day, which does not fit a daily round with "bags", "later deliveries on the round" (04.02) and a packing job of one hour and a quarter. (c) "20 degrees hotter" in 01.02 has no unit. (d) In 04.05 the note "1 kg salt" is misread as "sugar"; the two words do not look alike in English.
  suggested fix: Rework the wait column to follow from the pile, or hide it. State the 20 as "the last 20 delivery days" or raise the count. Add "degrees Celsius". Use a pair of words that really look alike, or a smudged number.

- id: B-S3-8
  location: `08-learning-from-what-went-wrong/08.01-set-the-scene.md:"A week of sign-ups, gone"` (line 20) and the 08.02 timeline
  observation: Wael opens the live form on the 15th to "clear the six test entries". The form has held about 140 real sign-ups for a week and Nadia posted it publicly on the 8th. The text says he pressed "Delete all" because "as far as he knew, the form had not opened yet". The review never explains why he did not see the responses or the count.
  why it matters: A reader asks "why did he not see 140 entries?". Because the case is the model for causes in tools and information, the hole weakens the lesson that the screen made it easy to do.
  suggested fix: Add one fact to the timeline and the causes: the "Delete all responses" confirmation did not show a count, or he reached it from a settings page without opening the responses tab. Then list that as a tool cause in 08.02.

- id: B-S3-9
  location: `05-solve-it-like-a-detective/05.03-guess-test-repeat.md:"Step through Nour's search"` (lines 70 to 74) and `laptop-charging-detective/data.ts` steps 4 and 5
  observation: (a) The chapter says one test "ruled out everything before the laptop" because the laptop charger charges her phone. A phone draws much less power than a laptop, so this strongly suggests, but does not prove, that charger and cable can deliver full laptop power. (b) The test only works if the laptop charger has a phone-compatible plug; the chapter notes this for Nour but not as a condition for the reader. (c) A wooden toothpick in a charging port can bend contacts or pack dust deeper if pushed.
  suggested fix: Say "almost certainly rules out" or add one sentence of limit. State the plug condition. Add: "Do not push. If the dust does not come out easily, stop and take it to a repair shop."

- id: B-S3-10
  location: `03.02-change-one-thing.md` (line 73 "a strong hint", recap "A small test is a strong hint, not proof"); `03.03` NGO example (line 82)
  observation: The dossier phrase is "treat a win as a hint". The course uses "hint" in 03.03, 03.04, 03.05 and 07.04, but 03.02 upgrades it to "strong hint" on a three-week, 20 versus 21 enquiries result. The NGO example in 03.03 (12 of 20 versus 9 of 20) reports "about 3 extra fellows" with no caveat on a 20 per group test, although the surrounding rules ask for one.
  suggested fix: Use "hint" everywhere. Add one sentence to the NGO example that 20 per group is small.

- id: B-S3-11
  location: Repeated items: stock arithmetic in `06.03` predict, `06.03` quiz 1 and `06.05` quiz 2; bottleneck calculation in `06.04` quiz 1 and 2 and `06.05` quiz 4 and 5; "rewrite a blame sentence" in `04.05` quiz 2, `04.06` quiz 2 and `08.02` quiz 1. Diagrams that restate steps already in the paragraph above: `01.04` (the four questions), `02.01` (the four checks), `03.04` (the six plan steps), `05.03` (the test order). Tic phrases: "honest" or "honestly" (about 41 uses in 23 chapters), "In this example" (about 47), "Notice" (26), "Read it from the top" (10), "The takeaway is" (10)
  observation: The same question type is asked two or three times with new numbers, and some diagrams restate the preceding list. The voice is clear but follows one template in every chapter.
  suggested fix: Keep one version of each repeated item and replace the others with a different move (for example, ask for the next check instead of the calculation). Keep diagrams that argue, and cut or rework the four that restate. Vary the diagram introductions and drop most "honest" and "In this example" phrases. Label illustrative numbers once per chapter.

- id: B-S3-12
  location: The 30 `predict` blocks
  observation: In about 25 of 30 predictions the correct option is the cautious or counterintuitive one ("Maybe not", "No", "Only that they are possible", "Not much", "It stays near 36") and the wrong one is the naive reading. Learners can pass by always picking the sceptical option.
  suggested fix: Make a few predictions where the intuitive answer is right, or where two options are both plausible.

- id: B-S3-13
  location: `07-consequences/07.02-and-then-what.md` predict block (line 58, `id: ziad`, `correctOptionId: ziad`); `08-learning-from-what-went-wrong/08.02-blameless-reviews.md` predict block (line 63, `id: omar`)
  observation: Option ids come from another case: "ziad" is used for the answer about Tareq, "omar" for the answer about Wael. Not visible to learners, but easy to mix up in analytics and exports.
  suggested fix: Rename to meaningful ids (for example `tareq-rushing`, `wael-should-check`).

- id: B-S3-14
  location: `08.03-capstone-investigate-a-problem.md` (3,461 words, 159 sentences); case tables at lines 125 to 138 (6 columns); `07.06-checklist.md` model answer
  observation: 08.03 is well above the 2,500 word budget and holds a worked example plus three data cases on one page. The 6 column ratings table is hard to read at 375 px. In 07.06 the model answer solves the same provided case (Huda's discount) that the prompt offers, while the other gates use a different case for the model answer.
  suggested fix: Split the provided cases into their own pages or collapse them; narrow the ratings table. Replace the 07.06 model answer with one for a different case.

- id: B-S3-15
  location: `06.04-bottlenecks.md` line 22 ("his 1984 book *The Goal*"), `04.03` (Ohno), `04.04` (Ishikawa), `07.02` (Bastiat), `07.03` (Goodhart, Strathern, Campbell)
  observation: The dossier leaves open whether chapters may name thinkers (open question 10). The chapters name seven people and one real book title consistently with the dossier's "Phrase it this way" text, but the decision is not recorded as made. The book title is a product name the brief otherwise avoids.
  suggested fix: Record the instructor decision. If names stay, drop the book title; the five steps stand without it.

## What works

- Agreement with the dossier is very high and careful. The Goodhart sentence is handled exactly as asked: introduced as "a common way to say it", then explicitly "not Goodhart's own", with Strathern credited for the short wording, her exam grades example and Campbell given as a plain paraphrase, no quotation marks (07.03, with the same wording in the 07.03 recap). The five whys origin is told without the car maker's name and with Card's criticism carried faithfully (one chain, fifth why not always best, answer by looking, popularity is not proof). The Minoura "too basic" quote is absent. The fishbone is dated nowhere and always ends with "which two will you check". Blameless reviews carry the just culture limit. Regression to the mean uses the coin-at-a-cup idea and gives no percentage.
- No avoided story appears. Survivorship is taught with a survey that only reached the 100 users who stayed, and with talk speakers, never the aircraft story.
- The numbers inside each module are built to be checked: 02.02 averages, 02.04 funnel (92 plus 8 plus 300 equals 400), 03.04 banner test (9 to 4 early, 66 to 61 final, 4,200 visitors at 3 in 100), 04.04 fishbone tally (4 plus 2 plus 1 equals 7, 13 causes), 07.01 and 07.03 tables, and all three capstone cases. The Lama table matches the AI answer's 3.4 and 4.75 exactly and the data does rule out the app.
- The two canvases agree with the chapters to the minute and to the shekel. The five-whys canvas includes the wrong ending (the rider) the dossier asked for, and the laptop canvas keeps the safety limit.
- Safety is handled well: "Never open a laptop, a phone or a charger yourself" appears in 05.01, 05.03, 05.04 and the canvas, and every test is external.
- Hardship is background only and never a graded root cause. Provided cases are offered wherever the learner's own life is asked about.
- Plain English at sentence level: mean sentence length about 13 words, little jargon that is not glossed.

## Recommendation

revise

No S1 defects, so a rewrite is not needed. Five S2 defects block G5. Fix order: B-S2-1 and B-S2-2 together (one pass over names and Huda's facts), then B-S2-3 (remove the repeated recap and alert components, which also cuts reading load), then B-S2-4 and B-S2-5 (one chapter each). After those, the S3 list is mostly wording and can be done in one editing pass. Re-review the changed sections, 06.01 to 06.04, 07.04, 04.03, 05.03 and 08.01 to 08.03, plus a new name-collision scan.

Cross-lens notes for the orchestrator (not filed as defects by me):

- Running `node agent-ip/scripts/audit-course.mjs content/import/cause-and-effect` reports "Needs work: 38" of 46. Most are "no diagram" (the audit appears not to count the fenced mermaid diagrams, which are present in 32 chapters) and "prose 0<700" plus 5 interactions on the six quiz chapters. The technical validator should confirm whether this is a script detection issue or a real G5 failure.
- Instructor alignment and the canvas spec and QA report were not part of this blind review and are not scored.

```yaml
---
artifact: scorecard
course: cause-and-effect
artifact_under_review: content/import/cause-and-effect/
version: 1
reviewer: critic-b
lens: slop, continuity, factual accuracy against the dossier
---

dimensions:
  outcome_alignment: 4
  domain_specificity: 4
  depth_over_coverage: 4
  prose_quality: 4
  chapter_structure: 4
  interaction_purpose: 3
  assessment_quality: 4            # provisional, outside my lenses
  difficulty_calibration: 4        # provisional
  cognitive_load: 4                # provisional
  prerequisite_integrity: 4
  technical_accuracy: 4
  production_grade_coverage: null  # not applicable, soft-skills course
  security_integrity: 4
  accessibility: 4                 # provisional
  ip_protection: 4                 # provisional
  variant_distinctiveness: null    # not applicable, no variants
  continuity: 3
  learner_agency: 4                # provisional
  instructor_alignment: null       # not scored, no confirmation record reviewed
  interactive_canvas_quality: 4    # provisional, from data.ts only
  explanatory_depth: 4
  visual_explanation_quality: 4    # provisional

average: 3.9                       # over 19 scored dimensions
blocking_defects: 5                # S1: 0, S2: 5
s1: 0
s2: 5
s3: 15
recommendation: revise
```
