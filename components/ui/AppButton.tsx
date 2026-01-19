// components/ui/AppButton.tsx
import React, { useMemo, useRef } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
} from "react-native";
import { theme } from "../../lib/theme";

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
  const scale = useRef(new Animated.Value(1)).current;

  const animateIn = () => {
    Animated.spring(scale, { toValue: 0.98, useNativeDriver: true }).start();
  };
  const animateOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  const textColor = useMemo(() => {
    if (variant === "ghost") return theme.colors.primary;
    return "#fff";
  }, [variant]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        onPressIn={animateIn}
        onPressOut={animateOut}
        style={({ pressed }) => [
          styles.base,
          styles[variant],
          pressed && !disabled && variant !== "ghost" ? styles.pressed : null,
          disabled ? styles.disabled : null,
          style,
        ]}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? title}
        accessibilityState={{ disabled }}
      >
        <Text style={[styles.baseText, { color: textColor }, textStyle]}>
          {title}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: theme.space[4],
    paddingHorizontal: theme.space[4],
    borderRadius: theme.radius.md,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  baseText: {
    fontSize: theme.font.body,
    fontWeight: theme.weight.bold,
  },

  primary: { backgroundColor: theme.colors.primary },
  danger: { backgroundColor: theme.colors.danger },
  neutral: { backgroundColor: theme.colors.neutral },

  ghost: {
    backgroundColor: "transparent",
    paddingVertical: theme.space[3],
  },

  pressed: { opacity: 0.92 },
  disabled: { opacity: 0.55 },
});
