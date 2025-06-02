import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Chip, Divider, Menu, Searchbar } from "react-native-paper";
import { useTheme } from "../theme/ThemeContext";

const FilterBar = ({ onFilterChange, onSearch }) => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: null,
    category: null,
    rating: null,
  });

  const priceRanges = [
    { label: "Under ₹10", value: "0-10" },
    { label: "₹10 - ₹25", value: "10-25" },
    { label: "₹25 - ₹50", value: "25-50" },
    { label: "Over ₹50", value: "50+" },
  ];

  const categories = ["indoor", "outdoor", "low-maintenance", "decorative"];

  const ratings = ["4", "3", "2"];

  const handleSearch = (query) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilterSelect = (type, value) => {
    const newFilters = { ...filters, [type]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
    setMenuVisible(false);
  };

  const clearFilters = () => {
    const emptyFilters = {
      priceRange: null,
      category: null,
      rating: null,
    };
    setFilters(emptyFilters);
    setSearchQuery("");
    onFilterChange(emptyFilters);
    onSearch("");
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(Boolean).length;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <Searchbar
        placeholder="Search products..."
        onChangeText={handleSearch}
        value={searchQuery}
        style={[styles.searchBar, { backgroundColor: theme.background }]}
        iconColor={theme.primary}
        inputStyle={{ color: theme.text }}
        placeholderTextColor={theme.textSecondary}
      />

      <View style={styles.filterContainer}>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Button
              mode="outlined"
              onPress={() => setMenuVisible(true)}
              icon="filter-variant"
              style={[styles.filterButton, { borderColor: theme.primary }]}
              textColor={theme.primary}
            >
              Filters{" "}
              {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
            </Button>
          }
        >
          <Menu.Item
            title="Price Range"
            leadingIcon="currency-usd"
            style={{ backgroundColor: theme.surface }}
          />
          {priceRanges.map((range) => (
            <Menu.Item
              key={range.value}
              title={range.label}
              onPress={() => handleFilterSelect("priceRange", range.value)}
              style={[
                styles.menuItem,
                filters.priceRange === range.value && {
                  backgroundColor: theme.primary + "20",
                },
              ]}
              titleStyle={{ color: theme.text }}
            />
          ))}
          <Divider />

          <Menu.Item
            title="Category"
            leadingIcon="shape"
            style={{ backgroundColor: theme.surface }}
          />
          {categories.map((category) => (
            <Menu.Item
              key={category}
              title={category}
              onPress={() => handleFilterSelect("category", category)}
              style={[
                styles.menuItem,
                filters.category === category && {
                  backgroundColor: theme.primary + "20",
                },
              ]}
              titleStyle={{ color: theme.text }}
            />
          ))}
          <Divider />

          <Menu.Item
            title="Rating"
            leadingIcon="star"
            style={{ backgroundColor: theme.surface }}
          />
          {ratings.map((rating) => (
            <Menu.Item
              key={rating}
              title={`${rating}+ Stars`}
              onPress={() => handleFilterSelect("rating", rating)}
              style={[
                styles.menuItem,
                filters.rating === rating && {
                  backgroundColor: theme.primary + "20",
                },
              ]}
              titleStyle={{ color: theme.text }}
            />
          ))}
        </Menu>

        {getActiveFiltersCount() > 0 && (
          <Button mode="text" onPress={clearFilters} textColor={theme.primary}>
            Clear
          </Button>
        )}
      </View>

      <View style={styles.activeFilters}>
        {filters.priceRange && (
          <Chip
            onClose={() => handleFilterSelect("priceRange", null)}
            style={[styles.chip, { backgroundColor: theme.primary + "20" }]}
            textStyle={{ color: theme.primary }}
          >
            {priceRanges.find((r) => r.value === filters.priceRange)?.label}
          </Chip>
        )}
        {filters.category && (
          <Chip
            onClose={() => handleFilterSelect("category", null)}
            style={[styles.chip, { backgroundColor: theme.primary + "20" }]}
            textStyle={{ color: theme.primary }}
          >
            {filters.category}
          </Chip>
        )}
        {filters.rating && (
          <Chip
            onClose={() => handleFilterSelect("rating", null)}
            style={[styles.chip, { backgroundColor: theme.primary + "20" }]}
            textStyle={{ color: theme.primary }}
          >
            {filters.rating}+ Stars
          </Chip>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  searchBar: {
    marginBottom: 8,
    elevation: 0,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  filterButton: {
    borderRadius: 8,
  },
  menuItem: {
    paddingLeft: 32,
  },
  activeFilters: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    marginRight: 4,
  },
});

export default FilterBar;
