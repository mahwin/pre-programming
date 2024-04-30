import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { LogoSvg } from "@svg";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@redux/user/userSlice";
import { IState } from "@redux/initialState";
import { navColors } from "@color/navColors";
import { Space } from "@components/Commons/Space";
import { authManager } from "@modules/Auth";
import { api } from "@api/index";
import { isNil } from "@utils/typeGuard";

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
    api.get("/auth/signout");
    authManager.set("");
    router.reload();
  };

  return (
    <Wrapper>
      <Items>
        <Item visibilty={true}>
          <LogoSvg width="30px" height="30px" />
          <Link href="/">
            <Span underline={currentNav === "/"}>Pre-programming</Span>
          </Link>
        </Item>

        <Item visibilty={!isNil(userInfo)}>
          <Link href="/me/vocas">
            <Span underline={currentNav === "/me/vocas"}>내 단어장</Span>
          </Link>
        </Item>

        <Space as="li" />

        <Item visibilty={!isNil(userInfo)}>
          <Link href="/me">
            <Span underline={currentNav === "/me"}>내 정보</Span>
          </Link>
        </Item>
        <Item visibilty={!isNil(userInfo)}>
          <LogOutBtn onClick={logoutClick}>로그아웃</LogOutBtn>
        </Item>
        <Item visibilty={isNil(userInfo)}>
          <Link href="/signIn">
            <Span underline={currentNav === "/me"}>로그인</Span>
          </Link>
        </Item>
      </Items>
    </Wrapper>
  );
}

export default Nav;

const Wrapper = styled.div`
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colorTheme.backgroundColor};
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colorTheme.textPrimary};
  width: 100%;
  max-width: ${(props) => props.theme.windowSize.tablet};

  gap: 16px;
`;

const Item = styled.li<
  React.HTMLAttributes<HTMLLIElement> & { visibilty: boolean }
>`
  display: ${(props) => (props.visibilty ? "flex" : "none")};
  align-items: center;
  gap: 10px;
  font-weight: ${(props) => props.theme.fontWeight.base};
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
  background-color: transparent;
  color: ${(props) => props.theme.colorTheme.textPrimary};
  font-size: ${(props) => props.theme.fontSize.base};

  border-bottom: 2px solid transparent;
  &:hover {
    border-radius: 3px;
    color: ${navColors.hoverColor};
    transition: color 0.3s ease-in-out;
  }
`;

const Span = styled.span<
  React.HTMLAttributes<HTMLSpanElement> & { underline: boolean }
>`
  border-bottom: 2px solid;
  border-color: ${({ underline, theme }) =>
    underline ? theme.colorTheme.hoverPrimary : "transparent"};
`;
