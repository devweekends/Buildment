---
artifact: context-pack
course: building-habits
for: chapter-writer
version: 1
---

# Writer pack: Building Habits That Last

Read this whole file before writing. It replaces the chapter briefs for this course (G2C was skipped on the sponsor's instruction; see `../decision-log.md`). The plan is `courses/building-habits/course.yaml`: write exactly the files, titles and goals listed there for your modules. The roadmap is `../curriculum-roadmap.md` (minutes, outcomes, gate evidence, the course habit). The research dossier is `../research.md`: **every claim about research, a researcher or a book must match the dossier, phrased the way it says**; never state a claim it marks unverified or overstated, except to correct it as a myth. Look at `content/import/cause-and-effect/04-root-causes/` (`04.01`, `04.03`, `04.06`, `04.07`) for the exact file format of a scene, a teaching chapter with a canvas, a quiz chapter and a gate; that course is the quality bar. Skim `agent-ip/03-authoring-standards.md` (voice, forbidden patterns), `agent-ip/04-interactive-playbook.md` (budgets, option-length hygiene, quiz and predict rules) and `agent-ip/agents/chapter-writer.md`.

## 1. What this course is

A practical, warm course on building good habits and weakening unwanted ones, for fellows who study, freelance and work remotely through power cuts, weak internet, displacement and family duties. It is grounded in research, not in one book. The method, the cases and the wording are our own; ideas are credited to the people who found them.

- Open every chapter with a concrete person and moment, never a definition.
- Teach the idea, show it working on a full worked example with the reasoning shown, then show where it goes wrong or what people commonly get wrong.
- Every chapter ends with something the learner can do today, in their real conditions.
- Wrong answers are welcome; every option is explained kindly.

## 2. Learner, voice and care

- Gaza fellowship fellows, mixed backgrounds, building careers in tech and remote work. Arabic first; English as a second language. Most read on phones with weak, expensive data and power cuts.
- Plain English. Short sentences (aim under 20 words, never over 30). Common words. No idioms or figures of speech: say the literal thing. Define every new term on first use.
- **Warm and practical. No hustle culture, no shame, no "just try harder", no "no excuses", no 5 a.m. heroics.** A missed day is information. Rest is not failure.
- **Hardship is ordinary background, never drama.** Power hours, weak internet, shared rooms, moving homes, caring for family: mention them the way a neighbour would, as facts of the week, with a practical answer. Never describe war, damage or loss. Never make light of it.
- **Faith appears naturally.** Many fellows pray five times a day, and prayer times are fixed points in their day. A character may anchor a habit after a prayer, as one example among meals, work shifts and power hours. No theological claims, no religious instruction, no claims about what religion does to habits or health. Not every character is religious in the same way; do not make faith a lesson.
- **Never ask a learner to share personal hardship.** Every personal prompt offers a provided case. Learning log questions about the learner's own life always say "or use <provided case>".
- **Not therapy.** The course does not treat addiction, eating problems, depression or trauma. Where a habit is closer to one of these, one kind sentence says a mentor, doctor or counsellor is the right help (module 4 says this once, in 4.1).

## 3. Hard rules (any violation fails review)

- **No em dashes or en dashes anywhere** (U+2014, U+2013), including canvas data. Use a colon, a comma or two sentences. Ranges: "18 to 254".
- **No company, product, app or brand names.** Say "a free online course", "a notes app", "an AI chat tool", "a video app". No real websites.
- **No links**, and no `MustRead`, `InterestingRead` or `RealWorldEvent` blocks.
- **No politics or war as case material.**
- **Researchers and books only as the dossier allows.** You may name a researcher or an author when the dossier credits the idea to them, in plain words ("Researchers led by Phillippa Lally in London followed..."; "The writer James Clear calls this...") and at most two or three names per chapter. **Never copy a book's wording or present a book's named framework as our own method.** Where a term is someone's coinage (the dossier's credits table lists them), credit it the first time it appears in the course and then use our own plain words. Do not build chapters around any book's list of laws or steps.
- **No invented statistics about the real world.** Numbers belong to the case ("in this example"). Research numbers only as the dossier gives them.
- **No AI or tool attribution. No slop:** no "In today's world", "It is important to note", "delve", "landscape", "game-changer", "Let's dive in", "key takeaways", "unlock", "journey", "level up", "supercharge".
- **Check every sum and every tracker twice.** A case must support the conclusion the chapter draws.

## 4. Chapter file format and budgets

Path: `courses/building-habits/<module-dir>/<file>` exactly as in course.yaml. Frontmatter:

