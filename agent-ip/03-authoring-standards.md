# Authoring Standards

This document governs how course prose is written. It applies to every chapter, aside, callout, question, explanation, and piece of UI copy. The goal is writing that is specific, calm, and useful — the voice of a senior engineer sitting next to the learner, not a marketing page and not a language model filling a template.

## Stable lesson identity for course updates

Give every new module and lesson a unique `key` in `course.yaml`. Keep that key when its title,
file path, module, or prose changes. A different key represents a different lesson; do not reuse
an old key for unrelated work. This lets an update preserve the right learner history. A
variant can keep the shared lesson key when it teaches the same goal, while a changed graded
activity needs a separate activity identity.
Write the shared lesson once. If only a sentence or section changes, add an exact
`replacements` entry under that variant in `course.yaml`. If the lesson's task or flow
changes, author a full file under `variants/<slug>/`. Do not duplicate unchanged
lessons for every variant. Omitted keys stay unchanged in updates; list removals
explicitly. Submit the package as a draft for the course creator to review.

Only add a new track to `availableVariantSlugs` after its complete learner path has been authored, technically checked, and reviewed against its roadmap. A roadmap or a product-name token does not make a track teach its own product. Keep unfinished tracks unavailable to new choices and random assignment; do not delete historical learner choices.

### One shared course, resolved per variant

The marketplace is one course, not six separate courses. The shared source is the
base curriculum, and a learner's selected or assigned variant resolves which
content that learner reads. Resolution happens in this order:

1. `moduleOrder` selects the modules in the variant's path. A shared module absent
   from the order is not taught in that variant.
2. `omitLessonKeys` removes shared lessons from the modules that remain.
3. A full override `file` replaces the shared lesson for that variant.
4. `replacements` apply exact text changes to the shared lesson. Each `from`
   string must match once.
5. `%%product.name%%` resolves at read time to the learner's product name, with
   FreshMarket as the fallback.

Write the shared lesson for the common spine. Use `%%product.name%%` where the
sentence is true for every product. Use `replacements` for an exact sentence that
changes per product. Author a full variant file when the task, data model, build
step, assessment or capstone changes. Do not copy an unchanged shared lesson into
every variant.

Review and audit the resolved text, not the raw shared file. A passage that a
variant replaces or omits is not part of that learner's path. A passage that
survives resolution and still names another product or its domain is a defect.
The inheritance audit in `server/scripts/audit-marketplace-inheritance.ts` applies
the order, omissions, overrides and replacements before it reports findings. Run
it before making any variant selectable. A reference product named in
variant-authored prose is allowed only when the prose explicitly compares or
credits the shared example; it must never present that product as the learner's own.

## Voice

- **Direct.** Say the thing. Prefer the active voice and the concrete verb.
- **Calm.** No hype, no urgency theatre, no exclamation marks in teaching prose.
- **Specific.** Name the product, the actor, the constraint, the number, and the failure.
- **Honest.** State what is hard, what is uncertain, and what the course does not cover.
- **Respectful.** The learner is intelligent and short on time. Do not over-explain what they already know; do not hide what they need.

A useful test: read the paragraph aloud. If it sounds like a person explaining a decision to a colleague, it passes. If it sounds like a template, rewrite it.

## Audience: the fellowship

Our learners are fellows in Gaza, on a fellowship. English is usually their second language. Many learn on a phone, on weak or expensive mobile data, around power cuts. Write and build for that learner first.

### Plain English

- **Short sentences.** One idea per sentence, about 20 words or fewer.
- **Common words.** "Use", not "utilise". "Start", not "commence".
- **Define jargon on first use,** in one plain sentence. Use `GlossaryTerm` inline, or `BigWordAlert` for the chapter's central term (`04-interactive-playbook.md` → `GlossaryTerm` versus `BigWordAlert`).
- **Explain or replace idioms and business phrases.** "Ballpark figure" means nothing to a reader who has never heard it. Idioms that slipped into past courses, with plain rewrites:
  - "grades on vibes": grades by feel, with no written criteria.
  - "a result you cannot reproduce is a rumour": a result you cannot reproduce cannot be trusted.
  - "a dashboard with extra steps": only a dashboard, made more complicated.
  - "in a blink": in well under a second.
