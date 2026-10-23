# Agent IP — Course Factory

**Status:** v0.4.3, draft for team review (v0.4.3 standardizes final course and draft locations)
**Owner:** Delivery lead (Sean) + course engineering
**Applies to:** every course produced for the platform

## What this is

This folder is the instruction set for the agents that design, write, critique, and ship our courses. It is deliberately more than a style guide. It defines the product promise, the agent workflow, the content standards, the interaction grammar, the assessment model, the quality gates, and the human review process.

The documents are written to be read by both people and sub-agents. A sub-agent should be able to open this folder, find its role, load the relevant context, and produce an artifact that another agent can review without guessing what was intended.

## The production model

We do not write courses one at a time from a blank page. We build them in three layers:

1. **Skill spine** — the durable engineering capabilities every course must teach: product thinking, data modelling, API design, auth and authorization, async work, testing, security, performance, deployment, and the ability to defend decisions.
2. **General course** — one approved, domain-specific course that instantiates the spine. It defines the project shape, chapter archetypes, interaction grammar, assessment style, and production bar. Example: an event ticketing platform.
3. **Variants** — five or six concrete courses derived from the general course. Variants keep the spine and learning outcomes, but change the domain, primary user journey, hardest constraint, data model, hero feature, visual identity, and capstone evidence. The goal is that two learners who complete different variants do not have the same portfolio project.

The general course is the template. Variants are products, not reskins.

## The course promise

A learner who finishes a course has:

- built and deployed a real product, not followed a tutorial;
- made and defended architectural decisions;
- handled failure, security, and production concerns;
- produced evidence a mentor can inspect;
- and can explain the system without notes.

The course must be hard enough to produce that outcome and structured enough that a determined learner can finish it in 3–4 weeks at roughly 10 hours per day (210–280 focused hours). That is the default for a flagship engineering course. Every course states its own time budget in the brief, for example 40 hours for a short course, and the whole factory works to that number (see `02-course-architecture.md` → Time budget).

## The instructor roadmap gate

Before the general course is written, the curriculum roadmap is confirmed by the instructors who will teach it. The roadmap is the one-page promise of what the learner will do, in what order, at what cost in hours, with what capstone, and with what explicitly left out. It is not a table of contents, and it is not the course.

The instructors answer seven questions: is this the right sequence, are these the right outcomes, is the time budget realistic for our learners, what is missing that you would refuse to teach without, what would you cut, do the variants represent the audiences we serve, and is the capstone something you would be proud to review.

**No blueprint, sample chapter, or general course is written until at least two instructors sign the confirmation record.** If they cannot confirm the roadmap, we revise it or cut scope. We do not write first and ask later. See `02-course-architecture.md` → The curriculum roadmap gate and `08-templates.md` → Curriculum roadmap / Roadmap confirmation record.

## Interactive canvases

Courses are **interactive-first**: every Learn chapter teaches through at least one element the learner manipulates or steps through and sees change, with a prediction before and a check after. Systems that move over time are built on a shared, seeded simulation core and a small set of reusable renderers, so most canvases are data plus a spec.

Many concepts are best taught by letting the learner manipulate a small causal model: a token bucket, a seat-hold race, a cloud cost simulator, a queue under backpressure. These are **interactive canvases**: focused widgets with two to four inputs, an immediate visual output, and a stated model limit. They are deliberately simple: neutral surfaces, one accent, semantic color only, direct labels, no decoration. They may be rendered with HTML/CSS, inline SVG, or Canvas 2D; SVG is the default for charts, seat maps, timelines, and other vector visuals, while HTML owns the controls.

See `10-interactive-canvases.md` for the design language, model contract, platform integration, catalog, placement rules, and QA. The builder agent is `agents/interactive-canvas-builder.md`.

## Visual explanations

Diagrams are not decoration. A diagram must make a relationship, flow, boundary, or state change legible. Start HLD topology and request flows with live Mermaid; use State/Entity/Trace for their specific relationships and static SVG when precise composition is necessary. For changing load, failure, routing, or consistency behavior, record a decision to build a model-backed interactive canvas or teach the outcome with a worked trace.

See `11-visual-explanations.md` for the Excalidraw design rules, SVG export workflow, accessibility, placement, and QA.

## Course audit

The audit is executable, not a vibe check:

```bash
node agent-ip/scripts/audit-course.mjs content/import/<course-slug>
```

