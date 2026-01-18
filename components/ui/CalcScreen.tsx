// components/ui/CalcScreen.tsx
import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import Screen from "./Screen";
import Header from "./Header";
import ToastHost from "./Toast";
import { theme } from "../../lib/theme";

type Props = {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  children: React.ReactNode;
  contentStyle?: ViewStyle;
};

export default function CalcScreen({
  title,
  subtitle,
  showBack = true,
  children,
  contentStyle,
}: Props) {
  return (
    <View style={{ flex: 1 }}>
      <Screen contentStyle={[styles.content, contentStyle]}>
        {/* HEADER ROW */}
        <View style={styles.headerRow}>
          <View style={styles.headerGrow}>
            <Header title={title} subtitle={subtitle} />
          </View>

          {showBack ? (
            <View style={styles.backSlot}>
              {/* Header already knows how to render Back */}
              <Header title="" showBack />
            </View>
          ) : null}
        </View>

        {children}
      </Screen>

      <ToastHost />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: theme.space[4],
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  headerGrow: {
    flex: 1,
    paddingRight: theme.space[3],
  },

  backSlot: {
    alignSelf: "flex-start",
  },
});
