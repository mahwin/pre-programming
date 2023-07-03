import { AxiosError } from "axios";

type categoriesType =
  | "next"
  | "react"
  | "reactHookForm"
  | "reactQuery"
  | "reactRedux"
  | "reactRouter"
  | "recoil"
  | "styledComponents"
  | "tailwindcss"
  | "axios";

const categories = [
  "next",
  "react",
  "reactHookForm",
  "reactQuery",
  "reactRedux",
  "reactRouter",
  "recoil",
  "styledComponents",
  "tailwindcss",
  "axios",
];

interface IVoca {
  frequency: string;
  word: string;
  mean: string;
  category?: string;
  level?: string;
}

interface IVocas {
  [key: string]: {
    [key: string]: {
      level: {
        [key: string]: IVoca[];
      };
    };
  };
}

interface IVocaState {
  loading: boolean;
  data: IVocas | null;
  error: null | AxiosError;
}

export { categories };
export type { IVocaState, categoriesType, IVocas, IVoca };
