import React, { useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";

import AppButton from "../../../components/ui/AppButton";
import AppField from "../../../components/ui/AppField";
import ToastHost, { showToast } from "../../../components/ui/Toast";

import {
  calculatePayroll,
  formatCurrency,
  formatPercentage,
  formatHours,
  safeDivisionWarning,
} from "../../../lib/calculators/payroll/logic";

export default function PayrollCalculatorScreen() {
  const [sales, setSales] = useState("");
  const [percent, setPercent] = useState("");
  const [hourlyCost, setHourlyCost] = useState("");
  const [payrollDollars, setPayrollDollars] = useState("");
  const [teamHours, setTeamHours] = useState("");
  const [warning, setWarning] = useState("");
  const [isHydrating, setIsHydrating] = useState(true);

  // --- Load saved values ---
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem("payroll-data");
        if (saved) {
          const parsed = JSON.parse(saved);
          setSales(parsed.sales || "");
          setPercent(parsed.percent || "");
          setHourlyCost(parsed.hourlyCost || "");
          setPayrollDollars(parsed.payrollDollars || "");
          setTeamHours(parsed.teamHours || "");
        }
      } finally {
        setIsHydrating(false);
      }
    })();
  }, []);

  // --- Save values when any change is made ---
  async function persist(next?: Partial<{
    sales: string;
    percent: string;
    hourlyCost: string;
    payrollDollars: string;
    teamHours: string;
  }>) {
    await AsyncStorage.setItem(
      "payroll-data",
      JSON.stringify({
        sales,
        percent,
        hourlyCost,
        payrollDollars,
        teamHours,
        ...next,
      })
    );
  }

  // --- Calculate ---
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

  // --- Clear fields ---
  function clearAll() {
    setSales("");
    setPercent("");
    setHourlyCost("");
    setPayrollDollars("");
    setTeamHours("");
    setWarning("");
    persist({
      sales: "",
      percent: "",
      hourlyCost: "",
      payrollDollars: "",
      teamHours: "",
    });
  }

  // --- Copy result ---
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
  <View style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>Payroll Calculator</Text>

      {isHydrating ? (
        <View style={styles.stateBox}>
          <Text style={styles.stateText}>Loading saved values…</Text>
        </View>
      ) : null}

<AppField
  label="Estimated or Total Sales"
  required
  value={sales}
  onChangeText={(v) => setSales(formatCurrency(v))}
  keyboardType="numeric"
  placeholder="0"
/>

<AppField
  label="Payroll Percent Goal"
  required
  value={percent}
  onChangeText={(v) => setPercent(formatPercentage(v))}
  keyboardType="numeric"
  placeholder="0"
/>

<AppField
  label="Estimated or Total Hourly Cost"
  required
  value={hourlyCost}
  onChangeText={(v) => setHourlyCost(formatCurrency(v))}
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
    </ScrollView>

    <ToastHost />
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    padding: 28,
    paddingBottom: 60,
    backgroundColor: "#fafafa",
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 12,
    color: "#111",
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
