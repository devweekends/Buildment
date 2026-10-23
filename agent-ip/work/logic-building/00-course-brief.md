---
artifact: course-brief
course: logic-building
working_title: Think Clearly: Logic for the AI Era
version: 1
status: draft
owner: Zeeshan (architect)
target_publish: after G2B sign-off and human review
---

# Course brief: logic-building (course 9)

> The input for the agent-ip course builder (G0). The roadmap is `curriculum-roadmap.md`. On the sponsor's instruction the chapters were drafted before G2B sign-off (see `decision-log.md`).

## Working title options

1. **Think Clearly: Logic for the AI Era** (recommended: plain, says what it is)
2. **Think First: Clear Thinking When AI Has an Answer for Everything**
3. **Puzzles, Proof and Prompts: A Gentle Start in Logic**

## One sentence

Fellows learn to break problems into steps, reason with rules, spot weak claims, estimate with rough numbers and check what an AI tells them, so they can think clearly and confidently before they start the tech and soft-skills courses.

## Where it sits

Course 9 in the pipeline numbering, but meant to be taken **first**. It is the gentle starting point before courses 3 to 7 (soft skills) and course 8 (AI engineering interview). It needs no coding and no maths beyond adding, multiplying and rough guesses.

## Tone

- **Playful and confidence-building, not academic.** Every module opens with a puzzle, not a definition.
- **Being stuck is normal.** The course teaches what to do when stuck (draw it, try a small case, work backward, ask a clear question) as a skill in its own right.
- **Wrong answers are welcome.** Every quiz option has an explanation, so a wrong guess still teaches something.
- **No timed tests, no leaderboards.** Nothing that makes a slower thinker feel behind.
- **Everyday scenarios:** markets and shops, family budgets, study and exams, freelancing and clients, cooking, transport, phone credit, power and internet schedules. Never as a joke, never for drama.

## Learner

- **Who:** fellows on the Gaza fellowship, early in the programme, from mixed backgrounds (some technical, many not).
- **Prior knowledge:** none required. Basic reading in English and simple arithmetic.
- **Language:** Arabic first; English as a second language, from intermediate to good. Short sentences, common words, every new term defined in one plain sentence the first time it appears.
- **Device and connection:** mostly phones, weak or expensive mobile data, power cuts. Pages must be light: no heavy images, no autoplay video, every interaction saves on its own.
- **Time available:** about 10 to 15 hours in total. Suggested pace: about 1 hour a day over 2 to 3 weeks, or alongside another course.
- **Motivation:** feel confident thinking through problems; stop being fooled by weak claims or confidently wrong AI answers; get ready for the harder courses.
- **What they will do with the result:** use the same habits in every later course: steps before action, check before trust, explain the reasoning.

## Outcome

By the end, the learner can:

1. **Break** an everyday task into clear, ordered steps and draw it as a flowchart someone else can follow.
2. **Solve** short logic puzzles with if/then, and/or/not rules, and **explain** each step in their own words.
3. **Name** the hidden assumption in a claim and say one way to test it.
4. **Tell** cause from correlation in an everyday example and **suggest** a possible third factor.
5. **Make** a rough estimate (a Fermi estimate) with stated assumptions, and **use** it to check whether a number makes sense.
6. **Spot** common weak arguments and too-good-to-be-true offers, and **reply** respectfully.
7. **Write** clear instructions for a person or an AI tool, and **check** an AI answer with at least two methods before using it.
8. **Make and explain** a decision when some information is missing, including what would change their mind.

## Demo

In five minutes the fellow walks a mentor through their capstone: the flowchart of the problem, one hidden assumption they found, their rough estimate, what the AI got right and wrong, and the decision with its reason.

## Product scope

Not applicable as written: this course has no software product. Read it as **course scope** instead.

