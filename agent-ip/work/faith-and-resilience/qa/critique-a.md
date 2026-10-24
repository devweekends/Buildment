---
artifact: critique
course: faith-and-resilience
artifact_under_review: content/import/faith-and-resilience
reviewer: critic-a
review_type: pedagogy and assessment
version: 1
---

# Critique: content/import/faith-and-resilience (course 11, Steady Hearts)

## Scope and method

Lenses run: Pedagogy and Assessment (`06-quality-gates.md`), with the canvas and explanatory depth checks from `agent-ip/agents/critic.md`. Reviewed blind: I did not read the writer's rationale or any other critique.

What I read and ran:
- All 40 chapters, `course.yaml`, the brief, the roadmap and the writer pack.
- All 19 canvases (`frontend/src/canvas/<slug>/data.ts` and `spec.md`) and the unit tests for the three slider and factor models.
- `node agent-ip/scripts/audit-course.mjs content/import/faith-and-resilience`: 40 chapters, 50,362 prose words, 0 chapters flagged.
- Small scripts (in the session scratchpad, not in the repo) that tallied all 68 MCQs and 26 predicts for key position, option length, wording cues and repeated items; compared every cited hadith number against `research.md` (all 52 found); recomputed the sums in the canvases and worked examples (2.3 power minutes, 5.2 and 5.3 weighted scores, 5.4 shekels, 6.3 hours, 7.3 sleep time, Omar's savings).

Not verified by me, so not scored as evidence: religious accuracy beyond traceability to the dossier (scholar review is still pending), rendering and click-through at 375px, keyboard and contrast checks, and how the importer serves keys and `modelAnswer`. The blind answer-key re-answer by a second model family or a person is not recorded anywhere, so every key below is unverified by that gate.

## Scorecard

| Dimension | Score | Note |
|---|---|---|
| 1. Outcome alignment | 4 | Every chapter maps to O1 to O8 and the minutes match the roadmap (945). Gaps: 7.4 gives no evidence for O1 or O7 although the roadmap lists it for both (S2-6); O8 "defend" is not recorded (S3-1); O4 "practise" is evidenced only by a plan (S3-11). |
| 2. Domain specificity | 5 | Power hours, shekels and dollars, remote interviews, scholarships, one protagonist per module with consistent numbers; every sum I recomputed is right. |
| 3. Depth over coverage | 4 | Eight outcomes taught through worked cases, not lists. 2.2 and 3.3 each carry four or five sources, and several taught sources are never assessed (S3-13). |
| 4. Prose quality | 4 | Plain, short sentences, kind, no shaming, zero dashes. Every Learn chapter reuses the same frames ("What to notice", "The takeaway", "Where people go wrong", "first mistake, second mistake"), so the voice starts to read as a template (S3-7). Slop critic to confirm. |
| 5. Chapter structure | 4 | All 19 Learn chapters have hook, sources, predict, canvas with "what changed", worked example, diagram, misunderstandings, two checks, "This week" and a bridge. Flaws: the predict often comes after the answer (S2-3); scene chapters put objectives after 1,000 words of story (S4). |
| 6. Interaction purpose | 3 | Density is within budget (never over 3 assessments). But 23 of 26 predicts confirm what the prose just said, 16 of 19 canvases are click-through replays with no learner decision, and the quiz repeats the predict's claim in 12 chapters (S2-3, S2-4, S3-3). Little evidence of prior belief or new understanding is produced. |
| 7. Assessment quality | 3 | Strong gates and good explanations, but the MCQ and predict sets are guessable by form (about 51% without reading), keys sit in a repeating position pattern, many items test the paragraph above, two keys sit on disputed ground and one is ambiguous (S2-1, S2-2, S2-4, S2-5, S2-7). |
| 8. Difficulty calibration | 3 | Prerequisites are secure, but the challenge is flat: the set is passable by cue, and the scaffold never fades (every gate repeats strong answer, weak answer, provided case, rubric; the capstone adds a full worked plan). No stretch path (S3-2). |
| 9. Cognitive load | 4 | One claim per chapter, plain English. Extraneous load from telling each case three times (opening, canvas, worked example), and two-skill chapters 3.3 and 5.2 (S3-3, S3-12). |
| 10. Prerequisite integrity | 4 | Terms are defined at first use and sources are used only after they are taught. Small forward uses: 1.2 leans on Muslim 2664 before 1.4 (flagged in the text); the 7.1 predict explanation cites Bukhari 5199 before 7.3. |
| 11. Technical accuracy | 4 | All 52 cited hadith numbers trace to the dossier, canvas arithmetic is correct and tested, no dashes. Open: the Yusuf 12:42 reading and the post-istikhara key (S2-5), plus the scholar's review. |
| 12. Production-grade coverage | 5 | Not applicable: there is no software product (brief: "Production bar: not applicable"). |
| 13. Security and integrity | 4 | Keys, explanations and mentor keys live only in quiz fences and `modelAnswer`; I did not test the import or reader path. The blind key check is not recorded (S3-14). |
| 14. Accessibility | 4 | Provisional, from source only: every diagram is introduced and explained in prose, canvases have text summaries and tone badges, no Arabic inside diagrams, plain English. Keyboard, contrast and 375px not tested by me. |
| 15. IP protection | 4 | The three provided capstone cases have their mentor keys only in `modelAnswer`; learner text shows a worked plan for a fourth case. Server-side handling untested. |
| 16. Variant distinctiveness | 5 | Not applicable: the brief and roadmap say "Variants: not applicable for version 1". |
| 17. Continuity | 4 | Six person names are reused for different people (S3-8), one day count differs between a canvas and its chapter, and `course.yaml` 7.4 overstates its coverage. No contradiction of a decision or number. |
| 18. Learner agency and curiosity | 4 | Real choices appear in gates, the capstone, "This week" tasks and the weights control in 5.2; every personal prompt has a provided case of equal weight. In the Learn chapters the learner mostly watches a character decide. A continuing cast gives some "what happens next". |
| 19. Instructor alignment | 3 | Provisional and procedural: `critic.md` says this cannot be scored without the roadmap confirmation record, and G2B and the scholar review are both blank in the roadmap. The course follows the drafted roadmap exactly (titles, minutes, canvases, capstone), so this is a gate condition, not a writer defect. |
| 20. Interactive canvas quality | 4 | 19 of 19 have a spec on 14A, one claim, honest limits, no measure of faith or reward, and the three computed models are unit tested. Weaknesses: redundancy with the worked example, an asymmetric model in `little-and-often`, a reciprocity claim in `help-passes-on`, and no canvas QA report (S3-3 to S3-6, S3-14). |
| 21. Explanatory depth | 4 | The prose audit passes for all 40 chapters; mechanism, worked reasoning and misunderstandings are in the prose, not in components. Part of the word count is spent retelling the same case (S3-3). |
| 22. Visual explanation quality | 4 | All 27 diagrams are introduced and explained, and most argue a relationship (2.3 decision tree, 4.3 cure by missing wing, 6.4 sorting question). At least four restate the prose, six use the same two-roads template, and 3.4 explains an arrow the diagram does not draw (S3-7). |

**Average: 87 / 22 = 3.95.**

Threshold check: every dimension at least 4 is not met (dimensions 6, 7, 8 and 19 are 3); average at least 4.3 is not met; zero S1 is met; zero S2 is not met (7 S2). The gate does not open.

## Defects

### S1

None found in my lens. I looked specifically for a wrong key, an unsafe prompt, a graded personal matter and a leaked answer. The loss and care chapters carry the contact sentence, no prompt grades hardship or faith, and no learner-facing text contains a mentor key. The Yusuf 12:42 item (S2-5) is the closest to a blocker; it becomes S1 if the scholar says the reading is wrong, because the brief's production bar and the writer pack forbid graded keys on a disputed matter.

### S2

**S2-1. Keys and predicts can be guessed from their form.**
- location: all 68 MCQs (2 in each of the 19 Learn chapters, plus 2.5, 3.5, 4.4, 5.5, 6.5, 7.4) and all 26 predicts. Named items below.
- observation:
  - Option length is over-corrected, not balanced. The keyed option is never the strictly longest (0 of 68 MCQs, 0 of 26 predicts) and is the strictly shortest in 31 of 68 (46%; chance is about 25%).
  - Absolute or extreme words (only, never, always, every, completely, fully, nothing, nobody, everything, no one, at all, pointless, useless, forever, entirely, none, whole) appear in 83 of 204 distractors (41%) and in 2 of 68 keys (3%). The keys are nearly always the moderate "both and" answer; the distractors are the one-sided or extreme ones (for example 2.5 Q1, Q2, Q4, Q5; 3.4 Q1; 6.5 Q2; 4.4 Q5).
  - Using only these cues and never reading a stem, my script scored about 51% over the 68 items (drop options with absolute words, then take the shortest) and 41% (drop them, then guess). Chance is 25%.
  - Grammar tells: in 2.5 Q1 three options begin "He" and the key is the only one that does not, and the only one with a colon; in 2.3 Q1, 2.4 Q2 and 4.4 Q3 the key is the only option containing a colon; in 4.4 Q5 the key is the only noun phrase while the other three begin "She should".
  - Strawman distractors no sincere learner holds: 2.2 Q1 "Laziness: he should add more hours" (the stem says sixteen hours a day); 2.5 Q2 "Too much planning" (the stem says he planned nothing); 4.3 Q2 two "Yes" options; 5.3 Q1 and 5.5 Q2 "Nobody at all, since asking others shows she does not trust Allah" (the same sentence twice).
- why it matters: The "guesser" red team. A learner can reach about half marks on a check chapter without reading the case, so the quiz does not show that O2 to O6 are met. It also trains learners to pick the balanced-sounding answer, which the course's own cases (for example the Thursday "almost finished" message in 4.3) show is not always right.
- required fix: Rewrite the distractors as half-truths a sincere learner really holds (the half of tawakkul, the half of sabr), in the same register, length and grammatical shape as the key. Remove absolute words from distractors or give some keys absolute-sounding wording that is correct in context. Make the key the longest option (within 10%) in roughly one item in five and the shortest in roughly one in five. Add at least one item per check chapter where the "both and" answer is wrong. Then run `scripts/blind-keys.mjs` with a person or a different model family, and open every item marked medium or low.

**S2-2. The answer positions repeat as a pattern across the check chapters.**
- location: 2.05, 3.05, 4.04, 5.05, 6.05.
- observation: Whole-course positions look balanced (A 12, B 21, C 21, D 14 of 68), which is why the audit stays silent. By chapter they are not: 2.5, 5.5 and 6.5 have the identical key sequence C A D B C; 4.4 is C A D B D; 3.5 is B A D C C. Question 2 is option A and question 3 is option D in all five five-question chapters.
- why it matters: A learner (or a peer sharing notes) who sees the pattern in 2.5 can answer two of five items in each later check chapter without reading. The audit rule counts the course as one pool and cannot see this.
- required fix: After S2-1, re-order options so that no question number has the same position in more than two check chapters, no two chapters share a key sequence, and each chapter uses at least three different positions. Have the blind-keys script report position by question number.

**S2-3. Predicts do not predict: the answer is usually already on the page, the wrong option is a strawman, and the keys lean one way.**
- location: all 26 predicts; named below.
- observation:
  - Of the 11 yes/no predicts (1.4, 2.1, 2.3, 3.2, 4.2, 5.1, 5.2, 5.4, 6.1, 6.2, 6.4) ten are keyed to the "No", "Not yet", "Probably not" or "Only if" option. The only "Yes" is 3.2. A learner learns to answer the sceptical option.
  - The answer is stated in the one to three paragraphs before the predict: 1.2 ("Our part is today's step" directly above), 2.2 (the hadith, "they go out hungry in the morning", is quoted two paragraphs above a predict asking whether the birds stay in the nest), 3.2 (the "What sabr is not" paragraph states that seeking help is part of sabr, then asks it), 4.3 ("Ahmad's Monday was fear with no hope" then "what would steady his heart, more hope or more fear"), 5.3 (the "Who to ask" section), 6.2 (6.1's BigWordAlert states the claim), 6.4 (Reem says in 6.1 that losing a client is not a sin), 7.1 (the paragraph above says the doctor told her to rest).
  - In 5.4, 6.3 and 6.4 the predict sits 600 to 1,000 words above the canvas that says "check your prediction", and the prose between them has already answered it.
  - The wrong option is a position nobody holds after the chapter so far: 2.1 "dua and trust are enough now", 3.3 "an explanation of why it happened", 4.1 "a fair picture of their whole life", 5.1 "enough research removes the doubt", 5.3 "the group vote: more voices, more wisdom" straight after the fourteen-reply scene, 6.1 "more work means more pay".
  - 1.4 asks "Do you expect going over it again and again to help?" and keys "Only if she takes one lesson, then stops", which does not answer the question as asked.
- why it matters: A prediction is useful only when it commits the learner against a live misconception before the reveal. Here a learner who read the last paragraph is right every time, so the predict records nothing about what learners believed and trains a "pick the No" habit.
- required fix: For each predict, pick a decision where a sincere learner is pulled toward the wrong option, and place it before the paragraph that answers it and immediately before the canvas. Rebalance so that about a third of the keys are "Yes" or plainly intuitive, and rewrite 1.4 so the options answer the question. Where the claim has already been taught in a scene chapter, move the predict to a new case.

**S2-4. Many embedded and check items test the paragraph above, and the quiz repeats the predict.**
- location: named items below; 12 Learn chapters; cross-chapter repeats listed.
- observation:
  - Key is a sentence from the chapter just read: 1.4 Q2 (the key is the "Meaning" line of Bukhari 4949, and the stem names the hadith); 1.3 Q2 (Haneen is the chapter's own "stop complaining and cope" example); 2.5 Q4; 3.3 Q1 (the key is the four practices, and each distractor is a phrase the chapter had just named as wrong); 3.5 Q2 and Q4; 4.4 Q5; 6.4 Q1 (Mutasim is the chapter's callout example of a failed exam after honest study); 7.2 Q1 (key quotes Muslim 2699); 7.4 (see S2-6).
  - In 12 of 19 Learn chapters (1.3, 1.4, 2.2, 2.3, 3.2, 3.4, 4.2, 5.2, 5.3, 6.2, 6.3, 6.4) one quiz item tests the same single fact as the predict (for example 2.2: birds go out, twice; 4.2: thank people, twice). So the predict, canvas and quiz all confirm one claim, and the chapter's other sources go unchecked.
  - Items repeated elsewhere, against the rule "no item repeats an item or predict": 5.4 predict and 5.5 Q3 (istikhara replaces reading and advice); 5.3 Q1 and 5.5 Q2 (same four-way structure and a repeated distractor); 1.3 Q1 and 4.3 Q1 (an aunt says it is Allah's anger or punishment); 6.2 Q1 and 6.5 Q1 (spending on family is a good deed, same hadith); 3.5 Q1 and 7.4 Q2 (tears and sabr); "if only" in 1.4 Q1, 5.5 Q4, 6.4 Q2 and 7.4 Q5.
- why it matters: These items measure recognition of the page, not the ability to use the idea in a new case (evidence level 1 for outcomes written at level 3 to 5). The "skimmer" passes. Spaced retrieval is good, but a rename of the same case is not retrieval across a changed surface.
- required fix: For each embedded quiz, test a different claim from the predict, using a case where two taught ideas compete. Replace the verbatim-key items above. For repeats across chapters, change the situation, not only the name, or delete them. Use the sources that no item assesses (S3-13) as the new material.

**S2-5. Two graded keys sit on ground the dossier or classical commentary treats as disputed.**
- location: 3.04 (predict `means`, Q2 Bayan, and the explanation of Q2 option 0), canvas `yusuf-waiting-well` steps 2 and 3; 5.04 Q1 (Odai).
- observation:
  - (a) 3.4 asserts as fact that Yusuf's request to the freed prisoner "was a means, used together with trust" and that "the Quran tells it as a means, not as a failure of trust", keys it in a predict and in Q2, and repeats it in the canvas ("it did not make it wrong to have used it"). To my knowledge, classical commentary on 12:42 records two readings of "made him forget the mention of his Lord": one where the forgetting is the freed man's, one where it is Yusuf's (which reads the request as a lapse). I could not find this in `research.md` (topic 9 and the "Where scholars differ" table list only the "several years" wording, checklist item 23). I am flagging it for the scholar, not ruling on it.
  - (b) 5.4 Q1 asks what fits when Odai "has had no dream and feels about the same about both" after three days. The dossier's "Where scholars differ" table lists exactly this ("What to do after istikhara"): one source says repeat and consult again if unsure, another says go ahead. The key is "Go ahead with what seems best from his facts", and the explanation of option 2 says he may repeat it. The writer pack says "Graded keys test only the agreed core."
- why it matters: The brief's production bar ("never from opinion or a disputed ruling") and the writer pack ("never grade ... a matter where scholars differ") forbid this. A learner who follows one sourced position can be marked wrong.
- required fix: (a) Hold the 3.4 predict and Q2 for the scholar. Until then, test only what the text states (Yusuf asked, stayed several years, then named Allah's kindness; 12:90 and 12:100), and soften the chapter and canvas sentences to "asking a person is a means; the Quran tells us he stayed several years". If the scholar confirms the reading, add the plain "scholars differ" sentence. (b) Rewrite 5.4 Q1 to test the agreed core only (no dream required; study and consult as well), remove "feels about the same", and keep any "go ahead" wording out of the key.

**S2-6. The mixed review is not a mixed review.**
- location: 07.04 Q1 to Q5; `course.yaml` goal for 7.4; roadmap evidence column for O1 and O7.
- observation: Each item is a re-skin of one module's protagonist, in module order 2, 3, 4, 5, 6: Q1 is Khalil's power plan; Q2 repeats 3.5 Q1 (tears, a relative, sabr); Q3 is Ahmad ("Allah's mercy is not for someone like me" against 4.3's "Allah will not open a door for someone like me"); Q4 is Rania's dream and istikhara; Q5 is Tariq ("If only I had refused that second project"). The options are labelled by module vocabulary ("Tie it and trust:", "Qadr:", "Istikhara:", "Sabr:"), so recognising whose story it is gives the answer. No item needs two teachings to compete. Nothing comes from module 1 (sorting) or module 7 (service, care, telling a real person). `course.yaml` says "fresh cases from every module" and the roadmap lists 7.4 as evidence for O1 and O7.
- why it matters: The point of the review (interleaving) is choosing which teaching fits when the module label is removed. Here the label is the position in the chapter. O1 and O7 lose their listed evidence.
- required fix: Write five new cases that each combine two situations (for example a fellow who is ill and waiting on a result, or who lost a client and is also comparing himself with others), with plausible competing teachings as options. Include one that needs module 1 (sort what only Allah knows) and one that needs module 7 (serve, rest, tell a real person). Shuffle the module order. Align the `course.yaml` goal and the roadmap evidence column with what 7.4 really covers.

**S2-7. One key is not uniquely defensible.**
- location: 01.04 Q1 (Salwa); also 02.05 Q3 (Lubna).
- observation: In 1.4 Q1 the key is "Allah decreed it; I will note my weak topic for round two" and a distractor is "I will go over every question I got wrong each night this month". The hadith forbids saying "if only"; the distractor does not say it. Nightly review of wrong answers before a retake is ordinary good study and is "keen on what benefits you" (the chapter's own phrase). The explanation calls it "regret", which is an inference about the learner's state, not about the act. In 2.5 Q3 the distractor "Ask her teacher now to accept late work if the power fails" is also a sensible backup; only "best" separates it from the key.
- why it matters: The rule is one defensible key; an expert could pick the distractor and be marked wrong, and a careful learner is told that normal study is a mistake.
- required fix: In 1.4 Q1 change the distractor to something that contains the "if only" loop (for example rehearsing what he should have done differently without any plan), or make the key "write one lesson and stop" against an option that adds no lesson. In 2.5 Q3 make the teacher option clearly weaker (for example the only plan) or remove it.

### S3

**S3-1. The "defend to a mentor" half of O8 is not evidenced.**
- location: 07.05 "Your five-minute walk-through" and the pass rule; roadmap O8; brief demo.
- observation: The pass rule reads "lines 1, 2 and 6 must be Met, and no line can be Not yet". The defence questions have a "good answer" column but no level and no place in the pass rule. The only recorded artifact is the written openquestion; the voice note is optional.
- why it matters: The brief's demo and O8 say the fellow walks a mentor through the plan. Nothing records that it happened or how it went.
- required fix: Add a seventh rubric line "Defence" (Met, Partly, Not yet on the four questions) or state plainly that the walk-through is a formative conversation and move "defend" out of O8's evidence.

**S3-2. Support never fades, and there is no stretch path.**
- location: gates 1.5, 2.6, 3.6, 4.5, 5.6, 6.6, 7.6 and capstone 7.5.
- observation: Every gate repeats the same scaffold: a strong answer told in prose, a weak answer, a provided case, a table rubric, and the parts spelled out in the prompt. The capstone adds a full worked plan. Nowhere does a chapter say "this time the template is removed". Module 6 and 7 learners get exactly the help module 1 learners got.
- why it matters: `05-assessment-and-motivation.md` asks that hand-holding fade and that the chapter say so. The "expert" red team (a learner who already knows these sources) has nothing harder to do.
- required fix: From gate 5.6 on, drop the weak-answer paragraph and shorten the strong-answer paragraph, and tell the learner that this is on purpose. In 7.6 ask for a task with no part list. Add one optional harder prompt (for example a case where two plans conflict) in the gates for modules 5 and 6.

**S3-3. Most canvases retell the worked example the chapter gives next.**
- location: 1.2, 1.3, 1.4, 3.2, 3.3, 4.2, 4.3, 5.3, 5.4, 6.2, 6.4, 7.3 (at least 12 of the 16 step-through canvases).
- observation: The canvas steps use the same events, order and numbers as the chapter's own "Worked example", which follows the canvas and tells them again (1.2: six questions, five unseen, the part next to each, one step; 6.2: contact form, honest message, power cut, $150, money to his mother). The learner makes no choice; Next is the only control. Only `rania-two-offers`, `interview-power-plan` and `little-and-often` respond to learner input.
- why it matters: The learner meets each case three times (opening, canvas, worked example) with no new information, which is extraneous load in 1,500 to 2,000 word chapters read on phones. A canvas should do what the prose cannot: let the learner try a case.
- required fix: Keep one telling. Either make the canvas the place where the learner makes the choice (for example sort Yasmin's six questions into "only Allah" and "mine" and see the result, or pick the reading in 1.3 and see where it leads) and shorten the worked example, or keep the canvas as a recap and cut the duplicate worked-example paragraphs.

**S3-4. `little-and-often` builds its claim into the model.**
- location: `frontend/src/canvas/little-and-often/data.ts`; chapter 6.3 predict and canvas paragraph.
- observation: A bad day is modelled only against the long plan (the "Fridays lost" slider); the small plan always keeps all 24 sessions. The 18 h against 15 h result follows from that assumption, not from any rule the learner can change. The `limits` text admits it ("bad days fall only on Fridays"), but the predict, the "tryThis" and the chapter text treat the result as a finding.
- why it matters: The slider red team: the learner can move controls for ten minutes and still find that the claim cannot fail.
- required fix: Add an input such as "bad days a week" applied to every plan day, so a long session and a short one can both be lost; keep the default so the small plan still comes out ahead, and let the learner find the setting where it does not.

**S3-5. `help-passes-on` shows help coming back.**
- location: `help-passes-on/data.ts` (purpose "see that help comes back", outcome badge "help came back"); chapter 7.2.
- observation: The canvas is built so help sent by Rania returns to her through Mariam. The chapter's misunderstanding list says "I help people so they will help me" is wrong, and the roadmap rule says no canvas measures reward. The `limits` text says it often does not come back, but the title, purpose and outcome badge say it does.
- why it matters: A learner can read the story as "service is repaid", which is the reading the chapter tells them to drop.
- required fix: Change the purpose to "help passes on; the return is with Allah", remove the "help came back" badge, and add a final step in which one act of help is not returned, with the person helping again anyway.

**S3-6. Small mismatches between canvases and their chapters.**
- location: `worry-or-next-step` step 1 ("six days later") against 1.2 ("a week after"); chapter 4.2's paragraph after the canvas ("ended in action: an updated portfolio and a CV for Yousef") against the canvas's last step (the comparing thought at 23:00); `words-for-the-day` carries two claims (words for moments, and consoling a friend) against a roadmap claim of one; 7.2 worked example counts 60 minutes on the stairs as service time though it says Khalil climbs them anyway.
- why it matters: Each is small, but one claim per canvas and exact agreement of numbers are in the canvas contract.
- required fix: Align the day count; make the 4.2 sentence match the canvas; split the consoling steps of `words-for-the-day` into the worked example or give them their own canvas claim; subtract the stairs from the service total.

**S3-7. Diagram quality is uneven and the frame repeats.**
- location: 2.2, 3.3, 4.2, 5.2 (restate the prose); 1.3, 1.4, 3.1, 3.2, 4.1, 7.2 (same two-roads shape); 3.4.
- observation: 3.3's diagram is the lookup "moment to words" that the three headed sections already give; 4.2's follows the three section headings; 2.2's has two arrows into one box; 5.2's is the step list under the heading above it. Six more are the same fork (one event, a wrong road, a right road). In 3.4 the text says the fourth part "works by protecting the other three", but the diagram has no arrow from that box to any other. All 27 use the same "What to notice / The takeaway" wrapper.
- why it matters: A diagram that restates the paragraph is a listed anti-slop defect, and a claim the picture does not draw cannot be seen.
- required fix: For the four restating diagrams either cut them or change what they show (for example 5.2 as a decision with "unsure" and "missing fact" loops; 3.3 as a time line of one day). Draw the missing arrows in 3.4. Vary the wrapper wording.

**S3-8. Continuity slips.**
- location: names Kinan (3.06 and 7.04), Ghadeer (3.06 and 7.03), Ayman (2.04 and 4.04), Thaer (3.04 and 7.02), Ola (2.03 and 3.05), Sawsan (2.05 and 3.05); `course.yaml` 7.4 goal; `07.01` to `07.04` use CRLF line endings, the other 36 files do not.
- observation: The writer pack says a name belongs to its module and new people need new names. Six names are used for different people in different modules.
- why it matters: A fellow reading 3.6 meets Kinan the accountant and, in 7.4, Kinan the developer; spaced retrieval relies on telling cases apart.
- required fix: Rename the later or less central person in each pair; normalise line endings.

**S3-9. 5.4 models reading an employer's reply as the answer to istikhara.**
- location: 05.04 worked example ("The way has opened"; "If the startup had refused the call times ... the way would not have opened in the same way"); canvas `istikhara-in-order` final step ("the way opened").
- observation: Rania's istikhara is "confirmed" by the startup accepting her terms. 4.3 teaches that a lost client or a rejection "is not a message", and the roadmap puts "signs" out of scope. The text says "watch whether the way opens" as the dossier phrases it, but the worked example makes a refusal read like a "no".
- why it matters: A learner whose employer refuses could conclude that Allah refused.
- required fix: After the worked example add one sentence that an obstacle is a reason to check the facts and the plan again, not a verdict, and ask the scholar to approve the "watch whether the way opens" sentence in the worked example.

**S3-10. Absolute wording is graded: "hardship is not a sign of Allah's anger".**
- location: 01.03 text ("closes the door on the late-night thought"), Q1 key; 04.03 Q1 explanation; 04.04 Q4 explanation.
- observation: The hadith supports "the prophets were tested most", which removes the idea that hardship always means anger. The chapter and the keys go further ("not a message that Allah is angry with you", "a broken laptop is not a sign of Allah's anger").
- why it matters: The scholar checklist does not list it; a key that says "never" is the kind a scholar may want softened.
- required fix: Key on "cannot be read as proof of anger" and put the question to the scholar.

**S3-11. Two gate tasks grade a personal wrong, and one outcome verb is stronger than its evidence.**
- location: 04.05 rubric "Care" and the prompt's fifth part; 06.06 rubric "Honest account" and the second part; outcome O4.
- observation: "One of your own choices to be careful about" (Not yet: "No care") and "any wrong named apart from the setback" ask a learner using their own life to name a fault and are graded. A provided case exists, but the rubric does not say a fictional example is acceptable. O4 says "practise"; 4.5 says "if you cannot keep the practice for three days, a clear plan is enough".
- why it matters: The brief says nothing personal is graded.
- required fix: Add to the two rubrics "for your own life you may use a small or imagined choice; the mentor checks the reasoning". For O4 either require one line on what was noticed or change the outcome verb to "plan".

**S3-12. Two skills in one chapter.**
- location: 03.03 (five sets of words plus a consoling method, with one predict, one canvas and two quiz items covering only part); 05.02 (four parts of knowing plus the weighted-score arithmetic); 07.03 (rest, treatment, scholars' statements, Khadijah, a list of signs, order of who to tell).
- observation: 3.3 teaches the istirja, Umm Salamah's dua, the dua of distress, the refuge dua, "hasbuna Allah" and how to console a friend. The predict and one quiz item go to consoling; the other two quiz items go to one dua and consoling. In 5.2 a learner must learn four steps and the weight times score arithmetic in one 25-minute sitting.
- why it matters: One hard thing at a time; a learner on a phone who loses power mid-chapter loses a lot.
- required fix: Move the consoling method to the start of 3.4 or to 7.2, or cut the words in 3.3 to two duas and move the rest to the toolkit; in 5.2 move the arithmetic explanation into the canvas "what changed" text.

**S3-13. Several taught sources are never assessed.**
- location: all quizzes.
- observation: No graded item keys on Jami' at-Tirmidhi 3505 (Yunus), Sahih al-Bukhari 1283 (patience at the first shock, the headline of 3.2), Quran 51:56, 94:5 to 6, Ibn Rajab's definition of tawakkul, or Umm Salamah's dua (Muslim 918).
- why it matters: Outcome O3 includes "use the sourced words and duas" and "sabr at the first shock", and the predict-duplicating items in S2-4 are using the space.
- required fix: Put these sources into the replacement items from S2-4.

**S3-14. Process evidence for G5 is missing.**
- location: `agent-ip/work/faith-and-resilience/` (no `qa` folder before this review).
- observation: There is no recorded blind key check (`05-assessment-and-motivation.md`), no assessment plan, no canvas QA report on 14B for any of the 19 canvases, no saved course audit (13A), and no roadmap confirmation record. The canvas specs have all acceptance boxes pre-ticked by the writer (for example 1.2: "model is tested").
- why it matters: `critic.md` says canvas quality and instructor alignment cannot be fully scored without these, and the gate package lists them.
- required fix: Run `blind-keys.mjs` with a different model family or a person after S2 fixes, record it; write the canvas QA reports after a click-through at 375px; save the audit; leave the spec boxes unticked until a validator ticks them.

### S4 (not counted)

- Scene chapters 1.1 to 7.1 put `LearningObjectives` and Key words after 1,000 or more words of story; moving the objectives to the top would help orientation.
- The 4.2 canvas paragraph says the canvas "ended in action", while the canvas's last step is the comparing thought (also in S3-6); the chapter would read more accurately if it named the real last step.

## What works

- **Cases and tone.** Every chapter opens on a person, a day and a number (Yasmin's 36 power hours, Khalil's 72 against 75 minutes, Rania's 2,950 against 2,400 shekels, Tariq's $600). Hardship is plain background, sadness is never weak faith, and every loss chapter carries the same human contact sentence. Keep this.
- **Gates.** All seven have a real task, a provided case written as fully as a personal one (Ziad, Bilal, Kinan, Hala, Kholoud, Shatha, Bashir), a three-level rubric with observable thresholds, a pass rule, a follow-up step, and a `modelAnswer` that starts with a mentor key listing common Partly and Not yet answers. Nothing personal is graded. The 5.6 and 6.6 tasks are the best: a decision record and a fresh start plan that need the reasoning of the whole module.
- **Capstone.** Three full provided cases plus the Hani worked example, six lines with Met, Partly and Not yet, defence questions, a mentor key per case, and the numbers in Omar's case add up (savings of $900 cover about 1.5 months of a $600 gap).
- **Good application items to copy as models:** 2.3 Q1 (counting minutes), 2.5 Q3, 5.4 Q2 (Sundus: ask a scholar first), 5.5 Q1 and Q5, 6.5 Q4 (Sufyan), 7.2 Q2, 7.3 Q1 and Q2. They put a decision in a new case and the distractors are real half-truths.
- **Explanations.** Every option of every MCQ has its own kind, standalone reason, and the keys follow from taught material, not from opinion.
- **Canvas hygiene.** All 19 have a spec on template 14A, one claim, honest limits, no number attached to reward, no Arabic or brand names; the three computed models are unit tested and their try-this numbers are true (I rechecked 34 against 34, 39 against 36, 36 against 38, 39 against 29 in `rania-two-offers`, and 72 against 75 minutes in `interview-power-plan`).
- **Spaced retrieval of Muslim 2664** in 1.4, 5.2, 5.4, 6.4 and 7.5 is the right use of repeating a source.
- **Source discipline.** All 52 cited hadith numbers trace to `research.md`, no verse, hadith or story is added from memory in the chapters I read, and there are no dashes anywhere in the content.

## Recommendation

**Revise.** The structure, the cases, the gates and the capstone meet the standard and should be kept. The gate cannot open for these reasons, in this order:

1. Take the Yusuf 12:42 key and the 5.4 Q1 key to the scholar, and hold both until answered (S2-5).
2. Rewrite the MCQ and predict sets (S2-1, S2-3, S2-4, S2-7), then re-order the options (S2-2), then rewrite the mixed review (S2-6).
3. Run the blind key check with a person or a second model family and record it (S3-14); re-review only the changed items and the canvases they touch.
4. Record the roadmap confirmation (G2B) and the scholar's review before dimension 19 can be scored above 3.

This is round one. If any S2 above survives round two, `06-quality-gates.md` says to rewrite that part from the brief and escalate to a human.

```yaml
artifact: critique
course: faith-and-resilience
artifact_under_review: content/import/faith-and-resilience
lens: pedagogy and assessment
scorecard_average: 3.95
blocking_defects: 7
recommendation: revise
```
