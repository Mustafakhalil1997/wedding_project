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

import { URL } from "../../helpers/url";
import { cloudinaryURL } from "../../helpers/cloudinaryURL";
import DefaultText from "../../components/DefaultText";
import { setHallChats } from "../../store/actions/HallChat";
import { SafeAreaView } from "react-native-safe-area-context";

const socket = io.connect(URL);

const ChatScreen = (props) => {
  const { route, navigation } = props;

  const { title, contactImage, contactId, roomId } = route.params;

  console.log("route.params ", route.params);

  console.log("contactImage ", contactImage);

  const [messages, setMessages] = useState([]);

  const dispatch = useDispatch();

  const hallInfo = useSelector((state) => state.Auth.hallInfo);

  const { id: hallId, hallName, images } = hallInfo;

  //   console.log("hallIdd ", hallInfo);
  const chatRooms = useSelector((state) => state.HallChats.hallChats);

  let chatRoom;
  if (roomId) {
    chatRoom = chatRooms.find((room) => {
      return room._id === roomId;
    });
  }

  let existingChatRoom;
  if (!roomId) {
    console.log("not roomId");
    existingChatRoom = chatRooms.find((room) => {
      return room.userId._id === contactId && room.hallId === hallId;
    });
  }

  // console.log("chatRoom ", chatRoom);
  // console.log("existingChatRoom ", existingChatRoom);

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
            name: senderId === hallId ? hallName : title,
            avatar:
              senderId === hallId
                ? cloudinaryURL + images[0]
                : cloudinaryURL + contactImage,
          },
        };
        return newMessage;
      });
    };

    if (chatRoom) {
      console.log("setting chatRoom messages");
      const convertedMessages = convertMessages(chatRoom);
      setMessages(convertedMessages);
    }

    if (existingChatRoom) {
      console.log("setting messages");
      const convertedMessages = convertMessages(existingChatRoom);
      setMessages(convertedMessages);
    }

    // setMessages(convertedMessages);
  }, [chatRooms]);

  const onSend = useCallback(async (messages = []) => {
    messages[0].user.avatar = cloudinaryURL + images[0];

    const message = messages[0];
    const { _id, createdAt, text, user } = message;
    const newMessage = {
      _id: _id,
      message: text,
      senderId: hallId,
      receiverId: contactId,
      time: createdAt,
    };

    const messageSentToDatabase = {
      message: text,
      senderId: hallId,
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

      dispatch(setHallChats(newChats));
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
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
      const requestBody = {
        firstMessage: messageSentToDatabase,
        userId: contactId,
        hallId: hallId,
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

        if (response.status !== 200) {
          console.log("returned with status ", response.status);
        } else {
          console.log("responsedata after creating chatroom ", responseData);
          const { chatRoom } = responseData;
          console.log("chatRoom created ", chatRoom);
          const newChats = [chatRoom, ...chatRooms];
          dispatch(setHallChats(newChats));
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
            _id: hallId,
            name: hallName,
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
