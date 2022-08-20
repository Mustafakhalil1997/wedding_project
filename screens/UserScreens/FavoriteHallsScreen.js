import React from "react";
import HallList from "../../components/HallList";
import FavoriteHallList from "../../components/FavoriteHallList";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const FavoriteHallsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: insets.top,
      }}
      edges={["left", "right"]}
    >
      <FavoriteHallList navigation={navigation} />
    </SafeAreaView>
  );
  return <HallList favorite favoriteNavigation={navigation} />;
};

export default FavoriteHallsScreen;
