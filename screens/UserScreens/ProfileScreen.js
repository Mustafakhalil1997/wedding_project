import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Button,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "react-native-paper";
import { showMessage } from "react-native-flash-message";

import { logout, switchProfile } from "../../store/actions/Auth";
import { URL } from "../../helpers/url";
import { cloudinaryURL } from "../../helpers/cloudinaryURL";

import DefaultText from "../../components/DefaultText";
import ProfileElement from "./ProfileElement";
import { userChatLogOut } from "../../store/actions/UserChat";
import { hallChatLogOut } from "../../store/actions/HallChat";
// import { logOut } from "./../../store/actions/HallChat";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const ProfileScreen = (props) => {
  const { navigation } = props;

  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.Auth.userInfo);

  const { firstName, lastName, email, id, profileImage, reservation } =
    userInfo;

  const fullName = firstName + " " + lastName;
  console.log("fullName in profileScreen", fullName);
  console.log("profileImage in profileScreen ", profileImage);

  let convertedImageUrl = "";
  if (profileImage) convertedImageUrl = cloudinaryURL + profileImage;
  //  convertedImageUrl = URL + "/" + profileImage.replace(/\\/g, "/");

  const editProfileClickHandler = () => {
    console.log("clicked");
    navigation.navigate({
      name: "Edit",
    });
  };

  const logoutClickHandler = () => {
    dispatch(logout());
    dispatch(userChatLogOut());
    dispatch(hallChatLogOut());
  };

  const switchProfileClickHandler = () => {
    dispatch(switchProfile());
  };

  const goToMyReservation = () => {
    if (!reservation) {
      showMessage({
        message: "Reserve a venue to see details here",
      });
      return;
    }
    navigation.navigate({
      name: "MyReservation",
    });
  };
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={{
        flex: 1,
        paddingTop: insets.top,
      }}
    >
      <ScrollView style={styles.profileContainer}>
        <View style={styles.header}>
          <View style={styles.imageCircleContainer}>
            {/* <Avatar.Image
              size={60}
              source={{
                uri: "https://res.cloudinary.com/drpmbofhb/image/upload/v1652994324/images/oiylcizbnqcquzrzz6zy.jpg",
              }}
            /> */}
            {profileImage ? (
              <Avatar.Image size={60} source={{ uri: convertedImageUrl }} />
            ) : (
              <Avatar.Image
                size={60}
                source={require("../../constants/images/Roger.jpg")}
              />
            )}
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
          {fullName}
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
          <ProfileElement iconName="md-card-outline">Payments</ProfileElement>
          <ProfileElement iconName="document-text-outline">
            Terms and conditions
          </ProfileElement>
          <ProfileElement
            onPress={goToMyReservation}
            iconName={reservation ? "bookmarks" : "bookmarks-outline"}
          >
            Check Your Reservation
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

export default ProfileScreen;
