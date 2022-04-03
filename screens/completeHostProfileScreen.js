import React from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { Formik } from "formik";
import Colors from "../constants/Colors";
import validationSchema from "./HallSchema";
import CustomInput from "./../components/CustomInput";
import CustomButton from "./../components/CustomButton";
import { useSelector } from "react-redux";
import { URL } from "./../helpers/url";

const CompleteHostProfileScreen = () => {
  const hallInfo = {
    hallName: "",
    address: "",
  };

  const userInfo = useSelector((state) => state.Auth.userInfo);
  console.log("userInfo ", userInfo);
  const { email, id } = userInfo;

  const handleSubmitForm = async (values, formikActions) => {
    const { hallName, address } = values;
    console.log(hallName, address);

    const hallObject = {
      email,
      hallName,
      address,
      location: {
        lat: 33.900863,
        lng: 36.019428,
      },
      ownerId: id,
    };

    try {
      // const response = await fetch(`${URL}/api/user/signup`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(user),
      // });
      const response = await fetch(`${URL}/api/hall/createHall`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hallObject),
      });
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.formContainer}>
      {/* <StatusBar style="auto" /> */}
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
                iconName="envelope"
                iconSize={32}
                value={values.hallName}
                label="Hall Name"
                keyboardType="default"
                placeholder="north hall"
                onChangeText={handleChange("hallName")}
                onBlur={handleBlur("hallName")}
                error={touched.hallName && errors.hallName}
              />
              <CustomInput
                iconName="lock"
                iconSize={32}
                value={values.address}
                label="Hall Address"
                keyboardType="default"
                placeholder="hall address"
                onChangeText={handleChange("address")}
                onBlur={handleBlur("address")}
                error={touched.address && errors.address}
              />
              <CustomButton
                buttonDisabled={buttonDisabled}
                handleSubmit={handleSubmit}
                submitting={isSubmitting}
                label="Finish"
              />
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

export default CompleteHostProfileScreen;
