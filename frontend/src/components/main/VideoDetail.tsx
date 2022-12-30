import React from 'react';
import ReactPlayer from 'react-player';

import { AiFillLike } from 'react-icons/ai';
import { AiFillDislike } from 'react-icons/ai';
import { IoLogoYoutube } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../slices/userSlice';
import { Fab, Grid, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppDispatch } from '../../store';
import { asyncCreateVideo, asyncDisLikeVideo, asyncLikeVideo } from '../../lib/video';
import { ConstructionOutlined } from '@mui/icons-material';

export const VideoDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectVideo = useSelector(selectUser).selectVideo;

  if (!selectVideo.id)
    return (
      <div className="container">
        <button className="wait">
          <IoLogoYoutube />
        </button>
      </div>
    );

  console.log(selectVideo.id);
  return (
    <>
      <div className="wrapper">
        <ReactPlayer
          className="absolute t-0 w-full h-full"
          url={selectVideo.video} //動画URL
          // ref={player}
          width="100%"
          height="100%"
          playing //自動で動画再生
          controls //再生ボタンと停止ボタン
          disablePictureInPicture // スクリーンショット機能無効化
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload', //保存機能無効化
                disablePictureInPicture: true,
              },
            },
          }}
        />
      </div>
      <Grid container alignItems="center">
        <Grid item xs={10}>
          <Typography sx={{ paddingLeft: 2 }} variant="h6">
            {selectVideo.title}
          </Typography>
        </Grid>

        <Grid item xs={1}>
          <IconButton sx={{ paddingTop: 3 }} onClick={() => dispatch(asyncDisLikeVideo(selectVideo.id!))}>
            <AiFillLike />
            <Typography>{selectVideo.like}</Typography>
          </IconButton>
        </Grid>
        <Grid item xs={1}>
          <IconButton sx={{ paddingTop: 3 }} onClick={() => dispatch(asyncDisLikeVideo(selectVideo.id!))}>
            <AiFillDislike />
            <Typography>{selectVideo.dislike}</Typography>
          </IconButton>
        </Grid>
      </Grid>
      <Fab
        sx={{ paddingTop: 2 }}
        color="primary"
        aria-label="delete"
        onClick={() => dispatch(asyncDisLikeVideo(selectVideo.id!))}
      >
        <DeleteIcon />
      </Fab>
    </>
  );
};
