import styled from "styled-components";
import {
  XMarkSvg,
  RightArrowSvg,
  LeftArrowSvg,
  KeyDownSvg,
  KeyUpSvg,
} from "@svg";
import { motion, AnimatePresence } from "framer-motion";
import { useState, KeyboardEvent } from "react";
import { userVocaColors } from "@color/userVocaColor";
import { IStudy } from "type/userVoca";

const Overay = styled(motion.div)`
  position: fixed;
  top: 0;
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
  border: 2px solid ${userVocaColors.study.borderColor};
`;

const XBtn = styled.div`
  position: absolute;
  top: 1em;
  right: 2em;
  width: 10px;
  height: 10px;
  cursor: pointer;
  :hover {
    svg {
      transition: ease-in-out 0.3s;
      transform: scale(1.1);
      stroke: ${userVocaColors.study.btnHoverColor};
    }
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
  color: ${userVocaColors.study.etcColor};
`;

const CounterBox = styled.div`
  position: absolute;
  height: 50px;
  width: 400px;
  top: 2rem;
  left: 2rem;
  h3 {
    font-size: ${(props) => props.theme.fontSize.xlg};
    color: ${userVocaColors.study.etcColor};
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
const Mean = styled.div`
  width: 100%;
  h3 {
    white-space: pre-wrap;
    font-size: ${(props) => props.theme.fontSize.lg};
    color: white;
  }
`;

export default function Study({ handleClick, amount, spreadData }: IStudy) {
  const [current, setCurrent] = useState<number>(1);

  const handleKeyBoeadEvent = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft" && current > 1) {
      setCurrent((prev) => prev - 1);
    }
    if (e.key === "ArrowUp" && current < amount) {
      if (current <= amount - 10) setCurrent((prev) => prev + 10);
      else setCurrent(amount);
    }
    if (e.key === "ArrowRight" && current < amount) {
      setCurrent((prev) => prev + 1);
    }
    if (e.key === "ArrowDown" && current > 1) {
      if (current >= 11) setCurrent((prev) => prev - 10);
      else setCurrent(1);
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
              {current} / {amount}
            </h3>
          </CounterBox>

          {spreadData && (
            <WordBox>
              <Word>
                <h2>{`${spreadData?.[current - 1].word} : `} </h2>
              </Word>
              <Mean>
                <h3>
                  {eval(spreadData?.[current - 1].mean)
                    .map(
                      (item: string, idx: number) =>
                        idx + 1 + ". " + item + "\n"
                    )
                    .join("")}
                </h3>
              </Mean>
            </WordBox>
          )}
          <KeyBoard>
            <div
              style={{
                color:
                  current > 1 ? userVocaColors.study.etcColor : "transparent",
              }}
            >
              <LeftArrowSvg />
            </div>
            <Col>
              <div>
                <KeyUpSvg />
              </div>
              <div>
                <KeyDownSvg />
              </div>
            </Col>
            <div
              style={{
                color:
                  current < amount
                    ? userVocaColors.study.etcColor
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
