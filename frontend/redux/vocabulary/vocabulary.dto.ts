import { AxiosError } from "axios";
import {
  VocabularyItems,
  CategorizedVocabulary,
} from "@type/commons/vocabulary";

interface VocabularyState {
  loading: boolean;
  data: VocabularyItems | null;
  error: AxiosError | null;
}

// const initialVocasState: IVocaState = {
//   loading: false,
//   data: null,
//   categorizedVocabulary: null,
//   error: null,
// };

// interface IVocaState {
//   loading: boolean;
//   data: VocabularyItems | null;
//   error: AxiosError | null;
//   categorizedVocabulary: CategorizedVocabulary | null;
// }

const initialVocabularyState: VocabularyState = {
  loading: false,
  data: null,
  error: null,
};

export { initialVocabularyState, type VocabularyState };
