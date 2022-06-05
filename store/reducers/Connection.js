import { SET_CONNECTION } from "./../actions/Connection";

const initialState = {
  type: "",
  isWifiEnabled: false,
  isConnected: false,
  isInternetReachable: false,
  details: {},
};

const connectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONNECTION:
      return {
        ...state,
        ...action.connectionInfo,
      };
    default:
      return state;
  }
};

export default connectionReducer;
