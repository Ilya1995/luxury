import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { ToastContainer } from 'react-toastify';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { CatalogCard } from './pages/CatalogCard';

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
  {
    path: '/catalog/:tab',
    element: <Catalog />,
  },
  {
    path: '/catalog/:tab/:productId',
    element: <CatalogCard />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

<RouterProvider router={router} />;

export const App = () => {
  dayjs.locale('ru');

  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer autoClose={2000} hideProgressBar />
    </div>
  );
};
