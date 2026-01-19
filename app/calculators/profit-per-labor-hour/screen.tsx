// app/calculators/profit-per-labor-hour/screen.tsx
import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import * as Clipboard from "expo-clipboard";

import {
  AppButton,
  AppField,
  CalcScreen,
  showToast,
  Card,
  AppText,
  WarningList,
} from "../../../components/ui";

import {
  calculateProfitPerLaborHour,
  formatResults,
} from "../../../lib/calculators/profit-per-labor-hour/logic";

import { theme } from "../../../lib/ui/theme";

import {
  hydrateProfit,
  persistProfit,
  PROFIT_DEFAULTS,
} from "../../../lib/calculators/profit-per-labor-hour/storage";

export default function ProfitPerLaborHourScreen() {
  const [revenue, setRevenue] = useState(PROFIT_DEFAULTS.revenue);
  const [cogs, setCogs] = useState(PROFIT_DEFAULTS.cogs);
  const [otherCosts, setOtherCosts] = useState(PROFIT_DEFAULTS.otherCosts);
  const [laborHours, setLaborHours] = useState(PROFIT_DEFAULTS.laborHours);

  const [profit, setProfit] = useState(PROFIT_DEFAULTS.profit);
  const [profitPerHour, setProfitPerHour] = useState(PROFIT_DEFAULTS.profitPerHour);
  const [warnings, setWarnings] = useState(PROFIT_DEFAULTS.warnings);

  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const parsed = await hydrateProfit();
        setRevenue(parsed.revenue);
        setCogs(parsed.cogs);
        setOtherCosts(parsed.otherCosts);
        setLaborHours(parsed.laborHours);
        setProfit(parsed.profit);
        setProfitPerHour(parsed.profitPerHour);
        setWarnings(parsed.warnings);
      } finally {
        setIsHydrating(false);
      }
    })();
  }, []);

  async function persist(next?: Partial<typeof PROFIT_DEFAULTS>) {
    await persistProfit({
      revenue,
      cogs,
      otherCosts,
      laborHours,
      profit,
      profitPerHour,
      warnings,
      ...(next ?? {}),
    });
  }

  function handleCalculate() {
    const r = calculateProfitPerLaborHour({
      revenue,
      cogs,
      otherCosts,
      laborHours,
    });

    const f = formatResults(r);

    setProfit(f.profit);
    setProfitPerHour(f.profitPerHour);
    setWarnings(r.warnings);

    persist({
      profit: f.profit,
      profitPerHour: f.profitPerHour,
      warnings: r.warnings,
    });
  }

  function clearAll() {
    setRevenue(PROFIT_DEFAULTS.revenue);
    setCogs(PROFIT_DEFAULTS.cogs);
    setOtherCosts(PROFIT_DEFAULTS.otherCosts);
    setLaborHours(PROFIT_DEFAULTS.laborHours);
    setProfit(PROFIT_DEFAULTS.profit);
    setProfitPerHour(PROFIT_DEFAULTS.profitPerHour);
    setWarnings(PROFIT_DEFAULTS.warnings);

    persist({ ...PROFIT_DEFAULTS });
  }

  const hasResults = useMemo(
    () => profit !== "" || profitPerHour !== "",
    [profit, profitPerHour]
  );

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
    <CalcScreen title="Profit per Labor Hour" showBack>
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
          onChangeText={setRevenue}
          format="currency"
          keyboardType="numeric"
          placeholder="0"
        />

        <AppField
          label="COGS"
          required
          value={cogs}
          onChangeText={setCogs}
          format="currency"
          keyboardType="numeric"
          placeholder="0"
        />

        <AppField
          label="Other Costs"
          value={otherCosts}
          onChangeText={setOtherCosts}
          format="currency"
          keyboardType="numeric"
          placeholder="0"
        />

        <AppField
          label="Labor Hours"
          required
          value={laborHours}
          onChangeText={setLaborHours}
          inputMode="number"
          keyboardType="decimal-pad"
          placeholder="0"
        />
      </Card>

      <Card title="Results">
        <AppField label="Profit" value={profit} readOnly placeholder="—" />
        <AppField
          label="Profit per Labor Hour"
          value={profitPerHour}
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
});
