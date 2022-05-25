import React, { useState } from "react";
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
  Dimensions,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "react-native-paper";
import DefaultText from "./../components/DefaultText";
import ProfileElement from "./ProfileElement";
import { editHall, logout, switchProfile } from "./../store/actions/Auth";
import { URL } from "../helpers/url";
import { cloudinaryURL } from "./../helpers/cloudinaryURL";
import * as ImagePicker from "expo-image-picker";
import { showMessage } from "react-native-flash-message";

const { width } = Dimensions.get("window");

const HostProfileScreen = (props) => {
  const { navigation } = props;

  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.Auth.userInfo);
  const hallInfo = useSelector((state) => state.Auth.hallInfo);

  const { id: hallId, images } = hallInfo;
  const { firstName, lastName, email, id, profileImage } = userInfo;

  const convertedImagesUrl = images.map((image) => cloudinaryURL + image);

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

  const editImagesClickHandler = () => {
    navigation.navigate({
      name: "EditImages",
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.profileContainer}>
        <View style={[styles.imagesContainer]}>
          {convertedImagesUrl.map((imageUri, index) => (
            <Image
              key={index}
              source={{ uri: imageUri }}
              style={{
                ...styles.image,
                width: (width - 40 - 1) / 3,
                height: 100,
                aspectRatio: 2 / 2,
              }}
            />
          ))}
          {/* <Image
            source={{ uri: convertedImagesUrl[0] }}
            style={{
              ...styles.image,
              width: (width - 40 - 1) / 3,
              height: 100,
              aspectRatio: 2 / 2,
            }}
          /> */}

          <TouchableOpacity onPress={editImagesClickHandler}>
            <View
              style={{
                width: (width - 40 - 1) / 3,
                height: (width - 40 - 1) / 3,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DefaultText
                styles={{ fontSize: 18, fontFamily: "open-sans-bold" }}
              >
                EDIT
              </DefaultText>
            </View>
            {/* <Image
              source={require("../constants/images/addImageIcon.png")}
              style={{
                width: (width - 40 - 1) / 3,
                height: (width - 40 - 1) / 3,
                aspectRatio: 2 / 2,
              }}
            /> */}
          </TouchableOpacity>
        </View>
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
  imagesContainer: {
    borderWidth: 0.5,
    borderColor: "gray",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  profileContainer: {
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
