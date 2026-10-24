import type { SliderResult, SliderSpec, SliderValues } from "../renderers/slider/types";

// Course: data-engineering (course 15), chapter 2.3 "Aggregation traps: NULLs
// and double counting". A bakery's flour price log (a side case, not Mizan):
// every report that has a price says 8.00 shekels, and some reports arrive
// with no price at all. AVG and COUNT(price) skip NULL; COUNT(*) counts rows;
// turning NULL into 0 puts a false 0 into the average. Pure arithmetic. See
// spec.md.

/** Every report that has a price says this, in shekels. */
export const TRUE_PRICE = 8;

export type NullInputs = {
  /** Rows in the table. */
  reports: number;
  /** Rows whose price is missing (NULL). */
  missing: number;
  /** 0: leave NULL as it is. 1: turn NULL into 0 before averaging. */
  asZero: number;
};

export type NullCounts = {
  /** What COUNT(*) returns: every row. */
  rowCount: number;
  /** Rows that really have a price. */
  withPrice: number;
  /** What COUNT(price) returns: values that are not NULL. A 0 is a value. */
  priceCount: number;
  /** What AVG(price) returns with the chosen setting; null means NULL. */
  average: number | null;
  /** AVG when missing prices stay NULL; null when no row has a price. */
  averageLeftAsNull: number | null;
  /** AVG when missing prices become 0. */
  averageTurnedIntoZero: number;
};

/**
 * Missing cannot exceed the number of rows. NULL rows are skipped by AVG and
 * COUNT(price). A 0 is a value, so it counts and pulls the average down.
 */
export function nullCounts({ reports, missing, asZero }: NullInputs): NullCounts {
  const missingRows = Math.max(0, Math.min(missing, reports));
  const withPrice = reports - missingRows;
  const sum = TRUE_PRICE * withPrice;
  const priceCount = asZero >= 1 ? reports : withPrice;
  const averageLeftAsNull = withPrice === 0 ? null : TRUE_PRICE;
  const averageTurnedIntoZero = reports === 0 ? 0 : sum / reports;
  return {
    rowCount: reports,
    withPrice,
    priceCount,
    average: asZero >= 1 ? averageTurnedIntoZero : averageLeftAsNull,
    averageLeftAsNull,
    averageTurnedIntoZero,
  };
}

function inputsFrom(values: SliderValues): NullInputs {
  return {
    reports: values.reports ?? 20,
    missing: values.missing ?? 5,
    asZero: values.asZero ?? 0,
  };
}

/** Two decimals, or NULL when there is no value. */
export function money(value: number | null): string {
  return value === null ? "NULL" : value.toFixed(2);
}

export function computeNullAverage(values: SliderValues): SliderResult {
  const inputs = inputsFrom(values);
  const c = nullCounts(inputs);
  const turnedOn = inputs.asZero >= 1;
  const lowered = c.averageTurnedIntoZero < TRUE_PRICE;

  return {
    stats: [
      { label: "AVG(price)", value: money(c.average), detail: turnedOn ? "missing counted as 0" : "missing rows skipped" },
      { label: "COUNT(*)", value: String(c.rowCount), detail: "every row" },
      { label: "COUNT(price)", value: String(c.priceCount), detail: turnedOn ? "the zeros are values" : "NULL rows skipped" },
    ],
    bars: [
      { label: "True price", value: TRUE_PRICE, display: money(TRUE_PRICE) },
      {
        label: "AVG, left as NULL",
        value: c.averageLeftAsNull ?? 0,
        display: money(c.averageLeftAsNull),
        tone: c.averageLeftAsNull === null ? "warn" : "good",
      },
      {
        label: "AVG, missing as 0",
        value: c.averageTurnedIntoZero,
        display: money(c.averageTurnedIntoZero),
        tone: lowered ? "bad" : undefined,
      },
    ],
    barMax: TRUE_PRICE,
    summary: `Of ${c.rowCount} reports, ${c.withPrice} have a price of ${money(TRUE_PRICE)}. With missing prices ${turnedOn ? "turned into 0" : "left as NULL"}, AVG(price) is ${money(c.average)}, COUNT(*) is ${c.rowCount} and COUNT(price) is ${c.priceCount}.`,
  };
}

