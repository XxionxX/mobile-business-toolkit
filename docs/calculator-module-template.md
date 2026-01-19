# 🧩 Calculator Module Template  

Every calculator consists of:

- `app/calculators/<slug>/index.tsx` (screen / UI / storage)
- `lib/calculators/<slug>/logic.ts` (pure math + warnings + formatting)

## Generator

Use bash:

./scripts/new-calculator.sh "Calculator Title" slug-kebab-case

This creates a screen that uses:

- CalcScreen (Header + ToastHost + Screen padding)
- Card sections (Inputs / Results)
- WarningList (standard warning rendering)
- AsyncStorage persistence (STORAGE_KEY = "calc:<slug>:v1")
- Clipboard “Copy Results”
- “Main Menu” button

## Rules
- UI file should never do math directly — call calculateX() from logic.
- Logic must be pure and return { ..., warnings: string[] }.
- Formatting lives in lib/formatting.ts (parseNumber, formatCurrency, formatHours, etc).
- Inputs should use AppField props:
- - format="currency" for money
- - format="percentage" for percents
- - otherwise inputMode="number" + keyboardType="decimal-pad"

---

# 📁 Recommended Folder Structure


/app/calculators/<module-name>/
  ├── index.tsx        # UI Screen
  ├── logic.ts         # Business logic & validation
  ├── types.ts         # (Optional) Type definitions
  └── storage.ts       # (Optional) persistent storage helpers


---

# 🧠 Module Philosophy

Every calculator MUST be:

- **Deterministic** (same inputs → same outputs)
- **Pure** business logic in `logic.ts`
- **UI-only** in `index.tsx`
- **Independent** (no hidden cross-module dependencies)
- **Testable** (logic never touches React directly)
- **Secure** (never store sensitive data in plain storage)

---

# ✨ Template: `logic.ts`

ts
// logic.ts — business-only, no UI imports allowed

export function calculate(values: {
  inputA: number;
  inputB: number;
}) {
  const result = values.inputA * values.inputB;
  return { result };
}

export function validate(values: Record<string, any>): string | null {
  if (!values.inputA || !values.inputB) return "All fields are required.";
  return null;
}

---

# 🎨 Template: `index.tsx`

tsx
// index.tsx — UI layer

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { calculate, validate } from "./logic";
import { Link } from "expo-router";

export default function ExampleModuleScreen() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState("");
  const [warning, setWarning] = useState("");

  function handleCalculate() {
    const error = validate({ inputA: a, inputB: b });
    if (error) {
      setWarning(error);
      return;
    }
    const { result } = calculate({ inputA: Number(a), inputB: Number(b) });
    setResult(String(result));
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Example Calculator</Text>

      <Text style={styles.label}>Input A</Text>
      <TextInput value={a} onChangeText={setA} style={styles.input} keyboardType="numeric" />

      <Text style={styles.label}>Input B</Text>
      <TextInput value={b} onChangeText={setB} style={styles.input} keyboardType="numeric" />

      {warning !== "" && <Text style={styles.warning}>{warning}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleCalculate}>
        <Text style={styles.buttonText}>CALCULATE</Text>
      </TouchableOpacity>

      <Text style={styles.resultLabel}>Result</Text>
      <Text style={styles.resultValue}>{result}</Text>

      <View style={{ marginTop: 32 }}>
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
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 16,
  },
  label: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
  },
  warning: {
    color: "#c00",
    marginTop: 10,
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#1a73e8",
    padding: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
  resultLabel: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "700",
  },
  resultValue: {
    fontSize: 24,
    fontWeight: "800",
  },
  menuButton: {
    backgroundColor: "#555",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  menuButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

---

# 🔄 Module Requirements Checklist

✔ Business logic isolated in `logic.ts`  
✔ UI-only in `index.tsx`  
✔ Persistent storage uses `storage.ts` when needed  
✔ No sensitive data stored in AsyncStorage  
✔ Avoid duplicated UI patterns (reuse components later)  
✔ Screens must return to Main Menu  

---

# 🎯 Summary

This template ensures:

- fast development  
- consistent UX  
- testable logic  
- scalable architecture  

Use it for every new calculator or KPI tool added to MBT.
