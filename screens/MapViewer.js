import React from "react";
import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet, Dimensions } from "react-native";

const locations = [
  {
    title: "North Hall",
    lat: 34.431093869627254,
    lng: 35.8377506411768,
  },
  {
    title: "West Hall",
    lat: 34.15550968858545,
    lng: 35.64338541736089,
  },
  {
    title: "5 Star Hall",
    lat: 39.92801442507861,
    lng: 32.83767491273409,
  },
];

const MapViewer = ({ route }) => {
  // const { lat, lng } = location;
  let title;
  let lat;
  let lng;
  if (route.params) {
    title = route.params.title;
    lat = route.params.location.lat;
    lng = route.params.location.lng;
  }

  const source = require("../constants/images/beautiful-photozone-with-big-wreath-decorated-with-greenery-roses-centerpiece-candles-sides-garland-hanged-trees_8353-11019.jpg");

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={
          route.params && {
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }
        }
      >
        {locations.map((location) => {
          const { title, lat, lng } = location;
          return (
            <Marker
              pinColor="green"
              title={title}
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
