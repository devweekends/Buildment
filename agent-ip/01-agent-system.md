# Agent System

This document defines how the course-building agents collaborate: who does what, what each produces, how work is handed off, which models are allowed to do which job, and where humans decide.

## Why multiple agents

A single model writing a course optimises for fluent text. A course needs four different kinds of work that pull against each other:

- **Research** wants breadth, sources, and accuracy.
- **Architecture** wants coherence, sequencing, and time realism.
- **Writing** wants voice, examples, and learner empathy.
- **Critique** wants distance, suspicion, and evidence.

If the same agent does all four in one pass, the critique becomes a self-review and the course drifts toward whatever the model finds easy to write. Separating the roles creates genuine adversarial review.

## The roster

| Agent | Mission | Primary output | Can block? |
|---|---|---|---|
| **Orchestrator** | Own the phase plan, context packs, gates, and state | Run log, gate decisions, context packs | Yes |
| **Research** | Build the evidence base and domain dossier | `research.md`, source table | Yes |
| **Curriculum Architect** | Turn outcomes into a coherent course spine | `blueprint.yaml` | Yes |
| **Prerequisites & Timeline** | Make the course finishable in the time budget | `skill-graph.yaml`, `timeline.yaml` | Yes |
| **Project Designer** | Define the product, data model, feature slices, and variant deltas | `project-brief.md` | Yes |
| **Interaction Designer** | Map concepts to the smallest sufficient interaction | `interaction-map.yaml` | Yes |
| **Interactive Canvas Builder** | Build small simulators/visualisers (HTML/CSS, SVG, Canvas 2D) from an approved canvas spec | canvas component, model, tests, spec | Yes |
| **Assessment Designer** | Design evidence, rubrics, answer keys, and feedback | `assessment-plan.yaml` | Yes |
| **Chapter Writer** | Write prose-first chapters from approved briefs | chapter drafts | No |
| **Course Auditor** | Measure prose depth, component density, interaction budget, and diagram coverage | `course-audit.md` with defects | Yes |
| **Technical Validator** | Run the code, verify versions, links, and reproducibility | `technical-validation.md` | Yes |
| **Critic** | Blind review across pedagogy, slop, assessment, continuity | `critique.md` with defects | Yes |
| **Variant Producer** | Derive 5–6 differentiated variants | variant courses + diff report | Yes |
| **Instructor panel** (human) | Confirm the roadmap, sequence, hours, and capstone before writing | `roadmap-confirmation.md` | Yes |
| **Human Review Board** (human) | Make the accountable decisions | sign-off, feedback, publish approval | Yes |

No agent may approve its own artifact. The orchestrator may not write course content. The critic may not rewrite the chapter. The writer may not close a defect without evidence.

## Phase plan and gates

### G0 — Intake and scope

**Owner:** Human sponsor + orchestrator.

Inputs: `08-templates.md` → Course brief.

Outputs: approved brief with audience, outcome, constraints, variants, non-goals, and time budget.

Exit criteria: the brief names a real product, a target learner, a demo the learner can show, and at least five meaningful variant directions. The scope fits the time budget stated in the brief (the flagship default is 210 to 280 hours; a short course might be 40).

### G1 — Research

**Owner:** Research agent; reviewed by curriculum architect and a human.

Outputs: `research.md` with source hierarchy, domain facts, existing-course scan, technical landscape, and pitfalls.

Exit criteria: every factual claim has a source; the dossier identifies at least three domain constraints that will shape the project; the dossier names what not to teach.

### G2A — Curriculum roadmap

**Owner:** Curriculum architect, prerequisites/timeline agent, project designer.

Outputs: `curriculum-roadmap.md` — a short, instructor-facing roadmap, not the full blueprint and not the course. It contains the course promise, learner, entry prerequisites, outcomes, module sequence, chapter titles with one-line outcomes, hour estimates, gate evidence, capstone, variant directions, out-of-scope, and the open decisions instructors must settle.

Exit criteria: outcomes are measurable; the module and chapter sequence is dependency-safe; the hours sum to the budget; the capstone is demoable; the variants have a differentiation hypothesis; the out-of-scope list is explicit; the open decisions are answerable.

No blueprint, sample chapter, or general course is written at this gate.

### G2B — Instructor roadmap confirmation

**Owner:** Instructor panel (at least two instructors), facilitated by the human review board.

Inputs: the brief, the curriculum roadmap, and the research summary. Instructors do not need the full blueprint or the chapters.

Outputs: `roadmap-confirmation.md` with each instructor's decision (approve, revise, or reject), comments, and date.

Exit criteria: at least two instructors sign; every open decision is resolved or explicitly deferred; requested changes are applied and the roadmap is re-confirmed; the delivery lead records the result.

