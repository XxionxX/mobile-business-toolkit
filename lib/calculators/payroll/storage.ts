// lib/calculators/payroll/storage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEY = "payroll-data";

export type PayrollStored = {
  sales: string;
  percent: string;
  hourlyCost: string;
  payrollDollars: string;
  teamHours: string;
};

export const PAYROLL_DEFAULTS: PayrollStored = {
  sales: "",
  percent: "",
  hourlyCost: "",
  payrollDollars: "",
  teamHours: "",
};

export async function hydratePayroll(): Promise<PayrollStored> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return PAYROLL_DEFAULTS;
    const parsed = JSON.parse(raw);
    return { ...PAYROLL_DEFAULTS, ...parsed };
  } catch {
    return PAYROLL_DEFAULTS;
  }
}

export async function persistPayroll(next: PayrollStored) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}
