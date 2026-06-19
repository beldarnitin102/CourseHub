import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    total: 0,
    totalItems: 0,
    cart: [],
  },

  reducers: {
    setCart(state, action) {
      state.cart = action.payload;
    },

    setTotal(state, action) {
      state.total = action.payload;
    },

    setTotalItems(state, action) {
      state.totalItems = action.payload;
    },
  },
});

export const {
  setCart,
  setTotal,
  setTotalItems,
} = cartSlice.actions;

export default cartSlice.reducer;