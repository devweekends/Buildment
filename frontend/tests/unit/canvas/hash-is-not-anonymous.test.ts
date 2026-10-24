import { describe, expect, it } from "vitest";
import {
  attack,
  computeHash,
  describeHashChange,
  formatDuration,
  hashIsNotAnonymous,
  possibleNumbers,
  secondsToTryAll,
} from "@buildment/learning-ui/canvas/hash-is-not-anonymous/data";
import { defaultValues } from "@buildment/learning-ui/canvas/renderers/slider/model";

const start = defaultValues(hashIsNotAnonymous);

describe("hash-is-not-anonymous model", () => {
  it("starts with 7 unknown digits and a plain hash: 10 million numbers in 11.3 seconds, recovered", () => {
    expect(start).toEqual({ digits: 7, secretKey: 0 });
    expect(possibleNumbers(7)).toBe(10_000_000);
    expect(secondsToTryAll(7)).toBeCloseTo(11.3, 6);
    expect(computeHash(start).stats.map((s) => s.value)).toEqual(["10,000,000", "11.3 s", "Yes"]);
  });

  it("every extra digit multiplies the numbers and the time by ten", () => {
    expect(secondsToTryAll(5)).toBeCloseTo(0.113, 6);
    expect(secondsToTryAll(6)).toBeCloseTo(1.13, 6);
    expect(secondsToTryAll(8)).toBeCloseTo(113, 5);
    expect(secondsToTryAll(9)).toBeCloseTo(1130, 4);
    expect(computeHash({ digits: 8, secretKey: 0 }).stats[1]!.value).toBe("1 min 53 s");
    expect(computeHash({ digits: 9, secretKey: 0 }).stats[1]!.value).toBe("18 min 50 s");
  });

  it("handles the smallest case: 5 digits take a fraction of a second", () => {
    const result = computeHash({ digits: 5, secretKey: 0 });
    expect(result.stats.map((s) => s.value)).toEqual(["100,000", "0.11 s", "Yes"]);
  });

  it("a secret key makes the codes irreversible by guessing at every length", () => {
    for (const digits of [5, 7, 9]) {
      expect(attack({ digits, secretKey: 1 }).reversible).toBe(false);
      const stats = computeHash({ digits, secretKey: 1 }).stats;
      expect(stats[1]!.value).toBe("Not possible");
      expect(stats[2]!.value).toBe("No");
    }
  });

  it("formats durations without rounding up to 60 seconds", () => {
    expect(formatDuration(0.113)).toBe("0.11 s");
    expect(formatDuration(1.13)).toBe("1.1 s");
    expect(formatDuration(11.3)).toBe("11.3 s");
    expect(formatDuration(119.7)).toBe("2 min 0 s");
    expect(formatDuration(3600)).toBe("60 min 0 s");
  });

  it("describes a change in words", () => {
    expect(describeHashChange(start, start)).toBe("Nothing changed.");
    expect(describeHashChange(start, { digits: 8, secretKey: 0 })).toBe(
      "Adding 1 unknown digit makes 10 times as many possible numbers (10,000,000 to 100,000,000). Trying them all takes 10 times as long: 11.3 s to 1 min 53 s.",
    );
    expect(describeHashChange(start, { digits: 7, secretKey: 1 })).toContain("the attacker can no longer test a guess");
    expect(describeHashChange({ digits: 9, secretKey: 0 }, { digits: 7, secretKey: 0 })).toBe(
      "Removing 2 unknown digits leaves 100 times fewer possible numbers (1,000,000,000 to 10,000,000). Trying them all takes 100 times less time: 18 min 50 s to 11.3 s.",
    );
    expect(describeHashChange({ digits: 7, secretKey: 1 }, { digits: 7, secretKey: 0 })).toContain("lets the attacker test guesses again");
  });
});
