# Quality Gates

This document defines how we decide that a course, module, or chapter is good enough to move forward. It is deliberately adversarial: the critic's job is to find the defect before a learner does.

## Gate model

| Gate | Artifact under review | Reviewers | Exit condition |
|---|---|---|---|
| G1 | Research dossier | Curriculum architect + human | Sources verified; domain constraints identified |
| G2A | Curriculum roadmap | Curriculum architect + prerequisites/timeline | Outcomes, sequence, hours, capstone, variants, out-of-scope present |
| G2B | Instructor roadmap confirmation | Instructor panel (2+ instructors) | At least two instructors sign; open decisions resolved |
| G2C | Blueprint, skill graph, timeline, project brief | Human review board | Derived from the confirmed roadmap; outcomes measurable; time budget sums; project production-grade |
| G3 | Interaction map, assessment plan, sample chapter | Human review board + critics | Sample passes all scorecards; imports and renders |
| G4 | Full draft | Orchestrator + continuity editor | Every chapter has a brief, build, verify, and bridge |
| G5 | Full course | Technical validator + critics | No S1/S2 defects; scorecard thresholds met |
| G6 | Variants | Human review board + critics | Variant roadmaps confirmed; uniqueness contract met; each variant passes G5 |
| G7 | Publish package | Delivery lead | Import, deploy, accessibility, rollback, sign-off |

A gate is binary. "Almost ready" means not ready.

G2B is a hard prerequisite for G2C, G3, and G4. If the roadmap is not confirmed by at least two instructors, the later gates cannot open.

## Roadmap confirmation checklist

The instructor panel reviews the roadmap at G2B, not the full course. The checklist:

- [ ] The course promise names a real product, a real learner, and a real demo.
- [ ] The entry prerequisites are explicit and realistic.
- [ ] The outcomes are observable and match what the instructors expect from a finisher.
- [ ] The module sequence follows how the instructors actually teach the material.
- [ ] Every chapter title has a one-line outcome that an instructor can understand.
- [ ] The hour estimates sum to the 3–4 week budget and look realistic to the instructors.
- [ ] The gate evidence is clear at a glance.
- [ ] The capstone is demoable in five minutes and defensible in a walkthrough.
- [ ] The variant directions represent the audiences the instructors serve.
- [ ] The out-of-scope list is explicit and agreed.
- [ ] Every open decision is resolved or explicitly deferred with a reason.
- [ ] At least two instructors sign the confirmation record.

If any item fails, the roadmap is revised and re-confirmed. The blueprint does not start.

## Canvas QA checklist

Use this whenever a chapter includes an interactive canvas. The full contract is in `10-interactive-canvases.md`.

### Model

- [ ] The teaching claim is written in the spec.
- [ ] The formula or rule is written and matches the implementation.
- [ ] Every input has a min, max, step, default, and unit.
- [ ] Unit tests cover default, minimum, maximum, and one edge case.
- [ ] Zero and maximum inputs do not produce NaN, infinity, or a broken layout.
- [ ] Assumptions and limitations are visible in the UI.
- [ ] For an HLD canvas, changing a load, failure, or routing input changes the modeled outcome; the fixed topology and control-plane/data-plane paths stay technically accurate.

### Teaching

- [ ] The default state produces an interesting result.
- [ ] The first interaction is obvious.
- [ ] "What changed" explains the delta in words.
- [ ] "Try this" experiments have expected observations.
- [ ] A prediction comes before the canvas.
- [ ] A transfer check comes after the canvas.
- [ ] Slider use is not counted as completion.
- [ ] The canvas does not reveal the capstone solution.

### Visual

- [ ] Neutral palette, one accent, semantic color only.
- [ ] No gradients, neon, or decorative animation.
- [ ] At most four series in a chart.
- [ ] Axes, units, and direct labels are present.
- [ ] Summary cards show the numbers the learner needs first.
- [ ] The layout is title → summary → visualisation → controls → explanation.

### Accessibility and mobile

- [ ] Every control has a label, value, and unit.
- [ ] Every control is keyboard reachable.
- [ ] The visualisation has a text alternative or live summary.
- [ ] Color is not the only signal.
- [ ] `prefers-reduced-motion` is respected.
- [ ] The canvas is readable at a mobile width.
- [ ] Touch targets are at least 44px.

