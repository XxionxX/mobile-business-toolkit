// lib/calculators/revenue-hours/storage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEY = "calc:revenue-hours:v1";

export const REVENUE_HOURS_DEFAULTS = {
  revenueTarget: "",
  salesPerLaborHour: "",
  hours: "",
  warnings: [] as string[],
};

export type RevenueHoursState = typeof REVENUE_HOURS_DEFAULTS;

export async function hydrateRevenueHours(): Promise<RevenueHoursState> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...REVENUE_HOURS_DEFAULTS };

    const parsed = JSON.parse(raw) ?? {};
    return {
      ...REVENUE_HOURS_DEFAULTS,
      revenueTarget: parsed.revenueTarget ?? "",
      salesPerLaborHour: parsed.salesPerLaborHour ?? "",
      hours: parsed.hours ?? "",
      warnings: Array.isArray(parsed.warnings) ? parsed.warnings : [],
    };
  } catch {
    return { ...REVENUE_HOURS_DEFAULTS };
  }
}

export async function persistRevenueHours(next: RevenueHoursState): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}
