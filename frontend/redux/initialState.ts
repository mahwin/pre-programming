import { initialUserState, IUserState } from "./user/user.dto";
import { initialVocasState, IVocaState } from "./vocas/vocas.dto";

const initialState = {
  user: initialUserState,
  vocas: initialVocasState,
};

interface IState {
  user: IUserState;
  vocas: IVocaState;
}

export default initialState;
export type { IState };
