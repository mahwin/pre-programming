import { AxiosError } from "axios";
import {
  VocabularyItems,
  CategorizedVocabulary,
} from "@type/commons/vocabulary";

interface IVocaState {
  loading: boolean;
  data: VocabularyItems | null;
  error: AxiosError | null;
  categorizedVocabulary: CategorizedVocabulary | null;
}

const initialVocasState: IVocaState = {
  loading: false,
  data: null,
  categorizedVocabulary: null,
  error: null,
};

export { initialVocasState, type IVocaState };
