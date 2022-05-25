import React, { useState } from "react";
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import { showMessage, hideMessage } from "react-native-flash-message";
import { Formik } from "formik";

import Colors from "../../constants/Colors";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import validationSchema from "./HallSchema";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import { signUp, editHall } from "../../store/actions/Auth";

// envelope // lock

const height = Dimensions.get("window").height;
console.log("height ", height * 0.2);

const EditHallScreen = ({ navigation }) => {
  const user = useSelector((state) => state.Auth.userInfo);
  const { id, email, firstName, lastName, password, profileImage } = user;

  const currentLocation = useSelector(
    (state) => state.location.currentLocation
  );

  const hallInformation = useSelector((state) => state.Auth.hallInfo);
  console.log("Hall Information ", hallInformation);

  const hallInfo = {
    hallName: "",
    email: email,
    address: "",
    // location: {
    //   lat: currentLocation.latitude,
    //   lng: currentLocation.lng,
    // },
    location: currentLocation.latitude + ", " + currentLocation.longitude,
  };

  const dispatch = useDispatch();

  // console.log("statusBar height", StatusBar.currentHeight);

  const handleSubmitForm = (values, formikActions) => {
    // send to the server
    const { hallName, email, location } = values;

    // const coords = location.split(",");
    // console.log("coords ", coords);

    const hall = {
      id: "h1",
      hallName: hallName,
      userId: id,
      email,
      password,
      profileImage: profileImage,
      location: currentLocation,
      images: [],
      reservations: [],
    };
    console.log("valuesss ", hall);
    setTimeout(() => {
      dispatch(editHall(hall));
      //   formikActions.resetForm();
      formikActions.setSubmitting(false);
      showMessage({
        message: "Signup Successfull",
        type: "success",
        style: { borderRadius: 20 },
      });
    }, 2000);
  };

  return (
    // <SafeAreaView style={[styles.formContainer]}>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={50}
      style={[styles.formContainer]}
      // enabled={false}
    >
      <Formik
        initialValues={hallInfo}
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
          let buttonDisabled = true;
          if (
            Object.keys(errors).length == 0 &&
            Object.keys(touched).length != 0
          ) {
            buttonDisabled = false;
          }

          return (
            <View style={styles.inputsContainer}>
              <CustomInput
                iconName="user"
                iconSize={32}
                value={values.hallName}
                label="Hall Name"
                placeholder="Some Hall"
                onChangeText={handleChange("hallName")}
                onBlur={handleBlur("hallName")}
                error={touched.hallName && errors.hallName}
              />
              <CustomInput
                iconName="user"
                iconSize={32}
                value={values.email}
                label="E-mail address"
                placeholder="mustafa@gmail.com"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                error={errors.email}
              />
              <CustomInput
                iconName="user"
                iconSize={32}
                value={values.address}
                label="Address"
                placeholder="address"
                onChangeText={handleChange("address")}
                onBlur={handleBlur("address")}
                error={touched.address && errors.address}
              />
              <CustomInput
                iconName="user"
                iconSize={32}
                value={values.location}
                label="Location"
                placeholder="location"
                onChangeText={handleChange("location")}
                onBlur={handleBlur("location")}
                error={touched.location && errors.location}
              />
              <CustomButton
                buttonDisabled={buttonDisabled}
                handleSubmit={handleSubmit}
                submitting={isSubmitting}
                label="NEXT"
              />
            </View>
          );
        }}
      </Formik>
      {/* </View> */}
      {/* </View> */}
    </KeyboardAvoidingView>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    backgroundColor: "white",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  formContentContainer: {
    flex: 1,
    // backgroundColor: "pink",
  },

  inputsContainer: {
    flex: 1,
    // marginTop: height * 0.08,
    // marginBottom: height * 0.08,
    // backgroundColor: "pink",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonContainer: {
    width: "80%",
    marginTop: 20,
    borderRadius: 15,
    alignItems: "center",
    backgroundColor: 10,
    padding: 15,

    backgroundColor: Colors.accentColor,
  },
  button: {
    borderRadius: 10,
  },
});

export default EditHallScreen;
