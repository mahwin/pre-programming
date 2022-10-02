import styled from "styled-components";
import { TestSvg, DownArrowSvg } from "../assets/svg/RootSvg";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import Quiz from "./Quiz";

const Cicle = styled(motion.div)`
  z-index: 99;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 50px;
  right: 50px;
  cursor: pointer;
  background-color: ${(props) => props.theme.colorTheme.hoverPrimary};
  &:hover {
    stroke: red;
    transform: scale(1.1);
    p {
      display: block;
    }
  }
`;

const Description = styled.p`
  display: none;
  position: absolute;
  width: 100px;
  padding: 10px;
  height: 60px;
  margin-bottom: 150px;
  border-radius: 8px;
  background: #d1ccc0;
  color: #fff;
  font-size: 14px;
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
    border-bottom-color: #d1ccc0;
    border-width: 10px;
    pointer-events: none;
    content: "";
  }
`;

const Shape = styled.span`
  margin-top: 2px;
  font-size: 36px;
  font-weight: 500;
  color: white;
`;

const TestInputBox = styled(motion.div)`
  z-index: 1;
  position: fixed;
  bottom: 100px;
  right: 50px;
  width: 250px;
  height: 400px;
  padding: 24px;
  background-color: #f9f9f9;
  border-radius: 1px;
`;

const BtnBox = styled.div`
  display: flex;
`;
const Title = styled.h2`
  color: #f96;
  font-size: 24px;
  font-weight: 900;
  margin-bottom: 10px;
`;

const Btn = styled.div`
  position: absolute;
  right: 0;
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colorTheme.hoverPrimary};
    transform: scale(1.2);
  }
`;

const Label = styled.label`
  display: flex;

  align-items: center;
  font-size: 20px;
  font-weight: 500;
  color: #636e72;
  vertical-align: middle;
  cursor: pointer;
  width: 300px;
  &:before {
    width: 15px;
    height: 15px;
    right: 0;
    top: 0;
    border-radius: 15px;
    position: relative;
    background-color: #e8e8e8;
    content: "";
    display: inline-block;
    visibility: visible;
    border: 2px solid white;
  }
  input:checked::after {
    width: 10px;
    height: 10px;
    right: 22px;
    top: 10px;
    border-radius: 15px;
    position: relative;
    background-color: #e8e8e8;

    content: "";
    display: inline-block;
    visibility: visible;
    border: 3px solid #f96;
  }
`;

const RadioInput = styled.input.attrs({
  type: "radio",
  require: true,
})`
  cursor: pointer;
  width: 8%;
  height: 34px;
  margin-bottom: 5px;
  appearance: none;
`;

const ContentBox = styled.div`
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #f96;
  height: 30px;
  color: white;
  border: none;
  cursor: pointer;
  :hover {
    background: #f97f51;
    transition: background-color 0.3s ease-in-out;
  }
`;

const Ul = styled.ul`
  cursor: pointer;
  li {
    display: flex;
    align-items: center;
    :hover {
      border-radius: 2px;
      background-color: lightgray;
    }
  }
`;

const SubTitle = styled.h3`
  font-size: 20px;
  font-weight: 500;
  color: #2d3436;
`;

const Overlay = styled(motion.div)`
  width: 100vw;
  height: 100%;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const TestCloseBtn = styled.button`
  position: absolute;
  top: 15vh;
  right: 15vw;
  z-index: 99;
  height: 40px;
  border: none;
  border-radius: 5px;
  :hover {
    color: orangered;
    transform: scale(1.2);
  }
`;

interface ITestCondition {
  many: string | null;
  long: string | null;
}

type KeyType = "many" | "long";

interface ITestData {
  word: string;
  correct: string;
  example: string;
  exampl1: string;
  exampl2: string;
}

function FloatingButton({ testData }: any) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isTestOpen, setIsTestOpen] = useState<boolean>(false);
  const [testCondition, setTestCondition] = useState<ITestCondition>({
    many: null,
    long: null,
  });
  const onToggleBtn = () => {
    setIsOpen((prev) => !prev);
  };

  const checkHandler = ({ target }: any) => {
    const copy = { ...testCondition };
    copy[target.name as KeyType] = target.value;
    setTestCondition({ ...copy });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const keys = Object.keys(testCondition);
    const blank = keys.map((key) => {
      if (testCondition[key as KeyType] === null) {
        alert(`${key === "long" ? "시간을" : "단어수를"} 선택해주세요!`);
        return key;
      }
    });
    if (!blank) return;
    setIsTestOpen(true);
    setIsOpen(false);
  };

  return (
    <>
      {isOpen ? (
        <AnimatePresence>
          <TestInputBox layoutId="test">
            <BtnBox>
              <Title> Test your level ! </Title>
              <Btn onClick={onToggleBtn}>
                <DownArrowSvg />
              </Btn>
            </BtnBox>
            <form onSubmit={handleSubmit}>
              <ContentBox>
                <SubTitle>how many :</SubTitle>
                <Ul>
                  <li>
                    <Label>
                      <RadioInput
                        name="many"
                        value="10_words"
                        onChange={checkHandler}
                      />
                      10 words
                    </Label>
                  </li>
                  <li>
                    <Label>
                      <RadioInput
                        name="many"
                        value="20_words"
                        onChange={checkHandler}
                      />
                      20 words
                    </Label>
                  </li>
                  <li>
                    <Label>
                      <RadioInput
                        name="many"
                        value="30_words"
                        onChange={checkHandler}
                      />
                      30 words
                    </Label>
                  </li>
                </Ul>
              </ContentBox>
              <ContentBox>
                <Ul>
                  <SubTitle>how long : </SubTitle>

                  <li>
                    <Label>
                      <RadioInput
                        name="long"
                        onChange={checkHandler}
                        value="5_mins"
                      />
                      5 min
                    </Label>
                  </li>
                  <li>
                    <Label>
                      <RadioInput
                        name="long"
                        onChange={checkHandler}
                        value="10_mins"
                      />
                      10 min
                    </Label>
                  </li>
                </Ul>
              </ContentBox>
              <SubmitButton type="submit">start test</SubmitButton>
            </form>
          </TestInputBox>
        </AnimatePresence>
      ) : (
        <Cicle onClick={onToggleBtn} layoutId="test">
          <Description>실력을 테스트 해보세요!</Description>
          <Shape>
            <TestSvg />
          </Shape>
        </Cicle>
      )}
      {isTestOpen ? (
        <>
          <Overlay
            initial={{ backgroundColor: "rgba(0,0,0,0)" }}
            animate={{ backgroundColor: "rgba(0,0,0,0.7)" }}
            exit={{ backgroundColor: "rgba(0,0,0,0)" }}
          >
            <TestCloseBtn
              onClick={() => {
                setIsTestOpen(false);
              }}
            >
              Stop
            </TestCloseBtn>
            <Quiz testData={testData} testCondition={testCondition} />
          </Overlay>
        </>
      ) : null}
    </>
  );
}

export default FloatingButton;
