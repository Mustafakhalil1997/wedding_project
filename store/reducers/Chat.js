import { GET_CHATS, SET_CHATS, SET_STATUS, LOG_OUT } from "./../actions/Chat";

const initialState = {
  chats: [],
  status: 100,
};

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHATS:
      return {
        ...state,
        status: 200,
        chats: action.chats,
      };
    case SET_CHATS:
      return {
        ...state,
        chats: action.chats,
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      };
    default:
    case LOG_OUT:
      return {
        ...state,
        status: 100,
        chats: [],
      };
      return state;
  }
};

export default ChatReducer;
