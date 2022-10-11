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
    const { data } = await axios.get(
      `/productCategories/${url.replace('group_', '')}`
    );
    return data;
  }
);

export const getSubcategoriesInformation = createAsyncThunk(
  'category/getSubcategoriesInformation',
  async (id) => {
    const { data } = await axios.get(`/subcategories/${id}`);
    return data;
  }
);

const initialState = {
  categories: [],
  productsCategory: [],
  actualCategory: null,
  actualSubcategories: [],
  actualSubcategoriesPage: [],
  actualSubcategoriesPageStatus: null,
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

    actualSubcategoriesPageClean: (state, action) => {
      state.actualSubcategoriesPage = [];
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
    //================================= getSubcategoriesInformation
    [getSubcategoriesInformation.pending]: (state, action) => {
      state.actualSubcategoriesPageStatus = 'loading';
      state.error = null;
    },
    [getSubcategoriesInformation.fulfilled]: (state, action) => {
      state.actualSubcategoriesPageStatus = 'success';
      state.actualSubcategoriesPage = action.payload;
    },
    [getSubcategoriesInformation.rejected]: (state, action) => {
      state.actualSubcategoriesPageStatus = 'error';
    },
  },
});

export const { searchActualCategory, actualSubcategoriesPageClean } =
  categorySlice.actions;

export default categorySlice.reducer;
