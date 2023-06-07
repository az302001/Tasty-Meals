
import axios from 'axios';

export const GET_FOODS = 'GET_FOODS';
export const GET_FOOD_BY_NAME = 'GET_FOOD_BY_NAME';
export const GET_FOOD_BY_ID = 'GET_FOOD_BY_ID';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_CATEGORY = 'ORDER_BY_CATEGORY';
export const ORDER_BY_RATING = 'ORDER_BY_RATING';

export const getFoods = () => {
    return async (dispatch) => {
        const response = (await axios.get('/api/Products')).data;
        return dispatch({
            type: 'GET_FOODS',
            payload: response,
        });
    };
};

export const orderByName = (payload) => { // ordenar  de la A-Z Y DE LA Z-A
    return {
      type: ORDER_BY_NAME,
      payload: payload,
    };
  };
  
export const orderByCategory=(payload)=>{  // ordenar por categoria
    return{
        type:ORDER_BY_CATEGORY,
        payload:payload
    }
}




// Este seria para el input de search
export const getFoodByName = (name) => {
   return async (dispatch) => {
        try {
        const response = (await axios.get(`/api/Products?name=${name}`)).data.GetproductByName;
        return dispatch({
                    type: 'GET_FOOD_BY_NAME',
                    payload: response,
                });
        } catch (error) {{
            console.error('Ocurrió un error en la solicitud:', error);
        }
        }
    };
}

// Este seria para el detail food
export const getFoodById = (id) => {
    return async (dispatch) => {
        const response = (await axios.get(`/api/Products/${id}`)).data.product;//agrego .product ya que así viene de la peticion al back.
        return dispatch({
            type: 'GET_FOOD_BY_ID',
            payload: response,
        });
    };
}


export const orderByRating = (payload) => {
    return {
        type: ORDER_BY_RATING,
        payload
    }
}
