import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";
import DefaultText from "../components/DefaultText";
import { useSelector } from "react-redux";
import { URL } from "./../helpers/url";
import { showMessage } from "react-native-flash-message";
import { cloudinaryURL } from "./../helpers/cloudinaryURL";

const ChatScreen = (props) => {
  const { route, navigation } = props;

  const { title, chats, contactImage, contactId, roomId } = route.params;

  const [messages, setMessages] = useState([]);

  const {
    id: userId,
    firstName,
    lastName,
  } = useSelector((state) => state.Auth.userInfo);

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
              ? require("../constants/images/Roger.jpg")
              : cloudinaryURL + contactImage,
        },
      };
      return newMessage;
    });

    setMessages(convertedMessages);
  }, []);

  const onSend = useCallback(async (messages = []) => {
    const time = messages[0].createdAt;
    console.log("time ", time.getHours() + ":" + time.getMinutes());
    console.log("message ", messages);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    const message = messages[0];

    const { _id, createdAt, text, user } = message;
    const newMessage = {
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
        body: JSON.stringify({ roomId: roomId, newMessage }),
      });
    } catch (err) {}
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
