import styled from "styled-components";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { DownArrowSvg, StudySvg, QuizSvg } from "@svg";
import Study from "./Study";
import Quiz from "@components/Commons/Quiz";
import { userVocaColors } from "@color/userVocaColor";

const Wrapper = styled(motion.section)`
  z-index: 99;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  position: fixed;
  right: 4em;
  bottom: 4em;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${userVocaColors.floatBtn.bgColor};
  button {
    appearance: none;
    border: none;
    display: flex;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: transparent;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: ${(props) => props.theme.fontSize.lg};
    cursor: pointer;
    :hover {
      color: ${userVocaColors.floatBtn.hoverColor};
    }
  }
`;

const BtnWrapper = styled.div`
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

const TwoBtnBox = styled(motion.div)`
  position: absolute;
  top: -4em;
  width: 120px;
  height: 50px;
  border-radius: 10px;
  background-color: ${userVocaColors.floatBtn.bgColor};
  transition: all 0.4s ease-in-out;
  display: flex;
  justify-content: space-around;
  div:nth-child(1) {
    margin-top: 3px;
    svg:hover {
      stroke: ${userVocaColors.floatBtn.hoverColor};
    }
  }
  div:nth-child(2) {
    margin-top: 2px;
    svg:hover {
      fill: ${userVocaColors.floatBtn.hoverColor};
    }
  }
`;

const QuizMaker = styled(motion.section)`
  padding: 12px;
  position: absolute;
  background-color: ${userVocaColors.floatBtn.bgColor};
  top: -150px;
  right: 0px;
  width: 200px;
  border-radius: 5px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  color: white;
  height: 0px;
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
    color: ${userVocaColors.floatBtn.bgColor};
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

const QuizMakerVariants: Variants = {
  open: {
    clipPath: "inset(0% 0% 0% 0%)",
    height: "130px",
    transition: {
      type: "linear",
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
  closed: {
    clipPath: "inset(100% 0% 0% 0%)",
    height: "0px",
    transition: {
      type: "linear",
      bounce: 0,
      duration: 0.3,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
};

interface IWord {
  word: string;
  mean: string;
  frequency: string;
}
interface IToTalWords {
  [key: string]: IWord[];
}

interface IFloatingBtn {
  amount: number;
  data: IToTalWords[];
}

export default function FloatingBtn({ amount, data }: IFloatingBtn) {
  const [spreadData, setSpreadData] = useState<IWord[] | null>(null);

  const [maxNumber, setMaxNumber] = useState<number>(0);
  const [inputN, setInputN] = useState<string>("");

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isStudyOpen, setIsStudyOpen] = useState<boolean>(false);
  const [isQuizMakerOpen, setQuizMakerOpen] = useState<boolean>(false);
  const [isQuizOpen, setQuizOpen] = useState<boolean>(false);

  useEffect(() => {
    setMaxNumber(Math.floor(amount / 4));
  }, [amount]);

  useEffect(() => {
    let spread: IWord[] = [];
    data.forEach((items) => {
      spread = spread.concat(Object.values(items)[0]);
    });
    setSpreadData(spread);
  }, [data]);

  const handleBtnClick = () => {
    setIsOpen((prev) => !prev);
    setQuizMakerOpen(false);
  };

  const handleClickQuizMaker = () => {
    setQuizMakerOpen((prev) => !prev);
  };

  const handleClickStudy = () => {
    setQuizOpen(false);
    setIsStudyOpen((prev) => !prev);
  };

  const handleClickQuiz = () => {
    setIsStudyOpen(false);
    setQuizOpen((prev) => !prev);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const onlyNum = value.replace(/[^0-9]/g, "");

    if (+onlyNum <= maxNumber) {
      setInputN(onlyNum);
    } else {
      setInputN(maxNumber + "");
    }
  };

  return (
    <>
      <Wrapper>
        <button onClick={handleBtnClick}>
          {isOpen ? <DownArrowSvg stroke={3} /> : "+"}
        </button>
        <AnimatePresence>
          {isOpen && (
            <TwoBtnBox>
              <BtnWrapper onClick={handleClickStudy}>
                <StudySvg />
                <Description>{`${amount} 개의 단어를 학습합니다.`}</Description>
              </BtnWrapper>
              <BtnWrapper onClick={handleClickQuizMaker}>
                <QuizSvg />
                <Description>실력을 테스트 해보세요!</Description>
              </BtnWrapper>
              {isQuizMakerOpen && (
                <QuizMaker
                  variants={QuizMakerVariants}
                  animate={isQuizMakerOpen ? "open" : "close"}
                >
                  <div>
                    <label>문제 수 입력</label>
                    <InputBox>
                      <input value={inputN} onChange={handleInput}></input>
                      <span> / {maxNumber}</span>
                    </InputBox>
                    <QuizStartBtn>
                      {Number(inputN) > 0 ? (
                        <button onClick={handleClickQuiz}>Can Start !</button>
                      ) : (
                        <h3>Fill Input !</h3>
                      )}
                    </QuizStartBtn>
                  </div>
                </QuizMaker>
              )}
            </TwoBtnBox>
          )}
        </AnimatePresence>
      </Wrapper>
      {spreadData && isStudyOpen && (
        <Study
          handleClick={handleClickStudy}
          amount={amount}
          spreadData={spreadData}
        />
      )}
      {spreadData && isQuizOpen && (
        <Quiz
          vocas={spreadData}
          howMany={inputN}
          handleClick={handleClickQuiz}
        />
      )}
    </>
  );
}
