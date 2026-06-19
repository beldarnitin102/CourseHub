import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",

  initialState: {
    course: null,
    editCourse: false,
  },

  reducers: {
    setCourse(state, action) {
      state.course = action.payload;
    },

    setEditCourse(state, action) {
      state.editCourse = action.payload;
    },
  },
});

export const {
  setCourse,
  setEditCourse,
} = courseSlice.actions;

export default courseSlice.reducer;