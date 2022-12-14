import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
} from "../../assets/keyframes/RootKeyFrame";
import { ResultCircleSvg, XMarkSvg } from "@svg";
import Answers from "./Answers";
import makeTestVoca from "@utils/makeTestVoca";

const Overay = styled(motion.div)`
  position: fixed;
  height: 270%;
  z-index: 999;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;

const Container = styled.div`
  z-index: 10;
  position: absolute;
  right: 0;
  left: 0;
  top: 15rem;
  margin: 0 auto;
  height: 600px;
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
    margin-top: 40px;
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

const XBtn = styled.button`
  position: absolute;
  right: 20px;
  appearance: none;
  border: none;
  background-color: transparent;
  width: 100px;
  height: 40px;
  cursor: pointer;
  :hover {
    svg {
      color: darkorange;
      transform: scale(1.05);
      transition: all 0.2s ease-in-out;
    }
  }
`;

const ResultBtn = styled(Button)`
  position: relative;
  top: 0;
  left: 0;
`;

type TypeAnser = number | null;

interface ITestData {
  question: string;
  selectList: string[];
}

interface IWord {
  word: string;
  mean: string;
  frequency: string;
}

interface IQuiz {
  vocas: IWord[];
  howMany: string;
  handleClickTest: () => void;
}

export default function Quiz({ vocas, howMany, handleClickTest }: IQuiz) {
  const [testData, setTestData] = useState<ITestData[] | null>(null);
  const [testAnswer, setTestAnswer] = useState<number[] | null>(null);

  const [answerList, setAnswerList] = useState<number[]>([]);
  const [answer, setAnswer] = useState<boolean[]>(
    Array.from({ length: 5 }, () => false)
  );
  const [currentStep, setSteps] = useState<number>(0);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [maxNum, _] = useState<number>(+howMany);
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
    const userAnswer = [...answerList, answerIdx];
    let correctCount = 0;
    userAnswer.forEach((answer, idx) => {
      correctCount += testAnswer?.[idx] === answer ? 1 : 0;
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

  useEffect(() => {
    let quiz = makeTestVoca(vocas, maxNum, false);
    setTestData(() => quiz.testData);
    setTestAnswer(() => quiz.testAnswer);
  }, [vocas, howMany, maxNum]);

  return (
    <Overay>
      <Container>
        <XBtn onClick={handleClickTest}>
          <XMarkSvg width="20" height="20" color="white" />
        </XBtn>
        {isSubmit ? (
          <>
            {answerOpen ? (
              <>
                <Answers
                  answerList={answerList}
                  testData={testData!}
                  testAnswer={testAnswer!}
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
                  <ResultCircleSvg
                    percent={((correctNum * 100) / maxNum).toFixed(2) + ""}
                  />
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
            <Title>Quiz {`${currentStep + 1} / ${maxNum}`}</Title>
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
                  ?????? ??? {testData?.[currentStep].question}??? ????????? ?????????
                  ?????? ?
                </h1>
                <Ul>
                  <li>
                    <Input
                      onChange={onChangeInput}
                      id="1"
                      checked={answer[1]}
                    />
                    <label>{testData?.[currentStep].selectList[0]}</label>
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
                    <label htmlFor="2">
                      {testData?.[currentStep].selectList[1]}
                    </label>
                    <Input
                      onChange={onChangeInput}
                      id="2"
                      checked={answer[2]}
                    />
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
                    <Input
                      onChange={onChangeInput}
                      id="3"
                      checked={answer[3]}
                    />
                    <label>{testData?.[currentStep].selectList[2]}</label>
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
                    <Input
                      onChange={onChangeInput}
                      id="4"
                      checked={answer[4]}
                    />
                    <label htmlFor="4">
                      {testData?.[currentStep].selectList[3]}
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
    </Overay>
  );
}
