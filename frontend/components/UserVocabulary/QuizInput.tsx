import { HTMLAttributes, useCallback, useState } from "react";

import styled from "styled-components";

import { motion, Variants } from "framer-motion";
import { userVocaColors } from "@color/userVocaColor";
import { QuizSvg } from "@svg";

import { ClassifiedVocabularyItems } from "@type/commons/classifiedVocabulary";
interface Props {
  spreadSelectedVocabulary: ClassifiedVocabularyItems;
  handleQuizClick: () => void;
}

export function QuizInput({
  spreadSelectedVocabulary,
  handleQuizClick,
}: Props) {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [userInputQuizNum, setUserInputQuizNum] = useState<number>(0);

  const handleClick = useCallback(() => {
    setIsOpened((prev) => !prev);
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

  return (
    <>
      <QuizMakerButton onClick={handleClick}>
        <QuizSvg />
        <Description>실력을 테스트 해보세요!</Description>
      </QuizMakerButton>
      <QuizMakerWrapper
        isopened={isOpened}
        initial={false}
        variants={QuizMakerVariants}
        animate={isOpened ? "open" : "closed"}
      >
        <label>문제 수 입력</label>
        <InputBox>
          <input
            value={userInputQuizNum === 0 ? "" : userInputQuizNum}
            onChange={handleInputChange}
          ></input>
          <span> / {spreadSelectedVocabulary.length}</span>
        </InputBox>
        <QuizStartBtn
          onClick={handleQuizClick}
          disabled={userInputQuizNum <= 0}
        >
          {userInputQuizNum > 0 ? <p> Can Start !</p> : <p> Fill Input !</p>}
        </QuizStartBtn>
      </QuizMakerWrapper>
    </>
  );
}

const QuizMakerButton = styled.div<React.HTMLAttributes<HTMLElement>>`
  position: relative;
  cursor: pointer;
  :hover {
    p {
      display: inline-block;
    }
  }
`;

const QuizMakerWrapper = styled(motion.section)<{ isopened: boolean }>`
  display: ${(props) => (props.isopened ? "flex" : "none")};
  flex-direction: column;
  justify-content: space-around;

  padding: 12px 24px;
  background-color: ${userVocaColors.floatBtn.bgColor};
  position: absolute;
  top: -150px;
  right: 0px;

  width: 200px;
  border-radius: 5px;

  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  color: white;
`;

const QuizStartBtn = styled.button<
  HTMLAttributes<HTMLButtonElement> & { disabled: boolean }
>`
  background-color: white;
  width: 100%;
  border-radius: 5px;
  color: ${userVocaColors.floatBtn.bgColor};
  margin-top: 4px;
  padding: 0px;

  p {
    box-sizing: border-box;
    border: 2px solid whitesmoke;
    width: 100%;
    font-size: inherit;
    border-radius: 5px;
  }

  &:disabled {
    font-weight: ${(props) => props.theme.fontWeight.bold};
    background-color: rgba(200, 200, 200, 0.5);
    color: black;
    cursor: not-allowed;
    :hover {
      color: darkgray;
    }
  }
`;

const InputBox = styled.div`
  font-size: ${(props) => props.theme.fontSize.lg};
  height: 24px;
  display: flex;
  justify-content: space-between;
  cursor: default;

  input {
    border-radius: 5px;
    width: 50%;
    font-size: inherit;
  }
  span {
    display: block;
    justify-content: center;
    font-size: inherit;
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
  background: ${userVocaColors.floatBtn.pColor};
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
    border-bottom-color: ${userVocaColors.floatBtn.pColor};
    border-width: 10px;
    pointer-events: none;
    content: "";
  }
`;

const QuizMakerVariants: Variants = {
  open: {
    clipPath: "inset(0% 0% 0% 0%)",
    height: "140px",
    transition: {
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
  closed: {
    clipPath: "inset(0% 0% 0% 0%)",
    height: "0px",
    transition: {
      bounce: 0,
      duration: 0.3,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
};
