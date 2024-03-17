import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { ToastContainer } from 'react-toastify';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { CatalogCard } from './pages/CatalogCard';
import { Main } from './admin/Main';

import 'react-toastify/dist/ReactToastify.css';

const locale = 'ru';

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
    path: '/admin',
    element: <Main />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

<RouterProvider router={router} />;

export const App = () => {
  dayjs.locale(locale);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <div className="App">
        <RouterProvider router={router} />
        <ToastContainer autoClose={2000} hideProgressBar />
      </div>
    </LocalizationProvider>
  );
};
