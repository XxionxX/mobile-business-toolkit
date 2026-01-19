// app/_layout.tsx
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { ErrorBoundary } from "../components/ui";
export default function RootLayout() {
  
    return (
    <ErrorBoundary>
      <>
        <StatusBar style="auto" />
        <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      </>
    </ErrorBoundary>
  );
  }