- **No wordplay or sarcasm** that only works for native speakers.

### Light pages

- **Few heavy images.** Prefer a live diagram, a small SVG or text. Compress every image and give it alt text.
- **No autoplay video or audio.** Video is optional, short, captioned and has a transcript. The text path teaches the same thing.
- **No large download to start a chapter.** State the size of any file a learner must fetch.
- **Save progress often.** Every interaction saves on its own; a lost connection costs at most one short section (`05-assessment-and-motivation.md` → Attention, pacing and support).

### Hardship with care

- Scenarios may include power cuts, lost connections, displacement or studying while working. Never as a joke, never for drama.
- **Never force a learner to share personal hardship.** A prompt that invites it is optional, offers a neutral alternative, and is never graded or scored.
- If a learner shares hardship anyway, the mentor answers the person first and grades only the work the prompt asked for.
- **Wellbeing and harassment contacts are a real person:** a named coordinator or mentor and a way to reach them that works on a phone. Never only a form, a bot or a model.

## Prose first

The primary teaching surface is prose. Bullets are for inventories, comparisons, steps, and prerequisites. They are not a substitute for explanation.

The rule:

- Open each section with two to four sentences of prose that establish the problem or the idea.
- Use a list only when the content is genuinely list-shaped.
- After a list, write at least one sentence that explains what the list means or what to do with it.
- Never publish a chapter whose body is only bullets and code blocks.

Example of the failure:

> **Why caching matters**
> - Faster pages
> - Less database load
> - Better user experience

Example of the standard:

> Caching matters here because the catalogue endpoint is read hundreds of times for every write. If every read hits the database, a single product update can stall the browse page for everyone. A cache turns that repeated read into a cheap memory lookup — but only if you know when to invalidate it. The rest of this chapter is about that condition.

The second version teaches a decision. The first version fills space.

## Visual-first Learn chapters (beats)

Since IP v0.5 (`proposals/2026-10-23-visual-first-chapters.md`), a Learn (concept) chapter is built from **beats**, not from long prose. Attention drops fast in a wall of text; it holds when a picture moves first and a few words explain it. Mark every such chapter with `format: beats` in its frontmatter.

A beat is:

1. **A short heading**, eight words or fewer, that states what the picture shows ("If the bands overlap, nobody knows the order").
2. **One visual**, first: an `InteractiveCanvas` when something changes or can be changed, or a `MermaidDiagram`, `StateMachine` or `TraceRequest` when the relationship is fixed.
3. **At most 70 words of visible text**, in two to four short sentences, that say what the learner just saw and why it matters. No new idea that the picture does not show.
4. **An optional `GoDeeper` fold** with the full explanation: the mechanism in detail, trade-offs, failure modes, sources, numbers, code and edge cases.

The chapter as a whole:

- **Four to eight beats.** One or two sentences may come before the first beat to set the situation.
- **Visible text: 300 to 700 words** (outside `GoDeeper`, code, quizzes and component text).
- **Depth: at least 900 words** of visible text and `GoDeeper` text together. Depth is folded, not dropped: a learner preparing for an interview must find the mechanism, trade-offs, failure modes and sources in the folds.
- **The teaching contract:** a `predict` right before the beat that shows the key surprise, and a quick check (one or two `quiz` questions) after the last beat.
- **Budget:** one visual per beat (up to eight visual tags), at most 40 JSX tags in total, at most 3 assessment interactions. No `BigWordAlert` in a beats chapter; define terms in the beat text or with `GlossaryTerm`.
- **Code** goes in a `GoDeeper` fold unless the chapter's outcome is the code itself.
- **At least one playable beat.** A scene that only plays is a demonstration, not a play. Every Learn chapter needs at least one beat whose visual the learner drags or taps and sees respond (a custom canvas, or a scene inside controls), usually the one the roadmap's "Play / practice" column names. Watch-only scenes are fine for the other beats.

