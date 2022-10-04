export const GET_USER_CHATS = "GET_USER_CHATS";
export const SET_USER_CHATS = "SET_USER_CHATS";
export const SET_USER_STATUS = "SET_USER_STATUS";
export const USER_LOG_OUT = "USER_LOG_OUT";
export const GET_CHAT_BY_ROOM_ID = "GET_CHAT_BY_ROOM_ID";
import { URL } from "../../helpers/url";

export const getUserChats = (chatRooms) => {
  return async (dispatch) => {
    try {
      let arr = encodeURIComponent(JSON.stringify(chatRooms));
      const response = await fetch(`${URL}/api/chat/user/${arr}`);
      const responseData = await response.json();

      if (response.status !== 200) {
        dispatch({ type: SET_USER_STATUS, status: 500 });
      } else {
        const { chats, message } = responseData;
        dispatch({ type: GET_USER_CHATS, chats: chats });
      }
    } catch (err) {
      dispatch({ type: SET_USER_STATUS, status: 500 });
    }
  };
};

export const setUserChats = (chats) => {
  console.log("chats in reducer ", chats);
  return { type: SET_USER_CHATS, chats: chats };
};

export const setUserStatus = (status) => {
  return { type: SET_USER_STATUS, status: status };
};

export const userChatLogOut = () => {
  return { type: USER_LOG_OUT };
};

// export const getChatByRoomId = (roomId) => {
//   return { type: GET_CHAT_BY_ROOM_ID, roomId: roomId };
// };
