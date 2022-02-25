import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { EvilIcons, Feather, Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HostTabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen />
    </Tab.Navigator>
  );
};