This gate is mandatory. No chapter writer is assigned before it passes. If the instructors cannot confirm the roadmap, revise the roadmap or cut scope; do not start the course.

### G2C — Detailed architecture

**Owner:** Curriculum architect and project designer, using the confirmed roadmap as the source of truth.

Outputs: `blueprint.yaml`, `skill-graph.yaml`, `timeline.yaml`, `project-brief.md`.

Exit criteria: every artifact is derived from the confirmed roadmap; outcomes are measurable; every outcome has evidence; every chapter has a prerequisite chain; the hour budget sums to the course budget; the project has a production-grade feature set; the variants have a differentiation hypothesis.

Human review is mandatory here. If the detailed architecture contradicts the confirmed roadmap, stop and re-run G2A/G2B; do not patch the roadmap silently.

### G3 — Interaction design and sample chapter

**Owner:** Interaction designer, assessment designer, one chapter writer, and the interactive canvas builder if the sample needs a canvas.

Outputs: `interaction-map.yaml`, `assessment-plan.yaml`, one complete sample chapter, one sample gate, and — where the sample needs one — a canvas spec and a built canvas.

Exit criteria: the sample chapter meets the authoring standards; every interaction has a purpose; the density budget is respected; the assessment actually measures the outcome; the sample can be imported and rendered; any canvas has a tested model, a stated teaching claim, a stated limitation, and a reader fallback; the course audit passes for the sample and the planned chapter set.

Human review is mandatory here. If the sample is wrong, every chapter will be wrong.

### G4 — Full draft

**Owner:** Chapter writers, coordinated by the orchestrator, with the interactive canvas builder working in parallel on approved canvases.

No writer is assigned until G2B has a recorded instructor sign-off and G2C has accepted the blueprint.

Outputs: draft chapters in `agent-ip/work/<course-slug>/chapters/`, preserving numbered module folders and lesson filenames. After review and QA, assemble final courses and variants in `content/import/<slug>/` with their `course.yaml`; retain drafts and QA in `agent-ip/work/<slug>/`. Follow `README.md` → Work areas.

Exit criteria: every chapter has a brief, a build step, a verification step, and a bridge; every module has a gate; the continuity editor has no unresolved contradictions.

### G5 — Technical and pedagogical QA

**Owner:** Technical validator + critic.

Outputs: `technical-validation.md`, `critique.md`, `scorecard.yaml`.

Exit criteria: all commands run; all links resolve; all MDX compiles; all code exercises pass their tests; every canvas passes the model, SVG/theme, accessibility, performance, mobile, and reader-integration checks in `06-quality-gates.md`; the course audit passes for every chapter; no S1 or S2 defects remain; the scorecard meets the thresholds.

### G6 — Variants

**Owner:** Variant producer; reviewed by critic and human board.

Outputs: five or six variant courses plus `variant-diff.md`.

Exit criteria: every variant passes the same gates as the general course; the uniqueness contract in `02-course-architecture.md` is met; two reviewers can explain how the variants differ without reading the diff report.

### G7 — Publish

**Owner:** Delivery lead.

Outputs: signed publish checklist, imported course, deployed demo, and a post-launch review date.

Exit criteria: human sign-off; platform import succeeds; a learner can complete the first module without intervention; rollback plan exists.

## Handoff contract

Every agent output starts with YAML frontmatter:

```yaml
---
artifact: chapter-brief
course: event-ticketing
module: 03-core-loop
chapter: 03.04-reserve-inventory
version: 1
status: draft            # draft | in-review | changes-requested | approved
owner: chapter-writer
inputs:
  - blueprint.yaml
  - interaction-map.yaml
  - project-brief.md
depends_on:
  - 03.03-hold-expiry
reviewers:
  - critic
  - technical-validator
open_defects: []
---
```

The body follows the template for that artifact. Free-form prose is allowed only where the template says so.

## Context protocol

An agent should receive the smallest context that lets it do its job well. Dumping the whole course into every prompt produces inconsistency, cost, and drift.

| Agent | Must read | May read | Must not read |
|---|---|---|---|
| Research | Brief, platform capabilities | Prior research | Draft chapters |
| Curriculum architect | Brief, research, platform capabilities | Prior course blueprints | Full chapter drafts |
| Instructor panel | Brief, curriculum roadmap, research summary | Prior course materials, if requested | Full blueprint, full chapters |
| Prerequisites/timeline | Brief, research, curriculum roadmap | Assessment plan | Marketing copy |
| Project designer | Brief, research, curriculum roadmap, blueprint | Platform capabilities | Chapter prose |
| Interaction designer | Blueprint, project brief, platform capabilities | Sample chapters | Full draft |
| Interactive canvas builder | Canvas spec, chapter claim, design language, platform registry | Existing canvases, chart patterns | Full course prose |
| Assessment designer | Outcomes, blueprint, interaction map | Prior assessments | Writer's rationale |
| Chapter writer | Confirmed roadmap, chapter brief, outcomes, interaction map, adjacent summaries, style guide | Source dossier | Other writers' full drafts |
| Course auditor | Course source, audit script, authoring standards, visual standard, chapter briefs | Blueprint, prior audits | Writer's rationale |
| Technical validator | Chapter, project brief, environment spec | Test suite | Writer's rationale |
| Critic | Artifact, rubric, source dossier | Adjacent chapters | Writer's rationale, other critics' scores |
| Variant producer | General course, variant brief, diff contract | Research | Unapproved drafts |

