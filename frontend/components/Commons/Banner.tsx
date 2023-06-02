import React from "react";
import styled from "styled-components";
import { MagnifyingGlassSvg } from "@svg";

const Wapper = styled.section`
  position: relative;
  width: 100%;
  height: 55vh;
  min-height: 330px;
  display: flex;
  justify-content: center;
`;

const BannerWapper = styled.div`
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

const BannerImg = styled.div`
  position: absolute;
  background-image: url("/banner.png");
  background-size: cover;
  width: 100%;
  height: 100%;
`;
const TitleBox = styled.header`
  width: 100%;
  display: flex;
  top: 60px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  font-weight: ${(props) => props.theme.fontWeight.xxbold};
  font-size: ${(props) => props.theme.fontSize.xxlg};
  letter-spacing: 0.2rem;
`;

const SubTitle = styled.h4`
  font-weight: ${(props) => props.theme.fontWeight.base};
  font-size: ${(props) => props.theme.fontSize.lg};
  letter-spacing: 0.1rem;
`;

const SearchBox = styled.div`
  margin-top: 17px;
  display: flex;
  width: 70%;
  max-width: ${(props) => props.theme.windowSize.tablet};
  justify-content: center;
  align-items: center;
  height: 28px;
  &:focus {
    border: 2px solid red;
  }
`;

const Search = styled.input.attrs({
  tpye: "text",
  placeholder: "단어를 입력하세요",
})`
  padding: 10px;
  height: 36px;
  width: 100%;
  border: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  font-size: ${(props) => props.theme.fontSize.base};
  color: ${(props) => props.theme.colorTheme.textPrimary};
  background-color: ${(props) => props.theme.colorTheme.backgroundColor};
  &:focus {
    box-shadow: 0 0 0 2px ${(props) => props.theme.colorTheme.activePrimary};
  }
`;

const SvgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 36px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: ${(props) => props.theme.colorTheme.textSecondary};
`;

export default function Banner() {
  return (
    <Wapper>
      <BannerImg role="img" aria-label="배경화면 입니다" />
      <BannerWapper>
        <ContentWrapper>
          <TitleBox>
            <Title>Pre-Programming</Title>
            <SubTitle>:What to do before you studying programming!</SubTitle>
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
