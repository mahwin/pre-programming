import initialState from "../initialState";
import { createSlice } from "@reduxjs/toolkit";

const classifiedVocabularySlice = createSlice({
  name: "classifedVocabulary",
  initialState: initialState.classifiedVocabulary,
  reducers: {
    getClassifiedVocabulary: (state) => {
      state.loading = true;
    },
    getClassifiedVocabularySuccess: (state, { payload }) => {
      state.data = JSON.parse(payload.data);
      state.error = null;
      state.loading = false;
    },
    getClassifiedVocabularyError: (state, { payload }) => {
      state.error = payload.message;
      state.data = null;
      state.loading = false;
    },
  },
});

// 정의한 액션과 리듀서를 export.
export const classifiedVocabularyActions = classifiedVocabularySlice.actions;
export default classifiedVocabularySlice.reducer;
