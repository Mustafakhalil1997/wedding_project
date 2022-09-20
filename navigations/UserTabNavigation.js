import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { EvilIcons, Feather, Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import Colors from "../constants/Colors";

import HallListScreen from "../screens/UserScreens/HallListScreen";
import HallDetailScreen from "../screens/UserScreens/HallDetailScreen";
import FavoriteHallsScreen from "../screens/UserScreens/FavoriteHallsScreen";
import LoginScreen from "../screens/UserScreens/LoginScreen";
import SignupScreen from "../screens/UserScreens/SignupScreen";
import MapViewer from "../screens/UserScreens/MapViewer";
import ProfileScreen from "../screens/UserScreens/ProfileScreen";
import EditProfileScreen from "../screens/UserScreens/EditProfileScreen";
import ReservationScreen from "../screens/UserScreens/ReservationScreen";
import CalendarReserveScreen from "../screens/UserScreens/CalendarReserveScreen";
import ChatsScreen from "./../screens/UserScreens/ChatsScreen";
import ChatScreen from "./../screens/UserScreens/ChatScreen";
import ChangePasswordScreen from "./../screens/UserScreens/ChangePasswordScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const UserTabNavigator = () => {
  const HomeStack = ({ navigation, route }) => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          // headerShown: false,
        }}
      >
        <Stack.Screen
          name="HallList"
          component={HallListScreen}
          options={{
            title: "Wedding Venues",
            headerShown: false,
          }}
        />
        <Stack.Screen name="HallDetail" component={HallDetailScreen} />
        <Stack.Screen
          name="CalendarReserve"
          component={CalendarReserveScreen}
        />
      </Stack.Navigator>
    );
  };

  const FavoriteStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          // headerShown: false,
        }}
      >
        <Stack.Screen
          name="MyFavorites"
          component={FavoriteHallsScreen}
          options={{
            title: "My Favorites",
            headerShown: false,
          }}
        />
        <Stack.Screen name="HallDetail" component={HallDetailScreen} />
      </Stack.Navigator>
    );
  };

  const MapStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="Map"
          component={MapViewer}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="HallDetail" component={HallDetailScreen} />
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
        <Stack.Screen
          name="Chats"
          component={ChatsScreen}
          options={{ headerShown: false }}
        />
        {token && (
          <Stack.Screen
            name="UserChat"
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

  const AuthStack = () => {
    const token = useSelector((state) => state.Auth.token);
    return (
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          // headerShown: false,
        }}
      >
        {!token && (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
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
                headerStyle: {
                  backgroundColor: "white",
                },
              }}
            />
            <Stack.Screen
              name="MyReservation"
              component={ReservationScreen}
              options={{
                title: "",
                headerStyle: {
                  backgroundColor: "white",
                },
              }}
            />
            <Stack.Screen
              name="ChangePassword"
              component={ChangePasswordScreen}
            />
            <Stack.Screen name="HallDetail" component={HallDetailScreen} />
          </>
        )}
      </Stack.Navigator>
    );
  };

  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : "";

    if (routeName === "Chat") {
      return false;
    }
    return true;
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
            case "Explore":
              label = "Explore";
              break;
            case "MapView":
              label = "Map";
              break;
            case "ChatStack":
              label = "Chats";
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
          if (route.name === "Explore") {
            iconName = "search";
          } else if (route.name === "Auth") {
            iconName = "user";
          } else if (route.name === "Favorites") {
            iconName = "heart-outline";
            return <Ionicons name={iconName} size={25} color={iconColor} />;
          } else if (route.name === "MapView") {
            iconName = "map-pin";
            return <Feather name={iconName} size={22} color={iconColor} />;
          } else if (route.name === "ChatStack") {
            iconName = "chatbox-outline";
            return <Ionicons name={iconName} size={22} color={iconColor} />;
          }
          return <EvilIcons name={iconName} size={30} color={iconColor} />;
        },
      })}
    >
      <Tab.Screen name="Explore" component={HomeStack} />
      <Tab.Screen name="Favorites" component={FavoriteStack} />
      <Tab.Screen name="MapView" component={MapStack} />
      <Tab.Screen
        name="ChatStack"
        component={ChatStack}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisibility(route), // doesn't work
        })}
      />
      <Tab.Screen name="Auth" component={AuthStack} />
    </Tab.Navigator>
  );
};

export default UserTabNavigator;
