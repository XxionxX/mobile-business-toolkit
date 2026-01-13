import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

type Variant = "primary" | "danger" | "neutral" | "ghost";

type Props = {
  title: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export default function AppButton({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  style,
  textStyle,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.base,
        styles[variant],
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={[styles.baseText, styles[`${variant}Text` as const], textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  baseText: {
    fontSize: 16,
    fontWeight: "700",
  },

  primary: { backgroundColor: "#1a73e8" },
  primaryText: { color: "#fff" },

  danger: { backgroundColor: "#c62828" },
  dangerText: { color: "#fff" },

  neutral: { backgroundColor: "#555" },
  neutralText: { color: "#fff" },

  ghost: { backgroundColor: "transparent" },
  ghostText: { color: "#1a73e8" },

  disabled: { opacity: 0.55 },
});
