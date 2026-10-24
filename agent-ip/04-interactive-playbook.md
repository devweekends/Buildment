# Interactive Playbook

This document is the catalog of what the platform can actually render, where each element belongs, where it does not, and how much of it a chapter can carry.

## Platform truth comes first

The code is the source of truth. Before authoring, the interaction designer must check:

- `server/src/shared/blocks/definitions.ts` — registered block types and their behavior.
- The block schema in `server/src/shared/blocks/<type>/schema.ts` — exact fields and defaults.
- `server/src/shared/mdx/component-allowlist.ts` — uppercase JSX tags a chapter may use.
- `frontend/src/mdx/components.tsx` — the runtime component map.
- The importer at `server/scripts/import-course.ts` — which YAML fences become blocks.

If this document conflicts with the code, the code wins and this document is updated in the same change.

Known gaps that agents must not paper over:

- `TEST` exists in the database enum but has no implementation. Do not author `<Test>`.
- `MustRead` does not support `minSeconds`, `requireNote`, or a `<Checkpoint>` child. Use the actual fields.
- `CodeExercise` supports JavaScript only. Do not promise Python, TypeScript, or a browser sandbox that is not implemented.
- `BigWordAlert` is a static card. `GlossaryTerm` is the inline click-to-reveal element. AI expansion of a term is a proposed platform feature, not a current capability.
- `Checklist` and `LearningLog` are components, not graded block types. They persist to the learner's account but do not gate progress by themselves.
- `InteractiveCanvas` exists, but only for registered slugs (`server/src/shared/canvas/slugs.ts`). A new canvas is a code change: data and a spec for a reusable renderer (sequence, state machine, factor), or a reviewed custom React component when the teaching model needs different controls or visuals. See `10-interactive-canvases.md`.
- There is no generic inline SVG component for authors. Static SVG can go through `VisualDiagram` as an image URL; interactive SVG comes only through a registered canvas. Never put raw author SVG in MDX.

## The interaction question

Before adding any interaction, answer three questions:

1. **What does it prove?** Name the understanding or artifact the learner produces.
2. **Could the build prove it better?** If the learner already demonstrates the same thing by shipping the feature, the interaction is redundant.
3. **What does it cost?** Attention, time, and the risk of breaking flow. If the cost is higher than the evidence, cut it.

An interaction that cannot answer question one is decoration.

## Prose first, components second

A Learn chapter is a sequence of beats: a visual first, then at most 70 words that explain it, then an optional `GoDeeper` fold (`03-authoring-standards.md` → Visual-first Learn chapters). A chapter that is mostly cards, quizzes, and callouts is a template, not a lesson; so is a chapter that is mostly paragraphs. In a beat, the learner should understand the idea from the picture plus its few words, and find the full mechanism in the fold.

The budget:

| Item | Per chapter | Per module |
|---|---|---|
| Beats (Learn) | 4 to 8, one visual each | |
| Visible words (Learn) | 300 to 700; at most 70 per beat | |
| Words including `GoDeeper` folds (Learn) | at least 900 | |
| Prose words (Build) | at least 1,200 | |
| Prose words (checkpoint/gate) | at least 700 | |
| Top-level components (Build, Check, Gate) | at most 6 | |
| Total JSX tags | at most 40 (Learn), 25 (others) | |
| Assessment interactions | ≤ 3 | — |
| `LearningObjectives` | only at module start | 1 |
| `BigWordAlert` | ≤ 1, only for a load-bearing term | as needed |
| `ChapterRecap` | only at a gate | 1 |
| `OpenQuestion` | only at a gate/defense | ≤ 1 |
| Visuals (canvas or diagram) | one per beat (Learn); at most 1 (others) | at least 1 |

No component-only section. If a component can be removed without reducing understanding, remove it. Run `node agent-ip/scripts/audit-course.mjs courses/<course-slug>` before review; a chapter that fails the audit is not ready.

## Assessment blocks

