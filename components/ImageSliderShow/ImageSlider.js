import React, { useRef, useState } from "react";
import { View, Image, ScrollView, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "./../../store/actions/HallList";
import { addFavorite } from "./../../store/actions/Auth";
import { showMessage } from "react-native-flash-message";
import { URL } from "./../../helpers/url";

// let { width } = Dimensions.get("window");
// const height = (width * 100) / 60; //60%

const ImageSlider = (props) => {
  const { images, newStyles, dot, hallId, isFavorite, scrollEnabled } = props;

  const [imageNumber, setImageNumber] = useState(1);

  const [dimensions, setDimensions] = useState(0);

  // console.log("images in imageSlider ", images);

  const ref = useRef(null);

  const scrollRef = useRef();

  const token = useSelector((state) => state.Auth.token);
  const userInfo = useSelector((state) => state.Auth.userInfo);
  const userId = userInfo.id;

  // const goToNext = () => {
  //   scrollRef.current.scrollTo({
  //     x: 360,
  //     animated: true,
  //   });
  // };

  const dispatch = useDispatch();

  const onLayout = (event) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    console.log(x, y, width, height);
    setDimensions({ width: width, height: height });
  };

  // console.log("dimensions in imageSlider ", dimensions);

  const favoriteIconClickHandler = async () => {
    if (token) {
      const requestBody = {
        hallId,
        userId,
      };

      try {
        const response = await fetch(`${URL}/api/user/addFavorite`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(requestBody),
        });
        const responseData = await response.json();
        // console.log("responseData in imageSlider ", responseData);
      } catch (err) {
        console.log("error ", err);
      }

      dispatch(toggleFavorite(hallId));
      dispatch(addFavorite(hallId));
      return;
    }
    showMessage({
      message: "To add favorites, sign in!",
      type: "success",
      style: { backgroundColor: "black" },
    });
  };

  const source = "img/tiny_logo.png";

  const scrollingHandler = (event) => {
    console.log(event.nativeEvent.contentOffset.x);
    const offset = event.nativeEvent.contentOffset.x;
    const pageNum = parseInt(offset / 360);
    setImageNumber(pageNum + 1);
  };

  return (
    <View
      style={{ width: "100%", height: "100%" }}
      ref={ref}
      onLayout={onLayout}
    >
      <ScrollView
        ref={scrollRef}
        pagingEnabled
        horizontal
        // scrollEnabled={scrollEnabled}
        onMomentumScrollEnd={scrollingHandler}
        // scrollEventThrottle={changeNumber}
        // onScrollEndDrag={changeNumber}
        showsHorizontalScrollIndicator={false}
      >
        {images.map((image, index) => (
          <View
            key={index}
            style={{
              width: dimensions.width,
              height: dimensions.height,
            }}
          >
            <Image
              source={{ uri: image }}
              style={{
                ...styles.image,
                width: dimensions.width,
                height: dimensions.height,
                aspectRatio: dot ? 2 / 2 : 2 / 2,
                ...newStyles,
              }}
            />
          </View>
        ))}
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
      {/* <View style={{ position: "absolute", bottom: 4, left: 15 }}>
        <TouchableOpacity onPress={goToNext}>
          <Text style={{ fontSize: 20, color: "white" }}>Next</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: "cover",
  },
});

export default ImageSlider;
