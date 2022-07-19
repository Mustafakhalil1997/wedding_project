import {
  GET_USER_CHATS,
  SET_USER_CHATS,
  SET_USER_STATUS,
  LOG_OUT,
} from "../actions/UserChat";

const initialState = {
  userChats: [],
  userChatStatus: 100,
};

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_CHATS:
      return {
        ...state,
        userChatStatus: 200,
        userChats: action.chats,
      };
    case SET_USER_CHATS:
      return {
        ...state,
        userChats: action.chats,
      };
    case SET_USER_STATUS:
      return {
        ...state,
        userChatStatus: action.status,
      };
    case LOG_OUT:
      return {
        ...state,
        userChatStatus: 100,
        userChats: [],
      };
    default:
      return state;
  }
};

export default ChatReducer;
