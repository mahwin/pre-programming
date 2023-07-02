import { AxiosError } from "axios";

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

export { VocaArray, initialVocasState };
export type { IVocaState, VocasType, IVoca };
