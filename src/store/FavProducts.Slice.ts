import {PayloadAction, createSelector, createSlice} from "@reduxjs/toolkit";
import { RootState } from "./store";
import { IProduct } from "../models";

export interface FavProductsState{
    favProducts: {[_id:string]: IProduct}
}

const initialState: FavProductsState = {
  favProducts: {}
}

const favProductsSlice = createSlice({
    name: 'favProducts',
    initialState,
    reducers: {
        receivedFavProducts(state, action: PayloadAction<IProduct[]>) {
            const products = action.payload;
            products.forEach(product => {
                state.favProducts[product._id] = product
            })
        }
    }
})

export const { receivedFavProducts } = favProductsSlice.actions;
export default favProductsSlice.reducer;