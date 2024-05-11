import { VocabularyItems } from "@type/commons/vocabulary";
import initialState from "../initialState";
import { createSlice } from "@reduxjs/toolkit";

const vocabularySlice = createSlice({
  name: "vocabulary",
  initialState: initialState.vocabulary,
  reducers: {
    getVocabulary: (state) => {
      state.loading = true;
    },
    getVocabularySuccess: (state, { payload }) => {
      state.loading = false;
      state.data = JSON.parse(payload);
    },
    getVocabularyError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const vocabularyAction = vocabularySlice.actions;
export default vocabularySlice.reducer;
