// app/calculators/payroll/index.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import {
  calculatePayroll,
  formatCurrency,
  formatPercentage,
  formatHours,
  safeDivisionWarning,
} from "./logic";

export default function PayrollCalculatorScreen() {
  const [sales, setSales] = useState("");
  const [percent, setPercent] = useState("");
  const [hourlyCost, setHourlyCost] = useState("");
  const [payrollDollars, setPayrollDollars] = useState("");
  const [teamHours, setTeamHours] = useState("");
  const [warning, setWarning] = useState("");

  // --- Load saved values ---
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("payroll-data");
      if (saved) {
        const parsed = JSON.parse(saved);
        setSales(parsed.sales || "");
        setPercent(parsed.percent || "");
        setHourlyCost(parsed.hourlyCost || "");
        setPayrollDollars(parsed.payrollDollars || "");
        setTeamHours(parsed.teamHours || "");
      }
    })();
  }, []);

  // --- Save values when any change is made ---
  async function persist() {
    await AsyncStorage.setItem(
      "payroll-data",
      JSON.stringify({
        sales,
        percent,
        hourlyCost,
        payrollDollars,
        teamHours,
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

    // Warn for division issues
    const w = safeDivisionWarning(hours, hourlyCost);
    if (w) setWarning(w);

    setPayrollDollars(formatCurrency(payroll));
    setTeamHours(formatHours(hours));
    persist();
  }

  // --- Clear fields ---
  function clearAll() {
    setSales("");
    setPercent("");
    setHourlyCost("");
    setPayrollDollars("");
    setTeamHours("");
    setWarning("");
    persist();
  }

  // --- Copy result ---
  async function copyResults() {
    const text = `Payroll: ${payrollDollars}\nHours: ${teamHours}`;
    await Clipboard.setStringAsync(text);
    Alert.alert("Copied!", "Results copied to clipboard.");
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>Payroll Calculator</Text>

      <Text style={styles.label}>Estimated or Total Sales *</Text>
      <TextInput
        value={sales}
        onChangeText={(v) => setSales(formatCurrency(v))}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Payroll Percent Goal *</Text>
      <TextInput
        value={percent}
        onChangeText={(v) => setPercent(formatPercentage(v))}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Estimated or Total Hourly Cost *</Text>
      <TextInput
        value={hourlyCost}
        onChangeText={(v) => setHourlyCost(formatCurrency(v))}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Estimated or Total Payroll Dollars</Text>
      <TextInput value={payrollDollars} editable={false} style={styles.input} />

      <Text style={styles.label}>Estimated or Total Team Hours</Text>
      <TextInput value={teamHours} editable={false} style={styles.input} />

      {warning !== "" && <Text style={styles.warning}>{warning}</Text>}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.calcButton} onPress={handleCalculate}>
          <Text style={styles.buttonText}>CALCULATE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
          <Text style={styles.buttonText}>CLEAR</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.copyButton} onPress={copyResults}>
        <Text style={styles.copyButtonText}>COPY RESULTS</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 60,
    backgroundColor: "#fff",
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 18,
    textAlign: "left",
  },
  label: {
    marginBottom: 4,
    marginTop: 12,
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 6,
    padding: 12,
    fontSize: 18,
  },
  warning: {
    color: "#c00",
    marginTop: 10,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  calcButton: {
    backgroundColor: "#1a73e8",
    padding: 14,
    borderRadius: 6,
    flex: 1,
    marginRight: 10,
  },
  clearButton: {
    backgroundColor: "#c62828",
    padding: 14,
    borderRadius: 6,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
  copyButton: {
    marginTop: 24,
    alignSelf: "center",
  },
  copyButtonText: {
    fontSize: 16,
    color: "#1a73e8",
    fontWeight: "600",
  },
});
