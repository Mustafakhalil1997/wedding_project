import { showMessage } from "react-native-flash-message";

export const connectionMessage = (message) => {
  console.log("showing message");
  return showMessage({
    message: message,
    color: "white",
    backgroundColor: "red",
    type: "default",
    style: {
      borderRadius: 10,
    },
  });
};
