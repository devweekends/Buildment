import { describe, expect, it } from "vitest";
import {
  BATCH,
  computeDelivery,
  deliver,
  deliveryGuarantees,
  describeDeliveryChange,
} from "@buildment/learning-ui/canvas/delivery-guarantees/data";
import { defaultValues } from "@buildment/learning-ui/canvas/renderers/slider/model";
import type { DeliveryInputs } from "@buildment/learning-ui/canvas/delivery-guarantees/data";

const start = defaultValues(deliveryGuarantees) as DeliveryInputs;

describe("delivery-guarantees model", () => {
  it("starts with the chapter 10.3 case: position saved first, crash before the work, 10 readings lost", () => {
    expect(start).toEqual({ workFirst: 0, crash: 1, safeToRepeat: 0 });
    expect(BATCH).toBe(10);
    expect(deliver(start)).toEqual({ timesWorked: 0, lost: 10, duplicates: 0, finalRows: 0, guarantee: "at most once" });
    expect(computeDelivery(start).stats.map((s) => s.value)).toEqual(["10", "0", "0"]);
  });

  it("try this 2: work first loses nothing on an early crash and doubles the batch on a late crash", () => {
    expect(deliver({ workFirst: 1, crash: 1, safeToRepeat: 0 })).toMatchObject({ lost: 0, duplicates: 0, finalRows: 10, guarantee: "at least once" });
    expect(deliver({ workFirst: 1, crash: 2, safeToRepeat: 0 })).toMatchObject({ lost: 0, duplicates: 10, finalRows: 20, guarantee: "at least once" });
  });

  it("try this 3: a safe sink makes the repeat harmless but cannot bring back lost readings", () => {
    expect(deliver({ workFirst: 1, crash: 2, safeToRepeat: 1 })).toMatchObject({ lost: 0, duplicates: 0, finalRows: 10, guarantee: "effectively once" });
    expect(deliver({ workFirst: 0, crash: 1, safeToRepeat: 1 })).toMatchObject({ lost: 10, duplicates: 0, finalRows: 0, guarantee: "at most once" });
  });

  it("with no crash every order gives 10 rows and nothing lost or doubled", () => {
    for (const workFirst of [0, 1]) {
      for (const safeToRepeat of [0, 1]) {
        expect(deliver({ workFirst, crash: 0, safeToRepeat })).toMatchObject({ lost: 0, duplicates: 0, finalRows: 10 });
      }
    }
  });

  it("saving first and crashing after the work loses and doubles nothing", () => {
    expect(deliver({ workFirst: 0, crash: 2, safeToRepeat: 0 })).toMatchObject({ lost: 0, duplicates: 0, finalRows: 10 });
  });

  it("never gives a negative count or a table larger than twice the batch", () => {
    for (const workFirst of [0, 1]) {
      for (const crash of [0, 1, 2]) {
        for (const safeToRepeat of [0, 1]) {
          const o = deliver({ workFirst, crash, safeToRepeat });
          expect(o.lost).toBeGreaterThanOrEqual(0);
          expect(o.duplicates).toBeGreaterThanOrEqual(0);
          expect(o.finalRows).toBeLessThanOrEqual(2 * BATCH);
          expect(o.finalRows - o.duplicates + o.lost).toBe(BATCH);
        }
      }
    }
  });

  it("describes a change in words", () => {
    expect(describeDeliveryChange(start, { ...start, workFirst: 1 })).toBe(
      "Changing the order of the two steps: lost went from 10 to 0, duplicate rows from 0 to 0, and rows in the table from 0 to 10. Nothing was lost, and the batch was written once.",
    );
    expect(describeDeliveryChange({ workFirst: 1, crash: 1, safeToRepeat: 0 }, { workFirst: 1, crash: 2, safeToRepeat: 0 })).toBe(
      "Changing where the crash happens: lost went from 0 to 0, duplicate rows from 0 to 10, and rows in the table from 10 to 20. The work was done before the position was saved, so after the crash the batch was read and written again.",
    );
    expect(describeDeliveryChange(start, start)).toBe("Nothing changed.");
  });
});