```yaml
---
title: "<exact title from course.yaml>"
module: <n>
lesson: <n>
stepType: Read | Learn | Build | Check | Gate
summary: "<one or two plain sentences>"
estimatedMinutes: <minutes from the roadmap>
---
```

`NN.01-set-the-scene.md` is Read; teaching chapters are Learn; `07.04-capstone-30-day-plan.md` is Build; `*-quiz.md` is Check; `*-checklist.md` is Gate.

**agent-ip prose minimums apply in full** (`02-course-architecture.md` → Prose depth), counted by `agent-ip/scripts/audit-course.mjs` over **paragraphs only**: headings, lists, numbered steps, tables, block quotes, components and fences do not count.

| Chapter type | Prose words (paragraphs) | Diagram | Assessments |
|---|---|---|---|
| Set the scene (Read) | 1,200 or more | one ```mermaid | one predict or one short openquestion |
| Teaching (Learn) | 1,200 or more | one ```mermaid, plus the canvas | one predict before the canvas, one or two quiz MCQs after it (at most 3 assessments in total) |
| Capstone (Build) | 1,200 or more | one ```mermaid | the capstone openquestion only |
| Quiz (Check) | none: activities only | none | exactly **five** quiz MCQs |
| Gate | 700 or more | none | one openquestion |

Every chapter: at most 6 top-level components and 25 JSX tags in total. Aim for about 1,300 to 1,500 prose words in scene, teaching and capstone chapters and about 800 to 1,000 in gates, so edits do not drop a chapter under the line.

**Recaps and definitions:** `ChapterRecap` goes in the module gate only, never in a scene, teaching, quiz or capstone chapter. `LearningObjectives` goes in the set-the-scene chapter only. `BigWordAlert` (props `term`, `plainEnglish`, `whyItMatters`) is for the module's central term in its set-the-scene chapter, and at most once in a teaching chapter for a new, load-bearing term. Never define the same term twice in the course: after its first definition, refer back ("the cue you met in 1.3"). Write long by **explaining**, not padding: more worked reasoning, a second short example, the common mistake and how to spot it, what to do in a fellow's real conditions. Paragraphs of two to five short sentences.

### Set the scene (Read)
A case told as a short story that shows the module's problem; why it matters for study and work; what the module covers. One `BigWordAlert` for the central term. `LearningObjectives` (`items={[...]}`) once. A `## Key words` table (Word, Plain English) of four to six words and a `## What is in this module` table (Chapter, You will practise). One ```mermaid diagram of the case. One predict or one short openquestion (minWords 20 to 30, with a provided alternative; set-the-scene open questions use only `prompt`, `required`, `minWords`, `allowSpeechInput`, `modelAnswer`). End with a `**Next:**` line.

### Teaching chapter (Learn)
Hook (a person and a moment), the idea in plain words, what the research found (as the dossier phrases it), the predict, the canvas, what the canvas showed, a full worked example with the reasoning step by step, a ```mermaid diagram that argues a relationship (introduced in prose before, explained after), where people go wrong, a short "try it today" paragraph in real conditions, one or two quiz MCQs under `## Check your understanding` on a **new** case, then a `**Next:**` line. At most one `BigWordAlert`; `GlossaryTerm` (props `term`, `definition`) for other new words on first use; at most two `Callout`s.

Mermaid on phones: `flowchart TD`, at most 7 nodes, short node text, quote any label with punctuation. For loops, label edges with plain words ("cue", "reward", "next time").

### Quiz chapter (Check)
Activities only: five ```quiz MCQ fences and nothing else after the frontmatter. Modules 2, 4 and 5 include at least one **"check the AI's answer"** question: show a short AI answer in single quotes inside the question, sounding reasonable, with one mistake this course teaches against (for example "it takes 21 days", "just use more willpower", "you broke your streak, so start over"); the learner picks the mistake or the better advice. Never write "skip it" or "skip to".

### Gate
Use the cause-and-effect gate layout (`04.07-checklist.md`): intro sentence, `## Module N checklist` (five or six honest items, including "I answered the questions in chapters N.2 to N.4, and finished the quiz in N.5"; module 1 has no quiz), `## Learning log` (four numbered questions about how they think and act), a task section, `## How your mentor will read it` with a rubric table (each criterion with Met, Partly and Not yet and an observable threshold), a **Pass rule**, the follow-up step (the mentor replies with one or two questions; the learner answers in writing or a voice note), the openquestion, `<ChapterRecap points={[...]} />` (four or five points), `## All boxes ticked?`, `**Next:**`. To reach 700 prose words, explain in paragraphs: what the task is for, a strong answer about a fictional person (in prose), a weak answer and why it is weak, the provided case for anyone who prefers not to use their own life, and how the mentor will read it. No `BigWordAlert`, `GlossaryTerm`, `Callout`, diagram, canvas, predict or quiz in a gate.

