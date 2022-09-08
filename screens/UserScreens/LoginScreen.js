import React, { useEffect } from "react";
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { showMessage, hideMessage } from "react-native-flash-message";
import { Formik } from "formik";
import * as Yup from "yup";
import Colors from "../../constants/Colors";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import validationSchema from "./LoginSchema";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/actions/Auth";
import { URL } from "../../helpers/url";
import DefaultText from "../../components/DefaultText";
import { SafeAreaView } from "react-native-safe-area-context";
import { connectionMessage } from "../../helpers/connectionMessageHandler";
import { userChatLogOut } from "../../store/actions/UserChat";
import { hallChatLogOut } from "../../store/actions/HallChat";

// envelope // lock

const LoginScreen = ({ navigation }) => {
  const userInfo = {
    email: "",
    password: "",
  };

  console.log("this is login screen");

  const dispatch = useDispatch();
  const userType = useSelector((state) => state.Auth.userType);
  const token = useSelector((state) => state.Auth.token);
  const connectionStatus = useSelector((state) => state.Connection.isConnected);

  const userChats = useSelector((state) => state.UserChats.userChats);

  useEffect(() => {
    /* had to these two after I make sure useData is wiped out
       what was happening is that the dispatch doesn't work in order,
       so it doesn't wait until userData is wiped out to delete chats.
       it was deleting the chats sometimes before chatRooms list inside userInfo is cleared,
       then when the token is set to null first the useEffect inside chatsScreen runs again
       and calls api request to get chats. so by the time userInfo is cleared it is too late then
     */
    if (!token) {
      dispatch(userChatLogOut());
      dispatch(hallChatLogOut());
    }
  }, [token]);

  const handleSubmitForm = async (values, formikActions) => {
    // send to the server
    console.log("connectionStatuss ", connectionStatus);
    if (!connectionStatus) {
      console.log("connectionTypee ", connectionType);
      console.log("not connected to wifi");
      connectionMessage("You are not connected to wifi");
      return;
    }
    const { email, password } = values;

    const user = {
      id: "u1",
      firstName: "Mustafa",
      lastName: "Khalil",
      email,
      password,
      profileImage: "",
      favorites: [],
    };
    try {
      console.log("sending request to login");
      const response = await fetch(`${URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log("response.status ", response.status);
      const responseData = await response.json();
      const { userInfo, token, hallInfo } = responseData;
      console.log("message ", responseData.message);

      if (response.status === 200) {
        dispatch(login(token, userInfo, hallInfo));
        formikActions.resetForm();
        formikActions.setSubmitting(false);
        showMessage({
          message: "Logged In Successfully",
          type: "success",
          style: {
            borderRadius: 20,
          },
        });
        if (userType === "user") {
          console.log("going back");
          navigation.navigate({ name: "Explore" });
        } else {
          navigation.navigate({ name: "Home" });
        }
      } else {
        const errorMessage = responseData.message;
        showMessage({
          message: errorMessage,
          color: "white",
          backgroundColor: "red",
          type: "default",
          style: {
            borderRadius: 20,
          },
        });
      }
    } catch (error) {
      showMessage({
        message: "An unknown error occurred, please try again",
        color: "white",
        backgroundColor: "red",
        type: "default",
        style: {
          borderRadius: 20,
        },
      });
      console.log("errorR ", error.message);
    }

    // console.log("Formik acitons ", formikActions);
  };

  const forgotPasswordHandler = async () => {
    const response = await fetch(`${URL}/api/user/forgotPassword`, {
      method: "PATCH",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const responseData = await response.json();
    console.log("responseData in forgotPassword ", responseData);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
      edges={["bottom"]}
    >
      <View style={[styles.formContainer]}>
        <View style={{ marginBottom: "50%" }}></View>

        <ScrollView keyboardShouldPersistTaps="handled">
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
                    type="password"
                  />

                  <CustomButton
                    buttonDisabled={buttonDisabled}
                    handleSubmit={handleSubmit}
                    submitting={isSubmitting}
                    label="LOG IN"
                  />
                </View>
              );
            }}
          </Formik>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Signup");
            }}
          >
            <View style={{ marginTop: 30, alignSelf: "center" }}>
              <DefaultText styles={{ fontSize: 16, color: Colors.accentColor }}>
                Don't have an account? Sign Up
              </DefaultText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={forgotPasswordHandler}>
            <View style={{ marginTop: 20, alignSelf: "center" }}>
              <DefaultText
                styles={{ fontSize: 16, color: "blue", opacity: 0.6 }}
              >
                Forgot Password?
              </DefaultText>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
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
