import { combineReducers } from "redux";
import productsSlice from "./productsSlice"
export const rootReducer = combineReducers({
    products: productsSlice,
})



