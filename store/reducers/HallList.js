import { SET_LIST, TOGGLE_FAVORITE } from "../actions/HallList";

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
      const hallItemInListIndex = state.hallList.findIndex((hallItem) => {
        console.log(hallItem.id, action.hallId);
        return hallItem.id === action.hallId;
      });

      if (existingIndex >= 0) {
        console.log("removing");
        updatedHallsList[hallItemInListIndex].isFavorite = false;
        updatedFavoriteList.splice(existingIndex, 1);
        console.log(state.hallList);
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
    default:
      return state;
  }
};

export default hallListReducer;
