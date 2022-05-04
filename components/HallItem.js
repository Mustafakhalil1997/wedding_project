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

console.log("OS ", android);

const HallItem = (props) => {
  const { navigation, item, isFavorite } = props;

  const {
    id,
    hallName,
    email,
    location,
    mobileNumber,
    images,
    bookings,
    ownerId,
  } = item;

  console.log("hallNamee ", hallName);
  // const { lat, lng } = location;

  const currentLocation = useSelector(
    (state) => state.location.currentLocation
  );

  const kmAway = findDistanceBetween(location, currentLocation);

  const handleHallClick = () => {
    let customNavigation = navigation;
    // if (favoriteNavigation) {
    //   customNavigation = favoriteNavigation;
    // }
    customNavigation.navigate({
      name: "HallDetail",
      params: {
        hallId: id,
        name: hallName,
        email,
        location,
        number: mobileNumber,
        images,
        bookings,
        // isFavorite: isFavorite, // when isFavorite is changed in the store, route parameters don't get updated unless they are revisited, so I can't pass isFavorite in here instead I have to directly access it from the store in HallDetailScreen
      },
    });
  };

  const source = require("../constants/images/beautiful-photozone-with-big-wreath-decorated-with-greenery-roses-centerpiece-candles-sides-garland-hanged-trees_8353-11019.jpg");
  const source1 = require("../constants/images/illustration-light-garland-transparent-background_257584-674.jpg");

  return (
    <Card>
      <View style={{ flex: 1 }}>
        <TouchableComponent
          onPress={handleHallClick}
          background={
            android ? TouchableNativeFeedback.Ripple("white", false) : null
          }
          //   useForeground
        >
          <View style={styles.contentContainer}>
            <View style={styles.imageContainer}>
              <ImageSlider
                dot
                images={[source, source1, source]}
                hallId={id}
                isFavorite={isFavorite}
              />
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
              <DefaultText>{mobileNumber}</DefaultText>
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
