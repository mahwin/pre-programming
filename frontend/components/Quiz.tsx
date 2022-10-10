import styled from "styled-components";
import React, { useState } from "react";
import {
  explode,
  dropOne,
  dropTwo,
  dropThree,
  dropFour,
  dropFive,
  dropSeven,
  dropSix,
  dropZero,
} from "../assets/keyframes/RootKeyFrame";
import { ResultCircleSvg } from "../assets/svg/RootSvg";
import Answers from "./Answers";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  z-index: 10;
  position: absolute;
  right: 0;
  left: 0;
  top: 5rem;
  margin: 0 auto;
  height: 85vh;
  width: 80vw;
  padding: 20px 24px;
  overflow: scroll;
  background-color: #7aa4a9;
`;

const TestContainer = styled.div`
  height: 70%;
  width: 100%;
  padding: 24px;
  h1 {
    margin-top: 20px;
    width: 100%;
    text-align: center;
    color: #f1f2ec;
    font-size: 40px;
    font-weight: ${(props) => props.theme.fontWeight.xbold};
  }
`;

const Title = styled.h1`
  padding-top: 10px;
  text-align: center;
  color: #3a5336;
  font-size: ${(props) => props.theme.fontSize.xlg};
  font-weight: 800;
`;

const ProgressBarBox = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 30px;
  position: relative;
`;

const Progress = styled.progress.attrs({
  min: "0",
})`
  display: block;
  width: 100%;
  position: absolute;
  top: 20px;
  appearance: none;
  background: none;
  height: 2.5px;
  background-color: #f1f2ec;
  transition: all 0.5s ease-in-out;
  &::-webkit-progress-bar {
    background-color: #f1f2ec;
  }
  &::-webkit-progress-value {
    background-color: #153f65;
    transition: all 0.5s ease-in-out;
  }
`;

const ProgressCicle = styled.div`
  height: 12px;
  width: 12px;
  border-radius: 6px;
  border: 3px solid #f1f2ec;
  position: absolute;
  top: 16px;
  background-color: #7aa4a9;
  transition: all 1s ease-in-out;
`;

const AnswerBox = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Ul = styled.ul`
  list-style-type: none;
  margin: auto;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  li {
    width: 350px;
    position: relative;
    padding: 10px;
    padding-left: 60px;
    display: flex;
    align-items: center;
    input:checked ~ div {
      opacity: 1;
      animation-name: ${explode};
      animation-duration: 0.35s;
      div:nth-child(1) {
        animation-name: ${dropZero};
        animation-delay: 0.1s;
        animation-duration: 0.9s;
        animation-fill-mode: forwards;
      }
      div:nth-child(2) {
        animation-name: ${dropOne};
        animation-delay: 0.1s;
        animation-duration: 0.9s;
        animation-fill-mode: forwards;
      }
      div:nth-child(3) {
        animation-name: ${dropTwo};
        animation-delay: 0.1s;
        animation-duration: 0.9s;
        animation-fill-mode: forwards;
      }
      div:nth-child(4) {
        animation-name: ${dropThree};
        animation-delay: 0.1s;
        animation-duration: 0.9s;
        animation-fill-mode: forwards;
      }
      div:nth-child(5) {
        animation-name: ${dropFour};
        animation-delay: 0.1s;
        animation-duration: 0.9s;
        animation-fill-mode: forwards;
      }
      div:nth-child(6) {
        animation-name: ${dropFive};
        animation-delay: 0.1s;
        animation-duration: 0.9s;
        animation-fill-mode: forwards;
      }
      div:nth-child(7) {
        animation-name: ${dropSix};
        animation-delay: 0.1s;
        animation-duration: 0.9s;
        animation-fill-mode: forwards;
      }
      div:nth-child(8) {
        animation-name: ${dropSeven};
        animation-delay: 0.1s;
        animation-duration: 0.9s;
        animation-fill-mode: forwards;
      }
    }
  }

  label {
    cursor: pointer;
    color: #f1f2ec;
    font-weight: 700;
    margin-left: 20px;
    font-size: 24px;
    :hover {
      border: 1px solid red;
    }
  }
  label:before {
    content: "";
    width: 10px;
    height: 10px;
    background: #fff;
    position: absolute;
    left: 2.5px;
    top: 17.5px;
    box-sizing: border-box;
    border-radius: 50%;
  }
`;

