//APIからの取得(基本全て)
export type GetVideo = {
  id: number;
  title: string;
  video: string;
  img: string;
  like: number;
  dislike: number;
};

//API送信用(post)
export type PostVideo = {
  title: string;
  video: File;
  img: File;
};

//React表示用(基本全て)
export type VideoState = {
  id: number | null;
  title: string;
  video: string;
  img: string;
  like: number | null;
  dislike: number | null;
};
