import React, { useCallback, useContext, useEffect, useState } from 'react';

import { IoMdClose } from 'react-icons/io';
import { RiUploadCloud2Line } from 'react-icons/ri';
import { FaVideo } from 'react-icons/fa';
import { BsImages } from 'react-icons/bs';
import { Box, Button, Fab, Grid, IconButton, Modal, TextField, Typography } from '@mui/material';
import { VideoDetail } from './main/VideoDetail';
import { VideoList } from './main/VideoList';
import AddIcon from '@mui/icons-material/Add';
import { Container } from '@mui/system';
import { PostVideo } from '../types/video';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { asyncCreateVideo, asyncGetVideos } from '../lib/video';
import { styled } from '@mui/system';
import Cookies from 'universal-cookie';
import { selectVideos } from '../slices/videosSlice';
import { OnChange } from '../types/events';
import { PhotoCamera } from '@mui/icons-material';

const IconButton1 = styled(IconButton)(({ theme }) => ({
  color: 'gray',
  marginRight: '25px',
  fontSize: 25,
}));

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const Main = () => {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState('');
  const [img, setImg] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const videos = useSelector(selectVideos);
  const dispatch = useDispatch<AppDispatch>();
  const cookies = new Cookies();
  const token = cookies.get('Token');

  const newVideo = async () => {
    if (img && video) {
      await dispatch(asyncCreateVideo({ title, img, video })).then(() => {
        setTitle('');
        setImg(null);
        setVideo(null);
      });
    }
    return;
  };

  useEffect(() => {
    dispatch(asyncGetVideos());
  }, [token]);

  //prettier-ignore
  const inputTitle = useCallback((event: React.ChangeEvent<HTMLInputElement>)=>{
    setTitle(event.target.value)
  }, [setTitle])

  //prettier-ignore
  const onUploadVideo = useCallback((event: React.ChangeEvent<HTMLInputElement>)=>{
  setVideo(event.target.files![0])
  }, [setVideo])

  //prettier-ignore
  const onUploadImage = useCallback((event: React.ChangeEvent<HTMLInputElement>)=>{
    setImg(event.target.files![0])
  }, [setImg])

  return (
    <div>
      <Grid container sx={{ textAlign: 'center' }}>
        <Grid item xs={11}>
          <Grid container spacing={5}>
            <Grid item xs={12}></Grid>

            <Grid item xs={1}>
              <Fab color="primary" aria-label="add" onClick={() => setOpen(true)}>
                <AddIcon />
              </Fab>
            </Grid>

            <Grid item xs={8}>
              <VideoDetail />
            </Grid>

            <Grid item xs={3}>
              <VideoList videos={videos} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography>Movie Title</Typography>
          <br />
          <TextField variant="standard" value={title} type="text" onChange={inputTitle} />
          <br />
          <br />
          <Container sx={{ textAlign: 'center' }}>
            <IconButton sx={{ color: 'gray', marginRight: '25px' }} disableRipple component="label">
              <input hidden accept="video/*" type="file" onChange={onUploadVideo} />
              <FaVideo />
            </IconButton>
            <IconButton sx={{ color: 'gray', marginRight: '25px' }} disableRipple component="label">
              <input hidden accept="image/*" type="file" onChange={onUploadImage} />
              <BsImages />
            </IconButton>
            <IconButton
              sx={{ color: 'gray', marginRight: '25px' }}
              disabled={!title || !video || !img}
              onClick={() => newVideo()}
            >
              <RiUploadCloud2Line />
            </IconButton>
            <IconButton1 onClick={() => setOpen(false)}>
              <IoMdClose />
            </IconButton1>
          </Container>
        </Box>
      </Modal>
    </div>
  );
};