The gate `modelAnswer` holds the **mentor key** for the provided case first ("Mentor key for <case>: ..."), what to accept and what not to accept, then a model answer for a different case.

## 4A. Rules carried over from course 10's critique rounds

- **Quiz items test the skill on evidence.** In each quiz chapter at least two items give a small table or three to four stated facts and ask which plan, change or conclusion the facts support; each wrong option fails because of a different stated fact. No item repeats an item or predict elsewhere in the course. The key's wording is not in the stem and is not a sentence from the chapter. Every quiz actor has a name, a place and a number. Wrong options are mistakes a learner would really make; an AI answer sounds reasonable.
- **Predicts are not always the cautious or surprising option.** In at least a third of your predicts the intuitive answer is the right one, or both options are plausible.
- **No unsupported superlatives** ("the best way", "the most common mistake"): say "a common mistake", "a strong choice".
- **Vary settings.** Use everyday places: a clinic desk, a school canteen, a pharmacy, a tailor, a water delivery round, a sports club, a farm stall, a bakery, a shared flat, a library corner, a family shop.
- **Cast.** The recurring people keep their facts (section 5). A name belongs to the earliest module that uses it. New names come only from your own name pool. Grep the whole course before you use any name.

## 5. Cast and the course habit

All people and organisations are fictional; say so once in each set-the-scene chapter. Shekels for local prices, dollars for freelance pay.

| Module | Person | Facts to keep |
|---|---|---|
| 1 | **Rami** | 24, learning web development from a free online course on his phone and a shared family laptop. Lives with his parents and two younger brothers. Wants to study 30 minutes a day; manages it two or three days a week. Picks up his phone every time he sits down, without deciding to. |
| 2 | **Lina** | Freelance translator (Arabic and English), 29. Wants to practise writing in English every day to win better clients. Made a big plan on a Saturday (one hour a day, a new essay each day) that faded by Wednesday. Prays Fajr every morning and has tea after it. |
| 3 | **Khaled** | Remote customer support for a small company abroad, evening shifts in his clients' daytime. Works from a shared family flat. The power comes in fixed hours that change week to week; the internet is weak in the evenings. His phone is always in his hand; his study books are in a box under the bed. |
| 4 | **Maha** | Works at a pharmacy counter, starts at 8:00. Scrolls videos in bed until about 1:00 most nights and wakes tired. The phone charges next to her pillow. |
| 5 | **Yousef** | Studying for a certificate exam. Did 20 minutes of practice questions for 23 days in a row, ticking a paper calendar, then missed five days in a week of long power cuts and felt like quitting. |
| 6 | **Dina** | Part-time remote software tester, learning English, cares for her mother in the afternoons. Tried to start five habits at once (study, walking, sleeping early, reading, drinking more water); none lasted. |
| 7 | **Samir** | Ran a 30-day plan (reading 10 pages of a technical book after the evening meal) and reviews his tracker in 7.1 and 7.2. |

**The provided course habit: Nada.** For learners who prefer not to track their own habit, gates 2, 3, 5 and 6 use one provided person whose habit continues across the gates. Nada is 22, studies accounting and lives with her family. Her habit: "After I wash my breakfast cup, I open my English vocabulary notebook and write one sentence with a new word." Gate 2 introduces her plan; gate 3 her place and backup version; gate 5 her tracker for days 1 to 18 and her restart plan; gate 6 her weekly rhythm. Capstone provided case 1 is Nada's full 30 days. Every writer uses this canon exactly:

