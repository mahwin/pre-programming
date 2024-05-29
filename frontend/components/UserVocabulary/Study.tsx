import { useReducer, useMemo } from "react";

import styled from "styled-components";
import {
  XMarkSvg,
  RightArrowSvg,
  LeftArrowSvg,
  KeyDownSvg,
  KeyUpSvg,
} from "@svg";
import { motion, AnimatePresence } from "framer-motion";
import { KeyboardEvent } from "react";
import { userVocaColor } from "@color/userVocaColor";
import { ClassifiedVocabularyItems } from "@type/commons/classifiedVocabulary";

interface Props {
  isopened: boolean;
  handleClick: () => void;
  spreadSelectedVocabulary: ClassifiedVocabularyItems;
}

const ACTIONS = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"];

type Action = {
  type: (typeof ACTIONS)[number];
};

// curring 이용
const reducer = (amount: number) => (current: number, action: Action) => {
  const PAGE_JUMP = 10;

  switch (action.type) {
    case "ArrowLeft":
      return current > 1 ? current - 1 : current;
    case "ArrowUp":
      return current < amount
        ? current <= amount - PAGE_JUMP
          ? current + PAGE_JUMP
          : amount
        : current;
    case "ArrowRight":
      return current < amount ? current + 1 : current;
    case "ArrowDown":
      return current > 1
        ? current >= PAGE_JUMP + 1
          ? current - PAGE_JUMP
          : 1
        : current;
    default:
      return current;
  }
};

export default function Study({
  isopened,
  handleClick,
  spreadSelectedVocabulary,
}: Props) {
  if (!isopened) return null;

  const lastIdx = useMemo(
    () => spreadSelectedVocabulary.length,
    [spreadSelectedVocabulary]
  );

  const [current, dispatch] = useReducer(reducer(lastIdx), 1);

  const handleKeyBoeadEvent = (e: KeyboardEvent<HTMLDivElement>) => {
    if (ACTIONS.includes(e.key)) {
      dispatch({ type: e.key });
    }
  };

  return (
    <AnimatePresence>
      <Overay
        tabIndex={0}
        onKeyDown={handleKeyBoeadEvent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Container>
          <XBtn onClick={handleClick}>
            <XMarkSvg width="24" height="24" color="white" stroke={4} />
          </XBtn>
          <CounterBox>
            <h3>
              {current} / {lastIdx}
            </h3>
          </CounterBox>

          <WordBox>
            <Word>
              <h2>{`${spreadSelectedVocabulary[current - 1].word} : `} </h2>
            </Word>
            <Mean>
              {spreadSelectedVocabulary[current - 1].mean.map((el, idx) => (
                <li key={idx}>
                  {idx + 1}. {el}
                </li>
              ))}
            </Mean>
          </WordBox>

          <KeyBoard>
            <div
              style={{
                color:
                  current > 1 ? userVocaColor.study.etcColor : "transparent",
              }}
            >
              <LeftArrowSvg />
            </div>
            <Col>
              <div
                style={{
                  color:
                    current === lastIdx
                      ? "transparent"
                      : userVocaColor.study.etcColor,
                }}
              >
                <KeyUpSvg />
              </div>
              <div
                style={{
                  color:
                    current === 1
                      ? "transparent"
                      : userVocaColor.study.etcColor,
                }}
              >
                <KeyDownSvg />
              </div>
            </Col>
            <div
              style={{
                color:
                  current < lastIdx
                    ? userVocaColor.study.etcColor
                    : "transparent",
              }}
            >
              <RightArrowSvg />
            </div>
          </KeyBoard>
        </Container>
      </Overay>
    </AnimatePresence>
  );
}

const Overay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: 999;
  background-color: rgba(0, 0, 0, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;

const Container = styled.section`
  position: relative;
  width: ${(props) => props.theme.windowSize.tablet};
  height: 400px;
  border: 2px solid ${userVocaColor.study.borderColor};
`;

const XBtn = styled.div<React.HTMLAttributes<HTMLElement>>`
  position: absolute;
  top: 1em;
  right: 2em;
  width: 10px;
  height: 10px;
  cursor: pointer;
  :hover > svg {
    transition: ease-in-out 0.3s;
    transform: scale(1.1);
  }
`;
const KeyBoard = styled.div`
  height: 100px;
  width: 200px;
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${userVocaColor.study.etcColor};
`;

const CounterBox = styled.div`
  position: absolute;
  height: 50px;
  width: 400px;
  top: 2rem;
  left: 2rem;
  h3 {
    font-size: ${(props) => props.theme.fontSize.xlg};
    color: ${userVocaColor.study.etcColor};
  }
`;

const Col = styled.div`
  height: 120px;
  width: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const WordBox = styled.div`
  position: absolute;
  height: 200px;
  width: 600px;
  left: 4rem;
  top: 6rem;
  display: flex;
  align-items: center;
  text-align: left;
  justify-content: space-around;
  h2 {
    font-size: ${(props) => props.theme.fontSize.xlg};
    color: white;
  }
`;

const Word = styled.div`
  width: 600px;
`;
const Mean = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 800px;
  li {
    white-space: pre-wrap;
    font-size: ${(props) => props.theme.fontSize.lg};
    color: white;
  }
`;
