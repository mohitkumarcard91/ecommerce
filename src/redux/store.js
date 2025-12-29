import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productsReducer from "./slices/productSlice";
import orderReducer from "./slices/orderSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer, 
    order: orderReducer,
  },
});
