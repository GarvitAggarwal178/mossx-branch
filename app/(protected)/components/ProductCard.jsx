import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function ProductCard({ item, style }) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/product/[id]",
      params: { id: item.id },
    });
  };

  return (
    <Pressable onPress={handlePress} style={[styles.container, style]}>
      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.imagesrc }}
          style={styles.image}
          resizeMode="cover"
          transition={200}
        />
      </View>
      
      {/* Text Content - No Box/Shadow */}
      <View style={styles.textContainer}>
        <Text style={styles.plantName} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.price}>
          ₹{item.price}
        </Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={12} color="#6DBF4B" />
          <Text style={styles.rating}>
            {item.rating}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
  imageContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  image: {
    width: "100%",
    height: 140,
  },
  textContainer: {
    paddingTop: 12,
    paddingHorizontal: 4,
  },
  plantName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: "400",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 12,
    color: "#888",
    marginLeft: 4,
  },
});