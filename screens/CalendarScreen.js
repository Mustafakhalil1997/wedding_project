import React from "react";
import { View, StyleSheet, Text } from "react-native";
import DefaultText from "../components/DefaultText";
import { Calendar } from "react-native-calendars";

const CalendarScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <Calendar
        style={{ height: 350 }}
        onDayPress={(day) => {
          console.log("selected day", day.dateString);
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => {
          console.log("selected day", day);
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={"MMMM yyyy "}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => {
          console.log("month changed", month);
        }}
        markedDates={{
          // [daySelected]: { selected: true },
          "2022-05-10": { selected: true },
          "2022-05-15": { selected: true },
          "2022-05-16": { selected: true },
          "2022-05-12": { selected: true },

          // "2022-05-10": { marked: true, selected: true },
        }}
        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "white",
  },
});

export default CalendarScreen;
