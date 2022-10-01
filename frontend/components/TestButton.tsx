import styled from "styled-components";
import { TestSvg, DownArrowSvg } from "../assets/svg/RootSvg";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Overlay = styled(motion.div)`
  width: 100vw;
  height: 100%;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

const Cicle = styled(motion.div)`
  border: 1px solid black;
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
  display: block;
  font-size: 20px;
  font-weight: 500;
  margin-left: 20px;
  color: #636e72;
  cursor: pointer;
`;

const RadioInput = styled.input.attrs({
  type: "radio",
})`
  cursor: pointer;
  width: 8%;
  height: 34px;
  margin-bottom: 5px;
  &:after {
    width: 15px;
    height: 15px;
    border-radius: 15px;
    top: 8px;
    left: -1px;
    position: relative;
    background-color: #d1d3d1;
    content: "";
    display: inline-block;
    visibility: visible;
    border: 2px solid white;
  }
  &:checked:after {
    width: 15px;
    height: 15px;
    border-radius: 15px;
    top: 8px;
    left: -1px;
    position: relative;
    background-color: #f96;
    content: "";
    display: inline-block;
    visibility: visible;
    border: 2px solid white;
  }
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

function FloatingButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClick = () => {
    setIsOpen((prev) => !prev);
  };
  const onSubmit = () => {};

  return (
    <>
      {isOpen ? (
        <AnimatePresence>
          <TestInputBox layoutId="test">
            <BtnBox>
              <Title> Test your level ! </Title>
              <Btn onClick={onClick}>
                <DownArrowSvg />
              </Btn>
            </BtnBox>

            <ContentBox>
              <SubTitle>how many :</SubTitle>
              <Ul>
                <li>
                  <RadioInput name="many" />
                  <Label>10 words</Label>
                </li>
                <li>
                  <RadioInput name="many" />
                  <Label>20 words</Label>
                </li>
                <li>
                  <RadioInput name="many" />
                  <Label>30 words</Label>
                </li>
              </Ul>
            </ContentBox>
            <ContentBox>
              <Ul>
                <SubTitle>how long : </SubTitle>
                <li>
                  <RadioInput name="long" />
                  <Label>5 min</Label>
                </li>
                <li>
                  <RadioInput name="long" />
                  <Label>10 min</Label>
                </li>
              </Ul>
            </ContentBox>
            <SubmitButton onClick={onSubmit}>start test</SubmitButton>
          </TestInputBox>
        </AnimatePresence>
      ) : (
        <Cicle onClick={onClick} layoutId="test">
          <Description>실력을 테스트 해보세요!</Description>
          <Shape>
            <TestSvg />
          </Shape>
        </Cicle>
      )}
    </>
  );
}

export default FloatingButton;
