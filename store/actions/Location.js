import * as Location from "expo-location";

import WeddingHall from "../../models/WeddingHall";

export const SET_CURRENT_LOCATION = "SET_CURRENT_LOCATION";
export const SET_ERROR = "SET_ERROR";

export const setCurrentLocation = () => {
  return async (dispatch) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      dispatch({
        type: SET_ERROR,
        errorMessage: "Don't have access to maps, please allow access",
      });
      //   throw "Don't have access to maps";
    } else {
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      dispatch({
        type: SET_CURRENT_LOCATION,
        currentLocation: { latitude: latitude, longitude: longitude },
      });
      //   setCurrentLocation({ latitude: latitude, longitude: longitude });
    }
  };

  //   return { type: SET_CURRENT_LOCATION, currentLocation: DUMMY_HALLLIST };
};
