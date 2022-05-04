import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useSelector } from "react-redux";

const Map = ({ route, navigation, getLocation }) => {
  // const [currentLocation, setCurrentLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const currentLocation = useSelector(
    (state) => state.location.currentLocation
  );

  console.log("currentLocationnn ", Object.keys(currentLocation).length);

  const [selectedLocation, setSelectedLocation] = useState();

  const hallList = useSelector((state) => state.halls.hallList);
  const locations = hallList.map((hall) => {
    return { ...hall.location, hallName: hall.hallName, hallId: hall.id };
  });

  let title;
  let lat;
  let lng;

  console.log("currentLocationn ", currentLocation);
  if (Object.keys(currentLocation).length !== 0) {
    console.log("currentLocation set");
    lat = currentLocation.latitude;
    lng = currentLocation.longitude;
  }

  const getDragLocation = (values) => {
    console.log("values ", values.nativeEvent.coordinate);
    getLocation(values.nativeEvent.coordinate);
    setSelectedLocation(values.nativeEvent.coordinate);
  };

  const source = require("../constants/images/beautiful-photozone-with-big-wreath-decorated-with-greenery-roses-centerpiece-candles-sides-garland-hanged-trees_8353-11019.jpg");

  return (
    <View style={styles.container}>
      {Object.keys(currentLocation).length !== 0 && (
        <MapView
          style={styles.map}
          region={{
            latitude: selectedLocation ? selectedLocation.latitude : lat,
            longitude: selectedLocation ? selectedLocation.longitude : lng,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5, // more view of the map
          }}
        >
          {locations.map((location, index) => {
            const { lat, lng } = location;
            return (
              <Marker
                key={index}
                pinColor="green"
                title={title}
                // onPress={markerClickHandler}
                coordinate={{ latitude: lat, longitude: lng }}
              />
            );
          })}
          <Marker
            draggable
            coordinate={{ latitude: lat, longitude: lng }}
            onDragEnd={getDragLocation}
          />
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

export default Map;