What makes a beat visual good is in `10-interactive-canvases.md` → Beat visuals. A beat whose text explains something the picture does not show is a defect: either the picture is wrong or the text belongs in the fold.

Read (set-the-scene) chapters are one or two beats. Build, Check and Gate chapters keep the prose rules below.

**Never ask before you teach.** Every question in a chapter (predict, quiz, open question) must be answerable from what earlier chapters taught, or from everyday intuition and what the picture shows, in plain words. A set-the-scene (Read) chapter shows the problem and its cost; it may ask "what do you notice?" or "what would you try first?" in everyday words, with no term or mechanism the module has not taught yet. A prediction about the mechanism (round trips, stampedes, quorums) belongs in the Learn chapter that teaches it, right before the beat that shows the answer. A "sketch your design" question belongs after the building blocks are taught. The architect asked for this on 2026-10-24.

## Prose depth and component budget

These rules apply to Build, Check and Gate chapters, and to Learn chapters written before v0.5 (no `format: beats`). A chapter is not done because it has the right components. It is done when the prose teaches the idea and the components prove that the learner engaged with it.

### Minimum prose

- **Build chapter (and a pre-v0.5 concept chapter):** at least **1,200 prose words**, excluding code fences, tables, bullet lists, JSX components, and frontmatter.
- **Checkpoint or gate:** at least **700 prose words**.
- **Module introduction:** 900–1,500 prose words.
- If a chapter is below the minimum, it is usually missing one of: the problem, the mechanism, a worked example, the trade-off, a failure mode, or the debugging path. Add the missing thinking; do not pad with adjectives.

### Component budget

Per chapter:

- At most **6 top-level components** and **25 total JSX tags**.
- At most **3 assessment interactions** (quiz + predict + open question combined).
- No component-only section. Every component sits inside an explanation.
- At most one diagram.
- At most one `BigWordAlert`, and only for a genuinely new, load-bearing term.
- At most one quiz at a checkpoint or decision point; not after every section.
- At most one `OpenQuestion`, and only at a module gate or architecture defense.

Per module:

- One `LearningObjectives` at the module introduction, not in every chapter.
- One `ChapterRecap` at the module gate, not after every chapter.
- One `RealWorldEvent`.
- One `MustRead` or `InterestingRead`.
- One or two diagrams, with at least one in a concept-heavy chapter.

If a component can be removed without reducing understanding, remove it. The audit script at `agent-ip/scripts/audit-course.mjs` enforces the measurable parts.

## Worked examples

Programming novices need worked examples before independent production. Use two kinds:

- **Process-oriented:** show the reasoning and the steps, not only the final code. Use sub-goal labels and comments that explain *why*.
- **Product-oriented:** show a complete or partial solution and ask the learner to adapt it to a new case.

The research-backed pattern:

1. Teach the concept with a short explanation.
2. Show a process-oriented worked example with sub-goal labels.
3. Pair it with a similar practice problem.
4. Show a second example in a different context so the learner sees the structure, not the surface.
5. Fade the support: later chapters give a partial example or only acceptance criteria.

Keep the example integrated. Do not split the code, the explanation, and the diagram across three separate sections; the learner has to hold them in working memory. Put the explanation next to the code and the diagram next to the relationship it explains.

Worked examples are for novices. Once the learner can perform the task, remove the example and give a harder problem. Over-scaffolding an experienced learner is extraneous load.

## Diagrams must argue

At least one diagram per module, and one in every concept-heavy chapter. A diagram must make a relationship, flow, boundary, or state change legible in a way prose cannot. If it only restates the paragraph above it, cut it.

