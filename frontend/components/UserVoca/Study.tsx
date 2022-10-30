import styled from "styled-components";
import {
  XMarkSvg,
  RightArrowSvg,
  LeftArrowSvg,
  KeyDownSvg,
  KeyUpSvg,
} from "@svg";
import { motion, AnimatePresence } from "framer-motion";
import { useState, KeyboardEvent, useEffect } from "react";

const Overay = styled(motion.div)`
  position: fixed;
  height: 250%;
  z-index: 999;
  width: 100%;
  background-color: rgba(0, 0, 0, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;

const Container = styled.div`
  position: fixed;
  top: 5em;
  width: ${(props) => props.theme.windowSize.tablet};
  height: 400px;
  border: 2px solid #636e72;
`;

const XBtn = styled.div`
  position: absolute;
  right: 2em;
  top: 1em;
  width: 10px;
  height: 10px;
  cursor: pointer;
  :hover {
    svg {
      stroke: orange;
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
  color: #b2bec3;
`;

const CounterBox = styled.div`
  position: absolute;
  height: 50px;
  width: 400px;
  top: 2rem;
  left: 2rem;

  h3 {
    font-size: ${(props) => props.theme.fontSize.xlg};
    color: #b2bec3;
  }
`;

const Col = styled.div`
  height: 120px;
  width: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
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
    font-size: 40px;
    color: white;
  }
`;

const Word = styled.div`
  width: 500px;
`;
const Mean = styled.div`
  width: 100%;
  h3 {
    white-space: pre-wrap;
    font-size: 24px;
    color: white;
  }
`;

interface IWord {
  word: string;
  mean: string;
  frequency: string;
}
interface IToTalWords {
  [key: string]: IWord[];
}

interface IStudy {
  handleClick: () => void;
  amount: number;
  spreadData: IWord[] | null;
}

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
            <div style={{ color: current > 1 ? "#b2bec3" : "black" }}>
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
            <div style={{ color: current < amount ? "#b2bec3" : "black" }}>
              <RightArrowSvg />
            </div>
            <div></div>
          </KeyBoard>
        </Container>
      </Overay>
    </AnimatePresence>
  );
}
