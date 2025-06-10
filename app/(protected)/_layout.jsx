import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useTheme } from "./theme/ThemeContext";

export default function ProtectedLayout() {
  const { theme } = useTheme();
  const { isSignedIn } = useAuthContext();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      router.replace("/(auth)/sign-in");
    }
  }, [isSignedIn]);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.surface,
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="collection/[id]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="bundle/[id]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="product/[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
