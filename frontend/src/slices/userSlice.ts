import { createSlice } from '@reduxjs/toolkit';
import { UserState } from '../types/user';
import { RootState } from '../store';

export const initialUserState: UserState = {
  isSignedIn: false,
  selectVideo: {
    id: null,
    title: '',
    video: '',
    img: '',
    like: null,
    dislike: null,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    //ログイン
    signInAction: (state) => {
      state.isSignedIn = true;
    },
    //ログアウト
    signOutAction: (state) => {
      return initialUserState;
    },
    setSelectVideoAction: (state, action) => {
      state.selectVideo = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const { signInAction, signOutAction, setSelectVideoAction } = userSlice.actions;

// state情報をそのままとる
export const selectUser = (state: RootState) => state.user;
