import {
  LOGIN,
  SET_TOKEN,
  SIGNUP,
  EDIT_PROFILE,
  TOGGLE_USER_FAVORITE,
  LOGOUT,
  SWITCH_PROFILE,
  EDIT_HALL_INFO,
} from "./../actions/Auth";

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
        userInfo: action.userInfo,
      };
    case SIGNUP:
      return {
        ...state,
        token: action.token,
        userInfo: action.userInfo,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
      };
    case SWITCH_PROFILE:
      const switchType = state.userType === "user" ? "host" : "user";
      return {
        ...state,
        userType: switchType,
      };
    case EDIT_PROFILE:
      const tempInfo = { ...state.userInfo };
      console.log("tempInfo ", tempInfo);
      const updatedInfo = { ...tempInfo, ...action.newData };
      console.log("updatedInfo ", updatedInfo);
      return {
        ...state,
        userInfo: updatedInfo,
      };
    case EDIT_HALL_INFO:
      const tempHallInfo = { ...state.hallInfo };
      const updatedHallInfo = { ...tempHallInfo, ...action.newData };
      console.log("UPDATEDHALLINFO ", updatedHallInfo);
      return {
        ...state,
        hallInfo: updatedHallInfo,
      };
    case TOGGLE_USER_FAVORITE:
      console.log("action.hallId ", action.hallId);
      const hallId = action.hallId;
      console.log("hallId ", hallId);
      const index = state.userInfo.favorites.findIndex((id) => id === hallId);
      if (index < 0) {
        const newFavorites = [...state.userInfo.favorites, action.hallId];
        console.log("newFavorites ", newFavorites);
        return {
          ...state,
          userInfo: { ...state.userInfo, favorites: newFavorites },
        };
      } else {
        const newFavorites = [...state.userInfo.favorites];
        newFavorites.splice(index, 1);
        console.log("newFavorites ", newFavorites);
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
