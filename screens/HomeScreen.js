import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import DefaultText from "../components/DefaultText";
import { useSelector } from "react-redux";

// import * as ImagePicker from "expo-image-picker";
// import ImagePicker from "react-native-image-crop-picker";

const HomeScreen = (props) => {
  const { navigation } = props;

  const hallInfo = useSelector((state) => state.Auth.hallInfo);

  console.log("hallInfoo ", hallInfo);

  const [profileImagePicked, setProfileImagePicked] = useState();

  const goToName = () => {
    navigation.navigate({
      name: "completeProfile",
    });
  };

  const pickImages = async () => {
    // const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // if (status !== "granted") {
    //   Alert.alert(
    //     "Permission denied",
    //     "Allow access to camera in your settings"
    //   );
    // }
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 4],
    //   // base64: true,
    //   // quality: 1,
    //   allowsMultipleSelection: true,
    // });
    // console.log("result ", result);
    // if (!result.cancelled) {
    //   // const imageSize = result.base64.length * (3 / 4) - 2;
    //   // console.log("imageSize ", imageSize);
    //   // if (imageSize > 1000000) {
    //   //   console.log("Big Image");
    //   // }
    //   setProfileImagePicked(result.uri);
    //   // setHasUnsavedChanges(true);
    // }
  };

  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goToName}>
          <View style={styles.buttonTextStyle}>
            <DefaultText styles={{ fontFamily: "open-sans-bold" }}>
              COMPLETE YOUR PROFILE
            </DefaultText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImages}>
          <View style={styles.buttonTextStyle}>
            <DefaultText styles={{ fontFamily: "open-sans-bold" }}>
              Pick images
            </DefaultText>
          </View>
        </TouchableOpacity>
        {/* <ImageBrowser
          max={4}
          onChange={(num, onSubmit) => {}}
          callback={(callback) => {}}
        /> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  header: {
    backgroundColor: "black",
    height: 250,
    justifyContent: "flex-end",
    padding: 30,
  },
  buttonTextStyle: {
    padding: 7,
    borderRadius: 7,
    backgroundColor: "white",
    alignSelf: "flex-start",
  },
});

export default HomeScreen;
