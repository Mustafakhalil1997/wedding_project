import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { Avatar } from "react-native-paper";

const ProfileScreen = (props) => {
  const userInfo = useSelector((state) => state.Auth.userInfo);
  console.log("userInfo", userInfo);

  return (
    <ScrollView style={styles.profileContainer}>
      <View style={styles.imageCircleContainer}>
        {/* <Avatar.Image
          size={24}
          source={require("../constants/images/profile-icon-avatar.png")}
        /> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    backgroundColor: "white",
  },
  imageCircleContainer: {
    padding: 30,
    marginTop: 20,
    marginLeft: 20,
    borderRadius: 30,
    alignSelf: "flex-start",
    backgroundColor: "gray",
  },
});

export default ProfileScreen;
