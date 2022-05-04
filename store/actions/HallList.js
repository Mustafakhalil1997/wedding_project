import WeddingHall from "../../models/WeddingHall";
import { URL } from "./../../helpers/url";

export const SET_LIST = "SET_LIST";
export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
export const CREATE_RESERVATION = "CREATE_RESERVATION";

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
  {
    id: "h2",
    hallName: "West hall",
    email: "NorthHall@gmail.com",
    mobileNumber: "79126550",
    location: {
      lat: 34.15550968858545,
      lng: 35.64338541736089,
    },

    images: [
      "./constants/images/pexels-jeremy-wong-1035665.jpg",
      "./constants/images/pexels-logan-rhoads-10905822.jpg",
    ],
    bookings: [],
    ownerId: "u2",
  },
  {
    id: "h3",
    hallName: "South Hall",
    email: "NorthHall@gmail.com",
    mobileNumber: "79126550",
    location: {
      lat: 39.92801442507861,
      lng: 32.83767491273409,
    },
    images: [
      "./constants/images/beautiful-photozone-with-big-wreath-decorated-with-greenery-roses-centerpiece-candles-sides-garland-hanged-trees_8353-11019.jpg",
      "./constants/images/beautiful-photozone-with-big-wreath-decorated-with-greenery-roses-centerpiece-candles-sides-garland-hanged-trees_8353-11019.jpg",
    ],
    bookings: [],
    ownerId: "u3",
  },
];

export const toggleFavorite = (hallId) => {
  console.log("toggle Favorite");
  return { type: TOGGLE_FAVORITE, hallId: hallId };
};

export const setHallList = () => {
  // later we get the list from mongodb and set the store list
  return async (dispatch) => {
    try {
      const response = await fetch(`${URL}/api/hall`);

      const responseData = await response.json();
      console.log("responseDataa ", responseData.halls);
      console.log("dummyList ", DUMMY_HALLLIST);
      dispatch({ type: SET_LIST, hallList: responseData });
    } catch (err) {
      console.log("could not get list");
    }
  };
};

export const reserveHall = (reservation) => {
  return { type: CREATE_RESERVATION, reservation };
};
