import styled from "styled-components";
import { TestSvg, DownArrowSvg } from "@svg";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import Quiz from "@components/Commons/Quiz";
import { vocaColors } from "assets/color/vocaColors";

const Wrapper = styled(motion.div)`
  position: fixed;
  bottom: 50px;
  right: 50px;
  z-index: 99;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) => props.theme.colorTheme.hoverPrimary};
  &:hover {
    transform: scale(1.2);
    label {
      display: block;
    }
  }
`;

const Description = styled.label`
  display: none;
  position: absolute;
  width: 100px;
  padding: 10px;
  height: 60px;
  margin-bottom: 150px;
  border-radius: 8px;
  background: ${vocaColors.testBtn.labelBgColor};
  color: ${vocaColors.testBtn.labelTextColor};
  font-size: 14px;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  &:after {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    width: 0;
    height: 0;
    margin: 0 auto;
    border: 1px solid red;
    transform: rotate(180deg);
    border-color: transparent;
    border-bottom-color: ${vocaColors.testBtn.labelBgColor};
    border-width: 10px;
    pointer-events: none;
    content: "";
  }
`;

const SvgBox = styled.div`
  margin-bottom: 5px;
`;

const TestInputBox = styled(motion.div)`
  position: relative;
  z-index: 1;
  position: fixed;
  bottom: 100px;
  right: 50px;
  width: 250px;
  height: 400px;
  padding: 30px;
  background-color: ${vocaColors.testBtn.testInputColor};
  border-radius: 1px;
`;

const TestInputTitle = styled.h2`
  color: ${vocaColors.testBtn.testInputTitleColor};
  font-size: ${(props) => props.theme.fontSize.lg};
  font-weight: ${(props) => props.theme.fontWeight.xxbold};
  margin-bottom: 10px;
`;

const TestInputXBtn = styled.div`
  position: absolute;
  right: 8px;
  top: 30px;
  color: ${vocaColors.testBtn.labelTextColor};
  &:hover {
    cursor: pointer;
    color: ${vocaColors.testBtn.testInputTitleColor};
    transform: scale(1.2);
    transition: ease-in-out 0.3s;
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
  height: 30px;
  width: 100%;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: ${vocaColors.testBtn.testInputTitleColor};
  font-size: ${(props) => props.theme.fontSize.md};
  cursor: pointer;
  :hover {
    background-color: ${vocaColors.testBtn.btnHoverColor};
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
      background-color: ${vocaColors.testBtn.ulHoverColor};
    }
  }
`;

const SubTitle = styled.h3`
  font-size: 20px;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: ${vocaColors.testBtn.labelTextColor};
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
  top: 10vh;
  right: 15vw;
  z-index: 99;
  height: 40px;
  border: none;
  border-radius: 5px;
  :hover {
    color: ${vocaColors.testBtn.btnHoverColor};
    transform: scale(1.2);
  }
`;

interface ITestCondition {
  many: string | null;
  long: string | null;
}

type KeyType = "many" | "long";

function FloatingButton({ testData }: any) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isTestOpen, setIsTestOpen] = useState<boolean>(false);
  const [testCondition, setTestCondition] = useState<ITestCondition>({
    many: null,
    long: null,
  });

  const onToggleTestBtn = () => {
    setIsTestOpen((prev) => !prev);
  };

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
    let isBlank = false;
    keys.forEach((key) => {
      if (testCondition[key as KeyType] === null) {
        alert(`${key === "long" ? "시간을" : "단어수를"} 선택해주세요!`);
        isBlank = true;
      }
    });
    if (isBlank) return;
    setIsTestOpen(true);
    setIsOpen(false);
  };

  return (
    <>
      {isOpen ? (
        <AnimatePresence>
          <TestInputBox layoutId="test">
            <div>
              <TestInputTitle> Test your level ! </TestInputTitle>
              <TestInputXBtn onClick={onToggleBtn}>
                <DownArrowSvg />
              </TestInputXBtn>
            </div>
            <form onSubmit={handleSubmit}>
              <ContentBox>
                <SubTitle>how many :</SubTitle>
                <Ul>
                  <li>
                    <Label>
                      <RadioInput
                        name="many"
                        value="10"
                        onChange={checkHandler}
                      />
                      10 words
                    </Label>
                  </li>
                  <li>
                    <Label>
                      <RadioInput
                        name="many"
                        value="20"
                        onChange={checkHandler}
                      />
                      20 words
                    </Label>
                  </li>
                  <li>
                    <Label>
                      <RadioInput
                        name="many"
                        value="30"
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
                        value="5"
                      />
                      5 min
                    </Label>
                  </li>
                  <li>
                    <Label>
                      <RadioInput
                        name="long"
                        onChange={checkHandler}
                        value="10"
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
        <Wrapper onClick={onToggleBtn} layoutId="test">
          <Description>실력을 테스트 해보세요!</Description>
          <SvgBox>
            <TestSvg />
          </SvgBox>
        </Wrapper>
      )}
      {isTestOpen ? (
        <>
          <Overlay
            initial={{ backgroundColor: "rgba(0,0,0,0)" }}
            animate={{ backgroundColor: "rgba(0,0,0,0.9)" }}
            exit={{ backgroundColor: "rgba(0,0,0,0)" }}
          >
            <Quiz
              vocas={testData}
              howMany={testCondition.many!}
              handleClickTest={onToggleTestBtn}
            />
          </Overlay>
        </>
      ) : null}
    </>
  );
}

export default FloatingButton;