### Technical

- [ ] No network calls, secrets, or private URLs.
- [ ] The canvas renders without console errors.
- [ ] Interaction updates in under a frame for the expected range.
- [ ] The canvas is registered under a stable slug.
- [ ] An unknown slug renders a safe fallback.
- [ ] A static fallback exists for the chapter.
- [ ] The canvas is tested in the reader, not only in isolation.

### SVG

- [ ] The visualisation is a React SVG component, not a raw SVG string.
- [ ] `viewBox` and `preserveAspectRatio` make it responsive.
- [ ] Colors come from tokens or `currentColor`; light and dark mode both work.
- [ ] `<title>` and `<desc>` exist, or an equivalent text alternative does.
- [ ] Interactive shapes are keyboard reachable and have accessible names.
- [ ] Focus rings are visible; hover is not required to read the data.
- [ ] No `<script>`, `<foreignObject>`, raw inline event attributes, external `href`, or `javascript:` URLs.
- [ ] No remote images or fonts inside the SVG.
- [ ] Static SVG assets are sanitized, optimised, and hosted locally.
- [ ] Visual regression passes in light, dark, and mobile widths.

## Course audit

The audit is executable. Run it at G3 and G5:

```bash
node agent-ip/scripts/audit-course.mjs courses/<course-slug>
```

For a multi-variant course, also scan newly authored variant lessons for repeated long prose:

```bash
node agent-ip/scripts/audit-variant-repetition.mjs courses/<course-slug>/variants
```

Repeated paragraphs of 45 or more words across chapters need editorial review even when each chapter passes the word-count audit. Rewrite the worked example, practice, failure test, and bridge around the chapter's actual decision; a passing prose count alone does not pass G5.

Audit the **resolved** learner path, not only the shared source files. Apply the
variant `moduleOrder`, `omitLessonKeys`, full overrides and exact replacements
before judging a passage. Run:

```bash
cd server && pnpm exec tsx scripts/audit-marketplace-inheritance.ts
```

The audit reports inherited shared lessons, lessons adapted by replacements,
effective findings after resolution, and variant-authored findings. Any effective
finding in a released variant blocks the gate. A mention of the reference product
in variant-authored prose is allowed only when the prose explicitly compares or
credits the shared example; it must never present that product as the learner's own.

It checks, per chapter:

- for Learn chapters (`format: beats`): four to eight beats, each opening with a visual, at most 70 visible words per beat, 300 to 700 visible words, and at least 900 words including `GoDeeper` folds;
- for other chapters: prose words (at least 1,200 build, at least 700 checkpoint/gate) and top-level components (at most 6);
- total JSX tags (at most 40 for Learn, 25 for others);
- assessment interactions (≤ 3);
- diagram coverage (≥ 1 per concept/build chapter; ≥ 1 per module);
- list-heavy chapters.

The course auditor files a defect for every chapter that fails. A course with a failing audit does not pass G3 or G5.

### Audit review questions

- Can the learner learn the concept from the prose alone?
- Is every component introduced and explained in prose?
- Does every module have at least one diagram that argues?
- In HLD-heavy modules, does the diagram show the relevant public/private boundaries and request or event path? Is each behavior-under-change outcome backed by a reviewed canvas or an honest worked trace, with the choice recorded?
- Are the interactions concentrated at checkpoints and decisions, not spread as a template?
- Does each build chapter have file paths, acceptance criteria, a failure test, and a debugging path?
- Does each concept have a worked example and a practice problem?
- Are the trade-offs and alternatives explicit?

## The scorecard

Score each dimension from 1 to 5.

| Score | Meaning |
|---|---|
| 5 | Exemplary; could be used as a reference |
| 4 | Strong; minor polish only |
| 3 | Acceptable but uneven; needs revision before publish |
| 2 | Weak; a structural problem |
| 1 | Failing; the artifact does not meet the standard |

### Dimensions