Assessment blocks create a `Response` and count toward chapter completion. Use them when the learner must commit to an answer.

| Block | Behavior | What it proves | Best use | Avoid |
|---|---|---|---|---|
| `QUIZ` | Auto-graded, completion | Recall or application of a concept | Concept checks, scenario decisions, misconceptions | Trivia; questions answered by the paragraph above |
| `PREDICT` | Auto-graded, completion | A committed prediction before an explanation | Binary or small-option decisions before a reveal | Obvious answers; generic prompts reused across chapters |
| `OPEN_QUESTION` | Human-reviewed, completion on submission | Explanation, judgment, architecture defense | Rubric-based reasoning, design defense, postmortem | "What was your takeaway?"; generic reflection |
| `CODE` | Auto-graded, completion | Working code against tests | Small, focused implementation or completion drills | Full features; syntax drills; hidden multi-step requirements |
| `MUST_READ` | Completion on confirmation | The learner read a required source | Primary documentation or article needed for the next build | Busywork; paywalled or unstable links |

### Option-length hygiene

Option length is never evidence of correctness. The most common test-wiseness leak in generated courses is "the longest option is the right one": the correct answer is written as a full explanation while every distractor is a short label, so a learner can pass without understanding the concept.

Apply this rule to every option-based check: `QUIZ` MCQ, `PREDICT`, and any knowledge-check question embedded in a lesson.

- **Do not make the correct option the longest.** If the correct answer needs more words to be precise, shorten it or write the distractors at a comparable level of specificity.
- **Balance all options.** Keep the spread small: the correct option should not be more than about 10% longer than the longest distractor. If one option is a full sentence, every option is a full sentence. If one is a short label, every option is a short label.
- **Do not pad distractors with filler** just to match a long correct answer. Rewrite the question and all options at the same level of detail.
- **Vary the position.** Do not put the correct answer first, last, or in the same slot in every question.
- **Audit the set, not only the question.** If the correct option is the longest in half or more of a quiz or prediction set, rewrite the set even when each individual question is close. Repeating "longest = correct" teaches the learner a shortcut, not the concept.
- **Never treat length as a grading rule.** Do not write an instruction that says to choose the longest option, and do not generate or accept an answer key that way.

### `QUIZ`

MCQ is the default. It is fast, auto-graded, and useful for checking a decision before the learner builds on it.

Authoring fence:

````md
```quiz
type: mcq
question: "A buyer holds the last seat for 10 minutes. A second buyer tries to buy it at minute 4. What should the API return?"
options:
  - "201 Created, a second ticket"
  - "409 Conflict, the hold stands"
  - "200 OK, overwrite the hold"
  - "500 Internal Server Error"
correct: 1
```
````

Rules:

- Test application, not recall. Put the learner in a scenario with a decision.
- Every distractor must be plausible to someone who half-understands the idea.
- Do not use "all of the above", joke options, or options whose length or grammar gives the answer away. See **Option-length hygiene** above.
- Do not write the correct option as the only full sentence while distractors are short labels.
- Give an explanation for every option, right or wrong. The MCQ fence takes `explanations:` (one string per option, in option order) and an optional overall `explanation:`; the learner sees them after answering. `content:audit` fails a course with a `course.yaml` when an MCQ lacks one reason per option. The importer puts each reason on its own line, one option per line, so write each reason to stand alone; never one paragraph that names the right answer mid-sentence.
- Keep the right option from standing out: similar lengths, varied positions. `content:audit` warns per question when the correct option is at least 10% longer than the longest wrong one. It also warns per file when the correct option is the longest in half or more of the set, once the file has 3 or more quiz questions or 2 or more predictions.
- **Opinion goes to an open question.** If an expert could reasonably pick a different option, the question is a judgment, not a fact. Use `openquestion`, not a graded quiz.
- **Re-answer every key blind** before it ships (`05-assessment-and-motivation.md` → Answer-key check).
- Three to five questions per quiz chapter. One quiz per concept cluster, not one per section.
- **A quiz chapter holds activities only.** `content:validate:source` rejects lesson text, headings, recaps, checklists, learning logs and visual blocks there. Put instructions in the activity prompt and move teaching to a lesson.
- **Title a quiz chapter by its topic, without a "Quiz:" prefix.** The reader adds "Quiz:" itself; a prefixed title shows "Quiz: Quiz: ...".
- The `short` type in the `quiz` fence becomes an `OPEN_QUESTION` block, not a quiz. Use it only when the answer deserves human review.

