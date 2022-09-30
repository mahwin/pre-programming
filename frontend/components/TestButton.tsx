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
  width: 300px;
  height: 200px;
  background-color: white;
  border-radius: 5px;
`;

const BtnBox = styled.div`
  position: relative;
  border-bottom: 1px solid #4e5066;
  display: flex;
  flex-direction: row-reverse;
  padding: 10px;
  height: 40px;
  width: 100%;
  overflow: hidden;
`;

const ContentBox = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
`;

const Btn = styled.div`
  position: absolute;
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colorTheme.hoverPrimary};
    transform: scale(1.2);
  }
`;

const StartBtn = styled.div`
  border-top: 1px solid #4e5066;
  height: 40px;
  width: 100%;
  position: absolute;
  bottom: 0;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
`;

function FloatingButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClick = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      {isOpen ? (
        <AnimatePresence>
          <TestInputBox layoutId="test">
            <BtnBox>
              <Btn onClick={onClick}>
                <DownArrowSvg />
              </Btn>
            </BtnBox>
            <ContentBox>
              <InputBox>
                <label>단어 수</label>
                <input />
              </InputBox>
              <InputBox>
                <label>시간</label>
                <input />
              </InputBox>
            </ContentBox>
            <StartBtn />
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
