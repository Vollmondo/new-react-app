import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { IProduct } from "../models";
import { fetchFavProducts, saveFavProduct, removeFavProduct } from "../api/api";

export interface FavProductsState {
  favProducts: { [_id: string]: IProduct };
  loading: boolean;
  error: string | null;
}

const initialState: FavProductsState = {
  favProducts: {},
  loading: false,
  error: null,
};

export const loadFavProducts = createAsyncThunk(
  "favProducts/loadFavProducts",
  async (userId: string) => {
    const response = await fetchFavProducts(userId);
    return response;
  }
);

export const addFavProduct = createAsyncThunk(
  "favProducts/addFavProduct",
  async ({ userId, product }: { userId: string; product: IProduct }) => {
    const savedProduct = await saveFavProduct(userId, product);
    return savedProduct;
  }
);

export const delFavProduct = createAsyncThunk(
  "favProducts/removeFavProduct",
  async ({ userId, productId }: { userId: string; productId: string }) => {
    await removeFavProduct(userId, productId);
    return productId;
  }
);

const favProductsSlice = createSlice({
  name: "favProducts",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<IProduct>) => {
      const existingProduct = Object.values(state.favProducts).find(
        (favProduct) => favProduct._id === action.payload._id
      );
      if (!existingProduct) {
        state.favProducts[action.payload._id] = action.payload;
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      delete state.favProducts[action.payload];
    },
    resetFavProducts: (state) => {
      state.favProducts = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFavProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadFavProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        action.payload.forEach((product) => {
          state.favProducts[product._id] = product;
        });
      })
      .addCase(loadFavProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to load favorite products.";
      })
      .addCase(addFavProduct.fulfilled, (state, action) => {
        const payload = action.payload as unknown as IProduct;
        if (payload && payload._id) {
          state.favProducts[payload._id] = payload;
        }
      })
      .addCase(delFavProduct.fulfilled, (state, action) => {
        delete state.favProducts[action.payload];
      });
  },
});

export const { addFavorite, removeFavorite, resetFavProducts } = favProductsSlice.actions;
export default favProductsSlice.reducer;

export const selectFavProducts = (state: RootState) => state.favProducts.favProducts;
export const selectFavProductsLoading = (state: RootState) => state.favProducts.loading;
export const selectFavProductsError = (state: RootState) => state.favProducts.error;