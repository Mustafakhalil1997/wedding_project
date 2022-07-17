import "react-native-gesture-handler";

import React, { useState, useEffect } from "react";
import { StyleSheet, Animated, Easing } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { enableScreens } from "react-native-screens";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import ReduxThunk from "redux-thunk";
import FlashMessage from "react-native-flash-message";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import NetInfo from "@react-native-community/netinfo";

import hallListReducer from "./store/reducers/HallList";
import currentLocationReducer from "./store/reducers/Location";
import AuthReducer from "./store/reducers/Auth";
import ChatReducer from "./store/reducers/Chat";
import connectionReducer from "./store/reducers/Connection";

import UserTabNavigator from "./navigations/UserTabNavigation";
import SwitchNavigation from "./navigations/SwitchNavigation";
import { setToken } from "./store/actions/Auth";
import { setConnection } from "./store/actions/Connection";

const date = new Date();
setTimeout(() => {
  const date1 = new Date();
  console.log("compare dates ", date1 > date);
}, 5000);
console.log(date);

// init()
//   .then(() => {
//     console.log("Initialized database");
//   })
//   .catch((err) => {
//     console.log("Initializeding db failed");
//     console.log(err);
//   });

enableScreens();

const rootReducer = combineReducers({
  halls: hallListReducer,
  location: currentLocationReducer,
  Auth: AuthReducer,
  Chats: ChatReducer,
  Connection: connectionReducer,
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

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log("connectinon state ", state);
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      store.dispatch(setConnection(state));
    });
  }, []);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }

  store.dispatch(setToken());

  return (
    <SafeAreaProvider>
      <Provider store={store}>
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
      </Provider>
    </SafeAreaProvider>

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
