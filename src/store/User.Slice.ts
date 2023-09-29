import { Action, createSlice, PayloadAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { IUser } from '../models';
import produce, { Draft } from 'immer';
import axios from 'axios';
import { RootState } from './store';

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

export const saveUser = (userId: string, data: IUser): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: ThunkDispatch<RootState, unknown, Action<string>>, getState: () => RootState) => {
  if (data) {
    try {
      await axios.post(`http://localhost:5000/saveUser/${userId}`, data);
      console.log(data)
      dispatch(setUser(data));
    } catch (error) {
      console.error('Ошибка сохранения изменений пользователя:', error);
    }
  }
};

export default userSlice.reducer;