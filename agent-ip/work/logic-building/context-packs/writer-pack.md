---
artifact: context-pack
course: logic-building
for: chapter-writer
version: 2
---

# Writer pack: Think Clearly: Logic for the AI Era

Read this whole file before writing. It replaces the chapter briefs for this course (G2C was skipped on the sponsor's instruction; see `../decision-log.md`). The plan is `courses/logic-building/course.yaml`: write exactly the files, titles and goals listed there for your modules. Keep draft chapters in `agent-ip/work/logic-building/chapters/`; the orchestrator promotes reviewed files into `courses/logic-building/`. The roadmap is `../curriculum-roadmap.md` (minutes per chapter, outcomes, gate evidence). Look at `courses/decision-making/` for the exact file format of a teaching chapter, a quiz chapter and a gate (for example `02-trade-offs-and-competing-options/02.01`, `02.03`, `02.05` and `02.06`). Also skim `agent-ip/04-interactive-playbook.md` (option-length hygiene, quiz and predict rules) and `agent-ip/03-authoring-standards.md` (voice, forbidden patterns).

## 1. What this course is

The gentle starting point of the fellowship: a non-coding, non-technical course that builds logic and clear thinking for the AI era, taken **before** the soft-skills and tech courses. It must feel **playful and confidence-building, not academic**.

- Every module and most teaching chapters open with a small puzzle or a short story, not a definition.
- Being stuck is normal. Wrong answers are welcome: every quiz option is explained, so a wrong guess still teaches.
- No maths beyond adding, subtracting, multiplying, dividing and rough guesses. No formulas, no symbols such as `P -> Q`, no truth tables with letters.
- No coding and no pseudocode. Algorithmic thinking is taught with recipes, flowcharts and sorting by hand.
- No timers, no "only geniuses get this", no shaming. Encourage: "If you got it wrong, good: now you know the trick."

## 2. Learner and voice

- Gaza fellowship fellows at the start of the programme, from mixed backgrounds (many are not technical). Arabic is their first language; English is a second language.
- Plain English. Short sentences (aim under 20 words). One idea per sentence. Common words ("use", not "utilise"). Explain or avoid idioms. No wordplay or sarcasm that only works for native speakers.
- Most read on a phone with weak, expensive data and power cuts. No images. Tables narrow (3 columns ideal, 4 max, every cell under 120 characters). Diagrams small.
- Everyday scenarios: markets and shops, family budgets, cooking, study and exams, freelancing and clients, phone credit, transport, power and internet schedules. Use Arabic names of every gender (Lina, Yousef, Huda, Omar, Rania, Sami, Maryam, Khaled, Nour, Basel, Amal, Tamer...). Prices: shekels for local shopping, dollars for freelance pay.
- Hardship (power cuts, weak internet, studying while working) may appear as ordinary background. Never as a joke, never for drama. **Never ask a learner to share personal hardship.** Any prompt about their own life offers a neutral alternative ("or use the example below").

## 3. Hard rules (any violation fails review)

- **No em dashes or en dashes anywhere** (no U+2014, no U+2013). Use a colon, a comma, or two sentences. Ranges: "5 to 10". `content:audit` fails on them.
- **No company or product names.** No AI products or vendors (no ChatGPT, Claude, Gemini, Copilot, OpenAI, Google, Microsoft and so on). Say "an AI chat tool" or "an AI tool". No real websites, platforms or brands (say "a freelance website", "a messaging app").
- **No links.** Do not add `MustRead`, `InterestingRead` or `RealWorldEvent`.
- **No politics, religion or war** as puzzle, argument or example material. Weak arguments and rumours use neutral topics: prices, health tips, study methods, phones, job and scholarship offers.
- **No real people or real organisations.** All are fictional. The first time a fictional organisation appears in a chapter, mark it once, for example "the Bright Path Scholarship (a made-up scholarship)".
- **No AI or tool attribution** anywhere.
- **No slop:** no "In today's world", "It is important to note", "delve", "landscape", "game-changer", "Let's dive in", "key takeaways", "unlock", "journey". No motivational filler. Specific beats generic.
- **Do not invent facts.** No invented statistics about the real world. Numbers belong to the scenario ("in this example"). Real-world rough facts in Fermi chapters must be stated as guesses ("say about 6,000 people live in the neighbourhood").
- **Puzzles must be original.** You may use classic puzzle ideas (the bat and ball type, river crossings, logic grids, odd one out), but write them in your own words with local scenarios, never copied from a book or website.
- **Check every answer.** Solve every puzzle and every sum yourself, twice. A puzzle with two defensible answers must be rewritten.

## 4. Chapter file format

Draft path: `agent-ip/work/logic-building/chapters/<module-dir>/<file>` exactly as in course.yaml. Frontmatter:

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

`stepType`: `NN.01-set-the-scene.md` is Read; teaching chapters are Learn; `08.04-capstone-think-it-through.md` is Build; `*-quiz.md` is Check; `*-checklist.md` is Gate. `estimatedMinutes` must match the roadmap table.

### Set the scene (Read), 350 to 650 prose words
Open with a puzzle or a short story that shows the module's idea through a fictional person. Say what the module covers and why it helps. One `BigWordAlert` for the module's central term (props `term`, `plainEnglish`, `whyItMatters`). `LearningObjectives` (prop `items={[...]}`) once. A `## Key words` table (Word, Plain English) with four to six words, as in decision-making 2.1. A `## What is in this module` table (Chapter, You will practice). One `predict` (a warm-up puzzle) or one short `openquestion` (minWords 20 to 30, with a neutral alternative). End with `<ChapterRecap points={[...]} />` (three or four points) and a `**Next:**` line.

### Teaching chapter (Learn), 700 to 1,000 prose words
Shape: a hook (a puzzle, a mistake or a small story) in two to four sentences; the idea in plain words; a worked example with real reasoning shown step by step; a common mistake; then practice. Open each section with two to four sentences of prose; use a list only when the content is list-shaped, and write a sentence after it saying what it means.

Per teaching chapter:
- At most one `BigWordAlert` (only for the chapter's central new term). Use `GlossaryTerm` (props `term`, `definition`) for other new words on first use. Never both for the same term.
- One `predict` placed right before the explanation it prepares. The predict is a small puzzle: "Before you read on, guess."
- One or two `quiz` MCQs as transfer checks under `## Check your understanding` (a new scenario, not a repeat of the example).
- At most two `Callout`s (`type="tip"`, `"info"` or `"warning"`, with a `title`).
- At most one ```mermaid diagram, only where it helps (flowcharts, steps, cause arrows). Keep it under 7 nodes and use `flowchart TD` (top-down fits phones). Introduce it in prose before and say what to notice after.
- End with `<ChapterRecap points={[...]} />` (three to five short points) and a `**Next:**` line.
- Budget: at most 6 top-level components, at most 25 JSX tags in total, at most 3 assessments (predicts plus quizzes).
- No `openquestion` in teaching chapters (only set-the-scene, gates and the capstone).

### Quiz chapter (Check), file `NN.0X-quiz.md`
Activities only: **five** ```quiz MCQ fences (agent-ip allows three to five) and nothing else after the frontmatter (no headings, no prose, no predicts, no components). Never use the words "skip it" or "skip to". Modules 4 to 7: at least one of the five is a **"check the AI's answer"** question: the question shows a short answer an AI tool gave (in single quotes inside the question), and the learner picks what is wrong with it or what to check first.

### Gate (Gate), file `NN.0X-checklist.md`, 400 or more prose words in total
Copy the decision-making gate layout exactly:

```
This is the gate for module N. Tick each box only when it is true. Your answers save as you type.

## Module N checklist
- [ ] five or six items the learner can check honestly, including "I answered the questions in chapters N.2 to N.X, and finished the quiz in N.Y"

## Learning log
1. **Short label:** question
2. ...
(four numbered questions, about how they think, not facts to repeat)

## <Task heading>
A short paragraph: what to write, that a simple list is fine, that a mentor reads it, and a neutral example to use if they prefer not to use their own life.

```openquestion
...the gate evidence from the roadmap...
```

## All boxes ticked?
Mark this chapter complete, then continue to **<next module title>**.

**Next:** one sentence about the next module.
```

Gates contain no `BigWordAlert`, `GlossaryTerm`, `Callout`, diagram, canvas, predict or quiz. Module 1's gate has no open question (learning log only); every other gate has one.

## 5. Assessments

### MCQ fence (exact)
````
```quiz
type: mcq
question: "<a small scenario or puzzle that needs thinking, not recall>"
options:
  - "<option>"
  - "<option>"
  - "<option>"
  - "<option>"
correct: <0-based index>
explanations:
  - "<why this option is right or wrong, standalone>"
  - "..."
  - "..."
  - "..."
```
````
- Three or four options (four is normal). One reason per option, in option order. The right one starts with "Right."
- Wrong-option explanations are kind: they say what the option missed, never that the learner was silly.
- **Option length:** the correct option must not be longer than the longest wrong option (never 10% longer). In a quiz chapter the correct option is the strictly longest in at most one of five questions. Write all options at the same level of detail. Vary the correct position (use each of 0 to 3 at least once in a quiz chapter).
- No "all of the above", no joke options, no "Which is NOT".
- **Opinion goes to an open question.** Each graded key must follow from a clear rule taught in the course or from arithmetic.
- **Blind re-answer:** after writing each MCQ, cover the key and answer it from the question and options alone. If you hesitate between two options, rewrite. An independent blind review will re-answer every key later.
- Quote YAML strings with double quotes. Do not put a double quote inside a string; use single quotes inside. Always quote strings that contain a colon.

### Predict fence (exact; exactly two options)
````
```predict
prompt: "<a specific small puzzle or decision from this chapter>"
options:
  - id: <short-id>
    label: "<option>"
  - id: <short-id>
    label: "<option>"
correctOptionId: <id>
explanation: "<why, in one or two sentences>"
```
````
The correct label must not be longer than the other. Across your chapters, put the correct option first about half the time.

### Open question fence
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
modelAnswer: "<a strong answer about a fictional person, showing the shape>"
```
````
Use `allowUrl` and the url fields only in gates and the capstone. Set-the-scene open questions use only `prompt`, `required`, `minWords`, `allowSpeechInput` and `modelAnswer`.

## 6. Canvases

Three chapters embed a canvas. Read the canvas's `data.ts` and `spec.md` first, and make the chapter's names and numbers match it exactly. Put a `predict` before the canvas that matches its first "Try this" line, introduce the canvas in one or two sentences ("Step through it. Before step 2, guess..."), embed it with `<InteractiveCanvas slug="..." />` on its own line, then explain what it showed in prose after it.

| Chapter | Slug | Data |
|---|---|---|
| 2.5 Flowcharts | `freelance-job-flowchart` | `frontend/src/canvas/freelance-job-flowchart/data.ts` |
| 3.5 Things that change state | `job-application-status` | `frontend/src/canvas/job-application-status/data.ts` |
| 7.4 Check the AI's answer | `check-the-ai-answer` | `frontend/src/canvas/check-the-ai-answer/data.ts` |

No other chapter uses a canvas. Never put a canvas in a gate or a quiz chapter.

## 7. Module notes

**Module 1, Warm up.** 1.1 opens with a warm-up puzzle predict (for example: a notebook and a pen cost 11 shekels together; the notebook costs 10 shekels more than the pen; how much is the pen? Answer 0.5 shekels). Say plainly: no maths beyond the basics, mistakes are welcome, each module has a gate. 1.2 trick puzzles that reward careful reading (questions that ask something different from what you expect, extra details that do not matter). 1.3 fast and slow answers in plain words (no psychology names): when a quick answer is fine (low cost, easy to undo) and when to stop and check (money, deadlines, other people). 1.4 four moves when stuck: draw it, try a small case, work backward, ask a clear question; one worked puzzle per move. 1.5 gate: learning log only (a time they answered too fast, which move they will try first next time).

**Module 2, Steps and patterns.** 2.2 a recipe (tea or a simple dish) where a missing or swapped step ruins it; then planning a first freelance job as ordered steps; the test "could someone follow this without asking me?". 2.3 number and shape sequences and market price patterns; find the rule, predict the next, and check the rule on every item, not just the first two. 2.4 sorting 20 exam papers by mark: a slow way (look through the whole pile for the highest each time) and a faster way (split into piles by tens, then sort each small pile); count the steps for a small case. 2.5 flowcharts with the canvas; also a mermaid flowchart for a different small decision. 2.7 gate: written steps for a real task someone else could follow, or the provided task "prepare a room for a study group of six people".

**Module 3, If, then, and maybe.** 3.1 a scholarship with rules such as "If you are under 25 and have finished secondary school, you can apply." 3.2 and, or, not with clear everyday rules (shop discounts, bus routes, scholarship rules); who qualifies. 3.3 reading a rule backwards: "If it rains, the street is wet" does not mean "the street is wet, so it rained"; what you can conclude when the if-part is false (nothing); keep it in words, no symbols. 3.4 one worked logic grid (three people, three items, three clues) solved step by step with a small table, then a predict on the next deduction. 3.5 states with the canvas. 3.7 gate: a small logic puzzle (provided in the gate prose) solved and explained step by step in the learner's words.

**Module 4, Assumptions, causes and evidence.** 4.1 "That shop is always busy, so its food must be the best." 4.2 the hidden assumption (an unstated thing that must be true for the claim to work) and how to test it. 4.3 correlation vs cause with neutral examples (more umbrellas sold and more people with colds both rise in winter; students with more books at home get higher marks), the third factor, and reverse cause; a mermaid diagram of a third factor. 4.4 charts with cut-off axes and picked time periods described in words or a small table (no images), and small samples ("three friends got jobs this way"). 4.5 quiz includes a check-the-AI question (an AI claims one thing causes another from a correlation).

**Module 5, Rough numbers.** 5.1 "How many loaves of bread does a neighbourhood bakery sell in a day?" 5.2 Fermi method: break into smaller guesses, multiply, round, state assumptions; worked example with every assumption visible; a range is fine. 5.3 sanity checks: order of size, units, does it fit what you already know; catch an AI answer with an impossible number. 5.4 a family budget, a freelance hourly rate after platform fees (say the website keeps 10 percent), averages and how one very large number pulls an average (median in plain words as "the middle value", GlossaryTerm). Keep sums easy.

**Module 6, Weak arguments.** 6.1 a forwarded message that sounds convincing ("Doctors hate this simple trick..." style, but write your own, neutral health or study topic). 6.2 claim, reasons, evidence. 6.3 six traps: attacking the person, false choice (only two options), "everyone does it", slippery slope, "an expert said so" (when the expert is outside their field, or it is the only reason), and arguing against something nobody said. One short example and "what is missing" for each. 6.4 scam signs in job and scholarship messages: pay first to get paid, pressure to act today, too much money for little work, a personal email instead of an official one, asking for passwords or ID copies too early; how to check calmly. 6.5 disagree well: say the other view fairly first, then reply with a reason, politely.

**Module 7, Thinking with AI.** 7.1 a student who trusted an answer that sounded sure. 7.2 in plain words: an AI chat tool predicts likely words from patterns in a huge amount of text, so it can sound sure and still be wrong; what it is good at (drafting, explaining, giving ideas, rewording) and bad at (exact facts, recent facts, sums, sources). Avoid hype and fear. 7.3 five parts of a clear instruction: goal, context, steps, format, how to check; the same five parts work for a person; a before and after example. 7.4 canvas; three checks: find the source, solve it another way, check the rough numbers; a name of a source is not a source. 7.5 when not to use or trust AI: private data (yours, your family's, a client's), health and legal decisions (talk to a qualified person), when the point is your own learning, and honest work (follow the rules of your course, exam or client about AI use, and say when you used it).

**Module 8, Deciding and capstone.** 8.2 decision quality vs outcome (keep it short; course 3 goes deeper), options with rough chances, and "which would I regret more?". 8.3 small, cheap tests before big bets (try one small freelance job before quitting another; take one free lesson before paying for a course). 8.4 the capstone (section 8). 8.5 the course gate: a checklist across all habits, a `## Your thinking toolkit` list of the course's habits in one line each, the learning log including "look back at your first learning log in 1.5: what changed?", and no new open question (the capstone is the evidence).

## 8. Capstone (8.4, stepType Build, about 60 minutes)

The fellow thinks through **one real choice** from study, work or daily life, **or one of three provided scenarios**. The provided scenarios are always available so nobody has to share personal circumstances. Write the three scenarios in full in the chapter, each with a short **AI answer** (a captured answer from "an AI tool", shown in a quote block) that contains one checkable problem, so fellows without an AI tool can still do part 4:

1. Sami chooses between two online courses (a free one with no certificate and a paid one). The AI answer gets a sum wrong.
2. Maryam decides whether to buy a used laptop now or save for three more months. The AI answer states a "fact" with no source that she cannot check.
3. A family shop thinks about starting home delivery. The AI answer assumes a cause from a correlation.

The chapter teaches the five parts with a short worked example (a fourth fictional person), then the open question asks for all five parts:

1. **Steps:** the problem broken into steps, or a simple flowchart written as a list.
2. **Assumptions:** two hidden assumptions and how they would test one.
3. **A rough number:** one estimate with its assumptions.
4. **The AI check:** the question asked (or the provided AI answer), what they checked, and what they found wrong or could not verify.
5. **The decision:** what they would do, why, and what would change their mind.

Open question: `minWords: 200`, `allowSpeechInput: true`, `allowUrl: true`, `urlRequired: false`, voice note label and hint as in section 5. Include a short rubric in the chapter (five lines, one per part: what "clear" looks like) and say a mentor reviews it in about 15 minutes. The five-minute demo is the fellow walking a mentor through these five parts.

## 9. Before you hand back

- Every file in your modules exists, with the exact title from course.yaml and the minutes from the roadmap.
- Search your files for U+2014 and U+2013: zero.
- Every puzzle and sum solved twice. Every MCQ blind re-answered.
- From the repo root, run `node agent-ip/scripts/audit-course.mjs agent-ip/work/logic-building/chapters/` and fix every flag in your modules. After review, the orchestrator promotes approved chapters and runs source validation and the strict structure audit against `courses/logic-building/`.
- Edit only your assigned draft module folders; leave `course.yaml` and the final package to the orchestrator. Do not commit.
