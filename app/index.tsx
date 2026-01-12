// app/index.tsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { Button } from "../components/ui/Button";

export default function AppHome() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mobile Business Toolkit</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Calculators</Text>
        <Text style={styles.cardSubtitle}>
          Quick tools for payroll, staffing, and operations.
        </Text>

        <Link href="/calculators/payroll" asChild>
          <Button title="Payroll Calculator" variant="primary" />
        </Link>

        <Text style={styles.hint}>
          More modules will appear here as you add them.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 44,
    backgroundColor: "#F6F7F9",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    marginTop: 18,          // was 8 → adds ~5px
    marginBottom: 16,
    color: "#111",
    textAlign: "center",    // ← center title
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E6E7EA",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#555",
    marginBottom: 12,
    lineHeight: 18,
  },
  hint: {
    marginTop: 12,
    fontSize: 12,
    color: "#666",
  },
});
