import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";

import { URL } from "../../helpers/url";
import { editHall } from "../../store/actions/Auth";
import { showMessage } from "react-native-flash-message";
import { setCurrentLocation } from "../../store/actions/Location";
import { SafeAreaView } from "react-native-safe-area-context";

import * as ImagePicker from "expo-image-picker";
import Map from "../../components/Map";

import validationSchema from "./HallSchema";

import CustomButton from "./../../components/CustomButton";
import DefaultText from "./../../components/DefaultText";
import CustomInput from "./../../components/CustomInput";
import Colors from "../../constants/Colors";

const { width } = Dimensions.get("window");

const CompleteHostProfileScreen = (props) => {
  const { navigation } = props;

  const basicHallInfo = {
    hallName: "",
    address: "",
    mobileNumber: "",
    price: "",
  };

  const dispatch = useDispatch();

  const hallInfo = useSelector((state) => state.Auth.hallInfo);
  const userInfo = useSelector((state) => state.Auth.userInfo);
  const token = useSelector((state) => state.Auth.token);

  const { id, email } = userInfo;

  const [imageSelected, setImageSelected] = useState();
  const [location, setLocation] = useState();

  useEffect(() => {
    const loadCurrentLocation = async () => {
      dispatch(setCurrentLocation());
    };
    loadCurrentLocation();
  }, [dispatch]);

  const getLocation = (location) => {
    console.log("location", location);
    setLocation(location);
  };

  const pickImage = async () => {
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
    if (!result.cancelled) {
      // const imageSize = result.base64.length * (3 / 4) - 2;
      // console.log("imageSize ", imageSize);
      // if (imageSize > 1000000) {
      //   console.log("Big Image");
      // }
      setImageSelected(result.uri);
      // setHasUnsavedChanges(true);
    }
  };

  if (hallInfo) {
    return (
      <View>
        <DefaultText>Welcome.. You already have a hall</DefaultText>
      </View>
    );
  }

  const handleSubmitForm = async (values, formikActions) => {
    console.log("values", values);
    console.log("location", location);
    console.log(formikActions);

    const { hallName, address, mobileNumber, price } = values;

    // setTimeout(() => {
    //   formikActions.setSubmitting(false);
    // }, 3000);

    try {
      // a side note: add the token for authorization to heroku

      const newHall = {
        ownerId: id,
        hallName,
        email,
        mobileNumber,
        address,
        location: {
          lat: location.latitude,
          lng: location.longitude,
        },
        price,
      };

      const response = await fetch(`${URL}/api/hall/createHall`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + token,
        },
        body: JSON.stringify(newHall),
      });

      const responseData = await response.json();
      const newHallInfo = responseData.hall;
      console.log("newHallInfo ", newHallInfo);
      // to be saved inside the store

      if (response.status === 200) {
        // dispatch(editHall(newHallInfo));
      } else {
        const errorMessage = responseData.message;
        console.log("errorMessage ", errorMessage);
        showMessage({
          message: errorMessage,
          type: "default",
          color: "white",
          backgroundColor: "red",
          style: { borderRadius: 20 },
        });
      }

      const imageData = new FormData();
      imageData.append("profileImage", {
        name: new Date() + "_profile",
        uri: imageSelected,
        type: "image/jpg" || "image/png" || "image/jpeg",
      });

      const res = await fetch(`${URL}/api/hall/addImage/${newHallInfo.id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
        body: imageData,
      });

      console.log("res in image upload ", res);
      const resData = await res.json();

      console.log("resData ", resData);

      const { newHallInfo: updatedHall } = resData;

      if (res.status === 200) {
        dispatch(editHall(updatedHall));
      }

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
    } catch (err) {
      showMessage({
        message: err.message || "An unknown error occured, Please try again",
        type: "default",
        color: "white",
        backgroundColor: "red",
        style: { borderRadius: 20 },
      });
      console.log("errorrr ", err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right"]}>
      <View style={styles.formContainer}>
        <ScrollView keyboardShouldPersistTaps="handled">
          {/* <CustomButton
            buttonDisabled={false}
            // handleSubmit={
            //   accessToken
            //     ? getUserData
            //     : () => {
            //         promptAsync({ showInRecents: true });
            //       }
            // }

            submitting={false}
            label={accessToken ? "GET USER DATA" : "SIGN UP WITH GOOGLE"}
            style={{
              backgroundColor: "red",
            }}
          /> */}

          <Formik
            initialValues={basicHallInfo}
            validationSchema={validationSchema}
            onSubmit={handleSubmitForm}
            enableReinitialize
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
                Object.keys(touched).length != 0 &&
                imageSelected
              ) {
                buttonDisabled = false;
              }

              return (
                <View style={styles.inputsContainer}>
                  <CustomInput
                    iconName="user"
                    iconSize={32}
                    value={values.hallName}
                    label="Venue Name"
                    placeholder="5 Stars Venue"
                    onChangeText={handleChange("hallName")}
                    onBlur={handleBlur("hallName")}
                    error={touched.hallName && errors.hallName}
                    // editable={accessToken ? false : true}
                  />

                  <CustomInput
                    iconName="envelope"
                    iconSize={32}
                    value={values.address}
                    label="Address"
                    placeholder="tripoli, abu samra..."
                    onChangeText={handleChange("address")}
                    onBlur={handleBlur("address")}
                    error={touched.address && errors.address}
                    // editable={accessToken ? false : true}
                  />

                  <CustomInput
                    iconName="pencil"
                    iconSize={32}
                    value={values.mobileNumber}
                    label="Mobile Number"
                    placeholder="+961583896"
                    onChangeText={handleChange("mobileNumber")}
                    onBlur={handleBlur("mobileNumber")}
                    error={touched.mobileNumber && errors.mobileNumber}
                    keyboardType="numeric"
                    // editable={accessToken ? false : true}
                  />

                  <CustomInput
                    iconName="tag"
                    iconSize={32}
                    value={values.price}
                    label="Price Per Person"
                    placeholder="$20"
                    onChangeText={handleChange("price")}
                    onBlur={handleBlur("price")}
                    error={touched.price && errors.price}
                    keyboardType="numeric"
                    maxLength={5}
                    // editable={accessToken ? false : true}
                  />

                  <View style={{ width: "90%", height: 250 }}>
                    <Map
                      getLocation={getLocation}
                      style={{ height: "100%", width: "100%" }}
                    />
                  </View>

                  <View
                    style={{
                      // backgroundColor: "red",
                      width: "80%",
                      height: 200,
                      alignItems: "center",
                      marginTop: 20,
                    }}
                  >
                    <Pressable onPress={pickImage}>
                      <Image
                        source={
                          imageSelected
                            ? { uri: imageSelected }
                            : require("../.././constants/images/Roger.jpg")
                        }
                        style={{
                          width: "100%",
                          height: "100%",
                          aspectRatio: 3 / 2.3,
                          resizeMode: "cover",
                        }}
                      />
                    </Pressable>
                  </View>

                  <CustomButton
                    buttonDisabled={buttonDisabled}
                    handleSubmit={handleSubmit}
                    submitting={isSubmitting}
                    label="Complete"
                  />
                </View>
              );
            }}
          </Formik>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "white",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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

  // header: {
  //   height: 200,
  //   justifyContent: "flex-end",
  // },
  // textInputContainerStyle: {
  //   width: width,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   padding: 10,

  //   // backgroundColor: "pink",
  // },
  // buttonTextStyle: {
  //   padding: 7,
  //   borderRadius: 7,
  //   backgroundColor: "white",
  //   alignSelf: "flex-start",
  // },
  // hallNameInput: {
  //   borderColor: "black",
  //   width: "100%",
  //   borderWidth: 3,
  //   borderRadius: 10,
  //   padding: 10,
  // },
  // buttonContainerStyle: {
  //   backgroundColor: "black",

  //   alignSelf: "flex-end",
  //   margin: 10,
  //   padding: 10,
  //   paddingHorizontal: 20,
  //   borderRadius: 10,
  // },
  // backgroundImage: {
  //   flex: 1,
  //   justifyContent: "flex-end",
  //   padding: 20,
  // },
});

export default CompleteHostProfileScreen;
