import { describe, expect, it } from "vitest";
import { formatCell, tableStepsProblems } from "@buildment/learning-ui/canvas/renderers/table-steps/model";
import type { TableStepsSpec } from "@buildment/learning-ui/canvas/renderers/table-steps/types";
import { joinFanOut } from "@buildment/learning-ui/canvas/join-fan-out/data";

const base: TableStepsSpec = {
  kind: "table-steps",
  title: "t",
  purpose: "p",
  summary: "s",
  tables: [{ id: "a", title: "a", columns: [{ key: "x", label: "x" }], rows: [{ x: 1 }, { x: null }] }],
  steps: [
    { title: "one", note: "n", views: [{ table: "a" }] },
    { title: "two", note: "n", views: [{ table: "a", rows: [0, 1], highlight: [1] }] },
  ],
  limits: "a limit that is long enough",
};

describe("table-steps model", () => {
  it("accepts a well formed spec and the join canvas", () => {
    expect(tableStepsProblems(base)).toEqual([]);
    expect(tableStepsProblems(joinFanOut)).toEqual([]);
  });

  it("shows NULL for a missing value and numbers as written", () => {
    expect(formatCell(null)).toBe("NULL");
    expect(formatCell(undefined)).toBe("NULL");
    expect(formatCell(4.5)).toBe("4.5");
    expect(formatCell("M02")).toBe("M02");
  });

  it("finds unknown tables, rows out of range and marks on hidden rows", () => {
    const bad: TableStepsSpec = {
      ...base,
      steps: [
        { title: "one", note: "n", views: [{ table: "missing" }] },
        { title: "two", note: "n", views: [{ table: "a", rows: [0], highlight: [1], dropped: [5] }] },
      ],
    };
    const problems = tableStepsProblems(bad);
    expect(problems.some((p) => p.includes("unknown table missing"))).toBe(true);
    expect(problems.some((p) => p.includes("row 5"))).toBe(true);
    expect(problems.some((p) => p.includes("does not show"))).toBe(true);
  });

  it("rejects tables too wide or too long for a phone", () => {
    const columns = Array.from({ length: 6 }, (_, i) => ({ key: `c${i}`, label: `c${i}` }));
    const rows = Array.from({ length: 11 }, () => ({ c0: 1 }));
    const problems = tableStepsProblems({ ...base, tables: [{ id: "a", title: "a", columns, rows }] });
    expect(problems.some((p) => p.includes("columns"))).toBe(true);
    expect(problems.some((p) => p.includes("rows"))).toBe(true);
  });
});
