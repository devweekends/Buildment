---
artifact: critique
course: build-with-ai
artifact_under_review: content/import/build-with-ai/ (course.yaml, 6 modules, 40 chapters) and frontend/src/canvas/<slug>/data.ts for the 22 Learn-chapter canvases
reviewer: critic A (agent-ip G5)
review_type: pedagogy, with assessment
version: 1
scorecard_average: 3.82
blocking_defects: 0 S1, 9 S2 (plus 13 S3 and 4 S4)
recommendation: revise
---

# Critique A (pedagogy and assessment): Learn and Build with AI

## Review basis

Read blind: the brief, the roadmap, the dossier ("Facts writers may state", "Do not say", "Unverified claims"), `05-assessment-and-motivation.md`, `04-interactive-playbook.md`, `06-quality-gates.md`, `10-interactive-canvases.md`, all 40 chapters and all 22 canvas `data.ts` files. I did not read the writers' rationale, the run log or any `spec.md`.

Ran, read-only:
- `node agent-ip/scripts/audit-course.mjs content/import/build-with-ai`: 40 chapters, 0 needs-work, no warnings. Prose is 1,252 words or more in every Learn chapter and 765 or more in every gate.
- My own scan of every MCQ and Predict (68 MCQ, 26 Predict): option length, key position, wording cues, sentences over 30 words, em and en dashes (none found).
- I recomputed 11 canvas totals quoted in the chapters (44 to 23, 22 to 20, 25 to 23, 26/24/20, 29/28/21, 17/14/20, 40 to 21, 21 to 20, 32 to 22, 26 to 15, and the slider cases). All match.

Not done, and so not scored from evidence: no click-through at 375px, no Docker or GitHub command run, no blind-key run by a second model family (I answered each key while reading and found no wrong key, but I am the same family as the drafters, so this does not count as the independent check in `05-assessment-and-motivation.md`). No canvas QA report or `roadmap-confirmation.md` exists under `agent-ip/work/build-with-ai/`; dimensions 11, 14, 19 and 20 are therefore provisional.

## Outcome coverage (O1 to O8)

| Outcome | Evidence found | Verdict |
|---|---|---|
| O1 what AI does not know, calls that stay yours, help or harm | Quizzes 1.2 to 1.5, gate 1 (01.06), 06.04 item 1 | Covered. Items are easy (see S2-6). |
| O2 tools by job, access, owned files, what never to paste | Quizzes 2.2 to 2.4, 02.05, gate 2 (02.06), 06.04 item 2 | Covered. |
| O3 five angles, recall, spaced review | 03.07 items 1 and 5, gate 3, capstone parts 2 and 4 | Covered. Spacing is only a date list. |
| O4 audio, read after, check summaries, own-words notes | 03.05 and 03.07 items 2 to 4, gate 3, capstone part 4 | Partly. The audio step is optional and no performance row requires it (S3-13). |
| O5 plan and run a lab, break on purpose, log on GitHub | 04.06, gate 4, capstone part 3 | Covered on the own-project route; the provided route is a log review. Gate 4 rubric does not fit it (S2-4). |
| O6 six-month plan, learning share, checked resources, licences | 05.06, gate 5, capstone parts 1 and 2 | Covered. Best gate in the course. |
| O7 explain every part and trade-offs without notes | 05.04 item 2, 01.05 item 1, capstone walk-through | Not covered. The walk-through has no rubric row or pass rule (S2-1). |
| O8 honest write-up for more than one platform, AI line | 06.02, 06.03 quizzes, capstone part 5 | Own route covered. Provided route cannot evidence "more than one platform" and the rubric contradicts its own prompt (S2-2). |

## Scorecard

Scores are 1 to 5. Thresholds from `06-quality-gates.md`: every dimension at 4 or more, average 4.3 or more, no S1 or S2. Seven dimensions are at 3 and there are nine S2 defects, so the gate is not met.

