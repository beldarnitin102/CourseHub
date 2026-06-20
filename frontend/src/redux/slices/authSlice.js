import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Read the string directly without using JSON.parse
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      // Good practice: Keep localStorage in sync when setting the token
      localStorage.setItem("token", action.payload);
    },
    logout(state) {
      state.token = null;
      // Good practice: Clear localStorage on logout
      localStorage.removeItem("token");
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;