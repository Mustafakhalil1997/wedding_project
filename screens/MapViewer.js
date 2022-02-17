import React from "react";
import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet, Dimensions } from "react-native";

const MapViewer = ({ route }) => {
  // const { lat, lng } = location;

  if (route.params) {
    const { location, title } = route.params;
    const { lat, lng } = location;
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
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }
        }
      >
        {route.params && (
          <Marker
            pinColor="green"
            title={title}
            // image={source}
            coordinate={{ latitude: lat, longitude: lng }}
          />
        )}
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
