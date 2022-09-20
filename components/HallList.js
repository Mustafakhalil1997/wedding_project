import React, {
  useEffect,
  useReducer,
  useState,
  useLayoutEffect,
  useCallback,
  useMemo,
} from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  StatusBar,
  RefreshControl,
  TouchableNativeFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import NetInfo from "@react-native-community/netinfo";

import { setHallList } from "../store/actions/HallList";
import { setCurrentLocation } from "./../store/actions/Location";
import { setStatus } from "./../store/actions/HallList";

import HallItem from "./HallItem";
import DefaultText from "./DefaultText";
import Colors from "../constants/Colors";
import CustomHeaderButton from "./HeaderButton";
import { connectionMessage } from "../helpers/connectionMessageHandler";
// import { SearchBar } from "react-native-elements";

const HallList = (props) => {
  const { navigation } = props;

  // const [state, dispatchState] = useReducer(reducer, initialState);

  const [loading, setLoading] = useState(false);
  const [filterByPrice, setFilterByPrice] = useState(false);
  const [count, setCount] = useState(1);

  const token = useSelector((state) => state.Auth.token);

  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.Auth.userInfo);
  const DUMMY_HALLLIST = useSelector((state) => state.halls.hallList);
  const status = useSelector((state) => state.halls.status);
  const connectionStatus = useSelector((state) => state.Connection.isConnected);
  const connectionType = useSelector((state) => state.Connection.type);
  const isReachable = useSelector(
    (state) => state.Connection.isInternetReachable
  );

  console.log("rendering hallList");
  console.log("again and again");

  // const userChats = useSelector((state) => state.UserChats.userChats);
  // const hallChats = useSelector((state) => state.HallChats.hallChats);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        //   <Text>Save</Text>

        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title="Save" iconName="reload" onPress={tryAgain} />
        </HeaderButtons>
      ),
    });
  }, []);

  // const onRefresh = useCallback(() => {
  //   setLoading(true);
  //   tryAgain();
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }, []);

  // useEffect(() => {
  //   if (!connectionStatus) {
  //     console.log("connectionType ", connectionType);
  //     console.log("not connected to wifi");
  //     connectionMessage("You are not connected to wifi");
  //   }
  // }, [connectionStatus]);

  useEffect(() => {
    const loadListAndCurrentLocation = async () => {
      dispatch(setCurrentLocation());
      dispatch(setHallList(count));
    };
    if (status === 100) {
      setLoading(true);
      // dispatchState({ type: "setLoading", loading: true });
      loadListAndCurrentLocation();
    }
    if (status !== 100) {
      setLoading(false);
    }
  }, [status]);

  const loadMoreItems = () => {
    console.log("reached end of list");
    dispatch(setHallList(count + 1));
    setCount((count) => count + 1);
  };

  // let usedList = DUMMY_HALLLIST;

  const isItemFavorite = (id) => {
    if (Object.keys(userInfo).length === 0) return false;
    if (userInfo.favorites.includes(id)) return true;
    return false;
  };

  const tryAgain = () => {
    setCount(1);
    dispatch(setStatus(100));
  };

  const sortedListByPrice = useMemo(
    () => [...DUMMY_HALLLIST].sort((a, b) => a.price - b.price),
    [DUMMY_HALLLIST]
  );

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
    // <View
    //   style={{
    //     flex: 1,
    //   }}
    // >
    <View style={styles.listContainer}>
      <TouchableOpacity onPress={() => setFilterByPrice(!filterByPrice)}>
        <View
          style={{
            alignSelf: "flex-end",
            backgroundColor: filterByPrice ? "green" : "black",
            padding: 5,
            marginTop: 5,
            marginRight: "8%",
            borderRadius: 5,
            marginBottom: 5,
          }}
        >
          <Text style={{ color: "white" }}>
            {filterByPrice ? "Filtered" : "Filter by Price"}
          </Text>
        </View>
      </TouchableOpacity>
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
        data={filterByPrice ? sortedListByPrice : DUMMY_HALLLIST}
        renderItem={renderHall}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={tryAgain} />
        }
        onEndReached={loadMoreItems}
      />
    </View>
    // </View>
  );
};

const styles = StyleSheet.create({
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
