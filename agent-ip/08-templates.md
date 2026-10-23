# Templates

Copy these into `agent-ip/work/<course-slug>/`. Do not leave a template field blank; write `not applicable` and why.

## 1. Course brief

```yaml
---
artifact: course-brief
course: <slug>
working_title: <name>
version: 1
status: draft
owner: <human sponsor>
target_publish: <date>
---

# Course brief — <course>

## One sentence
<What the learner will build and be able to do.>

## Learner
- Who:
- Prior knowledge:
- Language: <first language; English level>
- Device and connection: <phone or laptop; data cost; power cuts>
- Time available: <3 to 4 weeks, ~10 h/day>
- Motivation:
- What they will do with the result:

## Outcome
By the end, the learner can:
1. <observable outcome>
2. <observable outcome>
3. <observable outcome>

## Demo
<What the learner can show a mentor in five minutes.>

## Product scope
- Must have:
- Should have:
- Out of scope:

## Production bar
<Auth, data model, async, storage, tests, deploy, observability — what applies.>

## Variants
At least five directions, each with a different primary user and hardest constraint:
1.
2.
3.
4.
5.

## Constraints
- Stack:
- Budget:
- Platform limits:
- Legal or privacy:

## Non-goals
<What we will not teach and why.>

## Success signals
<Completion, capstone quality, portfolio distinctiveness, mentor effort.>
```

## 1A. Curriculum roadmap (instructor-facing)

This is the artifact instructors confirm before any blueprint or chapter is written. Keep it short enough to review in one sitting. Do not include prose lessons, block density, or quiz wording.

```markdown
---
artifact: curriculum-roadmap
course: <slug>
version: 1
status: draft
owner: curriculum-architect
instructors_reviewed: []
---

# Curriculum roadmap — <course>

## In one paragraph
<What the learner builds, for whom, and what they can do at the end.>

## Learner and entry prerequisites
- Learner:
- Prior knowledge:
- Time available: <3 to 4 weeks, ~10 h/day>
- Entry diagnostic: <what it checks>

## Outcomes
| # | Outcome (observable verb) | Evidence |
|---|---|---|
| O1 | | |

## Four-week shape
| Week | Focus | Modules | Hours | Demo at the end |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |

## Module and chapter sequence

### Module 1 — <name>
Purpose:
Hours:
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 1.1 | | | | |

### Module 2 — <name>
...

## Gate evidence at a glance
| Module | Gate evidence |
|---|---|

## Capstone
- What the learner ships:
- Five-minute demo:
- Defense questions:
- Production requirements:

## Variants
| Variant | Primary user | Hardest constraint | Hero feature | Data-model delta | Capstone |
|---|---|---|---|---|---|
| | | | | | |

## Out of scope
<What we will not teach, and why.>

## Open decisions for instructors
| # | Decision | Recommendation | Instructor decision |
|---|---|---|---|
| 1 | | | |

## Confirmation
| Instructor | Role | Decision (approve/revise/reject) | Comments | Date |
|---|---|---|---|---|
| | | | | |
```

## 1B. Roadmap confirmation record

```markdown
---
artifact: roadmap-confirmation
course: <slug>
roadmap_version: 1
date: <date>
facilitator: <name>
---

# Roadmap confirmation — <course>

## Instructors
| Name | Role | Decision | Comments |
|---|---|---|---|
| | | | |

## Decisions on open questions
| # | Decision | Resolution | Owner |
|---|---|---|---|
| 1 | | | |

## Required changes
| # | Change | Owner | Due |
|---|---|---|---|

## Outcome
- [ ] At least two instructors approved
- [ ] Every open decision resolved or explicitly deferred
- [ ] Requested changes applied and re-confirmed
- [ ] Delivery lead recorded the result

**Sign-off:** <names and date>

**Consequence:** No blueprint, sample chapter, or general course is written until this record is complete.
```

## 2. Course blueprint

