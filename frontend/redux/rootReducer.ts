import { combineReducers } from "@reduxjs/toolkit";

import vocasReducer from "./vocas/vocasSlice";
import userReducer from "./user/userSlice";
import userVocasReducer from "./userVocas/userVocasSlice";
import titlesReducer from "./titles/titlesSlice";

import { HYDRATE } from "next-redux-wrapper";
import initialState, { IState } from "@redux/initialState";
import { AnyAction } from "redux";

const combinedReducer = combineReducers({
  vocas: vocasReducer,
  titles: titlesReducer,
  user: userReducer,
  userVocas: userVocasReducer,
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
