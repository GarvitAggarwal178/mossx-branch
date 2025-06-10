import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import { useTheme } from "../../theme/ThemeContext";

export default function Listing() {
  const { theme } = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.productCard, { backgroundColor: theme.surface }]}
      onPress={() => router.push(`/product/${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text
          style={[styles.productName, { color: theme.text }]}
          numberOfLines={2}
        >
          {item.name}
        </Text>
        <Text style={[styles.productPrice, { color: theme.primary }]}>
          ${item.price}
        </Text>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: theme.primary }]}
          onPress={() => handleAddToCart(item)}
        >
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Products</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
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
    padding: 10,
  },
  productCard: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  addButton: {
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
