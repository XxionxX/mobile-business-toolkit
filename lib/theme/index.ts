// lib/theme/index.ts
export { tokens } from "./tokens";

// keep backwards-compat with your existing code expecting `theme`
import { tokens } from "./tokens";
export const theme = tokens;
