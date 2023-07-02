import { IVocas } from "./userVoca";
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

interface IAnswers {
  answerList: number[];
  testAnswer: number[];
  testData: ITestData[];
  onBack: () => void;
}

interface ITestData {
  question: string;
  selectList: string[];
}
interface IVocaDetail {
  voca: IVocas;
  category: string;
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
