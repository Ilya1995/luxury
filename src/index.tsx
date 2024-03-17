import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import axios from 'axios';

import './i18n';
import { store } from './store';
import { App } from './App';

import './styles/index.scss';

// if (process.env.NODE_ENV !== 'production') {
//   axios.defaults.baseURL = 'http://localhost:8080';
// }

axios.defaults.baseURL = 'https://luxury-sfo5.onrender.com';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
