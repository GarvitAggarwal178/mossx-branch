import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
    Dimensions,
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";
import { Text, TextInput } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import mossxJson from "../../../../mossx_plant_dataset.json";
import ProductCard from "../../components/ProductCard";
import { useTheme } from "../../theme/ThemeContext";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.45;

export default function Explore() {
  const { theme } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input for better performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText]);

  // Extract unique categories from product tags
  const categories = useMemo(() => {
    const tagSet = new Set();
    mossxJson.product?.forEach(product => {
      product.tags?.forEach(tag => tagSet.add(tag));
    });
    return ["all", ...Array.from(tagSet)];
  }, []);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    let products = mossxJson.product || [];

    // Filter by search text
    if (debouncedSearch.trim()) {
      const searchLower = debouncedSearch.toLowerCase();
      products = products.filter(product => 
        product.title?.toLowerCase().includes(searchLower) ||
        product.discription?.toLowerCase().includes(searchLower) ||
        product.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      products = products.filter(product => 
        product.tags?.includes(selectedCategory)
      );
    }

    return products;
  }, [debouncedSearch, selectedCategory]);

  const handleCategoryPress = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  const handleBackPress = useCallback(() => {
    router.back();
  }, [router]);

  const clearSearch = useCallback(() => {
    setSearchText("");
    setSelectedCategory("all");
  }, []);

  // Header Component
  const ExploreHeader = () => (
    <View style={[
      styles.headerContainer,
      { 
        paddingTop: insets.top + 16,
        backgroundColor: theme.surface
      }
    ]}>
      {/* Top Navigation */}
      <View style={styles.topNav}>
        <TouchableOpacity 
          onPress={handleBackPress}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Explore Plants
        </Text>
        
        <TouchableOpacity 
          onPress={clearSearch}
          style={styles.clearButton}
          activeOpacity={0.7}
        >
          <Ionicons name="refresh-outline" size={20} color="#6DBF4B" />
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchInputWrapper, { borderColor: theme.border }]}>
          <Ionicons 
            name="search-outline" 
            size={20} 
            color={theme.textSecondary} 
            style={styles.searchIcon}
          />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search plants or categories"
            placeholderTextColor={theme.textSecondary}
            value={searchText}
            onChangeText={setSearchText}
            autoFocus={true}
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            background="transparent"
          />
          {searchText.length > 0 && (
            <TouchableOpacity 
              onPress={() => setSearchText("")}
              style={styles.clearInputButton}
              activeOpacity={0.7}
            >
              <Ionicons name="close-circle" size={20} color={theme.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Chips */}
      <View style={styles.categoriesSection}>
        <Text style={[styles.categoriesLabel, { color: theme.textSecondary }]}>
          Categories
        </Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => handleCategoryPress(category)}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipActive,
                { borderColor: theme.border }
              ]}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.categoryChipText,
                { color: theme.textSecondary },
                selectedCategory === category && styles.categoryChipTextActive
              ]}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Results Summary */}
      <View style={styles.resultsContainer}>
        <Text style={[styles.resultsText, { color: theme.textSecondary }]}>
          {filteredProducts.length} plants found
        </Text>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.productCardWrapper}>
      <ProductCard item={item} style={styles.productCard} />
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Ionicons name="leaf-outline" size={48} color={theme.textSecondary} />
      <Text style={[styles.emptyStateTitle, { color: theme.text }]}>
        No plants found
      </Text>
      <Text style={[styles.emptyStateSubtitle, { color: theme.textSecondary }]}>
        Try adjusting your search or filters
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ExploreHeader}
        ListEmptyComponent={renderEmptyState}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  // HEADER STYLES
  headerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  
  clearButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(109, 191, 75, 0.1)',
  },
  
  // SEARCH STYLES
  searchContainer: {
    marginBottom: 24,
  },
  
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FAFAFA',
    minHeight: 48,
  },
  
  searchIcon: {
    marginRight: 12,
  },
  
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  },
  
  clearInputButton: {
    marginLeft: 8,
  },
  
  // CATEGORIES STYLES
  categoriesSection: {
    marginBottom: 20,
  },
  
  categoriesLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  
  categoriesContainer: {
    paddingHorizontal: 4,
    gap: 12,
  },
  
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: '#FAFAFA',
  },
  
  categoryChipActive: {
    backgroundColor: '#6DBF4B',
    borderColor: '#6DBF4B',
  },
  
  categoryChipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  
  categoryChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  
  // RESULTS STYLES
  resultsContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  
  resultsText: {
    fontSize: 13,
    fontWeight: '500',
  },
  
  // PRODUCT GRID STYLES
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 20,
    paddingTop: 16,
  },
  
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  
  productCardWrapper: {
    width: CARD_WIDTH,
  },
  
  productCard: {
    // Styling handled in ProductCard component
  },
  
  // EMPTY STATE STYLES
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  
  emptyStateSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});