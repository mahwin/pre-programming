import { AxiosError } from "axios";
import { CategoriesType } from "@type/commons/categories";

type User = {
  id: number;
  userId: number;
};

type UserVocabulary = {
  [category in CategoriesType]: string;
};

interface UserVocabularyState {
  loading: boolean;
  data: null | (User & UserVocabulary);
  error: null | AxiosError;
}

const initailUserVocabularyState: UserVocabularyState = {
  loading: false,
  data: null,
  error: null,
};

export { type UserVocabularyState, initailUserVocabularyState };
