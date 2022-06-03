import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";

const customBackArrow = (props) => {
  const { navigation, isSubmitting, style, onPress } = props;

  return navigation.setOptions({
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Save"
          iconName="arrow-back"
          onPress={
            onPress
              ? onPress
              : () => {
                  if (!isSubmitting) {
                    navigation.goBack(null);
                  }
                }
          }
          style={[{ opacity: isSubmitting ? 0.3 : 1 }, style]}
        />
      </HeaderButtons>
    ),
  });
};

export default customBackArrow;
