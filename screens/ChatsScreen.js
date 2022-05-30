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
} from "react-native";
import DefaultText from "../components/DefaultText";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { URL } from "./../helpers/url";
import { cloudinaryURL } from "./../helpers/cloudinaryURL";
const Messages = [
  {
    id: "1",
    userName: "Jenny Doe",
    userImg: require("../assets/users/user-1.jpg"),
    messageTime: "4 mins ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "2",
    userName: "John Doe",
    userImg: require("../assets/users/user-2.jpg"),
    messageTime: "2 hours ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "3",
    userName: "Ken William",
    userImg: require("../assets/users/user-4.jpg"),
    messageTime: "1 hours ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "4",
    userName: "Selina Paul",
    userImg: require("../assets/users/user-6.jpg"),
    messageTime: "1 day ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "5",
    userName: "Christy Alex",
    userImg: require("../assets/users/user-7.jpg"),
    messageTime: "2 days ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
];

const ChatsScreen = (props) => {
  const { navigation } = props;

  const [chatsDetails, setChatsDetails] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const token = useSelector((state) => state.Auth.token);
  const userInfo = useSelector((state) => state.Auth.userInfo);

  const { chatRooms, firstName } = userInfo;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const getMessages = async () => {
    try {
      let arr = encodeURIComponent(JSON.stringify(chatRooms));
      const response = await fetch(`${URL}/api/chat/${arr}`);
      const responseData = await response.json();
      const { chats, message } = responseData;
      console.log("responseData ", responseData);
      setChatsDetails(chats);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (chatRooms) {
      getMessages();
    }
  }, [chatRooms]);

  useEffect(() => {
    if (refreshing) getMessages();
  }, [refreshing]);

  const goToLogin = () => {
    navigation.navigate("Auth", { screen: "Login" });
  };

  const chatClickHandler = () => {
    console.log("hello");
    navigation.navigate("Chat", {});
  };

  const renderItem = ({ item }) => {
    console.log("item ", item);
    const { _id, chats, contacts } = item;

    const lastChat = chats[0];
    const { message, time } = lastChat;

    let contactImage;
    let contactId;

    const convertedTime = new Date(time);
    console.log(convertedTime.getHours() + ":" + convertedTime.getMinutes());
    const now = new Date();

    const timeDifference = (() => {
      // when message was sent
      const diffMs = now - convertedTime;
      const diffDays = Math.floor(diffMs / 86400000); // days
      if (diffDays >= 1) return diffDays + " days ago";
      const diffHrs = Math.floor((diffMs % 86400000) / 3600000);
      if (diffHrs >= 1) return diffHrs + " hours ago";
      const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
      return diffMins + " minutes ago";
    })();

    const contactName = (() => {
      if (contacts[0].firstName === firstName) {
        contactImage = contacts[1].profileImage;
        contactId = contacts[1]._id;
        return contacts[1].firstName + " " + contacts[1].lastName;
      }
      contactImage = contacts[0].profileImage;
      contactId = contacts[0]._id;
      return contacts[0].firstName + " " + contacts[0].lastName;
    })();

    console.log(contactName);
    console.log(lastChat);

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Chat", {
            title: contactName,
            chats: chats,
            contactImage: contactImage,
            contactId: contactId,
            roomId: _id,
          });
        }}
        style={styles.card}
      >
        <View style={styles.userInfo}>
          <View style={styles.userImageWrapper}>
            {contactImage !== "" ? (
              <Image
                source={{ uri: cloudinaryURL + contactImage }}
                style={styles.userImage}
              />
            ) : (
              <Image
                source={require("../constants/images/Roger.jpg")}
                // source={require("../../constants/images/Roger.jpg")}
                style={styles.userImage}
              />
            )}
          </View>
          <View style={styles.textSection}>
            <View style={styles.userInfoText}>
              <DefaultText style={styles.userName}>{contactName}</DefaultText>
              <DefaultText style={styles.postTime}>
                {timeDifference}
              </DefaultText>
            </View>
            <DefaultText style={styles.messageText}>{message}</DefaultText>
          </View>
        </View>
      </TouchableOpacity>
    );
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

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={chatsDetails}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
  card: {
    width: "100%",
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userImageWrapper: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textSection: {
    flex: 6,
    flexDirection: "column",
    justifyContent: "center",
    padding: 15,
    paddingLeft: 0,
    marginLeft: 10,
    // width: 300,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  userInfoText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  postTime: {
    fontSize: 12,
    color: "#666",
  },
  messageText: {
    fontSize: 14,
    color: "#333333",
  },
});

export default ChatsScreen;
