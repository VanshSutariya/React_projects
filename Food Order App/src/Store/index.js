import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cart-Slice';
import modalSlice from './cart-action';

const store = configureStore({
  reducer: { cart: cartSlice.reducer, modal: modalSlice.reducer },
});

export default store;
