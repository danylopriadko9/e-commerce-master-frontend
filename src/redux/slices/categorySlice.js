import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchCategories = createAsyncThunk(
  'category/fetchCategories', // name
  async () => {
    const { data } = await axios.get('/categories');
    return data;
  }
);

export const fetchProductsCategory = createAsyncThunk(
  'category/fetchProducsCategory',
  async (url) => {
    console.log(url.replace('group_', ''));
    const { data } = await axios.get(
      `/productCategories/${url.replace('group_', '')}`
    );
    console.log(data);
    return data;
  }
);

const initialState = {
  categories: [],
  productsCategory: [],
  actualCategory: null,
  actualSubcategories: [],
  status: null,
  productsCategoryStatus: null,
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
    //================================== DropDown Categories
    [fetchCategories.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.status = 'success';
      state.categories = action.payload;
    },
    [fetchCategories.rejected]: (state, action) => {
      state.status = 'error';
    },
    //================================== Products Category
    [fetchProductsCategory.pending]: (state, action) => {
      state.productsCategoryStatus = 'loading';
      state.error = null;
    },
    [fetchProductsCategory.fulfilled]: (state, action) => {
      state.productsCategoryStatus = 'success';
      state.productsCategory = action.payload;
    },
    [fetchProductsCategory.rejected]: (state, action) => {
      state.status = 'error';
    },
  },
});

export const { searchActualCategory } = categorySlice.actions;

export default categorySlice.reducer;
