import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import DefaultText from "../components/DefaultText";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";

const { width } = Dimensions.get("window");

const HomeScreen = (props) => {
  const { navigation } = props;

  const hallInfo = useSelector((state) => state.Auth.hallInfo);

  const [profileImagePicked, setProfileImagePicked] = useState();
  const [pageNum, setPageNum] = useState(1);

  const scrollRef = useRef();

  const goToName = () => {
    navigation.navigate({
      name: "completeProfile",
    });
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
      setProfileImagePicked(result.uri);
      setHasUnsavedChanges(true);
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

  if (profileImagePicked) {
  }

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
        <TouchableOpacity onPress={pickImage}>
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
      <View style={{ height: 250 }}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0.1}
        >
          <View style={{ width: width, backgroundColor: "green" }}>
            <DefaultText>hello</DefaultText>
          </View>
          <View style={{ width: width, backgroundColor: "pink" }}>
            <DefaultText>Heyy</DefaultText>
          </View>
        </ScrollView>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
          onPress={goToPrevious}
          disabled={pageNum === 1 ? true : false}
        >
          <View
            style={{
              backgroundColor: "red",
              opacity: pageNum === 1 ? 0.4 : 1,
              alignSelf: "flex-end",
              margin: 10,
              padding: 10,
              paddingHorizontal: 20,
              borderRadius: 10,
            }}
          >
            <DefaultText>Previous</DefaultText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={goToNext}
          disabled={pageNum === 2 ? true : false}
        >
          <View
            style={{
              backgroundColor: "red",
              opacity: pageNum === 2 ? 0.4 : 1,
              alignSelf: "flex-end",
              margin: 10,
              padding: 10,
              paddingHorizontal: 20,
              borderRadius: 10,
            }}
          >
            <DefaultText>Next</DefaultText>
          </View>
        </TouchableOpacity>
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
