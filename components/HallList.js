import React, { useEffect, useReducer, useState } from "react";
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

const initialState = { mockList: [], loading: false };

const reducer = (state, action) => {
  switch (action.type) {
    case "setList":
      return {
        ...state,
        mockList: action.list,
        loading: false,
      };
    case "setLoading":
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};

const HallList = (props) => {
  const { navigation, favorite, favoriteNavigation } = props;

  let DUMMY_HALLLIST;

  if (favorite) {
    DUMMY_HALLLIST = useSelector((state) => state.halls.favoritesList);
  } else {
    console.log("hreeeeee");
    DUMMY_HALLLIST = useSelector((state) => state.halls.hallList);
  }

  console.log("updatedddddd ", favorite);

  const [state, dispatchState] = useReducer(reducer, initialState);
  console.log("state.loading ", state.loading);

  const dispatch = useDispatch();

  console.log("rendering");

  if (state.list !== DUMMY_HALLLIST) {
    dispatch({ type: "setList", list: DUMMY_HALLLIST });
  }

  useEffect(() => {
    console.log("this is useEffect");
    setTimeout(() => {
      dispatchState({ type: "setLoading", loading: false });
    }, 1000);
  }, [state.list]);

  useEffect(() => {
    const loadCurrentLocation = async () => {
      dispatch(setCurrentLocation());
      dispatch(setHallList());
    };
    dispatchState({ type: "setLoading", loading: true });
    loadCurrentLocation();
  }, [dispatch]);

  const renderHall = (itemData) => {
    const { item } = itemData;
    return (
      <HallItem
        item={item}
        navigation={navigation}
        favoriteNavigation={favoriteNavigation}
      />
    );
  };

  if (state.loading) {
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
