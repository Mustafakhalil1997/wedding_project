import React from "react";
import { View, StyleSheet } from "react-native";
import DefaultText from "../components/DefaultText";

const ChatScreen = (props) => {
  return (
    <View style={styles.screenContainer}>
      <DefaultText
        styles={{
          fontSize: 18,
          fontFamily: "open-sans-bold",
          marginBottom: 10,
        }}
      >
        No new messages
      </DefaultText>
      <DefaultText>When you have a message, it will appear here</DefaultText>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default ChatScreen;
