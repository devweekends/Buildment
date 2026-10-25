# Research and Sources

This document is the evidence base for the course factory. It explains what we researched, what we found, and which rules in this IP come from that research.

## Why research comes first

A course built from a model's memory reproduces the model's defaults: generic examples, comprehensive coverage, recall-based quizzes, and a smooth voice that teaches nothing. Research forces three things:

1. **Domain specificity.** We learn the real constraints of the product before we invent a curriculum.
2. **Source discipline.** Claims that can change are checked against primary sources.
3. **Pitfall awareness.** We design against known failure modes instead of rediscovering them.

The research agent produces a dossier before any chapter is written. The dossier is reviewed at G1.

## Source hierarchy

Use the highest available source for each claim.

1. **Primary research and standards.** Peer-reviewed papers, official specifications, vendor documentation, regulatory text.
2. **First-party engineering writing.** Postmortems, architecture notes, and documentation from the company that built the system.
3. **Reputable secondary analysis.** University teaching centres, established publications, and practitioner books with citations.
4. **Practitioner blogs and summaries.** Useful for orientation, never the sole source for a factual claim.
5. **Content farms and SEO listicles.** Do not use.

For fast-moving technical content, record the access date and the version. A correct claim about a library can become wrong after a major release.

## Research questions

For every course, the research agent answers:

- Who is the learner, and what do they already know?
- What does the product actually do, and who are its users?
- What are the hard constraints of the domain? (Concurrency, capacity, time zones, privacy, payments, access control, geospatial data.)
- What do existing courses and tutorials teach, and what do they omit?
- Which tools and versions are current, and which are deprecated?
- What are the common production failures in this domain?
- What should we explicitly not teach, given the time budget?
- Which claims need a citation in learner-facing content?

The dossier is not a literature review. It is a decision aid.

## Findings that shaped this IP

### 1. AI-generated courses fail by informing without teaching

A useful analysis of "AI slop" in e-learning identifies five recurring failures:

- content that presents accurate information but never asks the learner to do anything with it;
- generic examples that belong to nobody;
- a recognisable AI voice of smooth, clause-heavy, empty sentences;
- assessments that test whether the learner read the preceding paragraph;
- comprehensiveness over focus: many topics at shallow depth.

The same analysis argues that the fix is not a better model but a better system: a specific brief, instructional structure, format selection based on content, real-world context threaded through the course, source fidelity, and a structured quality audit.

**Rules derived:**

- The course brief must name audience, domain, constraints, and scenario (`README.md`, `02-course-architecture.md`).
- Examples must be specific to the product (`03-authoring-standards.md`).
- Assessments must test application (`05-assessment-and-motivation.md`).
- Depth over coverage is a hard principle (`00-principles.md`).
- A structured critique pass is mandatory (`06-quality-gates.md`).

### 2. Overloading information reduces retention

Common online-course retrospectives identify information overload as a persistent failure: packing too much into a lesson reduces comprehension and completion. The recommendation is smaller, digestible segments with summaries and visual cues.

**Rules derived:**

- One hard thing at a time (`00-principles.md`).
- Chapter and module length budgets (`03-authoring-standards.md`).
- A 3–4 week time budget with a core and stretch path (`02-course-architecture.md`).

### 3. Weak assessment is common

Course-design retrospectives repeatedly flag assessments that measure memorisation rather than application, have ambiguous questions, or provide no useful feedback. The recommended fix is to align assessments to outcomes, use scenarios, and give immediate, meaningful feedback.

**Rules derived:**

- Constructive alignment (`05-assessment-and-motivation.md`).
- Plausible distractors and scenario-based quizzes (`05-assessment-and-motivation.md`, `04-interactive-playbook.md`).
- Rubrics and feedback requirements (`05-assessment-and-motivation.md`).
- Assessment critic as a separate lens (`06-quality-gates.md`).

### 4. Backward design produces coherence

MIT's Teaching + Learning Lab describes backward design as a three-stage process: identify desired results, determine acceptable evidence, then plan learning activities. It prioritises intended learning outcomes over topics to be covered, and recommends observable, measurable, realistic, student-centred outcomes.

