import React from "react";
import styled from "styled-components";
import Search from "./Search";
import Image from "next/image";

export default function Banner() {
  return (
    <Wapper>
      <Image
        src="/banner.png"
        alt="배경화면 입니다"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority={true}
      />
      <BannerWapper>
        <ContentWrapper>
          <TitleBox>
            <Title>Pre-Programming</Title>
            <SubTitle>:What to do before you studying programming!</SubTitle>
          </TitleBox>
          <Search />
        </ContentWrapper>
      </BannerWapper>
    </Wapper>
  );
}

const Wapper = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
`;

const BannerWapper = styled.section`
  position: relative;
  width: 100%;
  display: flex;
  max-width: ${(props) => props.theme.windowSize.tablet};
  color: ${(props) => props.theme.colorTheme.textPrimary};
`;
const ContentWrapper = styled.div`
  margin-top: 80px;
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleBox = styled.header`
  width: 100%;
  display: flex;
  top: 60px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
