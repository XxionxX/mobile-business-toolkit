// components/ui/Card.tsx
import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { theme } from "../../lib/ui/theme";

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export default function Card({ children, style }: Props) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.space[4],
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
});
