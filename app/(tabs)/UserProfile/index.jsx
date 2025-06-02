import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Text } from "react-native-paper";
import { useAuthContext } from "../../context/AuthContext";
import { useTheme } from "../../theme/ThemeContext";

export default function UserProfile() {
  const { theme } = useTheme();
  const { user, signOut } = useAuthContext();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Avatar.Text
          size={80}
          label={
            user?.firstName?.[0] ||
            user?.emailAddresses?.[0]?.emailAddress?.[0] ||
            "U"
          }
          style={[styles.avatar, { backgroundColor: theme.primary }]}
        />
        <Text style={[styles.name, { color: theme.text }]}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text style={[styles.email, { color: theme.textSecondary }]}>
          {user?.emailAddresses?.[0]?.emailAddress}
        </Text>
      </View>

      <View style={styles.content}>
        <Button
          mode="outlined"
          onPress={signOut}
          style={[styles.button, { borderColor: theme.error }]}
          textColor={theme.error}
        >
          Sign Out
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
  },
  content: {
    padding: 20,
  },
  button: {
    marginTop: 20,
  },
});
