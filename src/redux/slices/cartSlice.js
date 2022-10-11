import { createSlice } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/countTotalPrice';

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
      state.totalPrice = calcTotalPrice(state.cartItems);
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
      state.totalPrice = calcTotalPrice(state.cartItems);
      setItemsFunction(
        state.cartItems.map((item) => item),
        state.totalPrice
      );
    },
    removeItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (el) => el.product_id !== action.payload
      );
      state.totalPrice = calcTotalPrice(state.cartItems);
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
