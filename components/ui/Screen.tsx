// components/ui/Screen.tsx
import React from "react";
import { View, ScrollView, StyleSheet, ViewStyle } from "react-native";
import AppText from "./AppText";
import { theme } from "../../lib/theme";

type Props = {
  children: React.ReactNode;
  scroll?: boolean;
  contentStyle?: ViewStyle | ViewStyle[];
};

export default function Screen({ children, scroll = true, contentStyle }: Props) {
  // Defensive: if a stray string/number gets rendered, wrap it.
  const safeChildren =
    typeof children === "string" || typeof children === "number" ? (
      <AppText>{String(children)}</AppText>
    ) : (
      children
    );

  if (scroll) {
    return (
      <ScrollView
        contentContainerStyle={[styles.container, contentStyle as any]}
        keyboardShouldPersistTaps="handled"
      >
        {safeChildren}
      </ScrollView>
    );
  }

  return <View style={[styles.container, contentStyle as any]}>{safeChildren}</View>;
}

const styles = StyleSheet.create({
  container: {
    padding: theme.space[7],
    paddingBottom: theme.space[8],
    backgroundColor: theme.colors.bg,
    flexGrow: 1,
  },
});
