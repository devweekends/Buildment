import { describe, expect, it } from "vitest";
import { runTieredModel } from "@/lab/tiered-architecture";
import type { Board, ChallengeDef } from "@/lab/types";
import { validateChallenge } from "@/lab/types";

// A side job only some requests need (an alert, an index update) carries its share of
// the stream, not all of it.

const board: Board = {
  nodes: [
    { id: "client", kind: "client", x: 0, y: 0 },
    { id: "lb", kind: "load-balancer", x: 0, y: 1, props: { size: "general-xlarge" } },
    { id: "app", kind: "app-server", x: 0, y: 2, props: { count: 4 } },
    { id: "db", kind: "database", x: 0, y: 3, props: { size: "memory-xlarge" } },
    { id: "q", kind: "queue", x: 1, y: 3 },
    { id: "w", kind: "worker", x: 1, y: 4 },
  ],
  edges: [
    { from: "client", to: "lb" },
    { from: "lb", to: "app" },
    { from: "app", to: "db" },
    { from: "app", to: "q" },
    { from: "q", to: "w" },
  ],
};

describe("traffic shares", () => {
  it("send every request to every role when no share is set", () => {
    const r = runTieredModel(board, 4000, {});
    expect(r.edgeFlows["app>q"]).toBeCloseTo(4000);
    expect(r.edgeFlows["q>w"]).toBeCloseTo(4000);
  });

  it("send only the share to that role, and everything behind it follows", () => {
    const r = runTieredModel(board, 4000, {}, { shares: { queue: 0.1 } });
    expect(r.edgeFlows["app>q"]).toBeCloseTo(400);
    expect(r.edgeFlows["q>w"]).toBeCloseTo(400);
    expect(r.edgeFlows["app>db"]).toBeCloseTo(4000);
    expect(r.edgeFlows["lb>app"]).toBeCloseTo(4000);
  });

  it("make the workers behind a shared queue less busy", () => {
    const full = runTieredModel(board, 4000, {}).tiers.find((t) => t.id === "w")!;
    const tenth = runTieredModel(board, 4000, {}, { shares: { queue: 0.1 } }).tiers.find((t) => t.id === "w")!;
    expect(tenth.utilisation).toBeCloseTo(full.utilisation / 10);
  });

  it("must be above 0 and at most 1", () => {
    const base: ChallengeDef = {
      peakLoad: 1000,
      scenarios: [],
      checks: [
        { type: "path", id: "p", kind: "functional", label: "p", chain: ["client", "compute"], target: "t" },
        { type: "metric", id: "c", kind: "non-functional", label: "c", scenario: "steady", metric: "cost", op: "<=", value: 1 },
      ],
    };
    expect(validateChallenge({ ...base, shares: { queue: 0.1 } })).toEqual([]);
    expect(validateChallenge({ ...base, shares: { queue: 0 } })).toContain("share for queue must be above 0 and at most 1");
    expect(validateChallenge({ ...base, shares: { queue: 1.5 } })).toContain("share for queue must be above 0 and at most 1");
  });
});
