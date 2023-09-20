import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Cart.Slice";
import productsReducer from "./Products.Slice";


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
