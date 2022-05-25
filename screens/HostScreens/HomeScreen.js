import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  ImageBackground,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { editHall } from "../../store/actions/Auth";
import { showMessage } from "react-native-flash-message";
import { URL } from "../../helpers/url";
import { setCurrentLocation } from "../../store/actions/Location";
import DefaultText from "../../components/DefaultText";

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

  useEffect(() => {
    const loadCurrentLocation = async () => {
      dispatch(setCurrentLocation());
    };
    loadCurrentLocation();
  }, [dispatch]);

  console.log("hallName ", hallName);

  const goToCompleteProfile = () => {
    navigation.navigate({
      name: "completeProfile",
    });
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
          source={require("../.././constants/images/Roger.jpg")}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          <TouchableOpacity onPress={goToCompleteProfile}>
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
