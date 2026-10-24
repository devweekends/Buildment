---
artifact: critique
course: building-habits
artifact_under_review: content/import/building-habits/ (course.yaml, all 40 chapters) plus the 19 embedded canvases in frontend/src/canvas/<slug>/data.ts
reviewer: critic-b
review_type: slop + continuity + accuracy + care
version: 1
---

# Critique B: Building Habits That Last (slop, continuity, accuracy against the dossier, care, IP)

Scope and method. I read all 40 chapter files and course.yaml in full, the 19 canvas data files, the brief, the research dossier (findings, Credits, Unverified table, What not to teach), and the quality bar. I did not read context packs, the decision log, the run log or earlier QA. I ran scripts for dashes, slop words, links, brand names, quiz option lengths and positions, sentence length, and every count in the cases. I recounted by hand all numbers in the Nada, Samir, Yousef, Fares, Ziad, Rasha, Dina, Khaled and Maha cases.

Hard-rule results (all clean):
- Zero em dashes (U+2014) and zero en dashes (U+2013) in the 40 chapters, course.yaml and the 19 canvas files. The only non-ASCII characters are curly quotes and one multiplication sign (U+00D7) in 02.04 (see S4).
- No links, no company, product, app or brand names ("AI chat tool" and "video app" stay generic), no politics or war, no AI attribution, no placeholder text.
- Slop words: none. "unlock" appears only as a literal door. No "delve", "landscape", "journey", "game-changer", "It is important to note", "In today's world" or "key takeaways".
- Unverified table (U1 to U18): none used as fact. 21 days is taught as a myth with the surgery origin and no quotation. No dopamine, no ego-depletion theory beyond the plain story, no voter study, no 1 percent maths, no food studies, no effect sizes, no nudge numbers, no "deep work".
- Quiz mechanics: 68 questions. The correct option is never the longest (strictly longest 0 times; tied for longest 5 times). Correct positions are spread: A 13, B 18, C 22, D 15. Mean sentence length is 13.9 words (median 12).

## Scorecard

| Dimension | Score | Note |
|---|---|---|
| 1. Outcome alignment | 5 | All seven brief outcomes have evidence: gates 1 to 6 assess outcomes 1 to 6, the capstone assesses 7. Every chapter serves one of them. |
| 2. Domain specificity | 4 | Cases carry real numbers and fixed points (power hours, Fajr, bus, shop). Held back by recycled trades and near-duplicate cases (S3-18, S3-19). |
| 3. Depth over coverage | 4 | One idea per chapter and a tight spine. Honest labels on weak evidence. |
| 4. Prose quality | 4 | Calm, specific, slop-free, hedged exactly as the dossier asks. Long sentences cluster in gates, canvas copy and one care sentence (S3-25). Templated rhythm (S3-20). |
| 5. Chapter structure | 4 | Hook, concept, example, decision, verify, bridge are all present. The identical skeleton in all 19 Learn chapters is a template signal (S3-20). |
| 6. Interaction purpose | 4 | Every Learn chapter has a canvas, a predict and two quizzes, within budget. About 9 of 24 predicts only echo the paragraph above (S3-21), and two Read chapters carry an open question (S2-3, S3-22). |
| 7. Assessment quality | 4 | Keys follow from taught rules or arithmetic and positions are balanced. The correct option is the shortest or second shortest in 59 percent of items, which is a reverse tell (S3-23). Stems are long (S3-24). Two keys depend on conflicting facts (S2-2). |
| 8. Difficulty calibration | not scored: other lens | |
| 9. Cognitive load | 3 | One idea per chapter, but about 43 named people with similar names, quiz stems averaging 61 words, and 2,300 to 2,600 words per Learn chapter on a phone (S3-18, S3-24, S3-28). |
| 10. Prerequisite integrity | 4 | Backup and smallest versions are used in 2.5 before 3.4 formalises them, but 2.2 already teaches the idea. Tracking is requested in gate 2 with self-contained instructions. |
| 11. Technical accuracy (research claims) | 3 | Names, credits, numbers and "phrase it this way" lines match the dossier closely. A single-miss finding is stretched to 2 to 5 missed days in teaching and in graded explanations (S2-1), the final toolkit overstates the event-versus-clock rule (S2-4), and several small unsourced assertions remain (S3-1 to S3-5). |
| 12. Production-grade coverage | not scored: not applicable (no software product) | |
| 13. Security and integrity | not scored: other lens | Answer keys and mentor keys sit in the source files; the validator should confirm they are server-side only at runtime. |
| 14. Accessibility | not scored: other lens | |
| 15. IP protection | 4 | No copied wording and no book framework presented as the course's own. Credits follow the dossier. Two uncredited echoes: "environment design" and the "2 minutes" smallest version (S3-8). |
| 16. Variant distinctiveness | not scored: not applicable | |
| 17. Continuity | 3 | Nada, Samir, Fares, Ziad, Rasha, Khaled, Dina and Maha counts recount correctly, with exceptions (S3-13). One recurring person has conflicting facts across two graded keys (S2-2), plus about ten smaller conflicts (S3-11 to S3-19). |
| 18. Learner agency and curiosity | 4 | Own habit or provided case everywhere, no forced disclosure, a real 30-day decision. |
| 19. Instructor alignment | not scored: no roadmap confirmation record supplied to this review | |
| 20. Interactive canvas quality | 4 | Text and numbers only: all 19 data files agree with their chapters on names, times and counts. Two chapter or canvas sentences misdescribe the model (S3-11, S3-12). Model correctness and keyboard behaviour not tested here. |
| 21. Explanatory depth | not scored: other lens | |
| 22. Visual explanation quality | not scored: other lens | |

