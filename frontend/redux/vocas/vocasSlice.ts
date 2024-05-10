import {
  VocabularyItems,
  CategorizedVocabulary,
} from "@type/commons/vocabulary";
import initialState from "../initialState";
import { createSlice } from "@reduxjs/toolkit";
import { isNil } from "@utils/typeGuard/isNil";

function classifiedVoca(vocas: VocabularyItems) {
  const classifiedData: CategorizedVocabulary = {};

  vocas.forEach(({ category, ...res }) => {
    if (isNil(classifiedData[category])) {
      classifiedData[category] = {};
    }
    if (isNil(classifiedData[category]![res.level])) {
      classifiedData[category]![res.level] = [];
    }
    classifiedData[category]![res.level].push({ category, ...res });
  });
  return classifiedData;
}

const vocasSlice = createSlice({
  name: "vocas",
  initialState: initialState.vocas,
  reducers: {
    getVocas: (state) => {
      state.loading = true;
    },
    getVocasSuccess: (state, { payload }) => {
      const vocas = JSON.parse(payload.data) as VocabularyItems;
      state.loading = false;
      state.data = vocas;
      state.categorizedVocabulary = classifiedVoca(vocas);
    },
    getVocasError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const vocasActions = vocasSlice.actions;
export default vocasSlice.reducer;
