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

  handleClick: (
    e: React.MouseEvent<HTMLInputElement | HTMLButtonElement>
  ) => void;
}

export type { IVocaDetail, ICard, IQuizSetting, ITable, IAddVoca };
