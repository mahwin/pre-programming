import { AxiosError } from "axios";
import { CategoriesType } from "@type/commons/categories";

type User = {
  id: number;
  userId: number;
};

type UserVocabulary = {
  [category in CategoriesType]: [];
};

interface UserVocabularyState {
  loading: boolean;
  data: null | UserVocabulary;
  error: null | AxiosError;
}

const initailUserVocabularyState: UserVocabularyState = {
  loading: false,
  data: null,
  error: null,
};

export type { UserVocabularyState, UserVocabulary };
export { initailUserVocabularyState };
