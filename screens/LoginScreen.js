import React from "react";
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Colors from "../constants/Colors";
import CustomInput from "../components/CustomInput";
import CustomButton from "./../components/CustomButton";

// envelope // lock

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label("email")
    .trim()
    .email("Invalid email!")
    .required("Email is required"),
  password: Yup.string()
    .label("password")
    .trim()
    .min(8, "Password is too short!")
    .required("Password is required"),
});

const LoginScreen = ({ navigation }) => {
  const userInfo = {
    email: "",
    password: "",
  };

  const handleSubmitForm = (values, formikActions) => {
    // send to the server

    setTimeout(() => {
      console.log("Submit values ", values);
      formikActions.resetForm();
      formikActions.setSubmitting(false);
    }, 3000);

    // console.log("Formik acitons ", formikActions);
  };

  return (
    <SafeAreaView style={styles.formContainer}>
      {/* <StatusBar style="auto" /> */}
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
              <CustomButton
                buttonDisabled={buttonDisabled}
                handleSubmit={handleSubmit}
                submitting={isSubmitting}
                label="LOG IN"
              />
              <View>
                <Text style={{ marginTop: 10 }}>
                  Already have an account?{" "}
                  <Text
                    style={{ color: "blue", textDecorationLine: "underline" }}
                    onPress={() => {
                      navigation.navigate("Signup");
                    }}
                  >
                    Signup
                  </Text>
                </Text>
              </View>
            </View>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  inputsContainer: {
    flex: 1,
    // paddingLeft: 20,
    // paddingRight: 20,
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

export default LoginScreen;
