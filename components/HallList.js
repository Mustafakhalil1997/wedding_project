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
  const { navigation } = props;

  const [state, dispatchState] = useReducer(reducer, initialState);

  const token = useSelector((state) => state.Auth.token);
  console.log("the token is ", token);

  const dispatch = useDispatch();

  useEffect(() => {
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
  let DUMMY_HALLLIST;

  // let usedList = DUMMY_HALLLIST;

  const userInfo = useSelector((state) => state.Auth.userInfo);
  console.log("userInfo in hallList ", userInfo);
  DUMMY_HALLLIST = useSelector((state) => state.halls.hallList);
  console.log("DUMMY LISTT ", DUMMY_HALLLIST);
  // const allList = useSelector((state) => state.halls.hallList);

  const isItemFavorite = (id) => {
    console.log("isItemFavoite userInfo ", userInfo);
    if (Object.keys(userInfo).length === 0) return false;
    if (userInfo.favorites.includes(id)) return true;
    return false;
  };

  // if (state.mockList !== DUMMY_HALLLIST && DUMMY_HALLLIST.length !== 0) {
  //   console.log("hereee");
  //   console.log("state.list ", state.mockList);
  //   console.log("DUMMY_HALLLIST ", DUMMY_HALLLIST);
  //   dispatchState({ type: "setList", list: DUMMY_HALLLIST });
  // }

  // if (DUMMY_HALLLIST.length === 0) {
  //   return (
  //     <View style={styles.noFavorites}>
  //       <DefaultText styles={styles.noFavoritesText}>
  //         You have no favorites.
  //       </DefaultText>
  //       <DefaultText>Why not add one?</DefaultText>
  //     </View>
  //   );
  // }

  const renderHall = (itemData) => {
    const { item } = itemData;
    const { id } = item;
    const isFavorite = isItemFavorite(id);
    // const isFavorite = false;
    return (
      <HallItem isFavorite={isFavorite} item={item} navigation={navigation} />
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
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  noFavoritesText: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
  },
});

export default HallList;
