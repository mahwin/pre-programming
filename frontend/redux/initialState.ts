import { initialUserState, IUserState } from "./user/user.dto";
import { initialVocasState, ITmpVocaState } from "./vocas/vocas.dto";

const initialState = {
  user: initialUserState,
  vocas: initialVocasState,
};

interface IState {
  user: IUserState;
  vocas: ITmpVocaState;
}

export default initialState;
export type { IState };
