export const SET_TOKEN = "SET_TOKEN";
export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

export const login = (email, password) => {
  // call the server here
  // get user info
  // get token
  return { type: SIGNUP, token: "token", userInfo: {} };
};

export const signUp = (userInfo) => {
  // call to the server here
  // send userInfo
  // get token
  return { type: LOGIN, token: "token", userInfo: userInfo };
};
