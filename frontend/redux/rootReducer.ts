import { combineReducers } from "@reduxjs/toolkit";
import vocasReducer from "./vocas/vocasSlice";
import userReducer from "./user/userSlice";
import userVocasReducer from "./userVocas/userVocasSlice";
import { HYDRATE } from "next-redux-wrapper";
import { IState } from "@redux/initialState";
import { AnyAction, CombinedState } from "redux";

const rootReducer = (state: any, action: AnyAction): CombinedState<IState> => {
  switch (action.type) {
    case HYDRATE:
      return { ...action.payload };
    default: {
      const combinedReducer = combineReducers({
        user: userReducer,
        vocas: vocasReducer,
        userVocas: userVocasReducer,
      });
      return combinedReducer(state, action);
    }
  }
};
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
