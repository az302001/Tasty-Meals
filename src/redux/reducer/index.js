import {
  GET_FOODS,
  GET_FOOD_BY_NAME,
  GET_FOOD_BY_ID,
  CLEAN_DETAIL,
} from "../actions";

const initialState = {
  foods: [],
  detailFoods: [],
  addFoods: [],
  foodByName: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FOODS:
      return {
        ...state,
        foods: action.payload,
      };
    case GET_FOOD_BY_NAME:
      return {
        ...state,
        foodByName: action.payload,
      };
    case GET_FOOD_BY_ID:
      return {
        ...state,
        detailFoods: action.payload,
      };
    case CLEAN_DETAIL:
      return {
        ...state,
        detailFoods: [],
      };
    default:
      return state;
  }
};

// export default rootReducer;
