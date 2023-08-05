import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

import { Brand, Response } from './types';
import { setSuccessData, setErrorData, setLoadingData } from './reducer';
import { data as mockBrands } from '../components/BrandsCarousel/constants';

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
