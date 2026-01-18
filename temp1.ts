// lib/ui/theme.ts
export const colors = {
  bg: "#fafafa",
  surface: "#ffffff",
  text: "#111111",
  subtext: "#666666",
  border: "#cfcfcf",
  placeholder: "#8a8a8a",

  primary: "#1a73e8",
  danger: "#c62828",
  neutral: "#555555",

  warnBg: "#fff5f5",
  warnBorder: "#f0b7b7",
  warnText: "#b71c1c",
};

export const space = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
};

export const radius = {
  sm: 10,
  md: 12,
  lg: 16,
};

export const font = {
  title: 28,
  section: 18,
  label: 15,
  body: 16,
  helper: 13,
};

export const weight = {
  regular: "400" as const,
  medium: "600" as const,
  bold: "700" as const,
  heavy: "900" as const,
};

export const theme = { colors, space, radius, font, weight };
export type Theme = typeof theme;
