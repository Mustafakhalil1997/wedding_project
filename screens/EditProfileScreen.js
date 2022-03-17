import React, { createRef, useLayoutEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Image, Button } from "react-native";
import { Avatar } from "react-native-paper";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import CustomHeaderButton from "./../components/HeaderButton";
import validationSchema from "./EditProfileSchema";
import { Formik } from "formik";
import CustomInput from "./../components/CustomInput";
import CustomButton from "./../components/CustomButton";
import { editProfile } from "./../store/actions/Auth";
import { showMessage } from "react-native-flash-message";

const EditProfileScreen = (props) => {
  // save button should be on header right

  //   Image.getSize("../constants/images/Me.jpeg", imageSize);
  const { route, navigation } = props;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.Auth.userInfo);

  const { id, firstName, lastName, email, password, profileImage } = userInfo;

  const buttonRef = createRef();

  const userInfoBasic = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  };

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
  });

  let submitForm;

  const saveClickHandler = () => {
    // buttonRef.current.props.onPress();
    submitForm();
    // submitForm is being assigned a function inside formik, I don't think this is a good approach but I'll go with it for now.
    // the other approach is setting a button down in the form and using a ref to call its onPress method from here when save button is clicked
  };

  const handleSubmitForm = async (values, formikActions) => {
    console.log("New Values ", values);
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `http://95fc-185-101-16-99.ngrok.io/api/user/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const responseData = await response.json();

      if (response.status === 200) {
        dispatch(editProfile(values));
        formikActions.setSubmitting(false);
        const successMessage = responseData.message;
        showMessage({
          message: successMessage,
          type: "success",
          color: "white",
          backgroundColor: "green",
          style: { borderRadius: 20 },
        });
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
      console.log("error ", err);
    }
    // send data to the server and update the store
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../constants/images/Me.jpeg")}
          style={{
            aspectRatio: 1.8 / 1.8,
            width: "100%",
            height: "100%",
          }}
        />
      </View>
      <ScrollView>
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
    backgroundColor: "#EBEAE8",
    height: 220,
    alignItems: "center",
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
