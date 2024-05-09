import { AxiosError } from "axios";
import { Vocas } from "@type/commons/voca";

interface IVocaState {
  loading: boolean;
  data: Vocas | null;
  error: null | AxiosError;
}

const initialVocasState: IVocaState = {
  loading: false,
  data: null,
  error: null,
};

export { initialVocasState };
