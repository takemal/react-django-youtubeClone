import { VideoState } from './video';

export type UserState = {
  isSignedIn: boolean;
  selectVideo: VideoState;
};

export type postUser = {
  email: string;
  password: string;
};
