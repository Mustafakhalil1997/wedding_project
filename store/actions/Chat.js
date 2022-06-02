export const GET_CHATS = "GET_CHATS";
export const SET_CHATS = "SET_CHATS";
export const SET_STATUS = "SET_STATUS";
export const GET_CHAT_BY_ROOM_ID = "GET_CHAT_BY_ROOM_ID";
import { URL } from "./../../helpers/url";

export const getChats = (chatRooms, userOrHall) => {
  let userType = userOrHall === "user" ? "user" : "hall";
  return async (dispatch) => {
    try {
      console.log("in store");
      let arr = encodeURIComponent(JSON.stringify(chatRooms));
      const response = await fetch(`${URL}/api/chat/${userType}/${arr}`);
      const responseData = await response.json();
      console.log("sent request");
      console.log("responseData in chats store ", responseData);

      if (response.status !== 200) {
        dispatch({ type: SET_STATUS, status: 500 });
      } else {
        const { chats, message } = responseData;
        console.log("chats in store ", chats);
        // console.log("responseData ", responseData);
        dispatch({ type: GET_CHATS, chats: chats });
      }
    } catch (err) {
      console.log("error in action store", err);
      dispatch({ type: SET_STATUS, status: 500 });
    }
  };
};

export const setChats = (chats) => {
  return { type: SET_CHATS, chats: chats };
};

export const setStatus = (status) => {
  return { type: SET_STATUS, status: status };
};

// export const getChatByRoomId = (roomId) => {
//   return { type: GET_CHAT_BY_ROOM_ID, roomId: roomId };
// };
