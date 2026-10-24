import type { Tone } from "../../primitives/tones";

/** One column of a small table. Keep labels short so four or five columns fit a phone. */
export type TableColumn = {
  key: string;
  label: string;
  /** Numbers read best right-aligned. Defaults to left. */
  align?: "left" | "right";
};

export type TableCell = string | number | null;

/**
 * A small table the steps can show: at most 5 columns and 10 rows, so it fits
 * a 375px screen without scrolling sideways. A null cell is drawn as NULL.
 */
export type DataTable = {
  id: string;
  title: string;
  columns: TableColumn[];
  rows: Record<string, TableCell>[];
};

/** How one table looks at one step. */
export type TableView = {
  /** Id of a table in the spec. */
  table: string;
  /** Row indexes to show, in this order. Defaults to every row. Lets a result table grow step by step. */
  rows?: number[];
  /** Row indexes to mark as the rows this step is about. */
  highlight?: number[];
  /** Colour of the highlight: accent by default; good, warn or bad only when it means that. */
  tone?: Tone;
  /** Row indexes that this step drops (for example a duplicate removed): drawn struck through and labelled. */
  dropped?: number[];
  /** Short text next to the table title for this step, for example "3 rows". */
  caption?: string;
};

export type TableStep = {
  title: string;
  note: string;
  /** One or two tables, side by side on wide screens and stacked on a phone. */
  views: TableView[];
  chips?: string[];
  tone?: Tone;
  outcome?: string;
};

/**
 * A step-through over small tables: joins, window functions, deduplication,
 * incremental loads and history rows, where the claim is about which rows
 * appear, match, repeat or disappear. HTML tables, so screen readers and
 * phones handle them natively.
 */
export type TableStepsSpec = {
  kind: "table-steps";
  title: string;
  /** One sentence shown under the title. */
  purpose: string;
  /** One sentence describing the whole walkthrough, for screen readers. */
  summary: string;
  tables: DataTable[];
  steps: TableStep[];
  tryThis?: string[];
  limits: string;
};

export const TABLE_LIMITS = { maxColumns: 5, maxRows: 10, maxViews: 2 } as const;
