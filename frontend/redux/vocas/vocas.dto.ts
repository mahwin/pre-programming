import { AxiosError } from "axios";

interface IVoca {
  id: number;
  frequency: number;
  word: string;
  category: string;
  level: string;
  mean: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IVocasState {
  loading: boolean;
  data: IVoca[] | null;
  error: AxiosError | null;
}

const initialVocasState: IVocasState = {
  loading: false,
  data: null,
  error: null,
};

// interface IVocas {
//   react: { ok: boolean; data: null | IVoca[]; loading: boolean };
//   tailwindCss: { ok: boolean; data: null | IVoca[]; loading: boolean };
//   recoil: { ok: boolean; data: null | IVoca[]; loading: boolean };
//   next: { ok: boolean; data: null | IVoca[]; loading: boolean };
//   reactRedux: { ok: boolean; data: null | IVoca[]; loading: boolean };
//   reactQuery: { ok: boolean; data: null | IVoca[]; loading: boolean };
//   reactHookForm: { ok: boolean; data: null | IVoca[]; loading: boolean };
//   styledComponenets: { ok: boolean; data: null | IVoca[]; loading: boolean };
//   reactRouter: { ok: boolean; data: null | IVoca[]; loading: boolean };
//   axios: { ok: boolean; data: null | IVoca[]; loading: boolean };
// }

// const VocasState ={
//   vocas:{
//     react: { ok: boolean, data: null | IVoca[], loading: boolean };
//   tailwindCss: { ok: boolean; data: null | IVoca[]; loading: boolean };
//   recoil: { ok: boolean; data: null | IVoca[]; loading: boolean };
//   next: { ok: boolean; data: null | IVoca[]; loading: boolean };
//   reactRedux: { ok: boolean; data: null | IVoca[]; loading: boolean };
//   reactQuery: { ok: boolean; data: null | IVoca[]; loading: boolean };
//   reactHookForm: { ok: boolean; data: null | IVoca[]; loading: boolean };
//   styledComponenets: { ok: boolean; data: null | IVoca[]; loading: boolean };
//   reactRouter: { ok: boolean; data: null | IVoca[]; loading: boolean };
//   axios: { ok: boolean; data: null | IVoca[]; loading: boolean };
// }
// }

const VocaArray = [
  "react",
  "tailwindCss",
  "recoil",
  "next",
  "react-redux",
  "react-query",
  "react-hook-form",
  "styled-componenets",
  "react-router",
  "axios",
];

export { initialVocasState, VocaArray };
export type { IVoca, IVocasState };
