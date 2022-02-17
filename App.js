import "react-native-gesture-handler";

import React, { useState } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { enableScreens } from "react-native-screens";
import { EvilIcons } from "@expo/vector-icons";

import FlashMessage from "react-native-flash-message";

import Colors from "./constants/Colors";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import HallListScreen from "./screens/HallListScreen";
import HallDetailScreen from "./screens/HallDetailScreen";
import LoginScreen from "./screens/LoginScreen";
import DefaultText from "./components/DefaultText";
import SignupScreen from "./screens/SignupScreen";

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

  const TabNavigation = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // headerShown: false,
          headerTitleAlign: "center",
          tabBarLabel: ({ focused }) => {
            if (route.name === "Explore") {
              console.log("isfocused", focused);
              return focused ? (
                <Text
                  style={{
                    fontSize: 12,
                    color: "black",
                    fontFamily: "open-sans-bold",
                  }}
                >
                  Explore
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 12.3,
                    color: "black",
                    fontFamily: "open-sans",
                  }}
                >
                  Explore
                </Text>
              );
            } else if (route.name === "Login") {
              return focused ? (
                <Text
                  style={{
                    fontSize: 12,
                    color: "black",
                    fontFamily: "open-sans-bold",
                  }}
                >
                  Login
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 12.3,
                    color: "black",
                    fontFamily: "open-sans",
                  }}
                >
                  Login
                </Text>
              );
            }
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let iconColor;
            if (route.name === "Explore") {
              iconName = "search";
              iconColor = focused ? Colors.accentColor : "black";
            } else if (route.name === "Login") {
              iconName = "user";
              iconColor = focused ? Colors.accentColor : "black";
            }
            return <EvilIcons name={iconName} size={30} color={iconColor} />;
          },
        })}
      >
        <Tab.Screen name="Explore" component={HallListScreen} />
        <Tab.Screen name="Login" component={LoginScreen} />
      </Tab.Navigator>
    );
  };
  return (
    <React.Fragment>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="HallList" component={TabNavigation} />
          <Stack.Screen name="HallDetail" component={HallDetailScreen} />
          <Stack.Screen name="Auth" component={TabNavigation} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage
        position={"center"}
        animated={true}
        animationDuration={500}
        autoHide={true}
        // style={{ borderRadius: "10" }}
      />
    </React.Fragment>
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
