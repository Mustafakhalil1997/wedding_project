import React from "react";
import HallList from "../../components/HallList";
import FavoriteHallList from "../../components/FavoriteHallList";
import { SafeAreaView } from "react-native-safe-area-context";

const FavoriteHallsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <FavoriteHallList navigation={navigation} />
    </SafeAreaView>
  );
  return <HallList favorite favoriteNavigation={navigation} />;
};

export default FavoriteHallsScreen;
