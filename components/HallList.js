import React, { useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setHallList } from "../store/actions/HallList";
import HallItem from "./HallItem";

const HallList = (props) => {
  const { navigation } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHallList());
  });

  const DUMMY_HALLLIST = useSelector((state) => state.halls.hallList);

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