- **Must have:** the 8 modules below, a puzzle or predict in every module, at least one "check the AI's answer" exercise in modules 4 to 8, a gate with checklist and learning log per module, the capstone.
- **Should have:** canvases on the existing renderers (sequence, stepper, state machine, flip-a-factor); a short optional warm-up puzzle set at the start (ungraded, only to set the tone); a one-page "thinking toolkit" summary at the end.
- **Out of scope:** see "Non-goals" below.

## Production bar

Not applicable as a code production bar (no code is built). The equivalent bar for this course:

- Every puzzle and answer key is solved again cold by an independent reviewer before sign-off.
- Every quiz option has an explanation; the correct option is not the longest by default and its position varies (agent-ip assessment rule).
- Anything opinion-based goes in an open question, never a graded quiz.
- Every "check the AI's answer" exercise uses a captured AI answer stored in the chapter, so it works offline from AI tools and costs no extra data.
- `content:validate:source`, `content:audit` and `content:import` pass, then a click-through as `mentee1@buildment.dev` at phone width.

## Variants

Not applicable for the first version. This is a foundation course, not a product course, so there is no product to vary. A later option (see open questions) is **scenario packs**: the same outcomes with scenarios themed for freelancing, study or small business.

## Constraints

- **Stack:** the buildment reader and existing blocks only: quizzes with per-option explanations, predict-then-reveal, open questions, checklist, learning log, `InteractiveCanvas` on the registered renderers. Any new canvas slug needs a canvas spec and QA report first (agent-ip 08, templates 14A and 14B).
- **Budget:** 10 to 15 hours core. Proposed: about 13 hours (see time budget).
- **Platform limits:** at most one canvas per chapter and none in a gate (the audit flags both). Light pages for phones.
- **Legal or privacy:** never ask fellows to paste personal, family or client data into an AI tool. No exercise depends on a live AI tool or a paid account. Classic puzzles are rewritten in original wording and local scenarios, never copied from puzzle books.

## Non-goals

- **No coding.** Algorithmic thinking is taught with recipes, flowcharts and sorting by hand. Code comes in the tech courses.
- **No formal logic or maths notation.** No truth tables with symbols, no proofs, no statistics formulas. Plain words only.
- **No prompt-engineering course.** Module 7 treats prompting as structured thinking (clear goal, context, steps, format, check), not tricks for one tool.
- **No AI tool tutorials.** No specific product is taught, and nothing assumes a paid account.
- **No decision frameworks in depth.** Weighted matrices, risk registers and biases in depth belong to course 3 (Decision-Making); module 8 only opens the door.
- **No politics, religion or war as puzzle material.** Weak arguments and rumours use neutral topics (prices, health tips, scholarships, job offers).

## Success signals

- At least 85% of fellows who start module 1 finish module 2 (the course should pull people in, not sort them out).
- Learning logs show fellows using a named habit ("I checked the number", "I drew it first") in their own words.
- Capstones show a real AI check: something the fellow found wrong or unverified, not only "the AI was right".
- Mentors report fellows arriving at courses 3 to 8 asking clearer questions.
- Mentor review time per capstone stays under 15 minutes with the rubric.

## Proposed module outline

A preview for the roadmap, not the roadmap. Each module: one-line goal, chapter ideas, practice types. About 35 short chapters in total, sized for phones.

### Module 1: Warm up your thinking (about 1 hour)
**Goal:** feel that thinking is a skill you can train, and learn what to do when you are stuck.
- Welcome: how this course works (puzzles, no maths, mistakes are welcome)
- Read slowly: puzzles that trick fast readers (a notebook and a pen cost 11 together...)
- Fast answers and slow answers: when to stop and check
- How to be stuck well: draw it, try a small case, work backward
- Gate

**Practice:** predict-then-reveal on trick puzzles, quizzes with an explanation for every option, learning log ("a time I answered too fast").

### Module 2: Steps and patterns (about 1.5 hours)
**Goal:** break a task into clear ordered steps and spot the pattern in a sequence.
- Recipes are instructions: making tea or maqluba in the right order
- Break a big task into small steps: planning a first freelance gig
- Patterns and sequences: numbers, shapes and prices in the market
- Sorting by hand: the fastest way to order 20 exam papers
- Flowcharts: draw a decision so someone else can follow it

