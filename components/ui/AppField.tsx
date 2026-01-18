// components/ui/AppField.tsx
import React from "react";
import { View, TextInput, StyleSheet, TextInputProps } from "react-native";
import AppText from "./AppText";
import { theme } from "../../lib/ui/theme";

type Props = {
  label: string;
  value: string;
  onChangeText?: (v: string) => void;
  required?: boolean;
  helperText?: string;
  errorText?: string;
  readOnly?: boolean;
} & Omit<TextInputProps, "value" | "onChangeText" | "editable">;

export default function AppField({
  label,
  value,
  onChangeText,
  required = false,
  helperText,
  errorText,
  readOnly = false,
  ...inputProps
}: Props) {
  const hasError = !!errorText;

  return (
    <View style={styles.wrap}>
      <AppText variant="label">
        {label}
        {required ? " *" : ""}
      </AppText>

      <TextInput
        value={value}
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
    color: theme.colors.subtext,
  },

  inputError: {
    borderColor: theme.colors.danger,
  },
});
