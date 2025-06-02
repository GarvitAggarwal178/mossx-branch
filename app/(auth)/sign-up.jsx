import { SignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useTheme } from "../theme/ThemeContext";

export default function SignUpScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text
          variant="headlineLarge"
          style={[styles.title, { color: theme.text }]}
        >
          Create Account
        </Text>
        <Text
          variant="bodyLarge"
          style={[styles.subtitle, { color: theme.textSecondary }]}
        >
          Sign up to get started
        </Text>
      </View>

      <SignUp
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
        afterSignUpUrl="/"
        signInUrl="/sign-in"
      />

      <View style={styles.footer}>
        <Text style={{ color: theme.textSecondary }}>
          Already have an account?{" "}
        </Text>
        <Button
          mode="text"
          onPress={() => router.push("/(auth)/sign-in")}
          textColor={theme.primary}
        >
          Sign In
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
