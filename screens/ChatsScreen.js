import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import DefaultText from "../components/DefaultText";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { URL } from "./../helpers/url";
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

  const [contacts, setContacts] = useState([]);

  const token = useSelector((state) => state.Auth.token);
  const userInfo = useSelector((state) => state.Auth.userInfo);

  console.log("userInfo in chats Screen ", userInfo);

  const { chatRooms } = userInfo;

  useEffect(() => {
    const getMessages = async () => {
      try {
        let arr = encodeURIComponent(JSON.stringify(chatRooms));
        const response = await fetch(`${URL}/api/chat/${arr}`);
        const responseData = await response.json();
      } catch (err) {
        console.log(err);
      }
    };

    if (chatRooms) {
      getMessages();
    }
  }, [chatRooms]);

  const goToLogin = () => {
    navigation.navigate("Auth", { screen: "Login" });
  };

  const chatClickHandler = () => {
    console.log("hello");
    navigation.navigate("Chat", {});
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Chat", {
            title: item.userName,
          });
        }}
        style={styles.card}
      >
        <View style={styles.userInfo}>
          <View style={styles.userImageWrapper}>
            <Image source={item.userImg} style={styles.userImage} />
          </View>
          <View style={styles.textSection}>
            <View style={styles.userInfoText}>
              <DefaultText style={styles.userName}>{item.userName}</DefaultText>
              <DefaultText style={styles.postTime}>
                {item.messageTime}
              </DefaultText>
            </View>
            <DefaultText style={styles.messageText}>
              {item.messageText}
            </DefaultText>
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
          data={Messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
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
