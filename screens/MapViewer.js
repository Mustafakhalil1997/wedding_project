import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useSelector } from "react-redux";

const locations = [
  {
    hallId: "h1",
    title: "North Hall",
    lat: 34.431093869627254,
    lng: 35.8377506411768,
  },
  {
    hallId: "h2",
    title: "West Hall",
    lat: 34.15550968858545,
    lng: 35.64338541736089,
  },
  {
    hallId: "h3",
    title: "5 Star Hall",
    lat: 39.92801442507861,
    lng: 32.83767491273409,
  },
];

const MapViewer = ({ route, navigation }) => {
  // const [currentLocation, setCurrentLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const currentLocation = useSelector(
    (state) => state.location.currentLocation
  );

  let title;
  let lat;
  let lng;
  if (route.params) {
    title = route.params.title;
    lat = route.params.location.lat;
    lng = route.params.location.lng;
  } else {
    if (currentLocation) {
      console.log("currentLocation ", currentLocation);
      lat = currentLocation.latitude;
      lng = currentLocation.longitude;
    }
  }

  const markerClickHandler = () => {
    navigation.navigate({
      name: "HallDetail",
      params: {
        id: "u4",
      },
    });
  };

  const source = require("../constants/images/beautiful-photozone-with-big-wreath-decorated-with-greenery-roses-centerpiece-candles-sides-garland-hanged-trees_8353-11019.jpg");

  return (
    <View style={styles.container}>
      {currentLocation && (
        <MapView
          style={styles.map}
          region={
            route.params
              ? {
                  latitude: lat,
                  longitude: lng,
                  latitudeDelta: 0.03,
                  longitudeDelta: 0.03,
                }
              : currentLocation
              ? {
                  latitude: lat,
                  longitude: lng,
                  latitudeDelta: 0.5,
                  longitudeDelta: 0.5, // more view of the map
                }
              : {}
          }
        >
          {locations.map((location, index) => {
            const { title, lat, lng } = location;
            return (
              <Marker
                key={index}
                pinColor="green"
                title={title}
                onPress={markerClickHandler}
                coordinate={{ latitude: lat, longitude: lng }}
              />
            );
          })}
          {/* {route.params && (
          <Marker
            pinColor="green"
            title={title}
            // image={source}
            coordinate={{ latitude: lat, longitude: lng }}
          />
        )} */}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapViewer;
