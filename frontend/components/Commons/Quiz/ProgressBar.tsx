import { quizColors } from "assets/color/quizColors";
import { HTMLAttributes } from "react";
import styled from "styled-components";

interface Props {
  currentStep: number;
  quizNum: number;
}

export function ProgressBar({ currentStep, quizNum }: Props) {
  return (
    <ProgressBarBox>
      <Progress value={currentStep} max={quizNum} />
      {Array.from({ length: quizNum + 1 }).map((_, i) => (
        <ProgressCicle
          key={i}
          style={
            currentStep >= i
              ? { borderColor: "#153f65", left: `${i * quizNum}%` }
              : { borderColor: "#f1f2ec", left: `${i * quizNum}%` }
          }
        ></ProgressCicle>
      ))}
    </ProgressBarBox>
  );
}

const ProgressBarBox = styled.div`
  position: relative;
  left: -6px;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 30px;
  background-color: ${quizColors.quiz.lableColor};
`;

const Progress = styled.progress.attrs({
  min: "0",
})<any>`
  position: absolute;
  display: block;
  width: 100%;
  top: 20px;
  height: 2.5px;
  background-color: inherit;
  transition: all 0.5s ease-in-out;
  &::-webkit-progress-bar {
    background-color: inherit;
  }
  &::-webkit-progress-value {
    background-color: ${quizColors.quiz.progressBarColor};
    transition: all 0.5s ease-in-out;
  }
`;

const ProgressCicle = styled.div<HTMLAttributes<HTMLDivElement>>`
  position: absolute;
  top: 16px;
  height: 12px;
  width: 12px;
  border-radius: 6px;
  border: 3px solid ${quizColors.quiz.lableColor};
  background-color: ${quizColors.quiz.bgColor};
  transition: all 1s ease-in-out;
`;
