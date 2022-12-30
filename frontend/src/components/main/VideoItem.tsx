import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectVideoAction } from '../../slices/userSlice';
import { AppDispatch } from '../../store';
import { VideoState } from '../../types/video';

type Props = {
  video: VideoState;
};

export const VideoItem = (props: Props) => {
  const { video } = props;
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Card
      sx={{ position: 'relative', display: 'flex', marginBottom: 15 }}
      onClick={() => dispatch(setSelectVideoAction(video))}
    >
      <CardActionArea>
        <CardMedia component="img" alt="thumnail" height="200" image={video.img} />
        <CardContent sx={{ gap: 1 }}>
          <Typography variant="h6"> {video.title} </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
