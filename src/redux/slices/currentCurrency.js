import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCurrentCurrency = createAsyncThunk(
  'currency/fetchCurrentCurrency',
  async () => {
    const { data } = await axios.get('https://cdn.cur.su/api/nbu.json');
    return data;
  }
);

const initialState = {
  currency: null,
  status: null,
  error: null,
};

export const currentCurrency = createSlice({
  name: 'currency',
  initialState,
  extraReducers: {
    [fetchCurrentCurrency.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchCurrentCurrency.fulfilled]: (state, action) => {
      state.status = 'success';
      state.currency = action.payload.rates;
    },
    [fetchCurrentCurrency.rejected]: (state, action) => {
      state.status = 'error';
    },
  },
});

export default currentCurrency.reducer;
