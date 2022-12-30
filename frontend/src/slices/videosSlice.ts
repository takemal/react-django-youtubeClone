import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { VideoState } from '../types/video';

// ユーザー情報の初期化
export const initialVideosState: VideoState[] = [];

export const videosSlice = createSlice({
  name: 'videos',
  initialState: initialVideosState,
  reducers: {
    setVideosAction: (state, action) => {
      return action.payload;
    },
    // 初期化
    resetVideosAction: (state, action) => {
      return initialVideosState;
    },
    // 配列:データ追加
    addVideoAction: (state, action) => {
      return [...state, action.payload];
    },
    // 配列:データ更新
    updateVideoAction: (state, action) => {
      return state.map((video) => {
        if (video.id === action.payload.id) {
          return action.payload;
        }
        return video;
      });
    },
    // 配列:データ削除
    deleteVideoAction: (state, action) => {
      return state.filter((video) => video.id !== action.payload);
    },
  },
});

export const videosReducer = videosSlice.reducer;
export const { setVideosAction, resetVideosAction, addVideoAction, deleteVideoAction, updateVideoAction } =
  videosSlice.actions;

// state情報をそのままとる
export const selectVideos = (state: RootState) => state.videos;
