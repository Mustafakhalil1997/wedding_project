import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import HallItem from "./HallItem";

const DUMMY_HALLLIST = [
  {
    id: "h1",
    name: "North Hall",
    email: "NorthHall@gmail.com",
    number: "79126550",
    images: [
      "beautiful-photozone-with-big-wreath-decorated-with-greenery-roses-centerpiece-candles-sides-garland-hanged-trees_8353-11019.jpg",
      "beautiful-photozone-with-big-wreath-decorated-with-greenery-roses-centerpiece-candles-sides-garland-hanged-trees_8353-11019.jpg",
    ],
  },
  {
    id: "h1",
    name: "North Hall",
    email: "NorthHall@gmail.com",
    number: "79126550",
    images: [
      "./constants/images/beautiful-photozone-with-big-wreath-decorated-with-greenery-roses-centerpiece-candles-sides-garland-hanged-trees_8353-11019.jpg",
      "./constants/images/beautiful-photozone-with-big-wreath-decorated-with-greenery-roses-centerpiece-candles-sides-garland-hanged-trees_8353-11019.jpg",
    ],
  },
  {
    id: "h1",
    name: "North Hall",
    email: "NorthHall@gmail.com",
    number: "79126550",
    images: [
      "./constants/images/beautiful-photozone-with-big-wreath-decorated-with-greenery-roses-centerpiece-candles-sides-garland-hanged-trees_8353-11019.jpg",
      "./constants/images/beautiful-photozone-with-big-wreath-decorated-with-greenery-roses-centerpiece-candles-sides-garland-hanged-trees_8353-11019.jpg",
    ],
  },
];

const HallList = (props) => {
  console.log("HallList");
  const { navigation } = props;

  const renderHall = (itemData) => {
    const { item } = itemData;
    return <HallItem item={item} navigation={navigation} />;
  };

  return (
    <View style={styles.listContainer}>
      <FlatList data={DUMMY_HALLLIST} renderItem={renderHall} />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
});

export default HallList;
