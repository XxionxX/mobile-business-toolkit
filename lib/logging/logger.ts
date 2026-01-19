import { config } from "../config";

type Level = "debug" | "info" | "warn" | "error";

type LogPayload = {
  level: Level;
  tag?: string;
  message: string;
  data?: unknown[];
  ts: string;
  env: string;
};

function nowIso() {
  return new Date().toISOString();
}

function normalizeMessage(msg: unknown) {
  if (msg instanceof Error) return msg.message || String(msg);
  if (typeof msg === "string") return msg;
  try {
    return JSON.stringify(msg);
  } catch {
    return String(msg);
  }
}

function shouldPrint(level: Level) {
  if (level === "error") return true;
  if (config.feature.loggingVerbose) return true;
  if (config.appEnv === "dev" && (level === "info" || level === "warn")) return true;
  return false;
}

function sink(payload: LogPayload) {
  try {
    const prefix = `[${payload.ts}] [${payload.env}] [${payload.level.toUpperCase()}]`;
    const tag = payload.tag ? ` [${payload.tag}]` : "";
    const line = `${prefix}${tag} ${payload.message}`;

    if (!shouldPrint(payload.level)) return;

    if (payload.level === "error") console.error(line, ...(payload.data ?? []));
    else if (payload.level === "warn") console.warn(line, ...(payload.data ?? []));
    else console.log(line, ...(payload.data ?? []));
  } catch {}
}

function emit(level: Level, tag: string | undefined, msg: unknown, data: unknown[]) {
  const payload: LogPayload = {
    level,
    tag,
    message: normalizeMessage(msg),
    data: data.length ? data : undefined,
    ts: nowIso(),
    env: config.appEnv,
  };
  sink(payload);
}

export const log = {
  debug: (msg: unknown, ...data: unknown[]) => emit("debug", undefined, msg, data),
  info: (msg: unknown, ...data: unknown[]) => emit("info", undefined, msg, data),
  warn: (msg: unknown, ...data: unknown[]) => emit("warn", undefined, msg, data),
  error: (msg: unknown, ...data: unknown[]) => emit("error", undefined, msg, data),
  t: (tag: string) => ({
    debug: (msg: unknown, ...data: unknown[]) => emit("debug", tag, msg, data),
    info: (msg: unknown, ...data: unknown[]) => emit("info", tag, msg, data),
    warn: (msg: unknown, ...data: unknown[]) => emit("warn", tag, msg, data),
    error: (msg: unknown, ...data: unknown[]) => emit("error", tag, msg, data),
  }),
};
