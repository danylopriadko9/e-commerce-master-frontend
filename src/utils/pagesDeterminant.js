import { fetchActualProduct } from '../redux/slices/productPageSlice';
import store from '../redux/store.js';

export const determinantFunction = (url) => {
  if (url.includes('tovar_')) {
    store.dispatch(fetchActualProduct(url.replace('tovar_', '')));
    return 'tovar';
  }
};
