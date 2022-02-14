import React from "react";
import { StyleSheet, Text } from "react-native";

const DefaultText = (props) => {
  return (
    <Text style={{ ...styles.text, ...props.styles }}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans",
    fontSize: 14,
    margin: 0,
  },
});

export default DefaultText;
