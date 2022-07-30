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
import { setUserChats } from "../../store/actions/UserChat";
import customBackArrow from "./../../helpers/customBackArrow";
import { CommonActions } from "@react-navigation/native";
import { editProfile } from "./../../store/actions/Auth";
import { setStatus } from "../../store/actions/UserChat";
import { SafeAreaView } from "react-native-safe-area-context";

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
  const chatRooms = useSelector((state) => state.UserChats.userChats);

  let chatRoom;
  console.log("roomId ", roomId);
  // console.log("chatRooms ", chatRooms);
  if (roomId) {
    chatRoom = chatRooms.find((room) => {
      return room._id === roomId;
    });
  }

  console.log("chatRoom found?? ", chatRoom ? "found" : "not found");

  let existingChatRoom;
  if (!roomId) {
    console.log("not roomId");
    existingChatRoom = chatRooms.find((room) => {
      return room.userId === userId && room.hallId._id === contactId;
    });
  }
  console.log("existingChatRoom ", existingChatRoom);

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
      console.log("roomId ", roomId);
      console.log("existingChatRoom ", existingChatRoom);
      stringObjectListener = JSON.stringify({
        contactId: contactId,
        chatRoom: roomId ? roomId : existingChatRoom._id,
      });
      socket.emit("sentMessage", { stringObjectListener, messages });

      // const index = chatRooms.findIndex((chatRoom) => chatRoom._id === roomId);
      chatRoom = chatRooms.find((chatRoom) => {
        if (roomId) return chatRoom._id === roomId;
        if (existingChatRoom) return chatRoom._id === existingChatRoom._id;
      });

      chatRoom.chats.unshift(newMessage);

      const newChats = [...chatRooms];
      newChats.sort((x, y) => {
        return x._id === chatRoom._id ? -1 : y === chatRoom._id ? 1 : 0;
      });

      dispatch(setUserChats(newChats));
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
            roomId: roomId ? roomId : existingChatRoom._id,
            newMessage: messageSentToDatabase,
          }),
        });
      } catch (err) {
        console.log("err ", err);
      }
    } else {
      console.log("new chatroom");
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

          console.log("newChats after newChat created ", newChats);

          const { _id: roomId, hallId: contactId } = chatRoom;

          dispatch(setStatus(100));
          dispatch(editProfile(user));
          dispatch(setUserChats(newChats));

          stringObjectListener = JSON.stringify({
            contactId: contactId._id,
          });
          socket.emit("newChatRoom", {
            stringObjectListener,
            messageWithId: {
              chatRoom: roomId,
              messages: messages,
            },
          });
          // socket.emit("sentMessage", { stringObjectListener, messages });
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
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
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
    </SafeAreaView>
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
