import React, { createRef, useLayoutEffect, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Button,
  Text,
  Alert,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "react-native-paper";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import * as ImagePicker from "expo-image-picker";
import validationSchema from "./EditProfileSchema";
import { Formik } from "formik";
import { Ionicons } from "@expo/vector-icons";

import { editProfile } from "../../store/actions/Auth";
import { showMessage } from "react-native-flash-message";
import { URL } from "../../helpers/url";

import customBackArrow from "../../helpers/customBackArrow";
import customBackHandler from "../../helpers/customBackHandler";
import { cloudinaryURL } from "../../helpers/cloudinaryURL";

import CustomHeaderButton from "../../components/HeaderButton";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import DefaultText from "../../components/DefaultText";

const { width } = Dimensions.get("window");

const EditProfileScreen = (props) => {
  // save button should be on header right
  console.log("wdith ", width);

  const { route, navigation } = props;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImagePicked, setProfileImagePicked] = useState();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  if (profileImagePicked) {
    console.log("uri ", profileImagePicked);
  }

  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.Auth.userInfo);
  console.log("userinfo ", userInfo);
  const token = useSelector((state) => state.Auth.token);

  const { id, firstName, lastName, email, profileImage } = userInfo;

  console.log("profileImagee ", URL + "/" + profileImage);
  const buttonRef = createRef();

  const userInfoBasic = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };

  const pickProfileImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Allow access to camera in your settings"
      );
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      // base64: true,
      quality: 1,
    });
    console.log("result ", result);
    if (!result.cancelled) {
      setProfileImagePicked(result.uri);
      setHasUnsavedChanges(true);
    }
  };

  useLayoutEffect(() => {
    customBackArrow({ navigation, isSubmitting });
  }, [isSubmitting]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        //   <Text>Save</Text>

        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Save"
            iconName="save-outline"
            onPress={saveClickHandler}
            style={{ opacity: isSubmitting ? 0.3 : 1 }}
          />
        </HeaderButtons>
      ),
    });
  }, [isSubmitting]);

  useEffect(() => {
    const backHandler = customBackHandler({ navigation, isSubmitting });

    return () => {
      console.log("useEffect returned");
      backHandler.remove();
    };
  }, [isSubmitting]);

  let submitForm;

  const convertedImageUrl = cloudinaryURL + profileImage;

  const saveClickHandler = () => {
    // buttonRef.current.props.onPress();
    submitForm();
    // submitForm is being assigned a function inside formik, I don't think this is a good approach but I'll go with it for now.
    // the other approach is setting a button down in the form and using a ref to call its onPress method from here when save button is clicked
  };

  const handleSubmitForm = async (values, formikActions) => {
    console.log("New Values ", values);

    const { email, firstName, lastName } = values;

    setIsSubmitting(true);
    try {
      if (profileImagePicked) {
        console.log();
        const imageData = new FormData();
        imageData.append("profileImage", {
          name: new Date() + "_profile",
          uri: profileImagePicked,
          type: "image/jpg" || "image/png" || "image/jpeg",
        });

        const res = await fetch(`${URL}/api/user/addImage/${id}`, {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
          body: imageData,
        });
        const resData = await res.json();
        if (res.status !== 200) {
          const errorMessage = resData.message;
          showMessage({
            message: errorMessage,
            type: "default",
            color: "white",
            backgroundColor: "red",
            style: { borderRadius: 20 },
          });
        }
      }

      const newUser = {
        email,
        firstName,
        lastName,
      };
      const response = await fetch(`${URL}/api/user/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(newUser),
      });
      const responseData = await response.json();
      const newUserInfo = responseData.user;
      if (response.status === 200) {
        dispatch(editProfile(newUserInfo));
        formikActions.setSubmitting(false);
        const successMessage = responseData.message;
        showMessage({
          message: successMessage,
          type: "success",
          color: "white",
          backgroundColor: "green",
          style: { borderRadius: 20 },
        });
        setHasUnsavedChanges(false);
      } else {
        const errorMessage = responseData.message;
        showMessage({
          message: errorMessage,
          type: "default",
          color: "white",
          backgroundColor: "red",
          style: { borderRadius: 20 },
        });
      }
      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);
      showMessage({
        message: err.message || "An unknown error occured, Please try again",
        type: "default",
        color: "white",
        backgroundColor: "red",
        style: { borderRadius: 20 },
      });
      console.log("errorrr ", err);
    }
    // send data to the server and update the store
  };

  const showImage = () => {
    if (profileImage && !profileImagePicked) {
      console.log("I have a profile image");
      return convertedImageUrl;
    }
    if (profileImagePicked) {
      console.log("I have a picked image");
      return profileImagePicked;
    }
    return null;
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <View style={styles.imageCircleContainer}>
            {!profileImage && !profileImagePicked && (
              <Avatar.Image
                size={240}
                source={require("../../constants/images/Roger.jpg")}
              />
            )}

            {showImage() && (
              <Avatar.Image
                size={240}
                source={{
                  uri: showImage(),
                }}
              />
            )}
          </View>
          <View style={styles.imagePickerContainer}>
            <Ionicons
              name="md-camera-outline"
              size={30}
              onPress={pickProfileImage}
            />
          </View>
        </View>

        <Formik
          initialValues={userInfoBasic}
          validationSchema={validationSchema}
          onSubmit={handleSubmitForm}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            touched,
            handleBlur,
            errors,
            isSubmitting,
          }) => {
            let buttonDisabled = false;
            // if (
            //   Object.keys(errors).length == 0 &&
            //   Object.keys(touched).length != 0
            // ) {
            //   buttonDisabled = false;
            // }
            submitForm = handleSubmit;

            return (
              <View style={styles.inputsContainer}>
                <CustomInput
                  iconName="user"
                  iconSize={32}
                  value={values.firstName}
                  label="First Name"
                  placeholder="John"
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  error={touched.firstName && errors.firstName}
                />
                <CustomInput
                  iconName="user"
                  iconSize={32}
                  value={values.lastName}
                  label="Last Name"
                  placeholder="Smith"
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  error={touched.lastName && errors.lastName}
                />
                <CustomInput
                  iconName="envelope"
                  iconSize={32}
                  value={values.email}
                  label="E-mail Address"
                  keyboardType="email-address"
                  placeholder="example@gmail.com"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  error={touched.email && errors.email}
                  autoCapitalize="none"
                  editable={false}
                />
                {/* <Button
                  title="Press me"
                  ref={buttonRef}
                  onPress={handleSubmit}
                /> */}
                {/* <CustomButton
                  buttonDisabled={buttonDisabled}
                  handleSubmit={handleSubmit}
                  submitting={isSubmitting}
                  label="SIGN UP"
                  ref={buttonRef}
                /> */}
              </View>
            );
          }}
        </Formik>
        <TouchableOpacity
          style={{
            width: "50%",
            alignSelf: "flex-end",
            marginHorizontal: 20,
            marginVertical: 10,
            backgroundColor: "black",
            padding: 10,
            borderRadius: 5,
            alignItems: "center",
          }}
        >
          <DefaultText style={{ color: "white", fontFamily: "open-sans-bold" }}>
            Change Password
          </DefaultText>
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
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  imageCircleContainer: {
    borderRadius: 120,
    backgroundColor: "gray",
  },
  imagePickerContainer: {
    position: "absolute",
    // bottom: 20,
    bottom: "8%",
    // right: 70,
    right: (width - 240) / 2 + 10,
    backgroundColor: "white",
    borderRadius: 25,
    borderColor: "gray",
    borderWidth: 0.5,
    padding: 3,
  },
  inputsContainer: {
    flex: 1,
    // marginTop: height * 0.08,
    // marginBottom: height * 0.08,
    // backgroundColor: "pink",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditProfileScreen;
