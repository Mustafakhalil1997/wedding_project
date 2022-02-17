import React, { useState } from "react";
import { View, Image, ScrollView, Dimensions, Text } from "react-native";

let { width } = Dimensions.get("window");
// const height = (width * 100) / 60; //60%

const ImageSlider = (props) => {
  const { images, styles, dot } = props;

  const [imageNumber, setImageNumber] = useState(1);

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <ScrollView
        pagingEnabled
        horizontal
        // scrollEventThrottle={changeNumber}
        // onScrollEndDrag={changeNumber}
        // showsHorizontalScrollIndicator={false}
        style={{ width: "100%", height: "100%" }}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={image}
            style={{
              resizeMode: "cover",
              width: width,
              aspectRatio: 1.3,
            }}
          />
        ))}
      </ScrollView>
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

export default ImageSlider;
