// app/calculators/profit-per-labor-hour/index.tsx
import React, { useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";

import { AppButton, AppField, Header, Screen, ToastHost, showToast, Card, AppText } from "../../../components/ui";
import { calculateProfitPerLaborHour, formatResults } from "../../../lib/calculators/profit-per-labor-hour/logic";
import { formatCurrency, formatHours } from "../../../lib/formatting";
import { theme } from "../../../lib/ui/theme";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";

const STORAGE_KEY = "calc:profit-per-labor-hour:v1";

export default function ProfitPerLaborHourScreen() {
  const [revenue, setRevenue] = useState("");
  const [cogs, setCogs] = useState("");
  const [otherCosts, setOtherCosts] = useState("");
  const [laborHours, setLaborHours] = useState("");

  const [profit, setProfit] = useState("");
  const [profitPerHour, setProfitPerHour] = useState("");
  const [warnings, setWarnings] = useState<string[]>([]);
  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw);
        setRevenue(parsed.revenue ?? "");
        setCogs(parsed.cogs ?? "");
        setOtherCosts(parsed.otherCosts ?? "");
        setLaborHours(parsed.laborHours ?? "");
        setProfit(parsed.profit ?? "");
        setProfitPerHour(parsed.profitPerHour ?? "");
        setWarnings(parsed.warnings ?? []);
      } catch {
        // ignore corrupt storage
      } finally {
        setIsHydrating(false);
      }
    })();
  }, []);

  async function persist(next?: Partial<Record<string, any>>) {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        revenue,
        cogs,
        otherCosts,
        laborHours,
        profit,
        profitPerHour,
        warnings,
        ...(next ?? {}),
      })
    );
  }

  function handleCalculate() {
    const r = calculateProfitPerLaborHour({ revenue, cogs, otherCosts, laborHours });
    const f = formatResults(r);

    setProfit(f.profit);
    setProfitPerHour(f.profitPerHour);
    setWarnings(r.warnings);

    persist({ profit: f.profit, profitPerHour: f.profitPerHour, warnings: r.warnings });
  }

  function clearAll() {
    setRevenue("");
    setCogs("");
    setOtherCosts("");
    setLaborHours("");
    setProfit("");
    setProfitPerHour("");
    setWarnings([]);
    persist({
      revenue: "",
      cogs: "",
      otherCosts: "",
      laborHours: "",
      profit: "",
      profitPerHour: "",
      warnings: [],
    });
  }

  const hasResults = useMemo(() => profit !== "" || profitPerHour !== "", [profit, profitPerHour]);

  async function copyResults() {
    const text =
      `Profit per Labor Hour\n` +
      `Profit: ${profit || "—"}\n` +
      `Profit/Hour: ${profitPerHour || "—"}\n` +
      `Hours: ${laborHours || "—"}\n` +
      `Revenue: ${revenue || "—"}\n` +
      `COGS: ${cogs || "—"}\n` +
      `Other Costs: ${otherCosts || "—"}`;
    await Clipboard.setStringAsync(text);
    showToast("Copied!");
  }

  return (
    <View style={{ flex: 1 }}>
      <Screen>
        <Header title="Profit per Labor Hour" showBack />

        {isHydrating ? (
          <Card>
            <AppText variant="helper">Loading saved values…</AppText>
          </Card>
        ) : null}

        <Card
          title="Inputs"
          subtitle="Estimate how much profit you generate for each labor hour."
        >
          <AppField
            label="Revenue"
            required
            value={revenue}
            onChangeText={(v) => setRevenue(formatCurrency(v))}
            keyboardType="numeric"
            placeholder="0"
          />

          <AppField
            label="COGS"
            required
            value={cogs}
            onChangeText={(v) => setCogs(formatCurrency(v))}
            keyboardType="numeric"
            placeholder="0"
            helperText="Cost of goods sold (inventory/ingredients/parts)."
          />

          <AppField
            label="Other Costs (optional)"
            value={otherCosts}
            onChangeText={(v) => setOtherCosts(formatCurrency(v))}
            keyboardType="numeric"
            placeholder="0"
            helperText="Rent/supplies/fees/etc. Leave blank if unknown."
          />

          <AppField
            label="Labor Hours"
            required
            value={laborHours}
            onChangeText={(v) => setLaborHours(formatHours(v))}
            keyboardType="numeric"
            placeholder="0"
          />
        </Card>

        <Card title="Results">
          <AppField label="Profit" value={profit} readOnly placeholder="—" />
          <AppField label="Profit per Labor Hour" value={profitPerHour} readOnly placeholder="—" />

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
  warnBox: {
    marginTop: theme.space[3],
  },
});
