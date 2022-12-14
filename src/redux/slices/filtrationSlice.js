import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchCategoryParams = createAsyncThunk(
  'filtration/fetchCategoryParams',
  async (category_url) => {
    const { data } = await axios.get(
      `/category/filter/category/${category_url}`
    );
    return data;
  }
);

const initialState = {
  categoryParams: [],
  categoryValues: [],
  filtretionProducts: [],
  filtretionStatus: null,

  params: {
    params: {},
    brands: [],
  },

  status: null,
  error: null,
};

export const filtrationSlice = createSlice({
  name: 'filtration',
  initialState,
  reducers: {
    changeParams: (state, action) => {
      if (!action.payload.value_id) {
        state.params.params =
          delete state.params.params[action.payload.characteriscic_id];
      } else {
        state.params.params = {
          ...state.params.params,
          [action.payload.characteriscic_id]: [action.payload.value_id],
        };
      }
    },

    changeBrands: (state, action) => {
      if (!action.payload) {
        state.params.brands = state.params.brands.filter(
          (el) => action.payload
        );
      } else {
        state.params.brands = state.params.brands.push(action.payload);
      }
    },
  },
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
  },
});
export const { changeParams, changeBrands } = filtrationSlice.actions;
export default filtrationSlice.reducer;
