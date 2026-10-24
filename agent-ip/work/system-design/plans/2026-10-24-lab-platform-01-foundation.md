# Component Lab Platform — Plan 01: Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up the `lab` subsystem's foundation — a shared component catalog, the `LabSpec` data contract, a registry + slug source, a validated `<Lab/>` MDX tag, and a static server-rendered board — so an author can register a lab and it renders (read-only, readable before JS) inside a chapter, with no editor or grading yet.

**Architecture:** A `lab` type beside the existing `canvas` type, following the same authored-as-data contract (slug → `data.ts` → registry → `spec.md` → test). Slugs, the MDX tag rules, and the allowlist are authored in `server/src/shared` and regenerated into the frontend with `pnpm sync-shared`, exactly like canvases. This plan is client-and-shared only; it adds no Prisma migration, no editor, and no runtime dependencies. Those come in later plans.

**Tech Stack:** TypeScript, React (server components + SVG), Vitest, the existing `frontend/src/canvas` primitives (`tones.ts`, `svg-node`, `block-map` prior art), the server→frontend `sync-shared` generator.

**Spec:** `agent-ip/work/system-design/04-component-lab-platform.md`

## Global Constraints

- Slugs, MDX tag rules, and the component allowlist are authored in `server/src/shared/**` and regenerated to `frontend/src/shared/**` by `pnpm sync-shared` run in `server/`. Never hand-edit the generated frontend copies.
- Any server-rendered SVG obeys the existing safety scan: no hex colors (use `tones.ts` tokens), no `foreignObject`, no `<script>`, `<animate>`, `xlinkHref`, `<image>`, `<use>`, no `dangerouslySetInnerHTML`.
- Every lab slug has a `spec.md`; every `LabSpec` has a `limits` string longer than 20 characters.
- No em dashes in code, comments, UI copy, docs, or commit messages.
- Commits are authored under the user's git identity only — no Claude/AI co-author or footer.
- Any learner-facing UI works at 375px, in light and dark mode, keyboard-only, and under `prefers-reduced-motion`.

## Review Focus

- **Unknown lab slug** in MDX → the page degrades to prose and does not crash (mirror `InteractiveCanvas`). Pinned in Task 6.
- **Prototype-pollution slug** (`__proto__`, `constructor`) passed to `getLabSpec` → returns null, never the prototype. Pinned in Task 3.
- **`LabSpec.allowedComponents` naming a component id not in the catalog** → validation rejects it at test time, not silently at runtime. Pinned in Task 2.
- **A `startingBoard` edge between ports that cannot legally connect** → validation rejects it. Pinned in Task 2.
- **An oversized or empty `startingBoard`** → the static board still renders legibly (empty state message; node count capped with a stated "+N more") rather than overflowing the phone frame. Pinned in Task 5.

---

### Task 1: Component catalog

**Files:**
- Create: `frontend/src/lab/catalog.ts`
- Test: `frontend/tests/unit/lab/catalog.test.ts`

**Interfaces:**
- Produces:
  - `type ComponentKind = "client" | "dns" | "cdn" | "load-balancer" | "api-gateway" | "app-server" | "cache" | "database" | "queue" | "worker" | "object-storage"`
  - `type PortDir = "in" | "out"`
  - `interface PortDef { id: string; dir: PortDir; accepts: ComponentKind[] }`
  - `interface PropertyDef { id: string; label: string; type: "size" | "count" | "ratio" | "enum"; min?: number; max?: number; step?: number; default: number | string; unit: string; options?: string[] }`
  - `interface ComponentDef { kind: ComponentKind; label: string; icon: string; ports: PortDef[]; properties: PropertyDef[] }`
  - `interface SizeTier { id: string; family: "general" | "compute" | "memory"; vcpu: number; memoryGb: number; capacityRule: string; pricePerHour: number }`
  - `const COMPONENT_CATALOG: Record<ComponentKind, ComponentDef>`
  - `const SIZE_CATALOG: SizeTier[]` (illustrative, dated; small→xlarge per family)
  - `function isComponentKind(value: string): value is ComponentKind`
  - `function canConnect(from: ComponentKind, to: ComponentKind): boolean` (true iff some `out` port on `from` accepts `to`)

