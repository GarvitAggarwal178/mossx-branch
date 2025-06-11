import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-paper";
import { useTheme } from "../(protected)/theme/ThemeContext";

export default function SignInScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();

  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [showCreateAccount, setShowCreateAccount] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) return;

    setLoading(true);
    setError("");
    setShowCreateAccount(false);

    try {
      const signInAttempt = await signIn.create({
        identifier,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
      } else {
        setError("Sign in failed. Please try again.");
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      if (err.errors?.[0]?.message) {
        const errorMessage = err.errors[0].message;
        setError(errorMessage);
        // Check if the error indicates account doesn't exist
        if (
          errorMessage.toLowerCase().includes("couldn't find your account") ||
          errorMessage.toLowerCase().includes("account not found")
        ) {
          setShowCreateAccount(true);
        }
      } else {
        setError("An error occurred during sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = () => {
    router.push("/sign-up");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.card, { backgroundColor: theme.surface }]}>
        <Text style={[styles.title, { color: theme.text }]}>Sign In</Text>

        {error ? (
          <View
            style={[styles.errorContainer, { backgroundColor: theme.error }]}
          >
            <Text style={styles.errorText}>{error}</Text>
            {showCreateAccount && (
              <TouchableOpacity
                style={styles.createAccountButton}
                onPress={handleCreateAccount}
              >
                <Text style={styles.createAccountText}>Create Account</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : null}

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.background,
              color: theme.text,
              borderColor:
                error && !identifier.trim() ? theme.error : theme.textSecondary,
            },
          ]}
          placeholder="Username or Email"
          placeholderTextColor={theme.textSecondary}
          value={identifier}
          onChangeText={(text) => {
            setIdentifier(text);
            setError(""); // Clear error when user types
            setShowCreateAccount(false);
          }}
          autoCapitalize="none"
          editable={!loading}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={[
              styles.input,
              styles.passwordInput,
              {
                backgroundColor: theme.background,
                color: theme.text,
                borderColor:
                  error && !password.trim() ? theme.error : theme.textSecondary,
              },
            ]}
            placeholder="Password"
            placeholderTextColor={theme.textSecondary}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setError(""); // Clear error when user types
              setShowCreateAccount(false);
            }}
            secureTextEntry={!showPassword}
            editable={!loading}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Icon
              source={showPassword ? "eye-off" : "eye"}
              size={24}
              color={theme.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: loading ? theme.textSecondary : theme.primary,
              opacity: loading ? 0.7 : 1,
            },
          ]}
          onPress={onSignInPress}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.createAccountLink}
          onPress={handleCreateAccount}
        >
          <Text
            style={[styles.createAccountLinkText, { color: theme.primary }]}
          >
            Don't have an account? Create one
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  passwordContainer: {
    position: "relative",
    marginBottom: 15,
  },
  passwordInput: {
    marginBottom: 0,
    paddingRight: 50, // Make room for the eye icon
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 13,
    padding: 5,
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorContainer: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  errorText: {
    color: "#fff",
    textAlign: "center",
  },
  createAccountButton: {
    marginTop: 10,
    padding: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  createAccountText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  createAccountLink: {
    marginTop: 20,
    padding: 10,
  },
  createAccountLinkText: {
    textAlign: "center",
    fontSize: 14,
  },
});
