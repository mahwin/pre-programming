import React from "react";
import styled from "styled-components";
import { useDispatch, connect } from "react-redux";

const Wapper = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.colorTheme.backgroundColor}; ;
`;

const NavWapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.colorTheme.textPrimary};
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
    background-color: ${(props) => props.theme.colorTheme.hoverPrimary};
  }
`;

function Nav() {
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

// function mapStateToProps(state: { isDrak: string }) {
//   return state;
// }

// export default connect(mapStateToProps)(Nav);

export default Nav;
