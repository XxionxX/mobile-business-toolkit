// lib/errors/log.ts
import { log } from "../logging";

export function logError(err: unknown, info?: unknown) {
  try {
    log.error(err, info);
  } catch {
    // Never allow logging to crash the app
  }
}
