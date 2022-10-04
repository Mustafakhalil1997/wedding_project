import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentLocation } from "../../store/actions/Location";
import DefaultText from "../../components/DefaultText";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

// const { width } = Dimensions.get("window");

const HomeScreen = (props) => {
  const { navigation } = props;

  const dispatch = useDispatch();

  const hallInfo = useSelector((state) => state.Auth.hallInfo);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    const loadCurrentLocation = async () => {
      dispatch(setCurrentLocation());
    };
    loadCurrentLocation();
  }, [dispatch]);

  const goToCompleteProfile = () => {
    navigation.navigate({
      name: "completeProfile",
    });
  };

  if (hallInfo) {
    return (
      <SafeAreaView
        edges={["left", "right"]}
        style={{
          flex: 1,
          paddingTop: insets.top,
        }}
      >
        <DefaultText>Welcome.. You already have a hall</DefaultText>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={{
        flex: 1,
        paddingTop: insets.top,
      }}
    >
      <ScrollView contentContainerStyle={styles.screenContainer}>
        <View style={styles.header}>
          <ImageBackground
            source={require("../.././constants/images/Roger.jpg")}
            resizeMode="cover"
            style={styles.backgroundImage}
          >
            <TouchableOpacity onPress={goToCompleteProfile}>
              <View style={styles.buttonTextStyle}>
                <DefaultText styles={{ fontFamily: "open-sans-bold" }}>
                  COMPLETE YOUR PROFILE
                </DefaultText>
              </View>
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View style={{ height: 250 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  header: {
    height: 250,
    justifyContent: "flex-end",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
  },
  buttonTextStyle: {
    padding: 7,
    borderRadius: 7,
    backgroundColor: "white",
    alignSelf: "flex-start",
  },
  hallNameInput: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});

export default HomeScreen;
