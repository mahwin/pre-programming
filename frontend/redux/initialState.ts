import { initialUserState } from "./user/user.dto";
import { initialVocasState } from "./vocas/vocas.dto";
import { initialUserVocasState } from "./userVocas/userVocas.dto";
import { IUserVocasState } from "@type/userVoca";
import { IVocaState } from "@type/commons/voca";
import { IUserState } from "@type/commons/user";

const initialState: IState = {
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
