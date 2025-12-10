// app/calculators/payroll/logic.ts

export function calculatePayroll({ sales, percent, hourlyCost }) {
  const s = parseNumber(sales);
  const p = parseNumber(percent);
  const h = parseNumber(hourlyCost);

  const payroll = s * p; // payroll dollars
  const hours = h > 0 ? payroll / h : 0;

  return { payroll, hours };
}

export function safeDivisionWarning(hours, hourlyCost) {
  if (parseNumber(hourlyCost) === 0)
    return "Hourly cost must be greater than 0.";
  if (hours === Infinity || isNaN(hours))
    return "Calculation invalid — check inputs.";
  return "";
}

export function parseNumber(str: string) {
  return parseFloat(
    (str || "")
      .replace(/[^0-9.-]/g, "")
      .trim()
  ) || 0;
}

// --- Formatting ---
export function formatCurrency(value: string | number) {
  const n = parseNumber(value);
  if (!value) return "";
  return "$" + n.toLocaleString(undefined, { minimumFractionDigits: 2 });
}

export function formatPercentage(value: string | number) {
  const n = parseNumber(value);
  if (!value) return "";
  return n + "%";
}

export function formatHours(value: number) {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
