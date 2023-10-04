import { PayloadAction, createSelector, createSlice, createAsyncThunk, ThunkAction, Action, ThunkDispatch } from "@reduxjs/toolkit";
import { checkout } from "../api/api";
import { RootState } from "./store";
import { ICartItem, IOrder, IUser } from "../models";
import axios from "axios";
import { setUser } from "./User.Slice";

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
  const orderItems: { [id: string]: ICartItem } = {};

  Object.keys(items).forEach((id) => {
    const quantity = items[id];
    const price = products[id].price;
    orderItems[id] = { id, quantity, price };
  });

  const totalPrice = getTotalPrice(state);
  const order: IOrder = {
    customer: user?._id,
    items: Object.values(orderItems),
    timestamp: new Date().toISOString(),
    totalprice: Number(totalPrice),
    status: "В обработке",
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

export const updateBalance = (userId: string, data: IUser): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>, getState: () => RootState) => {
  if (data) {
    try {
      const updateData: IUser = {
        credit: data.credit,
        _id: data._id
      };

      await axios.post(`http://localhost:5000/updatebalance/${userId}`, updateData);
      dispatch(setUser(updateData));
    } catch (error) {
      console.error('Ошибка сохранения изменений пользователя:', error);
    }
  }
};