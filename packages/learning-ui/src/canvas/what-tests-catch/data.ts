import type { SliderResult, SliderSpec, SliderValues } from "../renderers/slider/types";

// Course: data-engineering (course 15), chapter 7.3 "Tests, contracts and docs".
// The fact table has three tests. A duplicated report_id breaks `unique`, a row
// with no market breaks `relationships`, and a wrong price that looks normal
// breaks nothing. See spec.md.

export type TestInputs = {
  /** Extra rows that repeat a report_id already in the table. */
  duplicates: number;
  /** Rows whose market_key matches no row in dim_market. */
  orphans: number;
  /** Rows with a wrong price that is above 0 and looks normal. */
  wrongPrices: number;
};

export type TestOutcome = {
  /** Tests that fail, out of TESTS_IN_FACT. */
  failing: number;
  /** Bad rows that a failing test points at. */
  flagged: number;
  /** Bad rows that no test points at. */
  missed: number;
  /** Every bad row in the table. */
  badRows: number;
};

/** unique(report_id), relationships(market_key to dim_market), and price above 0. */
export const TESTS_IN_FACT = 3;

/**
 * Toy rule: a test fails when at least one row breaks its rule, and then it
 * points at every row of that kind. The price test only fails for a price of 0
 * or less, and a wrong price that looks normal is above 0, so no test fails
 * for it.
 */
export function testOutcome({ duplicates, orphans, wrongPrices }: TestInputs): TestOutcome {
  const failing = (duplicates > 0 ? 1 : 0) + (orphans > 0 ? 1 : 0);
  const flagged = duplicates + orphans;
  return { failing, flagged, missed: wrongPrices, badRows: flagged + wrongPrices };
}

function inputsFrom(values: SliderValues): TestInputs {
  return {
    duplicates: values.duplicates ?? 10,
    orphans: values.orphans ?? 4,
    wrongPrices: values.wrongPrices ?? 6,
  };
}

function rows(count: number): string {
  return count === 1 ? "1 row" : `${count} rows`;
}

export function computeTests(values: SliderValues): SliderResult {
  const inputs = inputsFrom(values);
  const out = testOutcome(inputs);
  const stateOfRun = out.failing === 0 ? "all pass" : `${out.failing} fail`;

  let summary: string;
  if (out.badRows === 0) {
    summary = "The table has no bad rows, and all 3 tests pass.";
  } else if (out.failing === 0) {
    summary = `All 3 tests pass, yet ${rows(out.missed)} with a wrong price are in the table.`;
  } else if (out.missed === 0) {
    summary = `${out.failing} of 3 tests fail and they point at all ${rows(out.flagged)} that are bad.`;
  } else {
    summary = `${out.failing} of 3 tests fail and they point at ${rows(out.flagged)}, but ${rows(out.missed)} with a wrong price are not flagged by any test.`;
  }

  return {
    stats: [
      { label: "Tests failing", value: `${out.failing} of ${TESTS_IN_FACT}`, detail: stateOfRun },
      { label: "Bad rows flagged", value: String(out.flagged), detail: `of ${out.badRows} bad rows` },
      { label: "Bad rows missed", value: String(out.missed), detail: out.missed > 0 ? "every test passes on them" : "none" },
    ],
    bars: [
      { label: "Duplicates", value: inputs.duplicates, display: inputs.duplicates > 0 ? `${inputs.duplicates} flagged` : "0" },
      { label: "No market", value: inputs.orphans, display: inputs.orphans > 0 ? `${inputs.orphans} flagged` : "0" },
      { label: "Wrong prices", value: inputs.wrongPrices, display: inputs.wrongPrices > 0 ? `${inputs.wrongPrices} missed` : "0", tone: inputs.wrongPrices > 0 ? "bad" : undefined },
    ],
    barMax: 40,
    summary,
  };
}

export function describeTestsChange(before: SliderValues, after: SliderValues): string {
  const a = inputsFrom(before);
  const b = inputsFrom(after);
  const x = testOutcome(a);
  const y = testOutcome(b);
  const changed: string[] = [];
  if (a.duplicates !== b.duplicates) changed.push("the duplicates");
  if (a.orphans !== b.orphans) changed.push("the rows with no market");
  if (a.wrongPrices !== b.wrongPrices) changed.push("the wrong prices");
  if (changed.length === 0) return "Nothing changed.";
  const moved = changed.length === 1 ? `Changing ${changed[0]}` : "Changing several inputs";

  if (y.badRows === 0) {
    return `${moved} leaves a clean table, so all 3 tests pass and nothing is hidden.`;
  }
  if (y.failing === 0) {
    return `${moved}: no test fails, yet ${rows(y.missed)} with a wrong price stay in the table. A test checks a rule you wrote, and a normal-looking price breaks none of them.`;
  }
  const failingText = x.failing === y.failing ? `${y.failing} of 3 tests still fail` : `${y.failing} of 3 tests now fail (before: ${x.failing})`;
  if (y.missed === 0) {
    return `${moved}: ${failingText}, and they point at all ${rows(y.flagged)} that are bad.`;
  }
  return `${moved}: ${failingText}. They point at ${rows(y.flagged)}, and ${rows(y.missed)} with a wrong price still pass every test.`;
}

export const whatTestsCatch: SliderSpec = {
  kind: "slider",
  title: "What the tests on the fact table catch",
  purpose: "Add duplicates, rows with no market and normal-looking wrong prices, and see which problems the three tests point at.",
  intro:
    "In this example the fact table has 2,620 rows and three tests: report_id is unique, every market_key exists in dim_market, and the price is above 0. It holds 10 duplicated report_id rows, 4 rows with no market and 6 wrong prices that look normal. Predict how many of the 20 bad rows the tests point at, then change the numbers.",
  inputs: [
    { id: "duplicates", label: "Duplicate report_id rows", min: 0, max: 40, step: 2, default: 10, unit: "rows" },
    { id: "orphans", label: "Rows with no market", min: 0, max: 40, step: 2, default: 4, unit: "rows" },
    { id: "wrongPrices", label: "Wrong but normal prices", min: 0, max: 40, step: 2, default: 6, unit: "rows" },
  ],
  compute: computeTests,
  describeChange: describeTestsChange,
  barsTitle: "Bad rows by kind",
  tryThis: [
    "Leave the defaults: 10 duplicates, 4 rows with no market and 6 wrong prices. Two tests fail and flag 14 of the 20 bad rows. The 6 wrong prices pass every test.",
    "Set the wrong prices to 0. The same two tests fail, and now they point at all 14 bad rows.",
    "Set the duplicates and the rows with no market to 0, and keep 6 wrong prices. All 3 tests pass, and the table still holds 6 bad rows.",
  ],
  limits:
    "This is a simple illustration, not a measurement. It counts one bad row for each fault and treats a failing test as pointing at every row of its kind, while a real test returns only the rows that broke its rule. A real table has other faults too, and a test for a normal price range could flag some wrong prices, but a wrong price inside the range passes that test as well.",
};
