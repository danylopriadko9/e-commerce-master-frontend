import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchActualProduct = createAsyncThunk(
  'product/fetchProduct',
  async (url) => {
    const { data } = await axios(`/product/${url}`);
    return data;
  }
);

export const fetchPhotos = createAsyncThunk(
  'product/fetchPhotos',
  async (id) => {
    const { data } = await axios.get(`/product/photos/${id}`);
    return data;
  }
);

export const fetchReationProducts = createAsyncThunk(
  'product/fetchReationProducts',
  async (id) => {
    const { data } = await axios(`/product/relation_products/${id}`);
    return data;
  }
);

const initialState = {
  actualProduct: [],
  photos: [],
  error: null,
  status: null,
  photoStatus: null,
};

export const productPageSlice = createSlice({
  name: 'productPage',
  initialState,
  extraReducers: {
    // Продукт страницы
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
    // Фото продукта
    [fetchPhotos.pending]: (state, action) => {
      state.photoStatus = 'loading';
      state.error = null;
    },
    [fetchPhotos.fulfilled]: (state, action) => {
      state.photos = action.payload.map((el) => el.filename);
      state.photoStatus = 'success';
    },
    [fetchPhotos.rejected]: (state, action) => {
      state.photoStatus = 'error';
    },
  },
});

export default productPageSlice.reducer;
