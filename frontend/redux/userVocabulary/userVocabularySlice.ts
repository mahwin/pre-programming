import initialState from "../initialState";
import { createSlice } from "@reduxjs/toolkit";
import { CATEGORIES } from "@type/commons/categories";
import { UserVocabulary } from "@redux/userVocabulary/userVocabulary.dto";
import { isNil } from "utils/typeGuard";
import { CategoriesType } from "@type/commons/categories";

type Payload = {
  [category in CategoriesType]: string;
};
function 전처리(payload: Payload) {
  const newPayload: Partial<UserVocabulary> = {};
  CATEGORIES.forEach((category) => {
    if (isNil(payload[category])) {
      newPayload[category] = [];
    } else {
      newPayload[category] = JSON.parse(payload[category]);
    }
  });
  return newPayload as UserVocabulary;
}

const userVocabularySlice = createSlice({
  name: "userVocabulary",
  initialState: initialState.userVocabulary,
  reducers: {
    getUserVocabulary: (state) => {
      state.loading = true;
    },
    getUserVocabularySuccess: (state, { payload }) => {
      state.loading = false;
      state.data = 전처리(payload);
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