- [ ] **Step 1: Write the failing test**

```ts
// catalog.test.ts
test("every component has at least one port and every property has range+default+unit", () => {
  for (const def of Object.values(COMPONENT_CATALOG)) {
    expect(def.ports.length).toBeGreaterThan(0);
    for (const p of def.properties) {
      expect(p.default).toBeDefined();
      expect(p.unit.length).toBeGreaterThan(0);
      if (p.type === "count" || p.type === "ratio") {
        expect(typeof p.min).toBe("number");
        expect(typeof p.max).toBe("number");
      }
    }
  }
});
test("port accepts lists name only real component kinds", () => {
  for (const def of Object.values(COMPONENT_CATALOG))
    for (const port of def.ports)
      for (const k of port.accepts) expect(isComponentKind(k)).toBe(true);
});
test("size catalog tiers are well formed", () => {
  expect(SIZE_CATALOG.length).toBeGreaterThan(0);
  for (const t of SIZE_CATALOG) {
    expect(t.vcpu).toBeGreaterThan(0);
    expect(t.pricePerHour).toBeGreaterThan(0);
    expect(t.capacityRule.length).toBeGreaterThan(0);
  }
});
test("canConnect follows ports: client reaches a front door, app reaches a database", () => {
  expect(canConnect("app-server", "database")).toBe(true);
  expect(canConnect("database", "client")).toBe(false);
});
```

- [ ] **Step 2: Run test to verify it fails** — Run: `pnpm --filter frontend test -- catalog.test.ts` · Expected: FAIL (module not found).
- [ ] **Step 3: Implement `catalog.ts`** with the interfaces above. Fill the catalog from the spec's component list and the simulation-kit's illustrative instance families; `icon` reuses the scene renderer's `ActorKind` icon names where they exist. Keep it pure data plus the two guard functions.
- [ ] **Step 4: Run test to verify it passes** — Expected: PASS.
- [ ] **Step 5: Commit** — `git add frontend/src/lab/catalog.ts frontend/tests/unit/lab/catalog.test.ts && git commit -m "feat(lab): add the shared component catalog"`

---

### Task 2: LabSpec data contract and validator

**Files:**
- Create: `frontend/src/lab/types.ts`
- Test: `frontend/tests/unit/lab/types.test.ts`

**Interfaces:**
- Consumes: `ComponentKind`, `canConnect`, `isComponentKind` (Task 1).
- Produces:
  - `type LabFamily = "hld" | "db"`
  - `interface BoardNode { id: string; kind: ComponentKind; x: number; y: number; props?: Record<string, number | string> }`
  - `interface BoardEdge { from: string; to: string }` (reference `BoardNode.id`)
  - `interface Board { nodes: BoardNode[]; edges: BoardEdge[] }`
  - `interface LabBase { slug: string; family: LabFamily; title: string; purpose: string; limits: string; hints: string[]; referenceSlug?: string }`
  - `interface HldLabSpec extends LabBase { family: "hld"; allowedComponents: ComponentKind[]; startingBoard?: Board; scenario: string; levels: LabLevel[] }` where `interface LabLevel { id: string; load: number; targets: { rps?: number; p99Ms?: number; availability?: number; budgetPerHour?: number }; event?: string }`
  - `interface DbLabSpec extends LabBase { family: "db"; startingDbml: string; query: string }`
  - `type LabSpec = HldLabSpec | DbLabSpec`
  - `function validateLabSpec(spec: LabSpec): string[]` (empty array = valid)

- [ ] **Step 1: Write the failing test**