Average of the 14 dimensions scored: 54 / 14 = 3.86. Dimensions at 3: cognitive load, technical accuracy, continuity. Threshold (every dimension at least 4, average at least 4.3, zero S1 and S2) is not met.

## Defects

### S1

None. Nothing is unsafe, wrong in a way that harms a learner, or leaks IP. The research claims are, with the exceptions below, faithful to the dossier.

### S2

**S2-1. A one-miss finding is stretched to gaps of 2 to 5 missed days, in teaching and in graded explanations.**
- location: 05-tracking-and-restarting/05.01-set-the-scene.md line 43; 05.03-missed-days.md line 98; 05.05-quiz.md Q1 correct explanation (line 21); 07-your-30-day-plan/07.03-quiz.md Q4 correct explanation (line 69). Also the predict explanation at 05.01 line 36.
  observation:
  - 05.01: "He believed the five misses wiped out the 23 days. They did not. Module 1 showed that habits grow fastest in the first weeks and that one missed day did not undo progress in the research."
  - 05.03: "Habits do not work that way: the progress from 23 days is still there."
  - 05.05: "One missed day did not undo progress in the research, and two days in a row is a short gap. The habit from 40 days is still there."
  - 07.03: "Twelve sessions in a row are not erased by 3 missed days."
  why it matters: Dossier finding 2 and S6: the Lally study tested one missed opportunity and "does not test longer breaks". The dossier's own phrase is "Missing one day did not undo the progress in this study. What matters is getting back to it", and it says to avoid "missing days never matters". The same dossier cites the gym data (a longer gap makes the next visit less likely) and says many misses lowered the plateau. The chapters elsewhere teach this correctly (1.4, 5.3 opening), so these sentences contradict the course's own careful line, and they sit in graded explanations that learners will quote.
  required fix: Say only what was tested: one missed day. For 2 to 5 days, give the course's reasoning and label it as advice: "Five missed days is a longer gap, and a longer gap makes the next start harder. The 23 evenings of practice are not zero, and the way to protect them is to restart at the next cue." Remove "is a short gap", "is still there" and "not erased" as research statements. Keep the keys; reword their explanations.

**S2-2. Tamer has two incompatible sets of facts in two graded keys.**
- location: 03-your-surroundings/03.02-context-cues.md Q1 (line 113) and 03.05-quiz.md Q1 (line 12, explanation line 22).
  observation:
  - 03.02: "Tamer drives a water delivery round. ... His round always ends at 14:00 at the depot, where he parks, then eats lunch in the cab with two other drivers, then drives home and lies down." The key is "Stretch beside the truck as soon as he parks at 14:00".
  - 03.05: "his round ends between 13:00 and 16:00; before driving home he always counts the cash in the cab; he goes to the mosque for the evening prayer on most days". The key rejects "At 14:00 each day" because "His round ends at different times".
  why it matters: Same named man, one chapter says his round always ends at 14:00, the next says it varies from 13:00 to 16:00, and the second key depends on the variation. A learner who remembers 3.2 will find the 3.5 reasoning wrong.
  required fix: Give Tamer one set of facts, or rename the 3.5 person. Keep the habits different (stretching, notebook, game at lunch in 04.05) if wanted, but fix the round times and the lunch place.

**S2-3. Module 6 scene-setter carries a required open question that tests the paragraph above, with a prompt and model answer that disagree.**
- location: 06-habits-for-your-life/06.01-set-the-scene.md lines 106 to 114.
  observation: After the section "Why five at once faded" has already explained the reasons, the chapter says "Before you read on, think about Dina's card for a moment." The `openquestion` is `required: true` and asks "Name two reasons, using facts from her story." The modelAnswer lists three reasons ("A third possible reason...").
  why it matters: 03-authoring-standards, Component budget: an open question belongs at a module gate only. Anti-slop checklist: "A quiz that tests the paragraph above" and "An open question used as a generic reflection". "Before you read on" is false because the answer is above. A required answer in a Read chapter also blocks progress on recall.
  required fix: Remove the question, or move the "think about her card" prompt before the "Why five at once faded" section, make it optional, and align the prompt (two reasons) with the model answer.

