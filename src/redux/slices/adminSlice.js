import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchReationProductsIds = createAsyncThunk(
  'admin/fetchReationProducts',
  async (id) => {
    const { data } = await axios(`/product/properties/id/${id}`);
    return data;
  }
);

export const fetchProductPhotos = createAsyncThunk(
  'admin/fetchProductPhotos',
  async (id) => {
    const { data } = await axios.get(`/product/photos/${id}`);
    return data;
  }
);

export const fetchManufacturers = createAsyncThunk(
  'admin/fetchManufacturers',
  async () => {
    const { data } = await axios.get('/product/manufacturers');
    const result = data.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }
);

export const fetchProduct = createAsyncThunk(
  'admin/fetchProduct',
  async (id) => {
    const { data } = await axios.get(`/product/id/${id}`);
    return data[0];
  }
);

export const fetchCategoryCharacteristics = createAsyncThunk(
  'admin/fetchCategoryCharacteristics',
  async (category_id) => {
    const { data } = await axios.get(
      `/category/characteristics/id/${category_id}`
    );
    return data;
  }
);

export const fetchProductCharacteristicsValues = createAsyncThunk(
  'admin/fetchProductCharacteristicsValues',
  async (id) => {
    const { data } = await axios.get(`/product/compare/${id}`);
    return data[id];
  }
);

const initialState = {
  product: {
    product_name: '',
    url: '',
    base_price: null,
    discount_percent: null,
    currency_id: 1,
    description: '',
    meta_description: '',
    meta_title: '',
    meta_keywords: '',
    category_id: 0,
    guarantee: null,
    manufacturer_id: null,
    category_url: '',
  },
  relationProducts: [],
  productPhotos: [],
  manufacturers: [],
  categoryCharacteristics: [],
  productCharacteristicsValues: [],
  error: null,
  photosStatus: null,
  relationStatus: null,
  manufacturersStatus: null,
  productStatus: null,
  categoryCharacteristicsStatus: null,
  productCharacteristicsValuesStatus: null,
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

    deletePhoto: (state, action) => {
      state.productPhotos = state.productPhotos.filter(
        (file) => file.filename !== action.payload
      );
    },

    changeProductInformtion: (state, action) => {
      state.product = {
        ...state.product,
        [action.payload.key]: action.payload.value,
      };
    },

    changeProductDescription: (state, action) => {
      state.product = { ...state.product, description: action.payload.value };
    },
  },
  extraReducers: {
    // ---------- get relation products
    [fetchReationProductsIds.pending]: (state, action) => {
      state.error = null;
      state.relationStatus = 'loading';
    },
    [fetchReationProductsIds.fulfilled]: (state, action) => {
      state.relationProducts = action.payload;
      state.relationStatus = 'success';
    },
    [fetchReationProductsIds.rejected]: (state, action) => {
      state.relationStatus = 'error';
    },
    // ---------- get product photos
    [fetchProductPhotos.pending]: (state, action) => {
      state.error = null;
      state.photosStatus = 'loading';
    },
    [fetchProductPhotos.fulfilled]: (state, action) => {
      state.productPhotos = action.payload;
      state.photosStatus = 'success';
    },
    [fetchProductPhotos.rejected]: (state, action) => {
      state.photosStatus = 'error';
    },
    // ---------- get products manufacturers
    [fetchManufacturers.pending]: (state, action) => {
      state.error = null;
      state.manufacturersStatus = 'loading';
    },
    [fetchManufacturers.fulfilled]: (state, action) => {
      state.manufacturers = action.payload;
      state.manufacturersStatus = 'success';
    },
    [fetchManufacturers.rejected]: (state, action) => {
      state.manufacturersStatus = 'error';
    },
    // ---------- get product information
    [fetchProduct.pending]: (state, action) => {
      state.error = null;
      state.productStatus = 'loading';
    },
    [fetchProduct.fulfilled]: (state, action) => {
      state.product = action.payload;
      state.productStatus = 'success';
    },
    [fetchProduct.rejected]: (state, action) => {
      state.productStatus = 'error';
    },
    // ---------- get category characteristics
    [fetchCategoryCharacteristics.pending]: (state, action) => {
      state.error = null;
      state.categoryCharacteristicsStatus = 'loading';
    },
    [fetchCategoryCharacteristics.fulfilled]: (state, action) => {
      state.categoryCharacteristics = action.payload;
      state.categoryCharacteristicsStatus = 'success';
    },
    [fetchCategoryCharacteristics.rejected]: (state, action) => {
      state.categoryCharacteristicsStatus = 'error';
    },
    // ---------- get product characteristics values
    [fetchProductCharacteristicsValues.pending]: (state, action) => {
      state.error = null;
      state.productCharacteristicsValuesStatus = 'loading';
    },
    [fetchProductCharacteristicsValues.fulfilled]: (state, action) => {
      state.productCharacteristicsValues = action.payload;
      state.productCharacteristicsValuesStatus = 'success';
    },
    [fetchProductCharacteristicsValues.rejected]: (state, action) => {
      state.productCharacteristicsValuesStatus = 'error';
    },
  },
});

export const {
  addRelationProduct,
  deleteRelationProduct,
  deletePhoto,
  changeProductInformtion,
  changeProductDescription,
} = adminSlice.actions;
export default adminSlice.reducer;
