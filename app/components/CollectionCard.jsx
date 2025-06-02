import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { useTheme } from "../theme/ThemeContext";

export default function CollectionCard({ item, type }) {
  const { theme } = useTheme();
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/collection/[id]",
      params: {
        id: item.id,
        type,
      },
    });
  };

  return (
    <Pressable onPress={handlePress}>
      <Card style={[styles.card, { backgroundColor: theme.surface }]}>
        <Card.Cover source={{ uri: item.imgSrc }} style={styles.image} />
        <Card.Content style={styles.content}>
          <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
            {item.title}
          </Text>
          <Text
            style={[styles.description, { color: theme.textSecondary }]}
            numberOfLines={2}
          >
            {item.discription}
          </Text>
          {type === "bundle" && (
            <View style={styles.priceContainer}>
              <Text
                style={[styles.originalPrice, { color: theme.textSecondary }]}
              >
                ₹{item.OrignalPrice}
              </Text>
              <Text style={[styles.discountPrice, { color: theme.primary }]}>
                ₹{item.discounrPrice}
              </Text>
            </View>
          )}
          {type === "seasonal" && item.theme && (
            <View style={styles.themeContainer}>
              <Text style={[styles.theme, { color: theme.primary }]}>
                {item.theme.season}
              </Text>
            </View>
          )}
        </Card.Content>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
    elevation: 3,
    borderRadius: 12,
    overflow: "hidden",
    width: 280,
  },
  image: {
    height: 160,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: "line-through",
  },
  discountPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },
  themeContainer: {
    marginTop: 4,
  },
  theme: {
    fontSize: 14,
    fontWeight: "500",
  },
});