```yaml
---
artifact: blueprint
course: <slug>
version: 1
status: draft
owner: curriculum-architect
roadmap_version: 1
roadmap_confirmed: true
---

# Blueprint — <course>

## Outcomes and evidence

| Outcome | Evidence | Assessment | Module |
|---|---|---|---|
| | | | |

## Constructor profile
<Build-first | Case-first | Systems-first | Decision-first | Debug-first> — why.

## Module spine

| # | Module | Purpose | Chapters | Hours | Gate evidence |
|---|---|---|---|---|---|
| 1 | Orientation | | | | |
| 2 | | | | | |

## Skill graph
<Link to skill-graph.yaml. State the entry prerequisites and the repair path.>

## Time budget
- Budget from the brief: <hours> (flagship default 210 core, 280 stretch)
- Core: <hours> / <budget>
- Stretch: <hours> / <stretch budget>
- Contingency: <hours>

## Interaction grammar
<Which blocks are used where; link to interaction-map.yaml.>

## Capstone
<What the learner ships, how it is demoed, how it is defended.>

## Risks
<What could make the course unfinishable or shallow.>
```

## 3. Skill graph

```yaml
---
artifact: skill-graph
course: <slug>
version: 1
---

nodes:
  - id: http-basics
    label: HTTP request/response
    type: entry | taught | reinforced

edges:
  - from: http-basics
    to: api-design
    reason: A route contract assumes the request/response model.

diagnostic:
  - question: <question>
    maps_to: <node>
    if_missing: <repair path>
```

## 4. Timeline

```yaml
---
artifact: timeline
course: <slug>
version: 1
---

weeks:
  - week: 1
    focus: Foundation
    hours: 55
    modules: [orientation, architecture, foundation]
    demo: <what works at the end of the week>

chapters:
  - id: 03.04-reserve-inventory
    estimate_hours: 3
    reading: 0.5
    build: 1.5
    verify: 0.5
    reflect: 0.25
    buffer: 0.25
    requires: [03.03-hold-expiry]
    evidence: <test, screenshot, demo>
```

## 5. Project brief

```yaml
---
artifact: project-brief
course: <slug>
version: 1
owner: project-designer
roadmap_version: 1
roadmap_confirmed: true
---

# Project brief — <product>

## Product
<What it does, for whom, and why it exists.>

## Actors and permissions
| Actor | Can | Cannot |
|---|---|---|

## Core journeys
1. <journey, step by step>
2. <journey>
3. <journey>

## Data model
<Entities, relationships, invariants. Include the two or three constraints that shape the schema.>

## Hard constraints
<Concurrency, capacity, time zones, payments, privacy, geospatial, etc.>

## Hero feature
<The capability that makes this product distinctive.>

## Production requirements
<Auth, validation, async, storage, tests, deploy, observability.>

## Failure modes
<What breaks in production, and what the learner must handle.>

## Capstone evidence
<What the learner demos and defends.>

## Variant deltas
<For each variant: primary user, hardest constraint, hero feature, data-model delta, capstone.>
```

## 6. Module brief

```yaml
---
artifact: module-brief
course: <slug>
module: 03-core-loop
version: 1
owner: curriculum-architect
roadmap_version: 1
roadmap_confirmed: true
---

# Module 03 — Core loop

## Outcome
<What the learner can do at the end of the module.>

## Why this module exists
<The product problem it solves.>

## Prerequisites
<What must be true before the learner starts.>

## Chapters
| # | Chapter | Type | Outcome | Evidence |
|---|---|---|---|---|
| 03.01 | | Concept | | |
| 03.02 | | Build | | |

## Interactions
<Which quizzes, predicts, open questions, code exercises, diagrams, reads.>

## Canvases
<Canvas slugs and the chapters that use them, or "none". For HLD-heavy modules, name each behavior-under-change outcome and record a canvas slug/spec or why Mermaid plus a worked trace is sufficient.>

## Gate
<Checklist + LearningLog. State the evidence, not the activity.>

## Risks
<The most likely place the learner gets stuck.>
```

## 7. Chapter brief

