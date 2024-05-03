import initialState from "../initialState";
import { createSlice } from "@reduxjs/toolkit";

const titlesSlice = createSlice({
  name: "titles",
  initialState: initialState.titles,
  reducers: {
    getTitles: (state) => {
      state.loading = true;
    },
    getTitlesSuccess: (state, { payload }) => {
      console.log(payload, "??");
      state.data = payload;
      state.error = null;
      state.loading = false;
    },
    getTitlesError: (state, { payload }) => {
      state.error = payload.message;
      state.data = null;
      state.loading = false;
    },
  },
});

// 정의한 액션과 리듀서를 export.
export const titlesActions = titlesSlice.actions;
export default titlesSlice.reducer;
