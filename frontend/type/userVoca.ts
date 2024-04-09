import { IVoca, IVocas, IVocaObj } from "@type/commons/voca";
import { MouseEvent } from "react";
import { AxiosError } from "axios";

interface IFloatingBtn {
  amount: number;
  data: IVocaObj[];
}

interface ICard {
  level: string;
  category: string;
  amount: number;
  isClick: boolean | undefined;
  onClickCard: (e: MouseEvent<HTMLElement>) => void;
}

interface IStudy {
  handleClick: () => void;
  amount: number;
  spreadData: IVoca[];
}

interface IUserVocaData {
  [index: string]: { data: number[]; len: number };
}
interface ILevelItem {
  [index: string]: string;
}

interface IClickedVoca {
  [index: string]: string[];
}

interface IClickedVocaTable {
  clickedVoca: IClickedVoca;
  vocas: IVocas;
}

interface IUserVocasState {
  loading: boolean;
  data: null | ILevelItem;
  error: null | AxiosError;
}

export type {
  ICard,
  IFloatingBtn,
  IStudy,
  IUserVocaData,
  IClickedVoca,
  IClickedVocaTable,
  IUserVocasState,
};