- Start HLD topology and request flows with live Mermaid; use State/Entity/Trace for their specific relationships.
- Use static SVG for precise annotated composition that Mermaid cannot keep legible.
- Introduce the diagram in prose, then explain what to notice, then state the takeaway.
- Label arrows and include a legend when color or shape encodes meaning.
- Provide alt text or `<title>`/`<desc>`.
- See `11-visual-explanations.md` for the full standard.

## Chapter audit

Before a chapter goes to review, run:

```bash
node agent-ip/scripts/audit-course.mjs courses/<course-slug>
```

The chapter must pass:

- prose depth;
- top-level component count;
- total JSX tag count;
- assessment interaction count;
- diagram coverage;
- list-heavy check.

A chapter that fails the audit is not ready for a critic. The writer fixes the structure, not the score.

## Paragraph shape

- One idea per paragraph.
- Two to five sentences is the usual range.
- Start with the claim or the problem, then support it.
- Avoid paragraphs that begin with "Additionally", "Moreover", or "Furthermore" unless the logical connection is genuinely additive.
- Do not repeat the heading as the first sentence.

## Chapter skeleton

Use the ten-part skeleton from `02-course-architecture.md`:

1. Hook
2. Outcome
3. Context
4. Concept
5. Worked example
6. Decision
7. Build
8. Verify
9. Reflect
10. Bridge

Not every chapter needs a heading for every part. The order matters more than the labels.

## Explanation pattern

When introducing a technical idea, use this sequence:

1. **Problem.** What breaks or becomes expensive without this idea?
2. **Constraint.** What makes the naive solution insufficient?
3. **Options.** What are the realistic alternatives?
4. **Decision.** Which one are we choosing, and why?
5. **Consequence.** What does this choice make easy, and what does it make hard?
6. **Verification.** How will the learner know it works?

This pattern is the antidote to definition-first teaching. Do not open with "Redis is an in-memory data store." Open with the read pattern that makes Redis worth considering.

## Specificity

Replace generic nouns with the actual domain.

| Generic | Specific |
|---|---|
| A user | A season-ticket holder buying two seats for Saturday |
| A company | A 12-person events team running a 900-seat venue |
| Some data | 4,200 ticket rows, 18 scans per second at the gate |
| A request | `POST /api/v1/holds` with a 10-minute expiry |
| An error | `409 CONFLICT: seat A12 already held` |
| Fast | p95 under 250 ms at 50 concurrent buyers |

Specificity is not a demand for fake precision. If a number is illustrative, label it. If it is a target, say so.

## Examples

Every concept gets at least one example from the course's product. A second example from a real company is optional and must be sourced.

An example is doing its job when it changes a decision. It is decoration when it only illustrates the definition.

- **Use a running example.** The same product, the same users, and the same constraints recur across chapters. This reduces cognitive load and makes the project feel real.
- **Use a failure example.** Show the bug, the bad query, the race condition, or the security hole. Failure is where judgment is built.
- **Use a near-miss.** Show a solution that looks right and explain why it is not. This is more instructive than a clean success.
- **Label composites.** If a case is assembled from several companies, say so. Do not imply a real company did something it did not.

## Trade-offs and alternatives

Every major technical choice gets a short trade-off treatment. The learner should be able to answer: why this, why not that, and when would that change?

Use this shape:

- **The choice.** What we are choosing.
- **Why now.** The constraint that makes it appropriate.
- **What it buys.** The benefit, stated concretely.
- **What it costs.** The operational, cognitive, or financial cost.
- **The alternative.** At least one credible alternative.
- **When to switch.** The condition that would change the decision.

The platform has `ComparePanel` / `CompareColumn` for two-way comparisons and tables for multi-option inventories. Use them when the content is genuinely comparative; do not force every explanation into a table.

