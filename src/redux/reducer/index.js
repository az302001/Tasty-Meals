import {
    GET_FOODS,
    GET_FOOD_BY_NAME,
    GET_FOOD_BY_ID,
} from '../actions';

const initialState = {
    foods: [],
    detailFoods: [],
    addFoods: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FOODS:
            return {
                ...state,
                foods: action.payload,
            }
        case GET_FOOD_BY_NAME:
            return {
                ...state,
                foods: action.payload,
            }
        case GET_FOOD_BY_ID:
            return {
                ...state,
                detailFoods: action.payload,
            }
        default:
            return state;
    }
};



export default rootReducer;

