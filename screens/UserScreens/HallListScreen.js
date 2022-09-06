import React, { useEffect, useLayoutEffect } from "react";
import { View, StyleSheet, Text, TouchableNativeFeedback } from "react-native";
import HallList from "../../components/HallList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import CustomHeader from "../../components/CustomHeader";

const HallListScreen = ({ navigation }) => {
  const userInfo = useSelector((state) => state.Auth.userInfo);
  const hallInfo = useSelector((state) => state.Auth.hallInfo);

  console.log("userInfo ", userInfo);

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: () => <CustomHeader title="Wedding Halls" />,
  //   });
  // }, []);

  // need to check if chats are reset after logout do tomorrow

  // still can't decide the right place for calling this method, maybe app.js would be better
  // this doesn't work in app.js as the file only runs once when the app is loaded

  useEffect(() => {
    const setStorage = async () => {
      await AsyncStorage.getItem("@token", async (err, val) => {
        const jsonValue = JSON.parse(val);
        const newValue = { ...jsonValue, userInfo };
        const newJsonObject = JSON.stringify(newValue);
        await AsyncStorage.setItem("@token", newJsonObject);
      });
    };
    if (userInfo) setStorage();
  }, [userInfo]);

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={{
        flex: 1,
        paddingTop: insets.top,
      }}
    >
      <HallList navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default HallListScreen;