```ts
test("validateLabSpec rejects a short limits string", () => {
  expect(validateLabSpec({ ...hld, limits: "too short" })).toContain(
    "limits must be longer than 20 characters",
  );
});
test("validateLabSpec rejects an allowedComponents id not in the catalog", () => {
  const bad = { ...hld, allowedComponents: ["app-server", "unicorn" as ComponentKind] };
  expect(validateLabSpec(bad).some((m) => m.includes("unicorn"))).toBe(true);
});
test("validateLabSpec rejects a startingBoard edge between ports that cannot connect", () => {
  const bad = { ...hld, startingBoard: { nodes: [n("a","database"), n("b","client")], edges: [{ from: "a", to: "b" }] } };
  expect(validateLabSpec(bad).some((m) => m.includes("cannot connect"))).toBe(true);
});
test("a well-formed hld and db spec validate clean", () => {
  expect(validateLabSpec(hld)).toEqual([]);
  expect(validateLabSpec(db)).toEqual([]);
});
```

- [ ] **Step 2: Run test to verify it fails** — Expected: FAIL (module not found).
- [ ] **Step 3: Implement `types.ts`.** `validateLabSpec` checks: `limits.length > 20`; for `hld`, every `allowedComponents` entry passes `isComponentKind`, every `startingBoard` node kind is allowed, every edge references existing node ids and its endpoints satisfy `canConnect`; for `db`, `startingDbml` and `query` are non-empty. Return a flat list of human-readable problems.
- [ ] **Step 4: Run test to verify it passes** — Expected: PASS.
- [ ] **Step 5: Commit** — `git commit -m "feat(lab): add the LabSpec contract and validator"`

---

### Task 3: Lab slug source, frontend registry, and the registry guardian test

**Files:**
- Create: `server/src/shared/lab/slugs.ts` (authoritative; exports `LAB_SLUGS` and `isLabSlug`)
- Create: `frontend/src/lab/registry.ts` (`labRegistry: Record<LabSlug, LabSpec>`, `getLabSpec(slug: string): LabSpec | null`)
- Create: one example lab to exercise the contract: `frontend/src/lab/hld-m2-utilisation-knee/data.ts` + `spec.md`
- Generated (via `pnpm sync-shared`, do not hand-edit): `frontend/src/shared/lab/slugs.ts`
- Test: `frontend/tests/unit/lab/registry.test.ts`

**Interfaces:**
- Consumes: `LabSpec`, `validateLabSpec` (Task 2); `LAB_SLUGS` (this task).
- Produces: `type LabSlug = (typeof LAB_SLUGS)[number]`; `getLabSpec`.

- [ ] **Step 1: Write the failing test** (mirror `frontend/tests/unit/canvas/registry.test.ts`)

```ts
test("registry keys exactly equal LAB_SLUGS", () => {
  expect(Object.keys(labRegistry).sort()).toEqual([...LAB_SLUGS].sort());
});
test("getLabSpec returns null for non-slugs including prototype keys", () => {
  expect(getLabSpec("__proto__")).toBeNull();
  expect(getLabSpec("constructor")).toBeNull();
  expect(getLabSpec("not-a-lab")).toBeNull();
});
test("every registered spec validates and has a spec.md", () => {
  for (const slug of LAB_SLUGS) {
    expect(validateLabSpec(labRegistry[slug])).toEqual([]);
    expect(existsSync(resolve(LAB_DIR, slug, "spec.md"))).toBe(true);
  }
});
```

- [ ] **Step 2: Run test to verify it fails** — Expected: FAIL.
- [ ] **Step 3: Author `LAB_SLUGS` in `server/src/shared/lab/slugs.ts`** with the single slug `"hld-m2-utilisation-knee"`; implement `isLabSlug` via a Set (so `getLabSpec` never reads a prototype key). Run `pnpm sync-shared` in `server/` to generate the frontend copy. Write `frontend/src/lab/registry.ts` with `getLabSpec` looking the slug up through `isLabSlug` then an own-property read. Author the example `data.ts` (a minimal valid `HldLabSpec`) and a `spec.md` stating the claim, inputs, rule, assumptions, limits, and three "try this" experiments.
- [ ] **Step 4: Run test to verify it passes** — Expected: PASS.
- [ ] **Step 5: Commit** — `git commit -m "feat(lab): add the lab slug source, registry and guardian test"`

