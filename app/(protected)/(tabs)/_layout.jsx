import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import { Icon } from "react-native-paper";
// import { useTheme } from "../../../theme/ThemeContext";
import { useTheme } from "../theme/ThemeContext";
import Cart from "./Cart";
import Listing from "./Listing";
import UserProfile from "./UserProfile";

const Tab = createMaterialBottomTabNavigator();

export default function TabLayout() {
  const { theme } = useTheme();
  return (
    <Tab.Navigator
      barStyle={{
        backgroundColor: theme.surface,
        elevation: 8,
        shadowColor: theme.text,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        height: 60,
      }}
      activeColor={theme.primary}
      inactiveColor={theme.textSecondary}
      labeled={false}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Listing"
        component={Listing}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Icon
              color={color}
              source="home"
              size={focused ? 32 : 24}
              theme={theme}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarLabel: "Cart",
          tabBarIcon: ({ color, focused }) => (
            <Icon
              color={color}
              source="cart"
              size={focused ? 32 : 24}
              theme={theme}
            />
          ),
        }}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Icon
              color={color}
              source="account"
              size={focused ? 32 : 24}
              theme={theme}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
