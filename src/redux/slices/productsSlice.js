import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

const setItemsFunction = (items) => {
  localStorage.setItem('watchedProducts', JSON.stringify(items));
};

const items =
  localStorage.getItem('watchedProducts') !== null
    ? JSON.parse(localStorage.getItem('watchedProducts'))
    : [];

export const fetchNewProducts = createAsyncThunk(
  'newProducts/fetchNewProducts',
  async () => {
    const language = localStorage.getItem('i18nextLng');
    const { data } = await axios.get(`/product/new?lan=${language}`);
    return data;
  }
);

export const fetchDiscountProducts = createAsyncThunk(
  'discountProducts/fetchDiscountProducts',
  async () => {
    const language = localStorage.getItem('i18nextLng');
    const { data } = await axios.get(`/product/discount?lan=${language}`);
    return data;
  }
);

const initialState = {
  //----Новые продукты
  newProducts: [],
  newProductsStatus: null,
  error: null,
  //-----Со скидкой
  discountProducts: [],
  discountProductsStatus: null,
  viewedProducts: [],
  comparisonProducts: [],
  // -----Просмотренные продукты
  watchedProducts: items,
  watchedProductsIds: [],
};

export const productsSlice = createSlice({
  name: 'newProducts',
  initialState,
  reducers: {
    clearProducts: (state, action) => {
      state.discountProducts = [];
      state.newProducts = [];
    },

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
    addToWachedProducts: (state, action) => {
      if (!state.watchedProducts.find((el) => el.url === action.payload.url)) {
        state.watchedProducts.push(action.payload);
        setItemsFunction(state.watchedProducts.map((item) => item));
      }
    },
  },
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
    //---------------- Продукты со скидкой
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
  addToWachedProducts,
  clearProducts,
} = productsSlice.actions;
export default productsSlice.reducer;