---

### Task 4: The `<Lab/>` MDX tag

**Files:**
- Create: `server/src/shared/mdx/lab-tags.ts` (`collectLabProblems(source: string): string[]`, mirror `canvas-tags.ts`)
- Modify: `server/src/shared/mdx/component-allowlist.ts` (add `"Lab"`)
- Generated via `pnpm sync-shared`: the frontend mirrors
- Test: `frontend/tests/unit/lab/lab-tags.test.ts`

**Interfaces:**
- Consumes: `isLabSlug` (Task 3).
- Produces: `collectLabProblems`.

- [ ] **Step 1: Write the failing test**

```ts
test("flags a missing slug, an expression slug, an unregistered slug, and children", () => {
  expect(collectLabProblems(`<Lab/>`)[0]).toMatch(/needs a slug/);
  expect(collectLabProblems(`<Lab slug={x}/>`)[0]).toMatch(/plain string/);
  expect(collectLabProblems(`<Lab slug="nope"/>`)[0]).toMatch(/not a registered lab/);
  expect(collectLabProblems(`<Lab slug="hld-m2-utilisation-knee">x</Lab>`)[0]).toMatch(/self-closing/);
});
test("a valid self-closing Lab tag has no problems", () => {
  expect(collectLabProblems(`<Lab slug="hld-m2-utilisation-knee"/>`)).toEqual([]);
});
```

- [ ] **Step 2: Run test to verify it fails** — Expected: FAIL.
- [ ] **Step 3: Implement `lab-tags.ts`** by copying `collectCanvasProblems`, swapping the element name to `Lab` and the guard to `isLabSlug`; add `"Lab"` to the allowlist. Run `pnpm sync-shared`.
- [ ] **Step 4: Run test to verify it passes** — Expected: PASS.
- [ ] **Step 5: Commit** — `git commit -m "feat(lab): validate the <Lab> MDX tag and allowlist it"`

---

### Task 5: Static server-rendered board

**Files:**
- Create: `frontend/src/lab/StaticBoard.tsx` (server component, pure SVG)
- Test: `frontend/tests/unit/lab/static-board.test.ts`

**Interfaces:**
- Consumes: `Board`, `BoardNode` (Task 2); `COMPONENT_CATALOG` (Task 1); `tones.ts` tokens; `svg-node` prior art.
- Produces: `function StaticBoard({ board, maxNodes }: { board: Board; maxNodes?: number }): JSX.Element`

- [ ] **Step 1: Write the failing test** (pure-logic: test the layout/trim helper, not DOM)

```ts
test("boardToStatic caps nodes and reports the overflow", () => {
  const big = { nodes: Array.from({ length: 30 }, (_, i) => n(`x${i}`, "app-server")), edges: [] };
  const out = boardToStatic(big, 12);
  expect(out.nodes.length).toBe(12);
  expect(out.overflow).toBe(18);
});
test("boardToStatic on an empty board yields an empty-state flag", () => {
  expect(boardToStatic({ nodes: [], edges: [] }).empty).toBe(true);
});
test("the source uses no forbidden SVG constructs", () => {
  const src = readFileSync(STATIC_BOARD_PATH, "utf8");
  for (const bad of ["foreignObject", "dangerouslySetInnerHTML", "#", "<script"]) expect(src).not.toContain(bad);
});
```

