import { NavigationContainer } from "@react-navigation/native";
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { ThemeProvider } from "./(protected)/theme/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import store from "./store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AuthProvider>
            <NavigationContainer>
              <Slot />
            </NavigationContainer>
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
