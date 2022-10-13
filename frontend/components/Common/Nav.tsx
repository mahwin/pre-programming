import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { LogoSvg } from "@svg";
import { useRouter } from "next/router";
import LocalStorage from "@utils/localStorage";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimateSharedLayout, LayoutGroup } from "framer-motion";
import { userActions } from "../../redux/user/userSlice";

const Wapper = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  height: 60px;
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

const Row = styled.div`
  display: flex;
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  height: 100%;
`;

const Item = styled.li`
  display: relative;
  padding: 8px 12px;
  font-weight: ${(props) => props.theme.fontWeight.base};
  cursor: pointer;
  a {
    padding: 10px;
    :hover {
      color: white;
      border-radius: 3px;
      background-color: ${(props) => props.theme.colorTheme.hoverPrimary};
    }
  }
  :last-child:hover {
    color: darkorange;
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

const CurrentPosition = styled(motion.div)`
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 5px;
  height: 5px;
  border-radius: 3px;
  background-color: ${(props) => props.theme.colorTheme.hoverPrimary};
`;

interface MutationResult {
  ok: boolean;
}

type currentNavType = "/" | "/me/voca" | "/me" | "/signIn";

function Nav() {
  const { loading, data, error } = useSelector(
    (state: any) => state.userReducer
  );
  const [currentNav, setCurrentNav] = useState<currentNavType>("/");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getUser());
  }, []);

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
        <Row>
          <>
            <Link href="/">
              <LogoBox>
                <a>
                  <LogoSvg width="30" height="30" />
                </a>
                <p>Pre-programming</p>
              </LogoBox>
            </Link>
          </>
          {data && (
            <LayoutGroup>
              <Items>
                <Item>
                  <Link href="/" id="home">
                    <a>홈</a>
                  </Link>
                  {currentNav === "/" && <CurrentPosition layout />}
                </Item>
                <Item>
                  <Link href="/me/voca">
                    <a>내 단어장</a>
                  </Link>
                  {currentNav === "/me/voca" && <CurrentPosition layout />}
                </Item>
              </Items>
            </LayoutGroup>
          )}
        </Row>
        <Items>
          {data ? (
            <>
              <Item>
                <Link href="/me">
                  <a>내 정보</a>
                </Link>
                <div>{currentNav === "/me" && <CurrentPosition layout />}</div>
              </Item>
              <Item onClick={logoutClick}>로그아웃</Item>
            </>
          ) : (
            <>
              <Item>
                <Link href="/signIn">
                  <a>로그인</a>
                </Link>
                {currentNav === "/signIn" && <CurrentPosition layout />}
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
