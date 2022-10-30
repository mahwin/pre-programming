import styled from "styled-components";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { DownArrowSvg, StudySvg, TestSvg } from "@svg";
import Study from "./Study";
import Test from "./Test";

const Wrapper = styled(motion.div)`
  z-index: 99;
  position: fixed;
  height: 50px;
  width: 50px;
  right: 4em;
  bottom: 4em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  background-color: rgb(29, 46, 81);
  button {
    appearance: none;
    border: none;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 40px;
    cursor: pointer;
    :hover {
      background-color: #152649;
    }
    :active {
      background-color: #0d1e41;
    }
  }
`;

const StudyDescription = styled.p`
  z-index: 999;
  display: none;
  position: absolute;
  width: 100px;
  left: -35px;
  top: -80px;
  padding: 10px;
  height: 60px;
  border-radius: 8px;
  background: #0d1e41;
  color: #fff;
  font-size: 13px;
  white-space: pre-wrap;
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
    border-color: rgba(51, 51, 51, 0);
    border-bottom-color: #0d1e41;
    border-width: 10px;
    pointer-events: none;
    content: "";
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
  background: #0d1e41;
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
    border-color: rgba(51, 51, 51, 0);
    border-bottom-color: #0d1e41;
    border-width: 10px;
    pointer-events: none;
    content: "";
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

const TwoBtn = styled(motion.div)`
  position: absolute;
  top: -4em;
  width: 120px;
  height: 50px;
  border-radius: 10px;
  background-color: #0d1e41;
  transition: all 0.4s ease-in-out;
  display: flex;
  justify-content: space-around;
  div:nth-child(1) {
    margin-top: 3px;
    svg:hover {
      stroke: orange;
    }
  }
  div:nth-child(2) {
    margin-top: 2px;
    svg:hover {
      fill: orange;
    }
  }
`;

const TestMakerWrapper = styled(motion.div)`
  position: absolute;
  background-color: #0d1e41;
  top: -150px;
  right: 0px;
  width: 200px;
  border-radius: 5px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  color: white;
  height: 0px;
`;

const TestMaker = styled.div`
  padding: 12px;
`;

const InputBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  padding-top: 5px;
  input {
    font-size: 22px;
    width: 100px;
  }
  span {
    display: inline-flex;
    width: 100px;
    justify-content: center;
    font-size: 26px;
  }
`;

const BtnBox = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
  button {
    width: 100%;
    height: 30px;
    border-radius: 5px;
    background-color: white;
    color: #0d1e41;
    font-size: 20px;
    cursor: pointer;
    :hover {
      background-color: rgba(255, 255, 255, 0.8);
      transition: all 0.25s ease-in-out;
      box-shadow: inset 0 0 0 2px #1e90ff;
    }
  }
  h3 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 30px;
    font-size: 20px;
    font-weight: 600;
    border-radius: 5px;
    background-color: rgba(200, 200, 200, 0.5);
    color: #ffa502;
    cursor: not-allowed;
  }
`;

const TestMakerVariants: Variants = {
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

interface IFloatingBtn {
  amount: number;
  data: IToTalWords[];
}

interface IWord {
  word: string;
  mean: string;
  frequency: string;
}
interface IToTalWords {
  [key: string]: IWord[];
}

export default function FloatingBtn({ amount, data }: IFloatingBtn) {
  const [spreadData, setSpreadData] = useState<IWord[] | null>(null);

  const [maxNumber, setMaxNumber] = useState<number>(0);
  const [inputN, setInputN] = useState<string>("");

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isStudyOpen, setIsStudyOpen] = useState<boolean>(false);
  const [isTestMakerOpen, setTestMAkerOpen] = useState<boolean>(false);
  const [isTestOpen, setIsTestOpen] = useState<boolean>(false);

  useEffect(() => {
    setMaxNumber(Math.floor(amount / 4));
  }, [amount]);

  useEffect(() => {
    let spread: IWord[] = [];
    data.forEach((items) => {
      console.log(Object.values(items)[0]);
      spread = spread.concat(Object.values(items)[0]);
    });
    setSpreadData(spread);
  }, [data]);

  const handleBtnClick = () => {
    setIsOpen((prev) => !prev);
    setTestMAkerOpen(false);
  };

  const handleClickTestMaker = () => {
    setTestMAkerOpen((prev) => !prev);
  };

  const handleClickStudy = () => {
    setIsTestOpen(false);
    setIsStudyOpen((prev) => !prev);
  };

  const handleClickTest = () => {
    setIsStudyOpen(false);
    setIsTestOpen((prev) => !prev);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const onlyNum = value.replace(/[^0-9]/g, "");
    console.log(onlyNum);
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
          {isOpen ? (
            <TwoBtn>
              <BtnWrapper onClick={handleClickStudy}>
                <StudySvg />
                <StudyDescription>
                  {`${amount} 개의 단어를 학습합니다.`}
                </StudyDescription>
              </BtnWrapper>
              <BtnWrapper onClick={handleClickTestMaker}>
                <TestSvg />
                <Description>실력을 테스트 해보세요!</Description>
              </BtnWrapper>
              {isTestMakerOpen && (
                <TestMakerWrapper
                  variants={TestMakerVariants}
                  animate={isTestMakerOpen ? "open" : "close"}
                >
                  <TestMaker>
                    <p>문제 수 입력</p>
                    <InputBox>
                      <input value={inputN} onChange={handleInput}></input>
                      <span> / {maxNumber}</span>
                    </InputBox>
                    <BtnBox>
                      {+inputN > 0 ? (
                        <button onClick={handleClickTest}>Can Start !</button>
                      ) : (
                        <h3>Fill Input !</h3>
                      )}
                    </BtnBox>
                  </TestMaker>
                </TestMakerWrapper>
              )}
            </TwoBtn>
          ) : null}
        </AnimatePresence>
      </Wrapper>
      {spreadData && isStudyOpen && (
        <Study
          handleClick={handleClickStudy}
          amount={amount}
          spreadData={spreadData}
        />
      )}
      {spreadData && isTestOpen && <Test vocas={spreadData} howMany={inputN} />}
    </>
  );
}
