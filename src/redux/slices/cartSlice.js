import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { calcTotalPrice } from '../../utils/countTotalPrice';

const initialState = {
  cartItems: [],
  showStatus: false,
  totalPrice: 0,
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

      state.totalPrice = calcTotalPrice(state.cartItems);
    },
    addQtyFromItem: (state, action) => {
      state.cartItems.forEach((item) => {
        if (item.product_id === action.payload) {
          item.qty += 1;
        }
      });
      state.totalPrice = calcTotalPrice(state.cartItems);
    },
    subtractQuantityFromItem: (state, action) => {
      state.cartItems.forEach((item) => {
        if (item.product_id === action.payload) {
          item.qty -= 1;
        }
      });
      state.totalPrice = calcTotalPrice(state.cartItems);
    },
    removeItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (el) => el.product_id !== action.payload
      );
      state.totalPrice = calcTotalPrice(state.cartItems);
    },
    totalPriceCounter: (state, action) => {
      state.totalPrice = state.cartItems.reduce((acc, item) => {
        acc += item.base_price * item.qty;
        return acc;
      }, 0);
    },
    handelShowStatus: (state, action) => {
      state.showStatus = !state.showStatus;
    },
  },
});

export const {
  addItemToCart,
  addQtyFromItem,
  subtractQuantityFromItem,
  removeItemFromCart,
  totalPriceCounter,
  handelShowStatus,
} = cartSlice.actions;

export default cartSlice.reducer;