It measures prose depth, top-level and total component counts, assessment interactions, diagram coverage, and list-heavy chapters. It exits non-zero when a chapter misses the threshold. Run it at G3 and G5; the course auditor files defects from the result.

## How to use this folder

1. **Human intake.** Complete `08-templates.md` → Course Brief. State the audience, the outcome, the constraints, the variants, and the non-goals.
2. **Orchestrator.** The orchestrator reads `agents/orchestrator.md`, creates the work area, and runs the phase gates in order.
3. **Research.** A research agent produces a sourced dossier. No course prose is written before the dossier is accepted.
4. **Curriculum roadmap.** The curriculum architect, prerequisites/timeline agent, and project designer produce a short, instructor-facing roadmap: outcomes, module and chapter sequence, hours, prerequisites, capstone, variants, and out-of-scope. It is not the full blueprint and it is not the course.
5. **Instructor confirmation.** The instructors who will teach the course review the roadmap and sign it off. **No blueprint, sample chapter, or general course is written until this sign-off exists.** If they request changes, the roadmap is revised and re-confirmed.
6. **Detailed architecture.** Only after the roadmap is confirmed, the curriculum architect and project designer turn it into the blueprint, skill graph, time budget, and project brief.
7. **Interaction design.** The interaction designer maps every concept to the smallest interaction that proves understanding. Where a causal model is the best teacher, the designer specifies an interactive canvas — a small simulator or visualiser — and the canvas builder implements it.
8. **Writing.** Chapter writers draft from briefs, never from a blank page.
9. **Critique.** Independent critics review blind against `06-quality-gates.md`. Writers revise. Two rounds maximum before a human decision.
10. **Human review.** The board reviews the sample chapter, full draft, and variants at the gates defined in `09-review-and-governance.md`.
11. **Variants.** The variant producer derives 5–6 courses and proves they are meaningfully different. Each variant roadmap is confirmed before variant chapters are written.
12. **Publish.** Technical validation, platform import, accessibility, and final sign-off.

## Gates

| Gate | Decision | Who decides |
|---|---|---|
| G0 | Brief and scope accepted | Human sponsor |
| G1 | Research dossier accepted | Curriculum architect + human |
| G2A | Curriculum roadmap drafted | Curriculum architect + prerequisites/timeline |
| G2B | Roadmap confirmed by instructors | Instructor panel |
| G2C | Detailed blueprint, skill graph, timeline, and project brief accepted | Human review board |
| G3 | Interaction map, canvas specs if any, and one sample chapter accepted | Human review board |
| G4 | Full draft complete | Orchestrator |
| G5 | Technical and pedagogical QA passed, including canvas QA | Critics + technical validator |
| G6 | Variant roadmaps confirmed, variants distinct and complete | Human review board + instructor panel |
| G7 | Publish approved | Delivery lead |

No agent may skip a gate. No model may approve its own output.

## Folder map

```
agent-ip/
├── README.md                       ← you are here
├── 00-principles.md                ← philosophy, IP stance, anti-slop contract
├── 01-agent-system.md              ← agents, phases, handoffs, model policy
├── 02-course-architecture.md       ← spine → general course → variants, pacing
├── 03-authoring-standards.md       ← voice, prose, examples, trade-offs, tools
├── 04-interactive-playbook.md      ← every block/component, placement, density
├── 05-assessment-and-motivation.md ← outcomes, evidence, feedback, gamification
├── 06-quality-gates.md             ← scorecards, critics, red-team, validation
├── 07-research-and-sources.md      ← evidence base and pitfalls
├── 08-templates.md                 ← briefs, maps, reports, checklists
├── 09-review-and-governance.md     ← human review, versioning, sign-off
├── 10-interactive-canvases.md      ← simulators/visualisers, design language, QA
├── 11-visual-explanations.md       ← Excalidraw/SVG/live diagrams, accessibility, QA
├── decision-log.md                 ← IP changes and review state
├── proposals/                     ← written proposals awaiting governance review
├── scripts/
│   ├── audit-course.mjs            ← prose depth, component density, diagram coverage
│   └── blind-keys.mjs              ← keyless batches and comparison for the blind answer-key check
└── agents/
    ├── orchestrator.md
    ├── research.md
    ├── curriculum-architect.md
    ├── prerequisites-timeline.md
    ├── project-designer.md
    ├── interaction-designer.md
    ├── interactive-canvas-builder.md
    ├── assessment-designer.md
    ├── chapter-writer.md
    ├── course-auditor.md
    ├── technical-validator.md
    ├── critic.md
    ├── variant-producer.md
    └── human-review-board.md
```

