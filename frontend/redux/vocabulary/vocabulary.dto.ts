import { AxiosError } from "axios";
import { VocabularyItems } from "@type/commons/vocabulary";

interface VocabularyState {
  loading: boolean;
  data: VocabularyItems | null;
  error: AxiosError | null;
}

const initialVocabularyState: VocabularyState = {
  loading: false,
  data: null,
  error: null,
};

export { initialVocabularyState, type VocabularyState };