**S2-4. The final toolkit states as a rule what chapter 6.4 and the dossier say research has not shown.**
- location: 07-your-30-day-plan/07.05-checklist.md line 45 (toolkit row "Daily rhythm"); related key at 07.03-quiz.md Q5.
  observation: "Tie habits to events in your day, such as meals and prayer times, not to clock times." Chapter 6.4 line 26 says "Research has not shown that event cues work better than clock cues in general ... A clock time is fine if you check it when the season changes." The same chapter lists a work shift at 8:30 and a school bell at 13:30 as good fixed points.
  why it matters: Dossier findings 6 and 17 and S7: time-based and routine-based cues did not differ in the studies that compared them. The toolkit is the page learners are told to copy and keep ("Copy the table somewhere you will see it"), so the overstated version is the one that survives. It also drops the course's own caveat.
  required fix: "Put habits on fixed points of your day (a meal, a prayer time, a shift). If you use a clock time, check it when the season or your hours change."

### S3

Accuracy and credits

**S3-1. Unsupported superlative and absolute in module 4.**
- location: 04-breaking-a-habit/04.04-remove-the-cue.md lines 30 and 24.
  observation: "Removing a cue is something you do in advance, and it is one of the strongest tools for unwanted habits." and "Noticing turns an automatic pull into something you can see, and what you can see, you can stop."
  why: Anti-slop: unsupported superlative. Dossier S25: stimulus control helped with temptations but not strong habits, and monitoring works by raising control, not by weakening the habit. The very next paragraph says avoiding the situation did not help strong habits. The canvas limits say "some urges will win before they are noticed", which contradicts "you can stop".
  fix: "Changing or avoiding cues in advance reduces the pull of old habits." and "Noticing gives you control in the moment."

**S3-2. Two unsourced causal claims in the module 4 opening.**
- location: 04.01-set-the-scene.md line 61 and line 55.
  observation: "The link between a cue and a routine stays in memory, even after years." and "A tired morning even makes the next night more likely, because a tired person reaches for the easiest way to switch off."
  why: "Even after years" is not in the dossier (S1 says old traces are not replaced, not for how long). The tired-morning claim is a causal statement with no source; S1 only supports "everyone falls back on habits when low on energy" (Neal 2013).
  fix: Drop "even after years". Rephrase the second as the sourced point: "When people are tired they fall back on habits."

**S3-3. A key explanation says the large tests rejected a "willpower muscle" that they did not test.**
- location: 04-breaking-a-habit/04.05-quiz.md Q1 first explanation (line 20).
  observation: "the large tests did not support the simple 'willpower muscle' story."
  why: The AI answer says "Each time you resist, your willpower grows stronger, like a muscle." S22 and S23 tested depletion (does self-control run down), not strengthening with practice. Dossier: say "the large tests did not find it", never "proven false"; and the practice claim is a different claim.
  fix: Rest the key on the sourced point (disciplined people face fewer temptations and rely on habits) and drop the sentence about the large tests here.

**S3-4. Unsourced study-habit assertions stated as fact.**
- location: 06-habits-for-your-life/06.03-study-and-focused-work.md lines 97 and 107; 06.05-quiz.md Q5 explanation (line 84).
  observation: "Focus usually arrives a few minutes after you start, not before." (repeated in 06.05: "Focus usually comes a few minutes after starting, not before.") and "Two hours sounds serious and rarely survives a week with a job and a family." Also "Hard does not mean the block is going badly. It means she is learning." (line 71).
  why: No dossier source. Finding 17 gives only: a habit helps with starting, and study stays effortful.
  fix: Label as the course's advice ("In our experience", "Many people find") or cut. Do not use the focus claim inside a graded explanation.

**S3-5. Course reasoning and arbitrary thresholds are not labelled as such.**
- location: 03.02-context-cues.md line 24; 05.03-missed-days.md line 74; 02.02-start-small.md Step 6 (line 73) and its diagram (line 85).
  observation:
  - 03.02: "You can change one early link, and the rest of the chain changes with it, because the later cues never appear."
  - 05.03: "Five days in a row is long enough to make restarting hard."
  - 02.02: "When three sentences have felt easy every day for about two weeks, she can grow the habit a little", and the diagram question "Easy every day for two weeks?"
  why: Dossier "Rules of thumb with weak evidence" and the numbers-hedging rule. No source sets a five-day threshold, a two-week growth rule, or tests the chain idea. Compare 04.03 and 06.04, which label their reasoning well.
  fix: Add "this is the course's advice, not a research finding" once per claim, or present the number as Lina's example only.

