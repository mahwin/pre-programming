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
      const vocas = JSON.parse(payload.data) as VocabularyItems;
      state.loading = false;
      state.data = vocas;
    },
    getVocabularyError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const vocasActions = vocabularySlice.actions;
export default vocabularySlice.reducer;
