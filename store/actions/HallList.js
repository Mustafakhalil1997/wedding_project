import WeddingHall from "../../models/WeddingHall";

export const SET_LIST = "SET_LIST";
export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
export const CREATE_RESERVATION = "CREATE_RESERVATION";

const DUMMY_HALLLIST = [
  {
    id: "h1",
    name: "North Hall",
    email: "NorthHall@gmail.com",
    number: "79126550",
    location: {
      lat: 34.431093869627254,
      lng: 35.8377506411768,
    },
    images: [
      "beautiful-photozone-with-big-wreath-decorated-with-greenery-roses-centerpiece-candles-sides-garland-hanged-trees_8353-11019.jpg",
      "beautiful-photozone-with-big-wreath-decorated-with-greenery-roses-centerpiece-candles-sides-garland-hanged-trees_8353-11019.jpg",
    ],
    isFavorite: false,
    reservations: [],
  },
  {
    id: "h2",
    name: "West hall",
    email: "NorthHall@gmail.com",
    number: "79126550",
    location: {
      lat: 34.15550968858545,
      lng: 35.64338541736089,
    },

    images: [
      "./constants/images/pexels-jeremy-wong-1035665.jpg",
      "./constants/images/pexels-logan-rhoads-10905822.jpg",
    ],
    isFavorite: false,
    reservations: [],
  },
  {
    id: "h3",
    name: "South Hall",
    email: "NorthHall@gmail.com",
    number: "79126550",
    location: {
      lat: 39.92801442507861,
      lng: 32.83767491273409,
    },
    images: [
      "./constants/images/beautiful-photozone-with-big-wreath-decorated-with-greenery-roses-centerpiece-candles-sides-garland-hanged-trees_8353-11019.jpg",
      "./constants/images/beautiful-photozone-with-big-wreath-decorated-with-greenery-roses-centerpiece-candles-sides-garland-hanged-trees_8353-11019.jpg",
    ],
    isFavorite: false,
    reservations: [],
  },
];

export const toggleFavorite = (hallId) => {
  console.log("toggle Favorite");
  return { type: TOGGLE_FAVORITE, hallId: hallId };
};

export const setHallList = () => {
  // later we get the list from mongodb and set the store list
  return { type: SET_LIST, hallList: DUMMY_HALLLIST };
};

export const reserveHall = (reservation) => {
  return { type: CREATE_RESERVATION, reservation };
};
