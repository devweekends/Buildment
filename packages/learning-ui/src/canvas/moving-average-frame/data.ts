import type { SliderResult, SliderSpec, SliderValues } from "../renderers/slider/types";

// Course: data-engineering (course 15), chapter 3.3 "Running totals, moving
// averages and frames". A fixed example series of egg prices (shekels per tray)
// for two markets, sorted by market and then by day. The rows of M02 come
// first, then the rows of M03. A moving average of the last N rows is taken at
// four days of M03. Without PARTITION BY market, the first days of M03 reach
// back into the last rows of M02. See spec.md.

/** M02: seven daily egg prices (the first seven rows of the seed-7 series). */
export const M02_PRICES = [23.75, 24.0, 23.0, 23.5, 23.0, 24.5, 23.0] as const;
/** M03: a made-up rise of 0.5 shekels a day, so a wider frame visibly trails. */
export const M03_PRICES = [25.0, 25.5, 26.0, 26.5, 27.0, 27.5, 28.0] as const;
/** The four days of M03 shown as bars (day 1 is the first row of M03). */
export const CHOSEN_DAYS = [1, 3, 5, 7] as const;

export type FrameInputs = {
  /** Rows in the frame: this row and the rows before it. 1 to 7. */
  frame: number;
  /** 1 when the window has PARTITION BY market, 0 when it does not. */
  partition: number;
};

function inputsFrom(values: SliderValues): FrameInputs {
  const num = (v: unknown, fallback: number, min: number, max: number) =>
    typeof v === "number" && Number.isFinite(v) ? Math.min(max, Math.max(min, Math.round(v))) : fallback;
  return { frame: num(values.frame, 3, 1, 7), partition: num(values.partition, 1, 0, 1) };
}

/** The rows the frame covers at one day of M03, as prices in order. */
export function frameRows(frame: number, partition: boolean, day: number): number[] {
  const rows: number[] = partition ? [...M03_PRICES] : [...M02_PRICES, ...M03_PRICES];
  const last = (partition ? 0 : M02_PRICES.length) + day - 1;
  const first = Math.max(0, last - frame + 1);
  return rows.slice(first, last + 1);
}

/** Moving average of the last `frame` rows ending at one day of M03. */
export function movingAverage(frame: number, partition: boolean, day: number): number {
  const rows = frameRows(frame, partition, day);
  return rows.reduce((sum, price) => sum + price, 0) / rows.length;
}

/** How far the average sits below that day's own price. */
export function trail(frame: number, partition: boolean, day: number): number {
  return M03_PRICES[day - 1]! - movingAverage(frame, partition, day);
}

/** How many rows of the day-1 frame belong to M02. Zero when each market has its own window. */
export function rowsFromOtherMarket(frame: number, partition: boolean): number {
  return partition ? 0 : frameRows(frame, partition, 1).length - 1;
}

const money = (n: number) => n.toFixed(2);

export function computeFrame(values: SliderValues): SliderResult {
  const { frame, partition } = inputsFrom(values);
  const byMarket = partition === 1;
  const day1 = movingAverage(frame, byMarket, 1);
  const day7 = movingAverage(frame, byMarket, 7);
  const foreign = rowsFromOtherMarket(frame, byMarket);
  const maxTrail = 2;
  return {
    stats: [
      { label: "Average on day 1", value: money(day1), detail: `M03 price that day: ${money(M03_PRICES[0])}` },
      { label: "Average on day 7", value: money(day7), detail: `M03 price that day: ${money(M03_PRICES[6])}` },
      {
        label: "M02 rows in day 1",
        value: String(foreign),
        detail: foreign === 0 ? "each market has its own window" : "the window crosses into M02",
      },
    ],
    bars: CHOSEN_DAYS.map((day) => {
      const gap = trail(frame, byMarket, day);
      return { label: `Day ${day} trail`, value: gap, display: money(gap), tone: foreign > 0 && day === 1 ? ("bad" as const) : undefined };
    }),
    barMax: maxTrail,
    summary: byMarket
      ? `With PARTITION BY market and a frame of ${frame} ${frame === 1 ? "row" : "rows"}, the average on day 1 is ${money(day1)} and on day 7 it is ${money(day7)}, ${money(trail(frame, true, 7))} below that day's price.`
      : `Without PARTITION BY market and a frame of ${frame} ${frame === 1 ? "row" : "rows"}, the average on day 1 is ${money(day1)}, pulled down by ${foreign} ${foreign === 1 ? "row" : "rows"} of M02, while M03's own price is ${money(M03_PRICES[0])}.`,
  };
}

