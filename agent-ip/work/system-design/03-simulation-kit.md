---
artifact: simulation-kit
course: system-design
version: 1
status: draft, needs G3 review with the first sample chapter
owner: interaction-designer + interactive-canvas-builder
---

# Simulation kit

The system design course has about 135 simulations. Building them one by one would never finish and would look like 135 different products. Instead we build **eight reusable renderers** once, on top of the existing canvas platform (`frontend/src/canvas/`), and most simulations become a `data.ts` and a `spec.md` for one of them. The same kit serves every later course (the AWS course, the ticketing and marketplace courses, data courses), so it is platform work, not course work.

Everything here follows `10-interactive-canvases.md`: one claim per canvas, two to four primary inputs, a pure deterministic model with tests, predict before, "what changed" after, a transfer check, stated limits, theme tokens, dark mode, 375px phone layout, keyboard access, reduced motion.

## What changes from today

Today's renderers (stepper, sequence, state machine, factor) show order and decisions. System design needs things that **move over time and fail**: traffic, queues, replicas, clocks, partitions. The kit adds a seeded simulation core and renderers that play it.

## The shared simulation core: `sim`

A small, pure TypeScript module, `frontend/src/canvas/sim/`, with no DOM code.

- **Discrete-event and tick models.** A seeded random source (`mulberry32` or similar), a virtual clock in milliseconds, an event queue.
- **Nodes, links and messages.** Nodes with roles and state; links with delay, jitter, drop rate; partitions as sets of cut links; node crash and restart.
- **Clocks per node.** Physical clock with drift (parts per million) and sync events; Lamport, vector and hybrid logical clocks; TrueTime-style intervals with an epsilon.
- **Traffic.** Constant, step, spike and Zipf-skewed key generators.
- **Recorders.** Every run produces a trace (events in order) and series (numbers over time). Renderers draw traces and series; they never compute the model.
- **Same seed, same run.** A run is fully determined by its inputs and seed, so a learner, a mentor and a test all see the same thing. "New run" changes the seed visibly.

The same core is vendored into the challenges repository as `toolkit/simnet`, so in challenges 9, 11 and 12 the learner's own code (their vector clock, their Raft node, their quorum store) runs on the network model they already played with. One model, two places.

## The eight renderers

| Renderer | Draws | Main inputs | Used for (examples) | Phone layout |
|---|---|---|---|---|
| `timeline` | Lanes per node or client, events, messages as arrows, intervals as bars, a scrubber | Delays, drift, lag, epsilon, step and play | Clocks, Lamport, vector, HLC, TrueTime intervals, replication lag anomalies, session guarantees, isolation anomalies, LWW, windows and watermarks, revocation, RPO | Lanes stack vertically; time runs top to bottom below `sm`; scrubber is a full-width slider |
| `cluster` | Nodes as circles with role and state, links that can be cut, message dots moving on links, per-node log or data panel | Node count, kill and restart, cut link, timeout, quorum sizes | Replication, failover, split brain, quorums, gossip, anti-entropy, CRDT merges, CAP, queues with consumer groups. Modes: `raft`, `kubernetes` | Up to 5 nodes in a ring; tapping a node opens its panel below; actions are buttons, not drag |
| `flow` | Arrivals, a queue, servers or workers, drops; live chart of queue length, throughput and p50 and p99 | Arrival rate, service time, workers, algorithm, retries, limiter type | Utilisation knee, Little's law, fan-out tails, load balancing algorithms, autoscaling lag, rate limiters, stampedes, retry storms, bulkheads, canaries | Diagram above, chart below, controls on top; at most 4 series |
| `ring` | A hash ring with nodes, virtual nodes and keys, a load bar per node | Nodes, virtual nodes, key skew, partition scheme | Consistent hashing, range versus hash, hot partitions, rebalancing, Dynamo preference lists | Ring scales to width; load bars below; keys are summarised, not drawn one by one past 200 |
| `sandbox` | A tiered architecture (client, edge, load balancer, app, cache, database, queue, workers, storage) with a size picker per block | Blocks on or off, instance size and count per tier, cache hit rate, zones, traffic profile | Building blocks explorer, instance picker, latency budget, availability maths, scaling path, labs, capstone | Tiers are a vertical list of cards with selects; no free-form drag on phones (see below) |
| `history` | Operations as bars on client lanes (invoke to response), with a verdict per consistency model and the chosen linearization points | Read results, operation timing, model to check | Linearizability, sequential, causal; "is it linearizable?" puzzles | Lanes stack; each bar is a tappable row with its start, end and value |
| `estimator` | A chain of calculation steps with units, each showing its working | Users, actions per user, object sizes, peak factor, retention | Back-of-the-envelope estimation, SLO budgets, Snowflake ID capacity, Bloom filter and HyperLogLog error, geo cell counts, case-study requirements | A single column of steps; every number is labelled with its unit |
| `classify` | Items to place into two to four buckets, with an explanation per item after placing | Items and buckets (data only) | Requirement types, database choices, consistency per feature | Tap an item, then tap a bucket; no drag needed |

Existing renderers stay: `stepper` (any step-through), `sequence` (request flows), `state` (lifecycles), `factor` (weighted decisions), plus the `ticketline-seat-hold-race` canvas reused in modules 7 and 25.

`classify` and the `sandbox` design-challenge mode record an answer, so their scored versions are **block types with a response schema** (`10-interactive-canvases.md` → Platform integration, last paragraph). Their unscored explore versions are plain canvases. That is a separate platform decision (roadmap open decision 3).

