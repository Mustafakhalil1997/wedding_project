import {
  SET_LIST,
  TOGGLE_FAVORITE,
  CREATE_RESERVATION,
  SET_STATUS,
} from "../actions/HallList";

const initialState = {
  status: 100,
  hallList: [],
  favoritesList: [],
};

const hallListReducer = (state = initialState, action) => {
  console.log("count in reducer ", action.count);
  switch (action.type) {
    case SET_LIST:
      const newList =
        action.count === 1
          ? action.hallList
          : [...state.hallList, ...action.hallList];
      return {
        ...state,
        status: 200,
        // hallList: action.hallList,
        hallList: newList,
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      };
    case TOGGLE_FAVORITE:
      const favoriteId = action.hallId;
      const existingIndex = state.favoritesList.findIndex(
        (hall) => hall.id === favoriteId
      );
      const updatedFavoriteList = [...state.favoritesList];
      const updatedHallsList = [...state.hallList];
      console.log("hallId in reducer ", action.hallId);
      const hallItemInListIndex = state.hallList.findIndex((hallItem) => {
        console.log(hallItem.id, action.hallId);
        return hallItem.id === action.hallId;
      });

      if (existingIndex >= 0) {
        updatedHallsList[hallItemInListIndex].isFavorite = false;
        updatedFavoriteList.splice(existingIndex, 1);
      } else {
        console.log("adding");
        updatedHallsList[hallItemInListIndex].isFavorite = true;
        const hallItem = state.hallList.find(
          (hallItem) => hallItem.id === action.hallId
        );
        updatedFavoriteList.push(hallItem);
      }
      return {
        ...state,
        hallList: updatedHallsList,
        favoritesList: updatedFavoriteList,
      };
    case CREATE_RESERVATION:
      const { userId, hallId, date, price } = action.reservation;
      const hall = state.hallList.find((h) => h.id === hallId);
      const index = state.hallList.findIndex((h) => h.id === hallId);
      const previousReservations = hall.bookings;
      console.log("previousReservations ", previousReservations);
      // const checkExistingIndex = previousReservations.findIndex(
      //   (h) => h.date === date
      // );
      let newHallList = [...state.hallList];
      previousReservations.push(action.reservation);
      const newHall = { ...hall, reservations: previousReservations };
      newHallList[index] = newHall;

      return {
        ...state,
        hallList: newHallList,
      };
    default:
      return state;
  }
};

export default hallListReducer;
