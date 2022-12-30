import { Action, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { fetchEndAction, fetchStartAction } from '../slices/fetchStateSlice';
import { addVideoAction, deleteVideoAction, setVideosAction, updateVideoAction } from '../slices/videosSlice';
import { RootState } from '../store';
import { PostVideo } from '../types/video';
import { videosURL, videoURL } from '../urls';

const cookies = new Cookies();

export const asyncGetVideos = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    dispatch(fetchStartAction('プロフィール取得中'));
    await axios
      .get(videosURL, {
        headers: {
          Authorization: `JWT ${cookies.get('Token')}`,
        },
      })
      .then((res) => {
        dispatch(setVideosAction(res.data));
      })
      .catch((e) => {
        console.log(e);
      });
    dispatch(fetchEndAction());
  };
};

// 作成
export const asyncCreateVideo = (postData: PostVideo) => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    dispatch(fetchStartAction('動画投稿中'));
    const uploadData = new FormData();
    uploadData.append('title', postData.title);
    uploadData.append('video', postData.video, postData.video.name);
    uploadData.append('img', postData.img, postData.img.name);
    await axios
      .post(videosURL, uploadData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${cookies.get('Token')}`,
        },
      })
      .then((res) => {
        dispatch(addVideoAction(res.data));
      })
      .catch((e) => {
        console.log(e);
      });
    dispatch(fetchEndAction());
  };
};

// 削除
export const asyncDeleteVideo = (id: number) => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    dispatch(fetchStartAction('削除中'));
    await axios
      .delete(videoURL(id), {
        headers: {
          Authorization: `JWT ${cookies.get('Token')}`,
        },
      })
      .then((res) => {
        dispatch(deleteVideoAction(id));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

// ライク
export const asyncLikeVideo = (id: number) => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    dispatch(fetchStartAction('更新中'));
    const likedNumber = getState().videos.find((video) => video.id === id)?.like! + 1;
    const uploadData = new FormData();
    uploadData.append('like', likedNumber.toLocaleString());
    return await axios
      .patch(videoURL(id), uploadData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${cookies.get('Token')}`,
        },
      })
      .then((res) => {
        dispatch(updateVideoAction(res.data));
      })
      .catch((e) => {
        console.log(e);
      });
    dispatch(fetchEndAction());
  };
};

// ディスライク
export const asyncDisLikeVideo = (id: number) => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    dispatch(fetchStartAction('更新中'));
    const dislikedNumber = getState().videos.find((video) => video.id === id)?.dislike! + 1;
    const uploadData = new FormData();
    uploadData.append('dislike', dislikedNumber.toLocaleString());
    await axios
      .patch(videoURL(id), uploadData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${cookies.get('Token')}`,
        },
      })
      .then((res) => {
        dispatch(updateVideoAction(res.data));
      })
      .catch((e) => {
        console.log(e);
      });
    dispatch(fetchEndAction());
  };
};
