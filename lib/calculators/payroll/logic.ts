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

function parseNumber(input: unknown): number {
  if (input === null || input === undefined) return 0;

  // If it's already a number, just return it (and guard NaN)
  if (typeof input === "number") return Number.isFinite(input) ? input : 0;

  // Coerce everything else to string safely
  const str = String(input);

  const cleaned = str.replace(/[^0-9.-]/g, "").trim();
  const n = parseFloat(cleaned);

  return Number.isFinite(n) ? n : 0;
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
