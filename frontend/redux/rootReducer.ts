import { combineReducers } from "@reduxjs/toolkit";

import vocasReducer from "./vocabulary/vocabularySlice";
import userReducer from "./user/userSlice";
import userVocabularyReducer from "./userVocabulary/userVocabularySlice";
import categoriesReducer from "./categories/categoriesSlice";
import classfiedVocaReducer from "./classifiedVocabulary/classifiedVocabularySlice";

import { HYDRATE } from "next-redux-wrapper";
import initialState, { IState } from "@redux/initialState";
import { AnyAction } from "redux";

const combinedReducer = combineReducers({
  vocabulary: vocasReducer,
  classifiedVocabulary: classfiedVocaReducer,
  categories: categoriesReducer,
  user: userReducer,
  userVocabulary: userVocabularyReducer,
});

const rootReducer = (
  state: IState = initialState,
  action: AnyAction
): IState => {
  switch (action.type) {
    case HYDRATE:
      return { ...action.payload };
    default: {
      return combinedReducer(state, action);
    }
  }
};
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
