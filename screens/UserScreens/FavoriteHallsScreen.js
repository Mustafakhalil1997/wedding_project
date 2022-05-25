import React from "react";
import HallList from "../../components/HallList";
import FavoriteHallList from "../../components/FavoriteHallList";

const FavoriteHallsScreen = ({ navigation }) => {
  return <FavoriteHallList navigation={navigation} />;
  return <HallList favorite favoriteNavigation={navigation} />;
};

export default FavoriteHallsScreen;
