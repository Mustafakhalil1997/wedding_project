export const GET_HALL_CHATS = "GET_HALL_CHATS";
export const SET_HALL_CHATS = "SET_HALL_CHATS";
export const SET_HALL_STATUS = "SET_HALL_STATUS";
export const HALL_LOG_OUT = "HALL_LOG_OUT";
export const GET_CHAT_BY_ROOM_ID = "GET_CHAT_BY_ROOM_ID";
import { URL } from "../../helpers/url";

export const getHallChats = (chatRooms) => {
  return async (dispatch) => {
    try {
      console.log("in store");
      let arr = encodeURIComponent(JSON.stringify(chatRooms));
      const response = await fetch(`${URL}/api/chat/hall/${arr}`);
      const responseData = await response.json();
      console.log("sent request");
      // console.log("responseData in chats store ", responseData);

      if (response.status !== 200) {
        dispatch({ type: SET_HALL_STATUS, status: 500 });
      } else {
        const { chats, message } = responseData;
        // console.log("chats in store ", chats);
        // console.log("responseData ", responseData);
        dispatch({ type: GET_HALL_CHATS, chats: chats });
      }
    } catch (err) {
      console.log("error in action store", err);
      dispatch({ type: SET_HALL_STATUS, status: 500 });
    }
  };
};

export const setHallChats = (chats) => {
  return { type: SET_HALL_CHATS, chats: chats };
};

export const setHallStatus = (status) => {
  return { type: SET_HALL_STATUS, status: status };
};

export const hallChatLogOut = () => {
  return { type: HALL_LOG_OUT };
};

// export const getChatByRoomId = (roomId) => {
//   return { type: GET_CHAT_BY_ROOM_ID, roomId: roomId };
// };
