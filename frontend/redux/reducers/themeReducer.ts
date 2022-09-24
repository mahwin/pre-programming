import { createReducer } from "@reduxjs/toolkit";

export const ThemeReducer = createReducer(
  { isDark: false },
  {
    themeToggle: (state, action) => {
      !state;
    },
  }
);
