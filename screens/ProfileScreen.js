import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Button,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useSelector } from "react-redux";
import { Avatar } from "react-native-paper";
import DefaultText from "./../components/DefaultText";
import ProfileElement from "./ProfileElement";

const ProfileScreen = (props) => {
  const userInfo = useSelector((state) => state.Auth.userInfo);
  console.log("userInfo", userInfo);

  const { fullName, email } = userInfo;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.profileContainer}>
        <View style={styles.imageCircleContainer}>
          {/* <Avatar.Image
          size={60}
          source={require("../constants/images/profile-icon-avatar.png")}
        /> */}
          <Avatar.Image
            size={60}
            source={require("../constants/images/Roger.jpg")}
          />
        </View>
        <DefaultText
          styles={{
            fontSize: 26,
            fontFamily: "acme-regular",
            marginBottom: 30,
          }}
        >
          {fullName || "Mustafa Khalil"}
        </DefaultText>
        <DefaultText styles={styles.contentTitle}>Account Settings</DefaultText>
        <View style={styles.accountSettings}>
          <ProfileElement iconName="person-circle-outline">
            Personal Info
          </ProfileElement>
          <ProfileElement iconName="md-card-outline">Payments</ProfileElement>
          <ProfileElement iconName="document-text-outline">
            Terms and conditions
          </ProfileElement>
        </View>
        <DefaultText styles={styles.contentTitle}>Host a Wedding?</DefaultText>
        <DefaultText styles={{ fontSize: 12 }}>
          if you have a wedding venue and would like to host weddings, switch to
          hosting
        </DefaultText>
        <View style={styles.accountSettings}>
          <ProfileElement iconName="people-outline">Switch</ProfileElement>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  profileContainer: {
    backgroundColor: "white",
    padding: 20,
  },
  imageCircleContainer: {
    borderRadius: 30,
    marginBottom: 20,
    alignSelf: "flex-start",
    backgroundColor: "gray",
  },
  contentTitle: { fontSize: 22, marginTop: 20 },

  accountSettings: {
    marginTop: 15,
  },
});

export default ProfileScreen;
