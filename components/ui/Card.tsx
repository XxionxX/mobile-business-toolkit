// components/ui/Card.tsx
import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";
import { theme } from "../../lib/theme";
import AppText from "./AppText";

type Props = ViewProps & {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function Card({ title, subtitle, style, children, ...rest }: Props) {
  return (
    <View style={[styles.card, style]} {...rest}>
      {title ? <AppText variant="section">{title}</AppText> : null}
      {subtitle ? <AppText variant="helper">{subtitle}</AppText> : null}
      <View style={styles.body}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.space[4],
  },
  body: {
    marginTop: theme.space[3],
  },
});
