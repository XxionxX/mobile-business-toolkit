// lib/calculators/_template/storage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEY = "calc:template:v1";

type Stored = Record<string, any>;

export async function hydrate<T extends Stored>(fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return { ...fallback, ...parsed };
  } catch {
    return fallback;
  }
}

export async function persist(next: Stored) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}