Include an uncommon alternative when it is credible, even if it is not the usual advice: a boring technology that is enough, a managed service instead of a self-hosted one, or not building the feature at all. Say why most teams do not choose it and when they should.

Avoid false balance. If one option is clearly better for this project, say so. Presenting every choice as equally valid teaches indecision.

## Tools, frameworks, and open source

When the course introduces a tool, cover:

- what problem it solves;
- when it is a good fit;
- when it is a bad fit;
- the credible open-source or managed alternatives;
- the operational cost (hosting, licence, maintenance, lock-in);
- the version used in the course and where to check the current docs.

Do not present a tool as the default because it is popular. Do not present a tool as "best practice" without a constraint. Do not hide a paid dependency or a commercial licence.

For open-source options, note the licence if it affects use (for example, a source-available licence that restricts commercial hosting). For managed services, note the free-tier limit or the cost trap.

## Curiosity

Curiosity is designed, not decorated. Use these mechanics sparingly:

- **Open loop.** Pose a question the chapter will answer, then answer it. Do not leave it dangling.
- **Prediction.** Ask the learner to commit to an outcome before revealing it. `Predict` is the right block for a binary or small-option decision.
- **Contradiction.** Show two plausible beliefs and let the learner discover which one survives the evidence.
- **Near-miss.** Show a solution that almost works, then expose the edge case.
- **Mystery bug.** Present a failing symptom and ask for a diagnosis before the explanation.
- **Tease the next constraint.** End a chapter with the problem the next chapter solves. One sentence, not a trailer.

Curiosity is not clickbait. If the chapter does not answer the question it raises, cut the question.

## Asides

An aside is optional depth that does not block the main path. The platform supports several forms. Use the lightest form that fits.

| Form | Use for | Do not use for |
|---|---|---|
| `Callout` | A warning, tip, definition, or success condition tied to the current step | Long explanations or multiple paragraphs of theory |
| `GlossaryTerm` | An inline term the learner can click for a short definition | Every noun; terms already defined |
| `BigWordAlert` | One central concept per chapter that deserves a card | A glossary dump; a term the learner already knows |
| `InterestingRead` | Optional further reading with a hook and time estimate | Required reading; a link with no reason |
| `RealWorldEvent` | A sourced industry event or company decision that changes the lesson | A fabricated anecdote; the same event in every chapter |
| `FaqGroup` / `FaqItem` | Misconceptions, edge cases, and "but what about" questions | A second lecture hidden in accordions |
| `CheckpointIntro` | Setting up a checkpoint or reflection | A generic motivational line |

Density budgets and placement rules are in `04-interactive-playbook.md`.

## Diagrams

A diagram is worth including when it shows a relationship that prose makes expensive to hold in working memory: a request path, a state machine, an entity relationship, a sequence, an architecture boundary.

- **One idea per diagram.** If it needs a legend with six unrelated entries, split it.
- **Label the flow.** Arrows should mean something specific: calls, returns, events, data ownership.
- **Prefer the platform's diagram components.** `MermaidDiagram`, `StateMachine`, `EntityDiagram`, `ArchitectureDiagram`, and `TraceRequest` are interactive or theme-aware. Do not paste a screenshot when a live diagram is possible.
- **Alt text is mandatory** for image-based diagrams. The alt text should describe the relationship, not the pixels.
- **Do not restate the paragraph.** If the diagram only repeats the prose, cut it.
- **SVG is a first-class option.** Prefer a live Mermaid diagram or a registered inline SVG component for crisp, theme-aware visuals. Use a static SVG asset only when the diagram is fixed.
- **SVG must be authored as a component, not a raw string.** Do not paste raw `<svg>` into MDX. Do not inject author SVG with `dangerouslySetInnerHTML`.
- **SVG must be responsive and theme-aware.** Use `viewBox`, `currentColor`, and design tokens. Test light and dark mode.
- **SVG must be accessible.** Include `<title>` and `<desc>` (or an equivalent text alternative), make interactive shapes keyboard reachable, and do not require hover to read the data.
- **Keep SVG simple.** Avoid filters, blurs, masks, and thousands of nodes. If the visual grows too dense, simplify it or use Canvas 2D for the visual and keep labels in HTML.

