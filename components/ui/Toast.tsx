import React, { useCallback, useRef, useState } from "react";
import { Animated, StyleSheet, Text, ViewStyle } from "react-native";

type ToastType = "success" | "info" | "error";

let _showToast: ((msg: string, type?: ToastType) => void) | null = null;

export function showToast(message: string, type: ToastType = "success") {
  _showToast?.(message, type);
}

export default function ToastHost() {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<ToastType>("success");
  const [visible, setVisible] = useState(false);

  const y = useRef(new Animated.Value(18)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const hide = useCallback(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 0, duration: 160, useNativeDriver: true }),
      Animated.timing(y, { toValue: 18, duration: 160, useNativeDriver: true }),
    ]).start(() => setVisible(false));
  }, [opacity, y]);

  const show = useCallback(
    (msg: string, t: ToastType = "success") => {
      setMessage(msg);
      setType(t);
      setVisible(true);

      opacity.setValue(0);
      y.setValue(18);

      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 160, useNativeDriver: true }),
        Animated.timing(y, { toValue: 0, duration: 160, useNativeDriver: true }),
      ]).start();

      setTimeout(hide, 1400);
    },
    [hide, opacity, y]
  );

  _showToast = show;

  if (!visible) return null;

  const boxStyle: ViewStyle =
    type === "error"
      ? styles.error
      : type === "info"
      ? styles.info
      : styles.success;

  return (
    <Animated.View style={[styles.host, boxStyle, { opacity, transform: [{ translateY: y }] }]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  host: {
    position: "absolute",
    left: 24,
    right: 24,
    top: "50%",
    transform: [{ translateY: -24 }], // visually center
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
  },
  text: {
    color: "#111",
    fontWeight: "800",
    textAlign: "center",
  },
  success: { backgroundColor: "#ecf7ee", borderColor: "#b6e2bf" },
  info: { backgroundColor: "#eef5ff", borderColor: "#b7d2ff" },
  error: { backgroundColor: "#fff5f5", borderColor: "#f0b7b7" },
});