| # | Dimension | Score | Note |
|---|---|---|---|
| 1 | Outcome alignment | 3 | O1, O2, O3, O5, O6 have quiz, gate and capstone evidence; O7 has no scored evidence, O8 has none on the provided route, O4 audio is unassessed. |
| 2 | Domain specificity | 5 | Gaza fellows, phones, weak data, shekels, Palestine access checks and one running fellow (Yara, Qasir) give every example a real home. |
| 3 | Depth over coverage | 4 | Seventeen habits in about 21 hours is wide, but each gets a failure story, a worked example and a transfer item; 04.04 and 05.04 carry too much. |
| 4 | Prose quality | 4 | Short concrete sentences (17 over 30 words in lessons, none in quizzes); idioms such as "stand out" and a fixed "first, second, third mistake" frame cost it a point. |
| 5 | Chapter structure | 4 | Failure story, concept, worked example, predict, canvas, mistakes, transfer in every Learn chapter; reflection only at gates, bridge is one line. |
| 6 | Interaction purpose | 3 | About 19 of 26 predicts are answered by the paragraph above or are policy opinions; 18 of 22 canvases only retell the story and none can fail the learner. |
| 7 | Assessment quality | 3 | Strong evidence-based scenarios and per-option explanations, but test-wise cues (33% of wrong options carry a "since/because" clause against 3% of correct ones; the correct option is never the longest) and near-copies of the lesson. |
| 8 | Difficulty calibration | 3 | Support never fades and the course never says it should; the capstone has the most support of all; time estimates are too low; most quiz items are recall of the chapter's rule. |
| 9 | Cognitive load | 3 | 04.04 and 05.04 stack five or six new ideas; module 3 teaches study habits through networking and password topics for fellows who "need no coding"; one story is told up to three times. |
| 10 | Prerequisite integrity | 4 | Course 9 is referred to, not required; but API, deploy, rate limits, endpoint, Docker are used and never defined. |
| 11 | Technical accuracy | 4 | Provisional. Claims match the dossier and every total I recomputed is right; I did not run any command or render. |
| 12 | Production-grade coverage | 5 | Not applicable: a foundation course with no product build, so no auth, storage or deploy to cover. |
| 13 | Security and integrity | 4 | Secret and privacy teaching is exact and keys stay in importer fields; but provided-case answers can be produced by a model alone and the only guard, the defence, is unscored. |
| 14 | Accessibility | 4 | Provisional. Phone-first, no images, audio optional, a text paragraph after every diagram; four-column rubric tables at 375px not checked. |
| 15 | IP protection | 4 | No hidden solution leaks; 06.05 hands over Yara's whole five-part package as a template for a link shortener. |
| 16 | Variant distinctiveness | 5 | Not applicable: the brief says no variants. |
| 17 | Continuity | 4 | Names, numbers, canvases and cross-references agree closely; Yara's timeline (labs and caching before her plan exists) does not. |
| 18 | Learner agency and curiosity | 4 | Own project or provided case at every gate and real choices in the cases; rhetorical predicts dull the curiosity the cases build. |
| 19 | Instructor alignment | 4 | Not a valid gate score: G2B is pending and no confirmation record exists. Provisional 4 for fidelity to the drafted roadmap only. |
| 20 | Interactive canvas quality | 3 | The four model canvases (three factor, one slider) are correct and match the text; the other 18 are step-throughs that restate the chapter, each repeats the chapter's predict in "tryThis", and no canvas QA report exists. |
| 21 | Explanatory depth | 4 | Audit passes with mechanism, worked example and failure modes in every Learn chapter; 04.03 (1,341) and 05.05 (1,252) sit near the minimum. |
| 22 | Visual explanation quality | 3 | 29 Mermaid flowcharts, each with a text paragraph after it; at least five restate the paragraph above and all use the same "What to notice / takeaway" frame. |

Average: 84 / 22 = **3.82** (3.77 if dimension 19 is dropped as unscorable).

## Defects

### S1

None found. I found no wrong key, unsafe instruction or learner-visible answer key. A single S1 would have blocked; the S2 list below blocks the gate on its own.

### S2

