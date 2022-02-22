import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Image,
  Text,
  Platform,
} from "react-native";
import DefaultText from "./DefaultText";
import ImageSlider from "./ImageSliderShow/ImageSlider";
import { useSelector } from "react-redux";
import Card from "./Card";
import { findDistanceBetween } from "./../constants/FindDistance";

let TouchableComponent = TouchableOpacity;
let android = false;
if (Platform.OS === "android") {
  TouchableComponent = TouchableNativeFeedback;
  android = true;
}

const HallItem = (props) => {
  const { navigation, item, favoriteNavigation } = props;

  const { id, name, email, location, number, images, isFavorite } = item;

  console.log("isFAvorite ", isFavorite);
  // const { lat, lng } = location;

  const currentLocation = useSelector(
    (state) => state.location.currentLocation
  );

  const kmAway = findDistanceBetween(location, currentLocation);

  const handleHallClick = () => {
    console.log("clicked");
    let customNavigation = navigation;
    if (favoriteNavigation) {
      customNavigation = favoriteNavigation;
    }
    customNavigation.navigate({
      name: "HallDetail",
      params: {
        hallId: id,
        name,
        email,
        location,
        number,
        images,
        isFavorite,
      },
    });
  };

  const source = require("../constants/images/beautiful-photozone-with-big-wreath-decorated-with-greenery-roses-centerpiece-candles-sides-garland-hanged-trees_8353-11019.jpg");
  const source1 = require("../constants/images/illustration-light-garland-transparent-background_257584-674.jpg");

  return (
    <Card>
      <View style={{ flex: 1, width: "100%" }}>
        <TouchableComponent
          onPress={handleHallClick}
          background={
            android ? TouchableNativeFeedback.Ripple("white", false) : null
          }
          //   useForeground
        >
          <View style={styles.contentContainer}>
            <View style={styles.imageContainer}>
              <ImageSlider dot images={[source, source1, source]} hallId={id} />
              {/* <Image style={styles.image} source={source} /> */}
            </View>
            <View style={styles.infoContainer}>
              <View>
                <DefaultText styles={{ fontFamily: "open-sans-bold" }}>
                  Tripoli, Lebanon
                </DefaultText>
                <DefaultText styles={{ color: "gray" }}>
                  {kmAway} km away
                </DefaultText>
              </View>
              {/* <DefaultText>{email}</DefaultText> */}
              <DefaultText>{number}</DefaultText>
            </View>
          </View>
        </TouchableComponent>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
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
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 5,
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
