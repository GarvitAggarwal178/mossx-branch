import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "../../store/slices/cartSlice";
import { useTheme } from "../../theme/ThemeContext";

export default function Cart() {
  const { theme } = useTheme();
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const renderItem = ({ item }) => (
    <View style={[styles.cartItem, { backgroundColor: theme.surface }]}>
      <View style={styles.itemInfo}>
        <Text style={[styles.itemName, { color: theme.text }]}>
          {item.name}
        </Text>
        <Text style={[styles.itemPrice, { color: theme.textSecondary }]}>
          ${item.price}
        </Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={[styles.quantityButton, { backgroundColor: theme.primary }]}
          onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={[styles.quantity, { color: theme.text }]}>
          {item.quantity}
        </Text>
        <TouchableOpacity
          style={[styles.quantityButton, { backgroundColor: theme.primary }]}
          onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.removeButton, { backgroundColor: theme.error }]}
        onPress={() => handleRemoveItem(item.id)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Shopping Cart</Text>
      {cart.length === 0 ? (
        <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
          Your cart is empty
        </Text>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
          />
          <View style={[styles.footer, { backgroundColor: theme.surface }]}>
            <Text style={[styles.total, { color: theme.text }]}>
              Total: ${total.toFixed(2)}
            </Text>
            <TouchableOpacity
              style={[
                styles.checkoutButton,
                { backgroundColor: theme.primary },
              ]}
            >
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 20,
  },
  list: {
    padding: 20,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  removeButton: {
    padding: 8,
    borderRadius: 4,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 12,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  checkoutButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
});
