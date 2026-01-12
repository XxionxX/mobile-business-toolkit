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
import { Link } from "expo-router";
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

      {/* MAIN MENU BUTTON */}
      <View style={{ marginTop: 30, alignItems: "center" }}>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuButtonText}>Main Menu</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 28,
    paddingBottom: 60,
    backgroundColor: "#fafafa", // softer feeling screen
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 18,
    textAlign: "left",
  },
  label: {
    marginBottom: 6,
    marginTop: 14,
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#cfcfcf", // lighter, modern
    borderRadius: 10, // softer rounded corners
    padding: 14,
    fontSize: 18,
    backgroundColor: "#fff",
  },
  warning: {
    color: "#c00",
    marginTop: 10,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 26,
  },
  calcButton: {
    backgroundColor: "#1a73e8",
    padding: 16,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  clearButton: {
    backgroundColor: "#c62828",
    padding: 16,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
  copyButton: {
    marginTop: 28,
    alignSelf: "center",
  },
  copyButtonText: {
    fontSize: 16,
    color: "#1a73e8",
    fontWeight: "600",
  },
  menuButton: {
    backgroundColor: "#555",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  menuButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
