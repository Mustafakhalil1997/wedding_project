import { BackHandler } from "react-native";

const customBackHandler = (props) => {
  const { navigation, isSubmitting } = props;

  const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
    if (isSubmitting) return true;
  });

  if (isSubmitting) {
    navigation.setOptions({
      gestureEnabled: false,
    });
  }

  if (!isSubmitting) {
    navigation.setOptions({
      gestureEnabled: true,
    });
  }

  return backHandler;
};

export default customBackHandler;
