import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import DefaultText from "./DefaultText";
import { Ionicons } from "@expo/vector-icons";

const Map = (props) => {
  const { getLocation } = props;

  const currentLocation = useSelector(
    (state) => state.location.currentLocation
  );

  const [selectedLocation, setSelectedLocation] = useState(currentLocation);

  const hallList = useSelector((state) => state.halls.hallList);
  const locations = hallList.map((hall) => {
    return { ...hall.location, hallName: hall.hallName, hallId: hall.id };
  });

  let title;
  let lat;
  let lng;

  if (Object.keys(currentLocation).length !== 0) {
    lat = currentLocation.latitude;
    lng = currentLocation.longitude;
  }

  const getDragLocation = (values) => {
    getLocation(values.nativeEvent.coordinate);
    setSelectedLocation(values.nativeEvent.coordinate);
  };

  const regionChangeHandler = (region) => {
    console.log(region);
  };

  return (
    <View style={styles.container}>
      {Object.keys(currentLocation).length !== 0 && (
        <MapView
          style={{ ...styles.map, ...props.style }}
          region={{
            latitude: selectedLocation ? selectedLocation.latitude : lat,
            longitude: selectedLocation ? selectedLocation.longitude : lng,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}
          onRegionChange={regionChangeHandler}
        >
          {locations.map((location, index) => {
            const { lat, lng } = location;
            return (
              <Marker
                key={index}
                pinColor="green"
                title={title}
                coordinate={{ latitude: lat, longitude: lng }}
              />
            );
          })}

          <Marker
            draggable
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            }}
            onDragEnd={getDragLocation}
          />
          {/* <View style={{ top: "50%", left: "50%", position: "absolute" }}>
            <Ionicons name="location" size={36} color="black" />
          </View> */}
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
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default Map;
