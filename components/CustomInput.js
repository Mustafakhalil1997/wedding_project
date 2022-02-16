import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

import { EvilIcons } from "@expo/vector-icons";

const CustomInput = (props) => {
  const {
    iconName,
    iconSize,
    value,
    secureTextEntry,
    label,
    placeholder,
    onChangeText,
    error,
  } = props;

  return (
    <View style={styles.inputLabelContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <Text style={{ fontFamily: "open-sans-bold" }}>{label}</Text>
        {error && <Text style={{ color: "red", fontSize: 16 }}>{error}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <EvilIcons name={iconName} size={iconSize} />
        <View style={styles.input}>
          <TextInput
            {...props}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            autoCapitalize="none"
            placeholder={placeholder}
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
    borderBottomColor: "gray",
    paddingVertical: 10,
    alignItems: "center",
  },

  input: {
    width: "80%",
    paddingHorizontal: 5,
  },
});

export default CustomInput;
