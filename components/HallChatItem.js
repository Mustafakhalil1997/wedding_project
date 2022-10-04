import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";

import DefaultText from "./DefaultText";
import { cloudinaryURL } from "./../helpers/cloudinaryURL";

const HallChatItem = (props) => {
  const { navigation, item } = props;
  const { _id, chats, userId: userItem } = item;

  const lastChat = chats[0];
  const { message, time } = lastChat;

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
    if (diffMins >= 1) return diffMins + " minutes ago";
    return "now";
  })();

  const contactName = userItem.firstName + " " + userItem.lastName;
  const contactImage = userItem.profileImage;
  const contactId = userItem._id;

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("HallChat", {
          title: contactName,
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
              style={styles.userImage}
            />
          )}
        </View>
        <View style={styles.textSection}>
          <View style={styles.userInfoText}>
            <DefaultText style={styles.userName}>{contactName}</DefaultText>
            <DefaultText style={styles.postTime}>{timeDifference}</DefaultText>
          </View>
          <DefaultText style={styles.messageText}>{message}</DefaultText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export default HallChatItem;
