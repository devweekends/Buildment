import type { SliderResult, SliderSpec, SliderValues } from "../renderers/slider/types";

// Course: data-engineering (course 15), chapter 10.4 "When one machine is not enough".
// A toy time model with made-up speeds. One machine reads the columns a query
// needs at a fixed speed. A cluster reads in parallel but pays a start-up
// time and a coordination time for every machine. The defaults are the
// chapter's example: 200 GB, a query that reads 20 percent of the columns,
// a cluster of 4 machines. See spec.md. The speeds are illustrative, not measured.

/** Each machine reads this much of the needed columns per second. */
export const READ_GB_PER_SECOND = 0.5;
/** The cluster needs this long before it starts reading. */
export const CLUSTER_STARTUP_SECONDS = 60;
/** Every machine in the cluster adds this much coordination time. */
export const COORDINATION_SECONDS_PER_MACHINE = 2;

export type ScaleInputs = {
  /** Size of the table on disk, in GB. */
  sizeGb: number;
  /** Share of the table's columns that the query reads, 5 to 100. */
  columnPercent: number;
  /** Machines in the cluster, 2 to 16. */
  machines: number;
};

export type ScaleTimes = {
  /** GB the query must read after skipping the columns it does not use. */
  neededGb: number;
  oneMachineSeconds: number;
  clusterSeconds: number;
  /** Start-up plus coordination, the part of the cluster time that is not reading. */
  clusterOverheadSeconds: number;
  faster: "one machine" | "cluster";
};

/**
 * One machine: needed GB / 0.5 GB per second.
 * Cluster: 60 s start-up + needed GB / (0.5 GB per second x machines) + 2 s x machines.
 * A tie goes to one machine, because it is simpler to run.
 */
export function scaleTimes({ sizeGb, columnPercent, machines }: ScaleInputs): ScaleTimes {
  const neededGb = (sizeGb * columnPercent) / 100;
  const oneMachineSeconds = neededGb / READ_GB_PER_SECOND;
  const clusterOverheadSeconds = CLUSTER_STARTUP_SECONDS + COORDINATION_SECONDS_PER_MACHINE * machines;
  const clusterSeconds = clusterOverheadSeconds + neededGb / (READ_GB_PER_SECOND * machines);
  return {
    neededGb,
    oneMachineSeconds,
    clusterSeconds,
    clusterOverheadSeconds,
    faster: oneMachineSeconds <= clusterSeconds ? "one machine" : "cluster",
  };
}

function inputsFrom(values: SliderValues): ScaleInputs {
  return { sizeGb: values.sizeGb ?? 200, columnPercent: values.columnPercent ?? 20, machines: values.machines ?? 4 };
}

/** Under two minutes in whole seconds, otherwise minutes with one decimal. */
export function formatSeconds(seconds: number): string {
  if (seconds < 120) return `${Math.round(seconds)} s`;
  return `${(seconds / 60).toFixed(1)} min`;
}

export function formatGb(gb: number): string {
  return `${gb.toLocaleString("en-US", { maximumFractionDigits: 1 })} GB`;
}

export function computeScale(values: SliderValues): SliderResult {
  const inputs = inputsFrom(values);
  const t = scaleTimes(inputs);
  const gap = Math.abs(t.clusterSeconds - t.oneMachineSeconds);
  const winnerTone = (name: "one machine" | "cluster") => (t.faster === name ? "good" : undefined);

  return {
    stats: [
      { label: "One machine", value: formatSeconds(t.oneMachineSeconds), detail: `reads ${formatGb(t.neededGb)}` },
      { label: `Cluster of ${inputs.machines}`, value: formatSeconds(t.clusterSeconds), detail: `${formatSeconds(t.clusterOverheadSeconds)} of start-up and coordination` },
      { label: "Faster choice", value: t.faster === "one machine" ? "One machine" : "Cluster", detail: `by ${formatSeconds(gap)}` },
    ],
    bars: [
      { label: "One machine", value: t.oneMachineSeconds, display: formatSeconds(t.oneMachineSeconds), tone: winnerTone("one machine") },
      { label: "Cluster, total", value: t.clusterSeconds, display: formatSeconds(t.clusterSeconds), tone: winnerTone("cluster") },
      { label: "Cluster, start-up and coordination", value: t.clusterOverheadSeconds, display: formatSeconds(t.clusterOverheadSeconds) },
    ],
    barMax: Math.max(1, t.oneMachineSeconds, t.clusterSeconds),
    summary: `The query reads ${formatGb(t.neededGb)}. One machine takes ${formatSeconds(t.oneMachineSeconds)} and a cluster of ${inputs.machines} takes ${formatSeconds(t.clusterSeconds)}, so ${t.faster === "one machine" ? "one machine" : "the cluster"} is faster by ${formatSeconds(gap)}.`,
  };
}

