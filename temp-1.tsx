import React from "react";
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

type Variant = "primary" | "danger" | "neutral" | "ghost";

type Props = {
  title: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
};

export default function AppButton({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  style,
  textStyle,
  accessibilityLabel,
}: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        disabled && styles.disabled,

        // ✅ press feedback: opacity + subtle scale
        pressed && !disabled && styles.pressed,

        style,
      ]}
    >
      <Text style={[styles.baseText, styles[`${variant}Text` as const], textStyle]}>
        {title}
      </Text>
    </Pressable>
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

  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.985 }],
  },

  primary: { backgroundColor: "#1a73e8" },
  primaryText: { color: "#fff" },

  danger: { backgroundColor: "#c62828" },
  dangerText: { color: "#fff" },

  neutral: { backgroundColor: "#555" },
  neutralText: { color: "#fff" },

  ghost: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#cfcfcf",
  },
  ghostText: { color: "#1a73e8" },

  disabled: { opacity: 0.55 },
});
