import WeddingHall from "../../models/WeddingHall";
import { URL } from "./../../helpers/url";
import { showMessage } from "react-native-flash-message";

export const SET_LIST = "SET_LIST";
export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
export const CREATE_RESERVATION = "CREATE_RESERVATION";
export const SET_STATUS = "SET_STATUS";

const DUMMY_HALLLIST = [
  {
    id: "h1",
    hallName: "North Hall",
    email: "NorthHall@gmail.com",
    mobileNumber: "79126550",
    location: {
      lat: 34.431093869627254,
      lng: 35.8377506411768,
    },
    address: "somewhere",
    images: [
      "beautiful-photozone-with-big-wreath-decorated-with-greenery-roses-centerpiece-candles-sides-garland-hanged-trees_8353-11019.jpg",
      "beautiful-photozone-with-big-wreath-decorated-with-greenery-roses-centerpiece-candles-sides-garland-hanged-trees_8353-11019.jpg",
    ],
    bookings: [],
    ownerId: "u1",
  },
];

export const toggleFavorite = (hallId) => {
  console.log("toggle Favorite");
  return { type: TOGGLE_FAVORITE, hallId: hallId };
};

export const setHallList = (count, filters = []) => {
  // later we get the list from mongodb and set the store list
  // const filters = [1, 2, 3];

  console.log("filters in store ", filters);

  return async (dispatch) => {
    try {
      // filters = [2];
      console.log("filters: ", filters);
      const response = await fetch(`${URL}/api/hall/${count}/${filters}`);

      if (response.status !== 200) console.log("failedd");

      const responseData = await response.json();
      console.log("responseData ", responseData);
      // if (responseData.halls.length !== 0)
      dispatch({ type: SET_LIST, hallList: responseData.halls, count });
    } catch (err) {
      showMessage({
        message: "Could not render list, please try again",
      });
      dispatch({ type: SET_STATUS, status: 500 });
      console.log("could not get list");
    }
  };
};

export const setStatus = (status) => {
  return { type: SET_STATUS, status: status };
};

export const reserveHall = (reservation) => {
  return { type: CREATE_RESERVATION, reservation };
};
