import { ClassifiedVocabulary } from "@type/commons/classifiedVocabulary";
import { AxiosError } from "axios";

interface ClassifiedVocabularyState {
  loading: boolean;
  data: ClassifiedVocabulary | null;
  error: AxiosError | null;
}

const initialClassifiedVocabulary: ClassifiedVocabularyState = {
  loading: false,
  data: null,
  error: null,
};

export { initialClassifiedVocabulary, type ClassifiedVocabularyState };
