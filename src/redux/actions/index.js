import axios from "axios";

export const RANGE_FOR_PRICE = "RANGE_FOR_PRICE";
export const GET_FOODS = "GET_FOODS";
export const GET_FOOD_BY_NAME = "GET_FOOD_BY_NAME";
export const GET_FOOD_BY_ID = "GET_FOOD_BY_ID";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_CATEGORY = "ORDER_BY_CATEGORY";
export const ORDER_BY_CATEGORY_ADMIN = "ORDER_BY_CATEGORY_ADMIN";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const CLEAN_STATE = "CLEAN_STATE";

export const GET_USER_DATA = "GET_USER_DATA";

export const DELETE_FOOD = "DELETE_FOOD";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const UPDATE_FOOD = "UPDATE_FOOD";
export const ORDER_BY_PRICE = "ORDER_BY_PRICE"; // TODO: ordenar el precio de menor a mayor y viceversa

export const GET_USERS = "GET_USERS";

export const GET_FOODS_AVIALABLES = "GET_FOODS_AVIALABLES";
export const CREATE_DISCOUNT = "CREATE_DISCOUNT";
export const DELETE_DISCOUNT = "DELETE_DISCOUNT";
export const GET_DISCOUNTS = "GET_DISCOUNTS";
export const CREATE_TRANSACTION = "CREATE_TRANSACTION";

export const getFoods = () => {
  return async (dispatch) => {
    const response = (await axios.get("/api/Products")).data;
    return dispatch({
      type: "GET_FOODS",
      payload: response,
    });
  };
};

export const orderByName = (payload) => {
  // ordenar  de la A-Z Y DE LA Z-A
  return {
    type: ORDER_BY_NAME,
    payload: payload,
  };
};

export const orderByCategory = (payload) => {
  // ordenar por categoria
  return {
    type: ORDER_BY_CATEGORY,
    payload: payload,
  };
};

export const orderByCategoryAdmin = (payload) => {
  return {
    type: ORDER_BY_CATEGORY_ADMIN,
    payload: payload,
  };
};
// Este seria para el input de search
export const getFoodByName = (name) => {
  return async (dispatch) => {
    try {
      const response = (await axios.get(`/api/Products?name=${name}`)).data
        .GetproductByName;
      return dispatch({
        type: "GET_FOOD_BY_NAME",
        payload: response,
      });
    } catch (error) {
      {
        console.error("Ocurrió un error en la solicitud:", error);
      }
    }
  };
};

// Este seria para el detail food
export const getFoodById = (id) => {
  return async (dispatch) => {
    const response = (await axios.get(`/api/Products/${id}`)).data.product; //agrego .product ya que así viene de la peticion al back.
    return dispatch({
      type: "GET_FOOD_BY_ID",
      payload: response,
    });
  };
};

export const orderByRating = (payload) => {
  return {
    type: ORDER_BY_RATING,
    payload,
  };
};

export const rangeForPrice = ({ minPrice, maxPrice }) => {
  return {
    type: RANGE_FOR_PRICE,
    payload: { minPrice, maxPrice },
  };
};

export const cleanDetail = () => {
  return {
    type: CLEAN_DETAIL,
  };
};

// Este seria para buscar al usuario por su email
export const getUserData = (token) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/auth/sesionVerify`, { token });
      return dispatch({
        type: "GET_USER_DATA",
        payload: response,
      });
    } catch (error) {
      {
        console.error("Ocurrió un error en la solicitud:", error);
      }
    }
  };
};

export const deleteFood = (id) => {
  return async (dispatch) => {
    const response = (await axios.delete(`/api/Products/${id}`)).data.product;
    return dispatch({
      type: "DELETE_FOOD",
      payload: response,
    });
  };
};

export const getAllCategories = () => {
  return async (dispatch) => {
    const response = (await axios.get("/api/Products/AllCategories")).data;
    return dispatch({
      type: "GET_ALL_CATEGORIES",
      payload: response,
    });
  };
};

export const updateFood = (id, payload) => {
  return async (dispatch) => {
    const response = (await axios.put(`/api/Products/${id}`, payload)).data
      .product;
    return dispatch({
      type: "UPDATE_FOOD",
      payload: response,
    });
  };
};

export const orderByPrice = (payload) => {
  return {
    type: "ORDER_BY_PRICE",
    payload: payload,
  };
};

export const getFoodsAvailables = (id, disabled) => {
  return async (dispatch) => {
    const response = (await axios.patch(`/api/Admin/disabled`, id, disabled))
      .data.product;
    return dispatch({
      type: "GET_FOODS_AVIALABLES",
      payload: response,
    });
  };
};

export const getUsers = () => {
  return async (dispatch) => {
    const response = await axios.get(`/api/Users`);
    return dispatch({
      type: "GET_USERS",
      payload: response.data.users,
    });
  };
};

export const createDiscount = (categoryId, discount) => {
  console.log(categoryId, discount);
  return async (dispatch) => {
    const response = (
      await axios.patch("/api/Admin/createDiscount", {
        categoryId: categoryId,
        discount: discount,
      })
    ).data;
    return dispatch({
      type: "CREATE_DISCOUNT",
      payload: response,
    });
  };
};

export const deleteDiscount = (categoryId) => {
  console.log(categoryId);
  return async (dispatch) => {
    const response = (
      await axios.patch("/api/Admin/deleteDiscount", {
        categoryId: categoryId,
      })
    ).data;
    return dispatch({
      type: "DELETE_DISCOUNT",
      payload: response,
    });
  };
};

export const recuperarPasswordRequest = (email) => {
  return async (dispatch) => {
    const response = await axios.post("/api/Recuperar/recuperarPass", {
      email,
    });
    return dispatch({
      type: "RECUPERAR_PASS",
      payload: response,
    });
  };
};

export const actualizarPassword = (password, token) => {
  return async (dispatch) => {
    const response = await axios.post("/api/Recuperar/modificar", {
      password,
      token,
    });
    return dispatch({
      type: "ACTUALIZAR_PASS",
    });
  };
};

export const getDiscounts = (payload) => {
  return {
    type: "GET_DISCOUNTS",
    payload,
  };
};

export const createTransaction = (foodsIds, costo, userId, approved) => {
  return async (dispatch) => {
    await axios.post(`/api/Products/addTransaction`, {
      foodsIds,
      costo,
      userId,
      approved,
    });
    return dispatch({
      type: CREATE_TRANSACTION,
    });
  };
};
export const cleanState = () => {
  return {
    type: CLEAN_STATE,
  };
};
