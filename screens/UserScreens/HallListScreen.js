import React, { useEffect } from "react";
import HallList from "../../components/HallList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const HallListScreen = ({ navigation }) => {
  const userInfo = useSelector((state) => state.Auth.userInfo);

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

export default HallListScreen;