**Rules derived:**

- The blueprint is outcome-first (`02-course-architecture.md`).
- Every outcome has evidence (`05-assessment-and-motivation.md`).
- The course brief cannot be a table of contents (`08-templates.md`).

### 5. Desirable difficulties improve durable learning

The Bjorks' framework identifies five manipulations that can make practice feel harder while improving later retention or transfer: spacing, retrieval, interleaving, variation, and reduced feedback. The evidence is strongest for specific manipulations under defined conditions, and the difficulty is only desirable when the learner has the prerequisite knowledge, can make a successful attempt, and can be checked later.

A practical summary adds an important warning: do not make work harder without naming the learning gain; do not remove support too early; do not mix unrelated topics; do not measure only the lesson.

**Rules derived:**

- Retrieval, spacing, interleaving, variation, and faded feedback (`05-assessment-and-motivation.md`).
- The "desirable, not accidental" difficulty principle (`00-principles.md`).
- The check that prerequisites are secure before adding challenge.
- Human review of difficulty calibration (`06-quality-gates.md`).

### 6. Cognitive load and expertise reversal

Cognitive load theory and the expertise reversal effect show that guidance which helps a novice can hinder an expert. Worked examples and heavy scaffolding are useful early; they become extraneous load once the learner has the schema.

**Rules derived:**

- Worked examples before independent production (`03-authoring-standards.md`, `05-assessment-and-motivation.md`).
- Faded scaffolds (`02-course-architecture.md`, `05-assessment-and-motivation.md`).
- Stretch paths for experienced learners (`02-course-architecture.md`).
- A red-team check for the expert learner (`06-quality-gates.md`).

### 7. Learning is not the same as performance

Soderstrom and Bjork distinguish current performance from lasting learning. A smooth lesson can produce strong immediate performance without durable learning; an effortful task can produce errors during practice yet better delayed performance. This is why we judge learning with delayed or changed checks, not only with in-lesson fluency.

**Rules derived:**

- Retrieval and delayed checks (`05-assessment-and-motivation.md`).
- Capstone defense and viva (`02-course-architecture.md`, `05-assessment-and-motivation.md`).
- The "returner" and "defender" red-team scenarios (`06-quality-gates.md`).
- An interactive canvas is not evidence of learning by itself. Pair it with a prediction before and a transfer check after (`05-assessment-and-motivation.md`, `10-interactive-canvases.md`). A learner can move sliders fluently and still fail to explain the relationship.

### 8. Human oversight is not optional

The same e-learning analysis that documents AI slop is explicit about what AI cannot do: verify specialised factual accuracy, understand organisational nuance, and read the course from the learner's perspective. Those remain human responsibilities.

**Rules derived:**

- Human gates at G0, G1, G2B, G3, G6, G7 (`01-agent-system.md`, `09-review-and-governance.md`).
- The instructor panel confirms the curriculum roadmap before any blueprint or chapter is written (`02-course-architecture.md`, `09-review-and-governance.md`).
- The delivery lead signs publish (`README.md`).
- The review board includes a learner advocate (`09-review-and-governance.md`).

### 9. Worked examples reduce extraneous load for novices

The Raspberry Pi Foundation's pedagogy summary on worked examples finds that novices benefit from a model solution because it reduces the load on working memory and helps them form schemas. Process-oriented examples (showing the steps and reasoning) are especially useful for complete novices; product-oriented examples work better once the learner has some experience. The recommended sequence is worked example → similar practice problem → a second example in a different context → faded support.

**Rules derived:**

- Every new concept gets a worked example and a practice problem.
- Show the reasoning, not only the final code.
- Use sub-goal labels and integrated explanations, not split attention.
- Fade the example as the learner gains competence.
- Do not over-scaffold an experienced learner.

Source: Raspberry Pi Foundation, "Pedagogy Quick Read 2 — Worked Examples" (2023).

### 10. Components can become extraneous load