### `PREDICT`

Use Predict immediately before a decision or explanation, when the learner has enough context to make a real guess.

Authoring fence:

````md
```predict
prompt: "The API returns 201 before the confirmation email is sent. What is the most likely reason?"
options:
  - id: async
    label: "Email delivery is queued for a worker"
  - id: bug
    label: "The email send call was never added"
correctOptionId: async
explanation: "The handler returns as soon as the order is committed; the worker owns delivery and retries."
allowRetry: true
```
````

Rules:

- Exactly two or three options. The platform schema requires at least two.
- One option must be defensible; the others must be plausible.
- Option labels follow the same length rules as quiz options: the defensible option must not be the longest by default. See **Option-length hygiene** above.
- The prompt must be specific to the current decision. Do not reuse a generic prompt.
- Use it at most once per chapter. More than that turns prediction into a gimmick.
- Do not use Predict for factual recall. Use Quiz.

### `OPEN_QUESTION`

Use when the answer requires judgment, explanation, or evidence that cannot be auto-graded.

Authoring fence:

````md
```openquestion
prompt: "You need to prevent two buyers from holding the same seat. Describe the invariant, the database mechanism, and the failure mode if the mechanism is missing. Name the trade-off you accepted."
minWords: 120
submissionMode: text
allowSpeechInput: true
modelAnswer: "The invariant is that an active hold for a seat is unique. A unique partial index on (seat_id) where released_at is null, or a row-level lock during hold creation, enforces it. Without it, two requests read the same available state and both insert, producing overselling. The trade-off is write contention on popular seats; a short-lived lock is acceptable at this scale."
```
````

Rules:

- Only when the answer is worth a mentor's review. Never use it as a generic reflection.
- Give a rubric in the block config when authoring in-app. The rubric is server-only and never reaches the learner.
- The model answer is a reference, not the only acceptable answer. Write it to show the shape of a strong response.
- Use the right submission mode: `text`, `url`, `url_required`, `article`, or `video_demo`.
- Do not require a URL for an answer that is fundamentally prose.
- Keep `minWords` honest. A 40-word minimum for a 120-word question teaches the learner to pad.
- **Link-only answers need `minWords: 0`.** When a learner may answer with only a link to a recorded video or audio explanation, set `minWords: 0`. With any other value a link-only answer stays a draft and never reaches the mentor.
- **Plan the mentor's follow-up.** A mentor-reviewed answer includes a step where the learner answers the mentor's follow-up questions. Today the mentor marks the response `NEEDS_REVISION` with one to three questions in the feedback, and the learner answers by resubmitting. Count that time in the chapter estimate.

### `CODE`

Use for a small, testable implementation that isolates one skill.

Authoring fence:

````md
```codeexercise
prompt: "Implement `holdSeat` so it returns the existing hold when one is active, and creates a new hold otherwise. Do not modify the seat row."
starterCode: |
  export async function holdSeat(db, seatId, buyerId) {
    // your code here
  }
tests:
  - name: "returns the active hold"
    code: |
      const existing = await holdSeat(db, "seat-1", "buyer-2");
      assert.equal(existing.buyerId, "buyer-1");
  - name: "creates a hold when none is active"
    code: |
      const created = await holdSeat(db, "seat-2", "buyer-1");
      assert.equal(created.buyerId, "buyer-1");
hints:
  - "Query the active hold first; the unique index is the backstop, not the first check."
  - "Return the same shape in both branches so the caller does not branch."
solution: |
  // reference implementation, server-only
mode: implement
language: javascript
```
````

