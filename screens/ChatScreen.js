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

const ChatScreen = (props) => {
  const { route, navigation } = props;

  const [messages, setMessages] = useState([]);

  const [contact, setContact] = useState();

  const { id: userId } = useSelector((state) => state.Auth.userInfo);

  useEffect(() => {
    const chatroomId = "628fffc6f9d1d539069c1bb3";
    const retrieveMessages = async () => {
      try {
        const response = await fetch(`${URL}/api/chat/${chatroomId}`);

        const responseData = await response.json();

        console.log("responseData");
        if (response.status !== 200) {
          const errorMessage = responseData.message;
          showMessage({
            message: errorMessage,
            type: "default",
            color: "white",
            backgroundColor: "red",
            style: { borderRadius: 20 },
          });

          return;
        }

        const {
          messages: retrievedMessages,
          contacts,
          contactsIds,
        } = responseData;

        console.log("retrieved ", retrievedMessages);

        const allMessages = retrievedMessages.map((msg) => {
          let {
            _id: messageId,
            message,
            sender,
            receiver,
            time,
            sendername,
            receivername,
          } = msg;

          sender = sender.toString();
          receiver = receiver.toString();
          messageId = messageId.toString();

          const newMessage = {
            _id: messageId,
            text: message,
            createdAt: time,
            user: {
              _id: sender,
              name: sendername,
              avatar: "https://placeimg.com/140/140/any",
            },
          };
          return newMessage;
        });

        const contact1 = contactsIds[0].toString();
        const contact2 = contactsIds[1].toString();

        setContact(contact1 === userId ? contact2 : contact1);
        setMessages(allMessages);
      } catch (err) {
        console.log(err);
        showMessage({
          message: "An unknown error occured",
          type: "default",
          color: "white",
          backgroundColor: "red",
          style: { borderRadius: 20 },
        });
      }
    };

    retrieveMessages();
  }, []);

  const onSend = useCallback((messages = []) => {
    const time = messages[0].createdAt;
    console.log("time ", time.getHours() + ":" + time.getMinutes());
    console.log("message ", messages);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    const message = messages[0];

    const { _id, createdAt, text, user } = message;
    const newMessage = {
      sender: user._id,
      // receiver:
    };
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
