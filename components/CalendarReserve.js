import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Calendar } from "react-native-calendars";
import DefaultText from "./DefaultText";
import { URL } from "./../helpers/url";
import { showMessage } from "react-native-flash-message";
import { useSelector, useDispatch } from "react-redux";
import { editProfile } from "./../store/actions/Auth";

const CalendarReserve = (props) => {
  const { hallId, userId } = props;

  const [daySelected, setDaySelected] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.Auth.userInfo);
  const { reservation } = userInfo;

  const hallList = useSelector((state) => state.halls.hallList);
  const hall = hallList.find((hall) => hallId === hall.id);

  const datesReserved = hall.bookings.map((booking) =>
    booking.date.substring(0, 10)
  );

  console.log("datesReserved ", datesReserved);
  console.log("reservation ", reservation);

  const confirmReservationClickHandler = async () => {
    if (reservation) {
      showMessage({
        message: "Cannot Reserve",
        description: "you already have a reservation",
        style: { backgroundColor: "black" },
      });
      return;
    }

    const booking = {
      hallId,
      userId,
      date: daySelected,
    };
    console.log("booking ", booking);

    try {
      setIsSubmitting(true);
      const response = await fetch(`${URL}/api/booking/createBooking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });

      const responseData = await response.json();
      console.log("responseData ", responseData);

      const { userInfo: newUserInfo, message } = responseData;

      setIsSubmitting(false);
      if (response.status === 200) {
        dispatch(editProfile(newUserInfo));
        showMessage({
          message: "Your Reservation was successfull!",
          type: "success",
          style: { backgroundColor: "green" },
        });
      }
    } catch (err) {
      setIsSubmitting(false);
      console.log(err);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <Calendar
        style={{ height: 350 }}
        onDayPress={(day) => {
          console.log("selected day", day.dateString);
          setDaySelected(day.dateString);
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
        markedDates={
          {
            // [daySelected]: { selected: true },
            // "2022-05-10": { selected: true },
            // "2022-05-15": { selected: true },
            // "2022-05-16": { selected: true },
            // "2022-05-12": { selected: true },
            // "2022-05-10": { marked: true, selected: true },
          }
        }
        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={true}
      />
      {/* <View
      style={[
        styles.reserveButtonContainer,
        { marginTop: 10 },
        { opacity: daySelected ? 1 : 0.4 },
      ]}
    > */}
      <TouchableOpacity
        onPress={confirmReservationClickHandler}
        disabled={daySelected ? false : true}
        style={[
          styles.reserveButtonContainer,
          { width: "60%", alignSelf: "center", marginTop: 10 },
          { opacity: daySelected ? 1 : 0.4 },
        ]}
      >
        {isSubmitting && <ActivityIndicator color="white"></ActivityIndicator>}
        {!isSubmitting && (
          <DefaultText styles={styles.reserveButtonText}>CONFRIM</DefaultText>
        )}
      </TouchableOpacity>
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },

  reserveButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  reserveButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default CalendarReserve;
