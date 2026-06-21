import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",

  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  },

  reducers: {
    setUser(state, action) {
      state.user = action.payload;

      if (action.payload) {
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload)
        );
      } else {
        localStorage.removeItem("user");
      }
    },
  },
});

export const { setUser } = profileSlice.actions;

export default profileSlice.reducer;