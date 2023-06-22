import categories from "@/Data/categories";
import {
  GET_FOODS,
  GET_FOOD_BY_NAME,
  GET_FOOD_BY_ID,
  ORDER_BY_NAME,
  ORDER_BY_CATEGORY,
  ORDER_BY_CATEGORY_ADMIN,
  ORDER_BY_RATING,
  RANGE_FOR_PRICE,
  GET_USER_DATA,
  DELETE_FOOD,
  GET_ALL_CATEGORIES,
  UPDATE_FOOD,
  ORDER_BY_PRICE,
  GET_FOODS_AVIALABLES,
  GET_USERS,
  CREATE_DISCOUNT,
  RECUPERAR_PASS,
  DELETE_DISCOUNT,
  GET_DISCOUNTS,
  CLEAN_STATE,
  CLEAN_DETAIL,
  GET_USER_TRANSACTIONS,
  CLEAN_DETAIL_ORDER,
  POST_REVIEW,
  GET_REVIEW,
  CREATE_TRANSACTION,
  UPDATE_TRANSACTION_STATUS,
} from "../actions";
import { filterfoods } from "@/utils/general";

const initialState = {
  originalFoods: [],
  foods: [],
  detailFoods: [],
  addFoods: [],
  foodByName: [],
  foodFilter: [],
  filters: [],
  userData: {},
  users: [],
  categories: [],
  newPass: [],
  isLoading: false,
  userTransactions: [],
  review: [],
  transactionId: 0,
};

const productsSlice = (state = initialState, action) => {
  switch (action.type) {
    case GET_FOODS:
      return {
        ...state,
        originalFoods: action.payload,
        foods: action.payload,
        foodFilter: action.payload.filter((food) => !food.disabled),
      };

    case ORDER_BY_NAME:
      const foodbyorder =
        action.payload === "atoz"
          ? state.foodFilter.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            else return -1;
          })
          : state.foodFilter.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
            else return -1;
          });
      return {
        ...state,
        foodFilter: foodbyorder,
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


      const categoryfilters = { category: action.payload }
      const objToReplace = state.filters.find(item => Object.keys(item).includes(Object.keys(categoryfilters)[0]));
      const index = state.filters.indexOf(objToReplace);
      if (index !== -1) {
        state.filters.splice(index, 1, categoryfilters);
      } else {
        state.filters.push(categoryfilters);
      }

      return {
        ...state,
        foodFilter: filterfoods([...state.foods], [...state.filters]),
      };

    case ORDER_BY_CATEGORY_ADMIN:
      const { originalFoods } = state;
      let filteredByCategoryAdmin;

      if (action.payload === "all") {
        filteredByCategoryAdmin = originalFoods;
      } else {
        filteredByCategoryAdmin = originalFoods.filter(
          (food) => food.Category.name === action.payload
        );
      }

      return {
        ...state,
        foods: filteredByCategoryAdmin,
      };

    case ORDER_BY_RATING:
      let recipesByScore =
        action.payload === "MenorMayor"
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
        foodFilter: recipesByScore,
      };

    case RANGE_FOR_PRICE:
      const pricefilters = action.payload  === "all-prices"? {price: action.payload} : { price: `${action.payload.minPrice}-${action.payload.maxPrice}` }
      const objToReplaceprice = state.filters.find(item => Object.keys(item).includes(Object.keys(pricefilters)[0]));
      const indexprice = state.filters.indexOf(objToReplaceprice);
      if (indexprice !== -1) {
        state.filters.splice(indexprice, 1, pricefilters);
      } else {
        state.filters.push(pricefilters);
      }
      return {
        ...state,
        foodFilter: filterfoods([...state.foods], [...state.filters]),
      };

    case DELETE_FOOD:
      return {
        ...state,
        foods: state.foods.filter((food) => food.id !== action.payload),
        //? Porque me querra actualizar el filtro tambien si no lo toco
        // foodFilter: state.foodFilter.filter(food => food.id !== action.payload),
      };

    case GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case UPDATE_FOOD:
      return {
        ...state,
        foods: action.payload,
        //? Porque me querra actualizar el filtro tambien si no lo toco
        // foodFilter: [...action.payload]
      };

    // * Preguntar en donde tiene que funcionar el ordenamiento por precio, dedusco que seria en el menu
    case ORDER_BY_PRICE:
      const foodbyprice =
        action.payload === "menor"
          ? state.foodFilter.sort((a, b) => {
            if (a.price > b.price) return 1;
            else return -1;
          })
          : state.foodFilter.sort((a, b) => {
            if (a.price < b.price) return 1;
            else return -1;
          });

      return {
        ...state,
        foodFilter: foodbyprice,
      };

    case GET_USER_DATA:
      return {
        ...state,
        userData: { ...action.payload },
      };

    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case GET_FOODS_AVIALABLES:
      const showFoods = state.foodFilter.filter(
        (food) => food.disabled === false
      );
      return {
        ...state,
        foodFilter: showFoods,
      };

    case CREATE_DISCOUNT:
      return {
        ...state,
        discounts: action.payload,
      };

    case RECUPERAR_PASS:
      return {
        ...state,
        newPass: action.payload,
      };

    case DELETE_DISCOUNT:
      return {
        ...state,
        discounts: action.payload,
      };

    case GET_DISCOUNTS:
      const discountfilters = { discount: action.payload }
      const objToReplaceDiscount = state.filters.find(item => Object.keys(item).includes(Object.keys(discountfilters)[0]));
      const indexDiscount = state.filters.indexOf(objToReplaceDiscount);
      if (indexDiscount !== -1) {
        state.filters.splice(indexDiscount, 1, discountfilters);
      } else {
        state.filters.push(discountfilters);
      }
      return {
        ...state,
        foodFilter: filterfoods([...state.foods], [...state.filters]),
      };

      
    case CLEAN_DETAIL:
      return {
        ...state,
        detailFoods: [],
      };

    case CLEAN_DETAIL_ORDER:
      return {
        ...state,
        userTransactions: [],
      };
    case CLEAN_STATE:
      return initialState;
    case GET_USER_TRANSACTIONS:
      const sortedTransactions = action.payload.sort((a, b) => b.id - a.id);
      return {
        ...state,
        userTransactions: sortedTransactions,
      };
    case POST_REVIEW:
      return {
        ...state,
      };
    case GET_REVIEW:
      return {
        ...state,
        review: action.payload,
      };
    case CREATE_TRANSACTION:
      return {
        ...state,
        transactionId: action.payload,
      };
    case UPDATE_TRANSACTION_STATUS:
      return {
        ...state,

      }

    default:
      return state;
  }
};

export default productsSlice;

export const allProducts = (store) => store.products.foodFilter;
