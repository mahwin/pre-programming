import React, { useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { LogoSvg } from "../assets/svg/LogoSvg";
import useMutation from "../libs/useMutation";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import axios from "axios";
import LocalStorage from "../libs/localStorage";

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
  position: relative;
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

const CurrentPosition = styled(motion.div).attrs({
  layoutId: "position",
})`
  width: 5px;
  height: 5px;
  position: absolute;
  border-radius: 3px;
  margin: 0 auto;
  left: 0;
  bottom: -3px;
  right: 0;
  background-color: ${(props) => props.theme.colorTheme.hoverPrimary};
`;

interface MutationResult {
  ok: boolean;
}

function Nav() {
  const [userInfo, { loading, data, error }] =
    useMutation<MutationResult>("/user");
  useEffect(() => {
    axios
      .get(`${process.env.API_HOST}/user`)
      .then((response) => console.log(response.data))
      .catch((error) => {
        console.warn(error);
      });
  }, []);
  const router = useRouter();
  console.log(userInfo);
  const logoutClick = () => {
    LocalStorage.removeItem("accessToken");
    router.reload();
  };
  console.log(data);
  return (
    <Wapper>
      <NavWapper>
        <FontItemsWapper>
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
                <Link href="/">
                  <a>홈</a>
                </Link>
                {router.route === "/" ? <CurrentPosition /> : null}
              </Item>
              <Item>
                <Link href="/me/voca">
                  <a>내 단어장</a>
                </Link>
                {router.route === "/me/voca" ? <CurrentPosition /> : null}
              </Item>
            </Items>
          )}
        </FontItemsWapper>
        <Items>
          {data ? (
            <>
              <Item>
                <Link href="/me">
                  <a>내 정보</a>
                </Link>
                {router.route === "/me" ? <CurrentPosition /> : null}
              </Item>
              <Item onClick={logoutClick}>로그아웃</Item>
            </>
          ) : (
            <>
              <Item>
                <Link href="/enter">
                  <a>로그인</a>
                </Link>
                {router.route === "/enter" ? <CurrentPosition /> : null}
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
