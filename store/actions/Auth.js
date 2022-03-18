export const SET_TOKEN = "SET_TOKEN";
import { getToken } from "./../../helpers/db";
export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const EDIT_PROFILE = "EDIT_PROFILE";
export const SWITCH_PROFILE = "SWITCH_PROFILE";
export const TOGGLE_USER_FAVORITE = "TOGGLE_USER_FAVORITE";
export const EDIT_HALL_INFO = "EDIT_HALL_INFO";
export const REMOVE_TOKEN = "REMOVE_TOKEN";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = (token, userInfo) => {
  const currentDate = new Date();
  const expirationDate = new Date(currentDate.getTime() + 1 * 60000);

  const tokenObject = {
    token: token,
    userInfo: userInfo,
    expirationDate: expirationDate,
  };
  return async (dispatch) => {
    try {
      const jsonValue = JSON.stringify(tokenObject);
      await AsyncStorage.setItem("@token", jsonValue);
      dispatch({ type: LOGIN, token: token, userInfo: userInfo });
    } catch (e) {
      // error reading value
    }
  };
};

export const setToken = (myToken = null) => {
  // if (myToken === null) {
  return async (dispatch) => {
    try {
      await AsyncStorage.getItem("@token", async (err, val) => {
        if (val !== null) {
          const jsonValue = JSON.parse(val);
          console.log("valuee ", jsonValue);
          const { token, expirationDate, userInfo } = jsonValue;

          const date = new Date();
          console.log("current date ", date);
          console.log("expiration date ", new Date(expirationDate));
          if (new Date(expirationDate) < date) {
            console.log("current date is now greater than expiration date");
            await AsyncStorage.removeItem("@token");
            console.log("token removed");
            dispatch({ type: REMOVE_TOKEN });
          } else {
            // dispatch({ type: SET_TOKEN, token: token });
            dispatch({ type: LOGIN, token: token, userInfo: userInfo });
          }
        }
      });
    } catch (e) {
      // error reading value
    }
    // };
    // } else {
    //   return async (dispatch) => {
    //     try {
    //       await AsyncStorage.setItem("@token", myToken);
    //       dispatch({ type: SET_TOKEN, token: myToken });
    //     } catch (e) {
    //       // error reading value
    //     }
    //   };
  };
};

export const signUp = (token, userInfo) => {
  // call to the server here
  // send userInfo
  // get token
  const tokenObject = {
    token: token,
    userInfo: userInfo,
    expirationDate: expirationDate,
  };
  return async (dispatch) => {
    try {
      const jsonValue = JSON.stringify(tokenObject);
      await AsyncStorage.setItem("@token", jsonValue);
      dispatch({ type: SIGNUP, token: token, userInfo: userInfo });
    } catch (e) {
      // error reading value
    }
  };
};

export const editProfile = (newData) => {
  // call to the server here
  // send new info the server

  return { type: EDIT_PROFILE, newData: newData };
};

export const addFavorite = (hallId) => {
  return { type: TOGGLE_USER_FAVORITE, hallId: hallId };
};

export const logout = () => {
  console.log("logging out");
  return async (dispatch) => {
    try {
      await AsyncStorage.removeItem("@token");
      console.log("set token to null");
      dispatch({ type: LOGOUT });
    } catch (e) {
      console.log("error ", e);
      // error reading value
    }
  };
};

export const switchProfile = () => {
  return { type: SWITCH_PROFILE };
};

export const editHall = (newData) => {
  //call to the server here
  // send new info to the server
  console.log("this is edit halllll ", newData);
  return { type: EDIT_HALL_INFO, newData: newData };
};
