import styled from "styled-components";
import { useEffect, useState } from "react";
import { CheckSvg, XMarkSvg } from "../assets/svg/RootSvg";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h1 {
    padding-bottom: 24px;
    width: 500px;
    text-align: center;
    font-size: 30px;
    color: #3a5336;
    font-weight: 500;
    border-bottom: 2px solid rgba(21, 63, 101, 0.9);
  }
`;

const CardsWrapper = styled.ul`
  margin-top: 24px;
  height: 100%;
  width: 400px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Card = styled.li`
  position: relative;
  display: inline-block;
  padding: 2%;
  width: 100%;
  height: 190px;
  text-align: left;

  margin-bottom: 4px;
  border-bottom: 0.6px solid rgba(255, 255, 255, 0.2);
  :nth-child(even) {
    margin-left: 5px;
    border-left: 0.6px solid rgba(255, 255, 255, 0.2);
  }
  :nth-last-child(2),
  :nth-last-child(1) {
    border-bottom: 0px;
  }
`;

const Word = styled.div`
  padding-top: 12px;
  font-size: 24px;
  font-weight: 600;
  color: white;
`;

const ResultWrapper = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
`;
const CorrectBox = styled.div`
  height: 5vh;
  border: 1px solid red;
  background: #968089;
`;
const WrongBox = styled.div`
  height: 5vh;
  border: 1px solid blue;
  background: #ab4e6b;
  color: white;
`;

interface IAnswers {
  answerList: number[];
  correctAnswer: number[];
  testData: ITestData[];
}

interface ITestData {
  word: string;
  correct: string;
  example: string;
  example1: string;
  example2: string;
}

type Result = [null, number] | [number, number];

export default function Answers({
  answerList,
  testData,
  correctAnswer,
}: IAnswers) {
  const [result, setResult] = useState<Result[] | null>(null);

  useEffect(() => {
    let copy: Result[] = [];
    answerList.forEach((answer, idx) => {
      if (correctAnswer[idx] === answer) copy.push([null, correctAnswer[idx]]);
      else copy.push([answer, correctAnswer[idx]]);
    });

    setResult(copy);
  }, []);
  console.log(result);
  return (
    <Wrapper>
      <h1>Your Answers</h1>
      <CardsWrapper>
        {answerList.map((answer, idx) => (
          <Card key={idx}>
            <>
              <Word>
                <p> {testData[idx].word}</p>
              </Word>
              <ResultWrapper>
                <WrongBox>
                  {result?.[idx][0]}
                  <XMarkSvg width="30" height="30" color="#ff383e" />
                </WrongBox>
                <CorrectBox>
                  {result?.[idx][1]}
                  <CheckSvg width="30" height="30" color="#2dceb1" />
                </CorrectBox>
              </ResultWrapper>
            </>
          </Card>
        ))}
      </CardsWrapper>
    </Wrapper>
  );
}
