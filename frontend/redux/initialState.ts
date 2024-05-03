import { initialUserState } from "./user/user.dto";
import { initialVocasState } from "./vocas/vocas.dto";
import { initialUserVocasState } from "./userVocas/userVocas.dto";
import { initialTitlesState } from "./titles/titles.dto";

import { IUserVocasState } from "@type/userVoca";
import { IVocaState } from "@type/commons/voca";
import { IUserState } from "@type/commons/user";
import { ITitlesState } from "@type/commons/title";

const initialState: IState = {
  user: initialUserState,
  vocas: initialVocasState,
  userVocas: initialUserVocasState,
  titles: initialTitlesState,
};

interface IState {
  user: IUserState;
  vocas: IVocaState;
  userVocas: IUserVocasState;
  titles: ITitlesState;
}

export default initialState;
export type { IState };
