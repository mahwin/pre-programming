import { IVoca } from "@type/commons/voca";

interface IFloatingBtn {
  amount: number;
  data: IVocas[];
}

interface ICard {
  level: string;
  category: string;
  amount: number;
  isClick: boolean | undefined;
  onClickCard: (e: any) => void;
}

interface IStudy {
  handleClick: () => void;
  amount: number;
  spreadData: IVoca[] | null;
}

interface ITmp {
  data: number[] | null;
  len: number;
}

interface IuserVocaData {
  [key: string]: ITmp | null;
}

interface IclickedVoca {
  [index: string]: string[];
}

interface IVocaTable {
  clickedVoca: IclickedVoca;
  vocas: any;
}

interface IVocas {
  [key: string]: IVoca[];
}

export type {
  ICard,
  IFloatingBtn,
  IStudy,
  IuserVocaData,
  IclickedVoca,
  IVocas,
  IVocaTable,
};
