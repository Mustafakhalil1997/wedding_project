import {
  LOGIN,
  SET_TOKEN,
  REMOVE_TOKEN,
  SIGNUP,
  EDIT_PROFILE,
  TOGGLE_USER_FAVORITE,
  LOGOUT,
  SWITCH_PROFILE,
  EDIT_HALL_INFO,
} from "./../actions/Auth";
import { AsyncStorage } from "@react-native-async-storage/async-storage";

const initialState = {
  //  token: null,
  userType: "user", // user or hoster
  token: null,
  userInfo: {},
  hallInfo: {},
};

const AuthReducer = (state = initialState, action) => {
  console.log("AuthReducer");
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.token,
        userType: action.userType,
        userInfo: action.userInfo,
        hallInfo: action.hallInfo,
      };
    case SIGNUP:
      return {
        ...state,
        token: action.token,
        userInfo: action.userInfo,
        hallInfo: null,
      };
    case LOGOUT:
      // let switchType = state.userType === "user" ? "host" : "user";
      let switchType = "user";
      return {
        ...state,
        userType: switchType,
        token: null,
        userInfo: {},
        hallInfo: {},
      };
    case REMOVE_TOKEN:
      return {
        ...state,
        userType: "user",
        token: null,
        userInfo: {},
        hallInfo: {},
      };
    case SWITCH_PROFILE:
      switchType = state.userType === "user" ? "host" : "user";
      return {
        ...state,
        userType: switchType,
      };
    case EDIT_PROFILE:
      const tempInfo = { ...state.userInfo };
      const updatedInfo = { ...tempInfo, ...action.newData };
      return {
        ...state,
        userInfo: updatedInfo,
      };
    case EDIT_HALL_INFO:
      const tempHallInfo = { ...state.hallInfo };
      const updatedHallInfo = { ...tempHallInfo, ...action.newData };
      return {
        ...state,
        hallInfo: updatedHallInfo,
      };
    case TOGGLE_USER_FAVORITE:
      const hallId = action.hallId;
      const index = state.userInfo.favorites.findIndex((id) => id === hallId);
      if (index < 0) {
        const newFavorites = [...state.userInfo.favorites, action.hallId];
        const newUserInfo = { ...state.userInfo, favorites: newFavorites };
        return {
          ...state,
          // userInfo: { ...state.userInfo, favorites: newFavorites },
          userInfo: newUserInfo,
        };
      } else {
        const newFavorites = [...state.userInfo.favorites];
        newFavorites.splice(index, 1);
        return {
          ...state,
          userInfo: { ...state.userInfo, favorites: newFavorites },
        };
      }

    default:
      return state;
  }
};

export default AuthReducer;
