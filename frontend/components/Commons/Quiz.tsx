import styled from "styled-components";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import QuizResult from "@components/Commons/QuizResult";
import CheckList from "@components/Commons/CheckList";
import { ResultCircleSvg, XMarkSvg } from "@svg";
import { quizColors } from "assets/color/quizColors";
import getQuiz from "@utils/makeQuiz";
import { IQuizData, IQuiz } from "type/quiz";

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
  background-color: ${quizColors.quiz.bgColor};
  //상속
  font-size: ${(props) => props.theme.fontSize.xlg};
  font-weight: ${(props) => props.theme.fontWeight.xbold};
  text-align: center;
`;

const QuizContainer = styled.div`
  height: 70%;
  width: 100%;
  padding: 5rem;
  h2 {
    font-size: ${(props) => props.theme.fontSize.lg};
    color: ${quizColors.quiz.titleColor};
    margin-bottom: 30px;
  }
`;

const Title = styled.h2`
  padding-top: 10px;
  font-size: ${(props) => props.theme.fontSize.xlg};
  color: ${quizColors.quiz.titleColor};
`;

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
    background-color: ${quizColors.quiz.progressBarColor};
    transition: all 0.5s ease-in-out;
  }
`;

const ProgressCicle = styled.div`
  position: absolute;
  top: 16px;
  height: 12px;
  width: 12px;
  border-radius: 6px;
  border: 3px solid ${quizColors.quiz.lableColor};
  background-color: ${quizColors.quiz.bgColor};
  transition: all 1s ease-in-out;
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
  color: ${quizColors.quiz.bgColor};
  font-size: ${(props) => props.theme.fontSize.base};
  background-color: ${quizColors.quiz.lableColor};
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
      color: ${quizColors.quiz.selectedColor};
      transform: scale(1.05);
      transition: all 0.2s ease-in-out;
    }
  }
`;

export default function Quiz({ vocas, howMany, handleClick }: IQuiz) {
  const [quizData, setQuizData] = useState<IQuizData[] | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<number[] | null>(null);

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
      correctCount += quizAnswer?.[idx] === answer ? 1 : 0;
    });
    setCorrectNum(correctCount);
    setIsSubmit(true);
  };

  const onAnswerClick = () => setAnswerOpen(!answerOpen);
  const onResetQuiz = () => {
    setSteps(0);
    setIsSubmit(false);
    setAnswer(Array.from({ length: 5 }, () => false));
    setAnswerList([]);
  };

  useEffect(() => {
    let data = getQuiz(vocas, maxNum);
    setQuizData(() => data.quizs);
    setQuizAnswer(() => data.corrects);
  }, [vocas, howMany, maxNum]);

  return (
    <Overay>
      <Wrapper>
        <XBtn onClick={handleClick}>
          <XMarkSvg width="20" height="20" color="white" />
        </XBtn>
        {isSubmit ? (
          <>
            {answerOpen ? (
              <QuizResult
                answerList={answerList}
                quizData={quizData!}
                quizAnswer={quizAnswer!}
                onBack={onAnswerClick}
              />
            ) : (
              <>
                <Title>Result Summary</Title>
                <div
                  style={{
                    border: `1px solid ${quizColors.quiz.progressBarColor}`,
                  }}
                />
                <Row>
                  <ColorBox>
                    <Color
                      style={{
                        backgroundColor: quizColors.quiz.correctColor,
                      }}
                    ></Color>
                    <p>Correct : {`${correctNum}`}</p>
                  </ColorBox>
                  <ColorBox>
                    <Color
                      style={{
                        backgroundColor: quizColors.quiz.inCorrectColor,
                      }}
                    ></Color>
                    <p>InCorrect : {`${maxNum - correctNum}`}</p>
                  </ColorBox>
                </Row>
                <div>
                  <ResultCircleSvg
                    percent={((correctNum * 100) / maxNum).toFixed(2) + ""}
                    correctColor={quizColors.quiz.correctColor}
                    inCorrectColor={quizColors.quiz.inCorrectColor}
                  />
                </div>
                <ButtonBox>
                  <ResultBtn onClick={onAnswerClick}>View answer</ResultBtn>
                  <ResultBtn onClick={onResetQuiz}>Retry</ResultBtn>
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
            <QuizContainer>
              <>
                <h2>
                  다음 중 {quizData?.[currentStep].question}의 의미로 올바른
                  것은 ?
                </h2>
                <CheckList
                  onChangeInput={onChangeInput}
                  currentStep={currentStep}
                  quizData={quizData}
                  answer={answer}
                ></CheckList>
                {answer.includes(true) && (
                  <>
                    {answerList.length === maxNum - 1 ? (
                      <Button onClick={onSubmit}>S u b m i t</Button>
                    ) : (
                      <Button onClick={onNextStep}>N E X T</Button>
                    )}
                  </>
                )}
              </>
            </QuizContainer>
          </>
        )}
      </Wrapper>
    </Overay>
  );
}
