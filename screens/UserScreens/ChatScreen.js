import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";
import { showMessage } from "react-native-flash-message";
import { io } from "socket.io-client";

import { URL } from "../../helpers/url";
import { cloudinaryURL } from "../../helpers/cloudinaryURL";
import DefaultText from "../../components/DefaultText";
import { setChats } from "../../store/actions/Chat";
import customBackArrow from "./../../helpers/customBackArrow";
import { CommonActions } from "@react-navigation/native";
import { editProfile } from "./../../store/actions/Auth";
import { setStatus } from "./../../store/actions/Chat";

const socket = io.connect(URL);

const ChatScreen = (props) => {
  const { route, navigation } = props;

  const { title, contactImage, contactId, roomId } = route.params;

  const [messages, setMessages] = useState([]);

  const dispatch = useDispatch();
  const {
    id: userId,
    firstName,
    lastName,
    profileImage,
  } = useSelector((state) => state.Auth.userInfo);
  const chatRooms = useSelector((state) => state.Chats.chats);

  let chatRoom;
  if (roomId) {
    chatRoom = chatRooms.find((room) => {
      return room._id === roomId;
    });
  }

  let existingChatRoom;
  if (!roomId) {
    existingChatRoom = chatRooms.find((room) => {
      // console.log("type of room id ", typeof room._id);
      // console.log("type of room.userId", typeof room.userId);
      // console.log("type of userId", typeof userId);
      // console.log("type of room.hallId", typeof room.hallId._id);
      // console.log("type of hallId", typeof contactId);
      return room.userId === userId && room.hallId._id === contactId;
    });
  }
  console.log("existingChatRoom ", existingChatRoom);

  // const goBackToChats = () => {
  //   navigation.dispatch({
  //     ...CommonActions.reset({
  //       index: 0,
  //       routes: [{ name: "ChatStack" }],
  //     }),
  //   });
  // };

  // useLayoutEffect(() => {
  //   customBackArrow({
  //     navigation,
  //     isSubmitting: false,
  //     onPress: goBackToChats,
  //   });
  // }, []);

  useEffect(() => {
    const convertMessages = (chatRoom) => {
      return chatRoom.chats.map((chat) => {
        const { _id, message, time, senderId } = chat;
        const newMessage = {
          _id: _id.toString(),
          text: message,
          createdAt: time,
          user: {
            _id: senderId.toString(),
            name: senderId === userId ? firstName + " " + lastName : title,
            avatar:
              senderId === userId
                ? cloudinaryURL + profileImage
                : cloudinaryURL + contactImage,
          },
        };
        return newMessage;
      });
    };

    if (chatRoom) {
      const convertedMessages = convertMessages(chatRoom);
      setMessages(convertedMessages);
    }

    if (existingChatRoom) {
      const convertedMessages = convertMessages(existingChatRoom);
      setMessages(convertedMessages);
    }
  }, [chatRooms]);

  const onSend = useCallback(async (messages = []) => {
    messages[0].user.avatar = cloudinaryURL + profileImage;

    const message = messages[0];
    const { _id, createdAt, text, user } = message;
    const newMessage = {
      _id: _id,
      message: text,
      senderId: userId,
      receiverId: contactId,
      time: createdAt,
    };

    const messageSentToDatabase = {
      message: text,
      senderId: userId,
      receiverId: contactId,
      time: createdAt,
    };

    let stringObjectListener;
    let chatRoom;
    if (roomId || existingChatRoom) {
      stringObjectListener = JSON.stringify({
        contactId: contactId,
        chatRoom: roomId,
      });
      socket.emit("sentMessage", { stringObjectListener, messages });

      // const index = chatRooms.findIndex((chatRoom) => chatRoom._id === roomId);
      chatRoom = chatRooms.find((chatRoom) => {
        return chatRoom._id === roomId;
      });

      chatRoom.chats.unshift(newMessage);

      const newChats = [...chatRooms];
      newChats.sort((x, y) => {
        return x._id === chatRoom._id ? -1 : y === chatRoom._id ? 1 : 0;
      });

      dispatch(setChats(newChats));
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
      try {
        await fetch(`${URL}/api/chat/sendMessage`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roomId: roomId,
            newMessage: messageSentToDatabase,
          }),
        });
      } catch (err) {
        console.log("err ", err);
      }
    } else {
      console.log("here");
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
      const requestBody = {
        firstMessage: messageSentToDatabase,
        userId: userId,
        hallId: contactId,
      };
      try {
        const response = await fetch(`${URL}/api/chat/createChat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        const responseData = await response.json();

        console.log("responseData ", responseData);

        if (response.status !== 200) {
          console.log("returned with status ", response.status);
        } else {
          const { chatRoom, user } = responseData;
          const newChats = [chatRoom, ...chatRooms];

          const { _id: roomId, hallId: contactId } = chatRoom;

          dispatch(setStatus(100));
          dispatch(editProfile(user));
          dispatch(setChats(newChats));
          stringObjectListener = JSON.stringify({
            contactId: contactId,
            chatRoom: roomId,
          });
          socket.emit("sentMessage", { stringObjectListener, messages });
        }
      } catch (err) {
        console.log("err ", err);
      }
    }
  }, []);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#2e64e5",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
        }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={{ marginBottom: 4, marginRight: 5 }}>
          <MaterialCommunityIcons
            name="send-circle"
            size={42}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  return (
    <View style={styles.screenContainer}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userId,
          name: "mustafa",
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default ChatScreen;

// setMessages([
//   {
//     _id: 4,
//     text: "Thanks Jenny, sure why not",
//     createdAt: new Date(),
//     user: {
//       _id: userId,
//       name: "React Native",
//       avatar: "https://placeimg.com/140/140/any",
//     },
//   },
//   {
//     _id: 3,
//     text: "You look like a handsome man, I want to get to know you",
//     createdAt: new Date(),
//     user: {
//       _id: 2,
//       name: "React Native",
//       avatar: "https://placeimg.com/140/140/any",
//     },
//   },
//   {
//     _id: 2,
//     text: "Hey jenny",
//     createdAt: new Date(),
//     user: {
//       _id: userId,
//       name: "React Native",
//       avatar: "https://placeimg.com/140/140/any",
//     },
//   },

//   {
//     _id: 1,
//     text: "Hello developer",
//     createdAt: new Date(),
//     user: {
//       _id: 2,
//       name: "React Native",
//       avatar: "https://placeimg.com/140/140/any",
//     },
//   },
//   {
//     _id: 0,
//     text: "Hello girl",
//     createdAt: new Date(),
//     user: {
//       _id: userId,
//       name: "React Native",
//       avatar: "https://placeimg.com/140/140/any",
//     },
//   },
// ]);
