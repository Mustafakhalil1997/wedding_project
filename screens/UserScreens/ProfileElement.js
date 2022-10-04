import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import { SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import DefaultText from "../../components/DefaultText";

const ProfileElement = (props) => {
  const { iconName, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.rowContainer}>
        <View style={styles.firstHalf}>
          <Ionicons name={iconName} size={32} />
          <DefaultText styles={{ fontSize: 16, marginLeft: 10 }}>
            {props.children}
          </DefaultText>
        </View>
        <SimpleLineIcons name="arrow-right" size={18} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.4,
    paddingVertical: 15,
    marginBottom: 15,
    borderBottomColor: "gray",
  },
  firstHalf: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ProfileElement;
