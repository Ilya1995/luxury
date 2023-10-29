import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { ToastContainer } from 'react-toastify';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';

import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  dayjs.locale('ru');

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer autoClose={2000} />
    </div>
  );
};
