import type { SliderResult, SliderSpec, SliderValues } from "../renderers/slider/types";

// Course: data-engineering (course 15), chapter 3.4 "Query plans and indexes".
// A toy cost rule counts pages read. With an index, the engine pays log2(rows)
// pages to find the first match and 3 pages for each matching row. With a full
// scan it reads every page, and 100 rows fit on a page. The rule is an
// illustration, not a measurement of any real engine. See spec.md.

/** Rows that fit on one page in the toy rule. */
export const ROWS_PER_PAGE = 100;
/** Pages read for each matching row when the index points at it. */
export const PAGES_PER_MATCH = 3;

export type IndexInputs = {
  /** Rows in the table, in thousands. */
  thousands: number;
  /** Share of the rows the query picks, in percent. */
  percent: number;
};

function inputsFrom(values: SliderValues): IndexInputs {
  const num = (v: unknown, fallback: number, min: number, max: number) =>
    typeof v === "number" && Number.isFinite(v) ? Math.min(max, Math.max(min, v)) : fallback;
  return { thousands: num(values.thousands, 200, 10, 1000), percent: num(values.percent, 0.1, 0.1, 100) };
}

export const rowsIn = (thousands: number) => thousands * 1000;
export const matchingRows = (thousands: number, percent: number) => Math.round((rowsIn(thousands) * percent) / 100);

/** Pages read with the index: log2(rows) to find the first row, then 3 pages per matching row. */
export function indexPages(thousands: number, percent: number): number {
  return Math.log2(rowsIn(thousands)) + PAGES_PER_MATCH * matchingRows(thousands, percent);
}

/** Pages read by a full scan: every row, 100 rows to a page. */
export function scanPages(thousands: number): number {
  return rowsIn(thousands) / ROWS_PER_PAGE;
}

/** The share of rows (in percent) at which the two plans read the same number of pages. */
export function breakEvenPercent(thousands: number): number {
  const rows = rowsIn(thousands);
  return (((rows / ROWS_PER_PAGE - Math.log2(rows)) / (PAGES_PER_MATCH * rows)) * 100);
}

export type Cheaper = "index" | "scan" | "same";

export function cheaperPlan(thousands: number, percent: number): Cheaper {
  const withIndex = Math.round(indexPages(thousands, percent));
  const withScan = Math.round(scanPages(thousands));
  if (withIndex === withScan) return "same";
  return withIndex < withScan ? "index" : "scan";
}

const pages = (n: number) => Math.round(n).toLocaleString("en-US");
const share = (p: number) => `${p.toLocaleString("en-US", { maximumFractionDigits: 1 })}%`;

export function computeIndexOrScan(values: SliderValues): SliderResult {
  const { thousands, percent } = inputsFrom(values);
  const withIndex = indexPages(thousands, percent);
  const withScan = scanPages(thousands);
  const winner = cheaperPlan(thousands, percent);
  const matches = matchingRows(thousands, percent);
  const gap = Math.abs(Math.round(withIndex) - Math.round(withScan));
  const breakEven = breakEvenPercent(thousands);
  return {
    stats: [
      { label: "Pages with the index", value: pages(withIndex), detail: `${matches.toLocaleString("en-US")} matching rows` },
      { label: "Pages with a full scan", value: pages(withScan), detail: `${rowsIn(thousands).toLocaleString("en-US")} rows` },
      {
        label: "Cheaper plan",
        value: winner === "index" ? "Index" : winner === "scan" ? "Full scan" : "Same",
        detail: winner === "same" ? "equal pages" : `by ${pages(gap)} pages; break-even near ${breakEven.toFixed(2)}%`,
      },
    ],
    bars: [
      { label: "Index", value: withIndex, display: pages(withIndex), tone: winner === "index" ? "good" : undefined },
      { label: "Full scan", value: withScan, display: pages(withScan), tone: winner === "scan" ? "good" : undefined },
    ],
    summary:
      winner === "same"
        ? `A table of ${rowsIn(thousands).toLocaleString("en-US")} rows with ${share(percent)} matching reads ${pages(withScan)} pages either way.`
        : `A table of ${rowsIn(thousands).toLocaleString("en-US")} rows with ${share(percent)} matching reads ${pages(withIndex)} pages with the index and ${pages(withScan)} with a full scan, so the ${winner === "index" ? "index" : "full scan"} is cheaper.`,
  };
}

export function describeIndexChange(before: SliderValues, after: SliderValues): string {
  const a = inputsFrom(before);
  const b = inputsFrom(after);
  if (a.thousands === b.thousands && a.percent === b.percent) return "Nothing changed.";
  const was = cheaperPlan(a.thousands, a.percent);
  const now = cheaperPlan(b.thousands, b.percent);
  const changed =
    a.percent !== b.percent && a.thousands !== b.thousands
      ? "Changing the table size and the share of matching rows"
      : a.percent !== b.percent
        ? `Changing the share of matching rows from ${share(a.percent)} to ${share(b.percent)}`
        : `Changing the table size from ${rowsIn(a.thousands).toLocaleString("en-US")} to ${rowsIn(b.thousands).toLocaleString("en-US")} rows`;
  const idx = pages(indexPages(b.thousands, b.percent));
  const scan = pages(scanPages(b.thousands));
  const word = (c: Cheaper) => (c === "index" ? "the index" : c === "scan" ? "the full scan" : "neither plan");
  if (now === "same") return `${changed}: both plans now read ${scan} pages, so neither is cheaper.`;
  if (was !== now) {
    return `${changed}: the index now reads ${idx} pages and the full scan ${scan}, so ${word(now)} is cheaper instead of ${word(was)}. The break-even point of this rule is near ${breakEvenPercent(b.thousands).toFixed(2)}%.`;
  }
  return `${changed}: the index reads ${idx} pages and the full scan ${scan}. ${word(now)[0]!.toUpperCase()}${word(now).slice(1)} is still the cheaper plan.`;
}

export const indexOrScan: SliderSpec = {
  kind: "slider",
  title: "When does an index beat a full scan?",
  purpose: "Change the size of the table and the share of rows a query picks, and compare the pages read by an index and by a full scan under a simple rule.",
  intro:
    "A table has 200,000 rows and a query picks 0.1 percent of them. The toy rule: with an index the engine reads log2(rows) pages plus 3 pages for each matching row. A full scan reads rows divided by 100 pages. Predict the cheaper plan when the query picks 12.5 percent of the rows, one market in eight.",
  inputs: [
    { id: "thousands", label: "Rows in the table", min: 10, max: 1000, step: 10, default: 200, unit: "thousand" },
    { id: "percent", label: "Share of rows matching", min: 0.1, max: 100, step: 0.1, default: 0.1, unit: "%" },
  ],
  compute: computeIndexOrScan,
  describeChange: describeIndexChange,
  barsTitle: "Pages read",
  tryThis: [
    "Raise the share of matching rows to 12.5 percent, one market in eight. The index reads about 75,018 pages and the full scan reads 2,000, so the full scan is cheaper.",
    "Set the share to 0.3 percent, then 0.4 percent. The cheaper plan flips from the index to the full scan near 0.33 percent, the break-even point of this rule.",
    "Keep the share at 0.1 percent and raise the table to 1,000 thousand rows. The index still wins, and by more pages, because the scan grows with the table and the index grows only with the matches.",
  ],
  limits:
    "This is a simple illustration: the numbers come from a toy rule, not from a measurement of any engine. Real engines also use caches, read pages in order, and estimate how many rows match before they choose a plan, so the real break-even point is different and has to be measured on your own data.",
};
