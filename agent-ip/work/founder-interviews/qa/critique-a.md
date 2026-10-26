---
artifact: critique
course: founder-interviews
reviewer: critic-a
review_type: pedagogy, assessment, canvas
version: 1
artifact_under_review: courses/founder-interviews/
lens: pedagogy | assessment | canvas (with explanatory depth and visual explanation)
scorecard_average: 3.71
blocking_defects: 7
recommendation: revise
---

# Critique A: The Founder Interview (pedagogy, assessment, canvas)

## What I reviewed

- `courses/founder-interviews/course.yaml` and all 41 chapters, read in full (7 modules, 19 Learn chapters, 7 quiz chapters, 7 gates, 1 capstone).
- The brief and the curriculum roadmap.
- The 19 canvases the chapters embed: `data.ts` and `spec.md` for each, plus the model tests that exist for them in `frontend/tests/unit/canvas/` (`percent-from-what`, `how-much-was-yours`, `decide-and-measure`, `factor-model`, `founder-interviews-c-canvases`). I did not render the canvases in the reader, so mobile, keyboard and dark-mode behaviour is not verified here.
- The research dossier, only to check taught claims. About 20 claims were checked (Bangerter 62 interviews and 23 percent; probe counts; lie-detection near chance; faking and follow-ups; the 122-student weakness study; Kruger and Dunning; the 213-candidate coaching study; video-interview review of 12 studies; accent studies; anxiety; curse of knowledge and the email study; hindsight; pauses and fluency). All match the dossier. I found no invented research.
- The platform schema for `aiinterview` and the interview service (`server/src/shared/blocks/ai-interview/schema.ts`, `server/src/services/ai/interview/`), because two defects below depend on how a drill behaves.
- I did not open `context-packs/`, `decision-log.md`, `run-log.md`, `routing.yaml` or the other files in `qa/`.

Commands and scripts run:

