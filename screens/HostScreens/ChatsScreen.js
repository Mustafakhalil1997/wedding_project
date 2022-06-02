import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";

import { io } from "socket.io-client";

import { URL } from "../../helpers/url";
import { cloudinaryURL } from "../../helpers/cloudinaryURL";

import DefaultText from "../../components/DefaultText";
import { getChats, setChats } from "../../store/actions/Chat";
import HallChatItem from "../../components/HallChatItem";
import Colors from "../../constants/Colors";
import { setStatus } from "./../../store/actions/Chat";
import { Ionicons } from "@expo/vector-icons";

const socket = io.connect(URL);

const Messages = [
  {
    id: "1",
    userName: "Jenny Doe",
    userImg: require("../../assets/users/user-1.jpg"),
    messageTime: "4 mins ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "2",
    userName: "John Doe",
    userImg: require("../../assets/users/user-2.jpg"),
    messageTime: "2 hours ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "3",
    userName: "Ken William",
    userImg: require("../../assets/users/user-4.jpg"),
    messageTime: "1 hours ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "4",
    userName: "Selina Paul",
    userImg: require("../../assets/users/user-6.jpg"),
    messageTime: "1 day ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "5",
    userName: "Christy Alex",
    userImg: require("../../assets/users/user-7.jpg"),
    messageTime: "2 days ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
];

const ChatsScreen = (props) => {
  const { navigation } = props;

  // const [chatsDetails, setChatsDetails] = useState([]);
  // const [refreshing, setRefreshing] = useState(false);
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const token = useSelector((state) => state.Auth.token);
  const hallInfo = useSelector((state) => state.Auth.hallInfo);
  const chatsDetails = useSelector((state) => state.Chats.chats);
  const status = useSelector((state) => state.Chats.status);

  console.log("chatsDetails after update ", chatsDetails);
  console.log("hallInfoo ", hallInfo);

  const { chatRooms, hallName, id: hallId } = hallInfo;

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 2000);
  // }, []);

  const tryAgain = () => {
    dispatch(setStatus(100));
  };

  useEffect(() => {
    const getMessages = () => {
      dispatch(getChats(chatRooms, "hall"));
    };
    if (chatRooms.length !== 0 && status === 100) {
      setLoading(true);
      getMessages();
    }
  }, [chatRooms, status]);

  // useEffect(() => {
  //   if (loading) getMessages();
  // }, [loading]);

  useEffect(() => {
    if (status !== 100) {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    if (token && chatsDetails.length !== 0 && flag === false) {
      setFlag(true);
      setLoading(false);
    }
  }, [chatsDetails]);

  // try setting a listener for every room and pass room id with receiverId
  useEffect(() => {
    if (flag) {
      for (let i = 0; i < chatRooms.length; i++) {
        console.log("room ", chatRooms[i]);
        const objectListener = {
          contactId: hallId,
          chatRoom: chatRooms[i],
        };
        const stringObjectListener = JSON.stringify(objectListener);
        console.log("chatsDetails in useEffect ", chatsDetails);
        socket.on(stringObjectListener, (messagesReceived) => {
          console.log("id of user that received message ", hallId);
          console.log("messagesReceived ", messagesReceived);
          console.log("type of time ", typeof messagesReceived[0].createdAt);

          // set chats adding new message
          // console.log("chatsDetails in on ", chatsDetails);
          const index = chatsDetails.findIndex(
            (chatDetails) => chatDetails._id === chatRooms[i]
          );
          const chatRoom = chatsDetails.find((chatDetails) => {
            console.log(
              "chatDetails ",
              typeof chatDetails._id,
              chatDetails._id
            );
            console.log("chatRoom ", typeof chatRooms[i], chatRooms[i]);
            return chatDetails._id === chatRooms[i];
          });

          const newMessage = {
            _id: messagesReceived[0]._id,
            message: messagesReceived[0].text,
            time: messagesReceived[0].createdAt,
            senderId: messagesReceived[0].user._id,
            receiverId: hallId,
          };

          console.log("chatRoom.chats ", chatRoom);

          chatRoom.chats.unshift(newMessage);

          const newChats = [...chatsDetails];
          newChats.sort((x, y) => {
            return x._id === chatRoom._id ? -1 : y === chatRoom._id ? 1 : 0;
          });
          // newChats[index] = chatRoom;
          // console.log("hereee");
          dispatch(setChats(newChats));
        });
      }
    }
  }, [flag]);

  const goToLogin = () => {
    navigation.navigate("Auth", { screen: "Login" });
  };

  const chatClickHandler = () => {
    console.log("hello");
    navigation.navigate("Chat", {});
  };

  const renderItem = ({ item }) => {
    // console.log("item ", item);
    return <HallChatItem navigation={navigation} item={item} />;
  };

  if (!token) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.notLoggedIn}>
          <DefaultText
            styles={{
              fontSize: 18,
              fontFamily: "open-sans-bold",
              marginBottom: 10,
            }}
          >
            Login To See Your Messages
          </DefaultText>
          <DefaultText onPress={goToLogin} styles={{ color: "blue" }}>
            Go to Login
          </DefaultText>
        </View>
      </SafeAreaView>
    );
  }

  if (loading) {
    return (
      <View
        style={[
          {
            flex: 1,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <ActivityIndicator size="large" color={Colors.primaryColor} />
        <Text>Loading</Text>
      </View>
    );
  }

  if (status === 500) {
    return (
      <View
        style={[{ flex: 1, alignItems: "center", justifyContent: "center" }]}
      >
        <TouchableOpacity onPress={tryAgain}>
          <Ionicons name="reload" size={36} color="black" />
        </TouchableOpacity>
        <Text>Reload</Text>
      </View>
    );
  }

  if (chatsDetails.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.notLoggedIn}>
          <DefaultText
            styles={{
              fontSize: 18,
              fontFamily: "open-sans-bold",
            }}
          >
            NO MESSAGES
          </DefaultText>
          <DefaultText styles={{ color: "black" }}>
            Your message will appear here
          </DefaultText>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={(item) => `${item._id}`}
          data={chatsDetails}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={tryAgain} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  notLoggedIn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});

export default ChatsScreen;
