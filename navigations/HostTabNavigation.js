import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { EvilIcons, Feather, Ionicons } from "@expo/vector-icons";

import { useSelector } from "react-redux";
import Colors from "../constants/Colors";

import LoginScreen from "../screens/UserScreens/LoginScreen";
import SignupScreen from "../screens/UserScreens/SignupScreen";

import CalendarScreen from "../screens/HostScreens/CalendarScreen";
import HostProfileScreen from "../screens/HostScreens/HostProfileScreen";
import EditHallScreen from "../screens/HostScreens/EditHallScreen";
import CompleteHostProfileScreen from "../screens/HostScreens/completeHostProfileScreen";
import ChatsScreen from "../screens/HostScreens/ChatsScreen";
import ChatScreen from "../screens/HostScreens/ChatScreen";
import EditImagesScreen from "./../screens/HostScreens/EditImagesScreen";
import HomeScreen from "./../screens/HostScreens/HomeScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HostTabNavigator = () => {
  const AuthStack = () => {
    const token = useSelector((state) => state.Auth.token);
    console.log("token ", token);
    console.log("tokennn", !token);
    return (
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
        }}
      >
        {!token && (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
        {token && (
          <>
            <Stack.Screen
              name="Profile"
              component={HostProfileScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="EditHall" component={EditHallScreen} />
            <Stack.Screen name="EditImages" component={EditImagesScreen} />
          </>
        )}
      </Stack.Navigator>
    );
  };

  const HomeStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="Homee" component={HomeScreen} />
        <Stack.Screen
          name="completeProfile"
          component={CompleteHostProfileScreen}
        />
      </Stack.Navigator>
    );
  };

  const ChatStack = () => {
    const token = useSelector((state) => state.Auth.token);

    return (
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="Chats" component={ChatsScreen} />
        {token && (
          <Stack.Screen
            name="HallChat"
            component={ChatScreen}
            options={({ route }) => ({
              title: route.params.title,
              headerBackTitleVisible: false, // for ios
            })}
          />
        )}
      </Stack.Navigator>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,

        // tabBarVisibilityAnimationConfig: true,
        headerTitleAlign: "center",
        tabBarLabel: ({ focused }) => {
          const token = useSelector((state) => state.Auth.token);
          const fontFamily = focused ? "open-sans-bold" : "open-sans";

          const BarText = (props) => {
            const { label } = props;
            return (
              <Text
                style={{
                  fontSize: focused ? 11 : 11.3,
                  color: "black",
                  fontFamily: fontFamily,
                }}
              >
                {label}
              </Text>
            );
          };

          let label;
          switch (route.name) {
            case "Home":
              label = "Home";
              break;
            case "ChatStack":
              label = "Chats";
              break;
            case "Calendar":
              label = "Calendar";
              break;
            case "Auth":
              label = !token ? "Login" : "Profile";
              break;
            case "Favorites":
              label = "Favorites";
              break;
          }
          return <BarText label={label} />;
        },

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor = focused ? Colors.accentColor : "black";
          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "ChatStack") {
            iconName = "chatbox-outline";
          } else if (route.name === "Calendar") {
            iconName = "calendar-outline";
          } else if (route.name === "Auth") {
            iconName = "user";
            return <EvilIcons name={iconName} size={30} color={iconColor} />;
          }
          return <Ionicons name={iconName} size={25} color={iconColor} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name="ChatStack" component={ChatStack} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Auth" component={AuthStack} />
    </Tab.Navigator>
  );
};

export default HostTabNavigator;
