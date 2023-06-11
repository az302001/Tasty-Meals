
import {
    GET_FOODS,
    GET_FOOD_BY_NAME,
    GET_FOOD_BY_ID,
    ORDER_BY_NAME,
    ORDER_BY_CATEGORY,
    ORDER_BY_RATING,
    RANGE_FOR_PRICE,
    GET_USER_DATA
} from '../actions';

const initialState = {
    foods: [],
    detailFoods: [],
    addFoods: [],
    foodByName: [],
    foodFilter: [],
    userData: {},
};

const productsSlice = (state = initialState, action) => {
    switch (action.type) {
        case GET_FOODS:
            return {
                ...state,
                foods: action.payload,
                foodFilter: [...action.payload]
            };

        case ORDER_BY_NAME:
            const foodbyorder = action.payload === 'atoz' ? state.foodFilter.sort((a, b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                else return -1;
            }) : state.foodFilter.sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                else return -1;
            });
            return {
                ...state,
                foodFilter: foodbyorder
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

        case ORDER_BY_CATEGORY:
            const foods_all_categories = state.foods;
            const filterByCategories = action.payload === 'all'
                ? foods_all_categories
                : foods_all_categories.filter(food => food.Category.name === action.payload);

            return {
                ...state,
                foodFilter: filterByCategories,
            };

        case ORDER_BY_RATING:
            let recipesByScore = action.payload === 'MenorMayor'
                ? state.foodFilter.sort((a, b) => {
                    if (a.rating > b.rating) return 1;
                    if (b.rating > a.rating) return -1;
                    return 0;
                })
                : state.foodFilter.sort((a, b) => {
                    if (a.rating > b.rating) return -1;
                    if (b.rating > a.rating) return 1;
                    return 0;
                });
            return {
                ...state,
                foodFilter: recipesByScore
            };




        case RANGE_FOR_PRICE:
            const { minPrice, maxPrice } = action.payload;
            const filteredByPrice = state.foods.filter(
                food => food.price >= minPrice && food.price <= maxPrice
            );
            return {
                ...state,
                foodFilter: filteredByPrice,
            };


        case GET_USER_DATA: 
        return {
            ...state,
            userData: {...action.payload} 
        };


        default:
            return state;
    }
};

export default productsSlice;

export const allProducts = (store) => store.products.foodFilter;
