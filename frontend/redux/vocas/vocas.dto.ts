import { AxiosError } from "axios";

interface IVoca {
  id: number;
  frequency: number;
  word: string;
  category: string;
  level: number;
  mean: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IVocas {
  vocas: {
    react: { data: IVoca[] | null };
    tailwindCss: { data: IVoca[] | null };
    recoil: { data: IVoca[] | null };
    next: { data: IVoca[] | null };
    reactRedux: { data: IVoca[] | null };
    reactQuery: { data: IVoca[] | null };
    reactHookForm: { data: IVoca[] | null };
    styledComponenets: { data: IVoca[] | null };
    reactRouter: { data: IVoca[] | null };
    axios: { data: IVoca[] | null };
  };
}

interface IVocaState {
  error: AxiosError | null;
  data: IVocas;
}

const initialVocasState = {
  react: { data: null },
  tailwindCss: { data: null },
  recoil: { data: null },
  next: { data: null },
  reactRedux: { data: null },
  reactQuery: { data: null },
  reactHookForm: { data: null },
  styledComponenets: { data: null },
  reactRouter: { data: null },
  axios: { data: null },
};

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

export { initialVocasState, VocaArray };
export type { IVocas, IVocaState, VocasType, IVoca };
