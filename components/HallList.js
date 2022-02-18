import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import HallItem from "./HallItem";

const DUMMY_HALLLIST = [
  {
    id: "h1",
    name: "North Hall",
    email: "NorthHall@gmail.com",
    number: "79126550",
    location: {
      lat: 34.431093869627254,
      lng: 35.8377506411768,
    },
    images: [
      "beautiful-photozone-with-big-wreath-decorated-with-greenery-roses-centerpiece-candles-sides-garland-hanged-trees_8353-11019.jpg",
      "beautiful-photozone-with-big-wreath-decorated-with-greenery-roses-centerpiece-candles-sides-garland-hanged-trees_8353-11019.jpg",
    ],
  },
  {
    id: "h2",
    name: "West hall",
    email: "NorthHall@gmail.com",
    number: "79126550",
    location: {
      lat: 34.15550968858545,
      lng: 35.64338541736089,
    },
    images: [
      "./constants/images/beautiful-photozone-with-big-wreath-decorated-with-greenery-roses-centerpiece-candles-sides-garland-hanged-trees_8353-11019.jpg",
      "./constants/images/beautiful-photozone-with-big-wreath-decorated-with-greenery-roses-centerpiece-candles-sides-garland-hanged-trees_8353-11019.jpg",
    ],
  },
  {
    id: "h3",
    name: "South Hall",
    email: "NorthHall@gmail.com",
    number: "79126550",
    location: {
      lat: 39.92801442507861,
      lng: 32.83767491273409,
    },
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
