import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import cartSlice from './cartSlice';

export const fetchReationProductsIds = createAsyncThunk(
  'product/fetchReationProducts',
  async (id) => {
    const { data } = await axios(`/product/properties/id/${id}`);
    return data;
  }
);

const initialState = {
  description: '',
  relationProducts: [],
  error: null,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    addRelationProduct: (state, action) => {
      if (
        !state.relationProducts.find(
          (el) => el.product_id == action.payload.product_id
        )
      ) {
        state.relationProducts = [...state.relationProducts, action.payload];
      }
    },

    deleteRelationProduct: (state, action) => {
      state.relationProducts = state.relationProducts.filter(
        (el) => el.product_id != action.payload
      );
    },
  },
  extraReducers: {
    [fetchReationProductsIds.pending]: (state, action) => {
      state.error = null;
      state.discountProductsStatus = 'loading';
    },
    [fetchReationProductsIds.fulfilled]: (state, action) => {
      state.relationProducts = action.payload;
      state.discountProductsStatus = 'success';
    },
    [fetchReationProductsIds.rejected]: (state, action) => {
      state.discountProductsStatus = 'error';
    },
  },
});

export const { addRelationProduct, deleteRelationProduct } = adminSlice.actions;
export default adminSlice.reducer;
