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

export const login = (token, userInfo, hallInfo) => {
  const currentDate = new Date();
  const expirationDate = new Date(currentDate.getTime() + 10 * 60000); // 10 minutes      // 24 hours or 1440 minutes

  const tokenObject = {
    token: token,
    userInfo: userInfo,
    hallInfo: hallInfo,
    userType: "user",
    expirationDate: expirationDate,
  };
  return async (dispatch) => {
    try {
      const jsonValue = JSON.stringify(tokenObject);
      console.log("jsonValue ", jsonValue);
      await AsyncStorage.setItem("@token", jsonValue);
      dispatch({
        type: LOGIN,
        token: token,
        userType: "user",
        userInfo: userInfo,
        hallInfo: hallInfo,
      });
    } catch (e) {
      // error reading value
    }
  };
};

export const signUp = (token, userInfo) => {
  // get token
  const currentDate = new Date();
  const expirationDate = new Date(currentDate.getTime() + 10 * 60000);
  const tokenObject = {
    token: token,
    userType: "user",
    userInfo: userInfo,
    expirationDate: expirationDate,
  };
  return async (dispatch) => {
    try {
      const jsonValue = JSON.stringify(tokenObject);
      await AsyncStorage.setItem("@token", jsonValue);
      dispatch({ type: SIGNUP, token: token, userInfo: userInfo });
    } catch (e) {
      console.log("signup error ", e);
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
          const { token, expirationDate, userInfo, hallInfo, userType } =
            jsonValue;

          console.log("hallInfooo ", hallInfo);

          const date = new Date();
          console.log("current date ", date);
          console.log("expiration date ", new Date(expirationDate));
          if (new Date(expirationDate) < date) {
            console.log("current date is now greater than expiration date");
            await AsyncStorage.removeItem("@token");
            console.log("token removed");
            dispatch({ type: REMOVE_TOKEN });
            // dispatch({ type: SWITCH_PROFILE });
          } else {
            console.log("userInfooooo ", userInfo);
            console.log(Object.keys(userInfo).length);
            if (Object.keys(userInfo).length !== 0) {
              console.log("here man");
              dispatch({
                type: LOGIN,
                token: token,
                userType: userType,
                userInfo: userInfo,
                hallInfo: hallInfo ? hallInfo : {},
              });
            } else
              dispatch({
                type: LOGIN,
                token: token,
                userType: "user",
                userInfo: {},
                hallInfo: {},
              });
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
  return async (dispatch) => {
    try {
      await AsyncStorage.getItem("@token", async (err, val) => {
        if (val !== null) {
          const jsonValue = JSON.parse(val);
          console.log("valuee ", jsonValue);
          const { token, expirationDate, userInfo, hallInfo, userType } =
            jsonValue;
          const newValue = {
            ...jsonValue,
            userType: userType === "user" ? "host" : "user",
          };
          const newJsonValue = JSON.stringify(newValue);
          await AsyncStorage.setItem("@token", newJsonValue);
          console.log("hallInfooo ", hallInfo);
          dispatch({ type: SWITCH_PROFILE });
        }
      });
    } catch (error) {
      console.log("failed to save to async storage ", error);
    }
  };
};

export const editHall = (newData) => {
  //call to the server here
  // send new info to the server
  console.log("this is edit halllll ", newData);
  return { type: EDIT_HALL_INFO, newData: newData };
};
