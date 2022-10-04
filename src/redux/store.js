import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import productReducer from './slices/discountProductsSlice';
import newProductReducer from './slices/newProductsSlice';
import newsReducer from './slices/newsSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    discount: productReducer,
    newProducts: newProductReducer,
    news: newsReducer,
    cart: cartReducer,
  },
});