1. **Outcome alignment.** Every chapter serves an outcome; every outcome has evidence.
2. **Domain specificity.** Examples, constraints, and numbers belong to this product, not any product.
3. **Depth over coverage.** The course chooses a smaller scope and teaches it deeply.
4. **Prose quality.** The writing is clear, specific, and free of slop patterns.
5. **Chapter structure.** Hook, concept, example, decision, build, verify, reflect, bridge.
6. **Interaction purpose.** Every interaction produces evidence; density is within budget.
7. **Assessment quality.** Questions test application, distractors are plausible, feedback is useful.
8. **Difficulty calibration.** Challenge is desirable; prerequisites are secure; support fades.
9. **Cognitive load.** One hard thing at a time; extraneous load is removed.
10. **Prerequisite integrity.** No chapter requires a concept that has not been taught.
11. **Technical accuracy.** Commands, versions, APIs, and code are verified.
12. **Production-grade coverage.** Auth, validation, async, storage, tests, deploy, observability.
13. **Security and integrity.** Trust boundaries, answer keys, and learner data are handled correctly.
14. **Accessibility.** Keyboard, screen reader, contrast, alt text, mobile.
15. **IP protection.** The course reveals context and withholds the complete solution.
16. **Variant distinctiveness.** The variant differs on at least four of the six dimensions.
17. **Continuity.** Names, versions, file paths, and decisions are consistent across chapters.
18. **Learner agency and curiosity.** The learner makes real decisions and wants to know what happens next.
19. **Instructor alignment.** The confirmed roadmap is reflected in the course; the instructors recognise the sequence, outcomes, and capstone as theirs.
20. **Interactive canvas quality.** The model is correct and tested; the controls and output are legible; the design is simple; the canvas teaches one claim; the learner can state the claim and transfer it. If the course has no canvas, score 5 and mark it not applicable.
21. **Explanatory depth.** The prose teaches the mechanism, the trade-offs, a worked example, and the failure modes. Components support the explanation; they do not replace it. The prose-depth audit passes.
22. **Visual explanation quality.** Diagrams are necessary, accurate, accessible, labeled, and make a relationship, flow, or state change legible. HLD diagrams show relevant component connections and public/private boundaries; changing-condition outcomes have a recorded canvas or worked-trace decision. A diagram that restates the prose is a defect.

### Thresholds

- Every dimension must score **at least 4**.
- The average must be **at least 4.3**.
- Any dimension at **3** triggers a revision and a re-score.
- Any dimension at **1 or 2** blocks the gate.
- A single S1 defect blocks the gate regardless of the average.

Do not average away a failure. A course with a beautiful prose score and a broken security lesson is not a good course.

## Critic lenses

Run at least two independent critics at G3 and G5. They review blind: the artifact, the rubric, and the source dossier — not the writer's rationale.

### Pedagogy critic

- Does the chapter teach a decision, or only a definition?
- Is the outcome observable and assessed at the right level?
- Are the prerequisites secure?
- Is the difficulty desirable, or is it confusion?
- Does the support fade?
- Does the learner retrieve and apply, or only recognise?

### Slop critic

- Does the prose contain any forbidden pattern from `00-principles.md` or `03-authoring-standards.md`?
- Are the examples specific to this product?
- Is any paragraph generic enough to appear in another course?
- Is the chapter a list of bullets pretending to be a lesson?
- Is there duplicate explanation?
- Does the interaction test reading comprehension rather than understanding?
- Does the voice sound like a person or a template?

### Assessment critic

- Does each question measure the stated outcome?
- Are the distractors plausible?
- Is the answer unambiguous?
- Does option length give the answer away (for example, the correct option is always the longest)?
- Is the feedback useful?
- Could a learner pass by guessing?
- Is the answer key server-side only?
- Is the rubric specific enough for two reviewers to agree?

### Technical critic

- Do the commands run?
- Are the versions pinned and current?
- Does the code compile?
- Do the tests pass?
- Does the MDX compile and render?
- Are the links live?
- Is the security advice correct?
- Is the deployment path reproducible?

### Continuity editor

- Are the product name, entities, file paths, and ports consistent?
- Does a later chapter contradict an earlier decision?
- Does a variant reuse a detail it should not?
- Are the same examples repeated across modules?
- Does the timeline match the chapter count?

## Anti-slop checklist

