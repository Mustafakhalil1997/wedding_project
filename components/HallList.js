import React, { useEffect, useReducer, useState, useLayoutEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setHallList } from "../store/actions/HallList";
import HallItem from "./HallItem";
import { setCurrentLocation } from "./../store/actions/Location";
import Colors from "../constants/Colors";
import DefaultText from "./DefaultText";
import { Ionicons } from "@expo/vector-icons";
import { setStatus } from "./../store/actions/HallList";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "./HeaderButton";

// const initialState = { mockList: [], loading: false };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "setList":
//       return {
//         ...state,
//         mockList: action.list,
//         loading: false,
//       };
//     case "setLoading":
//       return {
//         ...state,
//         loading: action.loading,
//       };
//     default:
//       return state;
//   }
// };

const HallList = (props) => {
  const { navigation } = props;

  // const [state, dispatchState] = useReducer(reducer, initialState);

  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.Auth.token);

  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.Auth.userInfo);
  const DUMMY_HALLLIST = useSelector((state) => state.halls.hallList);
  const status = useSelector((state) => state.halls.status);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        //   <Text>Save</Text>

        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title="Save" iconName="reload" onPress={tryAgain} />
        </HeaderButtons>
      ),
    });
  });

  useEffect(() => {
    const loadListAndCurrentLocation = async () => {
      dispatch(setCurrentLocation());
      dispatch(setHallList());
    };
    if (status === 100) {
      setLoading(true);
      // dispatchState({ type: "setLoading", loading: true });
      loadListAndCurrentLocation();
    }
  }, [dispatch, status]);

  useEffect(() => {
    console.log("status ", status);
    if (status !== 100) {
      setLoading(false);
      // dispatchState({ type: "setLoading", loading: false });
    }
  }, [status]);

  // let usedList = DUMMY_HALLLIST;

  const isItemFavorite = (id) => {
    if (Object.keys(userInfo).length === 0) return false;
    if (userInfo.favorites.includes(id)) return true;
    return false;
  };

  const tryAgain = () => {
    dispatch(setStatus(100));
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

  if (loading) {
    return (
      <View
        style={[
          styles.listContainer,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={Colors.primaryColor} />
        <Text>Loading</Text>
      </View>
    );
  }

  if (status === 500) {
    return (
      <View
        style={[
          styles.listContainer,
          { alignItems: "center", justifyContent: "center" },
        ]}
      >
        <TouchableOpacity onPress={tryAgain}>
          <Ionicons name="reload" size={36} color="black" />
        </TouchableOpacity>
        <Text>Reload</Text>
      </View>
    );
  }

  if (DUMMY_HALLLIST.length === 0) {
    return (
      <View
        style={[
          styles.listContainer,
          {
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <DefaultText>There Are no Venues</DefaultText>
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={DUMMY_HALLLIST}
        renderItem={renderHall}
      />
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
