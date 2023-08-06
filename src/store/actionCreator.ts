import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

import { Brand, News, Response } from './types';
import { setSuccessData, setErrorData, setLoadingData } from './reducer';
import { data as mockBrands } from '../components/BrandsCarousel/constants';
import { data as mockNews } from '../components/News/constants';

if (process.env.NODE_ENV !== 'production') {
  axios.defaults.baseURL = 'http://localhost:8080';
}

export const getBrands = async (dispatch: Dispatch<AnyAction>) => {
  dispatch(setLoadingData({ key: 'brands' }));

  try {
    const response: Response<Brand[]> = await axios.get('/brand');
    if (response.status !== 200 || typeof response.data === 'string') {
      throw new Error('bad response');
    }
    const data = response.data.length ? response.data : mockBrands;

    dispatch(setSuccessData({ key: 'brands', data }));
  } catch (error) {
    dispatch(setErrorData({ key: 'brands' }));
    console.error(error);
  }
};

export const getNews = async (dispatch: Dispatch<AnyAction>) => {
  dispatch(setLoadingData({ key: 'news' }));

  try {
    const response: Response<News[]> = await axios.get('/news');
    if (response.status !== 200 || typeof response.data === 'string') {
      throw new Error('bad response');
    }
    const data = response.data.length ? response.data : mockNews;

    dispatch(setSuccessData({ key: 'news', data }));
  } catch (error) {
    dispatch(setErrorData({ key: 'news' }));
    console.error(error);
  }
};