The slop critic files a defect for any of these:

- [ ] Generic opening or filler transition.
- [ ] A heading repeated as the first sentence.
- [ ] A bullet-only section with no explanatory prose.
- [ ] A "key takeaways" block that repeats the chapter.
- [ ] A generic actor ("a company", "a user") where a specific actor is possible.
- [ ] A fabricated statistic or case study presented as fact.
- [ ] An unsupported superlative.
- [ ] A quiz that tests the paragraph above.
- [ ] A quiz where the correct answer is the only plausible option.
- [ ] A quiz, prediction, or knowledge check where the correct option is the longest by default, or where option length otherwise gives the answer away.
- [ ] A set where the correct option is the longest in half or more of the questions.
- [ ] An open question used as a generic reflection.
- [ ] A diagram that restates the prose.
- [ ] A `BigWordAlert` on a term the learner already knows.
- [ ] A `MustRead` that is not needed for the next build.
- [ ] The same `RealWorldEvent` in more than one chapter.
- [ ] Two high-effort interactions back to back.
- [ ] Optional enrichment in a quiz or gate chapter.
- [ ] A dead link.
- [ ] An unverified command or API.
- [ ] A placeholder such as "TODO", "coming soon", or "add details here".
- [ ] An AI-style triple that repeats the same point three times.
- [ ] An em dash or en dash anywhere in the content.
- [ ] AI or tool attribution in the content, a commit or a PR.

## Technical validation checklist

The technical validator runs, not reads.

- [ ] The project builds from a clean checkout.
- [ ] The documented Node/runtime version works.
- [ ] Every command in the chapter succeeds in the documented environment.
- [ ] Every expected output a chapter shows, such as a test summary or a count, was copied from a real run at the course's pinned versions.
- [ ] The course's pinned minimum for each package is at least the newest version any snippet needs. A snippet that needs version 1.2 cannot ship under a `>=1.0` pin.
- [ ] Every code snippet compiles or is clearly labelled as partial.
- [ ] Every code exercise's tests pass against the reference solution and fail against the starter.
- [ ] Every API example has the correct method, path, auth, and response shape.
- [ ] Every environment variable is documented.
- [ ] The database migration or schema step is reproducible.
- [ ] The seed or demo data works.
- [ ] The deployment steps work from scratch.
- [ ] The MDX compiles with `pnpm content:validate`.
- [ ] The source structure validates with `pnpm content:validate:source`.
- [ ] The rendered chapter loads without console errors.
- [ ] Every canvas model passes its unit tests.
- [ ] Every canvas is keyboard reachable and has a text alternative.
- [ ] Every canvas is readable at a mobile width.
- [ ] Every canvas has a safe fallback if the slug is unknown or the component fails.
- [ ] Every inline SVG is a registered component, not raw author SVG.
- [ ] Every SVG is sanitized (if static), theme-aware, responsive, and has a text alternative.
- [ ] Every SVG has no scripts, `foreignObject`, raw inline event attributes, external hrefs, or remote fonts.
- [ ] Every link resolves and matches the claim.
- [ ] The resolved variant path is audited after module order, omissions, overrides and replacements, not only the raw shared files.
- [ ] There are no secrets, private URLs, or personal data in the source.
- [ ] The answer key, rubric, hidden tests, and solution are not in client-visible content.
- [ ] Rate limits, auth checks, and validation are present where the chapter claims they are.
- [ ] The performance claim is measured, not assumed.

## Reference consistency

Course text and the reference build must agree (`02-course-architecture.md` → Reference builds). Run this at G5, at G7, and after any change to either side. A mismatch is an S2 defect.

- [ ] The language and test runner in the chapters match the reference build (for example TypeScript and Vitest, not JavaScript and Jest).
- [ ] Every endpoint path and method a chapter names exists in the reference server, and the chapters use one name for each.
- [ ] Lifecycle timing matches: when an order, hold or record is created, paid for and changed.
- [ ] Every feature the course says exists is in the build, and every surface in the build (for example an admin panel) is taught, or listed as stretch or deferred.
- [ ] Currency, units and seed data match.
- [ ] Every quiz key, prediction and open-question model answer agrees with the reference code.
- [ ] The reference UI reads its brand from one config: name, logo, colour role tokens, fonts and dark mode.

