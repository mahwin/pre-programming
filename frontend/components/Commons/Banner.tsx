import React from "react";
import styled from "styled-components";
import Search from "./Search";
import Head from "next/head";
export default function Banner() {
  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/banner.webp" />
        <link rel="preload" as="image" href="/banner.png" />
      </Head>
      <Wrapper>
        <Pickture>
          <source srcSet="/banner.webp" type="image/webp" />
          <source srcSet="/banner.png" type="image/png" />
          <img
            src="/banner.png"
            alt="배경화면 입니다"
            width={1600}
            height={300}
          />
        </Pickture>
        <ContentWrapper>
          <header>
            <Title>Pre-Programming</Title>
            <SubTitle>:What to do before you studying programming!</SubTitle>
          </header>
          <Search />
        </ContentWrapper>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Pickture = styled.picture`
  display: block;
  height: 300px;
`;

const ContentWrapper = styled.section`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 1;
`;

const Title = styled.h1`
  font-weight: ${(props) => props.theme.fontWeight.xxbold};
  font-size: ${(props) => props.theme.fontSize.xxlg};
  letter-spacing: 0.2rem;
`;

const SubTitle = styled.h2`
  font-weight: ${(props) => props.theme.fontWeight.base};
  font-size: ${(props) => props.theme.fontSize.lg};
  letter-spacing: 0.1rem;
`;
