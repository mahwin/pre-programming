import styled from "styled-components";
import { motion } from "framer-motion";
import React, { useState, useEffect, useCallback } from "react";
import { QuizResult } from "./QuizResult";

import { XMarkSvg } from "@svg";
import { quizColors } from "assets/color/quizColors";

import { useVocabulary } from "@hooks/useVocabulary";
import { QuizManager } from "@modules/QuizManager";
import { isNil } from "@utils/typeGuard";
import { Problem } from "./Problem";
import type { QuizListItem } from "./type";
import type { ClassifiedVocabularyItems } from "@type/commons/classifiedVocabulary";

interface Props {
  isOpened: boolean;
  quizNum: number;
  spreadSelectedVocabulary: ClassifiedVocabularyItems;
  handleClick: () => void;
  handleCloseClick: () => void;
}

export function Quiz({
  isOpened,
  spreadSelectedVocabulary,
  quizNum,
  handleCloseClick,
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
    setUserAnswerList((prev) => [...prev, currentUserAnswer]);
    setCurrentUserAnswer(0);
    setStep((prev) => prev + 1);
  };

  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const handleSubmitButtonClick = () => {
    handleNextButtonClick();
    setIsSubmit((prev) => !prev);
  };

  const handleCloseButtonClick = useCallback(() => {
    handleCloseClick();
  }, []);

  const handleRetryButtonClick = useCallback(() => {
    setStep(0);
    setCurrentUserAnswer(0);
    setUserAnswerList([]);
    setIsSubmit(false);
  }, []);

  if (isSubmit) {
    return (
      <Overay>
        <Wrapper>
          <XBtn onClick={handleCloseButtonClick}>
            <XMarkSvg width="20" height="20" color="white" />
          </XBtn>
          <QuizResult
            {...{
              answerList,
              quizList,
              userAnswerList,
              handleRetryButtonClick,
            }}
          />
        </Wrapper>
      </Overay>
    );
  }

  return (
    <Overay>
      <Wrapper>
        <XBtn onClick={handleCloseButtonClick}>
          <XMarkSvg width="20" height="20" color="white" />
        </XBtn>
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
  overflow: auto;
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

const XBtn = styled.button<React.HTMLProps<HTMLButtonElement>>`
  position: absolute;
  right: 40px;
  appearance: none;
  border: none;
  background-color: transparent;
  width: 40px;
  height: 40px;
  cursor: pointer;
  :hover {
    svg {
      transform: scale(1.05);
      transition: all 0.2s ease-in-out;
    }
  }
`;
