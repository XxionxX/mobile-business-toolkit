// components/ui/ErrorBoundary.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";

import Screen from "./Screen";
import Card from "./Card";
import AppText from "./AppText";
import AppButton from "./AppButton";
import { theme } from "../../lib/theme";
import { logError } from "../../lib/errors/log";

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  errorMessage?: string;
};

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(err: unknown): State {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return { hasError: true, errorMessage: msg };
  }

  componentDidCatch(err: unknown, info: unknown) {
    logError(err, info);
  }

  private reset = () => {
    this.setState({ hasError: false, errorMessage: undefined });
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <View style={{ flex: 1 }}>
        <Screen>
          <Card title="Something went wrong" subtitle="The app hit an unexpected error. Your saved data should still be safe.">
            {this.state.errorMessage ? (
              <AppText variant="helper" style={styles.message}>
                {this.state.errorMessage}
              </AppText>
            ) : null}

            <View style={{ height: theme.space[3] }} />

            <AppButton title="TRY AGAIN" onPress={this.reset} />

            <View style={{ height: theme.space[3] }} />

            <AppButton title="MAIN MENU" variant="neutral" onPress={() => { this.reset(); router.replace("/"); }} />
          </Card>
        </Screen>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  message: {
    marginTop: theme.space[3],
  },
});
