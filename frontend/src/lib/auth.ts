import { Action, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { fetchEndAction, fetchStartAction } from '../slices/fetchStateSlice';
import { signInAction, signOutAction } from '../slices/userSlice';
import { RootState } from '../store';
import { authURL, userCreatesURL } from '../urls';

const cookies = new Cookies();

// アカウント登録
export const asyncSignUp = (email: string, password: string) => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    dispatch(fetchStartAction('アカウント登録中'));
    await axios
      .post(
        userCreatesURL,
        { username: '', email: email, password: password },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then((res) => {})
      .catch((e) => {
        console.log(e);
      });
    dispatch(fetchEndAction());
  };
};

// ログイン
export const asyncSignIn = (email: string, password: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(fetchStartAction('ログイン中'));
    console.log(authURL);
    await axios
      .post(
        authURL,
        { email: email, password: password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        cookies.set('Token', res.data.access, { path: '/' });
        dispatch(signInAction());
      })
      .catch((e) => {
        console.log(e);
      });
    dispatch(fetchEndAction());
  };
};

export const asyncLogout = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    dispatch(fetchStartAction('ログアウト中'));
    cookies.remove('Token');
    dispatch(signOutAction());
    dispatch(fetchEndAction());
  };
};
