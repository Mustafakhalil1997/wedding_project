import React, { useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import { cloudinaryURL } from "./../helpers/cloudinaryURL";

const { width } = Dimensions.get("window");

const HallImage = (props) => {
  const { image, onImageLongPressed, index } = props;

  const [selected, setSelected] = useState(false);

  const imageUri = cloudinaryURL + image;

  console.log("selected ", selected);

  const onLongPressHandler = () => {
    setSelected(true);
    onImageLongPressed(true);
  };

  const onPressHandler = () => {
    setSelected(false);
    onImageLongPressed(false);
  };

  return (
    <View style={[styles.imageContainer, selected && styles.imageSelected]}>
      <TouchableWithoutFeedback
        onLongPress={() => {
          onLongPressHandler();
        }}
        onPress={onPressHandler}
      >
        <Image source={{ uri: imageUri }} style={styles.image} />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: width / 2,
    height: width / 2,
    borderWidth: 0.5,
    borderColor: "gray",
  },
  imageSelected: {
    borderWidth: 3,
    borderColor: "white",
    opacity: 0.5,
  },
  image: {
    width: "100%",
    height: "100%",
    aspectRatio: 2 / 2,
  },
});

export default HallImage;
