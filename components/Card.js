import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";

let { width } = Dimensions.get("window");

const Card = (props) => {
  return (
    <View style={{ ...styles.itemContainer, ...props.styles }}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    margin: 5,
    // flex: 1,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 5,
    alignItems: "center",
    height: width + 5,
    overflow: "hidden",
  },
});

export default Card;
