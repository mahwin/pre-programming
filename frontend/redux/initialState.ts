import { initialUserState } from "./user/user.dto";
import { initialVocasState } from "./vocas/vocas.dto";
import { initialUserVocasState } from "./userVocas/userVocas.dto";
import { initialCategoriesState } from "./categories/categories.dto";

import { IUserVocasState } from "@type/userVoca";
import { IVocaState } from "./vocas/vocas.dto";
import { IUserState } from "@type/commons/user";
import { ICategoriesState } from "./categories/categories.dto";

const initialState: IState = {
  user: initialUserState,
  vocas: initialVocasState,
  userVocas: initialUserVocasState,
  categories: initialCategoriesState,
};

interface IState {
  user: IUserState;
  vocas: IVocaState;
  userVocas: IUserVocasState;
  categories: ICategoriesState;
}

export default initialState;
export type { IState };
