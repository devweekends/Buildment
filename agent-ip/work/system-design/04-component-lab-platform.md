---
artifact: component-lab-platform
course: system-design (platform work; reused by later courses)
version: 1
status: builder-reviewed; architect decisions made 2026-10-24 (graded DESIGN block, phone card fallback); needs sign-off to move to implementation plan
owner: interaction-designer + interactive-canvas-builder
extends: 03-simulation-kit.md (resolves its "sandbox" and open decision 3)
---

# Component lab platform

## Intent and why

Today a canvas is authored content: a slug, a `data.ts`, a `spec.md`, rendered server-side under a strict SVG-safety regime. The learner steps through what the author built. That is right for a teaching beat.

The architect wants something more for labs: a **central set of reusable components a learner can build with** — drag a component onto a board, attach it to another, start and stop it, configure it — and a platform in which **any author can define a course's labs out of those same components** as data. The same components power system design today and Kubernetes, data pipelines and more later. This is the "Grokking done right, learned by playing" goal (see `system-design-course-vision` memory) taken from *watch the model move* to *build the model yourself*.

Two families are in scope now, and only these two:

1. **HLD (high-level design)** — a free-form architecture board: client, DNS, CDN, load balancer, API gateway, app servers, cache, database, queue, workers, object storage. Wire them into a request path, size each, press Run, watch traffic flow and fail. This is the approved `sandbox` renderer from `03-simulation-kit.md`, promoted from a tiered picker to a board you build on. **Note (builder review):** no `sandbox` renderer or phone card-fallback exists yet — `03`'s build order schedules `sandbox` last — so this platform **owns and builds** the sandbox (board, catalog view, and phone fallback) and **supersedes that line** in `03`'s build order rather than reusing an existing renderer.
2. **Database design** — a schema board: tables, columns, keys, indexes, relations (dbdiagram/drawSQL-shaped), plus a small playground where adding an index or sharding a table changes a measured query. **Nothing for this exists today; it is greenfield.**

They are **one connected experience**: an HLD `database` block drills *down* into its schema on the DB board, so a learner moves from "where the database sits and why" to "how it is modelled and what that costs a query."

## Goals