const Bullet = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  left: calc(-15px / 2);
  top: calc(15px / 2);
  border: 5px solid #fff;
  opacity: 0;
  border-radius: 50%;
`;

const Line = styled.div`
  position: absolute;
  width: 10px;
  height: 2px;
  background-color: #fff;
  opacity: 0;
`;
const BulletLineZero = styled(Line)`
  left: 11px;
  top: -21px;
  transform: translateY(20px);
  width: 2px;
  height: 10px;
`;
const BulletLineOne = styled(Line)`
  right: -7px;
  top: -11px;
  transform: rotate(-55deg) translate(-9px);
`;
const BulletLineTwo = styled(Line)`
  right: -20px;
  top: 11px;
  transform: translate(-9px);
`;
const BulletLineThree = styled(Line)`
  right: -8px;
  top: 35px;
  transform: rotate(55deg) translate(-9px);
`;
const BulletLineFour = styled(Line)`
  left: -8px;
  top: -11px;
  transform: rotate(55deg) translate(9px);
`;
const BulletLineFive = styled(Line)`
  left: -20px;
  top: 11px;
  transform: translate(9px);
`;
const BulletLineSix = styled(Line)`
  left: -8px;
  top: 35px;
  transform: rotate(-55deg) translate(9px);
`;

const BulletLineSeven = styled(Line)`
  left: 11px;
  bottom: -21px;
  transform: translateY(-20px);
  width: 2px;
  height: 10px;
`;
const Input = styled.input.attrs({ type: "radio", name: "answer" })`
  opacity: 0;
  vertical-align: middle;
  z-index: 1;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  position: absolute;
  left: 0;

  cursor: pointer;
`;

const Button = styled.button`
  position: absolute;
  right: 150px;
  bottom: 50px;
  height: 50px;
  width: 130px;
  border-radius: 5px;
  border: none;
  color: #7aa4a9;
  text-transform: uppercase;
  cursor: pointer;
  background-color: #f1f2ec;
  transition: all 0.3s cubic-bezier(0.4, 0, 2, 1);
`;

const Row = styled.div`
  display: flex;
  height: 100px;
  width: 300px;
  align-items: center;
  justify-content: space-around;
  margin: auto;
`;

const ColorBox = styled.div`
  display: flex;
  height: 30px;
  p {
    font-weight: 600;
  }
`;

const Color = styled.div`
  border: none;
  width: 50px;
  height: 20px;
  margin-right: 5px;
`;

const SvgBox = styled.div`
  display: flex;
  justify-content: center;
`;

const ButtonBox = styled.div`
  position: relative;
  display: flex;

  justify-content: center;
  button:first-child {
    margin-right: 10px;
  }
`;

const ResultBtn = styled(Button)`
  position: relative;
  top: 0;
  left: 0;
