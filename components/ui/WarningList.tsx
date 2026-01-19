import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "./AppText";
import { theme } from "../../lib/theme";

type Props = {
  warnings?: string[];
};

export default function WarningList({ warnings }: Props) {
  if (!warnings || warnings.length === 0) return null;

  return (
    <View style={styles.box} accessibilityRole="alert">
      {warnings.map((w, i) => (
        <AppText key={`${i}-${w}`} variant="error">
          {w}
        </AppText>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    marginTop: theme.space[3],
    padding: theme.space[4],
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.warningBg,
    borderWidth: 1,
    borderColor: theme.colors.warningBorder,
  },
});
