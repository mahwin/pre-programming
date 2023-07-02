import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { LogoSvg } from "@svg";
import { useRouter } from "next/router";
import LocalStorage from "@utils/localStorage";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { userActions } from "@redux/user/userSlice";
import { IState } from "@redux/initialState";
import { navColors } from "@color/navColors";

const Wapper = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  height: 55px;
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

const Items = styled.ul`
  display: flex;
  align-items: center;
  padding: 8px 12px;
`;

const Item = styled.li`
  position: relative;
  font-weight: ${(props) => props.theme.fontWeight.base};
  padding: 8px 12px;
  color: ${(props) => props.theme.colorTheme.textPrimary};
  cursor: pointer;
  a {
    display: block;
    padding: 10px;
    &:hover {
      border-radius: 3px;
      background-color: ${(props) => props.theme.colorTheme.hoverPrimary};
      transition: background-color 0.3s ease-in-out;
    }
  }
`;

const LogOutBtn = styled.button`
  padding: 8px 12px;
  background-color: transparent;
  color: ${(props) => props.theme.colorTheme.textPrimary};
  font-size: ${(props) => props.theme.fontSize.base};

  &:hover {
    border-radius: 3px;
    color: ${navColors.hoverColor};
    transition: color 0.3s ease-in-out;
  }
`;

const LogoBox = styled.div`
  padding: 12px 20px;
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

const CurrentPosition = styled(motion.span).attrs({
  layoutId: "position",
  initial: false,
})`
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: 10px;
  width: 20px;
  height: 4px;
  border-radius: 2px;
  background-color: ${(props) => props.theme.colorTheme.hoverPrimary};
  opacity: 0.5;
`;

type currentNavType = "/" | "/me/vocas" | "/me" | "/signIn";

function Nav() {
  const { loading, data, error } = useSelector((state: IState) => {
    return state.user;
  });

  const [currentNav, setCurrentNav] = useState<currentNavType>("/");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.getUser());
  }, [dispatch]);

  const router = useRouter();
  useEffect(() => {
    setCurrentNav(router.asPath as currentNavType);
  }, [router]);

  const logoutClick = () => {
    LocalStorage.removeItem("accessToken");
    router.reload();
  };

  return (
    <Wapper>
      <NavWapper>
        <Items>
          <Item>
            <Link href="/">
              <LogoBox>
                <LogoSvg width="30" height="30" />
                <p>Pre-programming</p>
              </LogoBox>
            </Link>
          </Item>
          {data && (
            <Items>
              <Item>
                <Link href="/" id="home">
                  <a>홈</a>
                </Link>
                {currentNav === "/" && <CurrentPosition />}
              </Item>
              <Item>
                <Link href="/me/vocas">
                  <a>내 단어장</a>
                </Link>
                {currentNav === "/me/vocas" && <CurrentPosition />}
              </Item>
            </Items>
          )}
        </Items>
        <Items>
          {data ? (
            <>
              <Item>
                <Link href="/me">
                  <a>내 정보</a>
                </Link>
                {currentNav === "/me" && <CurrentPosition />}
              </Item>
              <Item>
                <LogOutBtn onClick={logoutClick}>로그아웃</LogOutBtn>
              </Item>
            </>
          ) : (
            <>
              <Item>
                <Link href="/signIn">
                  <a>로그인</a>
                </Link>
                {currentNav === "/signIn" && <CurrentPosition />}
              </Item>
              <Item>
                <Link href="/signIn">
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
