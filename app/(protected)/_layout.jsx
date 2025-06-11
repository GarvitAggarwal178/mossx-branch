import { Slot } from "expo-router";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "./theme/ThemeContext";

export default function ProtectedLayout() {
  const { theme } = useTheme();
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return <Slot />;
}
