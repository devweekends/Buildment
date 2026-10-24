# Interactive Canvases

An interactive canvas is a small, self-contained widget that makes a causal model visible. The learner changes an input, the model recomputes, and the output changes immediately. The point is not to entertain. The point is to let the learner feel a relationship they could not hold in their head from prose alone.

This document defines when to build one, what it must contain, how it is designed, how it is integrated, and how it is validated.

## Interactive-first

Since IP v0.4 (`proposals/2026-10-23-interactive-first.md`), interaction is the default way a concept is taught, not occasional enrichment. Learners understand a system faster when they can push it and watch it respond: raise the traffic and see the queue grow, cut the network and see two leaders, skew a clock and see the order of events flip.

- **Every Learn (concept) chapter teaches through at least one interactive element** the learner manipulates or steps through and sees change: a registered canvas, or an interactive diagram that already exists (`StateMachine`, `TraceRequest`, a step-through). A set-the-scene chapter may open with one. Quiz and gate chapters have none.
- **The teaching contract is mandatory for every one of them:** predict before playing, "what changed" in words after, and a transfer check (quiz, code exercise or build) later in the chapter or module. Using a slider never counts as completion.
- **Reuse before custom.** Plan a course's interactive elements on the reusable renderers and the shared simulation core (below), so most canvases are a `data.ts` and a `spec.md`. A custom component needs a written reason in its spec.
- **Interactive does not mean decorative.** Everything in "What a canvas is not" and "Anti-patterns" still applies, and "the chapter is stronger with it than without it" is still the acceptance test.

## What a canvas is

- A focused simulator or visualiser for **one** concept.
- Two to four primary inputs, each with a visible value and unit.
- A model that computes the output deterministically.
- A visual state the learner can read without a legend hunt.
- A short explanation of what changed and why.
- A stated limit: what the model ignores.

Examples from our design references:

- **Kubernetes cloud cost simulator.** Sliders for nodes, burst duration, bursts per month, pods per node, jobs per minute, egress file size, and cross-cloud API writes. Summary cards show the cheapest provider, lowest monthly cost, total jobs, and total egress. A stacked bar chart compares five providers, with compute, egress penalty, and API penalty shown separately. The learner can see which cost driver dominates and why the cheapest provider changes.
- **API rate limiter.** A token-bucket visual shows the current token count and fill percentage. Inputs set the limit and refill rate. A "Make Request" button consumes a token; the request history and bucket fill update. The learner sees the difference between a limit and a refill rate.

Both work because they are **simple, legible, and causal**. They are not decorated dashboards.

## What a canvas is not

- Not a game, a toy, or a reward.
- Not a replacement for prose. The prose explains the model; the canvas lets the learner explore it.
- Not a full application. If it needs authentication, persistence, or a database, it is a project, not a canvas.
- Not a place to hide the answer. A canvas may reveal a relationship; it may not hand over the capstone implementation.
- Not an excuse to use every color in the palette.

## When to use a canvas

Every Learn chapter needs an interactive element (see Interactive-first). These conditions decide whether that element is a model-backed canvas or a lighter step-through or interactive diagram. Use a canvas when all of the following are true:

1. The concept has a **causal model**: inputs change an output in a way the learner can reason about.
2. The relationship is hard to explain in prose alone, or a static diagram would hide the dynamics.
3. The learner benefits from **manipulating** the parameters, not just seeing the result.
4. The model is small enough to compute instantly in the browser.
5. The model can be made **honest**: assumptions and limitations can be stated.
6. There is a clear teaching claim the learner should be able to state afterwards.

Typical fits: rate limits, concurrency, capacity planning, queue backpressure, cache hit rate, retry/backoff, index selectivity, cost trade-offs, inventory holds, permission boundaries, consistency lag.

### System-design canvas decision

Teach the fixed HLD topology with `MermaidDiagram` first. Build a canvas only when the learner must change a condition and see a consequence the static graph cannot show. Good claims include how a failed backend changes routing and per-instance load, how arrivals exceeding service capacity grow a queue, or how cache TTL changes origin load and staleness. Pick one claim per canvas, with two to four bounded inputs and a deterministic output. State simplifying assumptions, such as constant request rate or independent server failures.

The interaction designer records one of two outcomes for every HLD-heavy module: a registered canvas slug and spec, or a sentence explaining why Mermaid and a worked trace teach the outcome. A required behavior-under-change outcome cannot be satisfied by a static topology alone. If no honest small model exists, use a documented trace or worked scenario and flag the gap; do not fake a simulation. A pan/zoom diagram without changing outcomes remains a diagram, not a canvas.

## When not to use a canvas