Blind critique matters. A critic who reads the writer's explanation starts grading the intention instead of the artifact.

## Model policy

The system is multi-provider and model-agnostic. The orchestrator reads a routing table from the work area; the table records which model role is used for each agent role and whether those model roles share a family. The policy:

- **Drafting and critique use different model families** for high-stakes chapters, gates, and assessments. A model that drafts a chapter may not be the only reviewer of that chapter.
- **At least two critique passes** are required for G3 and G5: one pedagogical critic and one slop/red-team critic.
- **Technical validation is execution-based.** The validator runs commands, tests, and imports. A model reading code is not validation.
- **Research uses retrieval.** The research agent must fetch and cite sources, not rely on model memory for facts that can change.
- **Structured outputs.** Blueprints, maps, scorecards, and defect reports are JSON or YAML so the orchestrator can check completeness.
- **Low temperature for facts, moderate for prose.** Technical and assessment content uses deterministic settings. Prose may vary, but must pass the slop critic.
- **No self-approval.** An agent's artifact cannot be marked `approved` by the same agent that produced it.
- **Log the model role and prompt version** for every artifact in the run log. Reproducibility matters when a chapter is revised six months later.
- **Name models by role in committed files.** The routing table, run log, decision log and every other file committed under `work/` say "drafting model" or "review model", never a model or vendor name, and record whether the roles share a model family. The independence rules need the family relationship, not the product name.

If only one provider is available, the orchestrator must still run separate passes with different prompts and a human review before G5. It should record the reduced independence as a risk.

## Orchestrator loop

```
G0 brief
  → build context pack
  → G1 research
  → G2A curriculum roadmap
  → G2B instructor confirmation
  → G2C detailed architecture
  → G3 interaction map + sample chapter
  → human review
  → G4 full draft (parallel by module)
  → continuity pass
  → G5 technical + critique
  → revise (max 2 rounds)
  → human review
  → G6 variants (each variant roadmap confirmed before its chapters)
  → human review
  → G7 publish
```

The orchestrator does not write content. It:

- creates and maintains `work/<course-slug>/`;
- assembles context packs;
- assigns agents and models;
- checks artifact completeness against templates;
- enforces gates;
- records decisions and defects;
- escalates when an agent is blocked or two critics disagree;
- stops the line when a gate fails.

## Failure handling

| Failure | Response |
|---|---|
| Research cannot source a claim | Mark the claim as unverified; remove it from learner-facing content or rewrite as an explicit hypothesis |
| Instructors do not confirm the roadmap | Revise the roadmap or cut scope; do not start the blueprint or chapters |
| Instructors request a new outcome or module after G2B | Re-run G2A/G2B; do not patch the blueprint silently |
| Blueprint exceeds the hour budget | Cut scope, not depth; move features to stretch or v2 |
| Two critics disagree | Third blind review from a different model family; if still unresolved, human decides |
| A chapter fails the same gate twice | Rewrite from the brief, not from the draft; escalate to human |
| The sample chapter cannot be imported | Fix the platform contract first; do not write more chapters |
| A canvas model cannot be made honest | Use a static diagram and explain the complexity; do not fake a simulation |
| A canvas is decorative or cannot state its claim | Cut it and teach the claim in prose |
| A variant is a reskin | Reject; change the primary journey, hardest constraint, or hero feature |
| A technical instruction fails | The chapter is blocked until the validator can run it successfully |
| A human reviewer is unavailable | Do not publish; the gate waits |

## Definition of done for the system

The course factory is working when:

- an instructor-confirmed roadmap precedes every blueprint and every chapter;
- a new brief can go from G0 to a reviewed sample chapter without the team re-explaining the standard;
- a writer can produce a chapter that passes critique on the first or second attempt;
- a critic can find defects without being told what to look for;
- a variant can be generated and proved distinct without a full rewrite;
- every canvas has a tested model, a stated teaching claim, a stated limitation, a reader fallback, and a safe SVG/HTML rendering;
- the course audit passes for every chapter before G3 and G5;
- every published course can be traced back to its brief, research, blueprint, critiques, and sign-off.
