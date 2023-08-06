import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { ToastContainer } from 'react-toastify';

import { Home } from './pages/Home';

import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  dayjs.locale('ru');

  return (
    <div className="App">
      <Home />
      <ToastContainer autoClose={2000} />
    </div>
  );
};
