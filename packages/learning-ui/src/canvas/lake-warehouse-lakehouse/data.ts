import type { FactorSpec } from "../renderers/factor/types";

// Course: data-engineering (course 15), chapter 5.4 "Lakes, warehouses and
// lakehouses". The scores are the course's judgement for a small team that
// stores files, not measurements. The default weights describe Mizan today:
// storage must be cheap and the files open, fast SQL matters, and safe updates
// matter least. See spec.md.
export const lakeWarehouseLakehouse: FactorSpec = {
  kind: "factor",
  title: "Lake, warehouse or lakehouse: what matters to you?",
  purpose: "See how the weight you give each need changes which storage design comes out ahead.",
  whatThisShows:
    "Each design has a score from 1 to 5 on four needs. Each score is multiplied by how much that need matters to the team, and the results are added up. Change one weight and every total that uses it moves, so the best design depends on what matters, not on the design alone.",
  options: [
    { id: "lake", name: "Lake" },
    { id: "warehouse", name: "Warehouse" },
    { id: "lakehouse", name: "Lakehouse" },
  ],
  criteria: [
    { id: "cheap-storage", name: "Cheap raw storage", weight: 3, scores: { lake: 5, warehouse: 2, lakehouse: 4 } },
    { id: "fast-sql", name: "Fast SQL and access control", weight: 2, scores: { lake: 2, warehouse: 5, lakehouse: 3 } },
    { id: "open-formats", name: "Open file formats", weight: 3, scores: { lake: 5, warehouse: 1, lakehouse: 4 } },
    { id: "safe-updates", name: "Safe updates and schema changes", weight: 1, scores: { lake: 1, warehouse: 5, lakehouse: 4 } },
  ],
  weightLevels: [
    { value: 1, label: "Nice to have" },
    { value: 2, label: "Important" },
    { value: 3, label: "Very important" },
  ],
  scoreScale: { min: 1, max: 5 },
  unit: "points",
  tryThis: [
    "Start with the weights as they are, which describe Mizan today. The lake leads the lakehouse by 1 point (35 to 34), and the warehouse is far behind at 24.",
    "Raise Safe updates and schema changes from 1 to 3. The lakehouse now leads with 42 points, ahead of the lake on 37 and the warehouse on 34.",
    "Set Cheap raw storage to 1, Fast SQL and access control to 3, Open file formats to 1 and Safe updates to 3. Now the warehouse leads with 33 points, ahead of the lakehouse on 29 and the lake on 19.",
  ],
  limits:
    "The scores are the course's judgement for a small team, not measurements, and real products differ from these three ideas. The model leaves out the work of running each design, the skills of the team and the money each one costs. A lead of one or two points means more than one design is reasonable.",
};
