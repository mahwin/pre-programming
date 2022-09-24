import { createReducer } from "@reduxjs/toolkit";
import { themeToggle } from "../actions/index";

export const themeReducer = createReducer(
  { isDark: false },
  {
    themeToggle: (state, action) => {
      state.isDark = action.payload;
    },
  }
);
