import { Grid } from '@mui/material';
import React from 'react';
import { VideoState } from '../../types/video';
import { VideoItem } from './VideoItem';

type Props = {
  videos: VideoState[];
};

export const VideoList = (props: Props) => {
  const { videos } = props;

  const listOfVideos = videos.map((video) => <VideoItem key={video.id} video={video} />);
  return (
    <Grid container spacing={5}>
      <div className="video-list">{listOfVideos}</div>
    </Grid>
  );
};
