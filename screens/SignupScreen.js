import React, { useState } from "react";
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import { showMessage, hideMessage } from "react-native-flash-message";
import { Formik } from "formik";

import Colors from "../constants/Colors";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import validationSchema from "./SignupSchema";

// envelope // lock

const SignupScreen = ({ navigation }) => {
  const [toggleSignup, setToggleSignup] = useState(true);

  const userInfo = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // console.log("statusBar height", StatusBar.currentHeight);

  const handleSubmitForm = (values, formikActions) => {
    // send to the server
    setTimeout(() => {
      console.log("Submit values ", values);
      formikActions.resetForm();
      formikActions.setSubmitting(false);
      showMessage({
        message: "Signup Successfull",
        type: "success",
        style: { borderRadius: 20 },
      });
    }, 2000);
  };

  // const signUpPressHandler = () => {
  //   setToggleSignup(true);
  // };

  // const honorPressHandler = () => {
  //   setToggleSignup(false);
  //   console.log("helo");
  // };

  const FormSelectorBtn = (props) => {
    const { title, optionStyles, onPress, style } = props;
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[optionStyles, style]}>
          <Text style={styles.optionText}>{title}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    // <SafeAreaView style={[styles.formContainer]}>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.formContainer]}
      // enabled={false}
    >
      {/* <View style={[styles.formContainer]}> */}
      {/* <StatusBar style="auto" /> */}
      {/* <View style={styles.signupSwitchContainer}>
        <FormSelectorBtn
          title="SignUp"
          optionStyles={styles.signupOption}
          onPress={signUpPressHandler}
          style={{
            backgroundColor: toggleSignup ? "#1b1b33" : "rgba(27, 27, 51, 0.4)",
          }}
        />
        <FormSelectorBtn
          title="Have a Wedding Venue? Signup here"
          optionStyles={styles.honorOption}
          onPress={honorPressHandler}
          style={{
            backgroundColor: toggleSignup ? "rgba(27, 27, 51, 0.4)" : "#1b1b33",
          }}
        />
      </View> */}

      {/* <View style={styles.formContentContainer}> */}
      <Formik
        initialValues={userInfo}
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
                value={values.fullName}
                label="Full Name"
                placeholder="John Smith"
                onChangeText={handleChange("fullName")}
                onBlur={handleBlur("fullName")}
                error={touched.fullName && errors.fullName}
              />
              <CustomInput
                iconName="envelope"
                iconSize={32}
                value={values.email}
                label="E-mail Address"
                placeholder="example@gmail.com"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                error={touched.email && errors.email}
              />
              <CustomInput
                iconName="lock"
                iconSize={32}
                value={values.password}
                secureTextEntry
                label="Password"
                placeholder="********"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                error={touched.password && errors.password}
              />
              <CustomInput
                iconName="lock"
                iconSize={32}
                value={values.confirmPassword}
                secureTextEntry
                label="Confirm Password"
                placeholder="********"
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                error={touched.confirmPassword && errors.confirmPassword}
              />

              <CustomButton
                buttonDisabled={buttonDisabled}
                handleSubmit={handleSubmit}
                submitting={isSubmitting}
                label="SIGN UP"
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

  signupSwitchContainer: {
    flex: 1,
    // backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 30,
  },

  signupOption: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: "#1b1b33",
  },

  honorOption: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "rgba(27, 27, 51, 0.4)",
  },

  optionText: {
    fontFamily: "open-sans-bold",
    color: "white",
    fontSize: 14,
  },

  formContentContainer: {
    flex: 1,
    // backgroundColor: "pink",
  },

  inputsContainer: {
    flex: 1,

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

export default SignupScreen;
