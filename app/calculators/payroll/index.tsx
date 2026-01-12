// app/calculators/payroll/index.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
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

type PersistedPayroll = {
  sales?: string;
  percent?: string;
  hourlyCost?: string;
  payrollDollars?: string;
  teamHours?: string;
};

const STORAGE_KEY = "payroll-data";

export default function PayrollCalculatorScreen() {
  const [isLoading, setIsLoading] = useState(true);

  const [sales, setSales] = useState("");
  const [percent, setPercent] = useState("");
  const [hourlyCost, setHourlyCost] = useState("");

  const [payrollDollars, setPayrollDollars] = useState("");
  const [teamHours, setTeamHours] = useState("");

  const [warning, setWarning] = useState<string>("");

  // --- Load saved values ---
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed: PersistedPayroll = JSON.parse(saved);
          setSales(parsed.sales || "");
          setPercent(parsed.percent || "");
          setHourlyCost(parsed.hourlyCost || "");
          setPayrollDollars(parsed.payrollDollars || "");
          setTeamHours(parsed.teamHours || "");
        }
      } catch {
        // If parsing/storage fails, we just start fresh.
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // --- Persist values (non-sensitive only) ---
  async function persist(next?: Partial<PersistedPayroll>) {
    const payload: PersistedPayroll = {
      sales,
      percent,
      hourlyCost,
      payrollDollars,
      teamHours,
      ...next,
    };
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore write failures; user can still use calculator.
    }
  }

  const isMissingRequired = useMemo(() => {
    return !sales.trim() || !percent.trim() || !hourlyCost.trim();
  }, [sales, percent, hourlyCost]);

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

    const payrollFmt = formatCurrency(payroll);
    const hoursFmt = formatHours(hours);

    setPayrollDollars(payrollFmt);
    setTeamHours(hoursFmt);

    persist({ payrollDollars: payrollFmt, teamHours: hoursFmt });
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
    Alert.alert("Copied", "Results copied to clipboard.");
  }

  // --- Standardized field renderer ---
  function Field({
    label,
    value,
    onChangeText,
    placeholder,
    required,
    editable = true,
  }: {
    label: string;
    value: string;
    onChangeText?: (t: string) => void;
    placeholder?: string;
    required?: boolean;
    editable?: boolean;
  }) {
    return (
      <View style={styles.field}>
        <Text style={styles.label}>
          {label} {required ? <Text style={styles.required}>*</Text> : null}
        </Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#8A8A8A"
          editable={editable}
          keyboardType="numeric"
          style={[styles.input, !editable && styles.inputReadOnly]}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.loadingWrap}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading saved values…</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>Payroll Calculator</Text>

      <View style={styles.card}>
        <Field
          label="Estimated or Total Sales"
          required
          value={sales}
          onChangeText={(v) => {
            const next = formatCurrency(v);
            setSales(next);
            persist({ sales: next });
          }}
          placeholder="$0.00"
        />

        <Field
          label="Payroll Percent Goal"
          required
          value={percent}
          onChangeText={(v) => {
            const next = formatPercentage(v);
            setPercent(next);
            persist({ percent: next });
          }}
          placeholder="10%"
        />

        <Field
          label="Estimated or Total Hourly Cost"
          required
          value={hourlyCost}
          onChangeText={(v) => {
            const next = formatCurrency(v);
            setHourlyCost(next);
            persist({ hourlyCost: next });
          }}
          placeholder="$0.00"
        />

        <View style={styles.divider} />

        <Field
          label="Estimated or Total Payroll Dollars"
          value={payrollDollars}
          editable={false}
          placeholder="$0.00"
        />

        <Field
          label="Estimated or Total Team Hours"
          value={teamHours}
          editable={false}
          placeholder="0"
        />

        {warning ? (
          <View style={styles.notice}>
            <Text style={styles.noticeTitle}>Heads up</Text>
            <Text style={styles.noticeText}>{warning}</Text>
          </View>
        ) : null}

        {isMissingRequired ? (
          <View style={styles.emptyHint}>
            <Text style={styles.emptyHintText}>
              Enter Sales, Percent, and Hourly Cost to calculate.
            </Text>
          </View>
        ) : null}

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.primaryButton, isMissingRequired && styles.buttonDisabled]}
            onPress={handleCalculate}
            disabled={isMissingRequired}
          >
            <Text style={styles.primaryButtonText}>Calculate</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.dangerButton} onPress={clearAll}>
            <Text style={styles.dangerButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.secondaryButton, (payrollDollars || teamHours) ? null : styles.buttonDisabled]}
          onPress={copyResults}
          disabled={!payrollDollars && !teamHours}
        >
          <Text style={styles.secondaryButtonText}>Copy Results</Text>
        </TouchableOpacity>

        {/* MAIN MENU BUTTON */}
        <View style={styles.menuWrap}>
          <Link href="/" asChild>
            <TouchableOpacity style={styles.menuButton}>
              <Text style={styles.menuButtonText}>Main Menu</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Layout
  container: {
    padding: 20,
    paddingBottom: 44,
    backgroundColor: "#F6F7F9",
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 14,
    textAlign: "left",
    color: "#111",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E6E7EA",
  },

  // Loading state
  loadingWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#F6F7F9",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#333",
  },

  // Fields
  field: {
    marginBottom: 14,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "700",
    color: "#222",
  },
  required: {
    color: "#C62828",
    fontWeight: "800",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CFCFCF",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 18,
    backgroundColor: "#FFF",
    color: "#111",
  },
  inputReadOnly: {
    backgroundColor: "#F2F3F6",
    color: "#333",
  },

  divider: {
    height: 1,
    backgroundColor: "#ECEEF2",
    marginVertical: 10,
  },

  // Notices
  notice: {
    marginTop: 4,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#FFF6E5",
    borderWidth: 1,
    borderColor: "#FFE0A6",
  },
  noticeTitle: {
    fontWeight: "800",
    color: "#7A4B00",
    marginBottom: 4,
  },
  noticeText: {
    color: "#5A3A00",
    fontSize: 14,
    lineHeight: 18,
  },

  emptyHint: {
    marginTop: 6,
    paddingVertical: 8,
  },
  emptyHintText: {
    color: "#666",
    fontSize: 13,
  },

  // Buttons
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 14,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: "#1A73E8",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFF",
    fontWeight: "800",
    fontSize: 16,
  },
  dangerButton: {
    flex: 1,
    backgroundColor: "#C62828",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  dangerButtonText: {
    color: "#FFF",
    fontWeight: "800",
    fontSize: 16,
  },
  secondaryButton: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#1A73E8",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  secondaryButtonText: {
    color: "#1A73E8",
    fontWeight: "800",
    fontSize: 16,
  },
  buttonDisabled: {
    opacity: 0.45,
  },

  // Menu
  menuWrap: {
    marginTop: 16,
    alignItems: "center",
  },
  menuButton: {
    backgroundColor: "#4B5563",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  menuButtonText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "800",
  },
});