```yaml
---
artifact: chapter-brief
course: <slug>
module: 03-core-loop
chapter: 03.04-reserve-inventory
version: 1
owner: curriculum-architect
roadmap_version: 1
roadmap_confirmed: true
---

# Chapter 03.04 — Reserve inventory

## Outcome
<One observable sentence.>

## Prose target
<≥ 1,200 prose words for a concept/build chapter; ≥ 700 for a checkpoint/gate. List what the prose must cover: problem, mechanism, worked example, trade-offs, failure modes, debugging.>

## Hook
<The concrete problem or failure.>

## Concept
<The minimum theory. Name the mechanism, not only the vocabulary.>

## Worked example
<An adjacent case, solved with reasoning. Process-oriented for novices; product-oriented when the learner is ready.>

## Decision
<The trade-off the learner must make. Alternatives and the consequence of each.>

## Alternatives and tools
<Credible alternatives, open-source/managed options, when to switch, operational cost.>

## Build
<The task. File paths, interfaces, constraints, acceptance criteria.>

## Failure modes
<What breaks, how to detect it, and the debugging path.>

## Verify
<Command/test/screenshot, including one failure mode.>

## Interactions
<Exact blocks and placement. Link to interaction-map.yaml.>

## Component budget
<Top-level components ≤ 6; total JSX tags ≤ 25; assessment interactions ≤ 3. State what was removed and why.>

## Diagram
<Diagram plan: Mermaid first for HLD topology/request paths; otherwise Entity, State, Architecture, Trace, or static SVG as appropriate. State the claim, placement, public/private boundaries where relevant, labeled connections, text alternative, and legend.>

## Canvas
<Canvas spec slug, or "none". For HLD, name the changing condition and observed consequence, then state why a model-backed canvas is needed or why Mermaid plus a worked trace is enough. Do not name an unregistered slug.>

## Reflect
<Retrieval or learning-log prompt.>

## Bridge
<What this unlocks and what comes next.>

## Sources
<Claims that need a citation.>
```

## 8. Interaction map

```yaml
---
artifact: interaction-map
course: <slug>
version: 1
owner: interaction-designer
---

chapters:
  - id: 03.04-reserve-inventory
    archetype: concept
    interactions:
      - type: BIG_WORD_ALERT
        placement: after-hook
        purpose: Define hold vs sale
        budget: 1
      - type: DIAGRAM
        component: MermaidDiagram
        placement: after-mechanism
        purpose: Show the request path to the inventory transaction boundary
        budget: 1
      - type: CANVAS
        slug: seat-hold-race
        placement: before-transaction
        purpose: Explore how hold duration changes the odds of a second buyer being rejected
        budget: 1
      - type: CHECKLIST
        placement: end
        purpose: Verify the learner can state the invariant and the failure mode
        budget: 1
    diagram_plan:
      format: MermaidDiagram
      claim: The hold API changes availability before payment completes
      boundaries: Browser, API, and inventory transaction
      canvas_decision: seat-hold-race models concurrent requests; see its spec
    density:
      big_word_alerts: 1
      diagrams: 1
      callouts: 1
      predicts: 0
      quizzes: 0
      open_questions: 0
      code_exercises: 0
      canvases: 1
      must_reads: 0
      interesting_reads: 0
      real_world_events: 0
```

## 9. Assessment plan

```yaml
---
artifact: assessment-plan
course: <slug>
version: 1
owner: assessment-designer
---

outcomes:
  - id: O4
    statement: <outcome>
    level: application | analysis | evaluation | creation
    evidence:
      - type: QUIZ
        chapter: 03.05
        proves: <what it proves>
      - type: CAPSTONE
        milestone: <milestone>
        proves: <what it proves>
    rubric:
      - dimension: invariant
        weight: 0.4
        descriptors:
          4: <observable>
          3: <observable>
          2: <observable>
          1: <observable>
```

Before sign-off, check every `QUIZ`, `PREDICT`, and knowledge-check set: the correct option must not be the longest by default, option lengths must be comparable, and the correct position must vary. A set where the longest option is correct in half or more of the questions is not ready.

## 10. Variant diff

```yaml
---
artifact: variant-diff
course: <general-slug>
variant: <variant-slug>
version: 1
owner: variant-producer
---

# Variant diff — <variant>

## Dimensions

| Dimension | General course | Variant | Why it matters |
|---|---|---|---|
| Primary user journey | | | |
| Hardest constraint | | | |
| Data model | | | |
| Hero feature | | | |
| Visual and verbal identity | | | |
| Capstone evidence | | | |

## Uniqueness score
<At least four of six dimensions materially different. State the evidence.>

## Shared spine
<Outcomes, production bar, interaction grammar, assessment standard.>

## Rejected similarities
<What looks similar and why it is acceptable, or what must change.>
```

## 10A. Variant intake

Run this with the instructor or sponsor before any variant roadmap is written. The answers are the source of truth for the course family catalogue in `server/src/shared/lib/course-tracks.ts`: the variant picker, the reader theme, the mentor badges, the specialisation offered at the end, and the value each learner sees in place of `%%product.name%%`. One block per variant.

