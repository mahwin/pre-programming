import { AxiosError } from "axios";

type CategoriesType =
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

interface Voca {
  frequency: string;
  word: string;
  mean: string;
  category: string;
  level: string;
}

type Vocas = Voca[];

interface IVocaState {
  loading: boolean;
  data: Vocas | null;
  error: null | AxiosError;
}

export { categories };
export type { IVocaState, CategoriesType, Voca, Vocas };
