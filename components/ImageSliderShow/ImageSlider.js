import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  ScrollView,
  Dimensions,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// let { width } = Dimensions.get("window");
// const height = (width * 100) / 60; //60%

const ImageSlider = (props) => {
  const { images, newStyles, dot } = props;

  const [imageNumber, setImageNumber] = useState(1);

  const [dimensions, setDimensions] = useState(0);

  const [isFavorite, setIsFavorite] = useState(false);

  const ref = useRef(null);

  const onLayout = (event) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    console.log(x, y, width, height);
    setDimensions({ width: width, height: height });
  };

  const favoriteIconClickHandler = () => {
    setIsFavorite((preVal) => !preVal);
  };

  const source = "img/tiny_logo.png";

  return (
    // <View style={{ width: "100%", height: "100%" }}>
    <View
      style={{ flex: 1, backgroundColor: "red" }}
      ref={ref}
      onLayout={onLayout}
    >
      <ScrollView
        pagingEnabled
        horizontal
        // scrollEventThrottle={changeNumber}
        // onScrollEndDrag={changeNumber}
        showsHorizontalScrollIndicator={false}
        // style={{ width: "100%", height: "100%" }}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={image}
            style={{
              ...styles.image,
              width: dimensions.width,
              height: dimensions.height,
              aspectRatio: dot ? 2 / 1.8 : 3 / 2.3,
              ...newStyles,
            }}
          />
        ))}
        <Image
          source={{
            uri: `https://reactnative.dev/${source}`,
          }}
          style={{
            ...styles.image,

            width: dimensions.width,
            height: dimensions.height,
            aspectRatio: dot ? 2 / 1.8 : 3 / 2.3,
            ...newStyles,
          }}
        />
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          top: 5,
          right: 5,
          // alignSelf: "flex-end",
        }}
      >
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={35}
          color="white"
          onPress={favoriteIconClickHandler}
        />
      </View>
      {dot && (
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            bottom: 0,
            alignSelf: "center",
          }}
        >
          <Text style={{ color: "white" }}>⬤</Text>
        </View>
      )}
      {!!!dot && (
        <View style={{ position: "absolute", bottom: 4, right: 15 }}>
          <Text style={{ fontSize: 20, color: "white" }}>{imageNumber}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: "cover",
  },
});

export default ImageSlider;
