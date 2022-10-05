import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchActualProduct = createAsyncThunk(
  'product/fetchProduct',
  async (url) => {
    console.log(url);
    const { data } = await axios(`/product/${url}`);
    console.log(data);
    return data;
  }
);

const initialState = {
  actualProduct: null,
  error: null,
  status: null,
};

export const productPageSlice = createSlice({
  name: 'productPage',
  initialState,
  extraReducers: {
    [fetchActualProduct.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchActualProduct.fulfilled]: (state, action) => {
      state.actualProduct = action.payload;
      state.status = 'success';
    },
    [fetchActualProduct.rejected]: (state, action) => {
      state.status = 'error';
    },
  },
});

export default productPageSlice.reducer;
