import { createSlice } from "@reduxjs/toolkit";

// 1. Get data from localStorage first
const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

// 2. Pass it cleanly into your Redux slice
const cartSlice = createSlice({
  name: "cart",

  initialState: {
    total: 0,
    totalItems: savedCart.length,
    cart: savedCart,
  },

  reducers: {
    setCart(state, action) {
      state.cart = action.payload;
      // Pro-tip: Keep localStorage synced when cart changes
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    setTotal(state, action) {
      state.total = action.payload;
    },

    setTotalItems(state, action) {
      state.totalItems = action.payload;
    },
  },
});

export const { setCart, setTotal, setTotalItems } = cartSlice.actions;

export default cartSlice.reducer;
