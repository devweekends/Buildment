import { TABLE_LIMITS, type TableCell, type TableStepsSpec } from "./types";

/** How a cell is shown: NULL for null, numbers as written, text as is. */
export function formatCell(value: TableCell | undefined): string {
  if (value === null || value === undefined) return "NULL";
  return String(value);
}

/**
 * Problems with a table-steps spec, as plain sentences. An empty list means the
 * spec is safe to draw: every view points at a real table, every row index
 * exists, and every table fits a phone.
 */
export function tableStepsProblems(spec: TableStepsSpec): string[] {
  const problems: string[] = [];
  const byId = new Map(spec.tables.map((table) => [table.id, table]));
  if (byId.size !== spec.tables.length) problems.push("two tables share an id");
  for (const table of spec.tables) {
    if (table.columns.length > TABLE_LIMITS.maxColumns) problems.push(`${table.id} has more than ${TABLE_LIMITS.maxColumns} columns`);
    if (table.rows.length > TABLE_LIMITS.maxRows) problems.push(`${table.id} has more than ${TABLE_LIMITS.maxRows} rows`);
    const keys = new Set(table.columns.map((column) => column.key));
    table.rows.forEach((row, index) => {
      for (const key of Object.keys(row)) if (!keys.has(key)) problems.push(`${table.id} row ${index} has unknown column ${key}`);
    });
  }
  if (spec.steps.length < 2) problems.push("a walkthrough needs at least two steps");
  spec.steps.forEach((step, stepIndex) => {
    if (step.views.length < 1 || step.views.length > TABLE_LIMITS.maxViews) problems.push(`step ${stepIndex + 1} shows ${step.views.length} tables`);
    for (const view of step.views) {
      const table = byId.get(view.table);
      if (!table) {
        problems.push(`step ${stepIndex + 1} shows unknown table ${view.table}`);
        continue;
      }
      const all = [...(view.rows ?? []), ...(view.highlight ?? []), ...(view.dropped ?? [])];
      for (const index of all) {
        if (!Number.isInteger(index) || index < 0 || index >= table.rows.length) problems.push(`step ${stepIndex + 1} uses row ${index} of ${table.id}`);
      }
      if (view.rows) {
        const shown = new Set(view.rows);
        for (const index of [...(view.highlight ?? []), ...(view.dropped ?? [])]) {
          if (!shown.has(index)) problems.push(`step ${stepIndex + 1} marks row ${index} of ${table.id} that it does not show`);
        }
      }
    }
  });
  return problems;
}
