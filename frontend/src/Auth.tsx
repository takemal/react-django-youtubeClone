import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { asyncLogout } from './lib/auth';
import { selectUser } from './slices/userSlice';
import { AppDispatch } from './store';

type Props = {
  children: ReactNode;
};

export const Auth = ({ children }: Props) => {
  const isSignedIn = useSelector(selectUser).isSignedIn;
  const navigate = useNavigate();
  const cookies = new Cookies();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!isSignedIn || !cookies.get('Token')) {
      dispatch(asyncLogout());
      navigate('/signin');
    }
  }, []);

  if (!isSignedIn) {
    return <></>;
  } else {
    return <>{children}</>;
  }
};
