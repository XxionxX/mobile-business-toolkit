// components/ui/AppField.tsx
import React, { useMemo } from "react";
import { View, TextInput, StyleSheet, TextInputProps } from "react-native";
import AppText from "./AppText";
import { theme } from "../../lib/ui/theme";
import { formatCurrency, formatPercentage } from "../../lib/formatting";

type Format = "currency" | "percentage" | "none";

type Props = {
  label: string;
  value: string;
  onChangeText?: (v: string) => void;
  required?: boolean;
  helperText?: string;
  errorText?: string;
  readOnly?: boolean;
  format?: Format;

  // Optional: show a formatted preview line (recommended for currency/%)
  showPreview?: boolean;
} & Omit<TextInputProps, "value" | "onChangeText" | "editable">;

export default function AppField({
  label,
  value,
  onChangeText,
  required = false,
  helperText,
  errorText,
  readOnly = false,
  format = "none",
  showPreview = true,
  ...inputProps
}: Props) {
  const hasError = !!errorText;

  // IMPORTANT:
  // Keep TextInput value *raw* so typing is stable and cursor doesn't jump.
  const rawValue = value ?? "";

  const preview = useMemo(() => {
    if (!showPreview) return "";
    if (!rawValue) return "";

    if (format === "currency") return formatCurrency(rawValue);
    if (format === "percentage") return formatPercentage(rawValue);
    return "";
  }, [rawValue, format, showPreview]);

  return (
    <View style={styles.wrap}>
      <AppText variant="label">
        {label}
        {required ? " *" : ""}
      </AppText>

      <TextInput
        value={rawValue}
        onChangeText={onChangeText}
        editable={!readOnly}
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

      {/* Optional formatted preview (does not affect typing) */}
      {preview ? <AppText variant="helper">{preview}</AppText> : null}

      {hasError ? <AppText variant="error">{errorText}</AppText> : null}
      {!hasError && helperText ? (
        <AppText variant="helper">{helperText}</AppText>
      ) : null}
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
    opacity: 0.85,
  },
  inputError: {
    borderColor: theme.colors.danger,
  },
});
