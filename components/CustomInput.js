import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { EvilIcons, Ionicons } from "@expo/vector-icons";
import DefaultText from "./DefaultText";

const CustomInput = (props) => {
  const { iconName, iconSize, label, error, type, secureTextEntry } = props;

  const [togglePass, setTogglePass] = useState(true);

  const toggleShowPassword = () => {
    setTogglePass((prevState) => !prevState);
  };

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
          style={{ flex: 1 }}
        />
        <View style={styles.input}>
          <TextInput
            {...props}
            style={{ flex: 1 }}
            secureTextEntry={secureTextEntry ? togglePass : false}
          />
          {type && (
            <TouchableOpacity onPress={toggleShowPassword}>
              <DefaultText
                styles={{ marginRight: 10, fontFamily: "open-sans-bold" }}
              >
                {togglePass ? "Show" : "Hide"}
              </DefaultText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputLabelContainer: {
    marginVertical: 10,
    width: "90%",
  },

  inputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },

  input: {
    flex: 9,
    // width: "80%",
    // paddingHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default CustomInput;
