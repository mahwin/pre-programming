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
import { Space } from "@components/Commons/Space";

type currentNavType = "/" | "/me/vocas" | "/me" | "/signIn";

function Nav() {
  const { data: userInfo } = useSelector((state: IState) => state.user);

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
    <Wrapper>
      <NavWapper>
        <Items>
          <Item visibilty={true}>
            <Link href="/">
              <LogoBox>
                <LogoSvg width="30" height="30" />
                <p>Pre-programming</p>
              </LogoBox>
            </Link>
            {currentNav === "/" && <CurrentPosition />}
          </Item>

          <Item visibilty={userInfo !== null}>
            <Link href="/me/vocas">
              <span>내 단어장</span>
            </Link>
            {currentNav === "/me/vocas" && <CurrentPosition />}
          </Item>

          <Space as="li" />

          <Item visibilty={userInfo !== null}>
            <Link href="/me">
              <span>내 정보</span>
            </Link>
            {currentNav === "/me" && <CurrentPosition />}
          </Item>
          <Item visibilty={userInfo !== null}>
            <LogOutBtn onClick={logoutClick}>로그아웃</LogOutBtn>
          </Item>
          <Item visibilty={userInfo === null}>
            <Link href="/signIn">
              <a>로그인</a>
            </Link>
            {currentNav === "/signIn" && <CurrentPosition />}
          </Item>
        </Items>
      </NavWapper>
    </Wrapper>
  );
}

export default Nav;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 55px;
  z-index: 99;
  background-color: ${(props) => props.theme.colorTheme.backgroundColor};
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
`;

const NavWapper = styled.section`
  display: flex;
  width: 100%;
  justify-content: space-between;
  color: ${(props) => props.theme.colorTheme.textPrimary};
  max-width: ${(props) => props.theme.windowSize.tablet};
`;
const Items = styled.ul`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
`;

const Item = styled.li<
  React.HTMLAttributes<HTMLLIElement> & { visibilty: boolean }
>`
  display: ${(props) => (props.visibilty ? "block" : "none")};
  position: relative;
  font-weight: ${(props) => props.theme.fontWeight.base};

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

const LogOutBtn = styled.button<React.HTMLProps<HTMLDivElement>>`
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
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
  font-weight: ${(props) => props.theme.fontWeight.base};
  p {
    margin: 0 10px;
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
  bottom: -5px;
  width: 100%;
  max-width: 50px;
  height: 4px;
  border-radius: 2px;
  background-color: ${(props) => props.theme.colorTheme.hoverPrimary};
  opacity: 0.5;
`;
