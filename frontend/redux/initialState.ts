import { initialUserState, IUserState } from "./user/user.dto";
import { initialVocasState, IVocaState } from "./vocas/vocas.dto";
import {
  initialUserVocasState,
  IUserVocasState,
} from "./userVocas/userVocas.dto";

const initialState = {
  user: initialUserState,
  vocas: initialVocasState,
  userVocas: initialUserVocasState,
};

interface IState {
  user: IUserState;
  vocas: IVocaState;
  userVocas: IUserVocasState;
}

export default initialState;
export type { IState };
