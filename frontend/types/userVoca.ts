import { IVoca } from "@redux/vocas/vocas.dto";

interface IVocas {
  [key: string]: IVoca[];
}

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

interface IToTalWords {
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
  IToTalWords,
};
