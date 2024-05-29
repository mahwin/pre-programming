import React, { useMemo, useCallback } from "react";
import styled from "styled-components";

import Link from "next/link";
import { useRouter } from "next/router";

import { Space } from "@components/Commons/Space";
import { LogoSvg } from "@svg";

import { navColors } from "@color/navColors";
import { pageRoutes } from "../../apiRouters";

import { WithAuthComponent } from "./WithAuthComponent";

import { api } from "@api/index";

import { authManager } from "@modules/Auth";
import { apiRoutes } from "../../apiRouters";

function HeaderComponent({ isLoggedIn = false }) {
  const router = useRouter();
  const currentNav = useMemo(() => router.asPath, [router]);

  const handleClickLogout = useCallback(() => {
    api.get(apiRoutes.logout);
    authManager.set("");
    router.reload();
  }, []);

  if (!isLoggedIn) {
    return (
      <Wrapper>
        <Items>
          <Item>
            <LogoSvg width="30px" height="30px" />
            <Link href={pageRoutes.main}>
              <Span underline={currentNav === pageRoutes.main}>
                Pre-programming
              </Span>
            </Link>
          </Item>

          <Space as="li" />

          <Item>
            <Link href={pageRoutes.signIn}>
              <Span underline={false}>로그인</Span>
            </Link>
          </Item>
        </Items>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Items>
        <Item>
          <LogoSvg width="30px" height="30px" />
          <Link href={pageRoutes.main}>
            <Span underline={currentNav === pageRoutes.main}>
              Pre-programming
            </Span>
          </Link>
        </Item>

        <Item>
          <Link href={pageRoutes.myVocabulary}>
            <Span underline={currentNav === pageRoutes.myVocabulary}>
              내 단어장
            </Span>
          </Link>
        </Item>

        <Space as="li" />

        <Item>
          <Link href={pageRoutes.me}>
            <Span underline={currentNav === pageRoutes.me}>내 정보</Span>
          </Link>
        </Item>
        <Item>
          <LogOutBtn onClick={handleClickLogout}>
            <Span underline={false}>로그아웃</Span>
          </LogOutBtn>
        </Item>
      </Items>
    </Wrapper>
  );
}

const Header = WithAuthComponent({
  WrappedComponent: HeaderComponent,
  mustLogin: false,
});

export { Header };

const Wrapper = styled.div`
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colorTheme.backgroundColor};
  box-shadow:
    0 1px 3px 0 rgb(0 0 0 / 0.1),
    0 1px 2px -1px rgb(0 0 0 / 0.1);
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colorTheme.textPrimary};
  width: 100%;
  max-width: ${(props) => props.theme.windowSize.tablet};

  gap: 16px;

  span {
    display: block;
  }
  span:first-child {
    margin-top: 4px;
  }
`;

const Item = styled.li<React.HTMLAttributes<HTMLLIElement>>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: ${(props) => props.theme.fontWeight.base};
  cursor: pointer;
`;

const LogOutBtn = styled.button<React.HTMLProps<HTMLDivElement>>`
  background-color: transparent;
  color: ${(props) => props.theme.colorTheme.textPrimary};
  font-size: ${(props) => props.theme.fontSize.base};
  padding: 0;
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
