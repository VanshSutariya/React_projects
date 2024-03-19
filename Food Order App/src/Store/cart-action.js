import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    value: '',
  },
  reducers: {
    showCart(state) {
      state.value = 'cart';
    },
    hideCart(state) {
      state.value = '';
    },
    showCheckout(state) {
      state.value = 'checkout';
    },
    hideCheckout(state) {
      state.value = '';
    },
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice;
