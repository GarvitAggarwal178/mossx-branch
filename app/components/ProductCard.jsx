import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Card, Chip, IconButton, Text } from "react-native-paper";
import { useTheme } from "../theme/ThemeContext";

export default function ProductCard({ item, style }) {
  const { theme } = useTheme();
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/product/[id]",
      params: { id: item.id },
    });
  };

  return (
    <Pressable onPress={handlePress}>
      <Card style={[styles.card, { backgroundColor: theme.surface }, style]}>
        <Card.Cover source={{ uri: item.imagesrc }} style={styles.image} />
        <Card.Content style={styles.content}>
          <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
            {item.title}
          </Text>
          <Text
            style={[styles.description, { color: theme.textSecondary }]}
            numberOfLines={1}
          >
            {item.discription}
          </Text>

          <View style={styles.priceContainer}>
            <Text style={[styles.price, { color: theme.primary }]}>
              ₹{item.price}
            </Text>
            <View style={styles.ratingContainer}>
              <IconButton icon="star" size={14} iconColor={theme.primary} />
              <Text style={[styles.rating, { color: theme.textSecondary }]}>
                {item.rating}
              </Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <Text style={[styles.stats, { color: theme.textSecondary }]}>
              Sold: {item.quantity_sold}
            </Text>
            <Text style={[styles.stats, { color: theme.textSecondary }]}>
              Stock: {item.stock}
            </Text>
          </View>

          <View style={styles.tagsContainer}>
            {item.tags.slice(0, 2).map((tag, index) => (
              <Chip
                key={index}
                style={[styles.tag, { backgroundColor: theme.primary + "20" }]}
                textStyle={{ color: theme.primary, fontSize: 10 }}
              >
                {tag}
              </Chip>
            ))}
          </View>
        </Card.Content>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 4,
    elevation: 3,
    borderRadius: 12,
    overflow: "hidden",
    maxHeight: 300,
  },
  image: {
    height: 120,
  },
  content: {
    padding: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    marginBottom: 4,
    lineHeight: 16,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 12,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  stats: {
    fontSize: 12,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginTop: 4,
  },
  tag: {
    flex: 1,
    flexDirection: "row",
    maxWidth: 90,
    // marginRight: 4,
    // height: 20,
  },
});
