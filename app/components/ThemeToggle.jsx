import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { useTheme as useCustomTheme } from "../theme/ThemeContext";

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useCustomTheme();
  const { colors } = useTheme();

  return (
    <TouchableOpacity onPress={toggleTheme} style={styles.container}>
      <IconButton
        icon={isDarkMode ? "weather-sunny" : "weather-night"}
        size={24}
        iconColor={colors.primary}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1000,
  },
});