- The concept is a definition or a syntax rule.
- A single static diagram or a short table is enough.
- The model would be misleading without a real system, and the simplification would teach the wrong intuition.
- The canvas would take longer to build than the learning is worth.
- The interaction would reveal the capstone solution.
- The chapter already has a build task that proves the same relationship.
- The learner would only click sliders and watch colors change without making a prediction or explaining the result.

If a canvas is merely decorative, cut it and write better prose.

## The design language

The reference aesthetic is **calm, neutral, and legible**. Simple does not mean plain; it means every element has a job.

### Palette

- Neutral background and cards: the existing `card`, `muted`, `border`, and `foreground` tokens.
- One accent color for the primary action and the main series (usually blue).
- Semantic color only when it carries meaning: green for success/available, amber for warning/degraded, red for error/blocked.
- At most **four** data series in one chart. If you need more, split the chart or group the series.
- No gradients, neon, rainbow palettes, glassmorphism, or decorative shadows. A subtle border and a small shadow are enough.
- Do not use color alone to encode meaning. Pair it with a label, icon, or pattern.

### Typography and numbers

- Title: 16–20px semibold.
- Purpose sentence: 13–14px muted.
- Control labels: 12–13px medium.
- Values: tabular numbers, same unit as the label.
- Explanations: 13–14px with a comfortable line height.
- Avoid all-caps paragraphs. Use all-caps only for short eyebrow labels.

### Layout

A canvas has five regions, in this order:

1. **Title and one-sentence purpose.** What the widget shows and why it matters.
2. **Summary readout.** Two to four key numbers, each with a label and unit. This is the "so what" the learner sees first.
3. **Visualisation.** The chart, bucket, timeline, matrix, or map. One idea.
4. **Controls.** Sliders, steppers, toggles, or segmented controls. Each control has a label, value, and unit.
5. **Explanation and experiment.** What changed, what to try next, and what the model ignores.

On mobile, stack controls above the visualisation. Use full-width sliders and 44px touch targets. Do not require horizontal scrolling.

### Motion

- Motion is allowed when it is the model moving: a message travelling a link, a queue filling, a token draining, a clock drifting, a leader changing. Motion that is not the model (bouncing cards, confetti, parallax) is never allowed.
- A time-based model has Play, Pause, Step and Reset. Nothing plays until the learner presses Play, and any manual change pauses it.
- Keep transitions short: 150 to 250 ms. Animate transforms and opacity only.
- Respect `prefers-reduced-motion`: elements jump to their next state with no animation, and the step readout says in words what happened.

### Charts

- Direct-label the series where possible.
- Keep gridlines light and few.
- Label the axes and units.
- Use a legend only when direct labels are not possible.
- Show a tooltip or a readout on hover/focus, but do not require hover to understand the chart.
- Avoid 3D, pie charts with many slices, and dual axes unless the teaching claim requires them.

## Anatomy of a canvas

Every canvas includes:

- **Title.** A concrete name, not "Interactive Demo".
- **Purpose.** One sentence: "See how the hold expiry changes the overselling risk."
- **Summary cards.** Two to four numbers that answer the learner's first question.
- **Visualisation.** The model's state.
- **Controls.** Two to four primary inputs, with defaults that produce an interesting result.
- **Live readout.** The output changes as the input changes.
- **What changed.** A short sentence that explains the delta, not just the number.
- **Try this.** Two or three experiments with expected observations.
- **Limits of the model.** What is simplified, ignored, or assumed.
- **Reset.** Return to the default state in one click.

## Interaction patterns

Use the simplest control that fits the model.

| Pattern | Use for | Avoid when |
|---|---|---|
| Slider | Continuous numeric input with a meaningful range | The value is categorical or precise |
| Numeric input + stepper | Exact values, money, counts | The range is large and exploratory |
| Toggle | Binary state | The state has more than two meaningful values |
| Segmented control | Two to four discrete modes | There are many options |
| Select | Many discrete options | The learner needs to compare options side by side |
| Play / pause / step | Time-based models | The model is instantaneous |
| Preset scenarios | Common starting points | The presets hide the underlying variables |
| Reset | Always | Never |

Every control must have a visible label and value. Do not rely on a tooltip to explain a control.

## The model contract

A canvas is only as good as its model. The model must be:

- **Pure.** Given the same inputs, it returns the same output. No network, no randomness unless seeded and visible.
- **Small.** It runs in under a frame for the expected input range.
- **Bounded.** Every input has a min, max, step, and default. Handle zero and maximum values.
- **Unit-explicit.** Every input and output carries a unit. Do not mix seconds and minutes silently.
- **Documented.** The spec states the formula or rule, the assumptions, and the limitations.
- **Tested.** Unit tests cover the default, the minimum, the maximum, and at least one edge case.

