// components/ui/Screen.tsx
import React from "react";
import { View, ScrollView, StyleSheet, ViewStyle } from "react-native";
import { theme } from "../../lib/theme";

type Props = {
  children: React.ReactNode;
  scroll?: boolean;
  contentStyle?: ViewStyle;
};

export default function Screen({ children, scroll = true, contentStyle }: Props) {
  if (scroll) {
    return (
      <ScrollView
        contentContainerStyle={[styles.container, contentStyle]}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    );
  }

  return <View style={[styles.container, contentStyle]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    padding: theme.space[7],
    paddingBottom: theme.space[8],
    backgroundColor: theme.colors.bg,
    flexGrow: 1,
  },
});
