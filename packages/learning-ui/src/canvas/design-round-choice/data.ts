import type { FactorSpec } from "../renderers/factor/types";

// Data Engineering course, chapter 12.4 "The pipeline design round and your
// project story". A pharmacy owner asks for a stock report. The three ways to
// run the pipeline are scored 1 to 5 on three criteria; the scores are the
// course's judgment for a small team, not measurements. The numbers in the
// "try this" lines are worked out in spec.md. See spec.md.
export const designRoundChoice: FactorSpec = {
  kind: "factor",
  title: "Daily, hourly or streaming: what matters most?",
  purpose: "See how the weight you give fresh data, cost and the team's skills changes which way of running a pipeline comes out ahead.",
  whatThisShows:
    "Each way of running the pipeline has a score from 1 to 5 on three criteria. Each score is multiplied by how much that criterion matters, and the results are added up. Change one weight, and every total that uses it moves.",
  options: [
    { id: "daily", name: "Daily batch" },
    { id: "hourly", name: "Hourly micro-batch" },
    { id: "streaming", name: "Streaming" },
  ],
  criteria: [
    { id: "fresh", name: "Fresh data", weight: 1, scores: { daily: 1, hourly: 3, streaming: 5 } },
    { id: "cost", name: "Low cost to run", weight: 2, scores: { daily: 5, hourly: 4, streaming: 2 } },
    { id: "team", name: "Small team can run it", weight: 2, scores: { daily: 5, hourly: 4, streaming: 1 } },
  ],
  weightLevels: [
    { value: 1, label: "Nice to have" },
    { value: 2, label: "Important" },
    { value: 3, label: "Very important" },
  ],
  scoreScale: { min: 1, max: 5 },
  unit: "points",
  tryThis: [
    "Start where the owner needs yesterday's stock each morning: Fresh data at 1. Daily batch leads with 21 points, Hourly micro-batch has 19 and Streaming 11.",
    "Raise Fresh data to 3. Hourly micro-batch moves ahead, 25 points to 23, because it is fresher than a daily run and still cheap for a small team.",
    "Keep Fresh data at 3 and lower Low cost to run and Small team can run it to 1. Now Streaming leads, 18 points to 17: it wins only when speed is everything and cost and skills hardly matter.",
  ],
  limits:
    "The scores are the course's own judgment for a small team, not measurements, and the model treats them as exact. It cannot see late data, reruns, backfills or privacy, which you must still name in the answer. A gap of one or two points means the options are close, and a tie means the question needs more facts.",
};
