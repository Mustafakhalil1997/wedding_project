import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  ImageBackground,
} from "react-native";
import DefaultText from "../components/DefaultText";
import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import Map from "./../components/Map";
import { editHall } from "./../store/actions/Auth";
import { showMessage } from "react-native-flash-message";
import { URL } from "./../helpers/url";
import { setCurrentLocation } from "../store/actions/Location";

const { width } = Dimensions.get("window");

const HomeScreen = (props) => {
  const { navigation } = props;

  const dispatch = useDispatch();

  const hallInfo = useSelector((state) => state.Auth.hallInfo);
  console.log("hallInfo ", hallInfo);
  const userInfo = useSelector((state) => state.Auth.userInfo);
  const token = useSelector((state) => state.Auth.token);

  const { id, firstName, lastName, email, password, profileImage } = userInfo;

  const [hallName, setHallName] = useState();
  const [address, setAddress] = useState();
  const [imageSelected, setImageSelected] = useState();
  const [location, setLocation] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const [pageNum, setPageNum] = useState(1);

  const scrollRef = useRef();

  useEffect(() => {
    const loadCurrentLocation = async () => {
      dispatch(setCurrentLocation());
    };
    loadCurrentLocation();
  }, [dispatch]);

  console.log("hallName ", hallName);

  const goToName = () => {
    navigation.navigate({
      name: "completeProfile",
    });
  };

  const getLocation = (location) => {
    setLocation(location);
    console.log("location ", location);
  };

  const hallNameChange = (value) => {
    setHallName(value);
  };

  const addressChange = (value) => {
    setAddress(value);
  };

  const mobileNumberChange = (value) => {
    setMobileNumber(value);
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
    console.log("result ", result);
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

  const goToNext = () => {
    const newPageNum = pageNum + 1;
    setPageNum(newPageNum);
    scrollRef.current.scrollTo({
      x: 360 * (newPageNum - 1),
      animated: true,
    });
  };

  const goToPrevious = () => {
    const newPageNum = pageNum - 1;
    setPageNum(newPageNum);
    scrollRef.current.scrollTo({
      x: 360 * (newPageNum - 1),
      animated: true,
    });
  };

  const submitValues = async () => {
    try {
      // add hall

      // hallName, address, imageSelected, location

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
      };

      console.log("sending request");

      const response = await fetch(`${URL}/api/hall/createHall`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + token,
        },
        body: JSON.stringify(newHall),
      });

      console.log("request sent");

      const responseData = await response.json();
      const newHallInfo = responseData.hall;
      console.log("newHallInfo ", newHallInfo);
      // to be saved inside the store

      if (response.status === 200) {
        dispatch(editHall(newHallInfo));
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
      const resData = await res.json();
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

  // if (imageSelected) {
  // }

  if (hallInfo) {
    return (
      <View>
        <DefaultText>Welcome.. You already have a hall</DefaultText>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <View style={styles.header}>
        <ImageBackground
          source={require("../constants/images/Roger.jpg")}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          <TouchableOpacity onPress={goToName}>
            <View style={styles.buttonTextStyle}>
              <DefaultText styles={{ fontFamily: "open-sans-bold" }}>
                COMPLETE YOUR PROFILE
              </DefaultText>
            </View>
          </TouchableOpacity>
        </ImageBackground>

        {/* <ImageBrowser
          max={4}
          onChange={(num, onSubmit) => {}}
          callback={(callback) => {}}
        /> */}
      </View>
      <View style={{ height: 250 }}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  header: {
    height: 250,
    justifyContent: "flex-end",
  },
  buttonTextStyle: {
    padding: 7,
    borderRadius: 7,
    backgroundColor: "white",
    alignSelf: "flex-start",
  },
  hallNameInput: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
  },
});

export default HomeScreen;
