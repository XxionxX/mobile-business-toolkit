mkdir -p scripts
cat > scripts/new-calculator.sh <<'SH'
#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   ./scripts/new-calculator.sh "Profit per Labor Hour" profit-per-labor-hour
#   ./scripts/new-calculator.sh "Revenue → Hours" revenue-hours

TITLE="${1:-}"
SLUG="${2:-}"

if [ -z "$TITLE" ] || [ -z "$SLUG" ]; then
  echo "Usage: $0 \"Calculator Title\" slug-kebab-case"
  exit 1
fi

APP_DIR="app/calculators/${SLUG}"
LIB_DIR="lib/calculators/${SLUG}"

if [ -e "$APP_DIR" ] || [ -e "$LIB_DIR" ]; then
  echo "Error: ${SLUG} already exists (app or lib)."
  exit 1
fi

mkdir -p "$APP_DIR" "$LIB_DIR"

# -------------------------------
# app/calculators/<slug>/index.tsx
# -------------------------------
cat > "${APP_DIR}/index.tsx" <<TSX
// app/calculators/${SLUG}/index.tsx
import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";

import {
  AppButton,
  AppField,
  CalcScreen,
  Card,
  AppText,
  WarningList,
  showToast,
} from "../../../components/ui";

import { calculate${TITLE//[^A-Za-z0-9]/}, formatResults } from "../../../lib/calculators/${SLUG}/logic";

const STORAGE_KEY = "calc:${SLUG}:v1";

export default function ${TITLE//[^A-Za-z0-9]/}Screen() {
  // --- Inputs ---
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");

  // --- Results ---
  const [result, setResult] = useState("");

  // --- Warnings & state ---
  const [warnings, setWarnings] = useState<string[]>([]);
  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw);

        setInputA(parsed.inputA ?? "");
        setInputB(parsed.inputB ?? "");
        setResult(parsed.result ?? "");
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
        inputA,
        inputB,
        result,
        warnings,
        ...(next ?? {}),
      })
    );
  }

  function handleCalculate() {
    const r = calculate${TITLE//[^A-Za-z0-9]/}({ inputA, inputB });
    const f = formatResults(r);

    setResult(f.result);
    setWarnings(r.warnings);

    persist({ result: f.result, warnings: r.warnings });
  }

  function clearAll() {
    setInputA("");
    setInputB("");
    setResult("");
    setWarnings([]);
    persist({ inputA: "", inputB: "", result: "", warnings: [] });
  }

  const hasResults = useMemo(() => result !== "", [result]);

  async function copyResults() {
    const text =
      \`${TITLE}\n\` +
      \`Input A: \${inputA || "—"}\n\` +
      \`Input B: \${inputB || "—"}\n\` +
      \`Result: \${result || "—"}\`;

    await Clipboard.setStringAsync(text);
    showToast("Copied!");
  }

  return (
    <CalcScreen title="${TITLE}" showBack>
      {isHydrating ? (
        <Card>
          <AppText variant="helper">Loading saved values…</AppText>
        </Card>
      ) : null}

      <Card title="Inputs" subtitle="Describe what this calculator does in 1 sentence.">
        <AppField
          label="Input A"
          required
          value={inputA}
          onChangeText={setInputA}
          inputMode="number"
          keyboardType="decimal-pad"
          placeholder="0"
        />

        <AppField
          label="Input B"
          required
          value={inputB}
          onChangeText={setInputB}
          inputMode="number"
          keyboardType="decimal-pad"
          placeholder="0"
        />
      </Card>

      <Card title="Results">
        <AppField label="Result" value={result} readOnly placeholder="—" />

        <WarningList warnings={warnings} />

        <View style={{ height: 8 }} />

        <View style={{ flexDirection: "row", gap: 12 }}>
          <View style={{ flex: 1 }}>
            <AppButton title="CALCULATE" onPress={handleCalculate} />
          </View>
          <View style={{ flex: 1 }}>
            <AppButton title="CLEAR" variant="danger" onPress={clearAll} />
          </View>
        </View>

        <View style={{ height: 12 }} />

        <AppButton title="COPY RESULTS" variant="ghost" onPress={copyResults} disabled={!hasResults} />

        <View style={{ height: 12 }} />

        <AppButton title="Main Menu" variant="neutral" onPress={() => router.replace("/")} />
      </Card>
    </CalcScreen>
  );
}
TSX

# -------------------------------
# lib/calculators/<slug>/logic.ts
# -------------------------------
cat > "${LIB_DIR}/logic.ts" <<TS
// lib/calculators/${SLUG}/logic.ts
import { parseNumber, formatNumber } from "../../formatting";

type Inputs = {
  inputA: string;
  inputB: string;
};

export function calculate${TITLE//[^A-Za-z0-9]/}(input: Inputs) {
  const a = parseNumber(input.inputA);
  const b = parseNumber(input.inputB);

  // Example calc (replace with real math):
  const value = a + b;

  const warnings: string[] = [];
  if (a === 0) warnings.push("Input A is 0 (or invalid).");
  if (b === 0) warnings.push("Input B is 0 (or invalid).");

  return { a, b, value, warnings };
}

export function formatResults(r: ReturnType<typeof calculate${TITLE//[^A-Za-z0-9]/}>) {
  return {
    result: formatNumber(r.value),
  };
}
TS

echo "Created:"
echo "  ${APP_DIR}/index.tsx"
echo "  ${LIB_DIR}/logic.ts"
echo
echo "Next:"
echo "  1) Add a link on app/index.tsx"
echo "  2) Replace Input A/B + calc math + formatting"
SH

chmod +x scripts/new-calculator.sh