## Non-negotiables

- **Prose carries the teaching.** Bullets summarise; they do not replace explanation. A concept/build chapter needs at least 1,200 prose words, excluding code, lists, tables, and components; a checkpoint/gate needs at least 700.
- **Components are checkpoints, not the lesson.** No component-only sections. Every component sits inside an explanation, not instead of one. A chapter may have at most 6 top-level components, 25 total JSX tags, and 3 assessment interactions.
- **A diagram must argue.** At least one diagram per module, and one in every concept-heavy chapter. Use Excalidraw-style SVG for conceptual/ER/flow diagrams and live Mermaid/State/Trace for dynamic ones. A diagram that restates the paragraph is decoration.
- **Specific beats generic.** Every example names a real product, a real constraint, or a real failure mode.
- **One hard thing at a time.** Complexity is sequenced, not dumped.
- **Every interaction earns its place.** If it does not produce evidence of understanding, cut it.
- **Depth over coverage.** A smaller course taught deeply beats a broad course taught shallowly.
- **Withhold solutions, not context.** Learners get constraints, interfaces, and acceptance tests — not a complete implementation to paste.
- **Every technical claim is verified.** Versions, commands, APIs, and links are run or checked before publish.
- **Option length is never the answer.** In quizzes, predictions, and knowledge checks, the correct option must not be the longest by default, and distractors must be written at a comparable length. If the correct option is the longest in half or more of a set, rewrite the set.
- **No AI slop.** The forbidden patterns in `00-principles.md` are hard failures, not preferences.
- **Human sign-off is final.** Automation prepares the decision; it does not make it.
- **Instructors confirm the roadmap before we write the course.** No blueprint, sample chapter, or general course until the instructor panel signs the roadmap. This is the cheapest place to prevent a course that nobody wants to teach.
- **Interactive-first.** Every Learn chapter has at least one interactive element the learner manipulates or steps through, with predict before and a transfer check after. Reuse the kit renderers before building anything custom. The audit fails a Learn chapter without one.
- **Canvases are simple, not decorative.** An interactive canvas must make one causal model legible. Neutral palette, one accent, semantic color only, no gradients or confetti. If the learner cannot state the claim afterwards, cut it.
- **SVG is rendered through a component, never injected raw.** Use React SVG components with `viewBox`, theme tokens, `<title>`/`<desc>`, and keyboard-reachable shapes. Raw author SVG in MDX is forbidden.

## Work areas

Paths are relative to the repository root. In role documents, `work/` means `agent-ip/work/`. This layout applies to every course and variant:

- `agent-ip/work/<course-slug>/chapters/` for draft chapters, preserving numbered module folders and lesson filenames.
- `agent-ip/work/<course-slug>/` for draft manifests, briefs, research, blueprints, critiques, and approval records; put audit and validation reports in its `qa/` directory.
- `content/import/<course-slug>/` is the only canonical location for final course source: `course.yaml`, numbered module/lesson Markdown files, and optional `COURSE-OUTLINE.md`.

After content review and QA, assemble the complete final package in `content/import/<course-slug>/` on the course PR branch. Rerun source validation, the strict structure audit, and the course audit against that exact package. Keep drafts, QA, review notes, archives, and generated output in `agent-ip/work/<course-slug>/`. CI must publish only explicitly selected final packages from `content/import/`, after successful deployment or an approved manual run tied to a reviewed PR. A folder's presence alone does not authorize publication.

Do not create or maintain final courses under `courses/`. When continuing a legacy course there, reconcile it with any existing import source before placing the reviewed final package in `content/import/<course-slug>/`. Preserve superseded drafts in `agent-ip/work/<course-slug>/archive/`; never blindly overwrite newer content. Historical logs keep their original paths; new assignments and context packs must use this layout.

For draft reviews, run the course audit against `agent-ip/work/<course-slug>/chapters/`; for final validation, use `content/import/<course-slug>/`. Save reports in `agent-ip/work/<course-slug>/qa/`. The CI publishing workflow still requires implementation; this layout does not itself publish courses.

## Change control

This IP is a living document. Changes go through the review process in `09-review-and-governance.md`. When a rule changes, update the version, the decision log, and any affected agent prompt in the same change. Do not leave two competing instructions in the folder.
