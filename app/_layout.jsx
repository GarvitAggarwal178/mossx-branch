import { Stack, usePathname } from "expo-router";
import React from "react";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import AppBar from "./components/AppBar";
import { AuthProvider, useAuthContext } from "./context/AuthContext";
import ClerkProviderWrapper from "./providers/ClerkProvider";
import store from "./store";
import { ThemeProvider, useTheme } from "./theme/ThemeContext";

function AppContent() {
  const { theme } = useTheme();
  const { isSignedIn } = useAuthContext();
  const pathname = usePathname();

  const paperTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: theme.primary,
      background: theme.background,
      surface: theme.surface,
      text: theme.text,
      error: theme.error,
    },
  };

  const getTitle = () => {
    const path = pathname.split("/").pop();
    return path ? path.charAt(0).toUpperCase() + path.slice(1) : "Moss-X";
  };

  return (
    <PaperProvider theme={paperTheme}>
      <AppBar title={getTitle()} />
      <Stack screenOptions={{ headerShown: false }}>
        {!isSignedIn ? (
          // Auth screens
          <>
            <Stack.Screen
              name="(auth)/sign-in"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/sign-up"
              options={{ headerShown: false }}
            />
          </>
        ) : (
          // App screens
          <>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="collection/[id]"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="product/[id]"
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack>
    </PaperProvider>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ClerkProviderWrapper>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </ClerkProviderWrapper>
      </ThemeProvider>
    </Provider>
  );
}
