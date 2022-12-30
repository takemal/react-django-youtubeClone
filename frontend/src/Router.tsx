import { Route, Routes } from 'react-router-dom';
import Cookies from 'universal-cookie';
import App from './App';
import { Auth } from './Auth';
import { Login } from './components/Login';

export const Router = () => {
  // const cookies = new Cookies();
  // console.log(cookies.get('Token'));
  // console.log('a');
  return (
    <Routes>
      <Route path="/signin" element={<Login />} />
      {/* Authコンテンツ */}
      {/* prettier-ignore */}
      <Route path="/" element={<Auth><App /></Auth>} />
    </Routes>
  );
};
