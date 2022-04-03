import React from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import DefaultText from "../components/DefaultText";

const HomeScreen = (props) => {
  const { navigation } = props;

  const goToName = () => {
    navigation.navigate({
      name: "completeProfile",
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goToName}>
          <View style={styles.buttonTextStyle}>
            <DefaultText styles={{ fontFamily: "open-sans-bold" }}>
              COMPLETE YOUR PROFILE
            </DefaultText>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  header: {
    backgroundColor: "black",
    height: 250,
    justifyContent: "flex-end",
    padding: 30,
  },
  buttonTextStyle: {
    padding: 7,
    borderRadius: 7,
    backgroundColor: "white",
    alignSelf: "flex-start",
  },
});

export default HomeScreen;