- **Habit (gate 2):** "After I wash my breakfast cup, I open my English vocabulary notebook and write one sentence with a new word." About 3 minutes. Tracked with a tick or a cross and a few words on a paper card kept inside the notebook.
- **Place and versions (gate 3):** the notebook and a pencil live on the shelf next to the drying rack, open at today's page. Full version: write one sentence with a new word. Smallest version (no time, or no light): read yesterday's sentence aloud.
- **Days 1 to 18 (gate 5):** days 1 to 8 done; day 9 missed ("relatives came for breakfast, forgot"); days 10 to 14 done; days 15 to 19 were a week of long power cuts when the family often ate breakfast on the way out, so there was no cup to wash: day 15 missed ("no breakfast at home"), day 16 done with the smallest version, days 17 and 18 missed ("no breakfast at home"). Done 14 of 18; 4 misses; one gap of two days in a row.
- **Restart plan (gate 5):** day 19, smallest version (done). From day 20, a second anchor for mornings with no breakfast at home: "after I fill my water bottle".
- **Days 19 to 30 (capstone):** day 19 done (smallest version); days 20 to 24 done; day 25 missed ("relatives stayed all day"); days 26 and 27 done; day 28 missed ("exam day, left at 6:30"); days 29 and 30 done.
- **Totals for 30 days:** 24 of 30 done (2 of them the smallest version), 6 misses (days 9, 15, 17, 18, 25, 28), longest gap 2 days. Pattern: 3 misses when the anchor disappeared (no breakfast at home), 2 with relatives visiting, 1 on an exam day. After the second anchor, no "no breakfast" misses.
- **Weekly rhythm (gate 6):** writer C places her habit and one or two others on her real anchors (lectures on three mornings, prayer times, family meals), consistent with the facts above.

## 5A. Name pools (quiz and side characters)

- Writer A (modules 1 and 2): Adam, Salma, Tareq, Reem, Bilal, Nadia, Fadi, Asma
- Writer B (modules 3 and 4): Tamer, Sara, Iyad, Lama, Mazen, Ruba, Anas, Hiba
- Writer C (modules 5 and 6): Karim, Manar, Wael, Sana, Jamal, Duaa, Osama, Rana
- Writer D (module 7): Majd, Layla, Fares, Aya, Mustafa, Shahd, Nabil, Ola, plus the capstone people Ziad and Rasha

## 6. Assessments

MCQ fence:
````
```quiz
type: mcq
question: "<a case that needs reasoning, not recall>"
options:
  - "<option>"
  - "<option>"
  - "<option>"
  - "<option>"
correct: <0-based index>
explanations:
  - "<why right or wrong, standalone>"
  - "..."
  - "..."
  - "..."
```
````
- Four options, one explanation per option in order; the right one starts with "Right."; wrong ones say kindly what was missed.
- **Option length:** the correct option is never longer than the longest wrong option; in a quiz chapter it is the strictly longest in at most one of five. Same level of detail in every option. Use each position 0 to 3 at least once per quiz chapter.
- No "all of the above", no joke options, no "Which is NOT".
- Every key follows from a method taught in the course or from arithmetic. Opinion goes to open questions. Where two plans could both help, the facts in the stem must make one clearly better.
- Blind re-answer each MCQ yourself after writing it. An independent blind review follows (`agent-ip/scripts/blind-keys.mjs`).
- Double-quote YAML strings; single quotes inside; always quote strings with colons.

Predict fence: exactly two options with `id` and `label`, `correctOptionId`, `explanation`; the correct label never longer than the other; correct first in about half your predicts.

Open question fence (gates and capstone):
````
```openquestion
prompt: "<what to write, with the parts to include>"
required: true
minWords: <honest minimum>
allowSpeechInput: true
allowUrl: true
urlRequired: false
urlLabel: "Voice note link (optional)"
urlHint: "An audio link your mentor can open without signing in. Audio only is fine."
modelAnswer: "Mentor key for <provided case>: ... Model answer for a different case: ..."
```
````

## 7. Canvases (agent-ip v0.4, interactive-first)

Every Learn chapter teaches through one **registered canvas** that the learner steps through or changes and sees change: a predict before it, a paragraph on "what changed" after it, and a quiz item later that transfers the claim to a new case. Predicts and quizzes do not count as the element. You build each canvas as **data plus a spec on an existing renderer** (no new React code):

