import React, { useMemo, useState } from "react";
import { QuizListItem } from "./type";
import { QuizResultDetail } from "./QuizResultDetail";
import { QuizResultSummary } from "./QuizResultSummary";

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
            answerList,
            quizList,
            userAnswerList,
            handleResultSummaryClick,
          }}
        />
      )}
    </>
  );
}