## The architecture sandbox

The sandbox is the ScaleDojo-like piece: the learner composes a system from blocks and sees whether it meets requirements. It is the most reused component in the course and the base of the later AWS course.

### Blocks and sizes

Each tier has a block type and a size picker. Sizes come from an illustrative catalog modelled on common cloud instance families (general purpose, compute optimised, memory optimised; small to extra large), each with vCPU, memory, a capacity rule and an hourly price. Managed blocks (cache, database, queue, CDN, load balancer) have their own size or capacity units. The catalog is data, dated and labelled: "Illustrative prices, one region, checked YYYY-MM-DD. Use them to compare shapes, not to quote a bill." The AWS course swaps in a real, maintained price table.

### What the model computes

All rules are written in the spec and shown in a "How this is calculated" panel.

- **Capacity:** requests per second each tier can serve, from its size and count and a stated per-vCPU rule for the workload profile; the system's ceiling is the smallest tier after cache hits are removed.
- **Latency:** p50 and p99 along the request path, adding per-hop network cost and per-tier service time, weighted by cache hit rates; p99 grows as a tier's utilisation passes about 70% (the queueing knee from module 2).
- **Availability:** series and parallel composition per tier, with zones as independent failure domains (stated assumption: independent failures).
- **Cost:** monthly cost per tier and total, with the biggest cost driver called out.
- **Failure:** "fail a zone", "fail the cache", "fail the primary" buttons show what the design does.

### Lab mode

A lab is the ScaleDojo-style use of the sandbox (roadmap → Labs). It states a scenario and targets (for example 10,000 RPS, p99 under 200 ms, 99.9% availability, under a budget per hour) and runs in **three levels**: level 1 a modest load, level 2 a multiple of it, level 3 the same load plus a failure or skew (a zone down, a celebrity key, a provider outage).

- **Requests move.** After Run, request dots travel through the tiers: a cache hit turns back early, a miss continues to the database, a dropped request fades out at the tier that refused it. A tier's card shows its utilisation and turns amber past about 70% and red past 90%, always with the number and a word ("busy", "overloaded"). The dot count is a sample of the load, stated on screen, so the animation stays light on a phone. Under reduced motion the dots are replaced by per-tier counters that update each tick.
- **Pass or fail per target, with the reason:** "p99 fails: the database is at 92% utilisation". All targets green passes the level and unlocks the next.
- **Cost per hour and per month,** per tier and in total, with the biggest cost driver named. Budgets are stated per hour, like a real bill.
- **Share and hints.** The design serialises to a short link so a mentor can open exactly what was built. Hints unlock after two failed runs of a level.
- **A lab is data:** scenario text, targets per level, the blocks allowed, the level 3 event, and hints. The reference design for each lab lives with the reference solutions, not in the bundle.

Recording pass or fail per level needs a `lab` block type with a response schema (roadmap open decision 3). Until it ships, a lab runs as a canvas and the learner pastes their design link into an open question.

### Honesty

The sandbox is a model, not a cloud. Its limits panel says what it ignores (network topology inside a region, noisy neighbours, cold starts, storage IOPS limits unless modelled, real discounts). Every lab ends with an open question asking what the model left out that would matter in production.

## Motion

Simulations that move are the point of the course, so motion is allowed when it is the model moving: message dots travelling a link, a queue filling, a clock drifting, a leader changing. Rules: nothing plays until the learner presses Play; Pause, Step and Reset are always there; under `prefers-reduced-motion`, dots and bars jump to their next state with no animation and the step readout says what happened; motion is CSS transforms and opacity only.

## Quality and performance

- Each renderer ships with unit tests for its model adapters and a story at `/workspace/canvases`.
- Each simulation's `spec.md` states the claim, inputs with min, max, step and default, the rule, assumptions and limits, and the three "try this" experiments with expected results. Model tests cover default, min, max and one edge case.
- Budget: the whole kit under 60 KB gzipped on top of today's canvas code, plus Recharts and React Flow when the `flow` and `sandbox` renderers ship (loaded only on pages that use them); each `data.ts` under 3 KB. Reuse open source first: controls are shadcn/ui on Base UI, axes use `d3-scale`, charts use shadcn/ui `Chart` (Recharts), node graphs use React Flow (`agent-ip/10-interactive-canvases.md` → The reusable component library).
- Every renderer is checked at 375px, in light and dark mode, keyboard only, and with reduced motion before review.

## Build order

The first sample chapter (G3) proves the kit before the course scales.

1. `sim` core and `timeline`, proven by 10.6 TrueTime and 8.4 replica lag (the two chapters the sponsor asked about most).
2. `flow`, proven by 2.5 utilisation knee and 6.5 rate limiters.
3. `cluster` (with `raft` mode), proven by 8.5 split brain and 12.5 Raft elections.
4. `ring`, `estimator`, `history`, `classify`.
5. `sandbox` explore mode, then challenge mode (after the block-type decision).

## Reuse beyond this course

| Renderer | Other courses that can use it |
|---|---|
| `sandbox` | AWS solutions architecture course (core), ticketing and marketplace deploy chapters, AI course deployment chapter |
| `flow` | Every course with queues, workers or rate limits |
| `timeline` | Ticketing (holds and webhooks), marketplace (order states over time), soft skills (time-zone handoffs) |
| `classify` | Every course, including soft skills scenario sorting |
| `estimator` | AI course (token and cost estimates), AWS course |