- A reusable **component model** (a catalog of blocks and their configurable properties) that is data, not code, and is shared by the runtime, the scoring model and the authoring format.
- A **free-form board runtime**: place, connect, configure, start/stop, and Run — for both families, on one editing core.
- An honest **simulation + scoring layer** for HLD (capacity, latency/p99, availability, cost) so a board can be graded against a scenario's targets — ScaleDojo-shaped, using *our* stated model, not a copied one.
- A **database-design family**: author and render schemas from **DBML** (dbdiagram's open DSL), let the learner edit the schema and an index/shard/query playground, and show the measured effect.
- An **authoring contract** so a course author defines a lab as a data file (allowed blocks, scenario, targets, the level-3 failure event, the reference design) plus a `spec.md`, the way canvases are authored today.
- **Drill-down** linking an HLD database block to its DB-design board.
- Everything that `03-simulation-kit.md` and the visual-first/interactive-first proposals already require: predict-before, what-changed-after, a transfer check, stated limits, theme tokens, dark mode, 375px layout, keyboard access, reduced motion, seeded and reproducible runs.

## Non-goals

- The other six simulation-kit renderers (`flow`, `cluster`, `ring`, `history`, `estimator`, `classify`, `timeline`). They proceed on their own build order in `03-simulation-kit.md`; this platform does not block on them and does not replace them.
- A real cloud, real prices, or a real SQL engine. The models are illustrative and dated, as the simulation-kit already states.
- Kubernetes, data-pipeline or AWS component families. The platform is designed so they slot in later; none is built now.
- Multiplayer/real-time collaborative editing.

## Anti-goals (these would make it a failure even if it ran)

- A form-heavy canvas. The approved visual-first proposal is explicit: the picture leads, the learner touches the picture, at most two controls sit outside it, no rows of summary cards. A board of boxes wired by dragging **is** touching the picture; a board fronted by panels of number inputs is the thing the architect rejected ("interactive elements are super super bad" when they open with control boxes). The editor must feel like sketching, not like filling a form.
- A drag toy that teaches nothing: no predict, no "what changed", no transfer, sliders counting as completion. The teaching contract is mandatory.
- A second, parallel canvas system. This must extend the existing registry/data/`spec.md`/test contract and the primitive layer, not fork it.

## The central architecture decision (needs the architect's call)

A free-form, stateful **editor** (drag, drop, wire, edit text, keep per-node state, run a clock) does not fit the current canvas regime, which is server-rendered and forbids `foreignObject`, `<script>`, injected HTML and hex colour (enforced by `registry.test.ts`). The approved mobile-first beat design also says **no free-form drag on phones**.

So the platform is proposed as a **new first-class interaction type beside canvases, not a sixth renderer kind**: a **`lab` type** with its own registry, its own `data.ts` + `spec.md` contract mirroring canvases, and its own client editor component (React Flow). It is a client subsystem (`"use client"`), exempt from the server-SVG-safety scan but with its **own** test contract (model purity, data validity, catalog conformance, reduced-motion, phone behaviour).

**Where "record pass/fail" actually lives (builder review correction).** This repo has two non-overlapping subsystems, and a lab must pick one:

- the **frontend-only canvas registry** (`frontend/src/canvas/`, slug in `shared/canvas/slugs.ts`) — renders a starting state, persists nothing, grades nothing, gates nothing; and
- the **server-synced block pipeline** (`server/src/shared/blocks/*` → `frontend/src/shared/blocks/definitions.ts`, a Prisma `BlockType` enum, each with `schema` + a pure server-run `grade(config, payload)` + `report` + `progress`, regenerated via `pnpm sync-shared`) — this is where recorded, graded, completion-gating work lives (QUIZ, CODE, PREDICT…).

Open decision 3 of `03-simulation-kit.md` ("record pass/fail per level") lives in the **second** pipeline, not the canvas registry I first patterned the lab after. So **whether a lab is graded or not is the architect's lead decision** (open question 1 below), and it changes the build materially:

- **Graded lab (recommended, satisfies open decision 3):** a new `BlockType` (e.g. `DESIGN`) — Prisma enum migration, a server config/payload/response schema, a server `grade()`, progress/review wiring, the MDX allowlist entry, and the `sync-shared` round-trip. The scoring **models must be server-importable pure modules** (like `CODE`'s `run-tests.ts`), and the reference design sits in a **server-only** schema field so the answer is genuinely hidden (the canvas pattern ships all `data.ts` to the client and therefore *cannot* hide it).
- **Play lab (lighter):** a frontend canvas-style embed with client-only pass/fail feedback, no recorded progress, no completion gate, no hidden reference. Less than half the work, but open decision 3 stays unresolved.

**Readable before JS (builder review correction).** Every canvas today server-renders its starting state and degrades to prose for an unknown slug. A lab keeps that contract: it ships a **static server-rendered snapshot of its starting board** (reusing the non-editable `block-map`/`svg-node` prior art) that the React Flow editor hydrates over. Labs are not blank until JS loads.

**New dependencies (builder review correction).** React Flow, `@dbml/core` and Recharts are named in the simulation-kit's *plan* but are **not in `package.json` today** (only `@base-ui/react`, `d3-scale`, `shadcn`). They are net-new installs this work must add, editor-bundle-only, loaded on lab pages.

**Phone behaviour** is open question 2 for the architect. A build-by-dragging board is a desktop/tablet experience; on a phone the same lab data can render as a vertical list of component cards with selects and a Run (not free-form drag), or labs can be desktop/tablet-only with phones staying on the in-chapter beats.

Everything else below assumes this `lab` type.

## Subsystem 1 — the component model (shared, data-only)

One catalog describes every block once; the runtime, the scoring model and the authoring format all read it.

- A **component** has: `kind` (e.g. `load-balancer`, `cache`, `app-server`, `database`, `queue`, `worker`, `cdn`, `object-storage`, `client`), a display label and icon (reuse the scene renderer's `ActorKind` icons and `block-map` kinds), a set of **ports** (in/out) that constrain legal connections, and a set of **configurable properties** with type, range, default and unit (size tier, count, cache hit-rate, replication factor, zones).
- **Sizes** come from an illustrative, dated instance catalog (general/compute/memory optimised; small→xlarge; vCPU, memory, a capacity rule, an hourly price), exactly as `03-simulation-kit.md` specifies. Managed blocks carry their own capacity/price units.
- The catalog is pure TS with a unit test asserting every property has range+default+unit and every port kind is legal. Adding k8s/AWS families later means adding catalog entries, not runtime code.

## Subsystem 2 — the HLD board runtime and scoring

- **Editor:** React Flow board. Nodes are components from the catalog; edges are legal port-to-port links; a side sheet (not a wall of forms) edits the selected node's properties. Explore mode = free sketch. Lab mode layers a scenario, targets and levels on the same board.
- **Run + model:** this is the piece `sim/` is missing today. Add a **tiered-architecture model** as a **pure, server-importable `models/` module** (so a graded lab can grade it authoritatively). The four quantities are computed **analytically** (closed-form steady-state, seeded only where randomness applies such as key skew); the existing `createSimulation` scheduler and `Trace` format are used **only to animate request dots and the failure timeline**, not to derive the graded numbers. It computes, from the board and its sizes, per the rules already written in `03-simulation-kit.md`:
  - **Capacity** (RPS per tier from size×count and a per-vCPU rule; system ceiling = smallest tier after cache hits),
  - **Latency** p50/p99 along the request path (per-hop + per-tier service time, weighted by cache hit-rate; p99 rises past ~70% utilisation — the queueing knee from module 2),
  - **Availability** (series/parallel composition, zones as independent failure domains, stated assumption),
  - **Cost** (per tier and total, biggest driver named).
  A "How this is calculated" panel shows the rules. Request dots travel the board on Run; a tier turns amber past ~70% and red past ~90% with the number and a word; reduced motion swaps dots for per-tick counters.
- **Scoring (ScaleDojo-shaped):** a lab states a scenario and per-level targets (e.g. 10k RPS, p99 < 200 ms, 99.9% availability, under a budget/hour) across three levels (modest load → multiple → load + a failure/skew). Pass/fail is per target with the reason stated ("p99 fails: the database is at 92% utilisation"); all green unlocks the next level. Failure buttons: fail a zone, the cache, the primary. The board serialises to a short link for a mentor; hints unlock after two failed runs.

## Subsystem 3 — the database-design family

- **Authoring format: DBML** (dbdiagram's open DSL), parsed with `@dbml/core`. An author writes `Table`/`Column` with settings (`pk`, `unique`, `not null`, `default`, `check`, `increment`), `indexes` (btree/hash, composite, unique, expression), relationships (`<` `>` `-` `<>`, `?` for optional), `Enum`, reusable `TablePartial`, and sample `records`. We do not invent a schema format.
- **Render:** an ER board (tables as nodes with their columns/keys, relations as edges) on the same React Flow editor core as HLD. Reuse `tones.ts`, `BeatFrame`, the primitive controls.
- **Playground (the teaching move):** the learner changes the schema or physical design — add an index, change a key, denormalise, shard a table on a chosen key — and a small, honest model shows the measured effect on a stated query: rows scanned with vs without the index, hot-partition skew when the shard key is poor, a fan-out read across shards. Numbers come from a seeded model with a limits panel ("rows scanned, not milliseconds; no query planner; no caching unless modelled"), consistent with the simulation-kit's honesty rule.
- **Drill-down:** selecting an HLD `database` block offers "open its schema", which opens the linked DB-design lab; a breadcrumb returns to the HLD board. The link is data (an HLD lab's database node names a DB-lab slug).

## Authoring contract (how an author defines a lab)

Mirrors the canvas contract so authors learn one pattern:

1. Add a slug to the lab registry (sibling to the canvas registry, same slug-sync + test guard).
2. A `<slug>/data.ts` exports a `LabSpec`: `family` (`hld` | `db`), `title`, `purpose`, `limits` (>20 chars), the **allowed components** (catalog ids), the **starting board** (optional), the **scenario** and **per-level targets** (HLD) or the **starting DBML + query** (DB), the **level-3 event**, **hints**, and an optional **reference design** (kept out of the shipped bundle).
3. A `<slug>/spec.md` states the claim, the inputs with min/max/step/default, the rule, assumptions and limits, and the three "try this" experiments with expected results (same requirement canvases have).
4. Model logic is a pure `.ts` with unit tests (default, min, max, one edge case), exactly like existing `models/*`.
5. MDX mounts it with a self-closing `<Lab slug="…"/>` tag, validated like `<InteractiveCanvas/>`.

## How it fits the existing code (build on, not beside)

- **Reuse:** `sim/`'s seeded `createSimulation` and `Trace`; `tones.ts`, `BeatFrame`/`CanvasFrame`, `controls.tsx`, `svg-node`, and the `block-map`/`design-stepper` node+link prior art for non-editable HLD views; the slug→data→registry→`spec.md`→test contract; the shared seeded-run and reduced-motion machinery.
- **Add:** a `lab/` subsystem (registry, `LabSpec` types, React Flow editor, side-sheet config), the shared **component catalog**, the **tiered-architecture model** in `models/`, the **DBML adapter + ER layout + physical-design playground model**, and the `<Lab/>` MDX tag + its own test suite.
- **Dependencies** (already in the simulation-kit budget): React Flow for the board; `@dbml/core` for parsing; d3-scale/Recharts/shadcn-ui as already used. Keep the per-lab `data.ts` small; load the editor only on lab pages.

## Build order (incremental, each slice shippable and tested)

0. **If graded:** the server workstream first — `DESIGN` `BlockType` (Prisma enum migration, config/payload/response schema with a server-only reference field, a stub `grade()`, progress/review wiring, allowlist entry, `sync-shared`). Skip if the architect chooses play labs.
1. **Component catalog** (data + test), the **`lab` type scaffold** (registry, `LabSpec`, `<Lab/>` tag, empty editor, test contract) and the **static starting-board snapshot** renderer (server-rendered, hydrated by the editor). Add React Flow / `@dbml/core` to `package.json`. No model yet.
2. **HLD explore board**: place/connect/configure/Run with the **tiered-architecture model** and the "how it's calculated" panel. Prove on one scenario (reuse module 2's utilisation knee as the first lab).
3. **HLD lab mode**: scenarios, three levels, pass/fail with reasons, failure buttons, share link, hints. Resolve the response-schema half of open decision 3.
4. **DB-design board**: DBML parse → ER render → edit tables/columns/keys. Prove on one schema.
5. **DB playground**: index/shard/query model with measured effects and limits.
6. **Drill-down** wiring HLD database block ↔ DB lab.
7. **Phone fallback** per the architect's decision on the open question.

## Risks and how we hold the line

- **Feature creep into a product.** Mitigation: scope is HLD + DB only; the catalog and `LabSpec` are the extension points for everything later; a custom lab needs a written reason (the simulation-kit's existing rule).
- **The editor drifts into a form.** Mitigation: the anti-goal is a review gate; config is a light side sheet, the board leads, phone uses the card fallback.
- **Dishonest numbers.** Mitigation: every model ships a limits panel and a "how it's calculated" panel; every lab ends with "what did the model leave out that would matter in production."
- **Performance on phones.** Mitigation: dot counts are sampled and stated; reduced-motion path is counters; editor bundle is lab-page-only.

## Architect decisions (made 2026-10-24)

1. **Graded.** A lab is a **graded, recorded `DESIGN` block** — records pass/fail per level, gates chapter completion, hides the reference answer. This includes the server workstream (build step 0) and server-importable scoring models, and it satisfies open decision 3 of `03-simulation-kit.md`.
2. **Card fallback on phones.** Desktop/tablet get the free-form drag board; phones render the same lab data as a vertical list of component cards with selects and a Run. The phone fallback is in scope (build order step 7).

## Settled by the builder (override if you disagree)

- **First lab to prove the platform:** module 2's utilisation knee as the first HLD lab (per `03`), and the course's running example schema as the first DB lab.
- **DBML scope for v1:** a documented subset — `Table`/`Column` with core settings, `indexes`, relationships, `Enum` — with `TablePartial`, `records`, `checks` and cross-schema deferred to a later release.

## What is left to the builder

Everything not fixed above: exact `LabSpec`/catalog TypeScript shapes; the React Flow wiring and side-sheet UX; the precise per-vCPU capacity, latency and availability constants (within the rules already stated); the DBML-to-ER layout algorithm; the index/shard/query model's formulas and limits; test file layout. These are engineering choices a capable builder makes without changing what the platform is.
