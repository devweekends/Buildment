# Principles

This document is the constitution for every course we produce. When a later document, an agent prompt, or a learner-facing chapter conflicts with these principles, the principles win.

## The thesis

A course is not a container for information. It is a sequence of decisions, attempts, failures, and corrections that changes what a learner can build and explain. The project is the curriculum. Everything else — prose, diagrams, quizzes, videos, asides — exists to help the learner make the next decision with better judgment.

We teach production-grade engineering, not feature tourism. A learner who finishes should be able to open their deployed product, walk a mentor through the architecture, and defend the trade-offs they made.

## The twelve principles

### 1. The project is the curriculum

Every concept is introduced because the project needs it now. Theory that does not change the next build step is either cut or moved to an optional further-reading block. Chapters are slices of a real product, not topics from a syllabus.

### 2. Teach judgment, not keystrokes

Knowing where to put a file is cheap. Knowing why the boundary belongs there is the skill. Every major lesson answers three questions:

- What decision are we making?
- What are the alternatives?
- What happens later if we choose wrong?

A course that only teaches the happy path produces learners who cannot debug.

### 3. Withhold the solution, not the context

The learner must have enough context to reason: the outcome, the constraints, the interfaces, the acceptance tests, and the failure modes. They must not be handed a complete implementation to paste. We show:

- the contract and the shape of the solution;
- one worked example for a *different* case;
- the tests that define done;
- the traps that usually appear.

We withhold the exact implementation of the capstone, the hidden tests, and the internal rubric. That is both pedagogy and IP protection. The learner should be able to derive the answer, not copy it.

### 4. Depth over coverage

A 30-hour course that covers twelve topics at three paragraphs each teaches less than a 30-hour course that covers four topics with scenarios, decisions, and real assessment. Coverage feels comprehensive; depth produces capability. Choose the smaller, sharper scope and defend it in the course brief.

### 5. Specific beats generic

Generic examples are the fastest way to make a course forgettable. "A company" and "a customer" teach nothing. Name the product, the user, the constraint, the number, and the failure. If the domain is event ticketing, talk about overselling a 900-seat room, a promoter changing a price after 40 tickets sold, and a gate scanner losing network at 7:55 p.m.

Specificity is not decoration. It is how learners transfer the idea to their own context.

### 6. Difficulty must be desirable, not accidental

Struggle is useful when the learner has the foundation to attempt the task, the effort targets the intended thinking, and the result can be checked later. Confusion is not a virtue. Use retrieval, spacing, interleaving, variation, and faded feedback — but only after the prerequisite knowledge is secure. If learners are guessing rather than reasoning, restore support and reteach.

### 7. One hard thing at a time

Each chapter has one primary skill and at most one secondary skill. New tooling, new syntax, new domain rules, and a new architectural pattern do not all arrive in the same chapter. Cognitive load is a design constraint, not a learner weakness.

### 8. Every claim is verifiable

A technical claim is either:

- backed by a primary source, a running command, or a reproducible test; or
- explicitly labelled as an opinion, a hypothesis, or a trade-off.

No invented APIs. No guessed versions. No dead links. No "this is best practice" without a reason. The technical validator runs the commands, not just the prose.

### 9. Interaction is a cost, not decoration

A quiz, diagram, code exercise, or open question consumes attention and time. It must produce evidence that the learner understood something they could not have demonstrated by reading. If the same understanding is already proved by the build, do not add an interaction. Interaction density is budgeted in `04-interactive-playbook.md`.

Our courses are interactive-first: every concept chapter teaches through something the learner manipulates or steps through and sees change, because people understand a system faster by pushing it than by reading about it. Reusable renderers and a shared simulation core keep this affordable. An interactive canvas is still the most expensive interaction we build. It earns its place only when a small causal model is the best way to teach the claim: inputs the learner can manipulate, an output that changes immediately, and a limit the model can state honestly. It must be simple: neutral surfaces, one accent, semantic color only, direct labels, no gradients or decorative motion. It may be rendered with HTML/CSS, inline SVG, or Canvas 2D; SVG is the default for vector visuals, while HTML owns the controls. Raw author SVG is never injected into MDX. If the learner cannot state the claim after using it, the canvas is decoration and it should be cut. See `10-interactive-canvases.md`.

