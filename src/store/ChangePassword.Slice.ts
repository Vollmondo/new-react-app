import { createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import axios from 'axios';

type ChangePasswordState = {
  isLoading: boolean;
  error: string | null;
};

type NewPwd = {
  oldPwd: string;
  newPwd: string;
};

const initialState: ChangePasswordState = {
  isLoading: false,
  error: null,
};

const changePasswordSlice = createSlice({
  name: 'changePassword',
  initialState,
  reducers: {
    changePasswordStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    changePasswordSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    changePasswordFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  changePasswordStart,
  changePasswordSuccess,
  changePasswordFailure,
} = changePasswordSlice.actions;

export const changePassword = (
  userId: string,
  data: NewPwd
): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
  try {
    dispatch(changePasswordStart());
    await tryChangePassword(userId, data);
    dispatch(changePasswordSuccess());
  } catch (error:any) {
    dispatch(changePasswordFailure(error.toString()));
  }
};

export const selectChangePasswordLoading = (state: RootState) =>
  state.changePassword.isLoading;
export const selectChangePasswordError = (state: RootState) =>
  state.changePassword.error;

export default changePasswordSlice.reducer;

const tryChangePassword = async (userId: string, data: NewPwd) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/saveUserPwd/${userId}`,
      data
    );
    console.log(response.data);
  } catch (error) {
    throw new Error('Ошибка сохранения изменений пользователя');
  }
};