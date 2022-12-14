import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { LogoSvg } from "@svg";
import { useRouter } from "next/router";
import LocalStorage from "@utils/localStorage";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { userActions } from "../../redux/user/userSlice";

const Wapper = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
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
  button {
    padding: 8px 12px;
    border: none;
    background-color: transparent;
    color: ${(props) => props.theme.colorTheme.textPrimary};
    font-weight: ${(props) => props.theme.fontWeight.base};
    font-size: ${(props) => props.theme.fontSize.base};
    cursor: pointer;
    &:hover {
      border-radius: 3px;
      color: darkorange;
      transition: color 0.3s ease-in-out;
    }
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

const CurrentPosition = styled(motion.span).attrs({
  layoutId: "position",
  initial: false,
})`
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: 10px;
  width: 5px;
  height: 5px;
  border-radius: 3px;
  background-color: ${(props) => props.theme.colorTheme.hoverPrimary};
`;

interface MutationResult {
  ok: boolean;
}

type currentNavType = "/" | "/me/vocas" | "/me" | "/signIn";

function Nav() {
  const { loading, data, error } = useSelector((state: any) => {
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
            <Items>
              <Item>
                <Link href="/" id="home">
                  <a>???</a>
                </Link>
                {currentNav === "/" && <CurrentPosition />}
              </Item>
              <Item>
                <Link href="/me/vocas">
                  <a>??? ?????????</a>
                </Link>
                {currentNav === "/me/vocas" && <CurrentPosition />}
              </Item>
            </Items>
          )}
        </Row>
        <Items>
          {data ? (
            <>
              <Item>
                <Link href="/me">
                  <a>??? ??????</a>
                </Link>
                {currentNav === "/me" && <CurrentPosition />}
              </Item>
              <Item>
                <button onClick={logoutClick}>????????????</button>
              </Item>
            </>
          ) : (
            <>
              <Item>
                <Link href="/signIn">
                  <a>?????????</a>
                </Link>
                {currentNav === "/signIn" && <CurrentPosition />}
              </Item>
              <Item>
                <Link href="/signIn">
                  <a>????????????</a>
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
