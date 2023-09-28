import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../models';
import produce, { Draft } from 'immer';


interface UserState {
  user: IUser | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      return produce(state, (draftState: Draft<UserState>) => {
        draftState.user = initialState.user;
      });
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;