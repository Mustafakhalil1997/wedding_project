import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import { Calendar } from "react-native-calendars";
import DefaultText from "../../components/DefaultText";
import { URL } from "../../helpers/url";
import { showMessage } from "react-native-flash-message";
import { useSelector, useDispatch } from "react-redux";
import { editProfile } from "../../store/actions/Auth";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/HeaderButton";
import { reserveHall } from "../../store/actions/HallList";
import customBackArrow from "../../helpers/customBackArrow";
import customBackHandler from "../../helpers/customBackHandler";

const CalendarReserveScreen = ({ route, navigation }) => {
  const { hallId, userId } = route.params;

  const [daySelected, setDaySelected] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  const token = useSelector((state) => state.Auth.token);
  const userInfo = useSelector((state) => state.Auth.userInfo);
  const { reservation } = userInfo;

  const hallList = useSelector((state) => state.halls.hallList);
  const hall = hallList.find((hall) => hallId === hall.id);

  const today = new Date();

  const datesReserved = hall.bookings.map((booking) =>
    booking.date.substring(0, 10)
  );

  console.log("datesReserved ", datesReserved);

  useLayoutEffect(() => {
    customBackArrow({ navigation, isSubmitting });
  }, [isSubmitting]);

  useEffect(() => {
    const backHandler = customBackHandler({ navigation, isSubmitting });
    return () => {
      console.log("useEffect returned");
      backHandler.remove();
    };
  }, [isSubmitting]);

  let calendarDates = {};
  for (let i = 0; i < datesReserved.length; i++) {
    const calendarDate = {
      [datesReserved[i]]: {
        selected: true,
        customStyles: {
          container: {
            backgroundColor: "green",
          },
        },
      },
    };
    calendarDates = { ...calendarDates, ...Object.assign(calendarDate) };
  }
  console.log("calendarDates ", calendarDates);

  const dayPressHandler = (day) => {
    console.log("selected day", day.dateString);
    setDaySelected(day.dateString);
  };

  const confirmReservationClickHandler = async () => {
    if (Object.keys(userInfo).length === 0) {
      showMessage({
        message: "To Book a hall, sign in!",
        type: "success",
        style: { backgroundColor: "black" },
      });
      return;
    }
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
    dispatch(reserveHall(booking));
    console.log("booking ", booking);

    try {
      setIsSubmitting(true);
      const response = await fetch(`${URL}/api/booking/createBooking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(booking),
      });

      const responseData = await response.json();

      const { userInfo: newUserInfo, message } = responseData;

      setIsSubmitting(false);

      if (response.status !== 200) {
        showMessage({
          message: message,
          type: "info",
          style: { backgroundColor: "black" },
        });
        console.log("could not reserve");
        return;
      }

      if (response.status === 200) {
        dispatch(editProfile(newUserInfo));
        dispatch(reserveHall(booking));
        showMessage({
          message: "Your Reservation was successfull!",
          type: "success",
          style: { backgroundColor: "green" },
        });
        return;
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
        onDayPress={dayPressHandler}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => {
          console.log("selected day", day);
        }}
        minDate={today}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={"MMMM yyyy "}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => {
          console.log("month changed", month);
        }}
        markingType={"custom"}
        markedDates={{
          ...calendarDates,
          [daySelected]: {
            selected: true,
            customStyles: {
              container: {
                backgroundColor: "black",
              },
            },
          },
          // "2022-05-10": {
          //   selected: true,
          //   marked: true,
          //   customStyles: {
          //     container: {
          //       backgroundColor: "red",
          //     },
          //   },
          // },
        }}
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
        disabled={(daySelected ? false : true) && (isSubmitting ? false : true)}
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

export default CalendarReserveScreen;