function change(name: string, from: string, to: string): string {
  return from === to ? `${name} stayed at ${to}` : `${name} went from ${from} to ${to}`;
}

export function describeNullChange(before: SliderValues, after: SliderValues): string {
  const a = inputsFrom(before);
  const b = inputsFrom(after);
  const changed: string[] = [];
  if (a.reports !== b.reports) changed.push("the number of reports");
  if (a.missing !== b.missing) changed.push("the number of reports with no price");
  if (a.asZero !== b.asZero) changed.push(b.asZero >= 1 ? "turning missing prices into 0" : "leaving missing prices as NULL");
  if (changed.length === 0) return "Nothing changed.";
  const x = nullCounts(a);
  const y = nullCounts(b);
  const what =
    changed.length > 1
      ? "Changing several inputs"
      : changed[0]!.startsWith("the")
        ? `Changing ${changed[0]}`
        : changed[0]!.charAt(0).toUpperCase() + changed[0]!.slice(1);
  const parts = [
    change("AVG(price)", money(x.average), money(y.average)),
    change("COUNT(*)", String(x.rowCount), String(y.rowCount)),
    change("COUNT(price)", String(x.priceCount), String(y.priceCount)),
  ];
  const missingNow = Math.min(b.missing, b.reports);
  let note = "";
  if (b.asZero >= 1 && missingNow > 0) {
    note = ` Each false 0 pulls the average below the true price of ${money(TRUE_PRICE)}.`;
  } else if (b.asZero < 1 && missingNow > 0) {
    note = ` The average still equals the true price, because NULL rows are skipped, but COUNT(price) is lower than COUNT(*).`;
  }
  return `${what}: ${parts[0]}, ${parts[1]}, and ${parts[2]}.${note}`;
}

export const nullAverageTrap: SliderSpec = {
  kind: "slider",
  title: "What a missing price does to an average",
  purpose: "Change how many prices are missing and whether they become 0, and watch AVG, COUNT(*) and COUNT(price) disagree.",
  intro:
    "A bakery's flour log has 20 reports. Every report that has a price says 8.00 shekels, and 5 reports arrived with no price. Predict the average if the missing prices stay NULL, then predict it if someone turns them into 0.",
  inputs: [
    { id: "reports", label: "Price reports", min: 10, max: 40, step: 5, default: 20, unit: "reports" },
    { id: "missing", label: "Reports with no price", min: 0, max: 10, step: 1, default: 5, unit: "reports" },
    { id: "asZero", label: "Missing as 0: 0 no, 1 yes", min: 0, max: 1, step: 1, default: 0, unit: "" },
  ],
  compute: computeNullAverage,
  describeChange: describeNullChange,
  barsTitle: "Average price in shekels",
  tryThis: [
    "Set missing as 0 to 1. The average falls from 8.00 to 6.00 although no real price changed, and COUNT(price) rises from 15 to 20 until it equals COUNT(*).",
    "With missing as 0 still on, raise the reports with no price to 10. The average falls to 4.00. Turn it off again: the average returns to 8.00, but COUNT(price) is 10 while COUNT(*) is 20.",
    "Set price reports to 10 and reports with no price to 10, with missing as 0 off. No row has a price, so AVG(price) is NULL and not 0.",
  ],
  limits:
    "This is a simple illustration with one true price and no real spread of prices. It shows only how NULL and 0 are treated by AVG and COUNT. It does not say how many missing prices a real table has, or whether a missing price should be skipped, filled in or sent back to the source: that is a decision about the data, and the answer depends on why the price is missing.",
};
