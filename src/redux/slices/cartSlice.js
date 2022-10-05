import { createSlice } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/countTotalPrice';

const initialState = {
  cartItems: [],
  showStatus: false,
  totalPrice: 0,
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
