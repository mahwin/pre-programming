import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { LogoSvg } from "../assets/svg/LogoSvg";
import useUser from "../libs/useUser";

const Wapper = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 99;
  background-color: ${(props) => props.theme.colorTheme.backgroundColor};
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
`;

const NavWapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.colorTheme.textPrimary};
  max-width: ${(props) => props.theme.windowSize.pc};
`;

const FontItemsWapper = styled.div`
  display: flex;
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
  cursor: pointer;
  &:hover {
    border-radius: 3px;
    background-color: ${(props) => props.theme.colorTheme.hoverPrimary};
  }
`;

const LogoBox = styled.div`
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
  font-weight: ${(props) => props.theme.fontWeight.base};
  p {
    margin-left: 5px;
  }
  &:hover {
    color: ${(props) => props.theme.colorTheme.hoverPrimary};
  }
`;

function Nav() {
  const userInfo = useUser();

  const logoutClick = () => {
    console.log("");
    localStorage.removeItem("accessToken");
  };
  return (
    <Wapper>
      <NavWapper>
        <FontItemsWapper>
          <Link href="/">
            <LogoBox>
              <a>
                <LogoSvg width="30" height="30" />
              </a>
              <p>Pre-programming</p>
            </LogoBox>
          </Link>
          {userInfo && (
            <Items>
              <Item>학습하기</Item>
              <Item>내 단어장</Item>
            </Items>
          )}
        </FontItemsWapper>
        <Items>
          {userInfo ? (
            <>
              <Item>내정보</Item>
              <Item onClick={logoutClick}>로그아웃</Item>
            </>
          ) : (
            <>
              <Item>
                <Link href="/enter">
                  <a>로그인</a>
                </Link>
              </Item>
              <Item>
                <Link href="/enter">
                  <a>회원가입</a>
                </Link>
              </Item>
            </>
          )}
        </Items>
      </NavWapper>
    </Wapper>
  );
}

export default Nav;
