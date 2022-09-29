import { createReducer } from "@reduxjs/toolkit";

export const themeReducer = createReducer(
  { isDark: false },
  {
    themeToggle: (state, action) => {
      state.isDark = action.payload;
    },
  }
);
