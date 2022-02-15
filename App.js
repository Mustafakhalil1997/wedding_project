import "react-native-gesture-handler";

import React, { useState } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { enableScreens } from "react-native-screens";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import HallListScreen from "./screens/HallListScreen";
import HallDetailScreen from "./screens/HallDetailScreen";
import LoginScreen from "./screens/LoginScreen";

enableScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }

  const MainStackNavigator = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="HallList" component={HallListScreen} />
        <Stack.Screen name="HallDetail" component={HallDetailScreen} />
      </Stack.Navigator>
    );
  };

  const TabNavigation = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="Home" component={HallListScreen} />
        <Tab.Screen name="Login" component={LoginScreen} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="HallList" component={TabNavigation} />
        <Stack.Screen name="HallDetail" component={HallDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