### The picture leads; words explain it; depth is folded

A course is not a sequence of quizzes, callouts, and cards, and it is not a wall of text either. Attention drops fast in long prose and holds when a picture moves first. Since IP v0.5, a Learn chapter is a sequence of **beats**: one big visual the learner can watch and touch, then at most 70 words that explain what they saw, then an optional `GoDeeper` fold with the full mechanism, trade-offs, failure modes, sources and code. Depth is folded, not dropped. See `03-authoring-standards.md` → Visual-first Learn chapters.

The rule:

- A Learn chapter (`format: beats`) has four to eight beats, 300 to 700 visible words, and at least 900 words including folds. One visual per beat; at most 40 JSX tags and 3 assessment interactions.
- A Build chapter needs at least **1,200 prose words**, excluding code, lists, tables, and components. A checkpoint or gate needs at least **700**. These chapters may have at most **6 top-level components**, **25 total JSX tags**, and **3 assessment interactions**.
- No component-only section and no text-only section. In a beat, the visual comes first and the words explain it; elsewhere, a component must be introduced and explained in prose.
- `LearningObjectives` appears once per module, not in every chapter.
- `BigWordAlert` is reserved for a genuinely new, load-bearing term; not every chapter.
- `ChapterRecap` appears at a module gate, not after every chapter.
- `OpenQuestion` is reserved for a module gate or an architecture defense, not a generic takeaway.
- Quizzes belong at checkpoints or a decision point, not after every section.
- If removing a component would not reduce the learner's understanding, remove it.

An audit script exists at `agent-ip/scripts/audit-course.mjs`. A chapter that cannot pass it is not ready for review.

### A diagram must argue

A diagram is not decoration. It must make a relationship, flow, boundary, or state change legible in a way prose cannot. At least one diagram is required per module and per concept-heavy chapter. Start HLD topology and request-flow diagrams with live Mermaid; use Entity/State/Trace for their specific relationships and static SVG when precise composition is necessary. Use an interactive canvas for a causal change the learner needs to explore. A diagram that restates the paragraph above it is decoration. See `11-visual-explanations.md`.

### 10. The learner must be able to defend the work

Every course ends with a defense: a demo, a walkthrough, a set of viva questions, or an architecture review. The learner should be able to explain:

- what the system does and for whom;
- why the data model looks the way it does;
- where the trust boundaries are;
- what fails under load or abuse;
- what they would change in v2.

If the learner cannot defend it, the course taught a procedure, not engineering.

### 11. Variants share the spine, not the skin

A variant is not a new colour palette. It changes the primary user journey, the hardest constraint, the data model, the hero feature, and the capstone evidence. The learning outcomes stay stable so the course can be assessed consistently. The product must feel like a different company solving a different problem.

### 12. Human sign-off is the final gate

Models can research, draft, critique, and validate. They cannot be accountable. A human reviews the brief, the sample chapter, the full draft, and the variants. The delivery lead signs the publish decision. Automation prepares the decision; it does not make it.

### The roadmap gate

Before a single chapter of the general course is written, the curriculum roadmap is confirmed by the instructors who will teach it. The roadmap is not a table of contents. It is the promise of what the learner will be able to do, in what order, at what cost in hours, with what capstone, and with what explicitly left out.

The instructors answer seven questions: is this the right sequence, are these the right outcomes, is the time budget realistic for our learners, what is missing that you would refuse to teach without, what would you cut, do the variants represent the audiences we serve, and is the capstone something you would be proud to review.

If the instructors cannot confirm the roadmap, the course is not ready to be written. A detailed blueprint built on an unconfirmed roadmap is wasted work.

