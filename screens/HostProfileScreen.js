import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Button,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "react-native-paper";
import DefaultText from "./../components/DefaultText";
import ProfileElement from "./ProfileElement";
import { logout, switchProfile } from "./../store/actions/Auth";

const HostProfileScreen = (props) => {
  const { navigation } = props;

  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.Auth.userInfo);
  console.log("userInfo", userInfo);

  const { fullName, email, id, profileImage } = userInfo;

  const editProfileClickHandler = () => {
    console.log("clicked");
    navigation.navigate({
      name: "Edit",
    });
  };

  const logoutClickHandler = () => {
    dispatch(logout());
  };

  const switchProfileClickHandler = () => {
    dispatch(switchProfile());
  };

  const editHallDetailHandler = () => {
    navigation.navigate({
      name: "EditHall",
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.profileContainer}>
        <View style={styles.header}>
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
          {/* <View></View> */}
          <TouchableOpacity style={{}} onPress={logoutClickHandler}>
            <DefaultText style={{ color: "red", fontFamily: "open-sans-bold" }}>
              LOGOUT
            </DefaultText>
          </TouchableOpacity>
        </View>
        <DefaultText
          styles={{
            fontSize: 26,
            fontFamily: "acme-regular",
          }}
        >
          {fullName || "Mustafa Khalil"}
        </DefaultText>
        <TouchableOpacity onPress={editProfileClickHandler}>
          <DefaultText
            styles={{
              fontSize: 16,
              marginBottom: 30,
              textDecorationLine: "underline",
            }}
          >
            Edit Profile
          </DefaultText>
        </TouchableOpacity>
        <DefaultText styles={styles.contentTitle}>Account Settings</DefaultText>
        <View style={styles.accountSettings}>
          <ProfileElement iconName="person-circle-outline">
            Personal Info
          </ProfileElement>
          <ProfileElement
            iconName="add-circle-outline"
            onPress={editHallDetailHandler}
          >
            Edit Hall Details
          </ProfileElement>
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
          <ProfileElement
            iconName="people-outline"
            onPress={switchProfileClickHandler}
          >
            Switch
          </ProfileElement>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
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

export default HostProfileScreen;
