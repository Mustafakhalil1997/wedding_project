import React from "react";
import HallList from "../components/HallList";

const FavoriteHallsScreen = ({ navigation }) => {
  return <HallList favorite favoriteNavigation={navigation} />;
};

export default FavoriteHallsScreen;
