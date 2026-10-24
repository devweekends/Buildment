"use client";

import { cn } from "../../../lib/utils";
import { CanvasFrame, CanvasNotes } from "../../primitives/canvas-frame";
import { StepControls } from "../../primitives/step-controls";
import { KeyboardTip, StepNote } from "../../primitives/step-parts";
import { FOCUS_RING, type Tone } from "../../primitives/tones";
import { useStepper } from "../../primitives/use-stepper";
import { formatCell } from "./model";
import type { DataTable, TableStepsSpec, TableView } from "./types";

/** Pale row backgrounds for the rows a step is about. Always paired with a text marker. */
const ROW_TONE: Record<Tone, string> = {
  accent: "bg-blue-50 dark:bg-blue-500/15",
  good: "bg-emerald-50 dark:bg-emerald-500/15",
  warn: "bg-amber-50 dark:bg-amber-500/15",
  bad: "bg-red-50 dark:bg-red-500/15",
};

const MARK_TONE: Record<Tone, string> = {
  accent: "text-blue-700 dark:text-blue-300",
  good: "text-emerald-700 dark:text-emerald-300",
  warn: "text-amber-800 dark:text-amber-200",
  bad: "text-red-700 dark:text-red-300",
};

/**
 * A step-through over small tables. Each step shows one or two tables, marks
 * the rows it is about, strikes through rows it drops, and can grow a result
 * table row by row. The note under the tables says what happened and why.
 */
export function TableStepsCanvas({ spec }: { spec: TableStepsSpec }) {
  const stepper = useStepper(spec.steps.length);
  const step = spec.steps[stepper.active];
  if (!step) return null;
  const tables = new Map(spec.tables.map((table) => [table.id, table]));

  return (
    <CanvasFrame eyebrow="Walkthrough" title={spec.title} purpose={spec.purpose}>
      <div
        role="group"
        aria-roledescription="step-through"
        aria-label={spec.title}
        tabIndex={0}
        onKeyDown={stepper.onKeyDown}
        className={cn("space-y-4 rounded-xl", FOCUS_RING)}
      >
        <p className="sr-only">{spec.summary}</p>
        <div className={cn("grid gap-3", step.views.length > 1 && "sm:grid-cols-2")}>
          {step.views.map((view) => {
            const table = tables.get(view.table);
            return table ? <TableCard key={view.table} table={table} view={view} /> : null;
          })}
        </div>

        <StepNote
          index={stepper.active}
          count={spec.steps.length}
          title={step.title}
          note={step.note}
          chips={step.chips}
          outcome={step.outcome}
          tone={step.tone}
        />

        <StepControls stepper={stepper} titles={spec.steps.map((s) => s.title)} />
        <KeyboardTip />
      </div>
      <div className="mt-4">
        <CanvasNotes tryThis={spec.tryThis} limits={spec.limits} />
      </div>
    </CanvasFrame>
  );
}

function TableCard({ table, view }: { table: DataTable; view: TableView }) {
  const order = view.rows ?? table.rows.map((_, index) => index);
  const highlight = new Set(view.highlight ?? []);
  const dropped = new Set(view.dropped ?? []);
  const tone = view.tone ?? "accent";

  return (
    <figure className="min-w-0 rounded-xl border border-border bg-background/60 p-2 sm:p-3">
      <figcaption className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 px-1">
        <span className="font-mono text-sm font-semibold text-foreground">{table.title}</span>
        <span className="text-xs text-muted-foreground">{view.caption ?? `${order.length - dropped.size} rows`}</span>
      </figcaption>
      <table className="w-full border-collapse text-left text-[13px] leading-snug sm:text-sm">
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="w-7 px-1 py-1.5">
              <span className="sr-only">Mark</span>
            </th>
            {table.columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cn(
                  "px-1.5 py-1.5 font-mono text-xs font-semibold text-muted-foreground",
                  column.align === "right" && "text-right"
                )}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {order.length === 0 ? (
            <tr>
              <td colSpan={table.columns.length + 1} className="px-1.5 py-3 text-center text-xs text-muted-foreground">
                No rows yet
              </td>
            </tr>
          ) : (
            order.map((index) => {
              const row = table.rows[index] ?? {};
              const isDropped = dropped.has(index);
              const isLit = highlight.has(index) && !isDropped;
              return (
                <tr
                  key={index}
                  className={cn(
                    "border-b border-border/60 last:border-b-0 transition-colors duration-200 motion-reduce:transition-none",
                    isLit && ROW_TONE[tone],
                    isDropped && "bg-muted/60"
                  )}
                >
                  <td className="px-1 py-1.5 text-center align-top text-[11px] font-semibold">
                    {isDropped ? (
                      <span className="text-muted-foreground">out</span>
                    ) : isLit ? (
                      <span className={MARK_TONE[tone]} aria-label="This step">
                        {"▶"}
                      </span>
                    ) : null}
                  </td>
                  {table.columns.map((column) => {
                    const value = row[column.key];
                    return (
                      <td
                        key={column.key}
                        className={cn(
                          "break-words px-1.5 py-1.5 align-top font-mono tabular-nums text-foreground",
                          column.align === "right" && "text-right",
                          (value === null || value === undefined) && "italic text-muted-foreground",
                          isDropped && "line-through decoration-2"
                        )}
                      >
                        {formatCell(value)}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </figure>
  );
}
