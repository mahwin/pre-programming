import styled from "styled-components";
import React from "react";
import { userVocaColors } from "@color/userVocaColor";
import { quizColors } from "@color/quizColors";
import { BigCircleSvg } from "@svg";

interface Props {
  correctNum: number;
  maxNum: number;
  handleResultDetailClick: () => void;
  handleRetryButtonClick: () => void;
}

export function QuizResultSummary({
  maxNum,
  correctNum,
  handleResultDetailClick,
  handleRetryButtonClick,
}: Props) {
  return (
    <Wrapper>
      <SumaryTitle>Result Summary</SumaryTitle>
      <Line />
      <Row>
        <ColorBox>
          <ColorBlock isCorrected={true} />
          <p>Correct : {`${correctNum}`}</p>
        </ColorBox>
        <ColorBox>
          <ColorBlock isCorrected={false} />
          <p>InCorrect : {`${maxNum - correctNum}`}</p>
        </ColorBox>
      </Row>
      <BigCircleSvg
        percent={((correctNum * 100) / maxNum).toFixed(2) + ""}
        correctColor={quizColors.quiz.correctColor}
        inCorrectColor={quizColors.quiz.inCorrectColor}
      />
      <Row>
        <Button onClick={handleResultDetailClick}>Result Detail</Button>
        <Button onClick={handleRetryButtonClick}>Retry</Button>
      </Row>
    </Wrapper>
  );
}

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border-radius: 10px;
`;

const SumaryTitle = styled.h2`
  padding-top: 10px;
  font-size: ${(props) => props.theme.fontSize.xlg};
  color: ${quizColors.quiz.titleColor};
`;

const Line = styled.div`
  width: 100%;
  border: 2px solid ${quizColors.quiz.lableColor};
  border-radius: 5px;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 30px;
  font-size: ${(props) => props.theme.fontSize.lg};
`;

const ColorBox = styled.div`
  display: flex;
  align-items: center;
  p {
    font-weight: ${(props) => props.theme.fontWeight.base};
  }
`;
const ColorBlock = styled.div<{ isCorrected: boolean }>`
  background-color: ${({ isCorrected }) =>
    isCorrected
      ? quizColors.quiz.correctColor
      : quizColors.quiz.inCorrectColor};
  border: none;
  width: 50px;
  height: 20px;
  margin-right: 5px;
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
