import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { EvilIcons, Feather, Ionicons } from "@expo/vector-icons";
import HallListScreen from "./../screens/HallListScreen";
import HallDetailScreen from "./../screens/HallDetailScreen";
import LoginScreen from "./../screens/LoginScreen";
import SignupScreen from "./../screens/SignupScreen";
import ProfileScreen from "./../screens/ProfileScreen";
import EditProfileScreen from "./../screens/EditProfileScreen";
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";
import HomeScreen from "./../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import CalendarScreen from "./../screens/CalendarScreen";
import HostProfileScreen from "./../screens/HostProfileScreen";
import EditHallScreen from "./../screens/EditHallScreen";

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
            <Stack.Screen
              name="Edit"
              component={EditProfileScreen}
              options={{
                title: "",
              }}
            />
            <Stack.Screen name="EditHall" component={EditHallScreen} />
          </>
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
            case "Chats":
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
          } else if (route.name === "Chats") {
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
        component={HomeScreen}
        options={{
          headerShown: true,
        }}
      />
      <Tab.Screen name="Chats" component={ChatScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Auth" component={AuthStack} />
    </Tab.Navigator>
  );
};

export default HostTabNavigator;
