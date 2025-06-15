import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Link } from "expo-router"; // ADD THIS LINE
import { useCallback } from "react";
import { Dimensions, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import mossxJson from "../../../../mossx_plant_dataset.json";
import CollectionCard from "../../components/CollectionCard";
import FilterBar from "../../components/FilterBar";
import ProductCard from "../../components/ProductCard";
import TrendingSlider from '../../components/TrendingSlider';
import { loadMore, setFilters } from "../../store/slices/productsSlice";
import { useTheme } from "../../theme/ThemeContext";

// Mock data for testing TrendingSlider
const mockTrendingPlants = [
  {
    id: "1",
    title: "Monstera Deliciosa",
    price: "1299",
    rating: "4.8",
    imagesrc: "https://images.unsplash.com/photo-1545241047-6083a3684587?w=400"
  },
  {
    id: "2", 
    title: "Fiddle Leaf Fig",
    price: "899",
    rating: "4.6",
    imagesrc: "https://images.unsplash.com/photo-1463154545680-d59320fd685d?w=400"
  },
  {
    id: "3",
    title: "Snake Plant",
    price: "599",
    rating: "4.9",
    imagesrc: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400"
  },
  {
    id: "4",
    title: "Peace Lily",
    price: "749",
    rating: "4.7",
    imagesrc: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400"
  },
  {
    id: "5",
    title: "Rubber Plant",
    price: "999",
    rating: "4.5",
    imagesrc: "https://images.unsplash.com/photo-1509423350716-97f2360af7e4?w=400"
  }
];

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.45;

export default function Listing() {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { displayedProducts, hasMore, filters } = useSelector(
    (state) => state.products
  );

  const handleLoadMore = useCallback(async () => {
    if (!hasMore) return;
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    dispatch(loadMore());
  }, [dispatch, hasMore]);

  const handleSearch = useCallback(
    (query) => {
      dispatch(setFilters({ searchQuery: query }));
    },
    [dispatch]
  );

  const handleFilterChange = useCallback(
    (newFilters) => {
      dispatch(setFilters(newFilters));
    },
    [dispatch]
  );

  // Clean Section Header Component
  const SectionHeader = ({ icon, title, style }) => (
    <View style={[styles.sectionHeader, style]}>
      <Ionicons name={icon} size={20} color="#6DBF4B" />
      <Text
        variant="titleLarge"
        style={[styles.sectionTitle, { color: theme.text }]}
      >
        {title}
      </Text>
    </View>
  );

  // Modern Hero Header Component
  const HeroHeader = () => {
    const { user } = useUser();
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    const handleExplore = () => {
      navigation.navigate("Explore/index");
    };

    const handleProfile = () => {
      router.push("/(protected)/(tabs)/UserProfile");
    };

    return (
      <View style={[
        styles.heroContainer,
        { 
          paddingTop: insets.top + 16,
          backgroundColor: "#F0F8F2" // Premium soft green background
        }
      ]}>
        {/* Top Navigation Row */}
        <View style={styles.topNavRow}>
          {/* Left: Brand + Welcome */}
          <View style={styles.brandSection}>
            <Text style={styles.brandWelcome}>Welcome to Moss-X</Text>
            <Text style={styles.brandTagline}>
              Your curated green lifestyle starts here.
            </Text>
          </View>

          {/* Right: Profile Avatar */}
          <TouchableOpacity 
            style={styles.profileContainer}
            onPress={handleProfile}
            activeOpacity={0.8}
          >
            {user?.imageUrl ? (
              <Image
                source={{ uri: user.imageUrl }}
                style={styles.avatar}
                resizeMode="cover"
              />
            ) : (
              <Ionicons 
                name="person" 
                size={20} 
                color="#777777" 
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.exploreSection}>
          <Link href="/(protected)/(tabs)/Explore" asChild>
            <TouchableOpacity style={styles.exploreButton} activeOpacity={0.8}>
              <Ionicons 
                name="compass-outline" 
                size={18} 
                color="#6DBF4B" 
              />
              <Text style={styles.exploreText}>
                Explore Plants
              </Text>
            </TouchableOpacity>
          </Link>
        </View>


        {/* Quick Category Chips */}
        <View style={styles.categoryChipsContainer}>
          <TouchableOpacity style={styles.categoryChip}>
            <Text style={styles.categoryChipText}>Indoor</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryChip}>
            <Text style={styles.categoryChipText}>Pet-Friendly</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryChip}>
            <Text style={styles.categoryChipText}>Low Light</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {/* Modern Hero Section with Soft Background */}
      <HeroHeader />

      {/* White Background for Rest of Content */}
      <View style={styles.contentContainer}>
        {/* Trending Plants Section */}
        <View style={styles.section}>
        
          <TrendingSlider trendingPlants={mockTrendingPlants} />
        </View>

        {/* Seasonal Collections Section */}
        <View style={styles.section}>
          <SectionHeader 
            icon="leaf-outline" 
            title="Seasonal Picks" 
            style={{ marginBottom: 16 }}
          />
          <FlatList
            horizontal
            data={mossxJson?.SeasonalCollection || []}
            renderItem={({ item }) => (
              <CollectionCard item={item} type="seasonal" />
            )}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.collectionsContainer}
            // Add these additional props for better scrolling:
            decelerationRate="fast"
            snapToInterval={width * 0.9 + 12} // Card width + gap for snap effect
            snapToAlignment="start"
          />
        </View>

        {/* Product Bundles Section */}
        <View style={styles.section}>
          <SectionHeader 
            icon="gift-outline" 
            title="Bundles You'll Love" 
            style={{ marginBottom: 16 }}
          />
          <FlatList
            horizontal
            data={mossxJson?.product_bundle || []}
            renderItem={({ item }) => (
              <CollectionCard item={item} type="bundle" />
            )}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.collectionsContainer}
            // Add these additional props for better scrolling:
            decelerationRate="fast"
            snapToInterval={width * 0.9 + 12} // Card width + gap for snap effect
            snapToAlignment="start"
          />
        </View>

        {/* All Products Section with Filter */}
        <View style={styles.section}>
          <SectionHeader 
            icon="grid-outline" 
            title="All Plants" 
            style={{ marginBottom: 16 }}
          />
          <View style={styles.filterContainer}>
            <FilterBar
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
            />
          </View>
        </View>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.productCardWrapper}>
      <ProductCard item={item} style={styles.productCard} />
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <FlatList
          data={displayedProducts || []}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    paddingBottom: 8,
  },
  
  // 🌟 HERO SECTION STYLES
  heroContainer: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    backgroundColor: '#F0F8F2', // Will be overridden by inline style for safe area
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    // Premium drop shadow
    shadowColor: "#4CAF50",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  
  topNavRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  
  brandSection: {
    flex: 1,
    paddingRight: 16,
  },
  
  brandWelcome: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1A1A1A',
    letterSpacing: -0.6,
    lineHeight: 32,
    marginBottom: 4,
  },
  
  brandTagline: {
    fontSize: 15,
    color: '#777777',
    fontWeight: '400',
    lineHeight: 20,
    opacity: 0.85,
  },
  
  profileContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    // Soft white container shadow
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 8,
  },
  
  exploreSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24, // Full pill shape
    backgroundColor: '#FFFFFF',
    gap: 8,
    // Subtle premium shadow
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  
  exploreText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  
  categoryChipsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  
  categoryChipText: {
    fontSize: 13,
    color: '#555555',
    fontWeight: '500',
  },

  // EXISTING SECTION STYLES
  contentContainer: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingTop: 16,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    marginLeft: 8,
    fontWeight: "600",
  },
  collectionsContainer: {
    paddingLeft: 16,        // Align with screen edge
    paddingRight: 8,        // Less padding on right
    gap: 12,               // 12px spacing between cards
  },
  filterContainer: {
    marginHorizontal: -8,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 20,
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
    // Styling will be handled in ProductCard component
  },
});