import { describe, expect, it } from "vitest";
import {
  attemptTimes,
  computeOutage,
  describeOutageChange,
  retryBackoffOutage,
  retryOutcome,
} from "@buildment/learning-ui/canvas/retry-backoff-outage/data";
import { defaultValues } from "@buildment/learning-ui/canvas/renderers/slider/model";

const start = defaultValues(retryBackoffOutage);

describe("retry-backoff-outage model", () => {
  it("starts with chapter 9.3's example: a 20 minute outage, 3 retries, a first wait of 5 minutes", () => {
    expect(start).toEqual({ outageMinutes: 20, retries: 3, firstWaitMinutes: 5 });
    expect(attemptTimes(3, 5)).toEqual([0, 5, 15, 35]);
    const outcome = retryOutcome({ outageMinutes: 20, retries: 3, firstWaitMinutes: 5 });
    expect(outcome.succeeded).toBe(true);
    expect(outcome.attempts).toBe(4);
    expect(outcome.finishMinutes).toBe(35);
    expect(outcome.lastRetryConstant).toBe(15);
    expect(computeOutage(start).stats.map((s) => s.value)).toEqual(["4", "yes", "35 min"]);
  });

  it("try this 2: a 40 minute outage beats 3 retries, and a fourth retry at minute 75 works", () => {
    const failed = retryOutcome({ outageMinutes: 40, retries: 3, firstWaitMinutes: 5 });
    expect(failed.succeeded).toBe(false);
    expect(failed.attempts).toBe(4);
    expect(failed.finishMinutes).toBe(35);
    expect(computeOutage({ ...start, outageMinutes: 40 }).stats.map((s) => s.value)).toEqual(["4", "no", "35 min"]);
    const worked = retryOutcome({ outageMinutes: 40, retries: 4, firstWaitMinutes: 5 });
    expect(worked.succeeded).toBe(true);
    expect(worked.attempts).toBe(5);
    expect(worked.finishMinutes).toBe(75);
  });

  it("try this 3: no outage means the first attempt works and nothing is retried", () => {
    const outcome = retryOutcome({ outageMinutes: 0, retries: 3, firstWaitMinutes: 5 });
    expect(outcome.succeeded).toBe(true);
    expect(outcome.attempts).toBe(1);
    expect(outcome.finishMinutes).toBe(0);
  });

  it("an attempt that starts exactly when the outage ends works", () => {
    const outcome = retryOutcome({ outageMinutes: 35, retries: 3, firstWaitMinutes: 5 });
    expect(outcome.succeeded).toBe(true);
    expect(outcome.attempts).toBe(4);
  });

  it("handles the extremes without NaN: no retries, and the largest waits", () => {
    const none = retryOutcome({ outageMinutes: 120, retries: 0, firstWaitMinutes: 15 });
    expect(none).toMatchObject({ attempts: 1, succeeded: false, finishMinutes: 0, lastRetryDoubling: 0, lastRetryConstant: 0 });
    const largest = retryOutcome({ outageMinutes: 120, retries: 5, firstWaitMinutes: 15 });
    expect(largest.lastRetryDoubling).toBe(465);
    expect(largest.attempts).toBe(5);
    expect(largest.finishMinutes).toBe(225);
    const result = computeOutage({ outageMinutes: 0, retries: 0, firstWaitMinutes: 1 });
    for (const stat of result.stats) expect(stat.value).not.toMatch(/NaN|Infinity/);
  });

  it("equal waits reach less far than doubling waits", () => {
    const outcome = retryOutcome({ outageMinutes: 20, retries: 3, firstWaitMinutes: 5 });
    expect(outcome.lastRetryDoubling).toBeGreaterThan(outcome.lastRetryConstant);
  });

  it("describes a change in words", () => {
    expect(describeOutageChange(start, { ...start, outageMinutes: 40 })).toBe(
      "Changing the outage length: the last retry now starts at minute 35. The outage still lasts until minute 40, so all 4 attempts fail and the task gives up.",
    );
    expect(describeOutageChange({ ...start, outageMinutes: 40 }, { ...start, outageMinutes: 40, retries: 4 })).toBe(
      "Changing the number of retries: the last retry now starts at minute 75 (before: minute 35). The outage ends at minute 40, so the task works on attempt 5.",
    );
    expect(describeOutageChange(start, start)).toBe("Nothing changed.");
  });
});