`;

type TypeAnser = number | null;

interface ITestData {
  word: string;
  correct: string;
  example: string;
  example1: string;
  example2: string;
}

export default function Quiz({ testData, testCondition }: any) {
  const [answerList, setAnswerList] = useState<number[]>([]);
  const [answer, setAnswer] = useState<boolean[]>(
    Array.from({ length: 5 }, () => false)
  );
  const [currentStep, setSteps] = useState<number>(0);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [maxNum, _] = useState(+testCondition.many.split("_")[0]);
  const [pregressStep, __] = useState((1 / maxNum) * 100);
  const [correctNum, setCorrectNum] = useState(0);
  const [answerOpen, setAnswerOpen] = useState(false);

  const onNextStep = () => {
    setSteps((prev) => prev + 1);
    const answerIdx = answer.findIndex((bool) => bool === true);
    setAnswerList((prev) => [...prev, answerIdx]);
    setAnswer(Array.from({ length: 4 }, () => false));
  };

  const onChangeInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const copy = [...answer];
    copy[+target.id] = true;
    setAnswer([...copy]);
  };

  const onSubmit = () => {
    const answerIdx = answer.findIndex((bool) => bool === true);
    setAnswerList((prev) => [...prev, answerIdx]);
    const correctList = Array.from({ length: maxNum }, () => 1);
    let correctCount = 0;
    answerList.forEach((answer, idx) => {
      correctCount += correctList[idx] === answer ? 1 : 0;
    });
    setCorrectNum(correctCount);
    setIsSubmit(true);
  };

  const onAnswerClick = () => setAnswerOpen(!answerOpen);
  const onResetTest = () => {
    setSteps(0);
    setIsSubmit(false);
    setAnswer(Array.from({ length: 5 }, () => false));
    setAnswerList([]);
  };

  return (
    <Wrapper>
      <Container>
        {isSubmit ? (
          <>
            {answerOpen ? (
              <>
                <Answers
                  answerList={answerList}
                  testData={testData}
                  correctAnswer={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
                  onBack={onAnswerClick}
                />
              </>
            ) : (
              <>
                <Title>Result Summary</Title>
                <div style={{ border: "1px solid #325b79" }} />
                <Row>
                  <ColorBox>
                    <Color style={{ backgroundColor: "#ac4e6b" }}></Color>
                    <p>Correct : {`${correctNum}`}</p>
                  </ColorBox>
                  <ColorBox>
                    <Color style={{ backgroundColor: "#977f89" }}></Color>
                    <p>InCorrect : {`${maxNum - correctNum}`}</p>
                  </ColorBox>
                </Row>
                <SvgBox>
                  <ResultCircleSvg percent={(correctNum * 100) / maxNum + ""} />
                </SvgBox>
                <ButtonBox>
                  <ResultBtn onClick={onAnswerClick}>View answer</ResultBtn>
                  <ResultBtn onClick={onResetTest}>Retry</ResultBtn>
                </ButtonBox>
              </>
            )}
          </>
        ) : (
          <>
            <Title>Quiz {`${currentStep} / ${maxNum}`}</Title>
            <ProgressBarBox>
              <Progress value={currentStep} max={maxNum} />
              {[...Array(maxNum + 1)].map((v, i) => (
                <ProgressCicle
                  key={i}
                  style={
                    currentStep >= i
                      ? { borderColor: "#153f65", left: `${i * pregressStep}%` }
                      : { borderColor: "#f1f2ec", left: `${i * pregressStep}%` }
                  }
                ></ProgressCicle>
              ))}
            </ProgressBarBox>
            <TestContainer>
              <>
                <h1>
                  다음 중 {testData?.[currentStep].word}의 의미로 올바른 것은 ?
                </h1>
                <Ul>
                  <li>
                    <Input onChange={onChangeInput} id="1" />
                    <label>{testData?.[currentStep].correct}</label>
                    <Bullet>
                      <BulletLineZero />
                      <BulletLineOne />
                      <BulletLineTwo />
                      <BulletLineThree />
                      <BulletLineFour />
                      <BulletLineFive />
                      <BulletLineSix />
                      <BulletLineSeven />
                    </Bullet>
                  </li>
                  <li>
                    <label htmlFor="2">{testData?.[currentStep].example}</label>
                    <Input onChange={onChangeInput} id="2" />
                    <Bullet>
                      <BulletLineZero />
                      <BulletLineOne />
                      <BulletLineTwo />
                      <BulletLineThree />
                      <BulletLineFour />
                      <BulletLineFive />
                      <BulletLineSix />
                      <BulletLineSeven />
                    </Bullet>
                  </li>
                  <li>
                    <Input onChange={onChangeInput} id="3" />
                    <label>{testData?.[currentStep].example1}</label>
                    <Bullet>
                      <BulletLineZero />
                      <BulletLineOne />
                      <BulletLineTwo />
                      <BulletLineThree />
                      <BulletLineFour />
                      <BulletLineFive />
                      <BulletLineSix />
                      <BulletLineSeven />
                    </Bullet>
                  </li>
                  <li>
                    <Input onChange={onChangeInput} id="4" />
                    <label htmlFor="4">
                      {testData?.[currentStep].example2}
                    </label>
                    <Bullet>
                      <BulletLineZero />
                      <BulletLineOne />
                      <BulletLineTwo />
                      <BulletLineThree />
                      <BulletLineFour />
                      <BulletLineFive />
                      <BulletLineSix />
                      <BulletLineSeven />
                    </Bullet>
                  </li>
                </Ul>
                {answer.includes(true) ? (
                  <>
                    {answerList.length === maxNum - 1 ? (
                      <Button onClick={onSubmit}>S u b m i t</Button>
                    ) : (
                      <Button onClick={onNextStep}>N E X T</Button>
                    )}
                  </>
                ) : null}
              </>
            </TestContainer>
          </>
        )}
      </Container>
    </Wrapper>
  );
}
