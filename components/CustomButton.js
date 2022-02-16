import React from "react";
import { View, StyleSheet, TouchableNativeFeedback, Text } from "react-native";
import Colors from "../constants/Colors";

const CustomButton = (props) => {
  const { buttonDisabled, handleSubmit, label } = props;

  return (
    <TouchableNativeFeedback
      disabled={buttonDisabled}
      onPress={handleSubmit}
      background={TouchableNativeFeedback.Ripple("white", false)}
    >
      <View
        style={
          buttonDisabled
            ? { ...styles.buttonContainer, opacity: 0.4 }
            : styles.buttonContainer
        }
      >
        <Text>{label}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
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
});

export default CustomButton;
