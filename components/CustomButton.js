import React, { forwardRef } from "react";
import {
  View,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Text,
  Platform,
  ActivityIndicator,
} from "react-native";
import Colors from "../constants/Colors";

let TouchableComponent = TouchableOpacity;
let android = false;
if (Platform.OS === "android") {
  TouchableComponent = TouchableNativeFeedback;
  android = true;
}

const CustomButton = React.forwardRef((props, ref) => {
  const { buttonDisabled, handleSubmit, label, submitting } = props;

  const opacity = submitting || buttonDisabled ? 0.4 : 1;

  let rippleColor = null;
  if (props.style && props.style.backgroundColor !== "black") {
    rippleColor = "black";
  }

  return (
    <View style={[styles.buttonContainer, { opacity }]}>
      <TouchableComponent
        ref={ref}
        {...props}
        disabled={buttonDisabled}
        onPress={handleSubmit}
        style={{
          borderRadius: 15,
          overflow: "hidden",
          flex: 1,
          // backgroundColor: "green",
        }}
        background={
          rippleColor
            ? TouchableNativeFeedback.Ripple(rippleColor, false)
            : TouchableNativeFeedback.Ripple("white", false)
        }
        //   background={TouchableNativeFeedback.Ripple("white", false)}
      >
        <View
          style={{
            padding: 15,
            alignItems: "center",
            borderRadius: 15,
            backgroundColor: "#000000",
            ...props.style,
          }}
        >
          {submitting && <ActivityIndicator size={20} color="#0000ff" />}
          {!submitting && <Text style={{ color: "white" }}>{label}</Text>}
        </View>
      </TouchableComponent>
    </View>
  );
});

const styles = StyleSheet.create({
  buttonContainer: {
    width: "80%",
    marginTop: 20,
    borderRadius: 15,
    overflow: "hidden",
    alignSelf: "center",
    // alignItems: "center",
  },
  button: {
    borderRadius: 10,
  },
});

export default CustomButton;
