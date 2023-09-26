import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Cart.Slice";
import productsReducer from "./Products.Slice";
import favProductsReducer from "./FavProducts.Slice";
import categoriesReducer from "./Categories.Slice"
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit"

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
  favProducts: favProductsReducer,
  categories: categoriesReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