Rules:

- One skill per exercise. If it needs three concepts, split it.
- Tests define done. At least one test must cover the failure mode, not only the happy path.
- Hints reveal the next decision, not the implementation.
- The solution is server-only and revealed after a pass. Do not put it in prose.
- Do not use CodeExercise for a full feature. Use the build task and the learner's own tests.
- Do not promise a language the platform does not support.

### `MUST_READ`

Use for a primary source the learner must actually read before the next build. It is a gate, not a suggestion.

Authoring syntax:

```mdx
<MustRead
  title="Introduction to client-side JavaScript frameworks"
  url="https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Frameworks_libraries/Introduction"
  source="MDN"
  description="Short primer on why frameworks like React exist and what problems they solve."
  readMinutes={12}
/>
```

Rules:

- One mandatory read per module, two at most. More than that turns the course into a reading list.
- The source must be stable, public, and directly relevant to the next build.
- State why the learner is reading it and what they should be able to answer afterwards.
- Do not use a mandatory read to compensate for a weak chapter. Teach the concept; use the read for depth or authority.
- Do not use a paywalled source.

## Presentation blocks

Presentation blocks do not create responses and do not count toward completion. They exist to orient, visualise, or recap.

| Block | What it is for | Use when | Do not use when |
|---|---|---|---|
| `LearningObjectives` | The chapter or module outcomes | Start of a module or a major chapter | Every chapter; the outcome is already one sentence |
| `ProjectPreview` | The demo target and feature list | Course intro and module intros | Mid-build chapters |
| `Roadmap` | Milestones and current position | Course intro, week start, capstone | Every chapter |
| `Steps` | A numbered procedure | A build sequence with order-dependent steps | A list of unrelated tips |
| `ChapterRecap` | Three to six durable points | End of a chapter | The start; a second summary of the same points |
| `VideoBlock` | A video with optional transcript | A demo or a concept that benefits from motion | Replacing prose that could be read faster |
| `VisualWalkthrough` | A sequence of annotated images | UI states or a flow that changes on screen | A static diagram would do |
| `VisualDiagram` | An image-based diagram | A concept map or whiteboard sketch | A live Mermaid diagram is possible |

### `LearningObjectives`

```mdx
<LearningObjectives
  objectives={[
    "Model seat inventory so a seat cannot be sold twice.",
    "Explain why a hold needs an expiry.",
    "Verify the concurrency behaviour under two simultaneous buyers."
  ]}
/>
```

### `ProjectPreview`

```mdx
<ProjectPreview
  title="Ticketline"
  description="A production-grade ticketing platform for small venues."
  features={["Organizer dashboard", "Seat holds", "Stripe test checkout", "QR check-in"]}
  techStack={["Next.js", "Express", "PostgreSQL", "Redis", "Stripe"]}
/>
```

### `Roadmap`

```mdx
<Roadmap
  title="Your four-week build"
  milestones={[
    { id: "foundation", title: "Foundation", description: "Deploy a thin slice with auth and a database.", state: "current" },
    { id: "core", title: "Core loop", description: "List events, hold seats, check out.", state: "upcoming" },
    { id: "hardening", title: "Hardening", description: "Concurrency, tests, rate limits, observability.", state: "upcoming" },
    { id: "defense", title: "Defense", description: "Demo, architecture walkthrough, viva.", state: "goal" }
  ]}
/>
```

### `Steps`

```mdx
<Steps title="Create the first hold">
  <Step title="Validate the request" stepNumber={1}>
    Reject a missing event, seat, or buyer before touching the database.
  </Step>
  <Step title="Open a transaction" stepNumber={2}>
    Lock the seat row, then check for an active hold.
  </Step>
  <Step title="Insert or return" stepNumber={3}>
    Insert a hold with an expiry, or return the existing hold.
  </Step>
</Steps>
```

