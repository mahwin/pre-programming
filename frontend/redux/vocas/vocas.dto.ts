import { AxiosError } from "axios";
import { IVocas } from "@type/commons/voca";

interface IVocaState {
  loading: boolean;
  data: IVocas | null;
  error: null | AxiosError;
}

const initialVocasState: IVocaState = {
  loading: false,
  data: null,
  error: null,
};

export { initialVocasState };
