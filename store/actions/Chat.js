export const GET_CHATS = "GET_CHATS";
export const GET_CHAT_BY_ROOM_ID = "GET_CHAT_BY_ROOM_ID";
import { URL } from "./../../helpers/url";

export const getChats = (chatRooms) => {
  return async (dispatch) => {
    try {
      console.log("in store");
      let arr = encodeURIComponent(JSON.stringify(chatRooms));
      const response = await fetch(`${URL}/api/chat/${arr}`);
      const responseData = await response.json();
      console.log("sent request");
      const { chats, message } = responseData;
      console.log("chats in store ", chats);
      // console.log("responseData ", responseData);
      dispatch({ type: GET_CHATS, chats: chats });
    } catch (err) {
      console.log("error in action store", err);
    }
  };
};
// export const getChatByRoomId = (roomId) => {
//   return { type: GET_CHAT_BY_ROOM_ID, roomId: roomId };
// };
