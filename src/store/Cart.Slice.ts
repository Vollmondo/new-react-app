import { PayloadAction, createSelector, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkout } from "../api/api";
import { RootState } from "./store";
import { ICartItem, IOrder } from "../models";
import { useAppDispatch, useAppSelector } from "./hooks";
import { log } from "console";

type CheckoutState = "LOADING" | "READY" | "ERROR";

export interface CartState {
  items: { [productID: string]: number };
  checkoutState: CheckoutState;
  errorMessage: string;
}

const initialState: CartState = {
  items: {},
  checkoutState: "READY",
  errorMessage: "",
};

export const checkoutCart = createAsyncThunk("cart/checkout", async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const items = state.cart.items;
  const products = state.products.products;
  const user = state.user.user;
  const orderItems: Record<string, ICartItem> = {};

  Object.keys(items).forEach((id) => {
    const quantity = items[id];
    const price = products[id].price;
    orderItems[id] = { id, quantity, price };
  });

  const totalPrice = getTotalPrice(state);
 
  const order: IOrder = {
    customer: user?._id,
    items: orderItems,
    timestamp: new Date().toISOString(),
    totalprice: Number(totalPrice),
  };
  const response = await checkout(order);
  return response;
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      delete state.items[action.payload];
    },
    updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const { id, quantity } = action.payload;
      state.items[id] = quantity;
    },
  },
  extraReducers: function (builder) {
    builder.addCase(checkoutCart.pending, (state, action) => {
      state.checkoutState = "LOADING";
    });
    builder.addCase(checkoutCart.fulfilled, (state, action: PayloadAction<{ success: boolean }>) => {
      const { success } = action.payload;
      if (success) {
        state.checkoutState = "READY";
        state.items = {};
      } else {
        state.checkoutState = "ERROR";
      }
    });
    builder.addCase(checkoutCart.rejected, (state, action) => {
      state.checkoutState = "ERROR";
      state.errorMessage = action.error.message || "";
    });
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;

export function getNumItems(state: RootState) {
  let numItems = 0;
  for (let id in state.cart.items) {
    numItems += state.cart.items[id];
  }
  return numItems;
}

export const getMemoizedNumItems = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    let numItems = 0;
    for (let id in items) {
      numItems += items[id];
    }
    return numItems;
  }
);

export const getTotalPrice = createSelector(
  (state: RootState) => state.cart.items,
  (state: RootState) => state.products.products,
  (items, products) => {
    let total = 0;
    for (let id in items) {
      total += products[id].price * items[id];
    }
    return total.toFixed(2);
  }
);