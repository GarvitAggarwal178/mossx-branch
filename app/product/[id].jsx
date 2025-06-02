import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import ProductDetail from "../components/ProductDetail";
import { useTheme } from "../theme/ThemeContext";

export default function ProductPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const { allProducts } = useSelector((state) => state.products);

  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    return null;
  }

  const handleBuyNow = () => {
    router.push("/Cart");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ProductDetail product={product} onBuyNow={handleBuyNow} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
