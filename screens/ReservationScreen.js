import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DefaultText from "./../components/DefaultText";
import { useSelector } from "react-redux";
import HallItem from "./../components/HallItem";

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

  const hallList = useSelector((state) => state.halls.hallList);

  const hall = hallList.find((hall) => hall.id === hallId);
  console.log("hall ", hall);
  const newDate = new Date(date);

  const month = monthNames[newDate.getMonth()];
  const day = newDate.getDay();

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

      <HallItem isFavorite={false} item={hall} navigation={navigation} />
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