- Read `agent-ip/10-interactive-canvases.md` (Reusable renderers, The copy blocks, Placement and density) and the renderer types in `frontend/src/canvas/renderers/<renderer>/types.ts`.
- Models to copy: state machine `frontend/src/canvas/five-whys-chain/` and `huda-review-loop/`; sequence `laptop-charging-detective/` and `review-without-blame-steps/`; factor `weighted-matrix-two-offers/`; slider `retry-backoff-jitter/` and `llm-token-cost/` (and their tests in `frontend/tests/unit/canvas/`).
- Create `frontend/src/canvas/<slug>/data.ts` (typed with the renderer's spec type, a header comment naming the course and chapter, `title`, `purpose`, `summary` or `intro` for screen readers, steps or inputs in this course's plain English, `tryThis` with the first line matching your predict, honest `limits`) and `frontend/src/canvas/<slug>/spec.md` on template 14A (`agent-ip/08-templates.md` → 14A: teaching claim, why a canvas, model, rendering, controls, visualisation, copy, edge cases, accessibility, acceptance criteria, build plan).
- **Slider canvases:** `compute` and `describeChange` are pure functions exported from `data.ts`; also export the core model function so it can be unit tested. Arithmetic only, from stated case numbers or a stated toy rule; say in `limits` that it is a simple illustration, and never present a toy rule as a research finding. Write `frontend/tests/unit/canvas/<slug>.test.ts` with at least four tests (defaults, the "try this" values, an edge, and describeChange), modelled on `retry-backoff-jitter.test.ts`.
- **State machines:** grid at most 3 columns by 2 rows; state names at most 18 characters; edge labels at most 14 characters, and at most 3 characters on an arrow between two states in the same column; no diagonal beside a parallel arrow. **Sequences:** two to four actors, arrow labels at most 18 characters. **Factor:** two or three options, three to five criteria, two to four weight levels; the result must change when the learner changes the weight the chapter asks about.
- **Do not edit** `frontend/src/canvas/registry.ts` or any `slugs.ts`: the orchestrator registers every slug after you report, runs the registry, label-fit and model tests, and sends back any failure.
- In the chapter: the predict comes first, one or two sentences send the learner to step through, `<InteractiveCanvas slug="<slug>" />` on its own line, then a paragraph naming What this shows, Try this, What changed and Limits of the model (as in `04.03-five-whys.md`). The chapter still teaches the claim in prose; the canvas is not the only path. The Mermaid diagram argues something different from the canvas.
- Names, numbers and facts in the canvas match the chapter exactly. No dashes, idioms or brand names in canvas text.

