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
import { SafeAreaView } from "react-native-safe-area-context";

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

const FavoriteHallList = (props) => {
  const { navigation } = props;

  const [state, dispatchState] = useReducer(reducer, initialState);

  const token = useSelector((state) => state.Auth.token);

  useEffect(() => {
    setTimeout(() => {
      dispatchState({ type: "setLoading", loading: false });
    }, 1000);
  }, [state.list]);

  const userInfo = useSelector((state) => state.Auth.userInfo);
  const hallList = useSelector((state) => state.halls.hallList);

  let DUMMY_HALLLIST;

  if (Object.keys(userInfo).length === 0) {
    DUMMY_HALLLIST = [];
  } else {
    const favoritesIds = userInfo.favorites;
    const favoritesList = hallList.filter((h) => favoritesIds.includes(h.id));
    DUMMY_HALLLIST = favoritesList;
    // DUMMY_HALLLIST = useSelector((state) => state.halls.favoritesList);
  }

  const isItemFavorite = (id) => {
    if (Object.keys(userInfo).length === 0) return false;
    if (userInfo.favorites.includes(id)) return true;
    return false;
  };

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

  const goToLogin = () => {
    navigation.navigate({ name: "Auth" });
  };

  if (!token) {
    return (
      <View style={styles.noFavorites}>
        <DefaultText styles={styles.noFavoritesText}>
          Login to see your favorites
        </DefaultText>
        <DefaultText onPress={goToLogin} styles={{ color: "blue" }}>
          Go to Login
        </DefaultText>
      </View>
    );
  }

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

export default FavoriteHallList;
