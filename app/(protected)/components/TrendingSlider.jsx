import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';

const { width: screenWidth } = Dimensions.get('window');

export default function TrendingGrid({ trendingPlants = [] }) {
  const router = useRouter();
  const { theme } = useTheme();

  const handleProductPress = (productId) => {
    router.push(`/product/${productId}`);
  };

  const handleViewAllPress = () => {
    router.push('/collection/trending');
  };

  const TrendingCard = ({ item }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.98,
        useNativeDriver: true,
        tension: 200,
        friction: 7,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 200,
        friction: 7,
      }).start();
    };

    return (
      <Animated.View style={[styles.cardWrapper, { transform: [{ scale: scaleAnim }] }]}>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: theme.surface }]}
          onPress={() => handleProductPress(item.id)}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
        >
          {/* Image Container */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item.imagesrc }}
              style={styles.cardImage}
              resizeMode="cover"
            />
          </View>

          {/* Card Content */}
          <View style={styles.cardContent}>
            <Text style={[styles.plantName, { color: theme.text }]} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={[styles.plantPrice, { color: theme.textSecondary }]}>
              ₹{item.price}
            </Text>
            
            {/* Rating */}
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={12} color="#FFB800" />
              <Text style={[styles.ratingText, { color: theme.textSecondary }]}>
                {item.rating}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Trending Plants
        </Text>
        <TouchableOpacity onPress={handleViewAllPress} activeOpacity={0.7}>
          <View style={styles.viewAllContainer}>
            <Text style={[styles.viewAllText, { color: theme.primary }]}>
              View All
            </Text>
            <Ionicons name="arrow-forward" size={14} color={theme.primary} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Grid Container */}
      <View style={styles.gridContainer}>
        {trendingPlants.slice(0, 6).map((item, index) => (
          <TrendingCard key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginVertical: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  viewAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '48%',
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  imageContainer: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardContent: {
    padding: 12,
  },
  plantName: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 4,
  },
  plantPrice: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
});