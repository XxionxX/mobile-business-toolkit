import React from "react";
import { View, Text, TextInput, StyleSheet, TextInputProps } from "react-native";

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
      <Text style={styles.label}>
        {label}
        {required ? " *" : ""}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        editable={!readOnly}
        style={[
          styles.input,
          readOnly && styles.inputReadOnly,
          hasError && styles.inputError,
        ]}
        placeholderTextColor="#8a8a8a"
        {...inputProps}
      />

      {hasError ? <Text style={styles.error}>{errorText}</Text> : null}
      {!hasError && helperText ? <Text style={styles.helper}>{helperText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 12,
  },
  label: {
    marginBottom: 6,
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
  },
  input: {
    borderWidth: 1,
    borderColor: "#cfcfcf",
    borderRadius: 12,
    padding: 14,
    fontSize: 18,
    backgroundColor: "#fff",
  },
  inputReadOnly: {
    backgroundColor: "#f4f4f4",
    color: "#333",
  },
  inputError: {
    borderColor: "#c62828",
  },
  helper: {
    marginTop: 6,
    color: "#6b6b6b",
    fontSize: 13,
  },
  error: {
    marginTop: 6,
    color: "#c62828",
    fontSize: 13,
    fontWeight: "600",
  },
});
