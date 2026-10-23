---
artifact: context-pack
course: cause-and-effect
for: chapter-writer
version: 1
---

# Writer pack: Why Things Happen: Cause, Effect and Systems Thinking

Read this whole file before writing. It replaces the chapter briefs for this course (G2C was skipped on the sponsor's instruction; see `../decision-log.md`). The plan is `content/import/cause-and-effect/course.yaml`: write exactly the files, titles and goals listed there for your modules. The roadmap is `../curriculum-roadmap.md` (minutes, outcomes, gate evidence). The research dossier is `../research.md`: **every factual claim about a method, its origin or its limits must match the dossier**, phrased the way it says; never state a claim it marks unverified. Look at `content/import/decision-making/02-trade-offs-and-competing-options/` (`02.01`, `02.03`, `02.05`, `02.06`) for the exact file format of a scene, a teaching chapter, a quiz chapter and a gate. Skim `agent-ip/03-authoring-standards.md` (voice, forbidden patterns) and `agent-ip/04-interactive-playbook.md` (budgets, option-length hygiene, quiz and predict rules).

## 1. What this course is

A practical course on finding out why things really happen, for fellows who will debug systems, serve clients, run small projects and judge claims at work. It is **more demanding than course 9** (Think Clearly) but still plain and kind. It moves from spotting false causes, to testing real ones, to digging for root causes, to solving problems step by step, to systems and consequences, and ends with a full investigation.

- Open every chapter with a concrete problem or case, never a definition.
- Teach the method, then show it working on a full worked example with real reasoning, then show where it goes wrong.
- No statistics formulas, no notation. Chance and samples in plain words.
- Wrong answers are welcome; every option is explained kindly.

## 2. Learner and voice

- Gaza fellowship fellows, mixed backgrounds, building careers in tech and remote work. Arabic first; English as a second language. Most read on phones with weak, expensive data and power cuts.
- Plain English. Short sentences (aim under 20 words). Common words. Explain or avoid idioms. Define every new term on first use.
- Everyday cases: shops and home businesses, freelance clients, study and exams, phones and laptops, family plans, small teams and NGOs. Arabic names of every gender. Shekels for local prices, dollars for freelance pay.
- Recurring cast (keep them consistent across modules): **Huda** runs a home bakery (modules 1 and 6). **Basel** studies and tests a study app (module 2). **Sami** is a freelance designer (module 3). **Amal**'s family runs a small grocery shop with bicycle deliveries (module 4; match the `five-whys-chain` canvas). **Nour** has a laptop that will not charge (module 5; match the `laptop-charging-detective` canvas). Module 7 and 8 may add new people.
- Hardship may appear as ordinary background, never as a joke or for drama. Never ask a learner to share personal hardship; every personal prompt offers a provided case instead.

## 3. Hard rules (any violation fails review)

- **No em dashes or en dashes anywhere.** Use a colon, a comma or two sentences. Ranges: "5 to 10".
- **No company or product names**, no AI products (say "an AI chat tool"), no real websites or brands.
- **No links**, and no `MustRead`, `InterestingRead` or `RealWorldEvent` blocks.
- **No politics, religion or war** as case material.
- **Real people and history only where the dossier supports them**, and only as the dossier phrases it (for example the origin of the five whys or the fishbone diagram). Otherwise all people, organisations and cases are fictional; mark a fictional organisation once per chapter.
- **No AI or tool attribution.** No slop: no "In today's world", "It is important to note", "delve", "landscape", "game-changer", "Let's dive in", "key takeaways", "unlock", "journey".
- **No invented statistics about the real world.** Numbers belong to the case ("in this example").
- **Check every sum and every case twice.** A case must actually support the conclusion the chapter draws.

## 4. Chapter file format and budgets

Path: `content/import/cause-and-effect/<module-dir>/<file>` exactly as in course.yaml. Frontmatter:

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

`NN.01-set-the-scene.md` is Read; teaching chapters are Learn; `08.03-capstone-investigate-a-problem.md` is Build; `*-quiz.md` is Check; `*-checklist.md` is Gate.

**agent-ip prose minimums apply in full** (`02-course-architecture.md` → Prose depth). They are counted by `agent-ip/scripts/audit-course.mjs` over **paragraphs only**: headings, lists, numbered steps, tables, block quotes, components and fences do not count.

| Chapter type | Prose words (paragraphs) | Diagram | Assessments |
|---|---|---|---|
| Set the scene (Read) | 1,200 or more | one ```mermaid | one predict or one short openquestion |
| Teaching (Learn) | 1,200 or more | one ```mermaid | one predict, one or two quiz MCQs (at most 3 in total) |
| Capstone (Build) | 1,200 or more | one ```mermaid | the capstone openquestion only |
| Quiz (Check) | none: activities only | none | exactly **five** quiz MCQs |
| Gate | 700 or more | none | one openquestion (module 1 gate: none) |

Every chapter: at most 6 top-level components and 25 JSX tags in total.

**Recaps and definitions (agent-ip `02-course-architecture.md`):** `ChapterRecap` goes in the module gate only, never in a scene, teaching, quiz or capstone chapter. `LearningObjectives` goes in the set-the-scene chapter only. `BigWordAlert` is for the module's central term in its set-the-scene chapter, and at most once in a teaching chapter for a new, load-bearing term the course has not defined before. Never define the same term twice in the course: after its first definition, refer back ("the third factor you met in 2.2"). Write long by **explaining**, not padding: more worked reasoning, a second short example, the common mistake and how to spot it, what to do next. Paragraphs of two to five short sentences.

### Set the scene (Read)
A case told as a short story that shows the module's problem; why it matters at work; what the module covers. One `BigWordAlert` (props `term`, `plainEnglish`, `whyItMatters`) for the central term. `LearningObjectives` (`items={[...]}`) once. A `## Key words` table (Word, Plain English) of four to six words and a `## What is in this module` table (Chapter, You will practice). One ```mermaid diagram of the case. One predict or one short openquestion (minWords 20 to 30, with a provided alternative). End with a `**Next:**` line.

### Teaching chapter (Learn)
Hook (a case or a mistake), the idea in plain words, the predict before anything reveals its answer, a full worked example with the reasoning shown step by step, a ```mermaid diagram that argues the relationship (introduced in prose before, explained after), where the method goes wrong, one predict placed right before the explanation it prepares, one or two quiz MCQs under `## Check your understanding` on a **new** case, then a `**Next:**` line. At most one `BigWordAlert` (see the recap and definition rules above); `GlossaryTerm` (props `term`, `definition`) for other new words on first use; at most two `Callout`s.

Mermaid on phones: `flowchart TD`, at most 7 nodes, short node text, quote any label with punctuation. For a fishbone, draw the problem with grouped causes feeding it (one node per group, causes listed in the node text). For loops, label edges with plain words ("more", "fewer").

### Quiz chapter (Check)
Activities only: five ```quiz MCQ fences and nothing else after the frontmatter. Modules 2, 5, 6 and 7: at least one **"check the AI's answer"** question (show a short AI answer in single quotes inside the question; the learner picks the causal mistake in it or the right check). Never write "skip it" or "skip to".

### Gate
Use the decision-making gate layout: intro sentence, `## Module N checklist` (five or six honest items, including "I answered the questions in chapters N.2 to N.X, and finished the quiz in N.Y"), `## Learning log` (four numbered questions about how they think), a task section, the openquestion, `## All boxes ticked?`, `**Next:**`. To reach 700 prose words, explain in paragraphs: what the task is for, what a strong answer looks like (a short worked example about a fictional person, in prose), the provided case for anyone who prefers not to use their own life, and how the mentor will read it. No `BigWordAlert`, `GlossaryTerm`, `Callout`, diagram, canvas, predict or quiz in a gate. End every gate with `<ChapterRecap points={[...]} />` (four or five points for the module) before `## All boxes ticked?`. Module 1's gate has an openquestion for the cause chain (minWords 60, with a model answer). Every gate's "how your mentor will read it" section has a small table: each criterion with three levels (Met, Partly, Not yet) and an observable threshold, a pass rule, and the follow-up step (the mentor replies with one or two questions, and the learner answers them).

## 4A. Revision rules from G5 round 1

- **Quiz items test the skill on evidence.** In each quiz chapter at least two items give a small table or three to four stated facts and ask which conclusion or next check the facts support; each wrong option fails because of a different stated fact. No item repeats an item or predict elsewhere in the course. The key's wording is not in the stem and is not a sentence from the chapter. Every quiz actor has a name, a place and a number. Wrong options are mistakes a learner of this course would really make; an AI answer in a question sounds reasonable.
- **Predicts are not always the sceptical option.** In at least a third of your predicts the intuitive answer is the right one, or both options are plausible.
- **Plain words.** No idioms or figures of speech (for example "bend a number", "first aid", "crown the trick", "put people off", "lands on your desk", "pay twice", "invisible wall"); say the literal thing. Define "rule of thumb" at its first use. No sentence over 30 words. No unsupported superlatives ("the most common mistake"): say "a common mistake".
- **Small tests are hints.** Never "strong hint"; every small comparison in a worked case ends with "a hint: run it again" or says the groups are small.
- **Vary settings.** Do not reuse a setting another module already uses for the same kind of problem (late online meetings, print shops, phone repair, online English teaching). Use other everyday places: a clinic desk, a school canteen, a bus office, a farm stall, a tailor, a pharmacy, a water delivery round, a sports club.
- **Cast.** The recurring people keep their facts (section 2 and the canon below). A name belongs to the earliest module that uses it. If a person in your modules has a name that an earlier module already uses for someone else, rename your person; never rename to dodge a later module. New names come only from your own name pool in your revision message. Grep the whole course before you use any name.
- **Huda canon.** Module 1 happens last summer: her home bakery sells cakes, date biscuits and pastries, about 60 orders a month; her husband is Omar, and her son (not named) delivers on foot. Module 6 happens this spring, a year later: she now sells mostly cakes, 36 to 40 a week, and her son delivers by bicycle. The capstone case happens this autumn: she has a second oven since the spring, and the case counts all weekend orders of cakes, biscuits and pastries.

## 5. Assessments

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
- **Option length:** the correct option is never longer than the longest wrong option (never 10% longer); in a quiz chapter it is the strictly longest in at most one of five. Same level of detail in every option. Use each position 0 to 3 at least once per quiz chapter.
- No "all of the above", no joke options, no "Which is NOT".
- Every key follows from a method taught in the course or from arithmetic. Opinion goes to open questions.
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
modelAnswer: "<a strong answer about a fictional person>"
```
````
Set-the-scene open questions use only `prompt`, `required`, `minWords`, `allowSpeechInput`, `modelAnswer`.

## 6. Canvases

| Chapter | Slug | Data |
|---|---|---|
| 4.3 The five whys | `five-whys-chain` | `frontend/src/canvas/five-whys-chain/data.ts` and `spec.md` |
| 5.3 Guess, test, repeat | `laptop-charging-detective` | `frontend/src/canvas/laptop-charging-detective/data.ts` and `spec.md` |

Read the data and spec first; match every name, time and number. Put a predict before the canvas matching its first "Try this" line, introduce it in one or two sentences, place `<InteractiveCanvas slug="..." />` on its own line, explain what it showed in prose after it, and follow with a quiz MCQ on a new case. The predict must come before the chapter or the canvas reveals the answer, and the canvas must not repeat a question the chapter already answered. The chapter must teach the claim in prose too (the canvas is not the only path). No other chapter uses a canvas.

## 6A. Interactive-first (agent-ip v0.4, from round 3)

agent-ip v0.4 (`04-interactive-playbook.md`, `10-interactive-canvases.md`, `agents/chapter-writer.md`) requires **every Learn chapter to teach through at least one interactive element** the learner steps through or manipulates and sees change, with a predict before it, "what changed" in prose after it, and a transfer check later in the chapter. Predicts and quizzes do not count as the element. In this course the element is a **registered canvas on an existing renderer** (data plus a spec, no new code), except where the pack names a custom one.

For each of your Learn chapters that has no canvas yet:
- Pick the claim the chapter's decision depends on, and the renderer that fits it (`10-interactive-canvases.md` → Reusable renderers): **sequence** for something moving between two to four actors over time (a message, a test, a delivery), **state machine** for a chain, a loop or a lifecycle (grid at most 3 columns by 2 rows; edge labels at most 14 characters, at most 3 characters on an arrow between two states in the same column; no diagonal beside a parallel arrow), **factor** for weighing options against criteria.
- Create `frontend/src/canvas/<slug>/data.ts` (typed with the renderer's spec type, header comment naming the course and chapter, `title`, `purpose`, `summary` for screen readers, steps with `title` and `note` in the course's plain English, `tryThis` with the first line matching your predict, honest `limits`) and `frontend/src/canvas/<slug>/spec.md` on template 14A (teaching claim, why a canvas, model, rendering, copy, edge cases, accessibility, acceptance criteria). Use an existing canvas such as `five-whys-chain` or `laptop-charging-detective` as the model. Slugs are lower-case with hyphens, unique, and describe the claim.
- **Do not edit** `frontend/src/canvas/registry.ts` or any `slugs.ts`: the orchestrator registers every slug after you report, then runs the registry tests and sends back any failure.
- In the chapter: the predict comes first, a sentence sends the learner to step through, `<InteractiveCanvas slug="<slug>" />` on its own line, then a paragraph on what it showed, and later a quiz item that transfers the claim to a new case. The canvas must not repeat a question the chapter already answered. The chapter still teaches the claim in prose. The chapter keeps its Mermaid diagram if it argues something different; otherwise replace the diagram with the canvas and keep the diagram rule met elsewhere in the chapter.
- Names, numbers and facts in the canvas must match the chapter exactly. No em or en dashes, no idioms, no brand names.

## 7. Module notes

**Module 1, Why things happen.** 1.1 Huda's home bakery: orders dropped in one month; her family offers five different single causes (prices, the new shop, the weather, her new oven, school holidays). 1.2 cause chains: direct cause, contributing causes, a chain drawn back from the problem; "a cause you can act on". 1.3 the single-cause trap: most outcomes have several causes working together; how to list them before choosing. 1.4 after is not because: the order of events is not proof; everyday examples (a new phone case and fewer drops; a lucky shirt); what extra evidence would help. 1.5 gate: a chain for a problem they have seen (or the provided case: a phone battery that drains fast).

**Module 2, Correlation and cause.** Deeper than course 9 module 4; do not assume it. 2.1 Basel and the study app claim. 2.2 hidden third factors (motivated students both use the app and study more). 2.3 reverse cause, chance and the drift back to normal: tiny samples, streaks, and regression to the mean in plain words using the dossier's coin-toss style example, never a military story. 2.4 survivors and selection: fictional cases only (advice drawn only from successful freelancers, students who stayed, reviews from current users). Do not tell the aircraft armour story. 2.5 quiz with one AI check. 2.6 gate: one real claim (or provided) tested four ways.

**Module 3, Testing a cause fairly.** 3.1 Sami changed his profile photo, prices and portfolio in one week and got more clients: which change worked? 3.2 change one thing at a time, keep the rest the same. 3.3 comparison groups: what would have happened anyway; "random" in plain words (a coin flip decides who gets the change). 3.4 small experiments and A/B tests: decide the measure and the number of cases before starting, run whole weeks, do not stop early because you are ahead, treat one small test as a hint and repeat it. Never give a general sample-size number. 3.6 gate: a fair test plan.

**Module 4, Finding root causes.** 4.1 Amal's shop and late deliveries (match the canvas facts: 11 of 20 late, promised by 14:00). 4.2 symptoms and root causes; fixing symptoms keeps problems coming back. 4.3 five whys with the canvas; where it goes wrong (stopping at blame, one chain only, guesses instead of checking), per the dossier. Origin exactly as the dossier phrases it: a large Japanese car maker's factory system and Taiichi Ohno; do not name the company. Do not use the Washington Monument example or the 'too basic a tool' quote. 4.4 fishbone diagrams: problem as the head, groups of causes as bones (use the category set the dossier recommends for small businesses and teams), then pick which causes to check with evidence. 4.5 causes, not culprits, and strong fixes: process causes over person blame; strong fixes (a better design) over weak ones (a reminder, a memo, retraining) as the dossier ranks them. 4.7 gate: five whys and a fishbone for a real or provided problem.

**Module 5, Solve it like a detective.** 5.1 Nour's laptop the day before a deadline. 5.2 describe exactly: what, where, when, how much, and what is not affected (the "is and is not" idea, per the dossier). 5.3 guess, test, repeat with the canvas: list causes, test one at a time, cheapest likely first as a rule of thumb (not a law), confirm the fix with a test, keep a log. 5.4 split the problem in half: a chain of steps (for example a message that does not reach a client: phone, app, internet, the client's side), test the middle, rule out half each time; count tests for 8 and 16 steps. Safety: never open a device or charger; switch off and unplug before checking a port. 5.5 quiz with one AI check (an AI suggests replacing the most expensive part first).

**Module 6, Systems and feedback loops.** 6.1 Huda's bakery grew fast, then stalled. 6.2 reinforcing loops (good reviews bring customers who leave more reviews; and the same loop in reverse). 6.3 balancing loops, delays and stocks (more orders mean longer waits, which slow orders; overshoot when the effect comes late, for example ordering flour by last week's sales; a stock such as a pile of waiting orders fills and drains like a water tank). 6.4 bottlenecks: the slowest step (one oven) sets the pace; speeding up other steps only builds a pile; once fixed, the bottleneck moves to the next slowest step; per the dossier's wording on the theory of constraints. 6.5 quiz with one AI check.

**Module 7, Consequences.** 7.1 a well-meant rule that made a problem worse (fictional: a study centre fines late arrivals, and more students stop coming at all). 7.2 "and then what?": first, second and third effects; who reacts and how. 7.3 incentives and targets: a target changes behaviour (a support team rewarded for closing tickets fast closes them before they are solved); state the well-known saying about measures and targets exactly as the dossier attributes it (do not put the popular wording in quotation marks as Goodhart's words). Do not tell the cobra story; use fictional everyday cases. 7.4 side effects: predict reactions, start small, decide in advance what you will watch. 7.5 quiz with one AI check.

**Module 8, Learning from what went wrong, and capstone.** 8.1 a small team's launch went wrong (a fictional NGO's sign-up form lost a week of entries). 8.2 reviews without blame: timeline, causes, what will change, who owns it; without blame does not mean without responsibility (the just culture limit), per the dossier. 8.3 the capstone (section 8). 8.4 course gate: a checklist across all habits, `## Your cause-and-effect toolkit` (one line per habit), the learning log including "look back at your chain from 1.5: what would you add now?", no openquestion.

## 8. Capstone (8.3, Build, about 75 minutes)

The fellow investigates **one real problem** from study, work or daily life, **or one of three provided cases**, always available so nobody has to share personal circumstances. Write each provided case in full with a small table of real-looking data (weeks and numbers) that contains enough evidence to separate causes, plus one short **AI answer** (in a block quote) that makes one causal mistake from the course (for example "after, so because", a correlation as a cause, or blaming a person):

1. Huda's weekend orders fell over six weeks (a price change, a new competitor and a broken oven all happen in that time; the data must point to one main cause and one contributing cause).
2. A study group's attendance fell (a time change, exams, a new member).
3. A freelancer's client ratings dropped (faster deadlines accepted, a new tool, a difficult client).

The chapter teaches the five parts with a worked example on a fourth case, includes a ```mermaid diagram (the worked example's cause map), a five-line rubric, defence questions and the open question with `minWords: 250`:

1. **Describe it exactly:** what, where, when, how much, and what is not affected.
2. **Map the causes:** a fishbone list (groups and causes) or a cause chain.
3. **Find the root cause with evidence:** five whys or a chain, each step backed by evidence from the case; say what the AI answer got wrong.
4. **Test the fix fairly:** one change, a comparison, the measure and the time decided in advance.
5. **And then what?:** two likely side effects of the fix and the one you will watch.

## 9. Before you hand back

- Every file in your modules exists with the exact title and the roadmap minutes.
- Zero U+2014 and U+2013 characters.
- Every sum and case checked twice; every MCQ blind re-answered.
- From `server/`: `node node_modules/tsx/dist/cli.mjs scripts/validate-course-source.ts --course cause-and-effect` and `node node_modules/tsx/dist/cli.mjs scripts/audit-course-structure.ts --course cause-and-effect` with no errors or warnings in your files.
- From the repo root: `node "../buildment-agentip-fixes/agent-ip/scripts/audit-course.mjs" content/import/cause-and-effect` (the corrected agent-ip audit) with no flags on your chapters.
- Edit only your two module folders. No git commands that change anything. Do not install packages. pnpm is broken here; use the node commands above.
