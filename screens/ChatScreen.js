import React, { useState, useCallback, useEffect } from "react";
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

import { URL } from "./../helpers/url";
import { cloudinaryURL } from "./../helpers/cloudinaryURL";
import DefaultText from "../components/DefaultText";
import { setChats } from "./../store/actions/Chat";

const socket = io.connect(URL);

const ChatScreen = (props) => {
  const { route, navigation } = props;

  const { title, contactImage, contactId, roomId } = route.params;

  const dispatch = useDispatch();
  const chatRooms = useSelector((state) => state.Chats.chats);

  console.log("this is the chat screen");

  const chatRoom = chatRooms.find((room) => {
    return room._id === roomId;
  });

  // console.log("chatRooom ", chatRoom);

  const { chats } = chatRoom;

  const [messages, setMessages] = useState([]);

  const {
    id: userId,
    firstName,
    lastName,
    profileImage,
  } = useSelector((state) => state.Auth.userInfo);

  useEffect(() => {
    // socket.on(userId, (messagesReceived) => {
    //   console.log("id of user that received message ", userId);
    //   console.log("messagesReceived ", messagesReceived);
    //   console.log("type of time ", typeof messagesReceived[0].createdAt);
    //   setMessages((previousMessages) =>
    //     GiftedChat.append(previousMessages, messagesReceived)
    //   );
    // });
  }, []);

  useEffect(() => {
    const convertedMessages = chats.map((chat) => {
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

    setMessages(convertedMessages);
  }, [chatRoom]);

  console.log("userId ", userId);

  const onSend = useCallback(async (messages = []) => {
    // const time = messages[0].createdAt;
    // console.log("time ", time.getHours() + ":" + time.getMinutes());
    messages[0].user.avatar = cloudinaryURL + profileImage;
    const stringObjectListener = JSON.stringify({
      contactId: contactId,
      chatRoom: roomId,
    });
    socket.emit("sentMessage", { stringObjectListener, messages });
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    const message = messages[0];

    const { _id, createdAt, text, user } = message;
    const newMessage = {
      _id: _id,
      message: text,
      senderId: userId,
      receiverId: contactId,
      time: createdAt,
    };

    const index = chatRooms.findIndex((chatRoom) => chatRoom._id === roomId);
    const chatRoom = chatRooms.find((chatRoom) => {
      console.log("chatDetails ", typeof chatRoom._id, chatRoom._id);
      // console.log("chatRoom ", typeof chatRooms[i], chatRooms[i]);
      return chatRoom._id === roomId;
    });

    // const newMessage = {
    //   _id: messagesReceived[0]._id,
    //   message: messagesReceived[0].text,
    //   time: messagesReceived[0].createdAt,
    //   senderId: messagesReceived[0].user._id,
    //   receiverId: userId,
    // };

    console.log("chatRoom.chats ", chatRoom);

    chatRoom.chats.unshift(newMessage);

    const newChats = [...chatRooms];
    newChats.sort((x, y) => {
      return x._id === chatRoom._id ? -1 : y === chatRoom._id ? 1 : 0;
    });
    // newChats[index] = chatRoom;
    // console.log("hereee");
    dispatch(setChats(newChats));

    const messageSentToDatabase = {
      message: text,
      senderId: userId,
      receiverId: contactId,
      time: createdAt,
    };

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
