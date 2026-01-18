// lib/theme/tokens.ts

export const tokens = {
  colors: {
    bg: "#F6F7F9",
    surface: "#FFFFFF",
    text: "#111111",
    subtext: "#555555",
    placeholder: "#8A8A8A",
    border: "#E6E7EA",

    primary: "#1A73E8",
    danger: "#C62828",
    neutral: "#555555",

    warningBg: "#FFF5F5",
    warningBorder: "#F0B7B7",
    warningText: "#B71C1C",
  },

  // spacing scale (index-based so your existing theme.space[4] style works)
  space: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
  } as const,

  radius: {
    sm: 10,
    md: 12,
    lg: 14,
    xl: 16,
  },

  font: {
    title: 26,
    section: 16,
    label: 15,
    body: 16,
    helper: 13,
  },

  weight: {
    regular: "400",
    medium: "600",
    bold: "700",
    heavy: "900",
  } as const,
};

export type Tokens = typeof tokens;
