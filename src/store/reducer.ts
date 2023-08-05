import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { GeneralState } from './types';

const initialState: GeneralState = {
  brands: {
    data: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
  },
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setSuccessData: (
      state,
      action: PayloadAction<{ key: string; data: any }>
    ) => {
      state[action.payload.key] = {
        data: action.payload.data,
        isError: false,
        isLoading: false,
        isSuccess: true,
      };
    },
    setErrorData: (state, action: PayloadAction<{ key: string }>) => {
      state[action.payload.key] = {
        ...state[action.payload.key],
        isError: true,
        isLoading: false,
        isSuccess: false,
      };
    },
    setLoadingData: (state, action: PayloadAction<{ key: string }>) => {
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
