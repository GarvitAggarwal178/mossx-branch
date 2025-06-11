import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import * as React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useTheme } from "./theme/ThemeContext";

export default function EditProfileScreen() {
  const { theme } = useTheme();
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const [firstName, setFirstName] = React.useState(user?.firstName || "");
  const [lastName, setLastName] = React.useState(user?.lastName || "");
  const [email, setEmail] = React.useState(
    user?.primaryEmailAddress?.emailAddress || ""
  );

  React.useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.primaryEmailAddress?.emailAddress || "");
    }
  }, [user]);

  const validateForm = () => {
    if (!firstName.trim()) {
      setError("First name is required");
      return false;
    }
    if (!lastName.trim()) {
      setError("Last name is required");
      return false;
    }
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    return true;
  };

  const handleUpdateProfile = async () => {
    if (!isLoaded || !user) return;

    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await user.update({
        firstName,
        lastName,
      });

      setSuccess("Profile updated successfully!");
      setTimeout(() => {
        router.back();
      }, 1500);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(
        err.errors?.[0]?.message ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={[styles.card, { backgroundColor: theme.surface }]}>
        <Text style={[styles.title, { color: theme.text }]}>Edit Profile</Text>

        {/* Profile Image Section */}
        <View style={styles.profileImageSection}>
          {user?.imageUrl ? (
            <Image
              source={{ uri: user.imageUrl }}
              style={styles.profileImage}
            />
          ) : (
            <View
              style={[
                styles.profileImagePlaceholder,
                { backgroundColor: theme.primary },
              ]}
            >
              <Text style={styles.profileImageText}>
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </Text>
            </View>
          )}
          <TouchableOpacity
            style={[
              styles.changePhotoButton,
              { backgroundColor: theme.primary },
            ]}
            onPress={() => {
              // TODO: Implement image upload
              setError("Image upload not implemented yet");
            }}
          >
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Error and Success Messages */}
        {error ? (
          <View
            style={[styles.messageContainer, { backgroundColor: theme.error }]}
          >
            <Text style={styles.messageText}>{error}</Text>
          </View>
        ) : null}

        {success ? (
          <View
            style={[
              styles.messageContainer,
              { backgroundColor: theme.success },
            ]}
          >
            <Text style={styles.messageText}>{success}</Text>
          </View>
        ) : null}

        {/* Form Fields */}
        <View style={styles.formSection}>
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
            onChangeText={(text) => {
              setFirstName(text);
              setError("");
            }}
            placeholder="Enter your first name"
            placeholderTextColor={theme.textSecondary}
            editable={!loading}
          />

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
                  error && !lastName.trim() ? theme.error : theme.textSecondary,
              },
            ]}
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
              setError("");
            }}
            placeholder="Enter your last name"
            placeholderTextColor={theme.textSecondary}
            editable={!loading}
          />

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
                  error && !email.trim() ? theme.error : theme.textSecondary,
              },
            ]}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError("");
            }}
            placeholder="Enter your email"
            placeholderTextColor={theme.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={false} // Email cannot be changed directly
          />
          <Text style={[styles.helperText, { color: theme.textSecondary }]}>
            Email cannot be changed directly. Please contact support if you need
            to change your email.
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.cancelButton,
              { borderColor: theme.textSecondary },
            ]}
            onPress={() => router.back()}
            disabled={loading}
          >
            <Text style={[styles.buttonText, { color: theme.textSecondary }]}>
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.saveButton,
              { backgroundColor: theme.primary },
            ]}
            onPress={handleUpdateProfile}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={[styles.buttonText, { color: "#fff" }]}>
                Save Changes
              </Text>
            )}
          </TouchableOpacity>
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
    padding: 20,
  },
  card: {
    borderRadius: 10,
    padding: 20,
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
  profileImageSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImageText: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },
  changePhotoButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  changePhotoText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  messageContainer: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  messageText: {
    color: "#fff",
    textAlign: "center",
  },
  formSection: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  helperText: {
    fontSize: 12,
    marginTop: -15,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButton: {
    borderWidth: 1,
  },
  saveButton: {
    borderWidth: 0,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
