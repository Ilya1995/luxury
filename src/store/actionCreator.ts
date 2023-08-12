import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

import { Brand, Faq, News, Response } from './types';
import { setSuccessData, setErrorData, setLoadingData } from './reducer';
import { data as mockBrands } from '../components/BrandsCarousel/constants';
import { data as mockNews } from '../components/News/constants';
import { data as mockFaqs } from '../components/FAQ/constants';

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
    const data = response.data.content.length
      ? response.data.content
      : mockBrands;

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
    const data = response.data.content.length
      ? response.data.content
      : mockNews;

    dispatch(setSuccessData({ key: 'news', data }));
  } catch (error) {
    dispatch(setErrorData({ key: 'news' }));
    console.error(error);
  }
};

export const getFaqs = async (dispatch: Dispatch<AnyAction>) => {
  dispatch(setLoadingData({ key: 'faqs' }));

  try {
    const response: Response<Faq[]> = await axios.get('/faq');
    if (response.status !== 200 || typeof response.data === 'string') {
      throw new Error('bad response');
    }
    const data = response.data.content.length
      ? response.data.content
      : mockFaqs;

    dispatch(setSuccessData({ key: 'faqs', data }));
  } catch (error) {
    dispatch(setErrorData({ key: 'faqs' }));
    console.error(error);
  }
};

export const sendEmail = (email: string) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/email-subscription', { email })
      .then((response) => {
        if (response.status !== 200 || typeof response.data === 'string') {
          reject();
        } else {
          resolve('ok');
        }
      })
      .catch(reject);
  });
};
