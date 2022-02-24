import { LOGIN, SET_TOKEN, SIGNUP } from "./../actions/Auth";

const initialState = {
  token: null,
  userInfo: {},
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.token,
        userInfo: action.userInfo,
      };
    case SIGNUP:
      return {
        token: action.token,
        userInfo: action.userInfo,
      };
    default:
      return state;
  }
};

export default AuthReducer;