**Practice:** sequence canvas (put the steps in order), stepper canvas (walk a flowchart), "what comes next?" quizzes, open question (write the steps for a task a younger sibling could follow).

### Module 3: If, then, and maybe (about 1.5 hours)
**Goal:** reason with rules and conditions, and tell what follows from a rule and what does not.
- If this, then that: rules in daily life (scholarship rules, shop opening hours)
- And, or, not: combining conditions
- What follows and what does not: "if it rains the road is wet" is not "the road is wet so it rained"
- Logic grid puzzles: who bought what at the market
- Things that change state: a delivery order, a phone top-up, a job application

**Practice:** logic grid puzzles as quizzes, state-machine canvas, predicts on reversed rules, open question (explain your solving steps in your own words).

### Module 4: Assumptions, causes and evidence (about 2 hours)
**Goal:** spot hidden assumptions and tell cause from correlation, including in charts.
- Hidden assumptions: "the shop is always busy, so its food must be good"
- Cause or coincidence: two things moving together is not proof
- The missing third factor
- Reading charts honestly: cut-off axes, picked time periods, missing totals
- Small samples, big claims: "three friends got the job this way"

**Practice:** flip-a-factor canvas (find the third factor), chart quizzes, first "check the AI's answer" (an AI claims a cause from a correlation), open question (find an assumption in a claim you heard this week, or in a provided one).

### Module 5: Rough numbers and good guesses (about 1.5 hours)
**Goal:** estimate with rough numbers and use the estimate to check whether a claim makes sense.
- Why a rough answer beats no answer
- Fermi questions: how many loaves does a neighbourhood bakery sell in a day?
- Sanity checks: does this number make sense?
- Budgets and averages: a family budget, a freelance hourly rate after platform fees

**Practice:** predicts with ranges ("pick the closest range"), quizzes, "check the AI's answer" (an AI gives an impossible number), open question (show your estimate and its assumptions).

### Module 6: Weak arguments and how to answer them (about 1.5 hours)
**Goal:** spot common weak arguments and too-good-to-be-true offers, and reply respectfully.
- What an argument is: claim, reason, evidence
- Six common traps: attacking the person, false choice, "everyone does it", slippery slope, "an expert said so", arguing against something nobody said
- Too good to be true: fake job offers and scholarship scams
- Disagree well: state the other view fairly before you answer it

**Practice:** scenario quizzes (name the trap), predicts (what is wrong with this job offer?), "check the AI's answer" (an AI repeats a weak argument), open question (reply politely to a weak claim).

### Module 7: Thinking with AI: ask well, check always (about 2 hours)
**Goal:** write clear instructions for people and for AI, and check an AI answer before trusting it.
- What AI is good at and bad at: it predicts likely words, so it can be confident and wrong
- Clear instructions in five parts: goal, context, steps, format, how to check
- Hallucinations: made-up facts, names and sources
- Three ways to check a claim: find the source, solve it another way, check the rough numbers
- When not to trust or use AI: private data, health and legal questions, your own learning, honest work

**Practice:** "check the AI's answer" exercises on captured answers (find the error, rate the answer), predicts (will this instruction get a good answer?), open question (rewrite a vague instruction into a clear one, for a person and for an AI).

### Module 8: Deciding without all the facts, and capstone (about 2 hours)
**Goal:** make and explain a decision when information is missing, then bring every habit together.
- Good decisions and good outcomes are not the same
- Options, chances and "what would I regret?"
- Small tests before big bets
- Capstone: think it through
- Course gate and your thinking toolkit

**Practice:** predicts on decisions, quizzes, the capstone open question, final learning log.

## Practice types per module