The interaction playbook already treats components as a cost. The audit makes that concrete: too many cards, quizzes, and callouts with thin prose create extraneous load and train the learner to click rather than read. Cognitive-load theory calls for reducing extraneous load so working memory is available for the actual schema.

**Rules derived:**

- In a Learn chapter the picture leads, a few words explain it, and depth is folded (v0.5, after the architect's review of two text-heavy chapters on 2026-10-23: attention drops fast in long prose).
- A chapter that fails the depth audit (beats for Learn, prose for Build and Gate) is not ready, even if every component is present.
- Interactions are concentrated at checkpoints and decisions.
- No component-only sections.

### 11. Excalidraw diagrams have a craft standard

Excalidraw's technical-diagram guidance is specific: align to a grid, flow left-to-right for processes, top-to-bottom for hierarchies, use the 60-30-10 color rule, keep two or three accents, use semantic colors, standard shapes, bound arrows, labeled flows, `roughness: 0` for technical docs, and avoid crowded layouts and missing legends.

**Rules derived:**

- `11-visual-explanations.md` adopts those layout, color, type, shape, and arrow rules.
- A diagram must have a teaching claim, not just a layout.
- Static SVGs are sanitized, optimized, hosted locally, and consumed through a `diagram` fence or `VisualDiagram`.
- Diagrams are checked at mobile width and with a text alternative.

Source: Excalidraw design best practices (agent skill reference).

### 12. SVG needs an explicit accessibility pattern

SVG accessibility depends on intent: decorative SVGs should be hidden from assistive tech; meaningful SVGs need `role="img"` with a label or `<title>`/`<desc>`; interactive shapes need focusability, keyboard handlers, and accessible names. Charts need a text or table alternative.

**Rules derived:**

- Static diagrams: `<title>`/`<desc>` plus alt text on the block.
- Live diagrams: title, legend/direct labels, and a text alternative.
- Interactive SVG: HTML controls where possible; keyboard-reachable shapes with names and focus.
- Charts: provide a data table or text summary.

Source: ImageToSVG, "SVG Accessibility: Complete Guide" (2025).

## Learning-science summary

| Principle | What it means for the course | Where it is enforced |
|---|---|---|
| Backward design | Start with outcomes and evidence, then activities | Blueprint, assessment plan |
| Constructive alignment | Activities, assessment, and feedback target the same outcome | Scorecard dimension 1, 7 |
| Retrieval practice | Ask learners to recall before revealing | Quizzes, LearningLog, Predict |
| Spacing | Revisit important ideas in later modules | Module continuity pass |
| Interleaving | Mix related problem types so learners choose a method | Practice sets, debugging chapters |
| Variation | Change surface details, keep the idea stable | Variant design, worked examples |
| Faded feedback | Reduce prompts as competence grows | Chapter scaffolding, stretch path |
| Cognitive load | Remove extraneous load; sequence intrinsic load | Chapter budgets, one hard thing |
| Expertise reversal | Remove scaffolding for advanced learners | Stretch path, red-team check |
| Worked examples | Show reasoning before independent production | Chapter skeleton |
| Productive struggle | Difficulty must be attemptable and checkable | Difficulty calibration, hints |
| Self-determination | Support autonomy, competence, relatedness | Real decisions, demos, mentor review |
| Performance vs learning | Judge durable capability, not in-lesson fluency | Capstone defense, delayed checks |
| Exploration without assessment | A canvas can create a fluency illusion; require prediction and transfer | Canvas QA, assessment plan |
| Worked examples | Model the reasoning for novices, pair with practice, fade support | Chapter anatomy, authoring standards |
| Component density | Too many components with thin prose creates extraneous load | Course audit, interactive playbook |
| Diagram craft | Diagrams need hierarchy, alignment, semantic color, labels, and a claim | Visual explanations, diagram QA |
| SVG accessibility | Meaningful SVGs need a text alternative; interactive shapes need keyboard access | Visual explanations, accessibility checklist |

## How to cite in learner-facing content

- Cite the source next to the claim, not only in a bibliography.
- Use a link with descriptive text.
- State the access date for fast-moving documentation.
- If the claim is a synthesis of several sources, say so.
- If the claim is the course's opinion, label it as a trade-off or a recommendation.
- Do not cite a source you did not read.
- Do not use a source to support a stronger claim than it makes.

## Freshness

- Re-check all version-specific claims at G5.
- Re-check all links at G5 and before each variant publish.
- Mark any claim that depends on a free tier, a pricing page, or a vendor roadmap as "verify before publish".
- When a source changes materially, update the chapter and the decision log.

## Research dossier template

```yaml
---
artifact: research-dossier
course: <slug>
version: 1
status: draft
owner: research
sources_checked: <date>
---

# Research dossier — <course>

## Learner and context
Who they are, what they already know, what they need to be able to do.

## Domain model
The real entities, actors, constraints, and vocabulary.

## Hard constraints
The three to five constraints that will shape the architecture.

## Existing courses and gaps
What is already taught, and what is missing or wrong.

## Technical landscape
Tools, versions, licences, trade-offs, and deprecations.

## Production failure modes
What breaks in the real world, with sources.

## What not to teach
Out-of-scope topics and why.

## Source table
| Claim | Source | Type | Date checked | Confidence |
|---|---|---|---|---|

## Open questions
What still needs a human or a subject-matter expert.
```

## References

- MIT Teaching + Learning Lab, "Where to Start: Backward Design" — https://tll.mit.edu/teaching-resources/course-design/backward-design/
- CourseAgent, "AI slop is a real problem in e-learning — here's what it looks like and how to avoid it" (2026) — https://courseagent.ai/blog/ai-slop-elearning/
- DigitalDefynd, "20 Mistakes People Make While Creating an Online Course" (2026) — https://digitaldefynd.com/IQ/mistakes-while-creating-online-courses/
- Structural Learning, "Desirable Difficulties: Bjork's 5 Principles" (2025, updated 2026) — https://www.structural-learning.com/post/desirable-difficulties
- Bjork, E. L., & Bjork, R. A. (2011). "Making things hard on yourself, but in a good way: Creating desirable difficulties to enhance learning." — https://bjorklab.psych.ucla.edu/wp-content/uploads/sites/13/2016/07/RBjork_inpress.pdf
- Soderstrom, N. C., & Bjork, R. A. (2015). "Learning versus performance: An integrative review." Perspectives on Psychological Science, 10(2), 176–199. — https://doi.org/10.1177/1745691615569000
- Roediger, H. L., & Karpicke, J. D. (2006). "Test-enhanced learning: Taking memory tests improves long-term retention." Psychological Science, 17(3), 249–255. — https://doi.org/10.1111/j.1467-9280.2006.01693.x
- Cepeda, N. J., et al. (2006). "Distributed practice in verbal recall tasks: A review and quantitative synthesis." Psychological Bulletin, 132(3), 354–380. — https://doi.org/10.1037/0033-2909.132.3.354
- Brunmair, M., & Richter, T. (2019). "Similarity matters: A meta-analysis of interleaved learning and its moderators." Psychological Bulletin, 145(11), 1029–1052. — https://doi.org/10.1037/bul0000209
- "Desirable Difficulty: Theory and application of intentionally challenging learning" (PubMed) — https://pubmed.ncbi.nlm.nih.gov/35950522/
- InnerDrive, "The Expertise Reversal Effect and scaffolding support" — https://www.innerdrive.co.uk/blog/expertise-reversal-effect-scaffolding/
- Raspberry Pi Foundation, "Pedagogy Quick Read 2 — Worked Examples" (2023) — https://static.raspberrypi.org/files/curriculum/quickreads/2-Pedagogy_Summary_Worked_Examples_V6_2023.pdf
- Excalidraw design best practices — https://github.com/rnjn/cc-excalidraw-skill/blob/main/best-practices.md
- ImageToSVG, "SVG Accessibility: Complete Guide" (2025) — https://imagetosvg.com/blog/svg-accessibility-guide
