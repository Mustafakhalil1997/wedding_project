import {
  SET_LIST,
  TOGGLE_FAVORITE,
  CREATE_RESERVATION,
} from "../actions/HallList";

const initialState = {
  hallList: [],
  favoritesList: [],
};

const hallListReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST:
      return {
        ...state,
        hallList: action.hallList,
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
        console.log("removing");
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
      console.log("hall ", hall);
      const previousReservations = hall.reservations;
      const checkExistingIndex = previousReservations.findIndex(
        (h) => h.date === date
      );
      let newHallList = [...state.hallList];
      if (checkExistingIndex < 0) {
        previousReservations.push(action.reservation);
        const newHall = { ...hall, reservations: previousReservations };
        newHallList[index] = newHall;
      } else {
        console.log("Hall is reserved on that day, choose another day");
      }
      return {
        ...state,
        hallList: newHallList,
      };
    default:
      return state;
  }
};

export default hallListReducer;
