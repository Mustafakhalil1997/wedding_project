import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import { Agenda } from "react-native-calendars";

import { URL } from "./../helpers/url";
import { Avatar } from "react-native-paper";
import DefaultText from "./../components/DefaultText";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const CalendarScreen = ({ navigation }) => {
  const [items, setItems] = useState({});
  const [bookingsWithUsers, setBookingsWithUsers] = useState({});

  const token = useSelector((state) => state.Auth.token);
  const hallInfo = useSelector((state) => state.Auth.hallInfo);

  if (!hallInfo) {
    return (
      <View style={[styles.screenContainer, { alignItems: "center" }]}>
        <DefaultText
          styles={{
            fontSize: 18,
            fontFamily: "open-sans-bold",
            marginBottom: 10,
          }}
        >
          You Don't Have a Venue
        </DefaultText>
        <DefaultText>Register Your Venue, to See Your Calendar</DefaultText>
      </View>
    );
  }

  const bookings = hallInfo.bookings;
  const bookingIds = bookings.map((booking) => booking.id);

  const datesReserved = bookings.map((booking) =>
    booking.date.substring(0, 10)
  );

  let calendarDates = {};
  for (let i = 0; i < datesReserved.length; i++) {
    const calendarDate = {
      [datesReserved[i]]: {
        selected: true,
        selectedColor: "black",
        // color: "red",
        // customStyles: {
        //   container: {
        //     backgroundColor: "pink",
        //   },
        // },
      },
    };
    calendarDates = { ...calendarDates, ...Object.assign(calendarDate) };
  }
  // // for (let i = 0; i < bookings.length; i++) {
  // //   dateToUser[bookings[i].date.substring(0, 10)] = {};
  // // }

  // next populate calendar with info about users

  useEffect(() => {
    const getBookingsWithUsers = async () => {
      try {
        const response = await fetch(
          `${URL}/api/booking/getBookingsWithUsers`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify(bookingIds),
          }
        );
        const responseData = await response.json();
        const { bookings } = responseData;
        setBookingsWithUsers(bookings);
      } catch (err) {
        console.log("err ", err);
      }
    };
    getBookingsWithUsers();
  }, []);

  // const renderEmptyDate = () => {
  //   return (
  //     <View style={styles.emptyDate}>
  //       <Text>This is empty date!</Text>
  //     </View>
  //   );
  // };

  // const rowHasChanged = (r1, r2) => {
  //   return r1.name !== r2.name;
  // };

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };

  const loadItems = (day) => {
    for (let i = -15; i < 65; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = timeToString(time); // string

      if (!items[strTime]) {
        items[strTime] = [];

        if (!bookingsWithUsers[strTime]) {
          items[strTime].push({
            name: "Item for " + strTime,
            email: null,
            convertedImageUrl: null,
          });
        } else {
          const userData = bookingsWithUsers[strTime];
          let convertedImageUrl = "";

          if (userData.profileImage.length !== 0) {
            convertedImageUrl =
              URL + "/" + userData.profileImage.replace(/\\/g, "/");
          }
          items[strTime].push({
            name: userData.firstName + " " + userData.lastName,
            email: userData.email,
            convertedImageUrl: convertedImageUrl,
          });
        }
      }
    }

    const newItems = {};
    Object.keys(items).forEach((key) => {
      newItems[key] = items[key];
    });
    setItems(newItems);
  };

  const renderItem = (item) => {
    // const fontSize = isFirst ? 16 : 14;
    // const color = isFirst ? "black" : "#43515c";
    const { name, email, convertedImageUrl } = item;
    if (convertedImageUrl === null) {
      return (
        <TouchableOpacity
          style={[styles.item]}
          onPress={() => console.log(item)}
        >
          <View>
            <Text style={{ fontSize: 16, color: "black" }}>NO RESERVATION</Text>
          </View>
        </TouchableOpacity>
      );
    }

    const chatIconClickHandler = () => {
      navigation.navigate({
        name: "Chats",
      });
    };

    return (
      <TouchableOpacity style={[styles.item]} onPress={() => console.log(item)}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <DefaultText styles={{ fontSize: 16, color: "black" }}>
              {name}
            </DefaultText>
            <DefaultText styles={{ fontSize: 16, color: "black" }}>
              {email}
            </DefaultText>
          </View>
          <TouchableOpacity onPress={chatIconClickHandler}>
            <Ionicons name="chatbox-ellipses-outline" size={32} color="green" />
          </TouchableOpacity>
          <View style={styles.imageCircleContainer}>
            {convertedImageUrl.length === 0 ? (
              <Avatar.Image
                size={40}
                source={require("../constants/images/Roger.jpg")}
              />
            ) : (
              <Avatar.Image size={40} source={{ uri: convertedImageUrl }} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (Object.keys(bookingsWithUsers).length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
        <Text>Loading</Text>
      </View>
    );
  }

  if (bookingsWithUsers) {
    return (
      <View style={styles.screenContainer}>
        {/* <Calendar
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
      /> */}
        <Agenda
          // testID={testIDs.agenda.CONTAINER}
          items={items}
          loadItemsForMonth={loadItems}
          // selected={"2022-05-16"}
          renderItem={renderItem}
          // renderEmptyDate={renderEmptyDate}
          // rowHasChanged={rowHasChanged}
          showClosingKnob={true}
          // markingType={"period"}
          markedDates={{
            ...calendarDates,
            // "2022-05-08": { textColor: "#43515c", selected: true },
            // "2022-05-09": { textColor: "#43515c" },
            // "2022-05-14": { startingDay: true, endingDay: true, color: "blue" },
            // "2022-05-21": {
            //   startingDay: true,
            //   selected: true,
            //   selectedColor: "black",
            // },
            // "2022-05-22": { endingDay: true, color: "gray" },
            // "2022-05-24": { startingDay: true, color: "gray" },
            // "2022-05-25": { color: "gray" },
            // "2022-05-26": { endingDay: true, color: "gray" },
          }}
          // showOnlySelectedDayItems
          // monthFormat={'yyyy'}
          // theme={{ calendarBackground: "red", agendaKnobColor: "green" }}
          theme={{ agendaKnobColor: "black" }}

          //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
          // hideExtraDays={true}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  screenContainer: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "white",
  },
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  imageCircleContainer: {
    borderRadius: 30,
    // alignSelf: "flex-start",
    backgroundColor: "gray",
  },
});

export default CalendarScreen;
