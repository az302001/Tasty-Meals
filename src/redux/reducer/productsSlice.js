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
} from "../actions";

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
      const foods_all_categories = state.foods;
      const filterByCategories =
        action.payload === "all"
          ? foods_all_categories
          : foods_all_categories.filter(
              (food) =>
                food.Category.name === action.payload && food.disabled === false
            );

      const filterCategory = action.payload === "all" ? null : action.payload;

      return {
        ...state,
        foodFilter: filterByCategories,
        filters: filterCategory ? [{ categories: filterCategory }] : [],
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
      const { minPrice, maxPrice } = action.payload;
      const categoryFilter = state.filters.find((obj) =>
        obj.hasOwnProperty("categories")
      );
      const filterPrice = { price: { minPrice, maxPrice } };

      if (categoryFilter) {
        const filteredByPrice = state.foods.filter(
          (food) =>
            food.price >= minPrice &&
            food.price <= maxPrice &&
            food.Category.name === categoryFilter.categories
        );
        return {
          ...state,
          foodFilter: filteredByPrice,
          filters: [filterPrice, categoryFilter],
        };
      }

      const filteredByPrice = state.foods.filter(
        (food) => food.price >= minPrice && food.price <= maxPrice
      );

      return {
        ...state,
        foodFilter: filteredByPrice,
        filters: [filterPrice],
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
                foodFilter: foodbyprice
            }


        case GET_USER_DATA:
            return {
                ...state,
                userData: { ...action.payload }
            };
  
   case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
        
       case GET_FOODS_AVIALABLES:
          const showFoods = state.foodFilter.filter(food => food.disabled === false);
          return {
              ...state,
              foodFilter: showFoods
            };

        case CREATE_DISCOUNT:
            return {
                ...state,
                discounts: action.payload,
            };

        default:
            return state;
    }

};

export default productsSlice;

export const allProducts = (store) => store.products.foodFilter;
