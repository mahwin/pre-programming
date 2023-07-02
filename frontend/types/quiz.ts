import { IVoca } from "@redux/vocas/vocas.dto";
interface ICheckList {
  onChangeInput: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
  currentStep: number;
  quizData: IQuizData[] | null;
  answer: boolean[];
}

interface IQuizData {
  question: string;
  selectList: string[];
}

interface IQuiz {
  vocas: IVoca[];
  howMany: string;
  handleClick: () => void;
}

interface IAnswers {
  answerList: number[];
  quizAnswer: number[];
  quizData: IQuizData[];
  onBack: () => void;
}

type Result = [null, string] | [string, string];

export type { IAnswers, IQuiz, IQuizData, ICheckList, Result };
