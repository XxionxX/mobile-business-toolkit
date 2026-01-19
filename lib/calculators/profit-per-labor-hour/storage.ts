// lib/calculators/profit-per-labor-hour/storage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEY = "calc:profit-per-labor-hour:v1";

export type ProfitStored = {
  revenue: string;
  cogs: string;
  otherCosts: string;
  laborHours: string;
  profit: string;
  profitPerHour: string;
  warnings: string[];
};

export const PROFIT_DEFAULTS: ProfitStored = {
  revenue: "",
  cogs: "",
  otherCosts: "",
  laborHours: "",
  profit: "",
  profitPerHour: "",
  warnings: [],
};

export async function hydrateProfit(): Promise<ProfitStored> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return PROFIT_DEFAULTS;
    const parsed = JSON.parse(raw);
    return { ...PROFIT_DEFAULTS, ...parsed };
  } catch {
    return PROFIT_DEFAULTS;
  }
}

export async function persistProfit(next: ProfitStored) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}
