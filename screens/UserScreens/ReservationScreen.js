import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import HallItem from "../../components/HallItem";
import DefaultText from "../../components/DefaultText";
import { SafeAreaView } from "react-native-safe-area-context";

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

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const ReservationScreen = (props) => {
  const { navigation } = props;

  const { reservation } = useSelector((state) => state.Auth.userInfo);

  const { hallId, date, status } = reservation;

  console.log("reservation ", reservation);

  const userInfo = useSelector((state) => state.Auth.userInfo);
  const hallList = useSelector((state) => state.halls.hallList);

  const reservedHall = hallList.find((hall) => hall.id === hallId);

  const newDate = new Date(date);
  const month = monthNames[newDate.getMonth()];
  const day = newDate.getUTCDate();

  const weekday = weekdays[newDate.getUTCDay()];

  const isItemFavorite = (id) => {
    if (Object.keys(userInfo).length === 0) return false;
    if (userInfo.favorites.includes(id)) return true;
    return false;
  };

  const isFavorite = isItemFavorite(hallId);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <View style={styles.screenContainer}>
        <DefaultText style={styles.weddingDateText}>
          Your wedding is on {weekday},{" "}
          <DefaultText style={{ fontFamily: "open-sans-bold" }}>
            {day}th of {month}
          </DefaultText>
        </DefaultText>

        <HallItem
          isFavorite={isFavorite}
          item={reservedHall}
          navigation={navigation}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "white",
  },

  weddingDateText: {
    fontSize: 20,
    fontFamily: "open-sans",
    alignSelf: "center",
    margin: 10,
  },
});

export default ReservationScreen;