```yaml
---
artifact: variant-intake
course: <general-slug>
family: <family-slug>
answered_by: <name and role>
asked_by: variant-producer
date: <date>
status: draft | confirmed
---

# Variant intake: <family>

## Family
| Question | Answer | Catalogue field |
|---|---|---|
| What do learners call the course family? | | `label` |
| Which variant does a learner get before they pick one? | | `defaultVariantSlug` |

## Variant <n>
| Question | Answer | Catalogue field |
|---|---|---|
| What is this variant called in one or two words? | | `label` |
| What is the reference product called? Learners on this variant read it wherever a chapter says `%%product.name%%`. | | `productName` |
| Who uses the product and what do they do, in one sentence? | | `summary` |
| What makes this variant hard that the others do not have? | | `hardestConstraint` |
| Which specialisation follows naturally from it? | | `specialisationSlug` |
| Which accent colour fits the product, on light and on dark? | | `theme.accentLight`, `theme.accentDark` |
| Sans or serif headings? | | `theme.headingFont` |

## Specialisations
| Slug | Label | One-line summary |
|---|---|---|

## Checks before the catalogue changes
- Each product name uses letters, digits, spaces, hyphens or the typographic apostrophe only. It is inserted into chapters as plain text, so `{ } < > [ ] * _ # | \ " &` and the plain apostrophe are not allowed.
- Each accent reaches 4.5:1 against its background and against its label colour, light and dark.
- No two variants share a product name, a hardest constraint or a primary user.
```

## 11. Critique report

```yaml
---
artifact: critique
course: <slug>
artifact_under_review: <path>
reviewer: critic
review_type: pedagogy | slop | assessment | technical | continuity
version: 1
---

# Critique — <artifact>

## Scorecard
| Dimension | Score | Note |
|---|---|---|

## Defects

### S1
- location:
  observation:
  why it matters:
  required fix:

### S2
- location:
  observation:
  why it matters:
  required fix:

### S3
- location:
  observation:
  suggested fix:

## What works
<Be specific. This is not flattery; it tells the writer what to preserve.>

## Recommendation
<approve | revise | rewrite from brief>
```

## 12. Technical validation report

```yaml
---
artifact: technical-validation
course: <slug>
version: 1
owner: technical-validator
environment:
  node: <version>
  package_manager: <version>
  os: <version>
  database: <version>
---

# Technical validation

## Commands run
| Command | Result | Output |
|---|---|---|

## Build from clean checkout
<pass/fail + evidence>

## Code exercises
| Exercise | Starter fails | Solution passes | Failure test |
|---|---|---|---|

## API examples
| Example | Method/path | Auth | Response | Result |
|---|---|---|---|---|

## MDX validation
<command + result>

## Links
| URL | Status | Claim matched |
|---|---|---|

## Security
<auth, validation, rate limits, secrets, answer leakage>

## Deployment
<from scratch, result>

## Canvas QA
<links to the Canvas QA report for every canvas>

## Open issues
<severity + owner>
```

## 13. Scorecard

```yaml
---
artifact: scorecard
course: <slug>
artifact_under_review: <path>
version: 1
---

dimensions:
  outcome_alignment: 0
  domain_specificity: 0
  depth_over_coverage: 0
  prose_quality: 0
  chapter_structure: 0
  interaction_purpose: 0
  assessment_quality: 0
  difficulty_calibration: 0
  cognitive_load: 0
  prerequisite_integrity: 0
  technical_accuracy: 0
  production_grade_coverage: 0
  security_integrity: 0
  accessibility: 0
  ip_protection: 0
  variant_distinctiveness: 0
  continuity: 0
  learner_agency: 0
  instructor_alignment: 0
  interactive_canvas_quality: 0   # score 5 if the course has no canvas
  explanatory_depth: 0
  visual_explanation_quality: 0

average: 0
blocking_defects: 0
recommendation: <approve | revise | rewrite>
```

Minimum: every dimension ≥ 4; average ≥ 4.3; zero S1/S2 defects.

## 14. Decision log

```markdown
# Decision log — <course>

| Date | Decision | Alternatives | Why | Owner |
|---|---|---|---|---|
| | | | | |
```

## 13A. Course audit report

```yaml
---
artifact: course-audit
course: <slug>
version: 1
owner: course-auditor
script: agent-ip/scripts/audit-course.mjs
---

