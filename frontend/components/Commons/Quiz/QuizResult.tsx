import React, { useMemo, useState, useEffect } from "react";
import { QuizListItem } from "./type";
import { QuizResultDetail } from "./QuizResultDetail";
import { QuizResultSummary } from "./QuizResultSummary";

type ScoreResult = {
  word: string;
  isCorrect: boolean;
  answer: string;
  userAnswer: string;
};

interface Props {
  quizList: QuizListItem[];
  answerList: number[];
  userAnswerList: number[];
  handleRetryButtonClick: () => void;
}

export function QuizResult({
  answerList,
  quizList,
  userAnswerList,
  handleRetryButtonClick,
}: Props) {
  const [isSummaryOpen, setIsSummaryOpen] = useState(true);

  const handleResultDetailClick = () => {
    setIsSummaryOpen(false);
  };

  const handleResultSummaryClick = () => {
    setIsSummaryOpen(true);
  };

  const correctNum = useMemo(() => {
    return answerList.reduce((acc, answer, idx) => {
      return answer === userAnswerList[idx] ? acc + 1 : acc;
    }, 0);
  }, [answerList, userAnswerList]);

  const [result, setResult] = useState<ScoreResult[]>([]);

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
    <>
      {isSummaryOpen ? (
        <QuizResultSummary
          maxNum={quizList.length}
          {...{ correctNum, handleRetryButtonClick, handleResultDetailClick }}
        />
      ) : (
        <QuizResultDetail
          {...{
            result,
            handleResultSummaryClick,
          }}
        />
      )}
    </>
  );
}
