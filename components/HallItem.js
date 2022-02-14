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

const HallItem = (props) => {
  console.log("HallItem");
  const { navigation, item } = props;

  const { id, name, email, number, images } = item;

  console.log(name);
  console.log(images[0]);

  const handleHallClick = () => {
    console.log("Hall clicked");
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
          <View style={{ flex: 1, paddingTop: 10, paddingHorizontal: 20 }}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={source} />
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
