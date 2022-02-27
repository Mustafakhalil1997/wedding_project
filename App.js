import "react-native-gesture-handler";

import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { enableScreens } from "react-native-screens";
import { EvilIcons, Feather, Ionicons } from "@expo/vector-icons";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider, useSelector } from "react-redux";

import ReduxThunk from "redux-thunk";
import FlashMessage from "react-native-flash-message";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import hallListReducer from "./store/reducers/HallList";
import currentLocationReducer from "./store/reducers/Location";
import AuthReducer from "./store/reducers/Auth";
import UserTabNavigator from "./navigations/UserTabNavigation";
import SwitchNavigation from "./navigations/SwitchNavigation";

enableScreens();

const rootReducer = combineReducers({
  halls: hallListReducer,
  location: currentLocationReducer,
  Auth: AuthReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "acme-regular": require("./assets/fonts/Acme-Regular.ttf"),
    "abel-regular": require("./assets/fonts/abel-regular.ttf"),
  });
};

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

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          {/* <UserTabNavigator /> */}
          <SwitchNavigation />
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
