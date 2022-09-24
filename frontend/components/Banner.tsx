import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { MagnifyingGlass } from "../assets/svg/MagnifyingGlass";

const Wapper = styled.nav`
  width: 100%;
  height: 50vh;
  position: relative;
  display: flex;
  justify-content: center;
`;

const BannerWapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  max-width: ${(props) => props.theme.windowSize.tablet};
  color: ${(props) => props.theme.colorTheme.fontPrimary};
  max-width: ${(props) => props.theme.windowSize.pc};
`;

const TitleBox = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  font-weight: ${(props) => props.theme.fontWeight.xbold};
  font-size: ${(props) => props.theme.fontSize.xxlg};
  color: ${(props) => props.theme.colorTheme.primary};
`;

const SubTitle = styled.h4`
  font-weight: ${(props) => props.theme.fontWeight.base};
  font-size: ${(props) => props.theme.fontSize.lg};
  color: ${(props) => props.theme.colorTheme.secondary};
`;

const SearchBox = styled.div`
  margin-top: 30px;
  width: 90%;
  display: flex;
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
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: ${(props) => props.theme.colorTheme.secondary};
`;

const Search = styled.input.attrs({
  tpye: "text",
  placeholder: "단어를 입력하세요",
})`
  padding: 5px;
  display: flex;
  height: 24px;
  width: 100%;
  border: none;
  color: ${(props) => props.theme.colorTheme.fontSecondary};
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: ${(props) => props.theme.colorTheme.secondary};
  &:focus {
    box-shadow: 0 0 0 2px ${(props) => props.theme.colorTheme.primary};
  }
`;

export default function Banner() {
  return (
    <Wapper>
      <BannerWapper>
        <Image src="/banner.png" layout="fill" />
        <TitleBox>
          <Title>Pre-Programming</Title>
          <SubTitle>: What to do before you studying programming!</SubTitle>
          <SearchBox>
            <SvgBox>
              <MagnifyingGlass width="24" height="24" color="green" />
            </SvgBox>
            <Search />
          </SearchBox>
        </TitleBox>
      </BannerWapper>
    </Wapper>
  );
}
