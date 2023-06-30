import { AxiosError } from "axios";

interface IVocaItem {
  frequency: string;
  word: string;
  mean: string;
}

const categories = [
  "axios",
  "next",
  "react",
  "styledComponents",
  "recoil",
  "reactRedux",
  "reactQuery",
  "reactRouter",
  "tailwindcss",
  "reactHookForm",
];

type CategoryType =
  | "axios"
  | "next"
  | "react"
  | "styledComponents"
  | "recoil"
  | "reactRedux"
  | "reactQuery"
  | "reactRouter"
  | "tailwindcss"
  | "reactHookForm";

type CategoryKey = {
  [key in CategoryType]: string;
};

interface IInfo {
  frequency: string;
  word: string;
  mean: string;
  category?: string;
  level?: string;
}

interface IVoca {
  [key: string]: {
    [key: string]: {
      level: {
        [key: string]: IInfo[];
      };
    };
  };
}

const initialVocasState: IVocaState = {
  loading: false,
  data: null,
  error: null,
};

interface IVocaState {
  loading: boolean;
  data: IVoca | null;
  error: null | AxiosError;
}

const VocaArray = [
  "react",
  "tailwindcss",
  "recoil",
  "next",
  "react-redux",
  "react-query",
  "react-hook-form",
  "styled-components",
  "react-router",
  "axios",
];

type VocasType =
  | "react"
  | "tailwindCss"
  | "recoil"
  | "next"
  | "reactRedux"
  | "reactQuery"
  | "reactHookForm"
  | "styledComponenets"
  | "reactRouter"
  | "axios";

export { VocaArray, initialVocasState };
export type { IVocaState, VocasType, IVoca };
