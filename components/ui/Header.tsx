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
          <AppButton
            title="Back"
            variant="ghost"
            onPress={() => router.back()}
            style={styles.backButton}
            textStyle={styles.backButtonText}
            accessibilityLabel="Go back"
          />
        </View>
      ) : null}

      <AppText variant="title">{title}</AppText>
      {subtitle ? <AppText variant="helper">{subtitle}</AppText> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: theme.space[2],
    marginBottom: theme.space[2],
  },
  backRow: {
    alignItems: "flex-start",
    marginBottom: theme.space[2],
  },
  backButton: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.xl,
    paddingVertical: theme.space[2],
    paddingHorizontal: theme.space[3],
    minHeight: 0,
  },
  backButtonText: {
    fontSize: theme.font.helper,
    fontWeight: theme.weight.bold,
  },
});
