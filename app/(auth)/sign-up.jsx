import { useAuth, useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import * as React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-paper";
import { useTheme } from "../(protected)/theme/ThemeContext";

export default function SignUpScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { signUp, setActive, isLoaded } = useSignUp();
  const { isSignedIn } = useAuth();
  const [username, setUsername] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [usernameError, setUsernameError] = React.useState("");

  React.useEffect(() => {
    if (isSignedIn) {
      router.replace("/");
    }
  }, [isSignedIn]);

  const validateUsername = (text) => {
    if (text.length < 3) {
      setUsernameError("Username must be at least 3 characters long");
      return false;
    }
    if (text.length > 20) {
      setUsernameError("Username must be less than 20 characters");
      return false;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(text)) {
      setUsernameError(
        "Username can only contain letters, numbers, and underscores"
      );
      return false;
    }
    setUsernameError("");
    return true;
  };

  const validateForm = () => {
    if (!username.trim()) {
      setError("Username is required");
      return false;
    }
    if (!validateUsername(username)) {
      setError(usernameError);
      return false;
    }
    if (!emailAddress.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!firstName.trim()) {
      setError("First name is required");
      return false;
    }
    if (!lastName.trim()) {
      setError("Last name is required");
      return false;
    }
    if (!password.trim()) {
      setError("Password is required");
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    return true;
  };

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    setLoading(true);
    setError("");

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const attempt = await signUp.create({
        emailAddress,
        password,
        username,
        firstName,
        lastName,
      });

      if (attempt.status === "complete") {
        try {
          await setActive({ session: attempt.createdSessionId });
          router.replace("/");
        } catch (err) {
          if (err.errors?.[0]?.code === "session_exists") {
            router.replace("/");
          } else {
            throw err;
          }
        }
      } else {
        setError("Failed to create account. Please try again.");
      }
    } catch (err) {
      if (err.errors?.[0]?.code === "username_taken") {
        setError("This username is already taken. Please choose another one.");
      } else if (err.errors?.[0]?.code === "session_exists") {
        router.replace("/");
      } else {
        setError(
          err.errors?.[0]?.message || "An error occurred during sign up"
        );
      }
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={[styles.card, { backgroundColor: theme.surface }]}>
        <Text style={[styles.title, { color: theme.text }]}>
          Create Account
        </Text>

        {error ? (
          <View
            style={[styles.errorContainer, { backgroundColor: theme.error }]}
          >
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        <View style={styles.form}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>
            Username
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.background,
                color: theme.text,
                borderColor:
                  error && !username.trim() ? theme.error : theme.textSecondary,
              },
            ]}
            value={username}
            placeholder="Choose a username"
            placeholderTextColor={theme.textSecondary}
            onChangeText={(text) => {
              setUsername(text);
              validateUsername(text);
              setError("");
            }}
            autoCapitalize="none"
            editable={!loading}
          />
          {usernameError ? (
            <Text style={[styles.helperText, { color: theme.error }]}>
              {usernameError}
            </Text>
          ) : (
            <Text style={[styles.helperText, { color: theme.textSecondary }]}>
              Username must be 3-20 characters and can only contain letters,
              numbers, and underscores
            </Text>
          )}

          <View style={styles.nameContainer}>
            <View style={styles.nameField}>
              <Text style={[styles.label, { color: theme.textSecondary }]}>
                First Name
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.background,
                    color: theme.text,
                    borderColor:
                      error && !firstName.trim()
                        ? theme.error
                        : theme.textSecondary,
                  },
                ]}
                value={firstName}
                placeholder="First name"
                placeholderTextColor={theme.textSecondary}
                onChangeText={(text) => {
                  setFirstName(text);
                  setError("");
                }}
                editable={!loading}
              />
            </View>

            <View style={styles.nameField}>
              <Text style={[styles.label, { color: theme.textSecondary }]}>
                Last Name
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.background,
                    color: theme.text,
                    borderColor:
                      error && !lastName.trim()
                        ? theme.error
                        : theme.textSecondary,
                  },
                ]}
                value={lastName}
                placeholder="Last name"
                placeholderTextColor={theme.textSecondary}
                onChangeText={(text) => {
                  setLastName(text);
                  setError("");
                }}
                editable={!loading}
              />
            </View>
          </View>

          <Text style={[styles.label, { color: theme.textSecondary }]}>
            Email
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.background,
                color: theme.text,
                borderColor:
                  error && !emailAddress.trim()
                    ? theme.error
                    : theme.textSecondary,
              },
            ]}
            value={emailAddress}
            placeholder="Enter your email"
            placeholderTextColor={theme.textSecondary}
            onChangeText={(text) => {
              setEmailAddress(text);
              setError("");
            }}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!loading}
          />

          <Text style={[styles.label, { color: theme.textSecondary }]}>
            Password
          </Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[
                styles.input,
                styles.passwordInput,
                {
                  backgroundColor: theme.background,
                  color: theme.text,
                  borderColor: theme.textSecondary,
                },
              ]}
              value={password}
              placeholder="Enter your password"
              placeholderTextColor={theme.textSecondary}
              secureTextEntry={!showPassword}
              onChangeText={(text) => {
                setPassword(text);
                setError("");
              }}
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
            onPress={onSignUpPress}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Create Account</Text>
            )}
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: theme.textSecondary }]}>
              Already have an account?{" "}
            </Text>
            <Link href="/sign-in" asChild>
              <TouchableOpacity>
                <Text style={[styles.footerLink, { color: theme.primary }]}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
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
  form: {
    gap: 15,
  },
  nameContainer: {
    flexDirection: "row",
    gap: 10,
  },
  nameField: {
    flex: 1,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
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
  signInButton: {
    marginTop: 10,
    padding: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  signInText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  signInLink: {
    marginTop: 20,
    padding: 10,
  },
  signInLinkText: {
    textAlign: "center",
    fontSize: 14,
  },
  verificationText: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
  },
  passwordContainer: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: 50, // Make room for the eye icon
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 13,
    padding: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: "bold",
  },
  helperText: {
    fontSize: 12,
    marginTop: -10,
    marginBottom: 5,
  },
});
