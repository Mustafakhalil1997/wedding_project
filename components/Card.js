import React from "react";
import { StyleSheet, View } from "react-native";

const Card = (props) => {
  return (
    <View style={{ ...styles.itemContainer, ...props.styles }}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 5,

    alignItems: "center",
    // borderRadius: 10,
    height: 350,
    overflow: "hidden",
  },
});

export default Card;
