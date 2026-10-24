import type { FactorSpec } from "../renderers/factor/types";

// Course: data-engineering (course 15), chapter 4.2 "OLTP and OLAP: two jobs,
// two designs". Two designs for Mizan's data are scored on four criteria from
// 1 to 5. The scores are teaching judgments, not measurements. The start
// weights describe Karam's app, where single-row changes matter most; the
// winner flips when the weight on report queries goes up. See spec.md.
export const oltpOrStar: FactorSpec = {
  kind: "factor",
  title: "Which design fits which job?",
  purpose: "Change how much each need matters and see when the app's normalised tables or a star schema comes out ahead.",
  whatThisShows:
    "Each design has a score from 1 to 5 on four needs. Each score is multiplied by how much that need matters, and the results are added up. The normalised app schema stores each fact once and changes one row fast. The star schema is shaped for reports and keeps history.",
  options: [
    { id: "normalised", name: "Normalised app schema" },
    { id: "star", name: "Star schema" },
  ],
  criteria: [
    { id: "updates", name: "Quick single-row updates", weight: 2, scores: { normalised: 5, star: 2 } },
    { id: "no-repeats", name: "No repeated values", weight: 1, scores: { normalised: 5, star: 2 } },
    { id: "reports", name: "Simple report queries", weight: 1, scores: { normalised: 2, star: 5 } },
    { id: "history", name: "Keeping history", weight: 1, scores: { normalised: 2, star: 5 } },
  ],
  weightLevels: [
    { value: 1, label: "Nice to have" },
    { value: 2, label: "Important" },
    { value: 3, label: "Very important" },
  ],
  scoreScale: { min: 1, max: 5 },
  unit: "points",
  tryThis: [
    "Raise Simple report queries to Very important. The star schema takes the lead, 26 points to 23.",
    "Set Simple report queries to Important. It is a tie at 21 points: the weights alone do not decide it, so the job has to.",
    "Put Simple report queries back to Nice to have and raise Quick single-row updates to Very important. The normalised schema leads by 6 points, 24 to 18.",
  ],
  limits:
    "The scores are teaching judgments for Mizan's tables, not measurements, and the model treats them as exact. Real projects often keep both designs: the app writes to normalised tables and a pipeline copies the data into a star schema for reports. A gap of one or two points means both designs are reasonable.",
};
