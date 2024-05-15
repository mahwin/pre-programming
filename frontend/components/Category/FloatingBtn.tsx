import { useState, useCallback, HTMLAttributes } from "react";

import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import { DownArrowSvg } from "@svg";
import { userVocaColors } from "@color/userVocaColor";
import { isNil } from "@utils/typeGuard";

import { Quiz } from "@components/Commons/Quiz";
import { useVocabulary } from "@hooks/useVocabulary";

export function FloatingBtn() {
  const { data: vocabulary } = useVocabulary();

  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [quizNum, setQuizNum] = useState<number>(10);

  const handleFloatingBtnClick = useCallback(() => {
    setIsOpened((prev) => !prev);
    setIsQuizOpen(false);
  }, []);

  const handleQuizClick = useCallback(() => {
    setIsQuizOpen((prev) => !prev);
  }, []);

  const handleQuizNumChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setQuizNum(Number(evt.target.value));
    },
    []
  );

  if (isNil(vocabulary) || vocabulary.length === 0) return null;
  return (
    <>
      <Wrapper>
        <button onClick={handleFloatingBtnClick}>
          {isOpened ? <DownArrowSvg stroke={3} /> : "+"}
        </button>
        <AnimatePresence>
          <InputSelectBox isopened={isOpened}>
            <InputTitle>Test your level !</InputTitle>
            <p>How many : </p>
            <CheckList>
              {[10, 20, 30].map((num, i) => (
                <Label key={i} htmlFor={`${num}_uuid`}>
                  {num} words
                  <RadioInput
                    value={num}
                    checked={quizNum === num}
                    onChange={handleQuizNumChange}
                    id={`${num}_uuid`}
                  />
                  <Circle />
                </Label>
              ))}
            </CheckList>
            <TestButton onClick={handleQuizClick}>Test start !</TestButton>
          </InputSelectBox>
        </AnimatePresence>
      </Wrapper>
      <Quiz
        isopened={isQuizOpen}
        spreadSelectedVocabulary={vocabulary}
        quizNum={quizNum}
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
  background-color: ${userVocaColors.floatBtn.bgColor};
  cursor: pointer;

  & > button {
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

const InputSelectBox = styled.div<
  { isopened: boolean } & HTMLAttributes<HTMLElement>
>`
  display: ${(props) => (props.isopened ? "flex" : "none")};
  z-index: 55;
  position: absolute;
  justify-content: center;
  flex-direction: column;
  gap: 4px;
  top: -240px;
  left: -130px;
  width: 180px;
  height: 200px;
  padding: 12px;
  background-color: #e0e4e9;
  border-radius: 4px;
  color: ${(props) => props.theme.colorTheme.textThird};
  p {
    font-size: 14px;
    font-weight: ${(props) => props.theme.fontWeight.xbold};
  }
`;

const InputTitle = styled.h2`
  font-size: ${(props) => props.theme.fontSize.md};
  font-weight: ${(props) => props.theme.fontWeight.xbold};
  color: #35917f;
`;

const CheckList = styled.section`
  width: 100%;
  padding: 4px 0;
  gap: 2px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label<any>`
  display: block;
  position: relative;
  padding-left: 32px;

  cursor: pointer;
  font-size: 22px;
  user-select: none;
  transition: padding-left 0.15s ease-in-out;
  :hover {
    padding-left: 35px;
    color: #35917f;
  }
`;

const RadioInput = styled.input.attrs({
  type: "radio",
  name: "howmanyRadio",
})<any>`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  &:checked ~ span,
  &:hover ~ span {
    outline: 3px solid #35917f;
    outline-offset: 2px;
  }
`;

const Circle = styled.span`
  display: block;
  position: absolute;
  top: 2px;
  left: 4px;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 2px solid #35917f;
`;

const TestButton = styled.button<HTMLAttributes<HTMLButtonElement>>`
  width: 100%;
  height: 28px;
  border-radius: 4px;
  background-color: #35917f;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${(props) => props.theme.fontSize.md};
`;
