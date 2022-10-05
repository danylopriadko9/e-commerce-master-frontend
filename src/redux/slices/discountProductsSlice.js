import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchDiscountProducts = createAsyncThunk(
  'discountProducts/fetchDiscountProducts',
  async () => {
    const { data } = await axios.get('/discount');
    return data;
  }
);

const initialState = {
  discountProducts: [],
  discountProductsStatus: null,
  error: null,
  viewedProducts: [],
  comparisonProducts: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addViewedProducts: (state, action) => {
      state.viewedProducts = [...state.viewedProducts, action.payload];
    },
    addComparisonProducts: (state, action) => {
      state.comparisonProducts = [...state.comparisonProducts, action.payload];
    },
    deleteComparisonProducts: (state, action) => {
      state.comparisonProducts = state.comparisonProducts.filter(
        (el) => el.id !== action.payload
      );
    },
  },
  extraReducers: {
    [fetchDiscountProducts.pending]: (state, action) => {
      state.discountProductsStatus = 'loading';
      state.error = null;
    },
    [fetchDiscountProducts.fulfilled]: (state, action) => {
      state.discountProductsStatus = 'success';
      state.discountProducts = action.payload;
    },
    [fetchDiscountProducts.rejected]: (state, action) => {
      state.discountProductsStatus = 'error';
    },
  },
});

export const {
  addViewedProducts,
  addComparisonProducts,
  deleteComparisonProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
