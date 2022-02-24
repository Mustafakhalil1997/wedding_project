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
import DefaultText from "./DefaultText";

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

  const dispatch = useDispatch();
  let DUMMY_HALLLIST;

  if (favorite) {
    DUMMY_HALLLIST = useSelector((state) => state.halls.favoritesList);
  } else {
    DUMMY_HALLLIST = useSelector((state) => state.halls.hallList);
  }

  const [state, dispatchState] = useReducer(reducer, initialState);

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

  if (DUMMY_HALLLIST.length === 0) {
    return (
      <View style={styles.noFavorites}>
        <DefaultText styles={styles.noFavoritesText}>
          You have no favorites.
        </DefaultText>
        <DefaultText>Why not add one?</DefaultText>
      </View>
    );
  }

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
    backgroundColor: "white",
  },
  noFavorites: {
    margin: 10,
  },
  noFavoritesText: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
  },
});

export default HallList;