## Interactive canvas copy

When a chapter includes an interactive canvas, the surrounding copy must do four jobs. Keep each block short and concrete.

- **What this shows.** One or two sentences naming the model and the trade-off. Do not describe the UI; describe the relationship.
- **Try this.** Two or three experiments with expected observations. "Set egress to 1 MB and raise jobs per minute; watch the egress penalty overtake compute on AWS Spot."
- **What changed.** A live sentence that explains the delta in words, not only a new number. "Doubling egress raised monthly cost by 38%, but the cheapest provider stayed the same because compute still dominates."
- **Limits of the model.** What is simplified or ignored, so the learner does not overgeneralise. "The model ignores storage, NAT gateways, and discounts; use it to reason about shape, not to price a real deployment."

The visual language is deliberately restrained: neutral surfaces, one accent, semantic color only for success, warning, and error, direct labels, and no gradients or decorative motion. The canvas should look like a tool, not a toy.

Do not write "have fun", "play around", or "explore the magic". The learner is doing serious work. Do not hide the model behind the interaction; if the relationship cannot be stated in a sentence, the canvas is not ready.

## Code

- **Show interfaces, not full implementations.** A type, a route signature, a schema, a failing test, or a diff is usually enough.
- **Label partial code.** If a snippet omits error handling or imports, say so.
- **Use the language of the course.** Do not mix JavaScript and TypeScript in one project unless the course explicitly teaches the boundary.
- **Pin versions.** When a command depends on a version, state the version and the date checked.
- **Run it.** Every command and snippet must be executed by the technical validator in the course environment.
- **Do not hide the hard part.** If the interesting logic is in an omitted file, show the decision or the test that proves it, not a `// TODO`.
- **Do not paste the capstone.** Snippets may establish a pattern; they may not constitute the learner's solution.

## Variant placeholders

A course family shares chapters across its variants. Where a shared sentence is about the learner's own product, write `%%product.name%%` and each learner reads their variant's product name, for example Hamesh on the books variant. The value comes from the variant intake (`08-templates.md`, section 10A). Learners who have not picked a variant, and courses outside a family, read FreshMarket.

- **Use it** where the sentence is about the learner's product: "open your %%product.name%% vendor dashboard". It works in prose, lists, tables, string attributes of components, code fences, and block prompts, options and explanations.
- **Keep the reference name** where the text is about the shared example: screenshots, the example pack, the seed story, alt text that describes a reference image, and diagrams.
- **Only use it in a sentence that is true for every variant.** "Your %%product.name%% grocery shop" is wrong for the books variant. A sentence that only fits one domain belongs in that variant's chapter.
- **Never in** headings, chapter titles and summaries, module titles, course metadata, or answer keys, rubrics, sample answers, tests and solutions. Headings give links and notes that must be the same for everyone, titles show outside the chapter, and grading must not depend on the variant. Publish and import refuse all of these.
- **Only `%%product.name%%` exists today.** Any other `%%name%%` fails publish and import. A new placeholder is a platform change in `server/src/shared/lib/content-tokens.ts`, with its own fallback.

## Links and sources

- Prefer primary sources: official documentation, standards, research papers, postmortems, and first-party engineering blogs.
- Avoid content farms, SEO listicles, and unsourced summaries.
- Check that the link resolves and the content matches the claim. Archive unstable links.
- Note the access date for fast-moving documentation.
- Do not require a paywall for a mandatory read. Optional further reading may include a paywall if labelled.
- Do not cite a source you did not read.

## Forbidden patterns

These are hard failures. The slop critic will file them as defects.

