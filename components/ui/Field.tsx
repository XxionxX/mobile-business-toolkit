// components/ui/Field.tsx
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export function Field({
  label,
  value,
  onChangeText,
  placeholder,
  required = false,
  editable = true,
  keyboardType = "numeric",
}: {
  label: string;
  value: string;
  onChangeText?: (t: string) => void;
  placeholder?: string;
  required?: boolean;
  editable?: boolean;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>
        {label}{" "}
        {required ? <Text style={styles.requiredMark}>*</Text> : null}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#8A8A8A"
        editable={editable}
        keyboardType={keyboardType}
        style={[styles.input, !editable && styles.inputReadOnly]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  field: { marginBottom: 14 },

  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "700",
    color: "#222",
  },
  requiredMark: {
    color: "#C62828",
    fontWeight: "900",
  },

  input: {
    borderWidth: 1,
    borderColor: "#CFCFCF",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 18,
    backgroundColor: "#FFFFFF",
    color: "#111",
  },
  inputReadOnly: {
    backgroundColor: "#F2F3F6",
    color: "#333",
  },
});
