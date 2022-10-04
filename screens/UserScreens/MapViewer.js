import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

import MapView, { Callout, Marker } from "react-native-maps";
import DefaultText from "../../components/DefaultText";

const MapViewer = ({ route, navigation }) => {
  const currentLocation = useSelector(
    (state) => state.location.currentLocation
  );

  const hallList = useSelector((state) => state.halls.hallList);
  const locations = hallList.map((hall) => {
    return { ...hall.location, hallName: hall.hallName, hallId: hall.id };
  });

  let lat = 0;
  let lng = 0;
  if (route.params) {
    title = route.params.title;
    lat = route.params.location.lat;
    lng = route.params.location.lng;
  } else {
    if (Object.keys(currentLocation).length !== 0) {
      lat = currentLocation.latitude;
      lng = currentLocation.longitude;
    }
  }

  const markerClickHandler = (hallId) => {
    const hall = hallList.find((hall) => hall.id === hallId);
    const { hallName, email, address, location, mobileNumber, images } = hall;
    console.log;
    navigation.navigate({
      name: "HallDetail",
      params: {
        hallId: hallId,
        name: hallName,
        email,
        address,
        location,
        number: mobileNumber,
        images,
      },
    });
  };

  console.log("lat ", lat);
  console.log("lng ", lng);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
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
              const { hallId, hallName, lat, lng } = location;
              return (
                <Marker
                  key={index}
                  title={hallName}
                  onCalloutPress={() => {
                    markerClickHandler(hallId);
                  }}
                  coordinate={{ latitude: lat, longitude: lng }}
                >
                  <Ionicons name="md-location-sharp" size={32} color="green" />

                  <Callout tooltip>
                    <View>
                      <View
                        style={{
                          backgroundColor: "#fff",
                          width: 150,
                          alignItems: "center",
                          borderColor: "black",
                          borderWidth: 0.5,
                          borderRadius: 3,
                        }}
                      >
                        <DefaultText>{hallName}</DefaultText>
                      </View>

                      <View
                        style={{
                          backgroundColor: "transparent",
                          borderColor: "transparent",
                          borderTopColor: "#fff",
                          borderWidth: 13,
                          alignSelf: "center",
                          marginTop: -0.5,
                          // marginBottom: -15
                        }}
                      />
                    </View>
                  </Callout>
                </Marker>
              );
            })}
          </MapView>
        )}
      </View>
    </SafeAreaView>
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
