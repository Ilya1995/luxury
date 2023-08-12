import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { GeneralState, StateKey } from './types';

const initialState: GeneralState = {
  brands: {
    data: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
  },
  news: {
    data: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
  },
  faqs: {
    data: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
  },
};

export const counterSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setSuccessData: (
      state,
      action: PayloadAction<{ key: StateKey; data: any }>
    ) => {
      state[action.payload.key] = {
        data: action.payload.data,
        isError: false,
        isLoading: false,
        isSuccess: true,
      };
    },
    setErrorData: (state: any, action: PayloadAction<{ key: StateKey }>) => {
      state[action.payload.key] = {
        ...state[action.payload.key],
        isError: true,
        isLoading: false,
        isSuccess: false,
      };
    },
    setLoadingData: (state: any, action: PayloadAction<{ key: StateKey }>) => {
      state[action.payload.key] = {
        ...state[action.payload.key],
        isError: false,
        isLoading: true,
        isSuccess: false,
      };
    },
  },
});

export const { setSuccessData, setErrorData, setLoadingData } =
  counterSlice.actions;

export default counterSlice.reducer;
