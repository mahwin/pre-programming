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
} from "assets/keyframes/RootKeyFrame";
import { ResultCircleSvg, XMarkSvg } from "@svg";
import QuizResult from "./QuizResult";
import getQuiz from "@utils/makeQuiz";
import { userVocaColors } from "assets/color/userVocaColor";

const Overay = styled(motion.div)`
  position: fixed;
  top: 0;
  height: 100%;
  z-index: 999;
  width: 100%;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;

const Wrapper = styled.div`
  position: absolute;
  height: 600px;
  width: 80vw;
  padding: 20px 24px;
  overflow: scroll;
  background-color: ${userVocaColors.test.bgColor};
  //상속
  font-size: ${(props) => props.theme.fontSize.xlg};
  font-weight: ${(props) => props.theme.fontWeight.xbold};
  text-align: center;
`;

const TestContainer = styled.div`
  height: 70%;
  width: 100%;
  padding: 5rem;
`;

const Title = styled.h1`
  padding-top: 10px;
`;

const ProgressBarBox = styled.div`
  position: relative;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 30px;
  background-color: ${userVocaColors.test.textColor};
`;

const Progress = styled.progress.attrs({
  min: "0",
})`
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
    background-color: ${userVocaColors.test.progressBarColor};
    transition: all 0.5s ease-in-out;
  }
`;

const ProgressCicle = styled.div`
  position: absolute;
  top: 16px;
  height: 12px;
  width: 12px;
  border-radius: 6px;
  border: 3px solid ${userVocaColors.test.textColor};
  background-color: ${userVocaColors.test.bgColor};
  transition: all 1s ease-in-out;
`;

const Ul = styled.ul`
  margin: auto;
  margin-top: 10px;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style-type: none;
  cursor: pointer;
  li {
    width: 400px;
    position: relative;
    padding: 10px 10px 10px 60px;
    display: flex;
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
    label {
      cursor: pointer;
      color: #f1f2ec;
      font-weight: 700;
      margin-left: 20px;
      font-size: 24px;
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
  }
`;

const Bullet = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
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
  border: 1px solid ${userVocaColors.test.selectedColor};
  background-color: #fff;
  opacity: 1;
`;
const BulletLineZero = styled(Line)`
  left: 11px;
  top: -21px;
  transform: translateY(9px);
  width: 2px;
  height: 10px;
`;
const BulletLineOne = styled(Line)`
  right: -12px;
  top: -10px;
  transform: rotate(-45deg) translate(-9px);
`;
const BulletLineTwo = styled(Line)`
  right: -20px;
  top: 11px;
  transform: translate(-9px);
`;
const BulletLineThree = styled(Line)`
  right: -12px;
  top: 32px;
  transform: rotate(55deg) translate(-9px);
`;
const BulletLineFour = styled(Line)`
  left: -10px;
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
  top: 33px;
  transform: rotate(-55deg) translate(9px);
`;

const BulletLineSeven = styled(Line)`
  width: 2px;
  height: 10px;
  left: 11px;
  bottom: -22px;
  transform: translateY(-9px);
`;
const Input = styled.input.attrs({ type: "radio", name: "answer" })`
  opacity: 0;
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
  right: 50px;
  bottom: 50px;
  height: 50px;
  width: 130px;
  border-radius: 5px;
  border: none;
  text-transform: uppercase;
  color: ${userVocaColors.test.bgColor};
  font-size: ${(props) => props.theme.fontSize.base};
  background-color: ${userVocaColors.test.textColor};
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  :hover {
    font-size: ${(props) => props.theme.fontSize.md};
  }
`;

const Row = styled.div`
  display: flex;
  width: 50%;
  height: 100px;
  align-items: center;
  justify-content: space-around;
  margin: auto;
  font-size: ${(props) => props.theme.fontSize.lg};
`;

const ColorBox = styled.div`
  display: flex;
  align-items: center;
  p {
    font-weight: ${(props) => props.theme.fontWeight.base};
  }
`;

const Color = styled.div`
  border: none;
  width: 50px;
  height: 20px;
  margin-right: 5px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  height: 50px;
`;

const ResultBtn = styled(Button)`
  position: relative;
  top: 0;
  left: 0;
`;
const XBtn = styled.button`
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
      color: ${userVocaColors.test.selectedColor};
      transform: scale(1.05);
      transition: all 0.2s ease-in-out;
    }
  }
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
    let data = getQuiz(vocas, maxNum);
    console.log(data);
    setTestData(() => data.quizs);
    setTestAnswer(() => data.corrects);
  }, [vocas, howMany, maxNum]);

  return (
    <Overay>
      <Wrapper>
        <XBtn onClick={handleClickTest}>
          <XMarkSvg width="20" height="20" color="white" />
        </XBtn>
        {isSubmit ? (
          <>
            {answerOpen ? (
              <QuizResult
                answerList={answerList}
                testData={testData!}
                testAnswer={testAnswer!}
                onBack={onAnswerClick}
              />
            ) : (
              <>
                <Title>Result Summary</Title>
                <div
                  style={{
                    border: `1px solid ${userVocaColors.test.progressBarColor}`,
                  }}
                />
                <Row>
                  <ColorBox>
                    <Color
                      style={{
                        backgroundColor: userVocaColors.test.correctColor,
                      }}
                    ></Color>
                    <p>Correct : {`${correctNum}`}</p>
                  </ColorBox>
                  <ColorBox>
                    <Color
                      style={{
                        backgroundColor: userVocaColors.test.inCorrectColor,
                      }}
                    ></Color>
                    <p>InCorrect : {`${maxNum - correctNum}`}</p>
                  </ColorBox>
                </Row>
                <div>
                  <ResultCircleSvg
                    percent={((correctNum * 100) / maxNum).toFixed(2) + ""}
                    correctColor={userVocaColors.test.correctColor}
                    inCorrectColor={userVocaColors.test.inCorrectColor}
                  />
                </div>
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
                  다음 중 {testData?.[currentStep].question}의 의미로 올바른
                  것은 ?
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
      </Wrapper>
    </Overay>
  );
}
