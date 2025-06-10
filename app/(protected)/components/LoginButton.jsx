import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Menu } from "react-native-paper";
import { useAuthContext } from "../../context/AuthContext";
import { useTheme } from "../theme/ThemeContext";

export default function LoginButton() {
  const { theme } = useTheme();
  const { isSignedIn, user, signOut } = useAuthContext();
  const router = useRouter();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleSignOut = async () => {
    closeMenu();
    await signOut();
  };

  const handleProfile = () => {
    closeMenu();
    router.push("/(tabs)/UserProfile");
  };

  if (!isSignedIn) {
    return (
      <Button
        mode="contained"
        onPress={() => router.push("/(auth)/sign-in")}
        style={[styles.button, { backgroundColor: theme.primary }]}
      >
        Sign In
      </Button>
    );
  }

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button
            mode="contained"
            onPress={openMenu}
            style={[styles.button, { backgroundColor: theme.primary }]}
          >
            {user?.firstName || "Account"}
          </Button>
        }
      >
        <Menu.Item
          onPress={handleProfile}
          title="Profile"
          leadingIcon="account"
        />
        <Menu.Item
          onPress={handleSignOut}
          title="Sign Out"
          leadingIcon="logout"
        />
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
  },
  button: {
    borderRadius: 20,
  },
});
