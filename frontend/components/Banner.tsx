import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { MagnifyingGlassSvg } from "../assets/svg/RootSvg";

const Wapper = styled.div`
  position: relative;
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
`;

const BannerWapper = styled.div`
  width: 100%;
  display: flex;
  max-width: ${(props) => props.theme.windowSize.tablet};
  color: ${(props) => props.theme.colorTheme.textPrimary};
`;
const ContentWrapper = styled.div`
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const TitleBox = styled.div`
  width: 100%;
  display: flex;
  position: absolute;
  top: 50px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  font-weight: ${(props) => props.theme.fontWeight.xxbold};
  font-size: ${(props) => props.theme.fontSize.xxlg};
  color: white;
  letter-spacing: 0.2rem;
`;

const SubTitle = styled.h4`
  font-weight: ${(props) => props.theme.fontWeight.base};
  font-size: ${(props) => props.theme.fontSize.lg};
  color: ${(props) => props.theme.colorTheme.textPrimary};
  letter-spacing: 0.1rem;
`;

const SearchBox = styled.div`
  position: absolute;
  bottom: 100px;
  width: 70%;
  max-width: ${(props) => props.theme.windowSize.tablet};
  display: flex;
  justify-content: center;
  align-items: center;

  height: 28px;
  border: none;
  &:focus {
    border: 2px solid red;
  }
`;

const SvgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  height: 36px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: ${(props) => props.theme.colorTheme.textSecondary};
`;

const Search = styled.input.attrs({
  tpye: "text",
  placeholder: "단어를 입력하세요",
})`
  font-size: ${(props) => props.theme.fontSize.base};

  padding: 5px;
  display: flex;
  height: 36px;
  width: 100%;
  border: none;
  color: ${(props) => props.theme.colorTheme.textPrimary};
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: ${(props) => props.theme.colorTheme.backgroundColor};
  &:focus {
    box-shadow: 0 0 0 2px ${(props) => props.theme.colorTheme.activePrimary};
  }
`;

export default function Banner() {
  return (
    <Wapper>
      <BannerWapper>
        <Image src="/banner.png" layout="fill" />
        <ContentWrapper>
          <TitleBox>
            <Title>Pre-Programming</Title>
            <SubTitle>: What to do before you studying programming!</SubTitle>
          </TitleBox>
          <SearchBox>
            <SvgBox>
              <MagnifyingGlassSvg width="24" height="24" color="green" />
            </SvgBox>
            <Search />
          </SearchBox>
        </ContentWrapper>
      </BannerWapper>
    </Wapper>
  );
}