If the real system is too complex to model honestly, do not fake it. Use a static diagram and explain the complexity instead.

## The build contract

- Data for a registered renderer, with its spec, plus the renderer's model and tests:

```
packages/learning-ui/src/canvas/
  registry.ts                 # slug -> spec, the closed set
  InteractiveCanvas.tsx       # the MDX tag; picks the renderer by spec.kind
  primitives/                 # stepper, step controls, tones, flow pulse, frame
  sim/                        # shared seeded simulation core (pure, no DOM)
  renderers/
    sequence/                 # lanes and numbered arrows (request flows)
    state-machine/            # states, transitions, refused requests
    factor/                   # flip a factor: weighted sum, model.ts
    timeline/                 # lanes over time: events, intervals, messages
  weighted-matrix-two-offers/
    data.ts                   # the spec the renderer draws
    spec.md                   # the canvas spec (08-templates.md, 14A)
frontend/tests/unit/canvas/   # model, stepper and registry tests
```

- Most canvases need only `data.ts` and `spec.md` for an existing renderer. A new kind of model can use a custom React component registered under its own slug, with a pure `model.ts` and tests. Extract a reusable renderer only when more than one canvas benefits from the same interaction pattern. This keeps the visual and control vocabulary open while the authored MDX remains safe.

- No network calls. Data is bundled or passed as safe props.
- No arbitrary JS in MDX. The learner-facing MDX references a registered canvas by slug.
- Charts use the shared library (shadcn/ui `Chart` on Recharts, `d3-scale` for axes; see "The reusable component library"). Do not add a second charting library, and do not hand-roll a chart the library already draws.
- No global state. The canvas owns its state.
- No secrets, private URLs, or hidden answer keys in the bundle.
- A static fallback: a short summary and, where useful, an image, so the chapter still teaches if the canvas fails.
- A preview route or story so reviewers can inspect it without importing a course.

### Reusable renderers

Pick the renderer by the claim, not by the look.

| Renderer | Use when the claim is about | Do not use for | On a phone |
|---|---|---|---|
| **Stepper** (`primitives/stepper.ts`) | Order: what happens first, next and last. It drives the sequence and state-machine renderers and any custom step-through | A model with numeric inputs | Back, Next, Play/Pause and Start over buttons and numbered step chips; arrow keys, Home and End when focused. Play starts only on a press, stops on the last step and pauses on any manual move |
| **Sequence** (`renderers/sequence/`) | A request or message moving between actors: browser, API, worker, payment provider | A lifecycle or a decision | A separate narrow layout below the `sm` breakpoint. Keep arrow labels under about 18 characters |
| **State machine** (`renderers/state-machine/`) | A lifecycle: the allowed transitions and the requests the machine refuses | A request path across services | The grid (at most 3 columns by 2 rows) turns on its side, so a left-to-right lifecycle reads top to bottom. Keep edge labels under about 14 characters; see the state machine layout rules below |
| **Factor** (`renderers/factor/`) | Flip a factor: change how much one criterion matters and see which option wins | A process over time | Controls sit above the bars; weight buttons are at least 44px tall |

State machine layout rules on a phone. The narrow layout draws columns as rows down the page and rows as columns 150px apart, inside a 340px picture.

- **Two rows at most.** A third row lands outside the picture, and the registry test fails.
- **Short labels across a row.** A move between two states in the same column becomes a short sideways arrow on a phone, with about 22px between the pills. Keep its label to three characters or fewer, such as "yes", "no" or "why".
- **No diagonal beside a parallel arrow.** In a square of four cells, the label of a diagonal arrow sits where the label of a vertical arrow sits. Use a short diagonal label, or change the layout. The registry test fails when two edge labels overlap.
- **Check at 375px in the reader.** Labels that touch without overlapping can still read as one phrase ("yes" beside "more time"). Rename one of them.

Rules for every renderer and custom canvas:

- **Theme tokens only.** Colours come from `primitives/tones.ts` (accent, good, warn, bad), which has a light and a dark class for each. No hex values in a spec. Good, warn and bad appear only when they mean success, warning or error, next to a text label.
- **Dark mode.** Check every canvas at `/workspace/canvases` in light and dark mode before review.
- **Focus ring.** Every control uses the shared `FOCUS_RING`. Never remove an outline.
- **Reduced motion.** Under `prefers-reduced-motion` the flow pulse on the active arrow is hidden and a still dot marks the arrow instead. New motion follows the same rule.
- **Phone.** Check at 375px wide: no horizontal scroll, labels readable, touch targets at least 44px.

