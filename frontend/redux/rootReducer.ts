import { combineReducers } from "@reduxjs/toolkit";
import vocasReducer from "./vocas/vocasSlice";
import userReducer from "./user/userSlice";
import { HYDRATE } from "next-redux-wrapper";
import { IUserState } from "./user/user.dto";
import { ITmpVocaState } from "./vocas/vocas.dto";
import { AnyAction, CombinedState } from "redux";

interface IState {
  user: IUserState;
  vocas: ITmpVocaState;
}

const rootReducer = (state: any, action: AnyAction): CombinedState<IState> => {
  switch (action.type) {
    case HYDRATE:
      return { ...action.payload };
    default: {
      const combinedReducer = combineReducers({
        user: userReducer,
        vocas: vocasReducer,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
