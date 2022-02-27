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
              component={ProfileScreen}
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
      })}
    >
      <Tab.Screen name="Auth" component={AuthStack} />
    </Tab.Navigator>
  );
};

export default HostTabNavigator;
