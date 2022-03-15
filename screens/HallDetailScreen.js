import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ImageSlider from "./../components/ImageSliderShow/ImageSlider";
import DefaultText from "./../components/DefaultText";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import MapViewer from "./MapViewer";
import { useSelector, useDispatch } from "react-redux";
import { reserveHall } from "../store/actions/HallList";
import { showMessage } from "react-native-flash-message";

const HallDetailScreen = (props) => {
  const { route, navigation } = props;

  const { hallId, name, email, location, number, images } = route.params;

  const dispatch = useDispatch();

  // const { hallId } = route.params;
  console.log("location ", location);
  const [openMap, setOpenMap] = useState(false);

  const source = require("../constants/images/beautiful-photozone-with-big-wreath-decorated-with-greenery-roses-centerpiece-candles-sides-garland-hanged-trees_8353-11019.jpg");
  const source1 = require("../constants/images/illustration-light-garland-transparent-background_257584-674.jpg");
  const source2 = require("../constants/images/pexels-jeremy-wong-1035665.jpg");
  const source3 = require("../constants/images/pexels-logan-rhoads-10905822.jpg");

  const mapIconClickHandler = () => {
    navigation.navigate({
      name: "MapView",
      params: {
        location: location,
        title: name,
      },
    });
  };

  const userInfo = useSelector((state) => state.Auth.userInfo);
  const userId = userInfo.id;

  const halls = useSelector((state) => state.halls.hallList);
  console.log("halls ", halls);
  const hall = halls.find((h) => h.id === hallId);
  console.log("hall ", hall);

  let favorite = () => {
    if (Object.keys(userInfo).length === 0) return false;
    if (userInfo.favorites.includes(hallId)) return true;
    return false;
  };

  const reserveClickHandler = () => {
    if (Object.keys(userInfo).length === 0) {
      showMessage({
        message: "To Book a hall, sign in!",
        type: "success",
        style: { backgroundColor: "black" },
      });
    } else {
      const reservation = {
        id: "r1",
        userId: userId,
        hallId: hallId,
        date: "15/3/2022",
        price: 100,
      };
      dispatch(reserveHall(reservation));
      // send to the server
      // update the reservations of each hall
      // insure each date is unique for a reservation
    }
  };

  // if (openMap) {
  //   // return <MapViewer location={location} name={name} />;
  // }

  return (
    <ScrollView>
      {/* <SafeAreaView style={{ flex: 1, backgroundColor: "pink" }}> */}
      <View style={styles.screenContainer}>
        <View style={styles.imagesContainer}>
          <ImageSlider
            images={[source, source1, source]}
            hallId={hallId}
            isFavorite={favorite()}
          />
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

              <TouchableOpacity onPress={mapIconClickHandler}>
                <Feather name="map-pin" size={22} color="green" />
              </TouchableOpacity>
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
          </View>

          <TouchableOpacity
            onPress={reserveClickHandler}
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 12,
              paddingHorizontal: 32,
              borderRadius: 4,
              elevation: 3,
              backgroundColor: "black",
            }}
          >
            <DefaultText
              styles={{
                fontSize: 16,
                lineHeight: 21,
                fontWeight: "bold",
                letterSpacing: 0.25,
                color: "white",
              }}
            >
              RESERVE
            </DefaultText>
          </TouchableOpacity>
        </View>
      </View>
      {/* </SafeAreaView> */}
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
    alignItems: "center",
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
