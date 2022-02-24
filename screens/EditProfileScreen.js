import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Avatar } from "react-native-paper";
import { ImageResolvedAssetSource } from "react-native";

const EditProfileScreen = (props) => {
  // save button should be on header right

  //   Image.getSize("../constants/images/Me.jpeg", imageSize);

  return (
    <ScrollView style={styles.screenContainer}>
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
    </ScrollView>
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
});

export default EditProfileScreen;
