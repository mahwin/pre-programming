import styled from "styled-components";
import { motion } from "framer-motion";
import React, { useState, useEffect, HTMLAttributes } from "react";
import QuizResult from "@components/Commons/QuizResult";

import { ResultCircleSvg, XMarkSvg } from "@svg";
import { quizColors } from "assets/color/quizColors";
import getQuiz from "@utils/makeQuiz";
import { IQuizData, IQuiz } from "@type/quiz";
import { VocabularyItems } from "@type/commons/vocabulary";
import { useVocabulary } from "@hooks/useVocabulary";
import { QuizManager } from "@modules/QuizManager";
import { isNil } from "@utils/typeGuard";
import { Problem } from "./Problem";
import { ProgressBar } from "./ProgressBar";
import type { QuizListItem } from "./type";

interface Props {
  isOpened: boolean;
  quizNum: number;
  spreadSelectedVocabulary: VocabularyItems;
  handleClick: () => void;
}

export function Quiz({
  isOpened,
  spreadSelectedVocabulary,
  quizNum,
  handleClick,
}: Props) {
  if (isOpened === false) return <></>;

  const { data: totalVocabulary } = useVocabulary();

  const [quizList, setQuizList] = useState<QuizListItem[]>([]);
  const [answerList, setAnswerList] = useState<number[]>([]);

  const [currentStep, setStep] = useState<number>(0);

  useEffect(() => {
    if (isNil(totalVocabulary)) return;
    if (isNil(spreadSelectedVocabulary)) return;

    const quiz = new QuizManager(
      spreadSelectedVocabulary,
      totalVocabulary,
      quizNum
    );

    setQuizList(quiz.quizList);
    setAnswerList(quiz.answerList);
  }, [totalVocabulary, quizNum]);

  const [userAnswerList, setUserAnswerList] = useState<number[]>([]);
  const [currentUserAnswer, setCurrentUserAnswer] = useState<number>(0);

  const handleNextButtonClick = () => {
    if (currentUserAnswer === 0) return;

    setUserAnswerList((prev) => [...prev, currentUserAnswer]);

    setCurrentUserAnswer(0);
    setStep((prev) => prev + 1);
  };

  const handleSubmitButtonClick = () => {};

  const handleCloseButtonClick = () => {};

  useEffect(() => {
    console.log(`userAnswerList`, userAnswerList);
  }, [userAnswerList]);

  return (
    <Overay>
      <Wrapper>
        <Problem
          {...{
            quizNum,
            quizList,
            currentStep,
            setCurrentUserAnswer,
            currentUserAnswer,
            handleCloseButtonClick,
            handleNextButtonClick,
            handleSubmitButtonClick,
          }}
        />
        {/* {isSubmit ? (
        <QuizContents currentStep={currentStep} = />

        {/* {isSubmit ? (
          <>
            {answerOpen ? (
              <QuizResult
                answerList={answerList}
                quizData={quizData!}
                quizAnswer={quizAnswer!}
                onBack={onAnswerClick}
              />
            ) : (
              <>
                <Title>Result Summary</Title>
                <div
                  style={{
                    border: `1px solid ${quizColors.quiz.progressBarColor}`,
                  }}
                />
                <Row>
                  <ColorBox>
                    <Color color={quizColors.quiz.inCorrectColor} />

                    <p>Correct : {`${correctNum}`}</p>
                  </ColorBox>
                  <ColorBox>
                    <Color color={quizColors.quiz.inCorrectColor} />

                    <p>InCorrect : {`${maxNum - correctNum}`}</p>
                  </ColorBox>
                </Row>
                <div>
                  <ResultCircleSvg
                    percent={((correctNum * 100) / maxNum).toFixed(2) + ""}
                    correctColor={quizColors.quiz.correctColor}
                    inCorrectColor={quizColors.quiz.inCorrectColor}
                  />
                </div>
                <ButtonBox>
                  <ResultBtn onClick={onAnswerClick}>View answer</ResultBtn>
                  <ResultBtn onClick={onResetQuiz}>Retry</ResultBtn>
                </ButtonBox>
              </>
            )}
          </>
        ) : (
          
        )} */}
      </Wrapper>
    </Overay>
  );
}

const Overay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 999;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 600px;
  width: 800px;
  border-radius: 10px;
  padding: 24px 48px;
  background-color: ${quizColors.quiz.bgColor};
  font-size: ${(props) => props.theme.fontSize.xlg};
  font-weight: ${(props) => props.theme.fontWeight.xbold};
  text-align: center;
`;

const QuizStep = styled.h2`
  padding-top: 10px;
  font-size: ${(props) => props.theme.fontSize.xlg};
  color: ${quizColors.quiz.titleColor};
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

const Row = styled.div`
  display: flex;
  width: 50%;
  height: 100px;
  align-items: center;
  justify-content: space-around;
  margin: auto;
  font-size: ${(props) => props.theme.fontSize.lg};
`;

const ColorBox = styled.div`
  display: flex;
  align-items: center;
  p {
    font-weight: ${(props) => props.theme.fontWeight.base};
  }
`;

const Color = styled.div<{ color: string }>`
  border: none;
  width: 50px;
  height: 20px;
  margin-right: 5px;
  color: ${(props) => props.color};
`;

const ButtonBox = styled.div<React.HTMLProps<HTMLDivElement>>`
  display: flex;
  justify-content: center;
  gap: 10px;
  height: 50px;
`;

const ResultBtn = styled(Button)<React.HTMLAttributes<HTMLButtonElement>>`
  position: relative;
  top: 0;
  left: 0;
`;
