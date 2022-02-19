import { SET_CURRENT_LOCATION, SET_ERROR } from "../actions/Location";

const initialState = {
  currentLocation: {},
  locationError: "",
};

const currentLocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_LOCATION:
      const { longitude, latitude } = action.currentLocation;
      return {
        ...state,
        currentLocation: { latitude: latitude, longitude: longitude },
      };
    case SET_ERROR:
      return {
        ...state,
        locationError: action.errorMessage,
      };
    default:
      return state;
  }
};

export default currentLocationReducer;