export function describeScaleChange(before: SliderValues, after: SliderValues): string {
  const a = inputsFrom(before);
  const b = inputsFrom(after);
  const changed: string[] = [];
  if (a.sizeGb !== b.sizeGb) changed.push("the data size");
  if (a.columnPercent !== b.columnPercent) changed.push("the share of columns read");
  if (a.machines !== b.machines) changed.push("the number of machines");
  if (changed.length === 0) return "Nothing changed.";
  const x = scaleTimes(a);
  const y = scaleTimes(b);
  const moved = changed.length === 1 ? `Changing ${changed[0]}` : "Changing several inputs";
  const reads = x.neededGb === y.neededGb ? `the query still reads ${formatGb(y.neededGb)}` : `the query now reads ${formatGb(y.neededGb)} (before: ${formatGb(x.neededGb)})`;
  const times = `one machine takes ${formatSeconds(y.oneMachineSeconds)} and the cluster ${formatSeconds(y.clusterSeconds)}`;
  const verdict =
    y.faster === x.faster
      ? `${y.faster === "one machine" ? "One machine" : "The cluster"} is still faster.`
      : `The faster choice changed to ${y.faster === "one machine" ? "one machine" : "the cluster"}.`;
  return `${moved}: ${reads}, ${times}. ${verdict}`;
}

export const oneMachineOrCluster: SliderSpec = {
  kind: "slider",
  title: "One machine or a cluster: a toy time model",
  purpose: "Change the data size, the share of columns the query reads and the size of the cluster, and compare the two times under made-up speeds.",
  intro:
    "A table is 200 GB on disk. A report reads 20 percent of its columns, so it needs 40 GB. In this toy model one machine reads 0.5 GB per second. A cluster of 4 machines reads four times as fast but needs 60 seconds to start and adds 2 seconds of coordination per machine. Predict which finishes first, then move the sliders.",
  inputs: [
    { id: "sizeGb", label: "Data size", min: 10, max: 1000, step: 10, default: 200, unit: "GB" },
    { id: "columnPercent", label: "Share of columns read", min: 5, max: 100, step: 5, default: 20, unit: "%" },
    { id: "machines", label: "Machines in the cluster", min: 2, max: 16, step: 1, default: 4, unit: "machines" },
  ],
  compute: computeScale,
  describeChange: describeScaleChange,
  barsTitle: "Time to answer the query",
  tryThis: [
    "Leave the defaults. The query needs 40 GB: one machine takes 80 seconds and the cluster takes 88 seconds, so one machine is faster even though the table is 200 GB.",
    "Raise the share of columns read to 100 percent. The query now needs all 200 GB: one machine takes 400 seconds and the cluster 168 seconds. The size on disk did not change; what the query reads did.",
    "Go back to 20 percent and raise the cluster from 4 to 16 machines. The cluster time goes from 88 seconds to 97 seconds, because each machine adds coordination time that the shorter reading does not repay.",
  ],
  limits:
    "This is a simple illustration with made-up speeds, not a measurement, and it gives no size at which a cluster is worth its cost. Real speeds depend on the disk, the query, the file layout and how data moves between machines. The model ignores memory limits, joins that move data between machines, and the cost of running a cluster. Measure your own query on your own machine before you decide.",
};
