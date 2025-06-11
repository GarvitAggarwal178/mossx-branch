import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, IconButton, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "../../store/slices/cartSlice";
import { useTheme } from "../../theme/ThemeContext";

export default function Cart() {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);

  const handleQuantityChange = (productId, newQuantity) => {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  if (items.length === 0) {
    return (
      <View
        style={[styles.emptyContainer, { backgroundColor: theme.background }]}
      >
        <Text style={[styles.emptyText, { color: theme.text }]}>
          Your cart is empty
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView style={styles.scrollView}>
        {items.map((item) => (
          <Card
            key={item.id}
            style={[styles.card, { backgroundColor: theme.surface }]}
          >
            <Card.Content style={styles.cardContent}>
              <Card.Cover
                source={{ uri: item.imagesrc }}
                style={styles.image}
              />
              <View style={styles.itemDetails}>
                <Text
                  style={[styles.title, { color: theme.text }]}
                  numberOfLines={2}
                >
                  {item.title}
                </Text>
                <Text style={[styles.price, { color: theme.primary }]}>
                  ₹{item.price}
                </Text>
                <View style={styles.quantityContainer}>
                  <IconButton
                    icon="minus"
                    size={20}
                    onPress={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                    iconColor={theme.primary}
                  />
                  <Text style={[styles.quantity, { color: theme.text }]}>
                    {item.quantity}
                  </Text>
                  <IconButton
                    icon="plus"
                    size={20}
                    onPress={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    iconColor={theme.primary}
                  />
                </View>
              </View>
              <IconButton
                icon="delete"
                size={24}
                iconColor={theme.error}
                onPress={() => handleRemoveItem(item.id)}
              />
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: theme.surface }]}>
        <View style={styles.totalContainer}>
          <Text style={[styles.totalLabel, { color: theme.text }]}>Total:</Text>
          <Text style={[styles.totalAmount, { color: theme.primary }]}>
            ₹{total}
          </Text>
        </View>
        <Button
          mode="contained"
          onPress={() => {
            // TODO: Implement checkout
            console.log("Checkout clicked");
          }}
          style={[styles.checkoutButton, { backgroundColor: theme.primary }]}
        >
          Proceed to Checkout
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
  },
  card: {
    margin: 8,
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 8,
    minWidth: 30,
    textAlign: "center",
  },
  footer: {
    padding: 16,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "500",
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: "bold",
  },
  checkoutButton: {
    borderRadius: 8,
  },
});