| Chapter | Slug | Renderer | Teaching claim (the canvas must make this visible) |
|---|---|---|---|
| 1.2 | `rami-decide-or-cue` | sequence | A new behaviour goes through deciding every time; a habit goes from cue to action and skips the deciding step. Two moments in Rami's evening: opening the study course (notice, weigh, decide, often "later") and picking up the phone (sit down, hand moves). |
| 1.3 | `habit-loop-repeats` | state machine | Cue, routine and reward, repeated in the same situation, build a link from cue to routine; once the habit is strong, the cue can start the routine with less need for the reward (say "can", never a firm "even when the reward is gone"; dossier finding 3). |
| 1.4 | `habit-strength-curve` | slider | Habit strength grows fast at first and then levels off, and people differ a lot in how long it takes; one missed day does not reset it. The shape and the wide range are sourced; the formula is a labelled toy model (curves reaching 95 percent of their plateau at about 18, 66 and 254 days for fast, typical and slow, the range and median in one study). Inputs: days of repetition, how fast this habit forms (fast, typical, slow as 1 to 3), missed days so far (a missed day adds no growth but loses none). Stats: strength as a percent of the plateau, days still needed to reach 95 percent. Do not claim many misses are harmless: limits say many misses lowered the level reached in the study. |
| 2.2 | `motivation-wave-habit-size` | slider | Motivation rises and falls over two weeks; a big habit happens only on high-motivation days, while a tiny one happens on most days. Fixed 14-day motivation series in the data (state it), inputs: effort the habit needs, a hard week (motivation lower by 0 to 3). A toy rule: the habit happens on days when motivation is at least the effort. |
| 2.3 | `if-then-moment` | sequence | A vague intention lets the moment pass; an if-then plan links a specific situation to a specific first step, so the situation itself starts the action. Lina's day with "practise sometime today" versus "if I finish my morning tea, then I open my writing notebook and write three sentences". |
| 2.4 | `choose-an-anchor` | factor | A good anchor happens every day, in the right place, ends at a clear moment and leaves a few free minutes; which anchor wins depends on what matters most in your week. Options for Lina: after Fajr prayer and tea, when the power comes on, after the evening meal. Changing the weight of "happens at the same time every day" should change the winner (power hours move week to week). |
| 3.2 | `khaled-evening-cues` | state machine | A chain of context cues (finish shift, sit on the sofa, phone in hand) runs the evening; changing one early link (where he sits after the shift) changes the cue for the rest of the chain. |
| 3.3 | `steps-to-start` | slider | Count the steps between you and a behaviour: on tired evenings the option with fewer steps tends to win. Fixed energy series over 10 evenings in the data; inputs: steps to start studying, steps to start scrolling. Toy rule stated in limits. |
| 3.4 | `power-cut-backup-plan` | state machine | A habit with only one version breaks on hard days; a habit with a full, a backup and a smallest version continues through no power and weak internet, and returns to full when conditions return. |
| 4.2 | `fewer-temptations` | slider | Give-ins per week = temptations per day x 7 x the share you do not resist: halving the temptations you face can do more than resisting a little harder. Inputs: temptations per day, share resisted (%). Bars: now, with half the temptations, with 10 points more resistance. |
| 4.3 | `maha-night-loop` | state machine | Find the cue and the need (winding down after a long day) behind the scrolling, and swap the routine for one that meets the same need (a downloaded audio lesson, a paper book) while the cue stays. |
| 4.4 | `phone-out-of-the-bedroom` | sequence | Removing the cue and adding friction does more than a promise: one night with the plan (phone charging in the kitchen, the urge noticed and named, the replacement routine) and one slip night handled by noticing and acting. |
| 5.2 | `tracker-week-notes` | sequence | A tracker that records the action, with a short note on each missed day, shows a pattern a memory hides (Yousef's misses fall on the power-cut evenings), which leads to a specific change. |
| 5.3 | `streak-or-done-count` | slider | One miss resets a streak counter to zero but barely changes "days done out of 30"; the number to watch is the length of the gap, because a longer gap makes restarting harder (dossier finding 13). Inputs: missed days, the day of the first miss, misses all together or spread out (0 or 1). Outputs: current streak, longest run, days done of 30, longest gap. Pure counting; never claim back-to-back misses do more harm to the habit (untested). |
| 5.4 | `slip-or-give-up` | state machine | After a missed day there are two roads: "I failed, so I stop" leads to giving up; a restart plan (smallest version tomorrow) leads back to the habit. |
| 6.2 | `which-habit-first` | factor | Choose the habit to start first by what matters now, how small it can be, whether it has a clear anchor and whether it makes other parts of life easier; the choice changes with the weights. Dina's options: daily English practice, sleeping by 23:00, a 10-minute walk. |
| 6.3 | `dina-study-block` | sequence | A start signal, the phone in another room and the next step written down protect a focused study block; an interruption is handled with a quick note and a return, not by abandoning the block. |
| 6.4 | `prayer-time-anchors` | state machine | Habits tied to events in the day (a prayer, a meal) move with those events when the clock times change through the seasons, while habits tied to clock times drift away from the day's rhythm. |
| 7.2 | `thirty-day-review` | state machine | Reviewing 30 days: count the days done, find when the misses happened, find their cause from the notes, choose one change, and test it for two weeks. |

## 8. Module notes

Section numbers such as "finding 2" refer to `../research.md` → Findings by topic. Its **Phrase it this way** lines are the wording to follow; its **Credits** table says how to name people; its **Unverified claims** table lists what never appears as fact.

**Module 1, How habits work.** 1.1 Rami's two habits: the study he wants but rarely starts, and the phone he picks up without deciding. 1.2 (finding 1) a habit is a behaviour a familiar situation starts with little thought, learned by repeating it there (credit Wendy Wood as the dossier does); how much of daily life runs this way only in the dossier's careful wording; habit versus decision versus goal; a habit can start an action that still takes effort. 1.3 (finding 3) cue, routine and reward: "the writer Charles Duhigg made this idea famous as the habit loop"; what research supports: reward helps most while a habit forms, and a strong habit **can** run with less need for the reward, which cuts both ways; one sentence that enjoying the action seemed to help habits form more than believing it is useful. No brain or dopamine talk. 1.4 (finding 2) teach the **shape before any number**: fast early growth, then levelling off; "about two months, often longer, and very different between people"; 66 only as "one study's median", with the range; the 21-day myth and its origin as the dossier phrases it; one missed day did not undo progress, while many misses lowered the level reached and a long gap made the next time less likely. Quizzes test the shape and the reasoning, never the number 66. 1.5 gate: describe one existing habit as cue, routine and reward (own or provided: Adam checks his messages the moment he wakes).

**Module 2, Starting a habit that sticks.** 2.1 Lina's big Saturday plan and its fade. 2.2 (findings 4 and 7) goals and intentions without a routine often fade (the intention and action gap, in plain words); motivation goes up and down; behaviour happens when motivation, ability and a prompt come together (credit BJ Fogg as the dossier does); shrink the habit to **the smallest version** (our own term: do not use "tiny habits" or "two-minute rule" as names) that fits your hardest day; say honestly that this is good advice built on related research, not a proven method on its own; grow it after it becomes easy. 2.3 (finding 5) if-then plans (implementation intentions, Peter Gollwitzer): "many studies" found they help people act, without effect sizes; a strong plan names a situation that will really happen and a first step you can see; common mistakes. 2.4 (finding 6) anchors: credit Fogg's "anchor" and Clear's "habit stacking" together once, then use our words ("anchor it to"); the anchor evidence is small and exploratory, so present it as practical advice that builds on if-then plans; choosing a strong anchor, with prayer times, meals and the power schedule as examples; an anchor that moves (power hours) is weaker. **Reminders are not cues** (2.3 or 2.4, one short section): an alarm or app helps you remember, but the situation is what builds the habit, and alarms and apps fail when the phone is dead. 2.5 quiz with one AI check. 2.6 gate: the course habit (or Nada's plan).

