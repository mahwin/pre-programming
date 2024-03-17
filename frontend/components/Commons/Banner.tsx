import React from "react";
import styled from "styled-components";
import Search from "./Search";
import Image from "next/image";

export default function Banner() {
  return (
    <Wrapper>
      <Image
        src="/banner.png"
        alt="배경화면 입니다"
        width={1600}
        height={300}
        layout="fixed"
        quality={100}
        priority={true}
      />
      <ContentWrapper>
        <TitleBox>
          <Title>Pre-Programming</Title>
          <SubTitle>:What to do before you studying programming!</SubTitle>
        </TitleBox>
        <Search />
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  display: relative;
`;

const ContentWrapper = styled.section`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleBox = styled.header`
  z-index: 1;
  text-align: center;
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
