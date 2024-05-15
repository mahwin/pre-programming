import styled from "styled-components";

import { quizColors } from "assets/color/quizColors";
import type { QuizListItem } from "./type";
import { ProblemCheckList } from "@components/Commons/Quiz/ProblemCheckList";
import { ProgressBar } from "@components/Commons/Quiz/ProgressBar";

interface Props {
  quizNum: number;
  quizList: QuizListItem[];
  currentStep: number;
  currentUserAnswer: number;
  setCurrentUserAnswer: React.Dispatch<React.SetStateAction<number>>;
  handleNextButtonClick: () => void;
  handleSubmitButtonClick: () => void;
}

export function Problem({
  quizNum,
  quizList,
  currentStep,
  currentUserAnswer,
  setCurrentUserAnswer,
  handleNextButtonClick,
  handleSubmitButtonClick,
}: Props) {
  if (quizList.length === 0) return null;
  return (
    <>
      <QuizStep>
        Quiz {currentStep + 1} / {quizNum}
      </QuizStep>
      <ProgressBar {...{ currentStep, quizNum }} />
      <ProblemContents>
        <h2>다음 중 {quizList[currentStep].word}의 의미로 올바른 것은 ?</h2>
        <ProblemCheckList
          answers={quizList[currentStep].answers}
          {...{ currentStep, currentUserAnswer, setCurrentUserAnswer }}
        ></ProblemCheckList>
      </ProblemContents>
      <NextOrSubmitBox>
        {currentStep + 1 === quizNum ? (
          <Button onClick={handleSubmitButtonClick}>S u b m i t</Button>
        ) : (
          <Button onClick={handleNextButtonClick}>N E X T</Button>
        )}
      </NextOrSubmitBox>
    </>
  );
}

const QuizStep = styled.h2`
  padding-top: 10px;
  font-size: ${(props) => props.theme.fontSize.xlg};
  color: ${quizColors.quiz.titleColor};
`;

const ProblemContents = styled.section`
  color: ${quizColors.quiz.lableColor};
  h2 {
    width: 100%;
    font-size: 2rem;
  }
`;

const NextOrSubmitBox = styled.div`
  display: flex;
  justify-content: end;
`;

const Button = styled.button<React.HTMLAttributes<HTMLButtonElement>>`
  height: 50px;
  width: 130px;
  border-radius: 5px;
  text-transform: uppercase;
  color: ${quizColors.quiz.bgColor};
  font-size: ${(props) => props.theme.fontSize.base};
  background-color: ${quizColors.quiz.lableColor};
  cursor: pointer;
`;
