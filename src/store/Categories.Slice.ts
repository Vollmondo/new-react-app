import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategory } from "../models";

interface CategoriesState {
  categories: ICategory[];
}

const initialState: CategoriesState = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    receivedCategories(state, action: PayloadAction<ICategory[]>) {
      state.categories = action.payload;
    },
  },
});

export const { receivedCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;