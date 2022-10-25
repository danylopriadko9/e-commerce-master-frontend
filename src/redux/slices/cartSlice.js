import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { calcTotalPrice } from '../../utils/countTotalPrice';

export const fetchCurrentCurrency = createAsyncThunk(
  'cart/fetchCurrentCurrency',
  async () => {
    const { data } = await axios.get(
      'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11'
    );

    const result = data
      .map((el) => (el.ccy === 'RUR' ? { ...el, ccy: 'RUB' } : el))
      .filter((el) => el.ccy !== 'BTC');

    return [
      ...result,
      {
        ccy: 'UAH',
        base_ccy: 'UAH',
        buy: '1',
        sale: '1',
      },
    ];
  }
);

// base_ccy: 'UAH';
// buy: '36.56860';
// ccy: 'USD';
// sale: '37.45318';

const setItemsFunction = (items, totalPrice) => {
  localStorage.setItem('cartItems', JSON.stringify(items));
  localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
};

const items =
  localStorage.getItem('cartItems') !== null
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

const totalPrice =
  localStorage.getItem('totalPrice') !== null
    ? JSON.parse(localStorage.getItem('totalPrice'))
    : 0;

const initialState = {
  cartItems: items,
  totalPrice: totalPrice,
  showStatus: false,
  popupStatus: 'cart',
  currency: null,
  currencyStatus: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      if (
        state.cartItems.find(
          (el) => el.product_id === action.payload.product_id
        )
      ) {
        state.cartItems.forEach((item) => {
          if (item.product_id === action.payload.product_id) item.qty += 1;
        });
      } else {
        state.cartItems.push(action.payload);
      }

      state.totalPrice = calcTotalPrice(state.cartItems, state.currency);
      setItemsFunction(
        state.cartItems.map((item) => item),
        state.totalPrice
      );
    },
    addQtyFromItem: (state, action) => {
      state.cartItems.forEach((item) => {
        if (item.product_id === action.payload) {
          item.qty += 1;
        }
      });
      state.totalPrice = calcTotalPrice(state.cartItems, state.currency);
      setItemsFunction(
        state.cartItems.map((item) => item),
        state.totalPrice
      );
    },
    subtractQuantityFromItem: (state, action) => {
      state.cartItems.forEach((item) => {
        if (item.product_id === action.payload) {
          item.qty -= 1;
        }
      });
      state.totalPrice = calcTotalPrice(state.cartItems, state.currency);
      setItemsFunction(
        state.cartItems.map((item) => item),
        state.totalPrice
      );
    },
    removeItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (el) => el.product_id !== action.payload
      );
      state.totalPrice = calcTotalPrice(state.cartItems, state.currency);
      setItemsFunction(
        state.cartItems.map((item) => item),
        state.totalPrice
      );
    },
    handelShowStatus: (state, action) => {
      state.showStatus = !state.showStatus;
    },
    handlePopupStatus: (state, action) => {
      state.popupStatus = action.payload; // cart | ofer
    },
  },
  extraReducers: {
    [fetchCurrentCurrency.pending]: (state, action) => {
      state.currencyStatus = 'loading';
      state.error = null;
    },
    [fetchCurrentCurrency.fulfilled]: (state, action) => {
      state.currencyStatus = 'success';
      state.currency = action.payload;
    },
    [fetchCurrentCurrency.rejected]: (state, action) => {
      state.currencyStatus = 'error';
    },
  },
});

export const {
  addItemToCart,
  addQtyFromItem,
  subtractQuantityFromItem,
  removeItemFromCart,
  handelShowStatus,
  handlePopupStatus,
} = cartSlice.actions;

export default cartSlice.reducer;
