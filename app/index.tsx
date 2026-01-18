// app/index.tsx
import React from "react";
import { View } from "react-native";
import { Link } from "expo-router";
import { AppText, Button, Card, Screen } from "../components/ui";

export default function AppHome() {
  return (
    <Screen>
      <AppText variant="title" style={{ textAlign: "center", marginTop: 12, marginBottom: 4 }}>
        Mobile Business Toolkit
      </AppText>

      <Card
        title="Calculators"
        subtitle="Quick tools for payroll, staffing, and operations."
      >
        <Link href="/calculators/payroll" asChild>
          <Button title="Payroll Calculator" variant="primary" />
        </Link>

        <View style={{ height: 12 }} />

	<Link href="/calculators/profit-per-labor-hour" asChild>
          <Button title="Profit per Labor Hour" variant="primary" />
        </Link>

        <View style={{ height: 12 }} />

        <Link href="/calculators/revenue-hours" asChild>
          <Button title="Revenue → Hours Estimator" variant="primary" />
        </Link>
      </Card>
    </Screen>
  );
}
