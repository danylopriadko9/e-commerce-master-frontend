import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import newsReducer from './slices/newsSlice';
import cartReducer from './slices/cartSlice';
import productPageReducer from './slices/productPageSlice';
import historyMapReducer from './slices/historyMap';
import compartisonReducer from './slices/comparisonSlice';
import searchReducer from './slices/searchSlice';
import filtrationReducer from './slices/filtrationSlice';
import productsReducer from './slices/productsSlice';
import adminReducer from './slices/adminSlice';
import languageReducer from './slices/languageSlice';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    news: newsReducer,
    cart: cartReducer,
    actualProduct: productPageReducer,
    history: historyMapReducer,
    compartison: compartisonReducer,
    search: searchReducer,
    filter: filtrationReducer,
    products: productsReducer,
    admin: adminReducer,
    language: languageReducer,
  },
});

export default store;