## What we reveal and what we withhold

### Reveal

- the product outcome and the learner's demo target;
- the constraints and non-goals;
- the interfaces, schemas, and acceptance tests;
- one worked example for an adjacent problem;
- the failure modes and the debugging path;
- the rubric dimensions the learner will be judged on;
- the sources behind factual claims.

### Withhold

- the complete capstone implementation;
- hidden tests and answer keys that would let a learner game the assessment;
- the exact solution to open-ended architecture questions before an attempt;
- internal critique language that would embarrass or demoralise a learner;
- vendor-specific production secrets or private organisational context.

The test is simple: could a motivated learner derive the answer from what we reveal? If yes, we have taught. If they can only copy it, we have not.

## The anti-slop contract

The following are hard failures. A chapter containing any of them does not pass the slop critic.

### Voice

- No generic openings: "In today's fast-paced world", "It is important to note that", "In this ever-evolving landscape".
- No filler transitions that repeat the heading.
- No empty hedging: "may", "might", "could potentially" when a decision is required.
- No motivational padding that does not change what the learner does next.

### Structure

- No bullet-only teaching. Bullets may summarise, compare, or list prerequisites. They may not be the only explanation of a concept.
- No duplicate summary of the same idea in the intro, body, recap, and next-step block.
- No "comprehensive" coverage. Every section must earn its place in the build.
- No chapter that could be moved to another module without changing the build.

### Examples

- No generic actors ("a company", "a user", "stakeholders") when a specific actor is possible.
- No fabricated case studies presented as fact. If a scenario is composite, label it.
- No example that is only decorative. Every example must change a decision or reveal a failure mode.

### Assessment

- No quiz that tests whether the learner read the preceding paragraph.
- No question where the correct answer is the only plausible option.
- No "all of the above" or joke distractors.
- No open question used as a generic "what was your takeaway?".
- No assessment that measures recall when the outcome requires application.

### Technical content

- No invented API, library, flag, or version.
- No unverified command presented as runnable.
- No pseudo-code labelled as production code.
- No security advice that is wrong, incomplete, or context-free.
- No deprecation claim without a date and a source.

### Interaction

- No quiz after every section.
- No diagram that restates the paragraph above it.
- No Big Word Alert on a term the learner already knows.
- No optional enrichment inside a gate or quiz chapter.
- No two high-effort interactions back to back.

## The production-grade bar

Every course project must include, at minimum:

- authentication and authorization;
- a relational or document data model with migrations or schema evolution;
- validated input and consistent error handling;
- at least one background or asynchronous concern;
- file or object storage where the domain needs it;
- caching or query optimisation justified by a measurement;
- rate limiting and abuse protection on public surfaces;
- automated tests at more than one level;
- CI and a deployed environment;
- structured logs and error reporting;
- a README and a runbook;
- seed or demo data;
- accessibility and responsive behaviour on the core journey.

A project that omits these is a prototype, not a production-grade capstone. The course may teach them incrementally, but the final artifact must contain them.

## What we will not ship

- A course that is a list of links.
- A course whose "project" is a todo app with no domain constraint.
- A course that teaches a framework without teaching the problem it solves.
- A course where the learner copies a finished repository.
- A course that cannot be completed in the stated time budget.
- A course with unverified technical instructions.
- A course whose variants are the same product with different names.
- A course whose curriculum roadmap the instructors have not confirmed.
- A canvas that is decorative, misleading, inaccessible, or does not teach a claim the learner can state afterwards.

## The learner promise

We promise the learner four things:

1. **A real product.** Something they can deploy, demo, and put in a portfolio.
2. **A defensible understanding.** They can explain the architecture and the trade-offs.
3. **Honest difficulty.** They will struggle, and the struggle will be designed.
4. **Evidence of progress.** Every chapter ends with something they can show or explain.

If a course cannot keep those promises, it is not ready.
