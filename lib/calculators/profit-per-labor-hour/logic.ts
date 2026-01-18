// lib/calculators/profit-per-labor-hour/logic.ts
import { parseNumber, formatCurrency, formatNumber, formatHours } from "../../formatting";

type Inputs = {
  revenue: string;
  cogs: string;
  otherCosts: string; // optional: rent, supplies, fees, etc.
  laborHours: string;
};

export function calculateProfitPerLaborHour(input: Inputs) {
  const revenue = parseNumber(input.revenue);
  const cogs = parseNumber(input.cogs);
  const otherCosts = parseNumber(input.otherCosts);
  const laborHours = parseNumber(input.laborHours);

  const profit = revenue - cogs - otherCosts;

  const profitPerHour = laborHours > 0 ? profit / laborHours : 0;

  const warnings: string[] = [];
  if (laborHours <= 0) warnings.push("Labor hours must be greater than 0 to compute per-hour values.");
  if (revenue <= 0) warnings.push("Revenue is 0 (or invalid). Double-check the inputs.");
  if (profit < 0) warnings.push("Profit is negative. This may be expected, but verify costs.");

  return {
    revenue,
    cogs,
    otherCosts,
    laborHours,
    profit,
    profitPerHour,
    warnings,
  };
}

export function formatResults(r: ReturnType<typeof calculateProfitPerLaborHour>) {
  return {
    profit: formatCurrency(r.profit),
    profitPerHour: formatCurrency(r.profitPerHour),
    laborHours: formatHours(r.laborHours),
    revenue: formatCurrency(r.revenue),
    cogs: formatCurrency(r.cogs),
    otherCosts: formatCurrency(r.otherCosts),
  };
}
