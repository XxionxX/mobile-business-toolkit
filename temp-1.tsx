// components/ui/Button.tsx
import React from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

type Variant = "primary" | "secondary" | "danger" | "neutral";

export function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  style,
}: {
  title: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  style?: ViewStyle;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.base,
        styles[variant],
        disabled && styles.disabled,
        style,
      ]}
      activeOpacity={0.85}
    >
      <Text style={[styles.textBase, styles[`${variant}Text` as const]]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  primary: { backgroundColor: "#1A73E8" },
  primaryText: { color: "#FFFFFF" },

  danger: { backgroundColor: "#C62828" },
  dangerText: { color: "#FFFFFF" },

  neutral: { backgroundColor: "#4B5563" },
  neutralText: { color: "#FFFFFF" },

  secondary: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#1A73E8",
  },
  secondaryText: { color: "#1A73E8" },

  textBase: {
    fontWeight: "800",
    fontSize: 16,
  },

  disabled: {
    opacity: 0.45,
  },
});
