import { calculateRevenueHours, formatResults } from "./logic";

describe("revenue-hours logic", () => {
  test("calculateRevenueHours computes hours", () => {
    const r = calculateRevenueHours({
      revenueTarget: "1000",
      salesPerLaborHour: "250",
    });

    expect(r.hours).toBeCloseTo(4, 10);
    expect(r.warnings).toEqual([]);
  });

  test("warnings appear for invalid inputs", () => {
    const r = calculateRevenueHours({
      revenueTarget: "0",
      salesPerLaborHour: "0",
    });

    expect(r.hours).toBe(0);
    expect(r.warnings).toEqual([
      "Sales per labor hour must be greater than 0.",
      "Revenue target is 0 (or invalid).",
    ]);
  });

  test("formatResults returns formatted strings", () => {
    const r = calculateRevenueHours({
      revenueTarget: "1000",
      salesPerLaborHour: "250",
    });

    const f = formatResults(r);
    expect(typeof f.revenueTarget).toBe("string");
    expect(typeof f.salesPerLaborHour).toBe("string");
    expect(typeof f.hours).toBe("string");
    expect(f.hours).toBe("4.00");
  });
});
