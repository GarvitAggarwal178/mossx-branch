import { SignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useTheme } from "../theme/ThemeContext";

export default function SignInScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text
          variant="headlineLarge"
          style={[styles.title, { color: theme.text }]}
        >
          Welcome Back
        </Text>
        <Text
          variant="bodyLarge"
          style={[styles.subtitle, { color: theme.textSecondary }]}
        >
          Sign in to continue
        </Text>
      </View>

      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: {
              backgroundColor: theme.primary,
              "&:hover": {
                backgroundColor: theme.primary + "CC",
              },
            },
            card: {
              backgroundColor: theme.surface,
            },
            headerTitle: {
              color: theme.text,
            },
            headerSubtitle: {
              color: theme.textSecondary,
            },
            formFieldLabel: {
              color: theme.text,
            },
            formFieldInput: {
              color: theme.text,
              backgroundColor: theme.background,
            },
            footerActionLink: {
              color: theme.primary,
            },
          },
        }}
        afterSignInUrl="/"
        signUpUrl="/sign-up"
      />

      <View style={styles.footer}>
        <Text style={{ color: theme.textSecondary }}>
          Don't have an account?{" "}
        </Text>
        <Button
          mode="text"
          onPress={() => router.push("/(auth)/sign-up")}
          textColor={theme.primary}
        >
          Sign Up
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
    marginTop: 48,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
});
