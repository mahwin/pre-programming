import initialState from "../initialState";
import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: initialState.theme,
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
    },
  },
});

// 정의한 액션과 리듀서를 export.
export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
