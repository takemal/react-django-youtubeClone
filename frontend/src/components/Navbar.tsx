import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { FiLogOut } from 'react-icons/fi';
import { FaYoutube } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { asyncLogout } from '../lib/auth';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const logout = async () => {
    await dispatch(asyncLogout()).then(() => navigate('signin'));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <FaYoutube />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Youtube App
          </Typography>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={logout}>
            <FiLogOut />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
