import { showMessage } from "react-native-flash-message";

export const connectionMessage = (message) => {
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
