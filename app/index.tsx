// app/index.tsx
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function AppHome() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mobile Business Toolkit</Text>

      <View style={styles.buttonContainer}>
        <Link href="/calculators/payroll" asChild>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>Payroll Calculator</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "left",
    marginBottom: 40,
  },
  buttonContainer: {
    alignItems: "flex-start",
  },
  navButton: {
    backgroundColor: "#1a73e8",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 6,
  },
  navButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
