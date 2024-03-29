import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { CheckSvg, XMarkSvg } from "@svg";
import { userVocaColors } from "@color/userVocaColor";
import { IAnswers, Result } from "@type/quiz";

const Wrapper = styled.div`
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
    border-bottom: 2px solid ${userVocaColors.quizResult.titleLineColor};
  }
`;

const Cards = styled.ul`
  margin-top: 12px;
  height: 100%;
  width: 400px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Card = styled.li<React.HTMLProps<HTMLDivElement>>`
  position: relative;
  display: inline-block;
  color: white;
  padding: 2%;
  width: 100%;
  height: 160px;
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
    height: 7vh;
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

const BackBtn = styled.button<React.HTMLAttributes<HTMLButtonElement>>`
  width: 100px;
  height: 30px;
  border-radius: 5px;
  letter-spacing: 0.4em;
  color: ${userVocaColors.quizResult.backBtnColor};
  margin-left: 40%;
  cursor: pointer;
  :hover {
    letter-spacing: 0.8em;
  }
`;

export default function QuizResult({
  answerList,
  quizData,
  quizAnswer,
  onBack,
}: IAnswers) {
  const [result, setResult] = useState<Result[] | null>(null);
  useEffect(() => {
    let copy: Result[] = [];
    answerList.forEach((answer, idx) => {
      const correct = quizAnswer[idx];
      if (correct === answer)
        copy.push([null, quizData[idx]?.selectList[correct - 1].slice(0, 10)]);
      else
        copy.push([
          quizData[idx]?.selectList[answer - 1].slice(0, 10),
          quizData[idx]?.selectList[correct - 1].slice(0, 10),
        ]);
    });
    setResult(copy);
  }, [answerList, quizData, quizAnswer]);
  return (
    <Wrapper>
      <h1>Your Answers</h1>
      <Cards>
        {answerList.map((answer, idx) => (
          <Card key={idx}>
            <>
              <CardTitle>
                <h3> {quizData[idx].question}</h3>
              </CardTitle>
              <CardContents>
                {result?.[idx][0] && (
                  <InCorrect>
                    {result[idx][0]}
                    <XMarkSvg
                      width="30"
                      height="30"
                      color={userVocaColors.quizResult.inCorrectColor}
                    />
                  </InCorrect>
                )}
                <Correct>
                  {result?.[idx][1]}
                  <CheckSvg
                    width="30"
                    height="30"
                    color={userVocaColors.quizResult.correctColor}
                  />
                </Correct>
              </CardContents>
            </>
          </Card>
        ))}
      </Cards>
      <BackBtn onClick={onBack}>BACK</BackBtn>
    </Wrapper>
  );
}
