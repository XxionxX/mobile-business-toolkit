// app/calculators/payroll/screen.tsx
import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import * as Clipboard from "expo-clipboard";

import { AppButton, AppField, CalcScreen, showToast } from "../../../components/ui";

import {
  calculatePayroll,
  formatCurrency,
  formatHours,
  safeDivisionWarning,
} from "../../../lib/calculators/payroll/logic";

import {
  hydratePayroll,
  persistPayroll,
  PAYROLL_DEFAULTS,
} from "../../../lib/calculators/payroll/storage";

export default function PayrollCalculatorScreen() {
  const [sales, setSales] = useState(PAYROLL_DEFAULTS.sales);
  const [percent, setPercent] = useState(PAYROLL_DEFAULTS.percent);
  const [hourlyCost, setHourlyCost] = useState(PAYROLL_DEFAULTS.hourlyCost);
  const [payrollDollars, setPayrollDollars] = useState(
    PAYROLL_DEFAULTS.payrollDollars
  );
  const [teamHours, setTeamHours] = useState(PAYROLL_DEFAULTS.teamHours);
  const [warning, setWarning] = useState("");
  const [isHydrating, setIsHydrating] = useState(true);

  // --- Load saved values ---
  useEffect(() => {
    (async () => {
      try {
        const parsed = await hydratePayroll();
        setSales(parsed.sales);
        setPercent(parsed.percent);
        setHourlyCost(parsed.hourlyCost);
        setPayrollDollars(parsed.payrollDollars);
        setTeamHours(parsed.teamHours);
      } finally {
        setIsHydrating(false);
      }
    })();
  }, []);

  async function persist(next?: Partial<typeof PAYROLL_DEFAULTS>) {
    await persistPayroll({
      sales,
      percent,
      hourlyCost,
      payrollDollars,
      teamHours,
      ...(next ?? {}),
    });
  }

  function handleCalculate() {
    setWarning("");

    const { payroll, hours } = calculatePayroll({
      sales,
      percent,
      hourlyCost,
    });

    const w = safeDivisionWarning(hours, hourlyCost);
    if (w) setWarning(w);

    const nextPayroll = formatCurrency(payroll);
    const nextHours = formatHours(hours);

    setPayrollDollars(nextPayroll);
    setTeamHours(nextHours);
    persist({ payrollDollars: nextPayroll, teamHours: nextHours });
  }

  function clearAll() {
    setSales(PAYROLL_DEFAULTS.sales);
    setPercent(PAYROLL_DEFAULTS.percent);
    setHourlyCost(PAYROLL_DEFAULTS.hourlyCost);
    setPayrollDollars(PAYROLL_DEFAULTS.payrollDollars);
    setTeamHours(PAYROLL_DEFAULTS.teamHours);
    setWarning("");
    persist({ ...PAYROLL_DEFAULTS });
  }

  async function copyResults() {
    const text = `Payroll: ${payrollDollars}\nHours: ${teamHours}`;
    await Clipboard.setStringAsync(text);
    showToast("Copied!");
  }

  const hasResults = useMemo(
    () => payrollDollars !== "" || teamHours !== "",
    [payrollDollars, teamHours]
  );

  return (
    <CalcScreen
      title="Payroll Calculator"
      showBack
      contentStyle={styles.container}
    >
      {isHydrating ? (
        <View style={styles.stateBox}>
          <Text style={styles.stateText}>Loading saved values…</Text>
        </View>
      ) : null}

      <AppField
        label="Estimated or Total Sales"
        required
        value={sales}
        onChangeText={setSales}
        format="currency"
        keyboardType="numeric"
        placeholder="0"
      />

      <AppField
        label="Payroll Percent Goal"
        required
        value={percent}
        onChangeText={setPercent}
        format="percentage"
        keyboardType="numeric"
        placeholder="0"
      />

      <AppField
        label="Estimated or Total Hourly Cost"
        required
        value={hourlyCost}
        onChangeText={setHourlyCost}
        format="currency"
        keyboardType="numeric"
        placeholder="0"
      />

      <AppField
        label="Estimated or Total Payroll Dollars"
        value={payrollDollars}
        readOnly
        placeholder="—"
      />

      <AppField
        label="Estimated or Total Team Hours"
        value={teamHours}
        readOnly
        placeholder="—"
      />

      {warning !== "" ? <Text style={styles.warning}>{warning}</Text> : null}

      <View style={styles.buttonRow}>
        <View style={styles.buttonCol}>
          <AppButton title="CALCULATE" onPress={handleCalculate} />
        </View>
        <View style={styles.buttonCol}>
          <AppButton title="CLEAR" variant="danger" onPress={clearAll} />
        </View>
      </View>

      <View style={styles.actions}>
        <AppButton
          title="COPY RESULTS"
          variant="ghost"
          onPress={copyResults}
          disabled={!hasResults}
        />

        <View style={{ height: 12 }} />

        <AppButton
          title="Main Menu"
          variant="neutral"
          onPress={() => router.replace("/")}
        />
      </View>
    </CalcScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 28,
    paddingBottom: 60,
    backgroundColor: "#fafafa",
  },
  warning: {
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#fff5f5",
    borderWidth: 1,
    borderColor: "#f0b7b7",
    color: "#b71c1c",
    fontSize: 14,
    fontWeight: "700",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 18,
  },
  buttonCol: {
    flex: 1,
  },
  actions: {
    marginTop: 18,
    alignItems: "center",
  },
  stateBox: {
    marginTop: 10,
    marginBottom: 6,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e6e6e6",
  },
  stateText: {
    color: "#666",
    fontWeight: "600",
  },
});
