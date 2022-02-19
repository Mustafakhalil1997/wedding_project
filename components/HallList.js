import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setHallList } from "../store/actions/HallList";
import HallItem from "./HallItem";
import { setCurrentLocation } from "./../store/actions/Location";
import Colors from "../constants/Colors";

const HallList = (props) => {
  const { navigation } = props;

  const DUMMY_HALLLIST = useSelector((state) => state.halls.hallList);

  const [loading, setLoading] = useState(false);
  const [mockList, setMockList] = useState(DUMMY_HALLLIST);

  const dispatch = useDispatch();

  console.log("loading ", loading);

  console.log("rendering");

  useEffect(() => {
    if (mockList !== DUMMY_HALLLIST) {
      setMockList(DUMMY_HALLLIST);
      // timeout is for testing
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [DUMMY_HALLLIST, setMockList]);

  useEffect(() => {
    setLoading(true);
    const loadCurrentLocation = async () => {
      dispatch(setCurrentLocation());
      dispatch(setHallList());
    };
    loadCurrentLocation();
  }, [dispatch]);

  const renderHall = (itemData) => {
    const { item } = itemData;
    return <HallItem item={item} navigation={navigation} />;
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
        <Text>Loading</Text>
      </View>
    );
  }

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