### `ChapterRecap`

```mdx
<ChapterRecap
  points={[
    "A hold is a time-bounded claim on a seat, not a sale.",
    "The unique constraint is the invariant; the pre-check is only an optimisation.",
    "Expiry is part of the data model, not a background afterthought."
  ]}
/>
```

## Prose components

These are not blocks. They are MDX components that render inside the chapter.

| Component | Use for | Rules |
|---|---|---|
| `Callout` | Warning, tip, note, success | One or two per chapter; tie it to the current step |
| `GlossaryTerm` | Inline clickable term | Use for the first use of a term the learner may not know; do not wrap every noun |
| `BigWordAlert` | One central concept card | At most one per chapter; not in quiz or gate chapters |
| `InterestingRead` | Optional further reading | One per module; state why it is interesting and how long it takes |
| `RealWorldEvent` | Sourced industry event | One per module at most; never repeat the same event across chapters |
| `FaqGroup` / `FaqItem` | Misconceptions and edge cases | Use for real questions; do not hide a second lecture |
| `CheckpointIntro` | Setup for a checkpoint | One or two sentences; not a motivational poster |
| `ComparePanel` / `CompareColumn` | A two-way comparison | Use for a genuine trade-off; do not force every idea into two columns |
| `FileTree` / `FileTreeItem` | Repository shape | Show only the files that matter; mark new or highlighted files |
| `TerminalBlock` / `TerminalLine` | Commands and output | Show the expected output; do not paste a wall of logs |
| `DiffBlock` | Before/after code | Use for a refactor or a bug fix; keep the diff small |
| `ArchitectureDiagram` / `ArchNode` | Layered system view | One idea per diagram; label the boundary |
| `TraceRequest` / `TraceStep` | Request lifecycle | Use for auth, middleware, or an async flow |
| `ApiRequestPanel` / `ApiRequest` | API contract lab | Show request and response; keep the body small |
| `MermaidDiagram` / `StateMachine` / `EntityDiagram` | Live diagrams | Prefer these over screenshots; alt text or a legend is mandatory |
| `Checklist` | Self-verification | Honor system; do not imply it gates progress |
| `LearningLog` | Private reflection | Use for retrieval and metacognition; not graded |
| `MandatoryReadCard` | Internal rendering of `MustRead` | Do not author directly unless you are building the block |

### `GlossaryTerm` versus `BigWordAlert`

The learner asked for bolded terms that reveal detail on click. The platform already supports this in two forms:

- `GlossaryTerm` is inline, clickable, and shows a short definition in a tooltip. It is the right tool for a term inside a sentence.
- `BigWordAlert` is a card with a term, a plain-English definition, and a "why it matters here" note. It is the right tool for the one concept a chapter is built around.

Authoring rule:

- Use `GlossaryTerm` for the first use of a term the learner may not know, inside prose.
- Use `BigWordAlert` once per chapter for the chapter's central concept.
- Never use both for the same term in the same chapter.
- Do not use `BigWordAlert` in quiz or gate chapters; the importer strips optional enrichment there.

### AI expansion for Big Word Alerts

The current components are static. The proposed enhancement is a "Explain more" action that calls a small model with the authored definition and chapter context. If the platform ships it, the contract is:

- The authored definition is the ground truth. The model may expand it; it may not contradict it.
- The model receives the term, the authored definition, the chapter title, and the surrounding paragraph. It does not receive learner PII.
- The response is cached per term and chapter.
- If the model is unavailable or the response fails validation, the static definition remains.
- The model may not introduce a new factual claim that is not in the authored definition or a cited source.
- The learner can always read the static definition without the model.
- The action is optional, not a gate.

Until that ships, author `GlossaryTerm` and `BigWordAlert` with complete static definitions. Do not write copy that assumes an AI expansion exists.

## Learning maps and study aids