- [ ] **Step 2: Run test to verify it fails** — Expected: FAIL.
- [ ] **Step 3: Implement `StaticBoard.tsx`** exporting a pure `boardToStatic(board, maxNodes = 12): { nodes; edges; overflow: number; empty: boolean }` helper plus the component. Nodes are `svg-node`-style boxes positioned from `BoardNode.x/y`, edges are lines, colors from `tones.ts`; empty board shows a readable "Nothing placed yet" label; overflow shows "+N more". The `#` check keeps hex colors out (tokens only); confirm the test's `#` scan does not false-positive on comments.
- [ ] **Step 4: Run test to verify it passes** — Expected: PASS.
- [ ] **Step 5: Commit** — `git commit -m "feat(lab): render a static, safe board snapshot"`

---

### Task 6: The `<Lab/>` mount

**Files:**
- Create: `frontend/src/lab/Lab.tsx`
- Modify: register `Lab` wherever `InteractiveCanvas` is wired for MDX (`frontend/src/mdx/components.tsx` or its equivalent — follow the canvas wiring)
- Test: `frontend/tests/unit/lab/lab-mount.test.ts`

**Interfaces:**
- Consumes: `getLabSpec` (Task 3); `StaticBoard` (Task 5).
- Produces: `function Lab({ slug }: { slug: string }): JSX.Element`

- [ ] **Step 1: Write the failing test**

```ts
test("Lab resolves a known slug to its spec and a starting board", () => {
  const resolved = resolveLab("hld-m2-utilisation-knee");
  expect(resolved?.spec.title.length).toBeGreaterThan(0);
});
test("Lab degrades to prose for an unknown slug and does not throw", () => {
  expect(resolveLab("not-a-lab")).toBeNull();
});
```

- [ ] **Step 2: Run test to verify it fails** — Expected: FAIL.
- [ ] **Step 3: Implement `Lab.tsx`** exporting a pure `resolveLab(slug: string): { spec: LabSpec } | null` via `getLabSpec`, and the component: a null spec renders the same prose-fallback `InteractiveCanvas` uses; an HLD spec renders `StaticBoard` for `spec.startingBoard` inside the existing `CanvasFrame`/`BeatFrame`; a DB spec renders a "schema lab" placeholder frame (the ER view is a later plan). Wire `Lab` into the MDX component map next to `InteractiveCanvas`. No editor, no dependencies added here.
- [ ] **Step 4: Run test to verify it passes** — Expected: PASS.
- [ ] **Step 5: Run the full canvas+lab unit suite** — Run: `pnpm --filter frontend test -- lab` · Expected: PASS. Then `git commit -m "feat(lab): mount <Lab> with a static board and prose fallback"`

---

## Roadmap — the plans after this one

Each is its own plan document, written when reached, producing shippable software:

- **Plan 02 — Server `DESIGN` block (grading backbone).** Add `DESIGN` to `BLOCK_TYPES`, a `server/src/shared/blocks/design/` dir (schema with a server-only reference field, `grade(config, payload)`, `report`, `progress`), the Prisma enum migration, and `sync-shared`. Models it grades are pure server-importable modules (built in Plan 03).
- **Plan 03 — HLD explore board + analytic model.** Add React Flow and the client editor (place/connect/configure/Run), and the pure `models/tiered-architecture.ts` (capacity, p50/p99 with the 70% knee, availability, cost) with the "how it's calculated" panel. Explore mode only.
- **Plan 04 — HLD lab mode + scoring.** Scenario, three levels, pass/fail with reasons, failure buttons, share link, hints; wire the board's result into the `DESIGN` block's payload so pass/fail is recorded.
- **Plan 05 — DB board.** Add `@dbml/core`, parse `startingDbml`, lay out an ER board on the same editor core, edit tables/columns/keys.
- **Plan 06 — DB playground.** The index/shard/query model with measured effects and a limits panel.
- **Plan 07 — Drill-down + phone fallback.** HLD database node opens its linked DB lab; the vertical card-and-select fallback for phones.
