import { initialUserState, IUserState } from "./user/user.dto";
import { initialVocasState, IVocaState } from "./vocas/vocas.dto";
import {
  initialUserVocasState,
  IUserVocasState,
} from "./userVocas/userVocas.dto";
import { initialThemeState, IThemeState } from "./theme/theme.dto";

const initialState = {
  theme: initialThemeState,
  user: initialUserState,
  vocas: initialVocasState,
  userVocas: initialUserVocasState,
};

interface IState {
  theme: IThemeState;
  user: IUserState;
  vocas: IVocaState;
  userVocas: IUserVocasState;
}

export default initialState;
export type { IState };
