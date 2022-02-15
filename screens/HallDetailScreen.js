import React from "react";

import { View, Text, StyleSheet } from "react-native";
import ImageSlider from "./../components/ImageSliderShow/ImageSlider";
import DefaultText from "./../components/DefaultText";
import { ScrollView } from "react-native-gesture-handler";

const HallDetailScreen = (props) => {
  const { route, navigation } = props;

  const { id, name, email, location, number, images } = route.params;

  const source = require("../constants/images/beautiful-photozone-with-big-wreath-decorated-with-greenery-roses-centerpiece-candles-sides-garland-hanged-trees_8353-11019.jpg");
  const source1 = require("../constants/images/illustration-light-garland-transparent-background_257584-674.jpg");

  return (
    <ScrollView>
      <View style={styles.screenContainer}>
        <View style={styles.imagesContainer}>
          <ImageSlider images={[source, source1]} />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.hallNameContainer}>
            <DefaultText styles={{ fontSize: 32, marginBottom: 10 }}>
              {name}
            </DefaultText>
            <View style={styles.location}>
              <DefaultText styles={{ fontSize: 14 }}>
                Abu samra, Tripoli, Lebanon
              </DefaultText>
              <Text>Icon find on map</Text>
            </View>
          </View>

          <View style={styles.priceContainer}>
            <DefaultText styles={{ fontSize: 24 }}>Prices</DefaultText>
            <View style={styles.offer}>
              <Text style={{ width: "70%" }}>
                Our Premium Offer. Our best offer with the North hall, let
                everything be on us and have a beautiful nice wedding
              </Text>
              <Text style={{ alignSelf: "center" }}>2000$</Text>
            </View>
            <View style={styles.offer}>
              <Text style={{ width: "70%" }}>
                Our Premium ooOffer. Our best offer with the North hall, let
                everything be on us and have a beautiful nice wedding
              </Text>
              <Text style={{ alignSelf: "center" }}>2000$</Text>
            </View>
            <View>
              <Text>Price Details</Text>
            </View>
          </View>
          <Text>Find on Map</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  imagesContainer: {
    height: 250,
  },
  infoContainer: {
    marginTop: 15,
    width: "90%",
    alignSelf: "center",
  },
  hallNameContainer: {
    padding: 20,
    paddingLeft: 0,
    borderBottomWidth: 0.3,
  },
  location: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priceContainer: {
    padding: 20,
    paddingLeft: 0,
    borderBottomWidth: 0.3,
  },
  offer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default HallDetailScreen;
