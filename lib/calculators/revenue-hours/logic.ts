// lib/calculators/revenue-hours/logic.ts
import { parseNumber, formatCurrency, formatHours } from "../../formatting";

type Inputs = {
  revenueTarget: string;        // raw user input
  salesPerLaborHour: string;    // raw user input ($ per labor hour)
};

export function calculateRevenueHours(input: Inputs) {
  const revenueTarget = parseNumber(input.revenueTarget);
  const salesPerLaborHour = parseNumber(input.salesPerLaborHour);

  const warnings: string[] = [];

  if (salesPerLaborHour <= 0) warnings.push("Sales per labor hour must be greater than 0.");
  if (revenueTarget <= 0) warnings.push("Revenue target is 0 (or invalid).");

  const hours = salesPerLaborHour > 0 ? revenueTarget / salesPerLaborHour : 0;

  return { revenueTarget, salesPerLaborHour, hours, warnings };
}

export function formatResults(r: ReturnType<typeof calculateRevenueHours>) {
  return {
    // Keep these in case you want a “formatted results” block or copy text later
    revenueTarget: formatCurrency(r.revenueTarget),
    salesPerLaborHour: formatCurrency(r.salesPerLaborHour),

    // This is the one you display in the Results field
    hours: formatHours(r.hours),
  };
}
