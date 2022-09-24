import React from "react";
import styled from "styled-components";

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

  color: ${(props) => props.theme.colorTheme.fontPrimary};
  max-width: ${(props) => props.theme.windowSize.pc};
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
  padding: 8px 12px;
`;

const Item = styled.li`
  padding: 8px 12px;
  font-weight: ${(props) => props.theme.fontWeight.base};
  &:hover {
    border-radius: 3px;
    background-color: ${(props) => props.theme.colorTheme.hover};
  }
`;

export default function Nav() {
  return (
    <Wapper>
      <NavWapper>
        <Items>
          <Item>로고</Item>
          <Item>학습하기</Item>
          <Item>내 단어장</Item>
        </Items>
        <Items>
          <Item>로그인</Item>
          <Item>회원가입</Item>
        </Items>
      </NavWapper>
    </Wapper>
  );
}
