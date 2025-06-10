import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import { useTheme } from "../theme/ThemeContext";
import ProductCard from "./ProductCard";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.45;

const ProductList = ({
  data,
  onLoadMore,
  hasMore = true,
  initialNumToRender = 10,
  onEndReachedThreshold = 0.5,
  style,
  ListEmptyComponent,
  ListFooterComponent,
  horizontal = false,
  ...props
}) => {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = useCallback(async () => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);
    try {
      await onLoadMore();
    } finally {
      setIsLoading(false);
    }
  }, [hasMore, isLoading, onLoadMore]);

  const renderItem = useCallback(
    ({ item }) => (
      <ProductCard
        item={item}
        style={horizontal ? { width: CARD_WIDTH } : undefined}
      />
    ),
    [horizontal]
  );

  const defaultListEmptyComponent = (
    <View style={styles.emptyContainer}>
      <Text style={{ color: theme.textSecondary }}>No products found</Text>
    </View>
  );

  const defaultListFooterComponent = isLoading ? (
    <View
      style={[styles.footerContainer, horizontal && styles.horizontalFooter]}
    >
      <ActivityIndicator color={theme.primary} />
    </View>
  ) : null;

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={onEndReachedThreshold}
      initialNumToRender={initialNumToRender}
      ListEmptyComponent={ListEmptyComponent || defaultListEmptyComponent}
      ListFooterComponent={ListFooterComponent || defaultListFooterComponent}
      contentContainerStyle={[
        styles.container,
        horizontal && styles.horizontalContainer,
        style,
      ]}
      horizontal={horizontal}
      numColumns={2}
      showsHorizontalScrollIndicator={false}
      snapToInterval={horizontal ? CARD_WIDTH + 16 : undefined}
      decelerationRate={horizontal ? "fast" : undefined}
      snapToAlignment={horizontal ? "center" : undefined}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  horizontalContainer: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    alignItems: "center",
    gap: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  footerContainer: {
    padding: 20,
    alignItems: "center",
  },
  horizontalFooter: {
    width: CARD_WIDTH,
    justifyContent: "center",
  },
});

export default ProductList;