Known exception to fix: `renderers/factor/FactorCanvas.tsx` does not use the shared `FOCUS_RING` or `TONES` yet. It uses `focus-visible:ring-ring` and raw `bg-blue-500`. Do not copy it; move it onto `FOCUS_RING` and `TONES` from `primitives/tones.ts`.

### The shared simulation core and the kit renderers

Systems that move over time and fail (traffic, queues, replicas, clocks, partitions) are taught on a shared, seeded simulation core, `packages/learning-ui/src/canvas/sim/`. It is pure TypeScript with no DOM code: a seeded random source, a virtual clock, nodes, links with delay, partitions, per-node clocks, traffic generators, and recorders that produce a trace and series. The same inputs and seed always give the same run, so a learner, a mentor and a test see the same thing. Renderers draw a run; they never compute the model.

Kit renderers built on the core (the first is `timeline`; the rest are specified in `work/system-design/03-simulation-kit.md` and are added as they are built):

| Renderer | Use when the claim is about | Do not use for | On a phone |
|---|---|---|---|
| **Timeline** (`renderers/timeline/`) | Events on several nodes or clients over time: clock values, uncertainty intervals, messages, replication lag, which read saw which write | A single request path (use sequence) or a lifecycle (use state machine) | Lanes stack, time runs left to right in a scrollable-free viewBox; the scrubber is a full-width slider; every event is listed in the readout |

### The reusable component library (reuse open source first)

Every course builds on the same small library. Before building anything, check this table; before adding a library, check its licence (MIT, ISC or Apache 2.0), its size, and that it can follow the theme tokens. We wrap open-source pieces; we do not rewrite what they already do well.

| Need | Use | Open source underneath | Status |
|---|---|---|---|
| Slider, switch, segmented control, reset, summary cards, "What changed" | `primitives/controls.tsx` | shadcn/ui `Slider`, `Switch`, `ToggleGroup` on Base UI (MIT) | Built |
| Panel, "Try this", limits | `primitives/canvas-frame.tsx` | the app's `LearnPanelShell` | Built |
| Step-through with Play, Pause, Back, Next, keyboard | `primitives/use-stepper.ts`, `step-controls.tsx`, `step-parts.tsx` | none (small, already shared) | Built |
| Seeded randomness, event queue, clocks, traces | `sim/` | none; about 200 lines, pure and tested | Built |
| Scales and tick marks for any axis | `d3-scale` | d3 (ISC) | Built, used by `timeline` |
| Lanes over time: clocks, lag, messages, windows | `renderers/timeline/` (`TimelineView`, `TimelinePlayer`) | `d3-scale` | Built |
| Request flows, lifecycles, weighted decisions | `renderers/sequence/`, `state-machine/`, `factor/` | none | Built |
| Line, bar and area charts over time (queue length, p99, cost) | shadcn/ui `Chart` | Recharts (MIT) | Planned with the `flow` renderer |
| Draggable node graphs: architecture sandbox and labs, cluster topologies | `renderers/sandbox/`, `renderers/cluster/` | React Flow, `@xyflow/react` (MIT) | Planned |
| Static topology and request-path diagrams | `MermaidDiagram` | Mermaid (MIT) | Built |
| Hand-drawn concept diagrams | Excalidraw-style SVG through `VisualDiagram` | Excalidraw (MIT) | Built |

Rules: import from the wrapper, not from the library directly, so the theme, focus ring, touch targets and units stay consistent. A new renderer that several courses can use goes into this table in the same change that adds it. A canvas that is only one course's idea stays in its own slug folder.

