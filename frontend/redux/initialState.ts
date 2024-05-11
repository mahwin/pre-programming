import { initialUserState } from "./user/user.dto";
import { initialVocabularyState } from "./vocabulary/vocabulary.dto";
import { initailUserVocabularyState } from "./userVocabulary/userVocabulary.dto";
import { initialCategoriesState } from "./categories/categories.dto";
import { initialClassifiedVocabulary } from "./classifiedVocabulary/classifiedVocabulary.dto";

import { UserVocabularyState } from "./userVocabulary/userVocabulary.dto";
import { VocabularyState } from "./vocabulary/vocabulary.dto";
import { IUserState } from "@type/commons/user";
import { ICategoriesState } from "./categories/categories.dto";
import { ClassifiedVocabularyState } from "./classifiedVocabulary/classifiedVocabulary.dto";

const initialState: IState = {
  user: initialUserState,
  vocabulary: initialVocabularyState,
  userVocabulary: initailUserVocabularyState,
  categories: initialCategoriesState,
  classifiedVocabulary: initialClassifiedVocabulary,
};

interface IState {
  user: IUserState;
  vocabulary: VocabularyState;
  userVocabulary: UserVocabularyState;
  categories: ICategoriesState;
  classifiedVocabulary: ClassifiedVocabularyState;
}

export default initialState;
export type { IState };