# Course audit — <course>

## Summary
| Metric | Value | Threshold | Pass |
|---|---|---|---|
| Chapters | | — | |
| Prose words | | — | |
| Chapters below prose minimum | | 0 | |
| Chapters above component budget | | 0 | |
| Chapters above interaction budget | | 0 | |
| Chapters missing a diagram | | 0 | |
| List-heavy chapters | | 0 | |

## Per-chapter results
| Chapter | Type | Prose | Top-level components | Total tags | Interactions | Diagrams | Flags |
|---|---|---:|---:|---:|---:|---:|---|
| | | | | | | | |

## Defects

### S2
- location:
  observation:
  required fix:

### S3
- location:
  observation:
  suggested fix:

## Recommendation
<approve | revise | rewrite from brief>
```

## 14A. Interactive canvas spec

```yaml
---
artifact: canvas-spec
course: <slug>
chapter: <id>
slug: <stable-slug>
version: 1
owner: interaction-designer
---

# Canvas spec — <title>

## Teaching claim
<One sentence the learner should be able to state afterwards.>

## Why a canvas
<Why a static diagram or worked example is not enough.>

## Model
- Inputs:
  | Name | Unit | Min | Max | Step | Default |
  |---|---|---|---|---|---|
- Outputs:
  | Name | Unit | Format |
  |---|---|---|
- Formula or rule:
- Assumptions:
- Limitations:

## Rendering
- Primary: HTML/CSS | inline SVG | Canvas 2D
- Why this renderer:
- SVG structure: viewBox, layers, element count, theme tokens
- Controls: HTML controls (never SVG form controls)
- Static fallback:

## Controls
<Sliders, steppers, toggles, presets. Why each control exists.>

## Visualisation
<Chart, bucket, timeline, matrix, map. One idea. Direct labels.>

## Copy
- What this shows:
- Try this:
  1.
  2.
- What changed: <how the live delta is worded>
- Limits of the model:

## Edge cases
<Zero, maximum, invalid input, no data, long labels, mobile.>

## Accessibility
<Keyboard, labels, text alternative, reduced motion, contrast.>

## Acceptance criteria
- [ ] The claim is testable.
- [ ] The model is tested.
- [ ] The design is simple and legible.
- [ ] Prediction before, transfer check after.
- [ ] Reader fallback exists.

## Build plan
<Component path, model path, test path, registry slug, preview route.>
```

## 14B. Canvas QA report

```yaml
---
artifact: canvas-qa
course: <slug>
chapter: <id>
slug: <stable-slug>
version: 1
validator: technical-validator
---

# Canvas QA — <title>

## Model
| Case | Input | Expected | Actual | Pass |
|---|---|---|---|---|

## Teaching
- Claim stated:
- Prediction present:
- Transfer check present:
- Limitations visible:

## Visual
- Palette:
- Series count:
- Labels and units:
- Mobile:

## Accessibility
- Keyboard:
- Labels:
- Text alternative:
- Reduced motion:

## Technical
- Reader integration:
- Fallback:
- Console errors:
- Interaction performance:

## SVG
- Component, not raw string:
- Responsive viewBox:
- Theme tokens / light + dark:
- Title and description:
- Keyboard and focus:
- Sanitized (if static):
- No scripts / foreignObject / external hrefs:
- Visual regression:

## Defects
| Severity | Location | Observation | Required fix |
|---|---|---|---|
```

## 15. Publish checklist

```yaml
---
artifact: publish-checklist
course: <slug>
version: 1
approved_by: <delivery lead>
date: <date>
---

- [ ] Brief, research, instructor-confirmed curriculum roadmap, roadmap confirmation record, blueprint, project brief, interaction map, and assessment plan attached
- [ ] All chapters pass the scorecard
- [ ] Technical validation passed
- [ ] MDX compiles and renders
- [ ] Links checked
- [ ] Accessibility checked
- [ ] Canvas specs and QA reports attached for every canvas
- [ ] IP leakage checked
- [ ] Variants distinct and validated
- [ ] Human sign-off recorded
- [ ] Import succeeded
- [ ] First module completed by a test learner
- [ ] Rollback plan recorded
- [ ] Post-launch review date set
```
