import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";

import { showMessage } from "react-native-flash-message";
import { editProfile } from "./../../store/actions/Auth";
import { URL } from "./../../helpers/url";

import validationSchema from "./ChangePasswordSchema";
import CustomInput from "./../../components/CustomInput";
import CustomButton from "./../../components/CustomButton";

const ChangePasswordScreen = () => {
  const userInfo = useSelector((state) => state.Auth.userInfo);
  const { id } = userInfo;
  const token = useSelector((state) => state.Auth.token);
  console.log("userInfo ", userInfo);
  const dispatch = useDispatch();

  const passwordInfo = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmitForm = async (values, formikActions) => {
    console.log(values);
    console.log(formikActions);

    const { currentPassword, newPassword, confirmPassword } = values;

    if (currentPassword === newPassword) {
      showMessage({
        message: "New Password Cannot be the Same as Current Password",
        color: "white",
        backgroundColor: "red",
        type: "default",
        style: {
          borderRadius: 15,
        },
      });
      return;
    }

    try {
      const response = await fetch(`${URL}/api/user/changePassword/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(values),
      });
      const responseData = await response.json();
      const { message } = responseData;

      if (response.status === 200) {
        dispatch(editProfile({ password: newPassword }));
        formikActions.resetForm();
        formikActions.setSubmitting(false);
        showMessage({
          message: "Password Changed Successfully",
          type: "success",
          style: {
            borderRadius: 20,
          },
        });
        //   if (userType === "user") {
        //     console.log("going back");
        //     navigation.navigate({ name: "Explore" });
        //   } else {
        //     navigation.navigate({ name: "Home" });
        //   }
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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <Formik
        initialValues={passwordInfo}
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
                iconName="lock"
                iconSize={32}
                value={values.currentPassword}
                secureTextEntry
                label="Current Password"
                keyboardType="default"
                placeholder="********"
                onChangeText={handleChange("currentPassword")}
                onBlur={handleBlur("currentPassword")}
                error={touched.currentPassword && errors.currentPassword}
                type="password"
              />

              <CustomInput
                iconName="lock"
                iconSize={32}
                value={values.newPassword}
                secureTextEntry
                label="New Password"
                keyboardType="default"
                placeholder="********"
                onChangeText={handleChange("newPassword")}
                onBlur={handleBlur("newPassword")}
                error={touched.newPassword && errors.newPassword}
                type="password"
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
                type="password"
              />

              <CustomButton
                buttonDisabled={buttonDisabled}
                handleSubmit={handleSubmit}
                submitting={isSubmitting}
                label="CONFIRM"
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  inputsContainer: {
    flex: 1,
    // paddingLeft: 20,
    // paddingRight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChangePasswordScreen;