**S3-6. The cue list is attributed to Wood, but the dossier credits her with three kinds.**
- location: 03.02-context-cues.md line 20.
  observation: "Psychologists who study habits, such as Wendy Wood, list four kinds that come up again and again. A cue can be a place ... a time ... other people ... or the action you just finished".
  why: Dossier vocabulary row and S1: Wood and Rünger list settings, other people and preceding actions. Time-based cues come from S7 and S9.
  fix: "Wood and colleagues list places, people and the action you just finished. Habit researchers also use times of day."

**S3-7. More than one book idea in a chapter (dossier Writer rule: at most one).**
- location: 02.02-start-small.md lines 32 and 34 (Fogg's behaviour model, then Fogg and Clear's minute-or-two suggestion); 05.04-slow-results-and-restarting.md lines 28 and 75 (Clear's ice cube, Milkman's fresh start).
  why: Dossier Writer rule and Credits table. The credits themselves are worded correctly; the count per chapter is the issue.
  fix: In 02.02 drop the behaviour-model sentence or the "popular writers" sentence. In 05.04 move one of the two to another chapter or note.

**S3-8. Two uncredited echoes of popular-book vocabulary.**
- location: 03.01-set-the-scene.md lines 10 and 74 ("Environment design" as a BigWordAlert and heading idea); 03.04-power-cuts-and-weak-internet.md line 103 ("a 2-minute version"); 03.06-checklist.md line 50 ("a smallest of 2 minutes or less").
  why: Dossier Credits: the two-minute rule belongs to Clear (adapting David Allen), and the course should "avoid the name". "Environment design" is a popular-book chapter term not on the Credits table. The "2 minutes" appears as the course's own rule and rubric threshold while 02.02 credits the idea only as "a minute or two" from popular writers.
  fix: Use plain wording ("arranging your surroundings"; "a very short version, a few minutes at most"). If kept, credit once in plain words.

**S3-9. Course description overclaims.**
- location: course.yaml description.
  observation: "Grounded in research, with every idea credited to the people who found it."
  why: Several terms are the course's own (smallest version, restart at the next cue, steps to start, chain of cues), and many findings are credited generically ("a review", "one study"). Dossier hard constraint 2 asks for credit once, then the course's own words.
  fix: "Grounded in research, with the main ideas credited to the people who found them."

**S3-10. Keys that rest on the weakest evidence or on a framing.**
- location: 01-how-habits-work/01.03-cue-routine-reward.md Q2 (lines 120 to 131); 06-habits-for-your-life/06.02-choose-one-habit.md Q2 (lines 139 to 152).
  observation: 01.03 Q2 makes "Plan B, because it brings a reward he enjoys" the only right answer, and the explanation admits it "comes from a single study" (S19, exploratory, reward not manipulated). 06.02 Q2 grades a self-talk statement: "'21 mornings of reading: more evidence I am someone who studies.'"
  why: Assessment validation: "No graded question depends on opinion". Dossier: the reward-enjoyment finding is a hint, and "evidence of who you are becoming" is the course's framing, not a tested method.
  fix: Make the 01.03 item hinge on the sourced rule (a reward right after the routine helps while forming) with both plans offering a reward, one near and one far. Make the 06.02 item test the application (choose the habit by the four questions) or move it to an ungraded reflection.

Continuity

**S3-11. The power schedule moves in the wrong direction in two places.**
- location: 07-your-30-day-plan/07.02-reading-your-30-days.md line 54 (predict explanation); frontend/src/canvas/thirty-day-review/data.ts step 3.
  observation: "the power schedule moved to the evenings from day 17". 07.01 line 61 says "Before, the power came in the evenings. After, it often came in the mornings and went off soon after the evening meal."
  why: The schedule moved away from the evenings, which is why the evenings were dark. A second-language reader will not resolve this.
  fix: "the power schedule changed on day 17, and the evenings went dark."

**S3-12. Small arithmetic and description slips.**
- location: 05.03-missed-days.md line 70; 06.02-choose-one-habit.md line 59.
  observation:
  - 05.03: "It says '2' because his last miss was three days ago." The last miss is day 28 and the card is read on day 30, so two days ago.
  - 06.02: "raising 'Helps the rest of the day' moved sleep from third to first". At the default weights the totals are English 32, sleep 26, walk 25, so sleep is second. (At all weights 1 it ties for first.)
  fix: "two days ago"; "moved sleep from second to first".

