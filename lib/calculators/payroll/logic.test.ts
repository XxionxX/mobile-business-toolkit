import {
  calculatePayroll,
  safeDivisionWarning,
  formatCurrency,
  formatPercentage,
  formatHours,
} from "./logic";

describe("payroll logic", () => {
  test("calculatePayroll computes payroll dollars and hours", () => {
    const r = calculatePayroll({
      sales: "1000",
      percent: "0.1",
      hourlyCost: "20",
    });

    expect(r.payroll).toBeCloseTo(100, 10);
    expect(r.hours).toBeCloseTo(5, 10);
  });

  test("safeDivisionWarning warns when hourly cost is 0", () => {
    const r = calculatePayroll({
      sales: "1000",
      percent: "0.1",
      hourlyCost: "0",
    });

    expect(r.hours).toBe(0);
    expect(safeDivisionWarning(r.hours, "0")).toBe(
      "Hourly cost must be greater than 0."
    );
  });

  test("formatters behave for empty and numeric values", () => {
    expect(formatCurrency("")).toBe("");
    expect(formatCurrency("$1,000")).toBe("$1,000.00");

    expect(formatPercentage("")).toBe("");
    expect(formatPercentage("12.5")).toBe("12.5%");

    expect(formatHours(5)).toBe("5.00");
  });
});
