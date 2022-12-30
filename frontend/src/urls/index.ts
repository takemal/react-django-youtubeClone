export const apiUrl = process.env.REACT_APP_APIURL;

// 最後に/をいれる
export const userCreatesURL = `${apiUrl}api/create/`;
export const videosURL = `${apiUrl}api/videos/`;
export const videoURL = (videoId: string | number) => `${apiUrl}api/videos/${videoId}/`;
export const authURL = `${apiUrl}authen/jwt/create/`;
