import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchNewProducts = createAsyncThunk(
  'newProducts/fetchNewProducts',
  async () => {
    const { data } = await axios.get('/product/newProducts');
    return data;
  }
);

const initialState = {
  newProducts: [],
  newProductsStatus: null,
  error: null,
};

export const newProductsSlice = createSlice({
  name: 'newProducts',
  initialState,
  extraReducers: {
    // ----------------- New Products
    [fetchNewProducts.pending]: (state, action) => {
      state.error = null;
      state.newProductsStatus = 'loading';
    },
    [fetchNewProducts.fulfilled]: (state, action) => {
      state.newProducts = action.payload;
      state.newProductsStatus = 'success';
    },
    [fetchNewProducts.rejected]: (state, action) => {
      state.error = 'error';
      state.newProductsStatus = 'error';
    },
  },
});

export default newProductsSlice.reducer;
