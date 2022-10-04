import React, { useEffect, useState, useLayoutEffect, useMemo } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import { setHallList } from "../store/actions/HallList";
import { setCurrentLocation } from "./../store/actions/Location";
import { setStatus } from "./../store/actions/HallList";

import HallItem from "./HallItem";
import DefaultText from "./DefaultText";
import Colors from "../constants/Colors";
import CustomHeaderButton from "./HeaderButton";

const HallList = (props) => {
  const { navigation } = props;

  // const [state, dispatchState] = useReducer(reducer, initialState);

  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState([]);
  const [page, setPage] = useState(1);
  const [filterByPrice, setFilterByPrice] = useState(false);

  const [isMoreItemsLoading, setIsMoreItemsLoading] = useState(false);

  const token = useSelector((state) => state.Auth.token);

  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.Auth.userInfo);
  const DUMMY_HALLLIST = useSelector((state) => state.halls.hallList);
  const status = useSelector((state) => state.halls.status);
  // const connectionStatus = useSelector((state) => state.Connection.isConnected);
  // const connectionType = useSelector((state) => state.Connection.type);
  // const isReachable = useSelector(
  //   (state) => state.Connection.isInternetReachable
  // );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title="Save" iconName="reload" onPress={tryAgain} />
        </HeaderButtons>
      ),
    });
  }, []);

  useEffect(() => {
    const loadListAndCurrentLocation = async () => {
      dispatch(setCurrentLocation());
      dispatch(setHallList(page, filters));
    };
    if (status === 100) {
      setLoading(true);
      loadListAndCurrentLocation();
    }
    if (status !== 100) {
      setLoading(false);
    }
  }, [status]);

  const loadMoreItems = () => {
    setIsMoreItemsLoading(true);
    dispatch(setHallList(page + 1, filters));
    setPage((prevPage) => prevPage + 1);
  };

  const addFilter = (filter) => {
    let newFilters;
    if (filters.includes(filter))
      newFilters = filters.filter((fil) => fil !== filter);
    else newFilters = [...filters, filter];

    setFilters(newFilters);
    setPage(1);
  };

  useEffect(() => {
    tryAgain();
  }, [filters]);

  useEffect(() => {
    setIsMoreItemsLoading(false);
  }, [DUMMY_HALLLIST]);

  const isItemFavorite = (id) => {
    if (Object.keys(userInfo).length === 0) return false;
    if (userInfo.favorites.includes(id)) return true;
    return false;
  };

  const tryAgain = () => {
    setPage(1);
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
        <DefaultText style={{ fontWeight: "bold", fontSize: 24 }}>
          There Are no Venues
        </DefaultText>
        <TouchableOpacity onPress={tryAgain}>
          <Ionicons name="reload" size={36} color="black" />
        </TouchableOpacity>
        <Text>Reload</Text>
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      {/* <SearchBar
        round
        placeholder="Type Here..."
        containerStyle={{
          backgroundColor: "white",
          borderWidth: 0,
          paddingVertical: 5,
          borderColor: "white",
        }}
        inputContainerStyle={{
          margin: 5,
          backfaceVisibility: 1,
        }}
      /> */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={DUMMY_HALLLIST}
        renderItem={renderHall}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={tryAgain} />
        }
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.2}
        ListHeaderComponent={() => (
          <View>
            <TouchableOpacity
              style={{ alignSelf: "flex-start" }}
              onPress={() => setFilterByPrice(!filterByPrice)}
            >
              <View
                style={{
                  backgroundColor: filters.length !== 0 ? "green" : "black",
                  padding: 5,
                  marginTop: 5,
                  marginLeft: "5%",
                  borderRadius: 5,
                  marginBottom: 5,
                }}
              >
                <Text style={{ color: "white" }}>
                  {filters.length !== 0 ? "Filtered" : "Filter by Price"}
                </Text>
              </View>
            </TouchableOpacity>
            {filterByPrice && (
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <TouchableOpacity
                  style={{
                    ...styles.filterItem,
                    backgroundColor: filters.includes(1) ? "green" : "black",
                  }}
                  onPress={() => {
                    addFilter(1);
                  }}
                >
                  <DefaultText style={styles.filterTextItem}>
                    $0 - $10
                  </DefaultText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.filterItem,
                    backgroundColor: filters.includes(2) ? "green" : "black",
                  }}
                  onPress={() => {
                    addFilter(2);
                  }}
                >
                  <DefaultText style={styles.filterTextItem}>
                    $10 - $20
                  </DefaultText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.filterItem,
                    backgroundColor: filters.includes(3) ? "green" : "black",
                  }}
                  onPress={() => {
                    addFilter(3);
                  }}
                >
                  <DefaultText style={styles.filterTextItem}>
                    $20 - $30
                  </DefaultText>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />

      {isMoreItemsLoading && (
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  filterItem: {
    backgroundColor: "black",
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 3,
    width: "27%",
    alignItems: "center",
  },
  filterTextItem: {
    fontWeight: "bold",
    color: "white",
  },
  listContainer: {
    flex: 1,
    backgroundColor: "white",
    margin: 0,
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
