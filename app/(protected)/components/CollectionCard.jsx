import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Animated, Dimensions, Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useTheme } from "../theme/ThemeContext";

const { width } = Dimensions.get("window");

export default function CollectionCard({ item, type }) {
  const { theme } = useTheme();
  const router = useRouter();
  const [scaleAnim] = useState(new Animated.Value(1));

  const handlePress = () => {
    router.push({
      pathname: "/collection/[id]",
      params: { id: item.id, type },
    });
  };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getLabelText = () => {
    if (type === "seasonal" && item.theme?.season) return `${item.theme.season} Picks`;
    if (type === "bundle") return "Bundle Deal";
    return "Collection";
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.container}
      >
        <View style={styles.cardContainer}>
          <Image
            source={{ uri: item.imgSrc }}
            style={styles.backgroundImage}
            contentFit="cover"
            transition={300}
          />

          <LinearGradient
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.65)"]}
            style={styles.gradientOverlay}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />

          <View
            style={[
              styles.labelChip,
              {
                backgroundColor: theme.isDarkMode
                  ? "rgba(165, 214, 167, 0.2)"
                  : "rgba(76, 175, 80, 0.1)",
              },
            ]}
          >
            <Text style={[styles.labelText, { color: theme.primary }]}>
              {getLabelText()}
            </Text>
          </View>

          <View style={styles.titleContent}>
            <Text style={styles.titleText} numberOfLines={2}>
              {item.title}
            </Text>
            {item.discription && (
              <Text style={styles.subtitleText} numberOfLines={1}>
                {item.discription}
              </Text>
            )}
            {type === "bundle" && item.discounrPrice && (
              <Text style={styles.priceText}>₹{item.discounrPrice}</Text>
            )}
          </View>

          <View style={styles.arrowContainer}>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" style={styles.arrowIcon} />
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 12,
  },
  cardContainer: {
    width: width * 0.9,
    minWidth: width * 0.9,
    height: 300,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: 20,
  },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
  },
  labelChip: {
    position: "absolute",
    top: 16,
    left: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  labelText: {
    fontSize: 12,
    fontWeight: "600",
  },
  titleContent: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 50,
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  subtitleText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    marginBottom: 4,
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#A5D6A7",
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  arrowContainer: {
    position: "absolute",
    bottom: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  arrowIcon: {
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
