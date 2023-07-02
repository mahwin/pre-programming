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

interface IWordInfo {
  word: string;
  mean: string;
  frequency: string;
}

interface IQuiz {
  vocas: IWordInfo[];
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

export type { IAnswers, IQuiz, IWordInfo, IQuizData, ICheckList, Result };
