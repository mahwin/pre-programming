import { combineReducers } from "@reduxjs/toolkit";
import vocasReducer from "./vocas/vocasSlice";
import userReducer from "./user/userSlice";
import userVocasReducer from "./userVocas/userVocasSlice";
import themeReducer from "./theme/themeSlice";

import { HYDRATE } from "next-redux-wrapper";
import { IUserState } from "./user/user.dto";
import { IVocaState } from "./vocas/vocas.dto";
import { IUserVocasState } from "./userVocas/userVocas.dto";
import { IThemeState } from "./theme/theme.dto";
import { AnyAction, CombinedState } from "redux";

interface IState {
  user: IUserState;
  vocas: IVocaState;
  userVocas: IUserVocasState;
  theme: IThemeState;
}

const rootReducer = (state: any, action: AnyAction): CombinedState<IState> => {
  switch (action.type) {
    case HYDRATE:
      return { ...action.payload };
    default: {
      const combinedReducer = combineReducers({
        user: userReducer,
        vocas: vocasReducer,
        userVocas: userVocasReducer,
        theme: themeReducer,

        // isDark:
      });
      return combinedReducer(state, action);
    }
  }
};
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
