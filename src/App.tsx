import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

import { Home } from './pages/Home';

export const App = () => {
  dayjs.locale('ru');

  return (
    <div className="App">
      <Home />
    </div>
  );
};
