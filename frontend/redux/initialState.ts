import { initialUserState } from "./user/user.dto";
import { initialVocabularyState } from "./vocabulary/vocabulary.dto";
import { initialUserVocasState } from "./userVocas/userVocas.dto";
import { initialCategoriesState } from "./categories/categories.dto";
import { initialClassifiedVocabulary } from "./classifiedVocabulary/classifiedVocabulary.dto";

import { IUserVocasState } from "@type/userVoca";
import { VocabularyState } from "./vocabulary/vocabulary.dto";
import { IUserState } from "@type/commons/user";
import { ICategoriesState } from "./categories/categories.dto";
import { ClassifiedVocabularyState } from "./classifiedVocabulary/classifiedVocabulary.dto";

const initialState: IState = {
  user: initialUserState,
  vocabulary: initialVocabularyState,
  userVocas: initialUserVocasState,
  categories: initialCategoriesState,
  classifiedVocabulary: initialClassifiedVocabulary,
};

interface IState {
  user: IUserState;
  vocabulary: VocabularyState;
  userVocas: IUserVocasState;
  categories: ICategoriesState;
  classifiedVocabulary: ClassifiedVocabularyState;
}

export default initialState;
export type { IState };