Record the result in `work/<course-slug>/qa/reference-consistency.md`.

## Before a pull request

Run these for every course a pull request touches, and list what you ran and what you saw in the PR description.

- [ ] `pnpm --dir server content:validate:source --course <slug>` passes.
- [ ] `pnpm --dir server content:audit --course <slug>` reports 0 errors; any warning is explained in the PR.
- [ ] The course loads into a scratch database. A course that has never been released uses `pnpm --dir server content:import --course <slug>`. A course with a release (`repositoryPublish: true` and a published release) is refused by `content:import`; load it through the repository publisher (`courses:publish`) instead, the same path production uses. The publisher needs the instructor from `courses/publishing.yaml` as a verified mentor or admin with ZIP import access in that database, and it publishes every opted-in course, so limit it to your course for a local run. Start from a fresh scratch database: one that already holds a `content:import` copy of the course can keep the old chapters next to the new ones.
- [ ] A student click-through as a test learner (for example `mentee1@buildment.dev`) at 375px wide and at desktop width, in the light and dark themes. Every changed chapter loads without console errors.
- [ ] Grading works: answer one quiz right and one wrong, then check the score, the explanations and the saved progress.
- [ ] The PR says who re-answered the answer keys blind. If no person did, it asks a reviewer for a human key check (`05-assessment-and-motivation.md` → Answer-key check).

## Assessment validation

