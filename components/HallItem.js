import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Image,
  Text,
} from "react-native";
import DefaultText from "./DefaultText";
import ImageSlider from "./ImageSliderShow/ImageSlider";

const HallItem = (props) => {
  console.log("HallItem");
  const { navigation, item } = props;

  const { id, name, email, location, number, images } = item;

  const handleHallClick = () => {
    console.log("clicked");
    navigation.navigate({
      name: "HallDetail",
      params: {
        id,
        name,
        email,
        location,
        number,
        images,
      },
    });
  };

  const source = require("../constants/images/beautiful-photozone-with-big-wreath-decorated-with-greenery-roses-centerpiece-candles-sides-garland-hanged-trees_8353-11019.jpg");
  const source1 = require("../constants/images/illustration-light-garland-transparent-background_257584-674.jpg");

  return (
    <View style={styles.itemContainer}>
      <View style={{ flex: 1, width: "100%" }}>
        <TouchableNativeFeedback
          onPress={handleHallClick}
          background={TouchableNativeFeedback.Ripple("white", false)}
          //   useForeground
        >
          <View style={styles.contentContainer}>
            <View style={styles.imageContainer}>
              <ImageSlider
                dot
                images={[source, source1, source]}
                styles={{ width: "100%", height: "80%" }}
              />
              {/* <Image style={styles.image} source={source} /> */}
            </View>
            <View style={styles.infoContainer}>
              <View>
                <DefaultText styles={{ fontFamily: "open-sans-bold" }}>
                  Tripoli, Lebanon
                </DefaultText>
                <DefaultText>1000 km away</DefaultText>
              </View>
              {/* <DefaultText>{email}</DefaultText> */}
              <DefaultText>{number}</DefaultText>
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 5,

    alignItems: "center",
    // borderRadius: 10,
    height: 350,
    overflow: "hidden",
  },

  contentContainer: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
  },

  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    // alignItems: "center",
    // backgroundColor: "green",
    height: "15%",
  },
  imageContainer: {
    width: "100%",
    height: "80%",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  //   hallItem: {
  //       flexDirection: "row"
  //   }
});

export default HallItem;
