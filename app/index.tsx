// app/index.tsx
import React from "react";
import { StyleSheet } from "react-native";
import { Link } from "expo-router";

import { Screen, Card, AppText, Button } from "../components/ui";
import { theme } from "../lib/ui/theme";

export default function AppHome() {
  return (
    <Screen scroll={false} contentStyle={styles.container}>
      <AppText variant="title" style={styles.title}>
        Mobile Business Toolkit
      </AppText>

      <Card>
        <AppText variant="section" style={styles.cardTitle}>
          Calculators
        </AppText>

        <AppText variant="helper" style={styles.cardSubtitle}>
          Quick tools for payroll, staffing, and operations.
        </AppText>

        <Link href="/calculators/payroll" asChild>
          <Button title="Payroll Calculator" variant="primary" />
        </Link>

        <AppText variant="helper" style={styles.hint}>
          More modules will appear here as you add them.
        </AppText>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: theme.space[5],
    backgroundColor: theme.colors.bg,
  },
  title: {
    textAlign: "center",
    marginTop: theme.space[2], // ~8px
    marginBottom: theme.space[4],
  },
  cardTitle: {
    marginBottom: theme.space[2],
  },
  cardSubtitle: {
    marginBottom: theme.space[3],
  },
  hint: {
    marginTop: theme.space[3],
  },
});