**S3-13. Nada's power-cut dates disagree between the gate and the capstone.**
- location: 05-tracking-and-restarting/05.06-checklist.md line 42; 07-your-30-day-plan/07.04-capstone-30-day-plan.md line 90.
  observation: Gate 5: "Days 15 to 18 fell in a week of long power cuts". Capstone: "Days 15 to 19 were a week of long power cuts". Day 19 is a done day in both tables. Neither span is "a week".
  fix: One span ("days 15 to 18, four days of long power cuts") in both places. All other Nada numbers recount: 14 of 18 done at gate 5; 24 of 30 at the capstone (misses 9, 15, 17, 18, 25, 28; smallest on 16 and 19; longest gap 2; halves 13 and 11; ticks 19 to 24 as in gate 6).

**S3-14. Yousef's "week 1 notes" contradict his tick-only first calendar.**
- location: 05.04-slow-results-and-restarting.md line 22; compare 05.02-tracking-that-helps.md line 99 and the tracker-week-notes canvas step 1.
  observation: 05.04: "In week 1, his notes said 'had to push myself' three times." 05.02: "Yousef's first calendar had five empty squares and no words", and the canvas: "Yousef's old calendar had only ticks. His new card has one line a day".
  fix: Say "In the first week of his new card" and align the "week 8" score timeline (scores are weeks of the habit, notes are weeks of the card), or give the first calendar a few words.

**S3-15. Wael has three different histories.**
- location: 05.05-quiz.md Q1; 06.03-study-and-focused-work.md Q2 (line 137); 06.05-quiz.md Q4 (line 60).
  observation: 05.05: ten minutes on his portfolio after his first coffee, "He did it 40 days in a row". 06.03: "He wants a daily 45-minute block for his portfolio" with a shutter anchor and no mention of the coffee habit. 06.05: a card "for the last 4 weeks" with 5, 6, 7, 7 days done and "had to push myself" in week 1.
  fix: One continuous story, or three names. 06.03 should use the existing coffee habit as the starting point.

**S3-16. Side characters change habit, anchor and routine between appearances without a bridge.**
- location: Iyad (03.03 Q1: code each morning with the laptop in a bag under the bed; 03.04 and 03.06: 15 minutes of code after breakfast; 03.05 Q4: flashcards after the dawn prayer; 04.05 Q5: backgammon at a roadside stall). Sara (03.05 Q2: evening pronunciation practice at home; 03.05 Q5 in the same quiz: a lesson habit on her walk home). Hiba (04.02 Q: two focused hours "each day" worked as 7 days a week; 04.03 Q: 3 days at home and 2 at her cousin's shop). Dina (06.04 line 12: "her English block and her sleep habit both run on most days"; 06.06 model answer: sleep is the "next habit" she will start).
  why: Continuity lens: facts about a named person should survive across chapters.
  fix: Align each, or add a line ("after her laptop broke, Iyad moved his practice...").

**S3-17. Fares is placed in gate 1 although he is introduced as an outsider in the capstone.**
- location: 07.05-checklist.md line 63.
  observation: "Here is an example from Fares, whom you met in the capstone. In gate 1 he described his own habit". The capstone presents him as a person who "downloaded a free online spreadsheet course", not a fellow of this course.
  fix: "Imagine Fares had done gate 1 when he started." Or use a person who is already a fellow.

**S3-18. Too many names, several confusable, and the same few trades repeated.**
- location: whole course. Nadia (library corner: 01.05 line 34, 02.03 Q1, 02.05 Q5) and Nada (accounting student: 02.06 to 07.05) differ by one letter. Other near pairs: Rami, Rana, Rasha, Ruba, Reem; Dina, Duaa; Asma, Aya; Hamza, Hiba. About 43 named people appear.
  observation: Water-delivery drivers: Adam (1.5, 2.4, 2.5, 7.5), Tamer (3.2, 3.5, 4.5), Jamal (5.2, 5.5, 6.2, 6.5), Majd (7.3). The stretch-after-parking fix appears three times (Adam 2.5 Q4, Tamer 3.2 Q1, Majd 7.3 Q1) and "after I park the van at 14:00" four times. Also four bakery workers (Fadi, Mazen, Karim, Rasha), four tailors (Tareq, Sara, Sana, Layla), three coaches (Reem, Anas, Nabil), three farm stalls (Osama, Aya, Fares). Capstone case 3 (Rasha) repeats Maha's arc almost beat for beat: scrolls until after 1:00, "Phone is my alarm", kitchen charger, an old alarm clock (Ruba's too), a paper book by the bed.
  why: Specificity means this product's people, not the same three trades. For second-language phone readers every extra name is extra load.
  fix: Rename Nadia. Cut recurring minor people to a small set. Give the capstone a new unwanted habit that is not late scrolling (the walk and vocabulary cases are fine).

