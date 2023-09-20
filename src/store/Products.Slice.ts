import {PayloadAction, createSelector, createSlice} from "@reduxjs/toolkit";
import { RootState } from "./store";
import { IProduct } from "../models";

export interface ProductsState{
    products: {[_id:string]: IProduct}
}

const initialState: ProductsState = {
    products: {}
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        receivedProducts(state, action: PayloadAction<IProduct[]>) {
            const products = action.payload;
            products.forEach(product => {
                state.products[product._id] = product
            })
        }
    }
})

export const { receivedProducts } = productsSlice.actions;
export default productsSlice.reducer;