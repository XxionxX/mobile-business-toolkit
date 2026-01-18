// app/calculators/revenue-hours/index.tsx
import React, { useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";

import { AppButton, AppField, Header, Screen, ToastHost, showToast, Card, AppText } from "../../../components/ui";
import { calculateRevenueHours, formatResults } from "../../../lib/calculators/revenue-hours/logic";
import { formatCurrency, formatHours } from "../../../lib/formatting";
import { theme } from "../../../lib/ui/theme";

const STORAGE_KEY = "calc:revenue-hours:v1";

export default function RevenueHoursScreen() {
  const [revenueTarget, setRevenueTarget] = useState("");
  const [salesPerLaborHour, setSalesPerLaborHour] = useState("");
  const [hours, setHours] = useState("");
  const [warnings, setWarnings] = useState<string[]>([]);
  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw);
        setRevenueTarget(parsed.revenueTarget ?? "");
        setSalesPerLaborHour(parsed.salesPerLaborHour ?? "");
        setHours(parsed.hours ?? "");
        setWarnings(parsed.warnings ?? []);
      } catch {
        // ignore
      } finally {
        setIsHydrating(false);
      }
    })();
  }, []);

  async function persist(next?: Partial<Record<string, any>>) {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        revenueTarget,
        salesPerLaborHour,
        hours,
        warnings,
        ...(next ?? {}),
      })
    );
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
    persist({ revenueTarget: "", salesPerLaborHour: "", hours: "", warnings: [] });
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
    <View style={{ flex: 1 }}>
      <Screen>
        <Header title="Revenue → Hours" showBack />

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
            onChangeText={(v) => setRevenueTarget(formatCurrency(v))}
            keyboardType="numeric"
            placeholder="0"
          />

          <AppField
            label="Sales per Labor Hour"
            required
            value={salesPerLaborHour}
            onChangeText={(v) => setSalesPerLaborHour(formatCurrency(v))}
            keyboardType="numeric"
            placeholder="0"
            helperText="Example: $150 means each labor hour supports ~$150 in revenue."
          />
        </Card>

        <Card title="Results">
          <AppField label="Estimated Labor Hours" value={hours} readOnly placeholder="—" />

          {warnings.length ? (
            <View style={styles.warnBox}>
              {warnings.map((w, i) => (
                <AppText key={i} variant="error">
                  {w}
                </AppText>
              ))}
            </View>
          ) : null}

          <View style={styles.row}>
            <View style={styles.col}>
              <AppButton title="CALCULATE" onPress={handleCalculate} />
            </View>
            <View style={styles.col}>
              <AppButton title="CLEAR" variant="danger" onPress={clearAll} />
            </View>
          </View>

          <View style={{ height: theme.space[3] }} />

          <AppButton title="COPY RESULTS" variant="ghost" onPress={copyResults} disabled={!hasResults} />

          <View style={{ height: theme.space[3] }} />

          <AppButton title="Main Menu" variant="neutral" onPress={() => router.replace("/")} />
        </Card>
      </Screen>

      <ToastHost />
    </View>
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
