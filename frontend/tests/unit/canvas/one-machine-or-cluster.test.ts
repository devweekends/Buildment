import { describe, expect, it } from "vitest";
import {
  computeScale,
  describeScaleChange,
  formatSeconds,
  oneMachineOrCluster,
  scaleTimes,
} from "@buildment/learning-ui/canvas/one-machine-or-cluster/data";
import { defaultValues } from "@buildment/learning-ui/canvas/renderers/slider/model";

const start = defaultValues(oneMachineOrCluster);

describe("one-machine-or-cluster model", () => {
  it("starts with chapter 10.4's example: 200 GB, 20 percent of the columns, 4 machines", () => {
    expect(start).toEqual({ sizeGb: 200, columnPercent: 20, machines: 4 });
    const t = scaleTimes(start as { sizeGb: number; columnPercent: number; machines: number });
    expect(t.neededGb).toBe(40);
    expect(t.oneMachineSeconds).toBe(80);
    expect(t.clusterSeconds).toBe(88);
    expect(t.clusterOverheadSeconds).toBe(68);
    expect(t.faster).toBe("one machine");
    expect(computeScale(start).stats.map((s) => s.value)).toEqual(["80 s", "88 s", "One machine"]);
  });

  it("try this 2: reading all the columns makes the cluster faster, 400 s against 168 s", () => {
    const t = scaleTimes({ sizeGb: 200, columnPercent: 100, machines: 4 });
    expect(t.oneMachineSeconds).toBe(400);
    expect(t.clusterSeconds).toBe(168);
    expect(t.faster).toBe("cluster");
    expect(formatSeconds(400)).toBe("6.7 min");
    expect(formatSeconds(168)).toBe("2.8 min");
  });

  it("try this 3: more machines can make the cluster slower: 4 gives 88 s, 8 gives 86 s, 16 gives 97 s", () => {
    expect(scaleTimes({ sizeGb: 200, columnPercent: 20, machines: 4 }).clusterSeconds).toBe(88);
    expect(scaleTimes({ sizeGb: 200, columnPercent: 20, machines: 8 }).clusterSeconds).toBe(86);
    expect(scaleTimes({ sizeGb: 200, columnPercent: 20, machines: 16 }).clusterSeconds).toBe(97);
  });

  it("the same query reads the same GB whatever the table size if the share changes to match", () => {
    expect(scaleTimes({ sizeGb: 1000, columnPercent: 20, machines: 4 }).neededGb).toBe(200);
    expect(scaleTimes({ sizeGb: 1000, columnPercent: 20, machines: 4 }).faster).toBe("cluster");
    expect(scaleTimes({ sizeGb: 200, columnPercent: 100, machines: 4 }).neededGb).toBe(200);
  });

  it("handles the minimum and maximum inputs without NaN", () => {
    const small = scaleTimes({ sizeGb: 10, columnPercent: 5, machines: 2 });
    expect(small.oneMachineSeconds).toBe(1);
    expect(small.clusterSeconds).toBe(64.5);
    expect(small.faster).toBe("one machine");
    const large = scaleTimes({ sizeGb: 1000, columnPercent: 100, machines: 16 });
    expect(large.oneMachineSeconds).toBe(2000);
    expect(large.clusterSeconds).toBe(217);
    expect(large.faster).toBe("cluster");
    const result = computeScale({ sizeGb: 1000, columnPercent: 100, machines: 16 });
    for (const stat of result.stats) expect(stat.value).not.toMatch(/NaN|Infinity/);
  });

  it("a tie goes to one machine", () => {
    // 2 machines and 64 GB needed: one machine 128 s, cluster 64 + 64 = 128 s.
    const t = scaleTimes({ sizeGb: 640, columnPercent: 10, machines: 2 });
    expect(t.oneMachineSeconds).toBe(128);
    expect(t.clusterSeconds).toBe(128);
    expect(t.faster).toBe("one machine");
  });

  it("describes a change in words", () => {
    expect(describeScaleChange(start, { ...start, columnPercent: 100 })).toBe(
      "Changing the share of columns read: the query now reads 200 GB (before: 40 GB), one machine takes 6.7 min and the cluster 2.8 min. The faster choice changed to the cluster.",
    );
    expect(describeScaleChange(start, { ...start, machines: 16 })).toBe(
      "Changing the number of machines: the query still reads 40 GB, one machine takes 80 s and the cluster 97 s. One machine is still faster.",
    );
    expect(describeScaleChange(start, start)).toBe("Nothing changed.");
  });
});