export function describeFrameChange(before: SliderValues, after: SliderValues): string {
  const a = inputsFrom(before);
  const b = inputsFrom(after);
  if (a.frame === b.frame && a.partition === b.partition) return "Nothing changed.";
  const day1Before = movingAverage(a.frame, a.partition === 1, 1);
  const day1After = movingAverage(b.frame, b.partition === 1, 1);
  const trailBefore = trail(a.frame, a.partition === 1, 7);
  const trailAfter = trail(b.frame, b.partition === 1, 7);
  const parts: string[] = [];
  if (a.frame !== b.frame) {
    const direction = trailAfter > trailBefore ? "wider" : "narrower";
    parts.push(
      `A ${direction} frame (${a.frame} to ${b.frame} rows) moves the day 7 trail from ${money(trailBefore)} to ${money(trailAfter)}: ${trailAfter > trailBefore ? "more rows smooth more and react later" : "fewer rows follow the price more closely"}.`,
    );
  }
  if (a.partition !== b.partition) {
    const foreign = rowsFromOtherMarket(b.frame, b.partition === 1);
    parts.push(
      b.partition === 1
        ? `With PARTITION BY market, day 1 uses only M03's own row, so its average goes from ${money(day1Before)} to ${money(day1After)}.`
        : foreign === 0
          ? `Without PARTITION BY market, a frame of 1 row still uses only the row itself, so day 1 stays at ${money(day1After)}.`
          : `Without PARTITION BY market, day 1 now includes ${foreign} ${foreign === 1 ? "row" : "rows"} of M02, so its average goes from ${money(day1Before)} to ${money(day1After)}.`,
    );
  }
  return parts.join(" ");
}

export const movingAverageFrame: SliderSpec = {
  kind: "slider",
  title: "A wider frame smooths more and reacts later",
  purpose: "Change the number of rows in the frame and turn PARTITION BY market on or off, and watch the moving average of egg prices in market M03.",
  intro:
    "Egg prices in M03 rise by 0.5 shekels a day for seven days (made-up numbers). The rows are sorted by market, so M02's seven rows come just before M03's. The bars show how far the moving average sits below each day's real price. Predict which frame follows the rising price more closely, then turn the partition off.",
  inputs: [
    { id: "frame", label: "Frame size (rows)", min: 1, max: 7, step: 1, default: 3, unit: "rows" },
    { id: "partition", label: "PARTITION BY market: 0 or 1", min: 0, max: 1, step: 1, default: 1, unit: "" },
  ],
  compute: computeFrame,
  describeChange: describeFrameChange,
  barsTitle: "How far the average trails the real price (shekels)",
  tryThis: [
    "With the partition on, lower the frame from 7 rows to 3. The day 7 trail falls from 1.50 to 0.50, because fewer old rows pull the average down.",
    "Set the frame to 7 and turn the partition off. The average on day 1 falls from 25.00 to 23.71, because six rows of M02 now sit inside M03's first window.",
    "Set the frame to 1. The average equals the price on every day, with or without the partition.",
  ],
  limits:
    "This is a simple illustration with made-up prices that rise in a straight line, so the trail is easy to predict. Real prices rise and fall, and a wide frame can hide a real change for several days. It also counts rows, not calendar days: if a day is missing, a frame of 7 rows reaches back one day further.",
};
