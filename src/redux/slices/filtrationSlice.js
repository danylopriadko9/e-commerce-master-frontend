import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchCategoryParams = createAsyncThunk(
  'filtration/fetchCategoryParams',
  async (category_url) => {
    const { data } = await axios.get(`/filter/category/${category_url}`);
    return data;
  }
);

export const postFiltrationParams = createAsyncThunk(
  'filtration/fetchCategoryParams',
  async (params) => {
    const { data } = await axios.post('/filter/post', {
      params,
    });
    return data;
  }
);

const initialState = {
  categoryParams: [],
  categoryValues: [],
  filtretionProducts: [],
  filtretionStatus: null,
  status: null,
  error: null,
};

export const filtrationSlice = createSlice({
  name: 'filtration',
  initialState,
  extraReducers: {
    // ---------------- get filtretion params
    [fetchCategoryParams.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchCategoryParams.fulfilled]: (state, action) => {
      state.status = 'success';
      state.categoryParams = action.payload.characteriscics;
      state.categoryValues = action.payload.values;
    },
    [fetchCategoryParams.rejected]: (state, action) => {
      state.status = 'error';
    },
    // [postFiltrationParams.pending]: (state, action) => {
    //   state.filtretionStatus = 'loading';
    // },
    // [postFiltrationParams.fulfilled]: (state, action) => {
    //   state.filtretionProducts = action.payload;
    //   state.filtretionStatus = 'success';
    // },
    // [postFiltrationParams.rejected]: (state, action) => {
    //   state.error = 'error';
    // },
  },
});

export default filtrationSlice.reducer;
