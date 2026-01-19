// lib/config/runtime.ts

type FeatureFlags = {
  supabaseEnabled: boolean;
  loggingVerbose: boolean;
};

export type RuntimeConfig = {
  appName: string;
  appEnv: "dev" | "prod" | "staging";
  feature: FeatureFlags;

  // Supabase (Phase 4 will use these)
  supabaseUrl: string;
  supabaseAnonKey: string;
};

function toBool(v: string | undefined, fallback: boolean) {
  if (v == null) return fallback;
  const s = v.trim().toLowerCase();
  if (["1", "true", "yes", "y", "on"].includes(s)) return true;
  if (["0", "false", "no", "n", "off"].includes(s)) return false;
  return fallback;
}

function toEnv(v: string | undefined): RuntimeConfig["appEnv"] {
  const s = (v ?? "").trim().toLowerCase();
  if (s === "prod" || s === "production") return "prod";
  if (s === "staging" || s === "stage") return "staging";
  return "dev";
}

function requiredWhen(enabled: boolean, value: string | undefined, name: string) {
  const v = (value ?? "").trim();
  if (!enabled) return "";
  if (!v) throw new Error(`[config] Missing required env: ${name}`);
  return v;
}

// Expo best-practice: EXPO_PUBLIC_* vars are available at runtime in JS.
function readEnv() {
  const env = (globalThis as any)?.process?.env ?? {};
  return env as Record<string, string | undefined>;
}

let _cached: RuntimeConfig | null = null;

export function getConfig(): RuntimeConfig {
  if (_cached) return _cached;

  const env = readEnv();

  const supabaseEnabled = toBool(env.EXPO_PUBLIC_SUPABASE_ENABLED, false);
  const loggingVerbose = toBool(env.EXPO_PUBLIC_LOG_VERBOSE, false);

  const cfg: RuntimeConfig = {
    appName: env.EXPO_PUBLIC_APP_NAME?.trim() || "Mobile Business Toolkit",
    appEnv: toEnv(env.EXPO_PUBLIC_APP_ENV),

    feature: {
      supabaseEnabled,
      loggingVerbose,
    },

    supabaseUrl: requiredWhen(supabaseEnabled, env.EXPO_PUBLIC_SUPABASE_URL, "EXPO_PUBLIC_SUPABASE_URL"),
    supabaseAnonKey: requiredWhen(supabaseEnabled, env.EXPO_PUBLIC_SUPABASE_ANON_KEY, "EXPO_PUBLIC_SUPABASE_ANON_KEY"),
  };

  _cached = cfg;
  return cfg;
}

// Convenience exports
export const config = getConfig();
export const feature = getConfig().feature;
