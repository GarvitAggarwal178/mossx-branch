import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuthContext } from "../../../context/AuthContext";
import { useTheme } from "../../theme/ThemeContext";

export default function UserProfile() {
  const { signOut, user } = useAuthContext();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Profile</Text>
      </View>

      <View style={styles.content}>
        <Text style={[styles.name, { color: theme.text }]}>{user?.name}</Text>
        <Text style={[styles.email, { color: theme.textSecondary }]}>
          {user?.email}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={signOut}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
  },
  button: {
    margin: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
