// lib/formatting.ts
// NOTE: Non-sensitive formatting helpers only. Safe for AsyncStorage use.

export function parseNumber(input: string | number | null | undefined): number {
  if (typeof input === "number") return Number.isFinite(input) ? input : 0;
  const s = String(input ?? "");
  const cleaned = s.replace(/[^0-9.-]/g, "").trim();
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
}

export function formatCurrency(input: string | number): string {
  const n = parseNumber(input);
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function formatHours(value: number) {
  const n = parseNumber(value);
  return n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatPercentage(input: string | number): string {
  const n = parseNumber(input);
  const s = n.toFixed(2);
  return s.replace(/\.00$/, "").replace(/(\.\d)0$/, "$1");
}