**Module 3, Let your surroundings do the work.** 3.1 Khaled's flat: the phone always closer than his work. 3.2 (finding 8) context cues: place, time, people and the action before; a change of situation (a new home, a new shift, a new term) weakens old habits and is a **window** to start new ones, which then carry on (credit Bas Verplanken as the dossier does); gently, because fellows' homes and routines change often: also say that good habits may need rebuilding after a move, and that this is normal. 3.3 (finding 9) friction: "Wendy Wood calls these small costs friction"; small changes in effort and steps change behaviour modestly, not by magic; use only the dossier's examples (the phone-app study), no food studies and no nudge numbers; make the good choice easier (book on the table, lesson downloaded) and the unwanted one harder (phone in another room, logged out). 3.4 (finding 18) when the power and the internet fail: full, backup and smallest versions; download while the power is on; paper backups; "if no power, then..." plans; restart at the next cue when conditions return. 3.5 quiz. 3.6 gate: redesign one place or routine for the course habit and write its backup version (or Nada's).

**Module 4, Breaking a habit you do not want.** 4.1 Maha's nights; one kind sentence that habits close to addiction or health problems need a mentor, doctor or counsellor. 4.2 (finding 10) when many laboratories repeated the classic "willpower runs out" experiments carefully, they did not find the effect; people who seem disciplined mostly rely on habits and report fewer moments of resisting temptation; never say "willpower does not exist" or that disciplined people "never feel temptation"; plan your surroundings, not a fight. 4.3 (finding 11) same cue, same need, new routine: find what the habit gives you; a replacement that meets the same need; no clinical habit reversal. 4.4 (finding 11) two tools in order: **remove or avoid the cue in advance** and add friction; then, **in the moment, watch for the start** and tell yourself "not this time" (credit the vigilant monitoring study as the dossier does); one line on why "just do not think about it" tends to fail; slips will happen. 4.5 quiz with one AI check. 4.6 gate: a plan to weaken one unwanted habit (own or the provided case: Hamza spends 5 shekels a day on a sweet drink at the shop next to his bus stop; frame it as a money and routine habit, never as diet or weight).

**Module 5, Tracking, missed days and restarting.** 5.1 Yousef's streak and the week of power cuts. 5.2 (finding 12) tracking: across many studies, people who kept track of their progress were more likely to reach their goals, more so when it was recorded or shared (dossier wording); track the action you control; a paper card or a notes app; a short note on each miss. 5.3 (finding 13) build the chapter around **restart at the next cue**: one miss did not undo progress; a longer gap makes restarting harder; the trap after a slip (credit as the dossier does); "the writer James Clear gives a popular rule: never miss twice. It is good advice, not a research finding. This course's version is simpler: restart at the next cue"; streaks help while intact, so allow a repair (a grace day, or the smallest version counts); count days done, not only days in a row; the gym trial whose best programme rewarded coming back after a miss. 5.4 (findings 14 and 15) slow results: the habit gets easier fastest early, while results such as marks or fitness can come later (an everyday observation, not a research claim); a slip versus giving up; a restart plan; fresh starts (credit Katy Milkman and colleagues; "seen in several large data sets and some experiments, not yet tested as widely as some other findings") used as a push, never a reason to wait for next month; "kind to yourself, then a plan" (the self-compassion experiments as the dossier phrases them). 5.5 quiz with one AI check. 5.6 gate: review the tracker so far (own or Nada's days 1 to 18) and write a restart plan.

