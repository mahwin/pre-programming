import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { DownArrowSvg, StudySvg } from "@svg";
import Study from "./Study";
import { QuizInput } from "./QuizInput";
import { userVocaColor } from "@color/userVocaColor";
import { isNil } from "@utils/typeGuard";
import { ClassifiedVocabularyItems } from "@type/commons/classifiedVocabulary";

import { Quiz } from "@components/Commons/Quiz";

interface Props {
  spreadSelectedVocabulary: ClassifiedVocabularyItems;
}

export function FloatingBtn({ spreadSelectedVocabulary }: Props) {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [isStudyOpen, setIsStudyOpen] = useState<boolean>(false);
  const [userInputQuizNum, setUserInputQuizNum] = useState<number>(0);

  const handleFloatingBtnClick = useCallback(() => {
    setIsOpened((prev) => !prev);
    setIsStudyOpen(false);
    setIsQuizOpen(false);
  }, []);

  const handleStudyClick = useCallback(() => {
    setIsQuizOpen(false);
    setIsStudyOpen((prev) => !prev);
  }, []);

  const handleQuizClick = useCallback(() => {
    setIsStudyOpen(false);
    setIsQuizOpen((prev) => !prev);
  }, []);

  const filltering = useCallback((str: string) => {
    if (Object.is(Number(str), NaN) || str === "") return 0;
    return Number(str) > spreadSelectedVocabulary.length
      ? spreadSelectedVocabulary.length
      : Number(str);
  }, []);

  const handleInputChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setUserInputQuizNum(filltering(evt.currentTarget.value));
    },
    []
  );

  if (isNil(spreadSelectedVocabulary) || spreadSelectedVocabulary.length === 0)
    return null;

  return (
    <>
      <Wrapper>
        <button onClick={handleFloatingBtnClick}>
          {isOpened ? <DownArrowSvg stroke={3} /> : "+"}
        </button>
        <AnimatePresence>
          <TwoBtnBox isopened={isOpened}>
            <BtnWrapper onClick={handleStudyClick}>
              <StudySvg />
              <Description>{`${spreadSelectedVocabulary.length}개의 단어를 학습합니다.`}</Description>
            </BtnWrapper>
            <QuizInput
              {...{
                userInputQuizNum,
                handleInputChange,
                spreadSelectedVocabulary,
                handleQuizClick,
              }}
            />
          </TwoBtnBox>
        </AnimatePresence>
      </Wrapper>

      <Study
        isopened={isStudyOpen}
        handleClick={handleFloatingBtnClick}
        {...{ spreadSelectedVocabulary }}
      />

      <Quiz
        isopened={isQuizOpen}
        spreadSelectedVocabulary={spreadSelectedVocabulary}
        quizNum={userInputQuizNum}
        handleClick={handleQuizClick}
        handleCloseClick={handleFloatingBtnClick}
      />
    </>
  );
}

const Wrapper = styled(motion.section)`
  z-index: 99;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  position: fixed;
  right: 4em;
  bottom: 4em;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${userVocaColor.floatBtn.bgColor};
  cursor: pointer;

  button {
    background-color: transparent;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: ${(props) => props.theme.fontSize.lg};
    :hover {
      color: #00b894;
    }
  }
  transition: all 0.6s ease-in-out;
`;

const BtnWrapper = styled.div<React.HTMLAttributes<HTMLElement>>`
  position: relative;
  cursor: pointer;
  :hover {
    p {
      display: inline-block;
    }
  }
`;

const Description = styled.p`
  z-index: 999;
  display: none;
  position: absolute;
  width: 100px;
  left: -35px;
  top: -80px;
  padding: 10px;
  height: 60px;
  border-radius: 8px;
  background: ${userVocaColor.floatBtn.pColor};
  color: #fff;
  font-size: 14px;
  line-height: 20px;
  &:after {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 0;
    height: 0;
    border: 1px solid red;
    transform: rotate(180deg);
    border-color: transparent;
    border-bottom-color: ${userVocaColor.floatBtn.pColor};
    border-width: 10px;
    pointer-events: none;
    content: "";
  }
`;

const TwoBtnBox = styled(motion.div)<{ isopened: boolean }>`
  visibility: ${(props) => (props.isopened ? "visible" : "hidden")};
  position: absolute;
  top: -4em;
  width: 120px;
  height: 50px;
  border-radius: 10px;
  background-color: ${userVocaColor.floatBtn.bgColor};
  transition: all 0.4s ease-in-out;
  display: flex;
  justify-content: space-around;

  div:nth-child(1) {
    margin-top: 3px;
    svg:hover {
      stroke: #00b894;
    }
  }
  div:nth-child(2) {
    margin-top: 2px;
    svg:hover {
      fill: #00b894;
    }
  }
`;

const QuizStartBtn = styled.div`
  margin-top: 12px;
  height: 30px;
  text-align: center;
  font-size: ${(props) => props.theme.fontSize.lg};
  button {
    background-color: white;
    width: 100%;
    border-radius: 5px;
    color: ${userVocaColor.floatBtn.bgColor};
    cursor: pointer;
    :hover {
      transition: all 0.25s ease-in-out;
    }
  }
  h3 {
    line-height: 30px;
    border-radius: 5px;
    font-size: inherit;
    font-weight: ${(props) => props.theme.fontWeight.bold};
    background-color: rgba(200, 200, 200, 0.5);
    cursor: not-allowed;
  }
`;

const InputBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  padding-top: 5px;
  font-size: ${(props) => props.theme.fontSize.lg};
  input {
    font-size: inherit;
    width: 100px;
  }
  span {
    display: inline-flex;
    width: 100px;
    justify-content: center;
    font-size: inherit;
  }
`;
