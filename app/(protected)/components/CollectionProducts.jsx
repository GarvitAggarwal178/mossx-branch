import React from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useTheme } from "../theme/ThemeContext";
import ProductCard from "./ProductCard";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.45;

export default function CollectionProducts({
  title,
  products,
  onLoadMore,
  hasMore,
  type,
  bundlePrices,
}) {
  const { theme } = useTheme();

  const renderHeader = () => (
    <>
      <Text
        variant="headlineMedium"
        style={[styles.title, { color: theme.text }]}
      >
        {title}
      </Text>
      {type === "bundle" && bundlePrices && (
        <View style={styles.priceContainer}>
          <Text style={[styles.originalPrice, { color: theme.textSecondary }]}>
            Original Price: ₹{bundlePrices.original}
          </Text>
          <Text style={[styles.discountPrice, { color: theme.primary }]}>
            Bundle Price: ₹{bundlePrices.discounted}
          </Text>
        </View>
      )}
    </>
  );

  const renderItem = ({ item }) => (
    <ProductCard item={item} style={styles.productCard} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    padding: 16,
    fontWeight: "600",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  originalPrice: {
    fontSize: 16,
    textDecorationLine: "line-through",
  },
  discountPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },
  listContent: {
    padding: 8,
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  productCard: {
    width: CARD_WIDTH,
    marginBottom: 16,
  },
});