**Module 6, Habits for your whole life.** 6.1 Dina's five habits at once. 6.2 (finding 16) choose one habit first; identity only as "each repetition is a small piece of evidence about who you are becoming"; no identity-first rule, no identity labels as a technique; one change at a time. 6.3 (finding 17) study and **focused work** (use "focused work"; if you mention the phrase "deep work", credit it once to the writer Cal Newport): a habit can start focused work, but the work itself stays effortful; a start signal, a protected time, the phone out of the room, the next step written at the end, offline materials, remote work across time zones, interruptions at home handled kindly. 6.4 (finding 17) a daily rhythm: fixed points as anchors (prayer times as one example among meals, work shifts and the school run, with no claims about effects); habits tied to events move with the seasons because prayer times move through the year; sleep only as the dossier's basic guidance allows, with no risk numbers; family time as a habit; when the day changes (a guest, a move, a month with different hours) shrink to the smallest version. 6.5 quiz. 6.6 gate: a weekly rhythm plan with habits on real anchors (own or Nada's).

**Module 7, Your 30-day habit plan.** 7.1 Samir looks back at 30 days: a broken streak, a pattern in the misses, a habit that is easier than it was. 7.2 reading 30 days: days done, when the misses happened, their causes from the notes, first half against second half, keep, change (shrink, move the anchor, change the friction) or drop; change one thing at a time and watch for two weeks, because even experts could not predict which of 54 gym programmes would work (the megastudy in the dossier), so your own data is the test; two weeks is a hint, not proof. 7.3 mixed review: five fresh cases from modules 1 to 6, choose the tool to use first. 7.4 the capstone (section 9). 7.5 course gate: checklist across the course, `## Your habit toolkit` (one line per tool), the learning log including "look back at the habit you described in gate 1: what would you change about it now?", an openquestion for the next 30 days with a short rubric. A month too disrupted to show a habit forming still passes on the quality of the review and the restart plan, not on the outcome.

## 9. Capstone (7.4, Build, 90 minutes)

The fellow designs, runs and reviews **their own 30-day plan** (the course habit, or any habit), **or reviews one of three provided cases**, always available so nobody has to share personal circumstances or wait. A fellow with fewer than 30 days of data reviews what they have and says so. Write each provided case in full with a 30-day tracker table (day, done or missed, a short note) whose notes contain enough evidence to find the pattern, plus one short **AI answer** (in a block quote) that makes one mistake from the course:

1. **Nada's vocabulary sentence** (continuing her gates, using the canon in section 5 exactly): the AI answer says she failed because she missed 6 days and should start a new 21-day challenge.
2. **Ziad's evening walk** (15 minutes after the evening meal): misses on the days his shift ran late; after one miss he stopped for four days ("I already broke it"); the AI answer blames his willpower.
3. **Rasha's phone outside the bedroom** (breaking late-night scrolling): the phone charges in the kitchen from 23:00; nights it stayed out, and a pattern on weekend nights when guests stay late; the AI answer says to delete every app and use willpower.

The chapter teaches the five parts with a worked example on a fourth case, includes a ```mermaid diagram (the worked example's plan or review flow), a rubric, defence questions and the open question with `minWords: 250`:

1. **The habit:** written as a cue (if-then or anchor) and a tiny first step, with why this habit matters now.
2. **The surroundings:** what was made easier, what was made harder, and the backup and smallest versions.
3. **The tracker:** days done of 30, the longest gap, when the misses happened and what the notes say caused them; what the AI answer got wrong.
4. **The restarts:** what happened after each miss, and what helped or did not help.
5. **The decision:** keep, change or drop, with one change for the next 30 days and how you will know whether it helped.

The `modelAnswer` holds the mentor key for all three provided cases (the pattern, the main cause of the misses, the AI's mistake, acceptable decisions) and then a model answer for a fourth case.

## 10. Before you hand back

- Every file in your modules exists with the exact title and the roadmap minutes.
- Zero U+2014 and U+2013 characters, in chapters and in canvas files.
- Every sum, tracker and case checked twice; every MCQ blind re-answered.
- From `server/`: `node node_modules/tsx/dist/cli.mjs scripts/validate-course-source.ts --course building-habits` and `node node_modules/tsx/dist/cli.mjs scripts/audit-course-structure.ts --course building-habits` with no errors or warnings in your files. (Unregistered canvas slugs will fail validation until the orchestrator registers them; report them, do not edit the registry.)
- From the repo root: `node agent-ip/scripts/audit-course.mjs courses/building-habits` with no flags on your chapters (Learn chapters will show no interactive element until registration; that is expected).
- From `frontend/`: `node node_modules/vitest/vitest.mjs run tests/unit/canvas/<slug>.test.ts` for each slider canvas you made.
- Edit only your module folders, your canvas folders and your canvas tests. No git commands that change anything. Do not install packages. pnpm is broken here; use the node commands above.
- Report: files written, canvas slugs and renderers, prose words per chapter from the audit, any dossier claim you were unsure how to phrase.