- "In today's fast-paced world", "In this ever-evolving landscape", "It is important to note that".
- "Delve", "leverage" as a verb, "seamless", "robust" without a specific meaning, "powerful" as a substitute for an explanation.
- "Not only ... but also" used as filler.
- A heading followed by a sentence that repeats the heading.
- A bullet list where every item is a sentence fragment with no verb.
- A "key takeaways" section that repeats the chapter verbatim.
- A generic example with "a company" or "a user".
- An unsupported superlative: "the best", "the fastest", "the most scalable".
- A fake statistic. If you need a number, source it or label it as illustrative.
- A question that the chapter never answers.
- An interaction that tests reading comprehension of the paragraph above.
- A quiz, prediction, or knowledge check where the correct option is the longest by default, or where length otherwise gives the answer away.
- Distractors written as short labels while the correct option is a full explanation.
- A link with no reason to click it.
- A "further reading" list that is longer than the chapter.
- An AI-style triple: three short paragraphs that each restate the same point in different words.
- An em dash (U+2014) or en dash (U+2013) anywhere: prose, headings, options, explanations, code comments, UI copy, commit messages, PR text and changes to this IP. Use a comma, colon, full stop or parentheses, and write ranges as "3 to 4". Check before you push, covering committed work and messages: `git diff origin/main...HEAD | rg "^\+.*[\x{2013}\x{2014}]"` and `git log origin/main..HEAD --format=%B | rg "[\x{2013}\x{2014}]"` must both print nothing. Older IP text that still has them is cleaned when its section is next edited.
- AI or tool attribution in course content, commits or PRs: no "Generated with" footer, no `Co-Authored-By` line for a model or tool, no note that a model wrote the text. The people who review the work own it.

## Length budgets

These are planning targets, not hard limits. Use them to detect bloat.

| Artifact | Target |
|---|---|
| Chapter body (Build, pre-v0.5 concept) | 1,200 to 2,500 words |
| Learn chapter in beats | 300 to 700 visible words; 900 or more with folds |
| One beat | 70 visible words or fewer |
| Concept section | 400–900 words |
| Worked example | 200–500 words |
| Build instructions | 300–700 words, plus code |
| Reflection | 50–150 words |
| Module introduction | 300–600 words |
| Course introduction | 1,200–2,000 words |

A chapter that exceeds the budget usually has two ideas. Split it or cut one.

## Accessibility

- Use descriptive link text, not "click here".
- Provide alt text for every image and diagram.
- Do not encode meaning in colour alone. Pair colour with a label, icon, or text.
- Keep tables narrow enough to read on mobile; move long explanations above the table.
- Use headings in order; do not skip levels for visual effect.
- Caption video and provide transcripts where the platform supports them.
- Write instructions that do not depend on a mouse.
- Test the core journey at a mobile width and with keyboard navigation before publish.

### Readability

These apply to the reader, every block and every canvas, in the light AND the dark theme.

- **Line length about 70 characters.** Keep body text to roughly 65 to 75 characters per line.
- **Body text 17 to 18px,** with a line height around 1.7. Smaller text is for captions, labels and hints only.
- **Contrast.** Body text at least 7:1 against its background. Small text (captions, labels, table headers) at least 4.5:1. Measure both themes.
- **Never fade paragraph text with opacity** (`opacity-90`, `text-foreground/85`). Paragraphs use the full text colour; the muted token is for captions, hints and subtitles. Faded text fails on cheap screens and in sunlight.

## Final check

Before a chapter leaves the writer:

- Does the opening name a concrete problem?
- Is the outcome observable?
- Is there a decision, not just a definition?
- Is the example specific to this product?
- Is there at least one failure mode or near-miss?
- Does the build have acceptance criteria?
- Does the verify step include a failure test?
- Is every interaction earning its place?
- Is any sentence generic enough to appear in another course?
- Could a learner explain this chapter to a colleague after finishing it?

If the answer to the last question is no, the chapter is not done.
