import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import DefaultText from "../components/DefaultText";
import { Avatar } from "react-native-paper";
import { useSelector } from "react-redux";

const ChatsScreen = (props) => {
  const { navigation } = props;

  const token = useSelector((state) => state.Auth.token);

  const goToLogin = () => {
    navigation.navigate("Auth", { screen: "Login" });
  };

  if (!token) {
    return (
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
    );
  }

  // <DefaultText
  //         styles={{
  //           fontSize: 18,
  //           fontFamily: "open-sans-bold",
  //           marginBottom: 10,
  //         }}
  //       >
  //         No new messages
  //       </DefaultText>
  //       <DefaultText>When you have a message, it will appear here</DefaultText>

  return (
    <View style={styles.screenContainer}>
      <ScrollView>
        <TouchableOpacity>
          <View style={styles.chatContainer}>
            <View style={{ marginRight: 15 }}>
              <Avatar.Image
                size={40}
                source={require("../constants/images/Roger.jpg")}
              />
            </View>
            <DefaultText>Full Name</DefaultText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.chatContainer}>
            <View style={{ marginRight: 15 }}>
              <Avatar.Image
                size={40}
                source={require("../constants/images/Roger.jpg")}
              />
            </View>
            <DefaultText>Full Name</DefaultText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.chatContainer}>
            <View style={{ marginRight: 15 }}>
              <Avatar.Image
                size={40}
                source={require("../constants/images/Roger.jpg")}
              />
            </View>
            <DefaultText>Full Name</DefaultText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.chatContainer}>
            <View style={{ marginRight: 15 }}>
              <Avatar.Image
                size={40}
                source={require("../constants/images/Roger.jpg")}
              />
            </View>
            <DefaultText>Full Name</DefaultText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.chatContainer}>
            <View style={{ marginRight: 15 }}>
              <Avatar.Image
                size={40}
                source={require("../constants/images/Roger.jpg")}
              />
            </View>
            <DefaultText>Full Name</DefaultText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.chatContainer}>
            <View style={{ marginRight: 15 }}>
              <Avatar.Image
                size={40}
                source={require("../constants/images/Roger.jpg")}
              />
            </View>
            <DefaultText>Full Name</DefaultText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.chatContainer}>
            <View style={{ marginRight: 15 }}>
              <Avatar.Image
                size={40}
                source={require("../constants/images/Roger.jpg")}
              />
            </View>
            <DefaultText>Full Name</DefaultText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.chatContainer}>
            <View style={{ marginRight: 15 }}>
              <Avatar.Image
                size={40}
                source={require("../constants/images/Roger.jpg")}
              />
            </View>
            <DefaultText>Full Name</DefaultText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.chatContainer}>
            <View style={{ marginRight: 15 }}>
              <Avatar.Image
                size={40}
                source={require("../constants/images/Roger.jpg")}
              />
            </View>
            <DefaultText>Full Name</DefaultText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.chatContainer}>
            <View style={{ marginRight: 15 }}>
              <Avatar.Image
                size={40}
                source={require("../constants/images/Roger.jpg")}
              />
            </View>
            <DefaultText>Full Name</DefaultText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.chatContainer}>
            <View style={{ marginRight: 15 }}>
              <Avatar.Image
                size={40}
                source={require("../constants/images/Roger.jpg")}
              />
            </View>
            <DefaultText>Full Name</DefaultText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.chatContainer}>
            <View style={{ marginRight: 15 }}>
              <Avatar.Image
                size={40}
                source={require("../constants/images/Roger.jpg")}
              />
            </View>
            <DefaultText>Full Name</DefaultText>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  notLoggedIn: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  chatContainer: {
    alignItems: "center",
    marginHorizontal: 15,
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 0.5,
  },
});

export default ChatsScreen;
