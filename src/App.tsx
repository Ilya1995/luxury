import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { ToastContainer } from 'react-toastify';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';

import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/catalog',
    element: <Catalog />,
  },
]);

<RouterProvider router={router} />;

export const App = () => {
  dayjs.locale('ru');

  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer autoClose={2000} />
    </div>
  );
};
