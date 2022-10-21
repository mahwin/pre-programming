import initialState from "../initialState";
import { createSlice } from "@reduxjs/toolkit";

const vocasSlice = createSlice({
  name: "voca",
  initialState: initialState.vocas,
  reducers: {
    getVoca: (state) => {
      state.loading = true;
    },
    getVocaSuccess: (state, { payload }) => {
      state.data = payload;
      state.loading = false;
    },
    getVocaError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

// 정의한 액션과 리듀서를 export
export const vocasActions = vocasSlice.actions;
export default vocasSlice.reducer;
