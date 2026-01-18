// components/ui/Header.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import AppText from "./AppText";
import AppButton from "./AppButton";
import { theme } from "../../lib/theme";

type Props = {
  title: string;
  subtitle?: string;
  showBack?: boolean;
};

export default function Header({ title, subtitle, showBack = false }: Props) {
  return (
    <View style={styles.wrap}>
      {showBack ? (
        <View style={styles.backRow}>
          <AppButton title="Back" variant="ghost" onPress={() => router.back()} />
        </View>
      ) : null}

      <AppText variant="title">{title}</AppText>
      {subtitle ? <AppText variant="helper">{subtitle}</AppText> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: theme.space[2],
  },
  backRow: {
    alignItems: "flex-start",
    marginBottom: theme.space[2],
  },
});
