// lib/calculators/_shared/storage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Generic “stored shape” type.
 * We store string fields + arrays/objects as needed; keep it flexible.
 */
export type StoredRecord = Record<string, any>;

export async function safeGetItem(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key);
  } catch {
    return null;
  }
}

export async function safeSetItem(key: string, value: string): Promise<void> {
  try {
    await AsyncStorage.setItem(key, value);
  } catch {
    // ignore persistence failures
  }
}

/**
 * Hydrate an object from AsyncStorage with defaults.
 * - Returns defaults if missing/corrupt
 * - Merges parsed values over defaults
 */
export async function hydrateWithDefaults<T extends StoredRecord>(
  key: string,
  defaults: T
): Promise<T> {
  const raw = await safeGetItem(key);
  if (!raw) return defaults;

  try {
    const parsed = JSON.parse(raw) as Partial<T>;
    return { ...defaults, ...(parsed ?? {}) };
  } catch {
    return defaults;
  }
}

/**
 * Persist the full object for a given key.
 */
export async function persistRecord<T extends StoredRecord>(
  key: string,
  next: T
): Promise<void> {
  await safeSetItem(key, JSON.stringify(next));
}

/**
 * Small factory to standardize per-calculator storage modules.
 */
export function createStorage<T extends StoredRecord>(key: string, defaults: T) {
  return {
    STORAGE_KEY: key,
    DEFAULTS: defaults,
    hydrate: () => hydrateWithDefaults<T>(key, defaults),
    persist: (next: T) => persistRecord<T>(key, next),
  } as const;
}
