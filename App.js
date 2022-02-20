import "react-native-gesture-handler";

import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { enableScreens } from "react-native-screens";
import { EvilIcons, Feather, Ionicons } from "@expo/vector-icons";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import ReduxThunk from "redux-thunk";
import FlashMessage from "react-native-flash-message";
import Colors from "./constants/Colors";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import HallListScreen from "./screens/HallListScreen";
import HallDetailScreen from "./screens/HallDetailScreen";
import FavoriteHallsScreen from "./screens/FavoriteHallsScreen";
import LoginScreen from "./screens/LoginScreen";
import DefaultText from "./components/DefaultText";
import SignupScreen from "./screens/SignupScreen";
import MapViewer from "./screens/MapViewer";
import hallListReducer from "./store/reducers/HallList";
import currentLocationReducer from "./store/reducers/Location";

enableScreens();

const rootReducer = combineReducers({
  halls: hallListReducer,
  location: currentLocationReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

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
            const fontFamily = focused ? "open-sans-bold" : "open-sans";
            if (route.name === "Explore") {
              console.log("isfocused", focused);
              return (
                <Text
                  style={{
                    fontSize: focused ? 12 : 12.3,
                    color: "black",
                    fontFamily: fontFamily,
                  }}
                >
                  Explore
                </Text>
              );
            } else if (route.name === "MapView") {
              return (
                <Text
                  style={{
                    fontSize: focused ? 12 : 12.3,
                    color: "black",
                    fontFamily: fontFamily,
                  }}
                >
                  Map
                </Text>
              );
            } else if (route.name === "Login") {
              return (
                <Text
                  style={{
                    fontSize: focused ? 12 : 12.3,
                    color: "black",
                    fontFamily: fontFamily,
                  }}
                >
                  Login
                </Text>
              );
            } else if (route.name === "Favorites") {
              return (
                <Text
                  style={{
                    fontSize: focused ? 12 : 12.3,
                    color: "black",
                    fontFamily: fontFamily,
                  }}
                >
                  Favorites
                </Text>
              );
            }
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let iconColor = focused ? Colors.accentColor : "black";
            if (route.name === "Explore") {
              iconName = "search";
            } else if (route.name === "Login") {
              iconName = "user";
            } else if (route.name === "Favorites") {
              iconName = "heart-outline";
              return <Ionicons name={iconName} size={25} color={iconColor} />;
            } else if (route.name === "MapView") {
              iconName = "map-pin";
              return <Feather name={iconName} size={22} color={iconColor} />;
            }
            return <EvilIcons name={iconName} size={30} color={iconColor} />;
          },
        })}
      >
        <Tab.Screen name="Explore" component={HallListScreen} />
        <Tab.Screen name="Favorites" component={FavoriteHallsScreen} />
        <Tab.Screen name="MapView" component={MapViewer} />
        <Tab.Screen name="Login" component={LoginScreen} />
      </Tab.Navigator>
    );
  };
  return (
    <Provider store={store}>
      <SafeAreaProvider>
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
            <Stack.Screen name="MapView" component={MapViewer} />
          </Stack.Navigator>
        </NavigationContainer>
        <FlashMessage
          position={"center"}
          animated={true}
          animationDuration={500}
          autoHide={true}
          // style={{ borderRadius: "10" }}
        />
      </SafeAreaProvider>
    </Provider>
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
