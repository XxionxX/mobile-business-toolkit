// app/calculators/revenue-hours/index.tsx
import React, { useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";

import {
  AppButton,
  AppField,
  CalcScreen, showToast, Card, AppText, WarningList,
} from "../../../components/ui";

import {
  calculateRevenueHours,
  formatResults,
} from "../../../lib/calculators/revenue-hours/logic";

import { theme } from "../../../lib/ui/theme";
import { hydrateRevenueHours, persistRevenueHours, REVENUE_HOURS_DEFAULTS } from "../../../lib/calculators/revenue-hours/storage";

export default function RevenueHoursScreen() {
  const [revenueTarget, setRevenueTarget] = useState(REVENUE_HOURS_DEFAULTS.revenueTarget);
  const [salesPerLaborHour, setSalesPerLaborHour] = useState(REVENUE_HOURS_DEFAULTS.salesPerLaborHour);
  const [hours, setHours] = useState(REVENUE_HOURS_DEFAULTS.hours);
  const [warnings, setWarnings] = useState(REVENUE_HOURS_DEFAULTS.warnings);
  const [isHydrating, setIsHydrating] = useState(true);

  
useEffect(() => {
  (async () => {
    try {
      const parsed = await hydrateRevenueHours();
      setRevenueTarget(parsed.revenueTarget);
      setSalesPerLaborHour(parsed.salesPerLaborHour);
      setHours(parsed.hours);
      setWarnings(parsed.warnings);
    } finally {
      setIsHydrating(false);
    }
  })();
}, []);


  async function persist(next?: Partial<typeof REVENUE_HOURS_DEFAULTS>) {
  await persistRevenueHours({
    revenueTarget,
    salesPerLaborHour,
    hours,
    warnings,
    ...(next ?? {}),
  });
}

 function handleCalculate() {
    const r = calculateRevenueHours({ revenueTarget, salesPerLaborHour });
    const f = formatResults(r);

    setHours(f.hours);
    setWarnings(r.warnings);
    persist({ hours: f.hours, warnings: r.warnings });
  }

  function clearAll() {
    setRevenueTarget("");
    setSalesPerLaborHour("");
    setHours("");
    setWarnings([]);
    persist({
      revenueTarget: "",
      salesPerLaborHour: "",
      hours: "",
      warnings: [],
    });
  }

  const hasResults = useMemo(() => hours !== "", [hours]);

  async function copyResults() {
    const text =
      `Revenue → Hours Estimator\n` +
      `Revenue Target: ${revenueTarget || "—"}\n` +
      `Sales per Labor Hour: ${salesPerLaborHour || "—"}\n` +
      `Estimated Hours: ${hours || "—"}`;

    await Clipboard.setStringAsync(text);
    showToast("Copied!");
  }

  return (
  <CalcScreen title="Revenue → Hours" showBack>
{isHydrating ? (
          <Card>
            <AppText variant="helper">Loading saved values…</AppText>
          </Card>
        ) : null}

        <Card
          title="Inputs"
          subtitle="Estimate how many labor hours you can schedule for a revenue target."
        >
          <AppField
            label="Revenue Target"
            required
            value={revenueTarget}
            onChangeText={setRevenueTarget}placeholder="0"
  format="currency"
          />

	  <AppField
  label="Sales per Labor Hour"
  required
  value={salesPerLaborHour}
  onChangeText={setSalesPerLaborHour}
  format="currency"
  keyboardType="numeric"
  placeholder="0"
/>
        </Card>

        <Card title="Results">
          <AppField
            label="Estimated Labor Hours"
            value={hours}
            readOnly
            placeholder="—"
          />

          <WarningList warnings={warnings} />

          <View style={styles.row}>
            <View style={styles.col}>
              <AppButton title="CALCULATE" onPress={handleCalculate} />
            </View>
            <View style={styles.col}>
              <AppButton title="CLEAR" variant="danger" onPress={clearAll} />
            </View>
          </View>

          <View style={{ height: theme.space[3] }} />

          <AppButton
            title="COPY RESULTS"
            variant="ghost"
            onPress={copyResults}
            disabled={!hasResults}
          />

          <View style={{ height: theme.space[3] }} />

          <AppButton
            title="Main Menu"
            variant="neutral"
            onPress={() => router.replace("/")}
          />
        </Card>
  </CalcScreen>
);
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: theme.space[3],
    marginTop: theme.space[4],
  },
  col: { flex: 1 },
  warnBox: { marginTop: theme.space[3] },
});
