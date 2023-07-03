import { IVoca, IVocaObj } from "@type/commons/voca";

interface IQuizData {
  question: string;
  selectList: string[];
}

interface IQuiz {
  vocas:
    | IVoca[]
    | {
        [key: string]: {
          level: IVocaObj;
        };
      };
  howMany: string;
  handleClick: () => void;
}

interface IAnswers {
  answerList: number[];
  quizAnswer: number[];
  quizData: IQuizData[];
  onBack: () => void;
}
interface ICheckList {
  onChangeInput: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
  currentStep: number;
  quizData: IQuizData[] | null;
  answer: boolean[];
}

type Result = [null | string, string];

type KeyType = "long" | "many";

export type { IAnswers, IQuiz, IQuizData, ICheckList, Result, KeyType };
