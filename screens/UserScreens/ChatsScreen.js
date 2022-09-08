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

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";

import { io } from "socket.io-client";
import { Ionicons } from "@expo/vector-icons";

import { URL } from "../../helpers/url";
import { cloudinaryURL } from "../../helpers/cloudinaryURL";
import { getUserChats, setUserChats } from "../../store/actions/UserChat";
import { setUserStatus } from "../../store/actions/UserChat";

import Colors from "../../constants/Colors";
import UserChatItem from "./../../components/UserChatItem";
import DefaultText from "../../components/DefaultText";
import { StatusBar } from "expo-status-bar";

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
  const userInfo = useSelector((state) => state.Auth.userInfo);
  const chatsDetails = useSelector((state) => state.UserChats.userChats);
  const status = useSelector((state) => state.UserChats.userChatStatus);
  const userType = useSelector((state) => state.Auth.userType);

  // console.log("usertype changed to ", userType);
  // console.log("chatsDetails after update ", chatsDetails);

  const { chatRooms, firstName, id: userId } = userInfo;

  console.log("chatRooms in chatsScreen ", chatRooms);

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 2000);
  // }, []);

  const tryAgain = () => {
    dispatch(setUserStatus(100));
  };

  useEffect(() => {
    console.log("this is useEffect");
    console.log("token ", token);
    console.log("chatRooms.length ", chatRooms);
    console.log("status ", status);
    const getMessages = () => {
      console.log("setting chats in chatsScreen for user");
      dispatch(getUserChats(chatRooms));
    };
    if (token && chatRooms?.length !== 0 && status === 100) {
      setLoading(true);
      setFlag(true);
      getMessages();
    }
  }, [userInfo, status, chatRooms]);

  useEffect(() => {
    if (status !== 100) {
      setLoading(false);
      setFlag(false);
    }
  }, [status]);

  useEffect(() => {
    if (chatsDetails.length !== 0 && flag === false) {
      setFlag(true);
      setLoading(false);
    }
  }, [flag, chatsDetails]);

  // try setting a listener for every room and pass room id with receiverId
  useEffect(() => {
    if (flag) {
      for (let i = 0; i < chatRooms?.length; i++) {
        const objectListener = {
          contactId: userId,
          chatRoom: chatRooms[i],
        };

        console.log("setting listeners");
        const stringObjectListener = JSON.stringify(objectListener);
        socket.on(stringObjectListener, (messagesReceived) => {
          console.log("id of user that received message ", userId);

          // set chats adding new message
          // console.log("chatsDetails in on ", chatsDetails);
          const index = chatsDetails.findIndex(
            (chatDetails) => chatDetails._id === chatRooms[i]
          );
          const chatRoom = chatsDetails.find(
            (chatDetails) => chatDetails._id === chatRooms[i]
          );

          console.log("chatRoom?? ", chatRoom);

          ////////////////////////////////////////////////////////
          // error existing here upon new chat creation check it tomorrow

          const newMessage = {
            _id: messagesReceived[0]._id,
            message: messagesReceived[0].text,
            time: messagesReceived[0].createdAt,
            senderId: messagesReceived[0].user._id,
            receiverId: userId,
          };

          // console.log("chatRoom.chats ", chatRoom);

          chatRoom.chats.unshift(newMessage);

          const newChats = [...chatsDetails];
          newChats.sort((x, y) => {
            return x._id === chatRoom._id ? -1 : y === chatRoom._id ? 1 : 0;
          });
          // newChats[index] = chatRoom;
          // console.log("hereee");
          dispatch(setUserChats(newChats));
        });
      }
    }
  }, [flag, chatRooms]);

  const goToLogin = () => {
    navigation.navigate("Auth", { screen: "Login" });
  };

  const chatClickHandler = () => {
    console.log("hello");
    navigation.navigate("Chat", {});
  };

  const renderItem = ({ item }) => {
    // console.log("item ", item);
    return <UserChatItem navigation={navigation} item={item} />;
  };

  const insets = useSafeAreaInsets();

  if (!token) {
    return (
      <SafeAreaView
        style={{ flex: 1, paddingTop: insets.top, backgroundColor: "white" }}
        edges={["left", "right"]}
      >
        <View style={styles.notLoggedIn}>
          <DefaultText
            styles={{
              fontSize: 18,
              fontFamily: "open-sans-bold",
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
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: insets.top,
        }}
      >
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
      </SafeAreaView>
    );
  }

  if (status === 500) {
    return (
      <SafeAreaView
        style={{ flex: 1, paddingTop: insets.top }}
        edges={["bottom"]}
      >
        <View
          style={[
            styles.listContainer,
            { alignItems: "center", justifyContent: "center" },
          ]}
        >
          <TouchableOpacity onPress={tryAgain}>
            <Ionicons name="reload" size={36} color="black" />
          </TouchableOpacity>
          <Text>Reload</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (chatsDetails.length === 0) {
    return (
      <SafeAreaView
        style={{ flex: 1, paddingTop: insets.top }}
        edges={["bottom"]}
      >
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
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: "white",
      }}
    >
      <FlatList
        keyExtractor={(item) => `${item._id}`}
        data={chatsDetails}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={tryAgain} />
        }
      />
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