These help a learner see where they are and review what they learned. They do not prove understanding on their own, so pair each one with a check.

| Aid | What it is for | Platform today |
|---|---|---|
| **Roadmap** (roadmap.sh style) | Show the course or module as a path of milestones, with the current one marked | `Roadmap` block (` ```roadmap ` fence) for a linear path. A branching skill map with optional and required nodes is a platform gap |
| **Mind map** | Show how a module's ideas connect, at the start (preview) or the gate (review) | Works now as a ` ```mermaid ` fence with a `mindmap` diagram (the reader ships Mermaid 11). Keep it to one level of children per branch so it fits a phone |
| **Study guide** (NotebookLM style) | A short summary, key terms and five review questions per module | Write it as a normal chapter or a gate section. An AI-generated guide is a platform proposal, under the same contract as the Big Word Alert expansion: authored text is ground truth |
| **Audio overview** (NotebookLM style) | A short spoken summary for review away from the screen | Platform proposal. Must be optional, small (audio only, under 5 MB), with a transcript, because many learners are on weak connections |

Rules:

- One map per module at most. A map that repeats the table of contents is decoration.
- Place a mind map at the module's set-the-scene (to preview) or its gate (to review), not mid-chapter.
- Every study aid has a text version. Never make audio or video the only way to review.

## Custom interactive canvases

A canvas is a small simulator or visualiser for one causal model: a token bucket, a seat-hold race, a cloud cost comparison, a queue under backpressure. It is not a block type and it does not create a response by default. It is a registered component that the interaction designer specifies and the canvas builder implements.

Courses are interactive-first (IP v0.4): every Learn chapter teaches through at least one element the learner manipulates or steps through and sees change. Use a model-backed canvas when the learner needs to manipulate inputs and see a relationship change; use a step-through or an existing interactive diagram when the claim is about order or structure. Build canvases on the reusable renderers and the shared simulation core wherever possible. The full design language, model contract, simulation core, platform integration, catalog, and QA are in `10-interactive-canvases.md`.

For HLD and system-design chapters, first draw the topology with `MermaidDiagram`. If the teaching claim is about what changes under load, failure, retries, cache expiry, or a routing decision, specify a model-backed canvas as a separate artifact. Record the decision in the interaction map even when Mermaid alone is sufficient. A new canvas requires an implemented, registered slug; do not insert a placeholder in MDX.

Canvases may be rendered with HTML/CSS, inline SVG, or Canvas 2D. Use HTML for controls and text, inline SVG for vector visuals (charts, seat maps, token buckets, timelines, state machines), and Canvas 2D only for very high element counts. Do not build form controls out of SVG shapes. See `10-interactive-canvases.md` → Rendering.

Placement:

- Required in every beat of a **Learn** (concept) chapter: the beat opens with its visual (a canvas, or a diagram when the relationship is fixed).
- Never in a quiz or gate chapter.
- One visual per beat, so a Learn chapter has four to eight. Build, Check and Gate chapters have at most one. No per-module cap.
- A canvas counts as a high-effort interaction. Do not put it back to back with an `OpenQuestion` or a `CodeExercise`.
- Pair it with a prediction before and a short check after. Do not count slider use as completion.

Platform status: `<InteractiveCanvas slug="..." />` is allowlisted, and publishing rejects any slug that is not registered. Do not invent a slug in a chapter: the canvas must be built and registered first. Mentors can preview every registered canvas at `/workspace/canvases`.

## Diagram plan

Every module needs at least one diagram; every concept-heavy chapter needs one where a relationship, flow, or state is central. Choose the format before writing:

- HLD topology or component/request graph → `MermaidDiagram` first; use a static SVG only if Mermaid cannot keep the connections legible;
- precise annotated illustration → Excalidraw-style static SVG;
- state machine → `StateMachine` or `MermaidDiagram`;
- request lifecycle → `TraceRequest`;
- layered boundary → `ArchitectureDiagram`;
- entity relationships → `EntityDiagram`.

In HLD-heavy modules, the diagram plan must name public/private boundaries, important edge meanings or protocols, and the behavior that would require a canvas. See `11-visual-explanations.md` → System design and HLD.

Introduce the diagram in prose, explain what to notice, and state the takeaway. Do not create a diagram-only section. See `11-visual-explanations.md`.

## Placement matrix

| Chapter archetype | Required | Optional | Never |
|---|---|---|---|
| Orientation | `ProjectPreview`, `Roadmap`, `LearningObjectives` | `Callout`, `BigWordAlert` | `Quiz` spam, `OpenQuestion` |
| Concept (Learn, beats) | Four to eight beats, each a visual first, then at most 70 words, then an optional `GoDeeper` fold; a `Predict` before the key beat; one or two quick-check quiz questions at the end | `ComparePanel`, `GlossaryTerm`, code inside `GoDeeper` | Long prose sections; `BigWordAlert`; `CodeExercise` for a concept the learner has not built; a visual that only decorates |
| Build | `Steps`, code fence, `FileTree` or `TerminalBlock` | `Callout`, `DiffBlock`, `ApiRequestPanel`, `TraceRequest` | `OpenQuestion` mid-build |
| Verify | Acceptance criteria, one failure test | `Checklist`, `TraceRequest`, `DiffBlock` | New conceptual content |
| Quiz | Three to five `quiz` fences | `openquestion`, `predict` or `codeexercise` fences | Lesson text, headings, `ChapterRecap`, `Checklist`, `InterestingRead`, `RealWorldEvent`, `BigWordAlert` |
| Gate | `Checklist`, `LearningLog`, `ChapterRecap` | A short bridge to the next module | New content, optional enrichment |
| Closing | `ChapterRecap`, `OpenQuestion` defense | `LearningLog`, `RealWorldEvent` | New build work |

## Density budgets

Per chapter:

- At most one `BigWordAlert`, and only for a load-bearing term.
- Learn chapters: one visual per beat. Other chapters: at most one diagram of any kind.
- At most two `Callout`s.
- At most one `Predict`.
- At most one quiz at a checkpoint or decision point. A quiz chapter may have three to five questions; a normal chapter should not have a quiz after every section.
- At most one `OpenQuestion`, and only at a module gate or architecture defense.
- At most one `CodeExercise`, and only when the build does not already prove the skill.
- Learn chapters: one visual per beat, four to eight beats. Other chapters: at most one canvas. A canvas counts as a high-effort interaction, but beat visuals are the lesson itself, so two beats in a row are fine; never put a canvas back to back with an `OpenQuestion` or `CodeExercise`.
- At most one `InterestingRead`.
- At most one `RealWorldEvent`.
- At most three assessment interactions total (quiz + predict + open question). A dedicated quiz chapter may contain three to five quiz questions; treat that set as one assessment instrument for this budget, not as three to five separate interactions.
- Never two high-effort interactions back to back. Put a build or a prose bridge between them.

Per module:

- One or two `MustRead`s.
- One `InterestingRead`.
- One `RealWorldEvent`.
- One quiz chapter.
- One gate chapter.
- One capstone or milestone evidence point.
- No cap on interactive canvases; every Learn chapter has its own interactive element.

If a chapter needs more than the budget, it is probably two chapters. Split it.

## Decision tree

```
Does the learner need to commit to an answer?
├── Yes → Is the answer auto-gradable?
│         ├── Yes → Is it a prediction about what happens next?
│         │         ├── Yes → Predict
│         │         └── No  → Quiz
│         └── No  → OpenQuestion
└── No  → Does the learner need to manipulate a causal model?
          ├── Yes → Interactive canvas (see 10-interactive-canvases.md)
          └── No  → Does the learner need to implement something testable?
                    ├── Yes → CodeExercise (if isolated) or build task (if part of the product)
                    └── No  → Does the learner need to see a relationship?
                              ├── Yes → Diagram (Mermaid, Trace, Architecture, Compare)
                              └── No  → Prose. Do not add an interaction.
```

## Where not to place interactions

- **Do not put a quiz after every section.** It fragments the reading and trains the learner to skim for answers.
- **Do not put an OpenQuestion in a build chapter.** It interrupts flow and produces generic answers.
- **Do not put optional enrichment in a gate or quiz chapter.** The importer strips it; authors who rely on it create broken lessons.
- **Do not put a diagram next to a paragraph that already explains the same relationship.** Choose one.
- **Do not put a BigWordAlert on a term the learner has already used correctly.** It signals that the course is not paying attention.
- **Do not put a `MustRead` and a long `InterestingRead` in the same chapter.** The learner will read neither.
- **Do not put two `Predict`s in a row.** The second feels like a quiz.
- **Do not put a `CodeExercise` immediately after a full build task.** The learner has already proved the skill.
- **Do not put a canvas in a quiz or gate chapter.** The learner should be proving understanding, not exploring.
- **Do not put a canvas after a build task that already proves the same relationship.**
- **Do not put a canvas in a chapter just because the chapter feels text-heavy.** Write better prose or cut the chapter.
- **Do not embed raw author SVG in MDX.** Use a registered SVG component or a sanitized static asset. Raw SVG is a security risk and is outside the allowlist.

## Authoring syntax quick reference

| What you want | How to author |
|---|---|
| MCQ | ` ```quiz ` fence with `type: mcq`, `options`, `correct` |
| Human-reviewed short answer | ` ```quiz ` fence with `type: short`, `question`, `modelAnswer` |
| Longer open answer | ` ```openquestion ` fence |
| Prediction | ` ```predict ` fence |
| Code exercise | ` ```codeexercise ` fence |
| Video | ` ```video ` fence |
| Image walkthrough | ` ```walkthrough ` fence |
| Image diagram | ` ```diagram ` fence |
| Roadmap | ` ```roadmap ` fence |
| Must-read | `<MustRead ... />` JSX |
| Objectives | `<LearningObjectives objectives={[...]} />` |
| Recap | `<ChapterRecap points={[...]} />` |
| Project preview | `<ProjectPreview ... />` |
| Steps | `<Steps><Step ...>...</Step></Steps>` |
| Callout | `<Callout type="warning" title="...">...</Callout>` |
| Inline term | `<GlossaryTerm term="..." definition="..." />` |
| Concept card | `<BigWordAlert term="..." plainEnglish="..." whyItMatters="..." />` |
| Optional reading | `<InterestingRead title="..." hook="..." readMinutes={5}>...</InterestingRead>` |
| Industry event | `<RealWorldEvent title="..." when="..." summary="..." lesson="..." />` |
| Comparison | `<ComparePanel title="...">...</ComparePanel>` |
| Diagram | `<MermaidDiagram chart={...} title="..." />` |
| Request trace | `<TraceRequest title="...">...</TraceRequest>` |
| API lab | `<ApiRequestPanel title="...">...</ApiRequestPanel>` |
| Interactive canvas | `<InteractiveCanvas slug="weighted-matrix-two-offers" />`, registered slugs only |
| Inline SVG visual | A registered SVG component; never raw `<svg>` in MDX |

## Validation

Before a chapter is considered ready:

```bash
pnpm --dir server content:validate        # compiles every chapter's MDX
pnpm --dir server content:validate:source # validates source structure
pnpm --dir server typecheck               # if the course source lives in the repo
```

The chapter must compile, the block fences must parse, and the rendered page must load without console errors. A chapter that only looks right in the source is not validated.

## Accessibility

- Every diagram has alt text or a text legend.
- Every video has a transcript or captions.
- Every interaction is keyboard reachable.
- Colour is never the only signal.
- The chapter is readable at a mobile width.
- A `Callout` has a heading and a role; do not rely on colour alone.
- A `Checklist` item is verifiable in words, not only by clicking.
