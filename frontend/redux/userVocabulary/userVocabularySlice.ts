import initialState from "../initialState";
import { createSlice } from "@reduxjs/toolkit";

const userVocabularySlice = createSlice({
  name: "userVocas",
  initialState: initialState.userVocabulary,
  reducers: {
    getUserVocabulary: (state) => {
      state.loading = true;
    },
    getUserVocabularySuccess: (state, { payload }) => {
      state.loading = false;
      state.data = payload.data;
      state.error = null;
    },
    getUserVocabularyError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
      state.data = null;
    },
  },
});

// 정의한 액션과 리듀서를 export
export const userVocabularyActions = userVocabularySlice.actions;
export default userVocabularySlice.reducer;
