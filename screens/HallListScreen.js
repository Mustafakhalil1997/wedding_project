import React from "react";
import { View, StyleSheet, Text, TouchableNativeFeedback } from "react-native";
import HallList from "../components/HallList";

const HallListScreen = ({ navigation }) => {
  const press = () => {
    console.log("clicked");
  };
  console.log("HallListScreen");
  return (
    <View style={styles.screenContainer}>
      <HallList navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
});

export default HallListScreen;
