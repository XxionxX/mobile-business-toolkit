// lib/errors/log.ts

export function logError(err: unknown, info?: unknown) {
  // Central place for error reporting later (Sentry, Supabase logs, etc.)
  // For now: console + minimal structure.
  try {
    console.error("[AppError]", err);
    if (info) console.error("[AppErrorInfo]", info);
  } catch {
    // ignore logging failures
  }
}
