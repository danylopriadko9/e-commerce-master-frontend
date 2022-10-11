import { createSlice } from '@reduxjs/toolkit';

const setItemsFunction = (items) => {
  localStorage.setItem('watchedProducts', JSON.stringify(items));
};

const items =
  localStorage.getItem('watchedProducts') !== null
    ? JSON.parse(localStorage.getItem('watchedProducts'))
    : [];

const initialState = {
  watchedProducts: items,
};

export const watchedProductsSlice = createSlice({
  name: 'watcedProducts',
  initialState,
  reducers: {
    addToWachedProducts: (state, action) => {
      if (!state.watchedProducts.find((el) => el.url === action.payload.url)) {
        state.watchedProducts.push(action.payload);
        setItemsFunction(state.watchedProducts.map((item) => item));
      }
    },
  },
});

export const { addToWachedProducts } = watchedProductsSlice.actions;
export default watchedProductsSlice.reducer;