A canvas built on the core keeps its model in its own `model.ts` (the domain rules, using the core's primitives) with unit tests, and its `data.ts` only names presets, labels and copy. The same core is vendored into a course's challenge repository when learners run their own code on it.

## Rendering: SVG, HTML, or Canvas

SVG is a first-class rendering option for canvases and diagrams. It is not a separate interaction model. The model contract, teaching contract, and QA still apply.

### Decision table

| Rendering | Use for | Avoid |
|---|---|---|
| **HTML/CSS** | Controls, layout, text, buttons, sliders, cards, tables | Crisp vector geometry that must scale without raster blur |
| **Inline SVG** | Charts, plots, seat maps, timelines, state machines, token buckets, architecture, geometry, annotations | Form controls, long text layout, thousands of nodes |
| **Canvas 2D** | Very high element counts, pixel effects, performance-critical animation | Accessible interactive elements, selectable text, crisp labels |
| **WebGL** | 3D or heavy GPU work | Out of scope for course canvases |

The default is **HTML/CSS for controls and text, inline SVG for the visualisation**. Do not build sliders, toggles, or buttons out of SVG shapes. Use an HTML `<input type="range">` for a slider and an SVG chart for the output. This keeps the controls accessible and the visualisation crisp.

### When SVG is the right choice

- The visual has geometry: bars, lines, paths, seats, zones, nodes, edges, buckets, timelines.
- It must scale cleanly from mobile to desktop.
- The learner interacts with shapes: selecting a seat, hovering a bar, dragging a handle, stepping through a state machine.
- The visual must match the light and dark themes without a second asset.
- The visual is a diagram with a small number of elements, not a dense data plot with thousands of points.

### SVG rules

1. **Component, not raw string.** Write a React component that returns `<svg>`. Do not inject author-supplied SVG with `dangerouslySetInnerHTML`. Do not allow raw `<svg>` in MDX; the reader should reach it through the canvas registry or a registered SVG component.
2. **Responsive by viewBox.** Use `viewBox` and `preserveAspectRatio`; set width to `100%` and a sensible max width. Do not hard-code a fixed pixel width that breaks on mobile.
3. **Theme with tokens.** Use `currentColor` and CSS variables for surfaces, strokes, text, and semantic colors. No hard-coded brand hex values. Test light and dark mode.
4. **Crisp strokes.** Use `vector-effect="non-scaling-stroke"` where a stroke must stay consistent at different sizes.
5. **Label directly.** Put units and values on the chart, not only in a tooltip. Do not require hover to understand.
6. **Limit complexity.** Keep the node count modest (roughly under 1,000 elements). Split the visual if it grows. Avoid filters, blurs, masks, and large clip paths unless they are essential; they cost performance and can render inconsistently.
7. **Animate with CSS.** Use CSS transitions for state changes. Respect `prefers-reduced-motion`. Do not use SMIL or autoplay unless the motion is the teaching point.
8. **No remote assets.** No external `<image href>`, fonts, or scripts inside the SVG. Bundle what you need or use system fonts.
9. **No scripts or foreign content.** No `<script>`, `<foreignObject>`, raw inline event attributes (`onclick=`), or `javascript:` URLs. React event handlers on components are fine; raw string attributes are not. These are both a security and an accessibility problem.
10. **Sanitize static assets.** If a static `.svg` file is unavoidable, run it through a strict sanitizer and an optimiser (for example SVGO), host it locally, and render it through a registered component. Do not use a remote SVG URL.

### Static SVG diagrams

A static SVG is a diagram, not an interaction. Use it when the relationship is fixed and the learner does not need to manipulate it.

- Provide `<title>` and `<desc>` inside the SVG, or alt text through the component that renders it.
- Use `role="img"` for a static graphic. If it contains meaningful text, repeat the key labels in the surrounding prose or a summary.
- Prefer the existing `VisualDiagram` block for image-based diagrams; use a registered inline SVG component only when the diagram must be theme-aware or scale with the layout.
- Do not use a screenshot when a clean SVG is possible. Do not use an SVG when a live Mermaid diagram is the better fit.

### Interactive SVG

An interactive SVG lets the learner select or manipulate shapes. Keep the interaction model simple.

- Use HTML controls for sliders, toggles, and buttons. Use SVG for the visual state.
- Make interactive shapes focusable: `tabIndex={0}`, `role="button"` or `role="option"`, an accessible name, and Enter/Space activation.
- Show a visible focus ring. Do not rely on hover.
- Use `aria-pressed` or `aria-selected` where the shape has a state.
- Provide a text summary of the current state for screen readers, either off-screen or in a live region.
- Do not make a shape interactive unless it has a clear action. A decorative shape should not be focusable.
- For seat maps, support arrow-key navigation between adjacent seats and a clearly announced seat label and status.
- For charts, provide a table or text summary as an alternative. Hover tooltips are an enhancement, not the only way to read the data.

Example structure:

```tsx
<svg viewBox="0 0 640 240" role="img" aria-labelledby="chart-title chart-desc">
  <title id="chart-title">Monthly cost by provider</title>
  <desc id="chart-desc">Hetzner is cheapest at $2,332; AWS Spot is highest at $8,900.</desc>
  {/* bars, axes, labels */}
</svg>
```

```tsx
<g
  role="button"
  tabIndex={0}
  aria-label="Seat A12, available, $45"
  aria-pressed={selected}
  onClick={() => selectSeat("A12")}
  onKeyDown={(event) => {
    if (event.key === "Enter" || event.key === " ") selectSeat("A12");
  }}
>
  <rect x={120} y={80} width={28} height={28} rx={6} />
</g>
```

### SVG security

SVG is executable content in a browser context. Treat author-supplied SVG as untrusted.

- Never render raw author SVG with `dangerouslySetInnerHTML` without a strict allowlist sanitizer.
- Remove `<script>`, `<foreignObject>`, raw inline event handler attributes, `javascript:` URLs, external `href`/`xlink:href`, and `style` values containing `url()`. React event handlers on a trusted component are fine; raw string attributes are not.
- Do not allow remote fonts or images inside SVG.
- Prefer React SVG components, where the element tree is code-reviewed and no string injection is involved.
- If the platform accepts uploaded SVG assets, scan and sanitize them at upload time as well as at render time.

### SVG performance

- Prefer one SVG with a small number of paths over hundreds of individual nodes.
- Memoize derived paths and scales.
- Avoid animating layout attributes; animate transforms and opacity.
- Test on a mid-range phone, not only a desktop.
- If the element count grows beyond a few thousand, consider Canvas 2D for the visual and keep the labels and controls in HTML.

### SVG testing

- Visual regression in light and dark mode.
- Mobile width and zoom.
- Keyboard-only navigation for interactive shapes.
- Screen-reader announcement of the title, description, and current state.
- Sanitizer test if any SVG string is accepted.
- No console errors and no layout shift.

## Platform integration

The platform has a canvas slot. This is the contract, and where each part lives:

1. `InteractiveCanvas` is in the MDX allowlist (`server/src/shared/mdx/component-allowlist.ts`) and both reader component maps (`frontend/src/mdx/components.tsx` and `desktop/src/ui/learning/blocks/registry.tsx`).
2. The allowed slugs are listed once, in `server/src/shared/canvas/slugs.ts` (copied to `frontend/src/shared/canvas/slugs.ts` and `packages/learning-ui/src/shared/canvas/slugs.ts` by `pnpm --dir server sync-shared`; never edit these generated copies). `packages/learning-ui/src/canvas/registry.ts` maps each slug to its spec, and a test keeps the two lists equal.
3. The MDX tag is `<InteractiveCanvas slug="weighted-matrix-two-offers" />`, self-closing, with a plain string slug. The component looks up the slug and renders the registered canvas. An unknown slug renders a quiet note, not an error.
4. Publishing a chapter (and `pnpm content:validate:source`) rejects a missing, expression-valued or unregistered slug, and a canvas tag with children. No arbitrary component name from MDX.
5. The canvas is versioned by slug and spec. A breaking change gets a new slug; existing courses keep working.
6. The web reader renders the starting state on the server, so the canvas is readable before its script loads on a slow connection.
7. The canvas never receives learner PII or secrets.
8. Mentors can inspect every registered canvas at `/workspace/canvases`, in light and dark mode and at phone width, without importing a course.

To add a canvas: add its slug to `slugs.ts` and run `pnpm --dir server sync-shared`, add a folder with `data.ts` and `spec.md` under `packages/learning-ui/src/canvas/`, and add one line to the registry. The registry entry may use a reusable renderer or `kind: "custom"` with a reviewed component. Custom canvases still follow the same model, accessibility, teaching, and QA contracts.

This preserves the existing security model: MDX can only reach allowlisted components, and the canvas registry is a closed set.

If a canvas needs to record a learner's answer or count toward completion, it becomes a registered block type with a response schema, not a component. That is a separate decision and a separate review.

## The teaching contract

A canvas can create an illusion of understanding. The output moves, the learner feels smart, and nothing durable is learned. Prevent that with three moves:

1. **Predict before you touch.** Put a `Predict` or a one-sentence prompt before the canvas: "Before you move the slider, what do you think will happen to the total cost when egress doubles?"
2. **Explain the delta.** After a change, show "What changed" in words, not only a new number. The learner should be able to say why.
3. **Transfer after.** Follow the canvas with a short quiz, an open question, or a build task that applies the relationship in a new context. Do not count slider use as completion.

The canvas should teach one claim. Write the claim in the spec:

> "For bursty workloads, egress penalties can dominate compute, so the cheapest provider depends on the egress profile, not the CPU price."

If the learner cannot state the claim after using the canvas, the canvas failed.

## The copy blocks

Every canvas has four short pieces of copy. Keep them concrete.

### What this shows

One or two sentences. Name the model and the trade-off.

> This compares monthly cost across providers for a bursty workload. Compute, egress, and cross-cloud API calls are priced separately, so the cheapest provider can change when the workload shape changes.

### Try this

Two or three experiments with expected observations.

> Set egress file size to 1 MB and raise jobs per minute. Watch the egress penalty overtake compute on AWS Spot. Then switch to Hetzner and compare.

### What changed

A live sentence, not only a number.

> Doubling egress raised the monthly cost by 38%, but the cheapest provider stayed the same because compute still dominates this workload.

### Limits of the model

State the simplification.

> The model ignores storage, NAT gateways, load balancers, and discounts. It assumes a constant request rate within each burst. Use it to reason about the shape of the cost, not to price a real deployment.

## Canvas catalog

These are candidate canvases for the event ticketing general course and its variants. Build only the ones that serve a chapter's teaching claim.

| Canvas | Inputs | What it teaches | Suggested renderer | Course use |
|---|---|---|---|---|
| Seat hold race | concurrent buyers, hold duration, seat count | Overselling and the need for an atomic hold | HTML controls + SVG timeline/bars | General course, core loop |
| Queue at the gate | arrival rate, scan time, scanners | Throughput and queue growth | HTML controls + SVG line/area | General course, operations |
| Payment webhook state | event order, duplicate events, retry delay | Idempotency and state reconciliation | HTML controls + SVG state machine | General course, payments |
| Offline scan | network loss window, cached tickets | Replay and conflict handling | HTML controls + SVG timeline | General course, check-in |
| Capacity planner | expected attendance, no-show rate, gate throughput | How capacity and staffing interact | HTML controls + SVG bars | Festival, sports, conference |
| Timed-entry slot | slot capacity, arrival spread, dwell time | Slot utilisation and congestion | HTML controls + SVG heatmap/bars | Museum |
| Seat map allocator | section capacity, holds, accessibility seats | Inventory allocation and fairness | HTML controls + SVG seat map | Sports, cinema |
| Session capacity | room size, session popularity, add-ons | Session-level inventory | HTML controls + SVG bars | Conference |
| Waitlist promotion | class size, cancellations, notice period | Waitlist fairness and fill rate | HTML controls + SVG timeline | Workshops |
| Showtime grid | screens, films, showtimes, demand | Scheduling trade-offs | HTML controls + SVG grid | Cinema |
| Cache hit rate | TTL, request rate, invalidation | Staleness vs load | HTML controls + SVG line | Any variant with caching |
| Retry and backoff | failure rate, retry count, base delay | Why naive retries amplify load | HTML controls + SVG timeline | General course, async |
| Index selectivity | rows, selectivity, index choice | Why the planner chooses a scan or an index | HTML controls + SVG bars | Any variant with search |
| Permission matrix | role, resource, action | IDOR and object-level authorization | HTML table (not SVG) | General course, security |
| Cost simulator | compute, egress, API calls | Cloud cost trade-offs | HTML controls + SVG stacked bars | General course, deploy |
| Replica lag | write rate, replication delay, read rate | Read-your-writes and consistency | HTML controls + SVG line | Any variant with read replicas |
| Load balancer failover | healthy backends, request rate, per-backend capacity | How failures redistribute requests and cause overload or errors | HTML controls + SVG topology/readouts | HLD and availability chapters |
| Queue backpressure | arrival rate, workers, service time | Why backlog and wait time grow when arrival exceeds capacity | HTML controls + SVG queue/timeline | HLD and async-work chapters |

This table is a menu, not a checklist. A chapter gets a canvas only if the canvas is the best way to teach its claim; otherwise its required interactive element is a step-through or an existing interactive diagram.

The system design course plans about 135 simulations on the shared kit; its full list, per chapter, is in `work/system-design/02-curriculum-roadmap.md` (the Play column).

## Placement and density

- Every **Learn** chapter has at least one interactive element. Place a canvas immediately before the decision or explanation it informs.
- Do not place a canvas in a quiz or gate chapter. The learner should be proving understanding, not exploring.
- Per chapter: at most **one primary canvas plus one small step-through or toggle**. There is no per-module cap.
- A canvas counts as a high-effort interaction. Do not put it back to back with an `OpenQuestion` or a `CodeExercise`.
- Pair it with a prediction before and a short check after.
- The chapter's prose still teaches the claim, so the chapter works if the canvas fails to load (static fallback).

## QA checklist

### Model

- [ ] The formula or rule is written in the spec.
- [ ] Every input has a min, max, step, and default.
- [ ] Every input and output has a unit.
- [ ] Unit tests cover default, minimum, maximum, and one edge case.
- [ ] The model handles zero and maximum values without NaN, infinity, or a broken layout.
- [ ] The assumptions and limitations are stated in the UI.
- [ ] The model does not claim more precision than it has.

### Teaching

- [ ] The canvas teaches one claim, stated in the spec.
- [ ] The default state produces an interesting, non-trivial result.
- [ ] The first interaction is obvious.
- [ ] "What changed" explains the delta in words.
- [ ] "Try this" experiments have expected observations.
- [ ] The learner is asked to predict before exploring.
- [ ] There is a transfer check after the canvas.
- [ ] The canvas does not reveal the capstone solution.

### Visual

- [ ] Neutral palette, one accent, semantic color only for meaning.
- [ ] No gradients, neon, or decorative animation.
- [ ] At most four series in a chart.
- [ ] Axes, units, and direct labels are present.
- [ ] Summary cards show the numbers the learner needs first.
- [ ] The canvas is readable at a mobile width.
- [ ] The layout follows title → summary → visualisation → controls → explanation.

### Accessibility

- [ ] Every control has a label, value, and unit.
- [ ] Every control is keyboard reachable.
- [ ] Sliders and buttons have accessible names.
- [ ] The visualisation has a text alternative or a live summary.
- [ ] Color is not the only signal.
- [ ] `prefers-reduced-motion` is respected.
- [ ] Focus states are visible.

### Technical

- [ ] No network calls.
- [ ] No secrets or private URLs.
- [ ] The canvas renders without console errors.
- [ ] Interaction updates in under a frame for the expected range.
- [ ] The bundle impact is acceptable.
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
- [ ] Focus rings are visible.
- [ ] Hover is not required to read the data.
- [ ] No `<script>`, `<foreignObject>`, event attributes, external `href`, or `javascript:` URLs.
- [ ] No remote images or fonts inside the SVG.
- [ ] No filters, blurs, or masks that hurt performance or render inconsistently.
- [ ] Static SVG assets are sanitized, optimised, and hosted locally.
- [ ] Visual regression passes in light, dark, and mobile widths.

## Review workflow

1. **Interaction designer** decides that a canvas is the right instrument and writes the spec.
2. **Interactive canvas builder** implements the model, UI, tests, and spec.
3. **Technical validator** runs the model tests, SVG/theme/accessibility checks, performance check, mobile check, and reader integration.
4. **Critic** reviews the teaching claim, the copy, the visual simplicity, and the absence of decoration.
5. **Human review board** approves the canvas as part of the chapter at G3/G5.

A canvas that has not been validated in the reader is not ready.

## Anti-patterns

- A dashboard with twelve controls and no clear claim.
- A rainbow chart where color has no meaning.
- A slider that changes a number but does not change the learner's model.
- A canvas that is fun to play with and impossible to explain afterwards.
- A model that hides its assumptions.
- A "simulation" that is actually a hard-coded animation.
- A canvas that gives away the capstone implementation.
- A canvas that only works on a desktop.
- A canvas that requires hover to understand.
- A canvas that is the only way to learn the concept, with no text fallback.
- Raw author SVG injected into MDX.
- Form controls built out of SVG shapes.
- Hard-coded SVG colors that break dark mode.
- SVG containing scripts, `foreignObject`, event attributes, or external links.
- A 5,000-node SVG that should have been a simpler chart or a Canvas 2D visual.

## Acceptance criteria

A canvas is ready when:

- the teaching claim is stated and testable;
- the model is correct and tested;
- the design is simple and legible;
- the learner can predict, explore, explain, and transfer;
- the canvas is accessible, responsive, and fast;
- the reader integration works and the fallback is safe;
- the chapter is stronger with the canvas than without it.

If the last condition is not true, remove the canvas.

### Shared canvas development and verification

Both web and desktop render the implementations in `packages/learning-ui/src/canvas/`. The old `frontend/src/canvas/` files are compatibility re-exports: do not add implementations there or create a desktop-only copy. Keep canvas models, specs, renderers, and controls in the shared package; keep Next.js, Electron, credentials, and app API clients outside it.

After adding or changing a canvas:

1. Update the canonical slug list in `server/src/shared/canvas/slugs.ts` when needed, run `pnpm --dir server sync-shared`, and register the spec in `packages/learning-ui/src/canvas/registry.ts`.
2. Run `pnpm --dir frontend install` and `pnpm --dir desktop install` to refresh both apps' local package snapshots. Include any resulting lockfile changes.
3. Keep canvas tests in `frontend/tests/unit/canvas/`; new tests should import the implementation from `@buildment/learning-ui/canvas/...`. Run `pnpm --dir frontend exec vitest run tests/unit/canvas` and `node server/scripts/sync-shared.mjs --check`.
4. Check both app typechecks and preview the interaction in web and desktop, including keyboard controls, narrow layouts, and light/dark themes. Use `desktop/tests/ui/blocks.spec.ts` for desktop block regression coverage.
5. Release an updated desktop app before publishing lessons that require a new canvas slug. Canvas implementations are bundled with desktop; importing a lesson does not download new executable canvas code. Older desktop versions show the unavailable fallback for unknown slugs.
