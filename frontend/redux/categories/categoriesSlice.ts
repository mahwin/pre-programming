import initialState from "../initialState";
import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState.categories,
  reducers: {
    getCategories: (state) => {
      state.loading = true;
    },
    getCategoriesSuccess: (state, { payload }) => {
      console.log(payload);
      state.data = payload;
      state.error = null;
      state.loading = false;
    },
    getCategoriesError: (state, { payload }) => {
      state.error = payload.message;
      state.data = null;
      state.loading = false;
    },
  },
});

// 정의한 액션과 리듀서를 export.
export const categoriesActions = categoriesSlice.actions;
export default categoriesSlice.reducer;
