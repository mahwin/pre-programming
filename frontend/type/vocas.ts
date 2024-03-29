import { IVocaObj } from "@type/commons/voca";

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

export type { IVocaDetail, ICard, IQuizSetting, ITable, IAddVoca };
