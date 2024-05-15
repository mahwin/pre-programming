import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { CheckSvg, XMarkSvg } from "@svg";
import { userVocaColors } from "@color/userVocaColor";
import { QuizListItem } from "./type";

type Result = {
  word: string;
  isCorrect: boolean;
  answer: string;
  userAnswer: string;
};

interface Props {
  quizList: QuizListItem[];
  answerList: number[];
  userAnswerList: number[];
  handleResultSummaryClick: () => void;
}

export function QuizResultDetail({
  answerList,
  quizList,
  userAnswerList,
  handleResultSummaryClick,
}: Props) {
  const [result, setResult] = useState<Result[]>([]);
  useEffect(() => {
    setResult(
      quizList.map((quiz, idx) => {
        const userAnswer = userAnswerList[idx];
        const correctAnswer = answerList[idx];
        return {
          word: quiz.word,
          isCorrect: userAnswer === correctAnswer,
          answer: quiz.answers[correctAnswer],
          userAnswer: quiz.answers[userAnswer],
        };
      })
    );
  }, [answerList, quizList, userAnswerList]);
  return (
    <QuizResultWrapper>
      <h1>Your Answers</h1>
      <Cards>
        {result.map(({ isCorrect, answer }, idx) => (
          <Card key={idx}>
            <CardTitle>
              <h3> {quizList[idx].word}</h3>
            </CardTitle>
            <CardContents>
              {!isCorrect && (
                <InCorrect>
                  {answer}
                  <XMarkSvg
                    width="30"
                    height="30"
                    color={userVocaColors.quizResult.inCorrectColor}
                  />
                </InCorrect>
              )}
              <Correct>
                {answer}
                <CheckSvg
                  width="30"
                  height="30"
                  color={userVocaColors.quizResult.correctColor}
                />
              </Correct>
            </CardContents>
          </Card>
        ))}
      </Cards>
      <ButtonLayout>
        <Button onClick={handleResultSummaryClick}>BACK</Button>
      </ButtonLayout>
    </QuizResultWrapper>
  );
}

const QuizResultWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  h1 {
    padding: 10px;
    width: 500px;
    font-size: ${(props) => props.theme.fontSize.xlg};
    font-weight: ${(props) => props.theme.fontWeight.base};
    border-bottom: 4px solid whitesmoke;
    border-radius: 2px;
  }
`;

const Cards = styled.ul`
  height: 100%;
  width: 500px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Card = styled.li<React.HTMLProps<HTMLDivElement>>`
  position: relative;
  display: inline-block;
  color: white;
  padding: 4px;
  width: 100%;
  height: 170px;
  text-align: left;
  margin-bottom: 4px;
  border-bottom: 0.6px solid ${userVocaColors.quizResult.cardBoardColor};
  :nth-child(even) {
    margin-left: 5px;
    border-left: 0.6px solid ${userVocaColors.quizResult.cardBoardColor};
  }
  :nth-last-child(2),
  :nth-last-child(1) {
    border-bottom: 0px;
  }
`;

const CardTitle = styled.div`
  padding-top: 12px;
  font-size: ${(props) => props.theme.fontSize.md};
`;

const CardContents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-weight: 700;
  font-size: 14px;
  div {
    margin-top: 10px;
    padding: 0px 10px;
    height: 50px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
const Correct = styled.div`
  background: ${userVocaColors.quizResult.correctBgColor};
`;
const InCorrect = styled.div`
  background: ${userVocaColors.quizResult.inCorrectBgColor};
`;

const ButtonLayout = styled.div`
  display: flex;
  margin-top: 10px;
  width: 500px;
  justify-content: end;
`;

const Button = styled.button<React.HTMLAttributes<HTMLButtonElement>>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-radius: 5px;
  letter-spacing: 0.2em;
  font-size: 1.2rem;
  color: ${userVocaColors.quizResult.backBtnColor};
  cursor: pointer;
`;
