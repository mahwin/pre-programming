import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Wapper = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.colorTheme.secondary}; ;
`;

const NavWapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: ${(props) => props.theme.colorTheme.fontPrimary};
  max-width: ${(props) => props.theme.windowSize.pc};
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  height: 100%;
`;

const Item = styled.li`
  padding: 8px 12px;
  font-weight: ${(props) => props.theme.fontWeight.base};
  &:hover {
    border-radius: 3px;
    background-color: ${(props) => props.theme.colorTheme.hover};
  }
`;
const ToggleBox = styled.div<{ isDark: boolean }>`
  position: relative;
  width: 150px;
  height: 100%;
  margin-right: 20px;
  border-radius: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: black;
  overflow: hidden;
  cursor: pointer;
  justify-content: ${(props) => (props.isDark ? "end" : "start")};
`;

const Toggle = styled(motion.div)`
  z-index: 1;
  height: 100%;
  width: 80px;
  border-radius: 20px;
  background-color: white;

  opacity: 0.3;
`;

const ToggleItem = styled.p<{ isRight: boolean }>`
  position: absolute;
  ${(props) => (props.isRight ? "right: 20px;" : "left: 20px;")};
  font-size: ${(props) => props.theme.fontSize.base};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: white;
`;

export default function Nav() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const onToggleClick = () => {
    setIsDark((prev) => !prev);
  };
  return (
    <Wapper>
      <NavWapper>
        <Items>
          <Item>로고</Item>
          <Item>학습하기</Item>
          <Item>내 단어장</Item>
        </Items>

        <Items>
          <ToggleBox onClick={onToggleClick} isDark={isDark}>
            <Toggle layout />
            <ToggleItem isRight={false}>Light</ToggleItem>
            <ToggleItem isRight={true}>Dark</ToggleItem>
          </ToggleBox>
          <Item>로그인</Item>
          <Item>회원가입</Item>
        </Items>
      </NavWapper>
    </Wapper>
  );
}
