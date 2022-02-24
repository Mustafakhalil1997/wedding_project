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

import Colors from "../constants/Colors";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import validationSchema from "./SignupSchema";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";
import { signUp, login } from "./../store/actions/Auth";

// envelope // lock

const height = Dimensions.get("window").height;
console.log("height ", height * 0.2);

const SignupScreen = ({ navigation }) => {
  const [toggleSignup, setToggleSignup] = useState(true);

  const userInfo = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const dispatch = useDispatch();

  // console.log("statusBar height", StatusBar.currentHeight);

  const handleSubmitForm = (values, formikActions) => {
    // send to the server
    setTimeout(() => {
      console.log("Submit values ", values);
      dispatch(signUp(values));
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
      keyboardVerticalOffset={50}
      style={[styles.formContainer]}
      // enabled={false}
    >
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
                keyboardType="email-address"
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
                keyboardType="default"
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
                keyboardType="default"
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

export default SignupScreen;
