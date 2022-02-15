import React from "react";
import { View, StyleSheet, Text, TouchableNativeFeedback } from "react-native";
import HallList from "../components/HallList";
import ImageSlider from "./../components/ImageSliderShow/ImageSlider";
import { SliderBox } from "react-native-image-slider-box";

const HallListScreen = ({ navigation }) => {
  const source = require("../constants/images/beautiful-photozone-with-big-wreath-decorated-with-greenery-roses-centerpiece-candles-sides-garland-hanged-trees_8353-11019.jpg");
  const source1 = require("../constants/images/illustration-light-garland-transparent-background_257584-674.jpg");

  const press = () => {
    console.log("clicked");
  };
  console.log("HallListScreen");
  return (
    <View style={styles.screenContainer}>
      {/* <ImageSlider images={[source, source1, source]} /> */}
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
