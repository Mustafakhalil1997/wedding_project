import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { EvilIcons, Feather, Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "./../components/HeaderButton";

import Colors from "../constants/Colors";

import HallListScreen from "../screens/HallListScreen";
import HallDetailScreen from "../screens/HallDetailScreen";
import FavoriteHallsScreen from "../screens/FavoriteHallsScreen";
import LoginScreen from "../screens/LoginScreen";
import DefaultText from "../components/DefaultText";
import SignupScreen from "../screens/SignupScreen";
import MapViewer from "../screens/MapViewer";
import ProfileScreen from "../screens/ProfileScreen";
import ChatScreen from "../screens/ChatScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import { Button } from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const HomeStack = ({ navigation, route }) => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="HallList"
          component={HallListScreen}
          options={{
            title: "Wedding Venues",
          }}
        />
        <Stack.Screen name="HallDetail" component={HallDetailScreen} />
      </Stack.Navigator>
    );
  };

  const FavoriteStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="MyFavorites"
          component={FavoriteHallsScreen}
          options={{
            title: "My Favorites",
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
          headerShown: false,
        }}
      >
        <Stack.Screen name="Map" component={MapViewer} />
        {/* <Stack.Screen component={HallDetailScreen} /> */}
      </Stack.Navigator>
    );
  };

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
                headerRight: () => (
                  //   <Text>Save</Text>

                  <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                      title="Save"
                      iconName="save-outline"
                      onPress={() => {}}
                    />
                  </HeaderButtons>
                ),
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
            case "Chats":
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
          } else if (route.name === "Chats") {
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
        name="Chats"
        component={ChatScreen}
        options={{
          headerShown: true,
        }}
      />
      <Tab.Screen name="Auth" component={AuthStack} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
