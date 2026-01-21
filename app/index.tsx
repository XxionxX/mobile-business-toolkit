// app/index.tsx
import React from "react";
import { View } from "react-native";
import { router } from "expo-router";

import { AppText, AppButton, Card, Screen } from "../components/ui";

export default function AppHome() {
  return (
    <Screen>
      <AppText
        variant="title"
        style={{ textAlign: "center", marginTop: 12, marginBottom: 4 }}
      >
        Mobile Business Toolkit
      </AppText>

      <Card
        title="Calculators"
        subtitle="Quick tools for payroll, staffing, and operations."
      >
        <AppButton title="Payroll Calculator" variant="primary" onPress={() => router.push("/calculators/payroll")} />

        <View style={{ height: 12 }} />

        <AppButton title="Profit per Labor Hour" variant="primary" onPress={() => router.push("/calculators/profit-per-labor-hour")} />

        <View style={{ height: 12 }} />

        <AppButton title="Revenue → Hours Estimator" variant="primary" onPress={() => router.push("/calculators/revenue-hours")} />
      </Card>
    </Screen>
  );
}
