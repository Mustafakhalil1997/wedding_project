import {
  GET_HALL_CHATS,
  SET_HALL_CHATS,
  SET_HALL_STATUS,
  HALL_LOG_OUT,
} from "../actions/HallChat";

const initialState = {
  hallChats: [],
  hallChatStatus: 100,
};

const HallChatReducer = (state = initialState, action) => {
  // console.log("action.chats ", action.chats);

  switch (action.type) {
    case GET_HALL_CHATS:
      return {
        ...state,
        hallChatStatus: 200,
        hallChats: action.chats,
      };
    case SET_HALL_CHATS:
      return {
        ...state,
        hallChats: action.chats,
      };
    case SET_HALL_STATUS:
      return {
        ...state,
        hallChatStatus: action.status,
      };
    case HALL_LOG_OUT:
      return {
        ...state,
        hallChatStatus: 100,
        hallChats: [],
      };
    default:
      return state;
  }
};

export default HallChatReducer;
