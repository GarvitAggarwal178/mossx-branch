import { ClerkProvider } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { useColorScheme } from "react-native";
import { useTheme } from "../theme/ThemeContext";

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function ClerkProviderWrapper({ children }) {
  const { theme } = useTheme();
  const colorScheme = useColorScheme();

  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
      theme={{
        colors: {
          primary: theme.primary,
          text: theme.text,
          background: theme.background,
          surface: theme.surface,
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
