import { SET_LIST } from "../actions/HallList";

const initialState = {
  hallList: [],
};

const hallListReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST:
      return {
        ...state,
        hallList: action.hallList,
      };
    default:
      return state;
  }
};

export default hallListReducer;
