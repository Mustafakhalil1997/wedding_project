import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import DefaultText from "./DefaultText";
import ImageSlider from "./ImageSliderShow/ImageSlider";
import { useSelector } from "react-redux";
import Card from "./Card";
import { findDistanceBetween } from "./../constants/FindDistance";
import { URL } from "./../helpers/url";
import { cloudinaryURL } from "./../helpers/cloudinaryURL";

let TouchableComponent = TouchableOpacity;
let android = false;
if (Platform.OS === "android") {
  TouchableComponent = TouchableNativeFeedback;
  android = true;
}

const HallItem = (props) => {
  const { navigation, item, isFavorite } = props;

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const {
    id,
    hallName,
    email,
    address,
    location,
    mobileNumber,
    images,
    bookings,
    ownerId,
    price,
  } = item;
  // console.log("price in hallItem ", price);
  // console.log("images ", images);
  // const { lat, lng } = location;

  const currentLocation = useSelector(
    (state) => state.location.currentLocation
  );

  const kmAway = findDistanceBetween(location, currentLocation);

  const handleHallClick = () => {
    let customNavigation = navigation;
    customNavigation.navigate({
      name: "HallDetail",
      params: {
        hallId: id,
        name: hallName,
        email,
        address,
        location,
        number: mobileNumber,
        images,
        bookings,
        price,
        // isFavorite: isFavorite, // when isFavorite is changed in the store, route parameters don't get updated unless they are revisited, so I can't pass isFavorite in here instead I have to directly access it from the store in HallDetailScreen
      },
    });
  };

  const convertedImagesUrl = images.map((image) => cloudinaryURL + image);

  const onLayout = (event) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    console.log("value s", x, y, width, height);
    setDimensions({ width: width, height: height });
  };

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
            <View
              onLayout={onLayout}
              style={[
                styles.imageContainer,
                { width: "100%", height: dimensions.width },
              ]}
            >
              <ImageSlider
                dot
                images={convertedImagesUrl}
                hallId={id}
                isFavorite={isFavorite}
                scrollEnabled={false}
              />
              {/* <Image style={styles.image} source={source} /> */}
            </View>
            <View style={styles.infoContainer}>
              <View style={{ width: "55%" }}>
                <DefaultText
                  styles={{
                    fontFamily: "open-sans-bold",
                  }}
                  numberOfLines={1}
                >
                  {address}
                </DefaultText>
                <DefaultText styles={{ color: "gray" }}>
                  {kmAway} km away
                </DefaultText>
              </View>
              {/* <DefaultText>{email}</DefaultText> */}
              <View style={{ alignItems: "flex-end" }}>
                <DefaultText>{mobileNumber}</DefaultText>
                <DefaultText>
                  <DefaultText style={{ fontFamily: "open-sans-bold" }}>
                    {price}${" "}
                  </DefaultText>
                  per person
                </DefaultText>
              </View>
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
    // paddingTop: 10,
    paddingHorizontal: 20,
  },

  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    // alignItems: "center",
    height: "20%",
  },
  imageContainer: {
    backgroundColor: "white",
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
