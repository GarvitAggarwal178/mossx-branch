import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeContext";

export default function AppBar() {
  const { theme } = useTheme();
  const router = useRouter();
  const { user } = useUser();
  const insets = useSafeAreaInsets();

  const handleExplore = () => {
    // Navigate to search/explore screen
    router.push("/explore");
  };

  const handleProfile = () => {
    // Navigate to profile
    router.push("/(protected)/(tabs)/UserProfile");
  };

  return (
    <View style={[
      styles.container, 
      { 
        paddingTop: insets.top + 16,
        backgroundColor: "#F0F8F2", // Soft green background
      }
    ]}>
      {/* Header Row: Welcome Text + Profile */}
      <View style={styles.headerRow}>
        {/* Left: Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={[styles.welcomeTitle, { color: theme.text }]}>
            Welcome to Moss-X
          </Text>
          <Text style={[styles.welcomeSubtitle, { color: theme.textSecondary }]}>
            Discover seasonal plants curated for you
          </Text>
        </View>

        {/* Right: Profile Avatar */}
        <TouchableOpacity 
          style={[styles.profileContainer, { backgroundColor: theme.surface }]}
          onPress={handleProfile}
          activeOpacity={0.8}
        >
          {user?.imageUrl ? (
            <Image
              source={{ uri: user.imageUrl }}
              style={styles.avatar}
              resizeMode="cover"
            />
          ) : (
            <Ionicons 
              name="person" 
              size={20} 
              color={theme.textSecondary} 
            />
          )}
        </TouchableOpacity>
      </View>

      {/* Bottom Row: Explore Button */}
      <View style={styles.actionRow}>
        <TouchableOpacity 
          style={[styles.exploreButton, { backgroundColor: theme.surface }]}
          onPress={handleExplore}
          activeOpacity={0.8}
        >
          <Ionicons 
            name="compass-outline" 
            size={18} 
            color={theme.primary} 
          />
          <Text style={[styles.exploreText, { color: theme.text }]}>
            Explore
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    // Elegant soft shadow
    shadowColor: "#4CAF50",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  
  welcomeSection: {
    flex: 1,
    paddingRight: 16,
  },
  
  welcomeTitle: {
    fontSize: 26,
    fontWeight: "700",
    lineHeight: 32,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  
  welcomeSubtitle: {
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 20,
    opacity: 0.8,
  },
  
  profileContainer: {
    width: 44,
    height: 44,
    borderRadius: 12, // Rounded square
    alignItems: "center",
    justifyContent: "center",
    // Subtle inner shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 8,
  },
  
  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  
  exploreButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20, // Pill shape
    gap: 8,
    // Subtle shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  
  exploreText: {
    fontSize: 14,
    fontWeight: "600",
  },
});