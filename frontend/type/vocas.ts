import { IVocaObj } from "@type/commons/voca";

interface IAddVoca {
  cardData:
    | {
        amount: string;
        frequency: string;
      }[]
    | null;
  category: string;
  selected: boolean[];
  resetSelected: () => void;
  onClickCheck: (e: any) => void;
}

interface IVocaDetail {
  voca: IVocaObj;
  title: string;
}

interface ICard {
  amount: string;
  frequency: string;
}

interface ITable {
  cardData: ICard;
  total: number;
}

interface IQuizSetting {
  many: string | null;
  long: string | null;
}

interface IAddVoca {
  cardData: ICard[] | null;
  category: string;
  selected: boolean[];
  resetSelected: () => void;
  // input, button, modal에도 사용됨. any 타입이 맞아!
  onClickCheck: (e: any) => void;
}

type KeyType = "many" | "long";

type Result = [null, string] | [string, string];

export type {
  IVocaDetail,
  ICard,
  Result,
  IQuizSetting,
  KeyType,
  ITable,
  IAddVoca,
};
