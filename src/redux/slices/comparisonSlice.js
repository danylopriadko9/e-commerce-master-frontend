import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchActualProductsCharacteristicsValue = createAsyncThunk(
  'compare/fetchActualProductsCharacteristicsValue',
  async (id) => {
    const { data } = await axios.get(`/compare/${id}`);
    return data;
  }
);

const initialState = {
  compartisonProducts: [],
  categories: [],
  resultOfFilter: [],
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

      if (!state.categories.find((el) => el === action.payload.category_name)) {
        state.categories.push(action.payload.category_name);
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
        (el) => el.category_name === action.payload.category_name
      )
        ? state.categories
        : state.categories.filter((el) => el !== action.payload.category_name);
    },
    setActualProductsCompartison: (state, action) => {
      state.resultOfFilter = state.compartisonProducts.filter(
        (el) => el.category_name === action.payload
      );
    },
  },
  extraReducers: {
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
  },
});

export const {
  addCompartisonProduct,
  deleteCompartisonProduct,
  setActualProductsCompartison,
} = compartisonSlice.actions;
export default compartisonSlice.reducer;