**S3-19. Gate "strong answer" examples recycle the earlier quiz cases.**
- location: 03.06 line 34 (Iyad, same facts and same fix as 03.03 Q1) and line 66 (model answer: Sara's pronunciation case from 03.05 Q2); 04.06 line 66 (Lama's break case from 04.05 Q4); 05.06 line 34 (Duaa, same facts and the "fill my water glass" fix from 05.02 Q1); 06.06 line 36 (Rana's lesson planning from 06.05 Q1). The winter and summer meal story appears in 06.04 (Dina), in 06.04 Q1 (Karim) and in 07.03 Q5 (Aya).
  why: Slop checklist: "Is the same example repeated?" Learners see the same case, with its answer, twice, so the quiz becomes recall of the gate example (and the gate example hands over the shape of the answer).
  fix: Give each gate a fresh strong-answer case.

Slop and template

**S3-20. The chapter skeleton and answer voice read as a template.**
- location: all 19 Learn chapters; all 68 quizzes; all 19 canvas captions.
  observation: Every Learn chapter runs: vignette, "The idea in plain words", "What the research found", predict, canvas, "What the canvas showed", worked example with bold Step labels, mermaid, "Where people go wrong", "Try it today", "Check your understanding", "Next:". The headings "Where people go wrong", "Try it today" and "Check your understanding" occur 19 times each. All 68 correct-option explanations begin "Right." Every canvas caption is one paragraph with the same four bold labels ("What this shows / Try this / What changed / Limits of the model") of 120 to 150 words.
  why: Authoring standard: "Is the same template repeated across chapters?" and "voice that sounds like a template". The identical "Right." also means that on a retry the explanations show the key.
  fix: Vary two or three headings and openings; start the correct explanation with the reason, not "Right."; split the caption into short lines.

**S3-21. About nine predicts only echo the paragraph directly above.**
- location: 01.03 (predict after "so the careful word is 'can'"), 01.04 (line 36 states one miss did not undo progress, then asks it), 03.02, 04.01 (the failed attempts are narrated just above), 04.04, 05.04, 06.03, 06.04.
  observation: 06.03 line 36: "Write where you stopped, help, and come back." Predict option: "Note where she stopped, help, come back".
  why: Anti-slop: "A quiz that tests the paragraph above." A prediction is only useful before the answer is given.
  fix: Move the predict above the explaining paragraph, or change it to a transfer case.

**S3-22. Optional open question in the Lina scene-setter.**
- location: 02-starting-a-habit/02.01-set-the-scene.md lines 72 to 78.
  observation: "why do you think Lina's plan faded by Wednesday" appears right after the section "What went wrong" and the chain diagram.
  why: Same component rule as S2-3; the answer is above.
  fix: Remove it; the gate already asks the same of Lina.

**S3-23. Reverse length tell and a few weak distractors.**
- location: all quizzes; 03.02 Q2 ("Start next year, when her life will be less busy"); 04.05 Q1 ("It should tell him to skip his lunch break to save the time").
  observation: The correct option is the shortest in 28 of 68 items (41 percent, chance is 25) and shortest or second shortest in 40 of 68 (59 percent, chance is 50). It is never the longest, which is good, but a learner can now pick the short one.
  why: Authoring standard on option length gives the rule for the longest; the mirror pattern is also a guessing cue. The two named options are not plausible and teach nothing.
  fix: Rebalance lengths (let some correct options be mid or long). Replace the joke-like distractors with real mistakes from the dossier (waiting for Monday, a louder alarm, a bigger plan).

**S3-24. Quiz stems are heavy for second-language phone readers.**
- location: mean stem 61 words; 17 stems over 70 words; longest 99 (05.05 Q1), 91 (02.05 Q2), 86 (02.05 Q1 and 07.03 Q4).
  fix: Cap stems at about 50 words and 4 numbers; move extra detail into a small table.

Plain English

**S3-25. Long sentences and dense paragraphs cluster in gates, captions and one care sentence.**
- location: 117 sentences over 30 words (3.1 percent), 20 over 40, 47 paragraphs over 110 words. Worst: 03.06 line 34 (67 words, the Iyad example); 06.06 line 42 (55); 04.01 line 79 (54, the referral); 03.02 line 20 (51); 04.06 paragraphs of 242 and 174 words; 03.06 paragraphs of 215 and 201 words.
  why: Standard: "about 20 words or fewer"; "two to five sentences". Gates and captions carry the instructions a tired reader most needs.
  fix: Split the listed sentences and paragraphs; turn the "strong answer" paragraphs into short numbered lines.

**S3-26. Idioms, figurative phrases and an undefined word.**
- location: 04.01 line 61 ("A weakened habit still knocks on the door sometimes. You simply open it less often."); 05.01 line 18 ("The ticks marched across the calendar"); 06.01 line 26 ("By day 3 the cracks were showing."); 03.01 line 66 and 03.02 ("shake good habits loose"); 03.03 line 24 ("two levers"); 01.01 and 01.02 ("win the question", "Rami's phone never has to win"); 47 uses of "fight" and 15 of "verdict". "Toy curve", "toy rule" and "toy model" (01.04 and most canvases) are never defined.
  fix: Replace with plain wording ("The old habit may still start sometimes. Start the new one at the next cue."). Define "toy" once as "a very simple example, not real data" or use "simple example".

**S3-27. Terms defined twice, and "smallest version" means two things.**
- location: "reward" (01.01 table, 01.03 line 20, 04.03 line 20); "smallest version" (BigWordAlert 02.01, 02.02 line 24, 03.04 line 20); "backup version" (03.01 table, 03.04 line 20); "tracker", "streak", "slip", "restart plan" (05.01 table, then again in 05.02 to 05.04); "friction" three times inside 03.03.
  observation: In 02.02 the smallest version is the size the habit starts at and counts as done. In 03.04 it is the third of three versions, for the worst days, below a backup.
  fix: Keep the first definition and point back after. State once in 03.04 that Lina's starting size is now the "full" version of Khaled's habit and the smallest is a step below.

**S3-28. Reading-time estimates look short for this reader.**
- location: Learn chapters at 25 minutes (2,300 to 2,600 words plus a canvas, a predict and two quizzes); quiz chapters at 10 minutes (about 1,200 words of stems, options and explanations); capstone 5,527 words at 90 minutes.
  why: Dossier risk R3 (reading load). At about 100 words a minute in a second language the reading alone is 23 to 26 minutes.
  fix: Raise the estimates or cut the chapter copy; re-check the 15 to 16 hour total (945 minutes now).

Key detail

**S3-29. Two keys have a hidden snag.**
- location: 02-starting-a-habit/02.02-start-small.md Q2 (lines 127 to 138); 02.05-quiz.md Q4 (lines 58 to 72).
  observation:
  - 02.02: The key "Read one page of her printed word list by the window" is justified by "needs no power, no internet and no battery", but the facts say the power is off from 18:00 to 22:00, so after 18:00 a printed page needs light.
  - 02.05 Q4: The correct rewrite is "After I park the truck, I will do two stretches beside it", and the explanation calls it "one small first step", while the chapter teaches that two actions in one plan is a mistake.
  fix: 02.02: put the reading at the clinic's closing or add "by the window before dark". 02.05: use "one stretch beside it".

Care

**S3-30. The one referral sentence is generic and long.**
- location: 04.01-set-the-scene.md line 79; 04.06 line 32.
  observation: "Some habits are closer to an addiction or a health problem, and if a habit feels out of your control, harms your health or comes with low moods that do not lift, a mentor, a doctor or a counsellor is the right help, and asking for that help is a sensible and strong step." (54 words).
  why: Authoring standard "Hardship with care": a wellbeing contact is a real person with a way to reach them that works on a phone. This is a kind sentence (as the brief asks) but names no one and is the hardest sentence in the course to read.
  fix: Three short sentences, and name the fellowship mentor or coordinator and the phone route (programme staff to supply it). Example: "Some habits are close to an addiction or a health problem. If a habit feels out of your control, or you feel low for many days, please talk to your mentor, a doctor or a counsellor. Asking for help is a strong step."

**S3-31. Prayer is framed twice as something that can be skipped or can compete.**
- location: 06.01-set-the-scene.md line 57; 03.05-quiz.md Q1 explanation (line 22).
  observation: 06.01 lists "prayer on time" among "Study, exercise, sleep, reading, prayer on time, less phone, more water, a side project ... they ask for more decisions than a full day can hold, and they often collapse together". 03.05: "He skips the evening prayer at the mosque on the days he visits his sister".
  why: Brief: prayer is a fixed point that can anchor a habit, "not a subject", with no theological claims and a natural tone. Listing prayer with side projects, or saying a man "skips" it, can read as judging or trivialising. Chapter 6.4's "Making prayer a technique" paragraph is the model for the right tone.
  fix: Remove "prayer on time" from the list. In 03.05 say "On the days he visits his sister he does not go to the mosque" or use another variable cue.

**S3-32. The capstone asks learners to paste their own tracker into an AI tool.**
- location: 07.04-capstone-30-day-plan.md line 80.
  observation: "Ask an AI chat tool what it thinks of your tracker, and copy its answer into your review."
  why: Data cost on weak connections and sharing personal records with a third party. A fallback exists ("write down one piece of popular habit advice"), and "Change any names" is offered, so this is not blocking.
  fix: Offer both routes as equals, start with the popular-advice route, and say the AI step is optional and can use made-up names.

### S4 (polish, not counted)

- 02.04-anchor-to-a-routine.md line 71 uses the multiplication sign (U+00D7); 04.02 and 06.02 use "x". Use one plain "x" everywhere so it renders on cheap phones.
- 07.05 learning log item 3 ("A trap that still catches you") has no provided alternative; add "or answer for Samir".
- 06.01 uses "Drink 8 glasses of water" in Dina's list. It is her list, not a claim, but it repeats a folk rule; use "a full bottle of water" (as 06.02 already does).
- "gate 2", "gate 5" in 06.06 and 07.02 are never explained to the learner; the checklist chapters are titled "Checklist and learning log".
- 01.03 predict (line 38) asks what Rami will do right after the opening has told us; 01.03 predict explanation and canvas limits add "It may weaken if the reward stays gone for a long time", which has no source (hedged, so low risk).

## Recounts (no defect found)

- Nada, gate 5: 14 of 18 done, 4 misses, longest gap 2, longest run 8. Capstone: 24 of 30, misses 9, 15, 17, 18, 25, 28, halves 13 and 11, three "no breakfast" misses, two visits, one exam day. Gates 2, 3, 6 and 7.5 agree (S3-13 aside).
- Samir: 6, 7, 4, 5, 1 = 23 done; 7 misses (1 in days 1 to 15, 6 in days 16 to 30); dark evenings 4 (17, 18, 24, 27) plus the lamp day 22; Fridays 7 and 21; call 29; run of 9 (days 8 to 16); 22 of 23 ordinary evenings; 1 of 5 dark evenings before the change.
- Yousef: 23 + 2 = 25 of 30; streak 2; longest gap 5; 27 of 35 and 8 misses by day 35; week table 4 ticks and 3 crosses.
- Fares: 21 of 30; 9 misses; 8 mornings after delivery nights, 7 missed; 20 of 20 other mornings; restarts on 5, 8, 12, 19, 22, 26, 29.
- Ziad: 20 of 30; late-shift misses 6 of 6; 4 ordinary-day misses (days 5 to 8); longest gap 5.
- Rasha: 22 of 30; 8 misses; 6 of 7 guest nights missed; 20 of 22 other nights.
- Khaled energy series (3, 5, 1, 4, 8, 3, 5, 2, 7, 4): 2, 9, 8 and 10 study evenings at the four settings; Maha 28, 14, 22 give-ins; anchor scores 37, 31, 30, 41, 29 vs 27, 40 vs 35; Dina 32, 26, 25, 36, 34, 31; Jamal 27 vs 33; Hiba 42, 35, 17; motivation series 3, 14, 12, 2 and largest effort 4. Habit-strength toy curve: 27, 47, 61, 85, 95 percent; 22, 97 percent at day 21; 54 percent for the slow curve at day 66.
- Quiz counts for Karim (26 done, gap 2, streak 1 and 16), Rana (26, runs of 6), Layla (21 of 30, 6 of 9), Duaa (10 of 14), Bilal, Osama, Manar, Wael: all correct.

## What works

- Research fidelity is the course's strength. The Lally, gym, review, replication, tracking, streak, megastudy, self-compassion and fresh-start passages follow the dossier's "phrase it this way" lines almost word for word, with the right hedges ("many tests", "one exploratory study", "a hint, not a rule"). 66 is a median with a range; 21 days is a myth with its origin; ego depletion is "did not find the effect"; "never miss twice" is credited and labelled advice; the ice cube is "not a research finding". Preserve this.
- Honest labels on the course's own reasoning ("no study has tested exactly five new habits against one", "Research has not shown that event cues work better than clock cues"). Keep and extend to the places listed in S3-5.
- Care is consistently good. Hardship is ordinary background (power hours, shared rooms, guests), never drama. Every personal prompt offers a provided case, and the capstone explicitly protects disrupted months ("graded on the quality of your review, not the number of ticks"). Shame voices ("I am lazy", "I have no willpower") are always answered. Prayer is a fixed point, not a subject, and 6.4 says so.
- IP hygiene: credits are brief and in plain words; no four laws, no 1 percent, no tiny habits, no two-minute rule by name, no keystone habits, no templates from any book.
- Arithmetic cases are carefully built so that every key can be recounted. The 30-day tables, halves, longest runs and gaps are right, and the toy models are labelled as toy.
- The capstone design (three provided cases, each with a wrong AI answer whose mistake is in the reasoning, not the numbers) is strong, and the defence questions are realistic.
- Canvas text matches the chapters on every name, time and count I checked.

## Recommendation

**Revise.** 0 S1, 4 S2, 32 S3. The four S2 items are narrow: reword five sentences about longer gaps (S2-1), fix one man's facts (S2-2), drop or move one open question (S2-3), and correct one toolkit row (S2-4). The 32 S3 items are mostly local edits, with the larger pieces being the overlong sentences and paragraphs, the recycled cases and names, and the template voice. After these edits the continuity, technical accuracy and cognitive load dimensions should reach 4, and the average should clear 4.3. A re-review should cover only the changed passages, the Tamer and Wael chapters, and the cross-references listed under S3-11 to S3-19.
