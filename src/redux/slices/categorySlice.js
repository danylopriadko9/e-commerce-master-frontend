import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchCategories = createAsyncThunk(
  'category/fetchCategories', // name
  async () => {
    const { data } = await axios.get('/categories');
    return data;
  }
);

const initialState = {
  categories: [],
  actualCategory: null,
  actualSubcategories: [],
  status: null,
  error: null,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    searchActualCategory: (state, action) => {
      state.actualSubcategories = state.categories.filter(
        (el) => el.parent_id === action.payload
      );
      state.actualCategory = state.categories.filter(
        (el) => el.id === action.payload
      )[0].name;
    },
  },
  extraReducers: {
    [fetchCategories.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    }, // loading
    [fetchCategories.fulfilled]: (state, action) => {
      state.status = 'success';
      state.categories = action.payload; // saving the categories in state
    }, // success
    [fetchCategories.rejected]: (state, action) => {
      state.status = 'error';
    }, // error
  },
});

export const { searchActualCategory } = categorySlice.actions;

export default categorySlice.reducer;
