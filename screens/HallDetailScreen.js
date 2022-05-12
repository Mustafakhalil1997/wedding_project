import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import ImageSlider from "./../components/ImageSliderShow/ImageSlider";
import DefaultText from "./../components/DefaultText";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import MapViewer from "./MapViewer";
import { useSelector, useDispatch } from "react-redux";
import { reserveHall } from "../store/actions/HallList";
import { showMessage } from "react-native-flash-message";
import { URL } from "./../helpers/url";
import { Calendar } from "react-native-calendars";
import CalendarReserve from "./../components/CalendarReserve";

const HallDetailScreen = (props) => {
  const { route, navigation } = props;

  const { hallId, name, email, address, location, number, images, price } =
    route.params;

  console.log("pricee ", price);

  // convertedImagesUrl = URL + "/" + profileImage.replace(/\\/g, "/");

  // const source = require("../constants/images/beautiful-photozone-with-big-wreath-decorated-with-greenery-roses-centerpiece-candles-sides-garland-hanged-trees_8353-11019.jpg");
  // const source1 = require("../constants/images/illustration-light-garland-transparent-background_257584-674.jpg");
  // const source2 = require("../constants/images/pexels-jeremy-wong-1035665.jpg");
  // const source3 = require("../constants/images/pexels-logan-rhoads-10905822.jpg");

  const convertedImagesUrl = images.map(
    (image) => URL + "/" + image.replace(/\\/g, "/")
  );

  console.log("converted Images ", convertedImagesUrl);

  const dispatch = useDispatch();

  // const { hallId } = route.params;
  console.log("location ", location);
  const [openMap, setOpenMap] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);

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
  // const userId = userInfo.id;
  const { id: userId, reservation } = userInfo;

  let halls = useSelector((state) => state.halls.hallList);
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
      return;
    }
    // if (reservation) {
    //   showMessage({
    //     message: "Cannot Reserve",
    //     description: "you already have a reservation",
    //     style: { backgroundColor: "black" },
    //   });
    //   return;
    // }

    setOpenCalendar(true);
    // dispatch(reserveHall(reservation));
  };

  if (openCalendar) {
    return <CalendarReserve hallId={hallId} userId={userId} />;
  }

  return (
    <ScrollView>
      {/* <SafeAreaView style={{ flex: 1, backgroundColor: "pink" }}> */}
      <View style={styles.screenContainer}>
        <View style={styles.imagesContainer}>
          <ImageSlider
            // images={[source, source1, source]}
            images={[...convertedImagesUrl]}
            hallId={hallId}
            isFavorite={favorite()}
            scrollEnabled={true}
          />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.hallNameContainer}>
            <DefaultText styles={{ fontSize: 32, marginBottom: 10 }}>
              {name}
            </DefaultText>
            <View style={styles.location}>
              <DefaultText styles={{ fontSize: 14 }}>{address}</DefaultText>

              <TouchableOpacity onPress={mapIconClickHandler}>
                <Feather name="map-pin" size={22} color="green" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.priceContainer}>
            <DefaultText styles={{ fontSize: 24 }}>Prices</DefaultText>
            <View style={styles.offer}>
              <DefaultText styles={{ width: "70%" }}>
                We offer one of the best services there is, let us handle
                everything for you and you won't regret it
              </DefaultText>
              <Text style={{ alignSelf: "center" }}>{price}$ per person</Text>
            </View>
            <View style={styles.offer}>
              <DefaultText styles={{ width: "70%" }}>
                Our Premium Offer. Our best offer with the North hall, let
                everything be on us and have a beautiful nice wedding
              </DefaultText>
              <Text style={{ alignSelf: "center" }}>2000$</Text>
            </View>
            <View style={styles.offer}>
              <DefaultText style={{ width: "70%" }}>
                Our Premium ooOffer. Our best offer with the North hall, let
                everything be on us and have a beautiful nice wedding
              </DefaultText>
              <Text style={{ alignSelf: "center" }}>2000$</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={reserveClickHandler}
            style={styles.reserveButtonContainer}
          >
            <DefaultText styles={styles.reserveButtonText}>RESERVE</DefaultText>
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
  reserveButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  reserveButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default HallDetailScreen;
