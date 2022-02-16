import React from "react";
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  SafeAreaView,
  Platform,
  Pressable,
  TouchableNativeFeedback,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Colors from "../constants/Colors";
import CustomInput from "../components/CustomInput";
import { EvilIcons } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";

// envelope // lock

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .label("fullName")
    .trim()
    .min(3, "Invalid name!")
    .required("Name is required!"),
  email: Yup.string()
    .label("email")
    .email("Invalid email!")
    .required("Email is required"),
  password: Yup.string()
    .label("password")
    .trim()
    .min(8, "Password is too short!")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password does not match!")
    .required("Confirm Password is required"),
});

const SignupScreen = ({ navigation }) => {
  const userInfo = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  console.log("hello");
  console.log("statusBar height", StatusBar.currentHeight);

  const handleSubmitForm = (values, formikActions) => {
    // send to the server
    console.log("Submit values ", values);
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

              <CustomButton buttonDisabled handleSubmit label="SIGN UP" />
              <TouchableNativeFeedback
                disabled={buttonDisabled}
                onPress={handleSubmit}
                background={
                  !buttonDisabled &&
                  TouchableNativeFeedback.Ripple("white", false)
                }
              >
                <View
                  style={
                    buttonDisabled
                      ? { ...styles.buttonContainer, opacity: 0.4 }
                      : styles.buttonContainer
                  }
                >
                  <Text>SIGN UP</Text>
                </View>
              </TouchableNativeFeedback>
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

export default SignupScreen;

// export default SignupScreen;

// // import React from "react";
// // import { View, StyleSheet } from "react-native";
// // import { useFormik } from "formik";

// // import BasicInput from "./../components/BasicInput";
// // import BasicButton from "./../components/BasicButton";

// // import validationSchema from "./SignupSchema";

// // const initialValues = {
// //   full_name: "",
// //   email: "",
// //   password: "",
// //   password_confirmation: "",
// // };

// // const SignUp = ({ navigation }) => {
// //   const onSubmit = (values) => {
// //     setTimeout(() => {
// //       navigation.navigate("Home");
// //     }, 3000);
// //   };

// //   const formik = useFormik({
// //     initialValues,
// //     validationSchema,
// //     onSubmit,
// //   });

// //   const {
// //     values,
// //     touched,
// //     errors,
// //     handleChange,
// //     isSubmitting,
// //     isValid,
// //     handleSubmit,
// //   } = formik;

// //   return (
// //     <View style={styles.Container}>
// //       <BasicInput
// //         placeholder={"Enter your full name"}
// //         iconName="user"
// //         iconSize={20}
// //         onChangeText={handleChange("full_name")}
// //         value={values.full_name}
// //         errorMessage={touched.full_name && errors.full_name}
// //       />
// //       <BasicInput
// //         placeholder={"Enter email"}
// //         iconName="envelope"
// //         iconSize={20}
// //         onChangeText={handleChange("email")}
// //         value={values.email}
// //         errorMessage={touched.email && errors.email}
// //       />
// //       <BasicInput
// //         placeholder={"Enter password"}
// //         iconName="lock"
// //         iconSize={24}
// //         secureTextEntry
// //         onChangeText={handleChange("password")}
// //         value={values.password}
// //         errorMessage={touched.password && errors.password}
// //       />
// //       <BasicInput
// //         placeholder={"Confirm password"}
// //         iconName="lock"
// //         iconSize={24}
// //         secureTextEntry
// //         onChangeText={handleChange("password_confirmation")}
// //         value={values.password_confirmation}
// //         errorMessage={
// //           touched.password_confirmation && errors.password_confirmation
// //         }
// //       />
// //       <BasicButton
// //         title={"Sign up"}
// //         width={200}
// //         onPress={handleSubmit}
// //         disabled={!isValid || isSubmitting}
// //         loading={isSubmitting}
// //       />
// //       <View style={styles.SubContainerButton}>
// //         <BasicButton
// //           title={"Already have an account? Login"}
// //           onPress={() => navigation.navigate("Login")}
// //           color="transparent"
// //           type="clear"
// //         />
// //       </View>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   Container: {
// //     justifyContent: "center",
// //     alignItems: "center",
// //     flex: 1,
// //     paddingLeft: 20,
// //     paddingRight: 20,
// //   },
// //   SubContainerButton: {
// //     marginTop: 35,
// //   },
// // });

// // export default SignUp;
