import styled from "styled-components";
import { useEffect, useState } from "react";
import { CheckSvg, XMarkSvg } from "@svg";

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
  height: 170px;
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
  display: flex;
  flex-direction: column;
  color: white;
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
const CorrectBox = styled.div`
  background: #968089;
`;
const WrongBox = styled.div`
  background: #ab4e6b;
`;

const BackBtn = styled.button`
  width: 100px;
  border: none;
  height: 30px;
  border-radius: 5px;
  letter-spacing: 0.4em;
  color: #7aa4a9;
  margin-left: 40%;
  cursor: pointer;
  :hover {
    letter-spacing: 0.8em;
  }
`;

interface IAnswers {
  answerList: number[];
  testAnswer: number[];
  testData: ITestData[];
  onBack: () => void;
}

interface ITestData {
  question: string;
  selectList: string[];
}

type Result = [null, string] | [string, string];

export default function Answers({
  answerList,
  testData,
  testAnswer,
  onBack,
}: IAnswers) {
  const [result, setResult] = useState<Result[] | null>(null);

  useEffect(() => {
    let copy: Result[] = [];
    answerList.forEach((answer, idx) => {
      const correct = testAnswer[idx];
      if (correct === answer)
        copy.push([null, testData[idx]?.selectList[correct - 1].slice(0, 10)]);
      else
        copy.push([
          testData[idx]?.selectList[answer - 1].slice(0, 10),
          testData[idx]?.selectList[correct - 1].slice(0, 10),
        ]);
    });
    console.log(copy);
    setResult(result);
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
                <p> {testData[idx].question}</p>
              </Word>
              <ResultWrapper>
                {result?.[idx][0] && (
                  <WrongBox>
                    {result[idx][0]}
                    <XMarkSvg width="30" height="30" color="#ff383e" />
                  </WrongBox>
                )}
                <CorrectBox>
                  {result?.[idx][1]}
                  <CheckSvg width="30" height="30" color="#2dceb1" />
                </CorrectBox>
              </ResultWrapper>
            </>
          </Card>
        ))}
      </CardsWrapper>
      <BackBtn onClick={onBack}>BACK</BackBtn>
    </Wrapper>
  );
}
