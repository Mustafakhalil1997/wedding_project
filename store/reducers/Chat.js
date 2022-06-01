import { GET_CHATS, SET_CHATS } from "./../actions/Chat";

const initialState = {
  //  token: null,
  chats: [],
};

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHATS:
      return {
        ...state,
        chats: action.chats,
      };
    case SET_CHATS:
      return {
        ...state,
        chats: action.chats,
      };
    default:
      return state;
  }
};

export default ChatReducer;
