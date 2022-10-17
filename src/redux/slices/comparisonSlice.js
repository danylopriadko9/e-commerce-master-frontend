import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchActualProductsCharacteristicsValue = createAsyncThunk(
  'compare/fetchActualProductsCharacteristicsValue',
  async (product_id) => {
    const { data } = await axios.get(`/compare/${product_id}`);
    console.log(data);
    return data;
  }
);

export const fetchActualCategoryCharacteristics = createAsyncThunk(
  'compare/fetchActualCategoryCharacteristics',
  async (category_id) => {
    console.log(category_id);
    const { data } = await axios.get(`/compare/category/${category_id}`);
    console.log(data);
    return data;
  }
);

const initialState = {
  compartisonProducts: [],
  categories: [],
  resultOfFilter: [],
  actualCategoryCharacteristics: null,
  actualCategoryCharacteristicsStatus: null,
  actualProductsValues: null,
  actualProductsValuesStatus: null,
  error: null,
};

export const compartisonSlice = createSlice({
  name: 'compartison',
  initialState,
  reducers: {
    addCompartisonProduct: (state, action) => {
      console.log(action.payload);
      if (
        !state.compartisonProducts.find((el) => el.url === action.payload.url)
      ) {
        state.compartisonProducts.push(action.payload);
      }

      if (
        !state.categories.find(
          (el) => el.category_id === action.payload.category_id
        )
      ) {
        state.categories.push({
          category_name: action.payload.category_name,
          category_id: action.payload.category_id,
        });
      }
    },
    deleteCompartisonProduct: (state, action) => {
      state.compartisonProducts = state.compartisonProducts.filter(
        (el) => el.url !== action.payload.url
      );
      state.resultOfFilter = state.resultOfFilter.filter(
        (el) => el.url !== action.payload.url
      );
      state.categories = state.compartisonProducts.find(
        (el) => el.category_id === action.payload.category_id
      )
        ? state.categories
        : state.categories.filter(
            (el) => el.category_id !== action.payload.category_id
          );
    },
    setActualProductsCompartison: (state, action) => {
      console.log(action.payload);
      state.resultOfFilter = state.compartisonProducts.filter(
        (el) => el.category_id === action.payload
      );
    },
  },
  extraReducers: {
    //==========================Получение значений характеристик
    [fetchActualProductsCharacteristicsValue.pending]: (state, action) => {
      state.actualProductsValuesStatus = 'loading';
      state.error = null;
    },
    [fetchActualProductsCharacteristicsValue.fulfilled]: (state, action) => {
      state.actualProductsValuesStatus = 'success';
      state.actualProductsValues = {
        ...state.actualProductsValues,
        ...action.payload,
      };
    },
    [fetchActualProductsCharacteristicsValue.rejected]: (state, action) => {
      state.error = 'error';
    },
    //==========================Получение характеристик категории
    [fetchActualCategoryCharacteristics.pending]: (state, action) => {
      state.actualCategoryCharacteristicsStatus = 'loading';
      state.error = null;
    },
    [fetchActualCategoryCharacteristics.fulfilled]: (state, action) => {
      state.actualCategoryCharacteristicsStatus = 'success';
      state.actualCategoryCharacteristics = action.payload;
    },
    [fetchActualCategoryCharacteristics.rejected]: (state, action) => {
      state.actualCategoryCharacteristicsStatus = 'error';
    },
  },
});

export const {
  addCompartisonProduct,
  deleteCompartisonProduct,
  setActualProductsCompartison,
} = compartisonSlice.actions;
export default compartisonSlice.reducer;
