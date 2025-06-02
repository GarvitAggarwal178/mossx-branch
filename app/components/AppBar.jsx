import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { Appbar, IconButton } from "react-native-paper";
import { useTheme } from "../theme/ThemeContext";
import LoginButton from "./LoginButton";

export default function AppBar({ title }) {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <Appbar.Header style={[styles.header, { backgroundColor: theme.surface }]}>
      <IconButton
        icon="menu"
        size={24}
        onPress={() => {}}
        iconColor={theme.text}
      />
      <Appbar.Content
        title={title}
        titleStyle={{ color: theme.text }}
        style={styles.content}
      />
      <LoginButton />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  content: {
    alignItems: "center",
  },
});
