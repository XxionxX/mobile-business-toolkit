// lib/calculators/revenue-hours/logic.ts
import { parseNumber, formatCurrency, formatHours } from "../../formatting";

type Inputs = {
  revenueTarget: string;
  salesPerLaborHour: string; // $ per labor hour
};

export function calculateRevenueHours(input: Inputs) {
  const revenueTarget = parseNumber(input.revenueTarget);
  const salesPerLaborHour = parseNumber(input.salesPerLaborHour);

  const hours = salesPerLaborHour > 0 ? revenueTarget / salesPerLaborHour : 0;

  const warnings: string[] = [];
  if (salesPerLaborHour <= 0) warnings.push("Sales per labor hour must be greater than 0.");
  if (revenueTarget <= 0) warnings.push("Revenue target is 0 (or invalid).");

  return { revenueTarget, salesPerLaborHour, hours, warnings };
}

export function formatResults(r: ReturnType<typeof calculateRevenueHours>) {
  return {
    revenueTarget: formatCurrency(r.revenueTarget),
    salesPerLaborHour: formatCurrency(r.salesPerLaborHour),
    hours: formatHours(r.hours),
  };
}
