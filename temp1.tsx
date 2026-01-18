// components/ui/AppField.tsx
import React, { useMemo } from "react";
import { View, TextInput, StyleSheet, TextInputProps } from "react-native";
import AppText from "./AppText";
import { theme } from "../../lib/theme";

type InputMode = "text" | "number" | "money";

type Props = {
  label: string;
  value: string;
  onChangeText?: (v: string) => void;

  required?: boolean;
  helperText?: string;
  errorText?: string;
  readOnly?: boolean;

  /**
   * If set, AppField will sanitize user input in a predictable way
   * WITHOUT reformatting into $ currency while typing.
   *
   * - money: digits + optional one decimal + max 2 decimals (e.g. 1234.56)
   * - number: digits + optional one decimal (unlimited decimals)
   */
  inputMode?: InputMode;
} & Omit<TextInputProps, "value" | "onChangeText" | "editable">;

function sanitizeMoneyInput(raw: string): string {
  // allow digits and a single dot, max 2 decimals
  const cleaned = (raw ?? "").replace(/[^0-9.]/g, "");

  const firstDot = cleaned.indexOf(".");
  if (firstDot === -1) return cleaned;

  const whole = cleaned.slice(0, firstDot);
  const rest = cleaned.slice(firstDot + 1).replace(/\./g, ""); // remove extra dots
  return `${whole}.${rest.slice(0, 2)}`;
}

function sanitizeNumberInput(raw: string): string {
  // allow digits and a single dot, keep all decimals
  const cleaned = (raw ?? "").replace(/[^0-9.]/g, "");

  const firstDot = cleaned.indexOf(".");
  if (firstDot === -1) return cleaned;

  const whole = cleaned.slice(0, firstDot);
  const rest = cleaned.slice(firstDot + 1).replace(/\./g, "");
  return `${whole}.${rest}`;
}

export default function AppField({
  label,
  value,
  onChangeText,
  required = false,
  helperText,
  errorText,
  readOnly = false,
  inputMode = "text",
  keyboardType,
  ...inputProps
}: Props) {
  const hasError = !!errorText;

  const resolvedKeyboardType = useMemo(() => {
    if (keyboardType) return keyboardType;
    if (inputMode === "money") return "decimal-pad";
    if (inputMode === "number") return "numeric";
    return "default";
  }, [keyboardType, inputMode]);

  const handleChangeText = (raw: string) => {
    if (!onChangeText) return;

    if (inputMode === "money") return onChangeText(sanitizeMoneyInput(raw));
    if (inputMode === "number") return onChangeText(sanitizeNumberInput(raw));

    return onChangeText(raw);
  };

  return (
    <View style={styles.wrap}>
      <AppText variant="label">
        {label}
        {required ? " *" : ""}
      </AppText>

      <TextInput
        value={value}
        onChangeText={handleChangeText}
        editable={!readOnly}
        keyboardType={resolvedKeyboardType}
        style={[
          styles.input,
          readOnly && styles.inputReadOnly,
          hasError && styles.inputError,
        ]}
        placeholderTextColor={theme.colors.placeholder}
        accessibilityLabel={label}
        accessibilityHint={helperText}
        accessibilityState={{ disabled: readOnly }}
        {...inputProps}
      />

      {hasError ? <AppText variant="error">{errorText}</AppText> : null}
      {!hasError && helperText ? <AppText variant="helper">{helperText}</AppText> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: theme.space[4],
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    padding: theme.space[4],
    fontSize: 18,
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
  },
  inputReadOnly: {
    backgroundColor: theme.colors.bg,
    color: theme.colors.text,
    opacity: 0.85,
  },
  inputError: {
    borderColor: theme.colors.danger,
  },
});
