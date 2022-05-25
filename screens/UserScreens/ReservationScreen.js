import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import HallItem from "../../components/HallItem";
import DefaultText from "../../components/DefaultText";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ReservationScreen = (props) => {
  const { navigation } = props;

  const { reservation } = useSelector((state) => state.Auth.userInfo);

  console.log("reservation ", reservation);

  const { hallId, date } = reservation;

  const userInfo = useSelector((state) => state.Auth.userInfo);
  const hallList = useSelector((state) => state.halls.hallList);

  const hall = hallList.find((hall) => hall.id === hallId);
  const newDate = new Date(date);

  const month = monthNames[newDate.getMonth()];
  const day = newDate.getDay();

  const isItemFavorite = (id) => {
    console.log("isItemFavoite userInfo ", userInfo);
    if (Object.keys(userInfo).length === 0) return false;
    if (userInfo.favorites.includes(id)) return true;
    return false;
  };

  const isFavorite = isItemFavorite(hall.id);

  return (
    <View style={styles.screenContainer}>
      <DefaultText
        style={{
          fontSize: 20,
          fontFamily: "open-sans",
          alignSelf: "center",
          margin: 10,
        }}
      >
        Your wedding is on the{" "}
        <DefaultText style={{ fontFamily: "open-sans-bold" }}>
          {day}th of {month}
        </DefaultText>
      </DefaultText>

      <HallItem isFavorite={isFavorite} item={hall} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    // alignItems: "center",
    // justifyContent: "center",
    flex: 1,
    backgroundColor: "white",
  },
});

export default ReservationScreen;