**S2-1. O7 (explain every part without notes) has no scored evidence; the provided-case route cannot test it.**
- location: `content/import/build-with-ai/06-share-the-work/06.05-capstone-your-project-start.md`, headings "How your mentor will read it" and "Your five-minute walk-through"; roadmap O7 row ("Chapter 5.4; capstone walk-through"); brief success signal "Fellows explain their project's trade-offs without notes".
- observation: the rubric table has five rows (plan, this week, log, notes, write-up) and one pass rule; the walk-through and the explain-back are described but have no Met / Partly / Not yet row, no pass effect and no recorded result. The text even says an honest "I cannot explain it yet" is treated well, with nothing said about what that does to the pass. On the Ibrahim route the mentor "picks one part of your project, or of Ibrahim's": a fellow cannot explain without notes a queue app they never built, so the fellow's own understanding is not tested at all. Every gate and the capstone on this route is a text task a model can complete from the case alone.
- why it matters: O7 is the course's central claim and the integrity check for an AI-enabler course (`05-assessment-and-motivation.md`: "The defense is the integrity check"; "Do not design assessments that a model can pass without doing the work"). As written, the strongest evidence is optional and unscored, and mentors will each invent their own bar.
- required fix: add a sixth rubric row "Walk-through" (Met: explains the chosen part, its trade-off and one failure without notes; Partly: explains with prompts; Not yet: cannot say what the part does) and put it in the pass rule. For the provided route, make the explain-back about the fellow's own improved plan or own notes page (for example "defend your learning share and one dropped resource"), not Ibrahim's code. State how a fellow with a power cut or weak data does it (a short voice note answering the mentor's chosen question).

**S2-2. Capstone part 5 and O8: the provided route cannot evidence "more than one platform", and the rubric contradicts its own prompt.**
- location: 06.05, rubric row "5. Write-up" ("Met: Facts match the log, a second version, a three-part AI-use line"), `openquestion` prompt item 5 ("for Ibrahim, an honest version of his post"), the "Provided case" list item 5 ("Do not publish it"), and the modelAnswer "Part 5".
- observation: a fellow who does exactly what the Ibrahim prompt asks writes one honest post and can reach only "Partly" ("Honest, but not adapted"). The mentor key never asks for a second version. Brief outcome 8 and roadmap O8 say "for more than one platform".
- why it matters: the rubric and the task disagree, so two mentors will grade the same answer differently, and the provided route never collects the adaptation skill that 06.02 spends a chapter on.
- required fix: ask the Ibrahim route for the honest post plus a 100-word version for a second platform, and add that to the mentor key; or drop "a second version" from the Met cell for Ibrahim and say so in the row.

**S2-3. Gate 3 rubric row "AI checked" cannot be Met on the provided topic.**
- location: `03-learn-deeply-with-ai/03.08-checklist.md`, rubric row "AI checked" ("Met: An AI picture or claim checked against a named source"; "Not yet: Nothing checked") and the paragraph "If you prefer not to use your own topic, use the provided one: spaced review ... you need no other tool, file or connection"; modelAnswer "Mentor key for the provided topic".
- observation: the provided topic is built to need no AI tool, so there is no AI picture or claim to check. The mentor key quietly relabels the fellow's own timeline as the "picture ... checked against the 3.4 diagram". A fellow with no AI access gets "Not yet" on a row they cannot attempt, and the pass rule says no row may be "Not yet".
- why it matters: the fellows with the weakest access, the ones the provided case exists for, cannot pass gate 3 by following its instructions.
- required fix: change the row to "Checked against a source" and accept either an AI output or the fellow's own picture checked against 3.4 or a lecture page; or give the provided topic a short AI answer to check (an AI "review plan" with one wrong gap, printed in the chapter).

**S2-4. Gate 4 uses one rubric for two different tasks, so two mentors cannot agree on the Shahd route.**
- location: `04-daily-labs/04.07-checklist.md`, rubric table ("Small enough to finish", "Plan checked", "Break with a prediction", "Entry and safety"), the sentence "For Shahd's log, read each row as: did you find the problem...", the pass rule ("Entry and safety is one of them"), and the modelAnswer.
- observation: the rows are written for a fellow who ran a lab ("One question, four parts, about 30 to 45 minutes"). For Shahd's log the same rows must be reinterpreted as "found the problem, named the habit, gave a fix". The Shahd task has five separate asks (four problems, a day 3 rewrite with a prediction, what to do first about day 4), and the mapping to four rows is not given. Which row is "Entry and safety" for a reviewer, and what is "Met" when three of four problems are found?
- why it matters: gate 4 is the only evidence for O5 on the provided route; a mushy rubric here makes the capstone log review (also unclear, see S3-6) inconsistent.
- required fix: write a second four-row rubric for the Shahd route in the chapter (rows: problems found, habit named, fix works, day 3 rewrite with a prediction) with counts for Met and Partly (for example four of four problems found and fixed is Met, three is Partly), and keep "password handled" as the must-meet row.

**S2-5. Predict prompts are mostly not predictions.**
- location: the `predict` block in 22 Learn chapters and four Read chapters. Worst cases, with the sentence that gives the answer away:
  - `02.01`: "Was using an AI tool the mistake?" is answered two lines above by "The tool was not the problem in this story."
  - `05.02`: asks how many areas fit in one month; the worked example just above ends "So 2 of the 12 areas would be ready", same numbers.
  - `05.05`: "Can she reuse MIT code?" is answered by the licence table row and the diagram directly above.
  - `06.03`: "Does the post need an AI-use line?" is answered by "This course asks you to say it every time" two sections up.
  - `02.02`, `03.05`, `03.04`: the answer is stated in the section above ("Five made-up rows ... tells it everything", "makes mistakes less likely, not impossible", "Who does the recall").
  - `01.02`, `01.03`, `03.01`, `03.06`, `06.01`: the wrong option is a straw man the learner would never pick.
  - Normative "should" or "worth it" predicts graded as keys, which `04-interactive-playbook.md` says belong in an open question: `03.01`, `04.02`, `04.03`, `05.03`, `06.02`.
  - Every canvas `tryThis` also opens with the same prediction again (all 22 `data.ts` files).
- observation: about 19 of 26 predicts can be answered without any thinking, and in 24 of 26 the correct label is shorter than the other.
- why it matters: a prediction is only learning if the learner's naive guess can be wrong (`10-interactive-canvases.md`: "predict before you touch"; `04-interactive-playbook.md`: "Obvious answers"). Here the prediction trains the learner to guess what the course thinks, which is the opposite of the skill the course teaches.
- required fix: keep predicts only where a naive guess is plausible and unseen, as in `03.02` (will she write all five steps), `04.04` (cache stopped: fails or slower), `05.04` (which test lets the cache counter win), `01.05` (any weighting where Khaled wins). Move the answer-giving paragraph after the predict, or cut the predict. Replace policy predicts with a "which would you do first, and why" in the lesson text, not a graded item. Remove the duplicate prediction from every `tryThis`.

**S2-6. The multiple-choice sets carry test-wise cues.**
- location: all 68 MCQs. Examples: `01-ai-as-an-enabler/01.02-what-ai-does-not-know.md` item 1 ("Use the plan as it is, since it follows good teaching practice"); `02-your-ai-toolkit/02.05-quiz.md` items 1, 3, 5; `05-a-project-worth-six-months/05.06-quiz.md` item 4 (three options begin "The database, because"); `05-a-project-worth-six-months/05.04-slow-down-for-trade-offs.md` item 1 (the key is the only option that does not say "which fits ...").
- observation: counted by script, 65 of 68 correct options are shorter than the longest wrong option, 0 are longer, 25 are the shortest; 24 of 26 predict keys are the shorter label. 68 of 204 wrong options (33%) contain a justification clause ("since", "because", "as the AI ...") against 2 of 68 correct options (3%). A content-blind rule, "drop options with a since/because clause, then drop the longest", scores an expected 48% against 25% by chance. The audit's own length check passes because it only flags a correct option that is too long, so it does not catch the reverse.
- why it matters: `06-quality-gates.md` red team 3 ("the guesser") and the Assessment lens ("could a learner pass by guessing"). The pattern also teaches the learner that wrong answers sound self-justifying, which is not a skill.
- required fix: rewrite so every option is the same sentence shape; either all options carry a reason or none; make the key the longest, the shortest and a middle option in roughly equal numbers; put a plausible half-right reason on at least one distractor per item. Add a warning to `audit-course.mjs` for "key never the longest in a set of 5 or more". Re-run the blind key check after the rewrite.

**S2-7. Retrieval is blocked by module; the only cumulative review is not mixed.**
- location: `06-share-the-work/06.04-quiz.md` (summary says "mixed order of difficulty", title "which habit first?"); `02.05-quiz.md`, `03.07-quiz.md`, `04.06-quiz.md`, `05.06-quiz.md`.
- observation: 06.04 lists its five cases in module order (1 to 5: Amira missing context, Rami paste, Firas audio and notes, Ola lab, Tamer hours), so the position alone names the habit; module 6 has no item; no item needs two habits at once. The four earlier Check chapters test only their own module. The course teaches interleaving and spacing in 03.04 and then does not use either.
- why it matters: "which habit first?" is a discrimination task; a fixed order removes the discrimination. A course on spaced retrieval should practise it (`05-assessment-and-motivation.md`: Retrieval, spacing, interleaving).
- required fix: shuffle 06.04, add one item from module 6 and at least one that needs two habits (for example a client log that holds a key and an AI summary to verify); add one earlier-module item to each of 03.07, 04.06 and 05.06, and say in 03.07 that the repeated item is the spacing in action.

**S2-8. Time estimates do not match the work, and the mentor follow-up is not counted.**
- location: `estimatedMinutes: 25` in gates `01.06`, `02.06`, `03.08`, `04.07`, `05.07`, `06.06`; `estimatedMinutes: 120` in `06.05`; 25 for every Learn chapter; `course.yaml` `estimatedHours: 21`.
- observation: gate 2 asks the fellow to check up to twelve tools on their own pages (opens here, age, device, free tier, training setting, date) and write a six-job page; gate 3 asks for five angles, a recall test and a notes page (03.03 says Lina needed four evenings for DNS); gate 4 asks for a real lab (04.02 says 30 to 45 minutes) plus a five-part entry, a check and a push; gate 5 asks for opening or searching every first-week resource. Each gate also says the mentor replies with one or two questions that the fellow answers, which `04-interactive-playbook.md` says to count in the estimate. A Learn chapter has 2,200 to 2,500 raw words, a predict, a canvas and two long-stem MCQs; at second-language reading speed that is more than 25 minutes.
- why it matters: the brief promises "1 hour a day over 3 to 4 weeks" and `05-assessment-and-motivation.md` says a chapter is 10 to 25 minutes so that a power cut costs one short section. A task that cannot be done in its stated time breaks both, and fellows who fall behind blame themselves.
- required fix: time the chapters and gates with two or three fellows on a phone; split each gate into a do-task (build the page, run the lab) with its own estimate and a short submit step; add the follow-up round to the estimate; update `estimatedHours` and the brief's time statement.

**S2-9. Support never fades from module 1 to module 6, and the course never says it should.**
- location: all Learn chapters (a fully narrated worked example in each); gates `01.06` to `06.06` (each has a strong example, a weak example, a provided case, a full rubric, a pass rule and a mentor key); `06.05` (a complete worked package for Yara plus an answer column in the defence table); search of the course for "fade", "fading", "scaffold": no hits.
- observation: the scaffolding in gate 6 and the capstone is the same as, or heavier than, gate 1. No chapter has a faded worked example (steps 1 to 3 shown, the rest left to the learner) or a task with fewer hints. No chapter tells the learner that help is being reduced on purpose, as `05-assessment-and-motivation.md` ("Hand-holding that fades ... Say so in the chapter") requires. Difficulty rises through topic (labs, plans), not through reduced support.
- why it matters: desirable difficulty needs the support to come off once the learner can start; otherwise the learner who completed five modules is treated like the one who started the first. It also feeds S2-1 (the highest-stakes task has the most scaffolding and the least personal evidence).
- required fix: say in 04.01 and 06.01 that early modules gave full examples and these ones give less; in 05.03 and 06.05 show parts 1 and 2 of the example in full and parts 3 to 5 as a skeleton plus "what a good answer contains"; drop the weak example from gate 6; make one quiz item per later module a no-hint transfer to a topic outside the running example.

### S3

**S3-1. Two required open questions sit in Read chapters.**
- location: `01.01-set-the-scene.md` and `05.01-set-the-scene.md`, final `openquestion` blocks (`required: true`, `minWords: 25`).
- observation: "Which path did you take?" and "Think of one choice you made, what did it gain, what did it give up?" are generic reflections with model answers that are examples, not keys; they add two human-reviewed items per fellow outside any gate.
- why it matters: `04-interactive-playbook.md` limits `OPEN_QUESTION` to a gate or defence and warns against "a generic reflection"; mentor time is the scarce resource (target near 20 minutes per capstone).
- required fix: turn both into a `LearningLog` prompt (not reviewed) or set `required: false` and remove the model answer.

**S3-2. Canvases are mostly retellings, and the chapter tells the same story up to three times.**
- location: canvases `listen-then-read`, `plan-a-lab-with-ai`, `url-shortener-stop-a-part`, `lab-log-commit-push`, `week-plan-check-resources`, `disclose-ai-help`, `daily-lab-loop`, `commits-to-article` and chapters 03.05, 04.03, 04.04, 04.05, 05.03, 06.03.
- observation: in these chapters the worked example, the canvas steps and the "The canvas showed ..." paragraph carry the same numbers and events (for example 4 ms, 38 ms and error 500 in 04.04 appear in "Watch it run first", in the canvas and in "What the lab showed"). 18 of 22 canvases give the learner only "next"; nothing the learner does can change the result, so the canvas cannot fail the learner or show a delta.
- why it matters: duplicate explanation adds reading load on weak data and in a second language; a canvas that restates the prose is "decoration" in `04-interactive-playbook.md`.
- required fix: cut one of the three tellings in each named chapter (usually the post-canvas recap, keeping one sentence on what changed); where the model is a choice (which part to stop, which claim to check), let the learner pick the step and show the consequence; record a canvas QA report.

**S3-3. Cognitive load in 04.04, 05.04 and module 3 examples, and a name collision for "angles".**
- location: `04-daily-labs/04.04-watch-it-run-then-break-it.md`; `05-a-project-worth-six-months/05.04-slow-down-for-trade-offs.md`; `03.02` to `03.05` and canvases `close-it-and-recall`, `listen-then-read`.
- observation: 04.04 introduces containers, compose.yaml, a restart policy, HTTP 302 and 500, millisecond timings, five Docker commands and the predict-then-break method in one chapter, yet says "this module does not teach Docker in depth". 05.04 stacks a trade-off table, weighted scoring, five "angles" on the decision, the leading-question trap, the explain-back rule and SQL injection with parameters. Module 3 (which the brief says needs no coding) teaches study habits through subnetting masks (/24 to /26), DNS resolvers, TCP and UDP, routing tables and password hashing. In 05.04 "five angles" names a different list from the course's five angles in 03.03.
- why it matters: one new hard thing at a time (`05-assessment-and-motivation.md`); the domain should be the lesson's object, not its obstacle, for fellows from mixed backgrounds.
- required fix: cut 04.04 to cache then database, with the restart policy as a one-line note; split 05.04's code review into its own short step or move SQL injection to a Callout; use one everyday topic (a first-aid sequence, a tax rule) in the 03.02 try-it and canvas; rename 05.04's list ("five questions about a decision").

**S3-4. Undefined terms, idioms and long sentences for second-language readers.**
- location: terms: "API" (first used in `02.02` and as an area in `05.01`, never defined; also `03.06`, `05.02`, `06.05`), "deploy", "rate limits" (`05.01`, `05.03`), "endpoint" (`06.02` item 1), "framework" (`02.03`, `05.05`), "Docker" and "terminal" (`04.01` says "Docker Desktop" before saying what Docker is; "container" is only in the key-words table). Idioms: "stand out/stands out" (`01.01`, `01.05` heading and summary, `01.06`, `03.01`), "run up the bill" (the "API key" glossary definition in `02.02`), "second net" (`04.05`), "learned the hard way" (`06.03`), "fall apart" (`05.01` summary), "hidden in plain sight" (`06.01`). Sentences over 30 words in lesson prose (17), for example `05.02` (41, 38, 36 words), `05.01` (39, 31), `04.02` (40), `04.04` (37), `01.02` (38), `01.05` (38), `05.04` (34), `05.05` (33, 33), `06.05` (34, 31).
- observation: `03-authoring-standards.md` asks for about 20 words, defined jargon and explained idioms.
- required fix: add a `GlossaryTerm` on first use for each term; replace the idioms ("stands out" becomes "is noticed" or "is different from the rest"); split the 17 sentences.

**S3-5. Several quiz items test the paragraph above or have no real alternative; two have key or wording problems.**
- location: near-copies of the lesson: `02.02` item 1 (Anas, "formula plus five made-up rows" is the worked example), `02.04` item 2 (Nada: second tool plus saved prompt is the habit list), `03.02` item 2 (Layan: "re-study the gaps" is the chapter's third mistake), `04.02` item 2 (Mo'men: the chapter's power-cut paragraph), `04.04` item 2 (Karim: the chapter's first rule), `06.02` item 2. One option dominates: `01.05` item 2 (applicant C beats A and B on every named criterion, so nothing is weighed). Domain not taught plus a structural tell: `05.04` item 1 (microservices; the key is the only option not claiming "fits her"). Wording: `06.03` item 1 (stem says AI wrote a first version of her "closing paragraph"; the key says "drafted my summary"). Key detail: `04.05` item 1 (the key says "Only the entry, after he lists .env in his .gitignore" while the chapter's own commit includes `.gitignore`).
- observation: these items measure recognition of a sentence just read, not application to new evidence. The strongest items in the course do the opposite (`03.07` item 1, all five of `04.06`, `05.02` items 1 and 2, `05.06` item 1, `06.04` items 2, 4, 5).
- why it matters: `06-quality-gates.md` anti-slop list: "A quiz that tests the paragraph above".
- required fix: rewrite each as a small table or fact list with a case that was not narrated in the chapter, as the strong items do; fix the 06.03 and 04.05 wording.

**S3-6. Rubric gaps that let two mentors disagree.**
- location: `03.08` row "Notes page" ("Own words, parts missing": how many?); `06.05` row 3 and its modelAnswer ("Ibrahim: every problem fixed" against a key that lists three problems plus "credit also" for two more, so the count is unclear); `01.02` canvas `ai-missing-context` step 3 against gate 1 row "What the AI does not know"; every gate: "That reply is part of the gate" with no statement of what a good reply is; `06.06` (the roadmap lists "a look back at the gate 1 answer" as gate 6 evidence, but the look-back is in the ungraded learning log and not in the rubric).
- observation: the canvas files "hosting already paid" under Private and "cash at the counter" under Local, which does not match the chapter's definitions (private data is files, code, messages and numbers; local and recent is what costs what this month and which tools open where you live), and gate 1 requires a fact under each of the four kinds. The follow-up reply is described in all seven tasks but is in no pass rule.
- why it matters: inter-rater agreement and the "follow-up step" requirement in `05-assessment-and-motivation.md`.
- required fix: name the required counts in each Met and Partly cell; list Ibrahim's problems explicitly in the key (required: no break lab, password, empty notes; credited extras: unexplained AI code, vague messages); add "reply answers the mentor's question with evidence" to each pass rule; correct the canvas classification; add the look-back as a rubric row in 06.06 or drop it from the roadmap.

**S3-7. The Ibrahim capstone route is hard to achieve and partly ambiguous.**
- location: 06.05 "Provided case" list items 2 and 4, rubric row 2 ("a recall test and its result"), "Plan for about 120 minutes".
- observation: for Ibrahim the fellow must write five angles on APIs and a recall test "with its result", but no source material is supplied and nobody ran a test; item 4 asks for a notes page "as if you were Ibrahim" for a lab the fellow never ran. The 120 minutes cover five written parts, roughly 800 to 1,500 words typed on a phone.
- why it matters: the route exists so a fellow with only a phone can finish; as written, a fellow can read it as needing outside learning on a weak connection.
- required fix: state exactly what the provided route produces (a plan for the five angles, not performed; three recall questions, not a result; the notes page for day 5 from the information in the case) and give a realistic time.

**S3-8. Link-only and voice-note answers conflict with `minWords`.**
- location: 06.05 ("If writing is hard today, you can add a voice note link and keep the written part shorter" with `minWords: 250`); `01.06`, `02.06`, `03.08`, `05.07`, `06.06` `urlHint` ("a voice note your mentor can open").
- observation: `04-interactive-playbook.md` says a link-only answer stays a draft unless `minWords: 0`. The capstone sentence invites exactly that. `allowSpeechInput: true` helps dictation but does not cover a link-only voice note.
- why it matters: the fellow with the least data follows the instruction and then cannot submit.
- required fix: either set `minWords: 0` where a voice note is allowed and let the mentor judge completeness, or delete the voice-note sentence and tell fellows to dictate with the microphone key.

**S3-9. Diagrams that restate the paragraph, and two fixed templates.**
- location: diagrams in `01.03` (responsibility chain), `03.06` (three-level notebook tree), `04.01` (watch against lab), `06.02` (log to original to platforms), `05.03` (loop) restate the sentence above them. All 29 diagrams are followed by the same "What to notice ... The takeaway" frame. Every Learn chapter ends with "Where it goes wrong" and "The first mistake ... second ... third ... fourth".
- observation: the diagrams that argue (for example `01.02` dotted "never reach it", `02.02` every path to one box, `02.03` three exits to the fallback, `04.04` two arrows to the database) show it is possible.
- why it matters: a diagram that restates the prose is a defect; fixed frames across 22 chapters make the voice sound like a template (`03-authoring-standards.md`).
- required fix: cut or rebuild the five restating diagrams; vary the closing frame (a question, a single failure story, a "if you remember one thing") across chapters; shorten "Where it goes wrong" to the mistakes that the quiz tests.

**S3-10. Yara's timeline is inconsistent.**
- location: `03.03` (Yara learns caching in her week), `04.01` to `04.04` (she runs and stops the cache in lab days 1 to 4), `05.02` ("Before Yara wrote her plan"), `05.03` and `06.05` (caching is week 7 of month 2; "Her failure case became lab day 4").
- observation: she learns and breaks caching in modules 3 and 4, then writes the plan in which caching comes in week 7, and lab day 4 (inside the first 17 days) becomes a week 7 angle.
- why it matters: a careful learner sees that the "plan" followed the work, which undercuts the lesson that the plan comes first.
- required fix: pick one order; simplest is to say in 05.02 that Yara is writing the plan for months 2 to 6 after a first month of exploration, and to move the capstone's week 7 reference to "a week of month 2".

**S3-11. The capstone hands over a near-complete template.**
- location: 06.05 "Worked example: Yara's Qasir" (plan table, ten lab day titles, notes outline, the exact AI-use sentence).
- observation: a fellow building a link shortener, a very common portfolio project and the course's own example, could copy the whole package; the lab titles alone are a ready sequence.
- why it matters: red team 1 ("the copier"), and `06-quality-gates.md` IP check.
- required fix: show parts 1 and 3 in full only; give parts 2, 4 and 5 as outlines; rely on the scored walk-through (S2-1) as the control.

**S3-12. No named human contact and no "when you are stuck" path.**
- location: course-wide (search for "wellbeing", "harass", "coordinator": no hits); gates ask fellows to check tools in Gaza on weak data with no word on who to ask when a tool will not open.
- observation: `05-assessment-and-motivation.md` says every course names a person for wellbeing and harassment; the course names none.
- why it matters: the fellows are the audience this is written for.
- required fix: add one line with the named coordinator and a phone-friendly way to reach them in 01.01 and 06.06 (the platform may supply the text; check with the delivery lead).

**S3-13. O4 audio is not assessed.**
- location: brief outcome 4 and roadmap O4; `03.05`; `03.08` rubric (no audio row); `03.07` items 2 to 4.
- observation: "Turn sources into an audio overview" is optional in the chapter and in the gate; only two MCQs (`03.05` item 1, `06.04` item 3) touch the "check the audio against the page" skill.
- why it matters: an outcome stated as observable has no observation.
- required fix: restate O4 in the brief and roadmap as "can run the listen, read, check routine when audio is available" and add a gate 3 row that accepts a claim checked from either an audio overview or a text-to-speech summary.

### S4 (polish)

- `03-learn-deeply-with-ai/03.07-quiz.md` item 1: the key is the best answer, but "helped more than rereading" over-reads one person over two weeks; add "in his case" to the key.
- `05-a-project-worth-six-months/05.05-learn-from-open-source.md`: no explicit "Worked example" heading; the Yara path is told in prose, not in steps.
- canvas `pick-a-tool-for-the-job`: scores a kind of tool from 1 to 5, close to the brief's non-goal of rankings; keep the "judgement, not measurement" limit visible on the page, not only in `limits`.
- the gate model answers begin "Mentor key for ..."; `OpenQuestion.sampleAnswer` is "mentor-only unless revealed post-submit" (`server/src/shared/blocks/open-question/schema.ts`). Confirm whether the key is shown to the learner after submission and, if so, drop the word "Mentor key".

## What works

- Every Learn chapter opens with a named fellow paying a real cost (Khaled's unexplained prices, Ahmad's lost month, Mahmoud's pasted list, Lina's 9 of 20, Fadi's 30 hours of video). The failure comes first and the habit second, which is the decision-not-definition shape asked for.
- Worked examples reason out loud, step by step, with numbers a learner can redo (Yara's 192 hours, the 20 + 15 + 40 minute cuts, Nada's three paste decisions). Preserve the "write your guess first" and "check one thing against the page" moves.
- The strongest assessment items are small evidence puzzles: `03.07` item 1 (4 against 8 over two methods), all of `04.06` (numbered facts, a commit table, an AI answer to check), `05.02` items 1 and 2 (hours arithmetic), `05.06` items 1 and 3 (an AI claim, resources of different ages), `06.04` items 2, 4 and 5. "Check the AI's output" appears in at least eight items across five quizzes, well past the four the brief asks for.
- Gate design is sound: the pass condition is stated before the task, a strong and a weak example on a different case, a provided case that needs no laptop, a mentor-key modelAnswer that starts with the provided case, and named common wrong answers (the Shahd key, the Rasha key and the Hiba key are the most precise). Gate 5's rubric is the model: the sums are checkable.
- Honesty about evidence: study limits are stated beside every finding, the course's own rules (six months, five angles, the rule of thumb for spacing) are labelled as the course's, scenario numbers are labelled as the scenario's own, and I found nothing from the "Do not say" table.
- Access is treated as normal, not as drama: two tools per job, a browser path, a fallback for every step, data cost stated for downloads, a short "write three lines on the phone" path for a power cut.
- Canvas data and chapter text agree to the digit; the slider model and the three factor canvases are correct and teach one claim each. No em or en dashes anywhere in the 40 chapters or the 22 canvas files.

## Recommendation

**Revise.** There is no S1 and the course is close in craft, but nine S2 defects and seven dimensions at 3 fail the G5 thresholds. Fix in this order:
1. The rubric and task mismatches on the provided-case routes (S2-1, S2-2, S2-3, S2-4), because a fellow with only a phone cannot currently pass, and the walk-through (O7) is unscored.
2. The assessment set (S2-5, S2-6, S2-7): rewrite or cut the predicts, rebalance option wording, shuffle and extend 06.04, then re-run the independent blind key check with a different model family or a person.
3. The honest time estimate and the fading of support (S2-8, S2-9), then the S3 items.

Re-review only the changed chapters, gates 3, 4 and the capstone, the 06.04 and Check chapters, and the canvases whose predicts change. Two rounds at most (`06-quality-gates.md`, Revision loop).
