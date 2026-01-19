// components/ui/AppText.tsx
import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";
import { theme } from "../../lib/theme";

type Variant = "title" | "section" | "label" | "body" | "helper" | "error";

type Props = TextProps & {
  variant?: Variant;
};

export default function AppText({ variant = "body", style, ...props }: Props) {
  return <Text {...props} style={[styles.base, styles[variant], style]} />;
}

const styles = StyleSheet.create({
  base: {
    color: theme.colors.text,
  },
  title: {
    fontSize: theme.font.title,
    fontWeight: theme.weight.heavy,
   // marginTop: theme.space[2],
    marginBottom: theme.space[3],
  },
  section: {
    fontSize: theme.font.section,
    fontWeight: theme.weight.bold,
  },
  label: {
    fontSize: theme.font.label,
    fontWeight: theme.weight.bold,
    marginBottom: theme.space[2],
  },
  body: {
    fontSize: theme.font.body,
    fontWeight: theme.weight.regular,
  },
  helper: {
    marginTop: theme.space[2],
    color: theme.colors.subtext,
    fontSize: theme.font.helper,
    fontWeight: theme.weight.medium,
  },
  error: {
    marginTop: theme.space[2],
    color: theme.colors.danger,
    fontSize: theme.font.helper,
    fontWeight: theme.weight.medium,
  },
});
