import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

import { EvilIcons } from "@expo/vector-icons";

const CustomInput = (props) => {
  const { iconName, iconSize, label, error } = props;

  return (
    <View style={styles.inputLabelContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <Text style={{ fontFamily: "open-sans-bold", color: "gray" }}>
          {label}
        </Text>
        {error && <Text style={{ color: "red", fontSize: 14 }}>{error}</Text>}
      </View>

      <View
        style={[styles.inputContainer, error ? { borderColor: "red" } : null]}
      >
        <EvilIcons
          name={iconName}
          size={iconSize}
          color={error ? "red" : "black"}
        />
        <View style={styles.input}>
          <TextInput
            {...props}
            // value={value}
            // onChangeText={onChangeText}
            // secureTextEntry={secureTextEntry}
            // placeholder={placeholder}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputLabelContainer: {
    marginVertical: 10,
  },

  inputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },

  input: {
    width: "80%",
    paddingHorizontal: 5,
  },
});

export default CustomInput;