- [ ] Every outcome has at least one assessment.
- [ ] Every assessment maps to an outcome.
- [ ] The assessment level matches the outcome level.
- [ ] MCQ distractors are plausible and mutually exclusive.
- [ ] Option lengths are balanced; the correct answer is not systematically the longest.
- [ ] The correct answer is unambiguous to an expert.
- [ ] Every answer key was re-answered blind and matches the reference build.
- [ ] Every option has an explanation, shown one option per line.
- [ ] The audit gives no option-length warning (the correct option 10% or more longer than the longest wrong one) and no position warning (one position holds 70% or more of the course's correct answers), and correct positions are spread across the set.
- [ ] No graded question depends on opinion; those are open questions.
- [ ] Quiz chapters hold activities only, and their titles have no "Quiz:" prefix.
- [ ] Open questions that accept a link-only answer set `minWords: 0`.
- [ ] Every mentor-reviewed answer has a follow-up step.
- [ ] Open-question rubrics are specific enough for inter-rater agreement.
- [ ] Code tests cover the failure mode.
- [ ] The pass condition is stated before the learner starts.
- [ ] The learner cannot pass by copying the solution.
- [ ] The feedback tells the learner what to do next.

## Accessibility validation

- [ ] Images and diagrams have alt text that describes the relationship.
- [ ] Video has captions or a transcript.
- [ ] Interactive elements are keyboard reachable.
- [ ] Colour is not the only signal.
- [ ] The core journey works at a mobile width.
- [ ] Headings are in order.
- [ ] Link text is descriptive.
- [ ] Tables are readable on a narrow screen.
- [ ] Instructions do not require a mouse.
- [ ] Body text runs about 70 characters per line at 17 to 18px (`03-authoring-standards.md` → Readability).
- [ ] Body text reaches 7:1 contrast and small text 4.5:1, in light and dark themes.
- [ ] No paragraph text is faded with opacity.

## IP leakage check

- [ ] The capstone solution is not present in any learner-facing file.
- [ ] Hidden tests and answer keys are server-side only.
- [ ] The course does not publish the internal critique rubric.
- [ ] The course does not reveal the full variant map to learners.
- [ ] The course does not contain private company data or credentials.
- [ ] The course does not include the complete agent prompts or methodology.

The goal is to teach the thinking without giving away the answer or the operating system.

## Red-team scenarios

Before publish, the critic tries to break the course:

1. **The copier.** Can a learner complete the capstone by copying snippets from the course? If yes, too much is revealed.
2. **The skimmer.** Can a learner pass the quiz chapter without reading the concept chapter? If yes, the quiz is testing the wrong thing.
3. **The guesser.** Can a learner pass MCQ by elimination or pattern? If yes, the distractors are weak.
4. **The expert.** Does an experienced learner find the scaffolding insulting or the content too shallow? If yes, add a stretch path and remove over-scaffolding.
5. **The novice.** Does a learner without the prerequisite get stuck in the first 20 minutes? If yes, the prerequisite path is broken.
6. **The mobile learner.** Can the core journey be completed on a phone?
7. **The offline learner.** Does the course depend on a service that may be unavailable?
8. **The hostile input.** Does the build task teach validation and authorization, or only the happy path?
9. **The returner.** After a week away, can the learner resume without rereading everything?
10. **The defender.** Can the learner explain the system without notes? If not, the capstone evidence is insufficient.
11. **The instructor.** Would an instructor who teaches this domain recognise the sequence, outcomes, and capstone as their course? If not, the roadmap was not genuinely confirmed.
12. **The slider.** Can a learner spend ten minutes moving controls and still fail to state the claim or apply it in a new case? If yes, the canvas is entertainment, not teaching.
13. **The SVG author.** Can an author inject a script, `foreignObject`, event handler, external href, or remote asset through an SVG? If yes, the sanitizer or component contract is broken.
14. **The skimmer.** Can a learner skip the prose, click the components, and still pass? If yes, the components are the lesson, not the checkpoints.
15. **The bullet counter.** Is the chapter mostly bullets, cards, and code with little explanation? The audit will show it; the fix is prose, not more components.
16. **The diagram decorator.** Does the diagram only restate the paragraph above it? If yes, cut it or make it argue.

## Defect severity

| Severity | Meaning | Action |
|---|---|---|
| **S1 — Blocker** | Wrong, unsafe, broken, or IP-leaking | Must fix before any gate |
| **S2 — Major** | Teaches the wrong thing, assessment misaligned, missing prerequisite | Must fix before publish |
| **S3 — Minor** | Clarity, consistency, or polish issue | Fix before publish or track explicitly |
| **S4 — Polish** | Typos, formatting, optional improvement | Fix if cheap; may defer |

Every defect gets a location, a reason, and a suggested fix. "This feels weak" is not a defect. "The quiz asks for a definition immediately after the definition, so it measures recall rather than application; replace it with a scenario" is.

## Revision loop

1. Critic files defects.
2. Orchestrator deduplicates and assigns.
3. Writer revises.
4. Critic re-reviews only the changed sections plus the interactions they affect.
5. Two rounds maximum. If the same defect survives two rounds, rewrite from the brief and escalate to a human.

Do not let a writer "fix" a structural problem by adding more prose. If the chapter teaches the wrong thing, the brief is wrong. Fix the brief first.

## Sign-off artifact

Final learner-facing source MUST be in `courses/<course-slug>/` for every course and variant, with `course.yaml` matching its source folder and numbered module/lesson files. A repository target slug may identify an existing database course whose original slug differs; it must never create another course. Run source validation, the structure audit with `--strict`, and the course audit against that final package. Before making a variant selectable, verify the full assigned learner path, variant-specific build work, assessments, capstone, and reference consistency. Keep drafts and all QA/sign-off evidence under `agent-ip/work/<course-slug>/`. CI must publish only an approved package from `courses/`, never a draft from the work area. Follow `README.md` → Work areas.

The publish package contains:

- the course brief;
- the research dossier;
- the instructor-confirmed curriculum roadmap and `roadmap-confirmation.md`;
- the blueprint, skill graph, and timeline;
- the project brief;
- the interaction map and assessment plan;
- the canvas specs and canvas QA reports, if any;
- the course audit report and diagram assets;
- the final chapters;
- the technical validation report;
- the critique reports and scorecards;
- the variant diff report;
- the decision log;
- the human sign-off.

A course without this package is not publishable, even if the chapters look good.

## Continuous improvement

After launch, review:

- where learners get stuck (support questions, drop-off, failed checkpoints);
- which quizzes are too easy or too hard;
- which chapters produce generic open-question answers;
- which builds fail most often;
- whether the variants produce distinct portfolios;
- whether the capstone defenses are strong.

Update the course and this IP in the same change. A lesson learned that is not written down will be repeated.