- `node agent-ip/scripts/audit-course.mjs courses/founder-interviews`: 41 chapters, 46,183 prose words, "Needs work: 0". Every Learn chapter has a canvas; no em or en dashes (I also grepped the chapters and all 19 canvas folders).
- Throwaway scripts in `C:\Users\Zeeshan\AppData\Local\Temp\claude\D--Projects---Community-buildment-founder\f22aa6b1-4823-4f85-96c6-7fd522b4967d\scratchpad\crita\` (`measure.cjs`, `pat.cjs`, `pat2.cjs`, `guess.cjs`, `dup.cjs`). They parse every quiz MCQ (69) and every predict (26) and measure option length, position, digits, sentence form, vague words and stem overlap. Outputs are in `out.txt` and `items.json` in the same folder.
- I checked the factor totals and slider rules by hand against `data.ts` and the tests.

One honest limit: the keys are in the source files I read, so my key check is a reasoned re-answer from each stem's facts, not a blind pass. The "re-answered blind by a person" step in the quality gates is still open.

## Headline

This is a well-researched, humane and unusually specific course. The prose is deep, the cases are concrete, the numbers I checked are right, and the "I did not measure that" ethos is consistent from the first scene to the capstone. It is not ready. The assessment layer has systematic form tells, so a learner can pass many items without reading. Three of the seven outcomes are graded in a way that does not match their verbs. The capstone's AI interview cannot do what the chapter says it does, and the keyless path cannot finish the capstone. Hadeel's material can complete every gate with no evidence about the learner's own work. These are fixable without rewriting the chapters: the fixes are in the assessment items, the gate and capstone design, one drill configuration and one canvas rule. Recommendation: revise. No S1 found; seven S2 defects block the gate.

## Scorecard

Scale 1 to 5. Instructor alignment is not scored: the roadmap frontmatter has `instructors_reviewed: []` and `drafted_before_roadmap: true`, and there is no `roadmap-confirmation.md` in the work folder. G2B is open, which is a gate problem in its own right. The average is over the 21 scored dimensions.

| # | Dimension | Score | Reason |
|---|---|---|---|
| 1 | Outcome alignment | 3 | Every chapter serves an outcome, but O4, O5 and O6 are spoken or situational outcomes graded only in writing (A-03). The capstone AI path cannot reach 3 of 8 focus areas (A-01). The keyless path has no card to read (A-02). Hadeel's path evidences nothing about the learner (A-04). |
| 2 | Domain specificity | 4 | Samer, Leen, Yazan, Nour, Tala and Hadeel are specific, with real constraints (power, data, second language). Examples span developer, designer and operations roles. Some quiz casts are generic and recycle names across roles (A-21). |
| 3 | Depth over coverage | 4 | Three teaching chapters per module, each on one decision, with a worked weak-versus-strong pair. Seven modules is a lot for a stated 3 weeks (A-12). |
| 4 | Prose quality | 4 | Short sentences, defined terms, a human voice, no slop phrases found. Held back by templated structure and paraphrased repeats (A-19) and a few undefined business terms (A-24). |
| 5 | Chapter structure | 4 | Scene, idea, research, predict, canvas, worked example, diagram, mistakes, practice, check. Complete and predictable, but so rigid that all 19 Learn chapters share one skeleton (A-19). |
| 6 | Interaction purpose | 3 | Density is within budget. Evidence is weak: the 26 predicts are guessable (A-05), 12 of 19 canvases are replays of the chapter's own dialogue (A-15), and static "what changed" text duplicates and spoils the canvas (A-17). |
| 7 | Assessment quality | 3 | Keys are mostly sound and every option has an explanation. But the correct option carries systematic form signatures (A-05, A-06), the AI-check items are always wrong (A-09), several items test the paragraph above (A-10), and a handful of keys are arguable (A-08). |
| 8 | Difficulty calibration | 3 | Support does not fade: every gate repeats the same scaffold (A-14). Time estimates are optimistic and over the brief's own range (A-12). The prerequisite for the capstone bank is under-built (A-13). |
| 9 | Cognitive load | 4 | One idea per chapter, predictable layout, at most three interactions. Chapters are long for second-language readers on phones, but the load is well managed. |
| 10 | Prerequisite integrity | 4 | Later chapters cite earlier ones correctly. Gaps: gate 2 asks for two stories when the bank has one, and the five-story bank first exists in the capstone (A-13). |
| 11 | Technical accuracy | 3 | Arithmetic and research are right. Defects: the decision rule contradicts Mais's own line (A-07), the capstone drill claim is false (A-01), Layla's attribution needs an unstated fact (A-20), and the feedback card described does not match the platform's schema (A-22). |
| 12 | Production-grade coverage | 4 | Scored for a soft-skills course: privacy, data-use rules, consent, honesty rules and mentor loop are all present. No monitoring of mentor turnaround, but that is outside content. |
| 13 | Security and integrity | 4 | Privacy line in every drill, counts-not-copies rule, keys and rubrics server-side (`sampleAnswer` and `rubric` are stripped from the client). Drill context instructions are thin for three drills (A-23). |
| 14 | Accessibility | 4 | Provisional: diagrams have prose legends, text-only practice, speech input on every open question, voice-note link. Canvas keyboard and mobile behaviour not verified in the reader. |
| 15 | IP protection | 4 | Rubrics and keys are server-only; no hidden test material. Hadeel's full facts and every gate's complete exemplar are public by design, which feeds A-04. |
| 16 | Variant distinctiveness | 5 | Not applicable (no variants in version 1). |
| 17 | Continuity | 4 | Samer, Leen, Yazan, Karam, Mais and Nour are consistent across chapters and canvases. Defects: reminders ownership for Hadeel, "ten weeks" versus a 3-week course, canvas option names (A-21). |
| 18 | Learner agency and curiosity | 4 | Learners work on their own resume at the end of every Learn chapter and in every gate. Predicts and canvases give little real choice (A-15, A-16). |
| 19 | Instructor alignment | n/s | No confirmation record; cannot be scored. |
| 20 | Interactive canvas quality | 3 | Models are correct and tested, claims are single and written in specs, every Learn chapter has predict, canvas and a later check. Weaknesses: one slider rule contradicts the chapter (A-07), 12 of 19 are step-through replays (A-15), four identical authored-weight factor widgets (A-16), duplicate spoiler text (A-17). |
| 21 | Explanatory depth | 4 | Mechanism, worked example, trade-off, failure mode and debugging path are in the prose; the audit passes with margin. Some depth is spent re-telling the same example (A-19). |
| 22 | Visual explanation quality | 3 | 27 Mermaid diagrams, all `flowchart TD`, all with prose legends. Roughly 7 restate a numbered list from the prose (A-18). |

Average of the 21 scored dimensions: 78 / 21 = **3.71**. Seven dimensions score 3 (1, 6, 7, 8, 11, 20, 22). No dimension is at 1 or 2. The threshold (every dimension at least 4, average at least 4.3, zero S2) is not met.

## Defects

Severity counts: S1 0, S2 7, S3 16, S4 3.

### S2: must fix before publish

**A-01 | S2 | The capstone AI interview cannot cover the eight focus areas it claims to**

- Location: `07-the-full-interview/07.04-capstone-full-interview.md`, "Part 3" paragraph and the `aiinterview` fence (`maxTurns: 20`, `whyDepth: 3`, eight focus areas); also the roadmap's "one full interview across all eight focus areas".
- Observation: the chapter says the interview "covers all eight focus areas, up to 20 answers". In the service, one thread is the opening question plus `whyDepth` follow-ups before the interviewer moves to the next focus (`planNextQuestion`, `prompts.ts` lines 64-72). With `whyDepth: 3` each area takes 4 answers, so 20 answers reach 5 areas: ownership, impact, five-whys, resume, best-technical. Storytelling, case-study and strengths-weaknesses are never asked. Hadeel's own sample transcript shows one why per area and her card says "The case question was not reached".
- Why it matters: O4 (case aloud) and the strength half of O6 have no AI evidence on this path, yet rubric line 3 gives "Met" for running the interview at all. The chapter makes a false statement about the product, and learners who run the drill get less than the course promises.
- Required fix: make the numbers add up. Either split Part 3 into two 16-turn drills (each four areas at `whyDepth: 3`), or keep one drill at `whyDepth: 1` or `2` and drop areas already drilled, and say honestly which areas it covers. Add a rubric row that the case and strength/weakness answers are present on both the AI and written paths. Correct Hadeel's transcript length to match whatever depth you choose.

**A-02 | S2 | The written fallback cannot complete the capstone: Part 4 needs a feedback card a keyless learner never receives**

- Location: `07.04` "Part 4: reading the feedback" and rubric line 4 (pass rule requires line 4 Met); `07.05` learning log item 4 ("In your capstone, which line of feedback did you question?"); `07.01` and `07.02` (method built on a card and on comparing cards across drills).
- Observation: the brief says the fallback "completes the same gate". For the capstone, a learner with no key and their own material has no card, no transcript from an interviewer and no flags. Part 4 says "For each line on your card, find your own words". The written version supplies six questions and expected whys, but nothing that plays the role of feedback. The only card available is Hadeel's.
- Why it matters: the pass rule requires line 4 to be Met, so a keyless learner cannot pass with their own material. O7 (read feedback critically, find gaps) has no path for them. This breaks the brief's "never require paid credit to finish" promise at the final gate.
- Required fix: give the written path its own feedback object. For example, a provided five-flag self-check sheet applied to the learner's six written answers, with the mentor's follow-up questions counted as the card, or a short mentor-written card with the same flag names. Rewrite Part 4, rubric line 4 and 7.5 log item 4 so both paths can reach "Met", and say so in the pass rule.

**A-03 | S2 | Spoken and situational outcomes are assessed only in writing**

- Location: roadmap outcomes O4 ("aloud"), O5 ("under a minute", founder version), O6 ("nerves, video calls and time to think"); gates `04.06`, `05.06`, `06.06`; capstone `07.04`; every `openquestion` (`urlLabel: "Voice note link (optional)"`, `minWords` 150 to 250).
- Observation: the verbs are "work through aloud", "say in under a minute", "take time to think on a video call". The evidence is a text answer. The only spoken element is an optional voice-note link, and the capstone's spoken mock is an "optional step". Chapter 6.4 itself says text practice "does not train your pace or your voice". The 6.5 and 6.6 items on pauses and check questions test knowing a sentence, not saying it. Also, an answer that is link-only would stay a draft, because every open question sets a `minWords` floor (the playbook requires `minWords: 0` for link-only).
- Why it matters: the assessment level does not match the outcome level (validation checklist: "The assessment level matches the outcome level"). A learner can pass gates 4 to 6 without saying one sentence aloud.
- Required fix: choose one of two honest options. (a) Require one recorded audio answer, 60 to 90 seconds, at gate 5 (founder version) and in the capstone, with a rubric row ("plain words, one idea per sentence, a pause or check question used, under a minute"), and set `minWords: 0` on that submission so a link-only answer reaches the mentor. (b) Reword O4 to O6 to say "write and rehearse" and move the spoken practice to a clearly labelled optional extension. Option (a) is closer to the brief.

**A-04 | S2 | Hadeel's material can complete every gate and the capstone with no evidence about the learner**

- Location: gates `01.06` to `07.05` (every task, learning log and "If you prefer not to use your own work" paragraph); capstone `07.04` ("Choosing Hadeel's material is not an easier path. You still do all four parts").
- Observation: Hadeel's resume, numbers, decisions, weaknesses and the AI card are fully provided, and each gate also supplies a complete exemplar of a different fellow. Using Hadeel, a learner can pass modules 1 to 7 by rearranging provided facts. The five-minute defence questions ("Which part of this was yours alone?", "Where does that number come from?") presuppose the learner's own work and cannot be answered about a fictional person.
- Why it matters: the brief's success signal is "each fellow has five stories with numbers and a resume where every line has an answer two whys deep". With Hadeel nothing about the fellow is evidenced, and the mentor cannot tell. This is the copier red-team scenario.
- Required fix: keep Hadeel as scaffolding, not an equal alternative. Allow her in at most two gates (for example 1.6 and 5.6) and in the 7.2 card exercise. Require at least two of the five capstone stories and one resume rewrite to be the learner's own, with the mentor defence run on an own line. For learners who truly have no story, route them to the "small project around a need" path in 7.2 before the capstone, not to Hadeel.

**A-05 | S2 | The predicts are guessable: the correct label is the shorter one in 26 of 26, and several answers sit in the text above**

- Location: all 26 `predict` fences (one in each Read chapter and each Learn chapter, plus 7.1 and 7.2).
- Observation (measured, `measure.cjs`): the correct option is the strictly shortest in 24 of 26 and tied for shortest in the other 2. All are two-option items. The correct option is in slot 0 in 16 of 26 (62 percent), and in 6 of the 7 Read-chapter predicts. In almost every item the correct option is the modest, honest or founder-realistic one ("No, about half", "The reason you had at the time", "A real weakness with a plan"), so a learner who has absorbed the course's values wins by tone. Six answers are in the paragraph or scene directly above the predict:
  - 1.2: the preceding paragraph lists "usually", "whenever", "always" as the giveaway, and the predict asks whether "Whenever dispatch complained..." is a story.
  - 1.3: the chapter opens with Fadi asking "Who wrote the filter code?" and the predict asks whether the founder asks a check question.
  - 2.1: the stem states that the sheet records the packed times and asks whether Leen could have found a before number.
  - 2.3: the paragraph above says "'I never measured it' and 'there is no number' are not the same thing" and the predict asks the same thing.
  - 3.3 and 5.4: the paragraph above states that a true reason holds and that the honest answer is safer.
  - 7.2: the answer is in 7.1; the explanation says "In 7.1 Tala said..."
- Why it matters: the content audit only looks for "longest is correct", so it does not catch this. A predict that can be answered by length or by recall of the sentence above produces no evidence and teaches learners to skip the prediction, which is the step the canvas contract depends on.
- Required fix: rewrite the set with three options where the playbook allows it, balance label lengths and slot (about a third in each), and make the plausible wrong option a position a half-informed learner would defend (for example, in 2.1 a distractor "Yes, but only if she had asked the shop to track it"). Move each predict to before the paragraph that answers it, or change the question to a quantity or an ordering the text does not state. Re-run `measure.cjs` and aim for no more than about 60 percent of predicts having the correct label as the shortest.

**A-06 | S2 | MCQ keys have form signatures that let a learner pass without reading**

- Location: the 69 `quiz` MCQs, concentrated in the module quizzes (`01.05` to `06.05`) and `07.03`.
- Observation (measured): the correct option is never the longest (0 of 69, where chance would give about 17), so "drop the longest" is a free eliminate. Beyond length:
  - The correct option is the only one containing a figure in 15 items. When any option has a digit (39 items), the key does in 35.
  - The correct option is the only multi-sentence option in 19 items.
  - Vague or absolute intensifiers ("always", "whole", "best practice", "very", "great", "simply", "nothing", "obvious") appear in 72 of 207 distractors and in 3 of 69 keys.
  - In 7 items the longest distractor is at least 15 percent longer than the key, because distractors are padded with filler. Worst: `02.05` Reem complaints (key 66 characters, longest distractor 95), `03.05` Tamer AI advice (57 versus 83), `06.05` Duaa strength (104 versus 144).
  - A crude form-only guesser that prefers an option with a figure, a mid-text sentence break and no vague word, and ignores meaning, gets 62 percent of the 69 right (chance is 25 percent). Adding overlap of words with the stem takes it to 75 percent, and with overlap included the 7.3 mixed review is 5 of 5.
- Why it matters: this is the guesser and skimmer red-team. The module quizzes are meant to be the evidence that a learner can apply the method, and a test-wise learner passes them by style. It also plays against the chapters: "the answer with the numbers and the source is right" is the course's lesson, so the keys are easy to find.
- Required fix: write distractors in the same register as the key. Give wrong options figures, sources and a first sentence of context, but with a wrong window, an unsupported source, a mixed baseline or the wrong owner. Stop padding wrong options with filler. Put the figure-bearing option in the wrong slot in about a third of items. Stop making the key never the longest: aim for the key ranking anywhere from first to last by length across a set. Re-run `measure.cjs` and `guess.cjs`; target a form-only guesser near 35 percent.

**A-07 | S2 | The "set the line first" rule is applied three different ways, and the canvas contradicts Mais's spoken answer**

- Location: `04-case-questions-aloud/04.04-decide-and-measure.md` (Mais's spoken line, the three-answer rule, quiz Q1 Hiba), `packages/learning-ui/src/canvas/decide-and-measure/data.ts` (`decide`), `04.05` Q3 (Mazen), `04.06` Anas example and Hadeel mentor key.
- Observation: Mais says "If it reaches 35 or more, I would keep it". The canvas input is labelled "Rise you need to keep it" (5 points, line 35). The model keeps only when `gap >= 0 && gap >= swing`, so with swing 2 a result of 35 is "Too close to call" and keeping needs 37, a rise of 7. The chapter's own rule text ("at least one normal swing above the line") matches the model but not Mais's sentence or the input label. In 4.6, Anas's line is 440 but his keep threshold is 460, and the Hadeel key says "250 or more to keep" as the line. The word "line" means the target in some places and the keep threshold in others.
- Why it matters: this chapter's one claim is "decide the line before you look". A learner who sets Mais's line, enters 35 and is told "too close to call" cannot tell which rule to say in an interview, and the graded keys (4.4 Q1, 4.5 Q3) depend on the house rule.
- Required fix: pick one vocabulary. Suggested: "target" (the rise you hope for), "keep if at or above target plus the normal swing", "change course if below target minus the normal swing", otherwise "keep watching". Rewrite Mais's line, the input label, the canvas `intro` and `tryThis`, Hadeel's key and the 4.6 example to match, and add a test for a result exactly on the target. State once that this is the course's rule of thumb, not statistics.

### S3: fix before publish or track

**A-08 | S3 | Several graded items have keys that are arguable or rest on facts the stem does not give**

- `06.05` Q3 (Osama, testing experience): the stem says he knows the team writes only automatic tests, yet the key asks him to ask "automatic or by hand?". Chapter 4.2 says to ask only when the answer would change your plan and otherwise to state an assumption. The key contradicts the taught method. Better key: state the assumption and lead with the bakery tests.
- `03.04` Q2 (Hiba): the key says the line "passes all five checks", but the stem gives no fact for check 5 (what she would change). The learner has to assume it.
- `03.05` Q5 (Ruba): "which check does the line fail?" The key is check 4, but "brought 42 people" has no before either, so check 3 also fails. Two defensible answers.
- `03.04` predict (Karam's number): the explanation says that if nobody could confirm the figure, leaving it out would also be honest, so the item is not a single key. The same chapter's diagram says "name the source, or cut the number".
- `04.04` Q1 (Hiba, line 24, result 22, swing 1): the key is "change course", although the rate rose from 20 to 22, two swings above the starting point. Reasonable people could say keep watching. It depends on A-07.
- `05.05` Q5 (Rana, "what would you change?"): the key "I would stop two orders taking one slot. I check the sheet by hand now." names the goal, not a change. Chapter 1.4 says a real change is specific ("I would watch dispatch use it before I ship").
- `07.03` Q3 (Mustafa case): chapter 4.6 says two careful people can give different good answers to a case; the key picks one. Reword the stem to ask which answer follows the five-part shape, and make every distractor visibly miss a part.
- Required fix: repair each stem or key as listed, or move the arguable ones to open questions per the playbook ("opinion goes to an open question").

**A-09 | S3 | In all six "check the AI's answer" items the AI is wrong**

- Location: `01.05` Q4, `02.05` Q4, `03.05` Q2, `04.05` Q2, `05.05` Q4, `06.05` Q1.
- Observation: each item shows an AI suggestion (invented leadership, invented 40 percent, strategic reason, ten-tactic list, serverless jargon, perfectionist) and asks what is wrong. Five of the six also include the distractor "it is right because..." (all except `01.05`). Chapter 7.2 teaches that rejecting a whole card because one line was wrong is also a mistake.
- Why it matters: learners learn "distrust the AI", not "check each line against your own words". Pattern recognition alone solves all six.
- Required fix: make at least two of the six items ones where the AI's suggestion is mostly right and the correct move is to keep one line and question another, and where the stem gives the evidence needed to tell which.

**A-10 | S3 | Several items test the scenario above rather than transfer**

- `06.04` Duaa video freeze: near copy of Nour's freeze, down to the sentence the chapter models.
- `07.02` Q1 (Shahd): the Tala card in 7.1 and 7.2, one name changed.
- `04.05` Q4: asks which is "an option he could start on Monday", which is the 4.3 definition read back.
- `05.04` Wael: the same move as Yazan's rung 5.
- `01.02` Q1: the coats story is also the gate 1 exemplar and its model answer.
- Required fix: for each, change the surface and the structure: a different failure, a different role, a missing fact the learner must spot, or a two-step case. Module checks `x.5` are the better pattern; the inline pair in each Learn chapter should follow it.

**A-11 | S3 | Gate pass rules and rubrics are inconsistent and have no calibration anchors**

- Location: "How your mentor will read it" tables in gates 1 to 7.
- Observation: pass rules differ without reason: gates 1 to 4 and 6 need "no Not yet and at least three Met" (of 5, 4, 4, 4, 4), gate 5 needs at least two Met of four, the capstone needs lines 1 and 4 Met, and 7.5 needs three of four. The `modelAnswer` mentor keys describe what Met looks like for Hadeel and give "Do not accept" traps, but there is no sample Partly or Not yet answer, and several rows overlap (for example M3 "Audit: Some lines or some checks are missing" versus "Only one line is audited").
- Why it matters: two mentors will not agree on Partly versus Not yet, and the pass count changes with the number of rows, not with quality.
- Required fix: one pass rule for every gate, expressed as a count that scales (for example "no Not yet and at least 75 percent Met"). Add one short Partly and one Not yet exemplar to each mentor key, drawn from the weak answer already in the gate text.

**A-12 | S3 | Time estimates and word floors are optimistic**

- Location: `course.yaml` (`estimatedHours: 16`), roadmap Shape and open decision 1, Learn chapters (25 min), gates (30 min), capstone (80 min), `minWords` on the open questions.
- Observation: 975 minutes is 16.25 hours, above the brief's 3 weeks at 3 to 5 hours (9 to 15). A Learn chapter has about 1,450 words, a predict, a canvas, two quizzes and a "Try it on your own resume today" task. For a second-language reader on a phone that is more than 25 minutes on its own, and tasks such as "write the five answers for every line of your resume" (3.4) are 30 to 60 minutes alone. Gates count 10 minutes for a drill of 10 to 12 answers of up to 2,000 characters each. Gate 3 requires an audit of four lines, two rewrites and four whys (at least 450 words) behind `minWords: 220`; the capstone requires five stories, two rewrites, an interview and a reading (well over 900 words) behind `minWords: 250`.
- Why it matters: learners will skip tasks or pad. Open decision 1 is unresolved because no instructor has signed.
- Required fix: re-estimate Learn chapters at 35 to 40 minutes, gates at 40 to 45 minutes and the capstone at 120 minutes or move part of it into earlier gates (see A-13). Either cut one module, as the roadmap suggests, or lengthen the stated duration. Set `minWords` close to the real minimum answer.

**A-13 | S3 | The "story bank" is assembled only at the capstone, and gate 2 asks for stories the learner does not yet have**

- Location: `02.06` ("two stories from your story bank"), `01.06` ("start your story bank"), `07.04` Part 1.
- Observation: after gate 1 the bank holds one story. Gate 2 asks for "two stories from the bank". Gates 3 to 6 produce an audited resume, a case, a technical pair and a strength and weakness, none of which is explicitly filed as a bank story. In 7.4 the learner is expected to produce five owned stories, one in both versions and one weakness, in about 20 minutes.
- Why it matters: it is the first time most learners meet the five-story requirement, and the 20-minute budget cannot hold it.
- Required fix: say in each gate which bank slot the output fills (story 1 at gate 1, stories 2 and 3 at gate 2, a technical story at gate 5, a weakness story at gate 6), and tell the learner how to keep the bank. Give 7.4 a "consolidate and fill the remaining slots" role with a realistic time.

**A-14 | S3 | Support does not fade and retrieval is thin until module 7**

- Location: all gates; quizzes `01.05` to `06.05`.
- Observation: every gate repeats one scaffold: a strong exemplar, a weak contrast, a provided case, a rubric. Every quiz item states "Her facts:" so the learner only has to choose the option that reuses them; no item requires finding a missing fact or deciding what to ask for. The only cumulative retrieval is `07.03` (5 items for six modules, nothing on the decision story of module 1 or the founder/engineer split in more than one item). Modules 3 to 6 mostly retrieve their own module.
- Why it matters: difficulty never rises, so the capstone is the first cold performance, and it is 80 minutes at the end.
- Required fix: from gate 3 on, trim the exemplar to the weak/strong contrast without a full model story, and give gates 5 and 6 only the rubric and the provided case. Add one older-module item to each of `04.05` to `06.05`, and add 3 to 5 items to `07.03`, including at least one with a missing fact.

**A-15 | S3 | Twelve of the 19 canvases are step-through replays of the dialogue the chapter has just narrated**

- Location: `story-or-usually`, `my-part-team-part`, `find-your-numbers`, `resume-line-why-chain`, `tidy-reason-breaks`, `resume-line-audit`, `clarify-the-case`, `founder-version-first`, `engineer-depth-ladder`, `broad-to-narrow-strength`, `time-to-think`, `feedback-to-next-project`.
- Observation: each is a Next-button walk through the same scene, with the same numbers and wording, that the chapter's opening scene and "A full worked example" already tell (for example `find-your-numbers` steps repeat the 124 of 2,480, 19 then 6 and bill sequence in 2.3 almost line by line; `founder-version-first` repeats the "Our biggest merchants waited about 40 minutes..." answer, which also appears in 5.1 and 5.3 prose). The learner decides nothing after the predict; the stepper does not branch.
- Why it matters: the chapter is not stronger with it than without it (canvas acceptance test). The predict is the only real interaction.
- Required fix: for at least half of these, replace the replay with a choice: the learner picks which reply Samer gives and sees the follow-up, or reorders the whys, or edits the weak line and sees which check passes. Keep the replay only where order is the claim (`resume-line-audit`, `engineer-depth-ladder`).

**A-16 | S3 | Four canvases are the same authored-weight widget, and in two the flip is set by the author's values**

- Location: `samer-decision-weights` (1.4), `case-options-weights` (4.3), `choose-technical-story` (5.2), `weakness-answer-choice` (6.3).
- Observation: all four are the factor renderer with scores the author chose and weights the learner moves. I verified the totals in the chapters (28/25/25; 38/36/22 with 41 versus 40 and 30 versus 28; 36/31/27 with 41 versus 38 and 41 versus 34; 16/11/11 with 21 versus 20 and 30 versus 25). They are right. But in 5.2 and 6.3 the scores themselves carry the lesson ("Impressive tools" 5 for the team project; "Honest" 5 for the real weakness), so the learner is moving a weight to see the author's preferred answer win or lose. The claim "the winner depends on the weights" is true of any weighted sum, and the chapters already say it.
- Why it matters: four chapters in a row-pattern teach the same meta-claim, and two do it with a rigged table. This is the slider-entertainment risk.
- Required fix: keep 1.4 (the weights are a real decision) and 4.3. For 5.2 and 6.3 replace the widget with a choice the learner makes on their own material (list three stories, answer four yes or no questions, see which survives three whys), or a build-an-answer canvas. If kept, label the scores clearly as the author's and let the learner edit one score.

**A-17 | S3 | The static "What this shows / Try this / What changed / Limits" paragraph under each canvas duplicates the canvas panel and gives away the results**

- Location: every Learn chapter after the `InteractiveCanvas` tag (for example 4.3: "lowering the fee leads with 38 points... asking ten customers wins, 41 to 40... 30 to 28").
- Observation: the renderers already show `whatThisShows`, `tryThis` and `limits` from `data.ts`. The chapters repeat nearly the same text in prose, including the totals the learner is supposed to discover.
- Why it matters: duplicate explanation, and the experiment is answered before it is run. "What changed" should be generated from the learner's move (the specs have `describeChange`), not written as a fixed result.
- Required fix: delete the duplicated paragraph from the MDX and keep one sentence that tells the learner to read the "What changed" line the canvas shows. Move the expected observations into `tryThis` only.

**A-18 | S3 | About seven of 27 diagrams restate the prose, and all 27 are the same kind of chart**

- Location: restating (a numbered list drawn as boxes): 1.2, 1.4, 2.2, 4.3, 4.4, 6.3 and, in part, 1.1, 5.1 and 6.1 (the same "never reached" dotted-arrow motif three times). Arguing: 2.3 and 2.4 (every path ends in something written), 3.2 (three exits), 3.3 (two paths), 5.2 (the filter in which tools never appear), 6.4 (what you cannot and can control), 7.4 (the loop back to part 1).
- Observation: all are `flowchart TD` with 4 to 6 boxes. None shows a quantity, a before and after, or a branching of cause (for example 2.4's total change split into "with the checklist" and "without").
- Why it matters: "a diagram that restates the prose is a defect".
- Required fix: cut or replace the restating ones with a diagram that adds a relationship the prose does not draw (a bar of the 1-hour change split into the part Leen can claim; a timeline of what the interviewer asked when). Add a module map where it helps (the playbook allows one per module).

**A-19 | S3 | All 19 Learn chapters share one skeleton, and several paragraphs are paraphrased across chapters**

- Location: headings "Where people go wrong" (19 of 19), "Check your understanding" (19), "The idea in plain words" (17), "Try it on your own resume today" (16, three more under "work"), "A full worked example" (12). Repeated claims: the planned-versus-free-interview research paragraph (1.1 and 3.1), "Founders who write about hiring say..." (1.1, 3.1, 5.1, 5.2, 5.3), Yazan's two-sentence founder version (5.1, the 5.3 worked example and the 5.3 canvas).
- Observation: the audit's repetition check found only three verbatim repeats (the AI-drill paragraphs in gates 1 and 2), so these paraphrases pass it. "Where people go wrong" is always five or six bold-led mistakes in the pattern "The first mistake... The second..."
- Why it matters: the voice starts to read as a template; learners skim the same section every chapter; reused sentences lengthen the course.
- Required fix: vary at least a third of the chapters (a short failure story instead of the mistakes list; a decision table instead of "The idea in plain words"), de-duplicate the research and founder-essay paragraphs to one home each (1.1 and 5.2), and tell each gate's AI-drill introduction once with a link to the first.

**A-20 | S3 | Layla's attribution arithmetic assumes a fact the capstone never states**

- Location: `07.04` "Worked example: Layla".
- Observation: "12 of 60 jobs went late... 4 of the 12 late jobs before were rush jobs. Without them, 8 of 56 were late before, about 14 percent". The 56 assumes there were exactly 4 rush jobs in the 60, which were all late. If there were 10 rush jobs, the non-rush base is 50 and the rate is 16 percent.
- Why it matters: it is the showcase for honest attribution, in a course about not claiming what you cannot source.
- Required fix: state the count of rush jobs (and that all four were late), or change the example to use a rate known for each group.

**A-21 | S3 | Continuity slips**

- Hadeel's reminders: `02.06`, `03.06` and `07.04` say she built the reminders and chose 18:00; `05.06` says she did not change the server "because the backend developer was busy with the reminders". These can be reconciled but read as a contradiction. State who built which part.
- Pace: `07.01` says Tala used the interviewer "for ten weeks"; `07.04` says Layla had six weeks of practice; the course promises about three weeks.
- Canvas naming: `choose-technical-story` calls the option "Team project"; the chapter calls it "the events project".
- Name reuse across roles: Osama is Yazan's friend and logistics developer (5.2), a designer at a university club (5.4) and a junior developer (6.3); Duaa is a baker (5.3), a clinic analyst (5.5, 6.5) and a designer (6.4); Rana, Sara and Tamer change jobs similarly. For second-language readers a name with a new job each time is a small trap.
- Required fix: reconcile the reminders facts in one place, align the time language, and give quiz cast members stable roles.

**A-22 | S3 | The feedback card described in the course does not match the platform's feedback shape (needs the technical critic)**

- Location: `07.01`, `07.02`, `07.04` (cards with a "Flags:" line, a before and after flag table, "compare the same flag names"); the drill rubrics ("Use these flag names when they apply").
- Observation: `AiInterviewFeedbackSchema` has `strengths`, `weaknesses` (point and fix), `focusNotes` and `nextSteps` (exactly three). There is no flags field, and the feedback prompt does not ask for flag names; they appear only if the model writes them into the weakness text because of the rubric. The method in 7.1 to 7.4 (compare flags across drills, "the names do not change") rests on that.
- Why it matters: reference consistency (S2 by the gate rule if confirmed). If real cards do not carry stable flag names, step 3 of the 7.2 method fails.
- Required fix: either add a `flags` array to the feedback schema and prompt, or rewrite 7.1 to 7.4 so the learner tags their own transcript with the five names and compares the tags.

**A-23 | S3 | Drill configuration is under-explained for three drills**

- Location: `01.06`, `02.06`, `05.06` (`context: project`), `04.06` (`context: none` with `impact` as the second focus), `05.06` (`whyDepth: 4`), `06.06` (the rubric tells the interviewer to treat a disguised strength as a "pseudo-story").
- Observation: with `context: project` the learner must paste a project write-up of at least 40 characters before starting. The gate text says "Paste only the lines you are practising" but not what to paste for a project, and tells learners to use roles, which they have to apply by hand. In the module 4 drill the second area, impact, has no context to ground it. The roadmap says whyDepth 3 except module 3 (5); module 5 is 4. In 6.6, "pseudo-story" is used for a different problem (a humblebrag), which will blur the flag comparison the course relies on.
- Required fix: add one line to each project-context drill saying what to paste (50 to 100 words, roles only). Use a stable flag per problem (a separate "humblebrag" flag or reuse "invented reason risk"). Align or justify whyDepth values.

### S4: polish

**A-24 | S4 | Undefined business words for second-language readers.** "Conversion" (2.2, 3.1, 3.4), "funnel" (3.1, 3.3, 3.5, 4.5, 4.6, 7.3), "friction" (3.1, 3.3) and "SKU" (5.5) are used without a gloss. `GlossaryTerm` is used twice in the whole course. Add a gloss on first use.

**A-25 | S4 | Small item and canvas slips.**
- `04.03` Q1 includes an irrelevant fact ("his team has no developer this month") that contradicts a cost-4 progress bar.
- `05.04` says "A third rung is the one most people dread: what would you change?" but that is rung 6.
- `resume-line-audit` labels every edge "ok", including after the failed checks 1 and 4.
- No `MustRead`, `InterestingRead` or `RealWorldEvent` in any module, and the research is credited in words only, so a curious fellow cannot find any source. If links are deliberately excluded by the brief, say so in the decision log.

**A-26 | S4 | Resume advice for an instructor to confirm.** `03.04` rewrites Karam's line with "(my manager's figure; I did not measure it)" on the page. Many hiring managers prefer such caveats to be spoken, not printed. The chapter's own diagram says "name the source, or cut the number". Ask the instructor panel at G2B.

## What works

- The cases are specific and the numbers are right. I verified the arithmetic for Leen (3 to 2 hours; a third less time; 50 percent more orders per hour), Bilal (124 of 2,480 is 5 percent; 52 of 2,600 is 2 percent), Samer (48 versus 20 calls over four weeks), Fadi (12 to 5 and 9 to 5 after the old-phone adjustment), Hadeel (18 to 12 in four clinics; 39 percent fewer from 18 to 11) and all four factor canvases. The research claims match the dossier and carry honest caveats such as "this is the course's own method" and "no study has tested the five whys as an interview method".
- The honest-gap ethos is consistent across 41 chapters, seven gates and seven drill rubrics: "I did not measure that" is a full answer, drills must not push a guess, and each drill has a privacy line and a written fallback.
- Every Learn chapter has a predict before, a canvas, a plan-your-own task and a later check, and none exceeds the interaction budget. The mixed review and the planted error in Hadeel's card (praise that ignores the attribution she herself gave) are good designs for transfer.
- The gate rubrics are real tables with a stated pass rule before the learner starts, a mentor follow-up step and a mentor key that lists "Do not accept" traps. The mentor key for the provided case is the strongest part of the assessment design.
- Option explanations exist for all 69 MCQs, positions are spread (14, 23, 17, 15), and the correct option is never padded to be the longest.
- The prose teaches the mechanism: baseline, attribution by comparison, the then-note, the five checks, the case shape with a line set in advance, the founder-then-engineer split. Most diagrams in modules 2, 3 and 5 argue.
- Sensitive points are handled well: accent bias gets one plain paragraph followed by what the learner controls; hardship is kept out of the weakness answer; text-only practice is noted as not training pace.

## Recommendation

**Revise.** There is no S1 and nothing needs rewriting from the brief. Seven S2 defects block G3/G5: fix the capstone drill arithmetic (A-01), give the keyless path a card (A-02), bring the spoken outcomes and their evidence into line (A-03), constrain the Hadeel path (A-04), rewrite the predict set and de-signal the MCQ set (A-05, A-06), and unify the decision rule with its canvas (A-07). Then address the S3 list, starting with the key repairs (A-08, A-09, A-10), the pass-rule calibration (A-11) and the time and bank assembly (A-12, A-13). After the fixes, re-run `measure.cjs` and `guess.cjs` against the revised set, re-answer the keys blind with a person, close G2B with at least two instructors, and send this back for a second review of the changed items and the affected canvases only.

```yaml
artifact: critique
course: founder-interviews
artifact_under_review: courses/founder-interviews/
lens: pedagogy | assessment | canvas
scorecard_average: 3.71
blocking_defects: 7
recommendation: revise
```