| Module | Quizzes and predicts | Canvas | Check the AI | Open question | Gate |
|---|---|---|---|---|---|
| 1 Warm up | trick puzzles, fast or slow | none | no | no | checklist, learning log |
| 2 Steps and patterns | what comes next | sequence, stepper | no | write steps for a task | checklist, learning log |
| 3 If, then, and maybe | logic grids, reversed rules | state machine | no | explain your solving steps | checklist, learning log |
| 4 Assumptions and causes | charts, assumptions | flip-a-factor | yes | find an assumption | checklist, learning log |
| 5 Rough numbers | range predicts | none | yes | show your estimate | checklist, learning log |
| 6 Weak arguments | name the trap | none | yes | reply politely | checklist, learning log |
| 7 Thinking with AI | will this instruction work? | none | yes, main focus | rewrite an instruction | checklist, learning log |
| 8 Deciding and capstone | decision predicts | none | inside capstone | capstone | final checklist, learning log |

## Capstone idea: "Think it through"

The fellow picks **one real choice** from study, work or daily life (for example: which online course to take next, whether to accept a freelance job, how to plan a small family purchase), **or one provided scenario**. The provided scenarios are always available, so nobody has to share personal circumstances.

They submit, as an open question (written, or a link to a voice note):

1. **Steps:** the problem broken into steps, or a simple flowchart (a photo of a hand drawing is fine).
2. **Assumptions:** two hidden assumptions and how they would test one.
3. **A rough number:** one estimate with its assumptions.
4. **The AI check:** the question they asked an AI (or a provided AI answer, if they have no access), and what they checked, found wrong or could not verify.
5. **The decision:** what they would do, why, and what would change their mind.

A mentor reviews it with a short rubric (steps clear, assumptions real, estimate reasonable, AI check honest, decision explained). The five-minute demo is a walk through these five parts.

## Time budget

Suggested **about 13 hours core**, inside the 10 to 15 hour range and the agent-ip soft-skills band (8 to 20 hours).

| Module | Hours |
|---|---|
| 1 Warm up your thinking | 1 |
| 2 Steps and patterns | 1.5 |
| 3 If, then, and maybe | 1.5 |
| 4 Assumptions, causes and evidence | 2 |
| 5 Rough numbers and good guesses | 1.5 |
| 6 Weak arguments | 1.5 |
| 7 Thinking with AI | 2 |
| 8 Deciding and capstone | 2 |
| **Total** | **13** |

Stretch (optional, about 2 hours): a bonus puzzle set per module and a second capstone scenario.

## Out of scope

- Coding, programming languages and pseudocode.
- Formal logic notation, proofs and statistics formulas.
- Tool-specific AI tutorials or paid AI accounts.
- Deep decision frameworks and cognitive biases (course 3 covers them).
- Presentation and communication skills (course 4 covers them).
- Political, religious or war-related material as puzzle or argument content.

## Open questions for the instructors (G2B)

| # | Decision | Recommendation | Instructor decision |
|---|---|---|---|
| 1 | Course title | "Think Clearly: Logic for the AI Era" | |
| 2 | Should this be required before courses 3 to 8, or optional? | Recommended first for everyone, required for fellows without a tech background | |
| 3 | agent-ip asks for 1,200 prose words per concept chapter. Is that right for this audience on phones? | Shorter chapters (about 500 to 800 words) with more puzzles, recorded as an approved exception | |
| 4 | Do fellows have reliable access to a free AI tool? | Build every AI exercise on captured answers; live AI use is optional | |
| 5 | Arabic support: glossary only, or Arabic hints on puzzles? | English text with an Arabic glossary for key terms | |
| 6 | Capstone: real choice or provided scenario by default? | Fellow chooses; provided scenarios always available | |
| 7 | Do we need new canvas slugs, or only the existing renderers? | Existing renderers only for version 1 | |
| 8 | Should module 1 have an ungraded warm-up puzzle set as an entry diagnostic? | Yes, short and ungraded, only to set the tone | |
| 9 | Scenario packs (freelancing, study, small business) as later variants? | Defer to after the first cohort | |
| 10 | Who reviews capstones, and how long per capstone? | Mentors, about 15 minutes each with the rubric | |
