import React from "react";
import styled from "styled-components";
import { Searcher } from "@components/Searcher";
import Image from "next/image";
export default function Banner() {
  return (
    <Wrapper>
      <Image
        src="/banner.webp"
        layout="fill"
        placeholder="empty"
        priority={true}
      />
      <ContentWrapper>
        <header>
          <Title>Pre-Programming</Title>
          <SubTitle>:What to do before you studying programming!</SubTitle>
        </header>
        <Searcher />
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
  position: relative;
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
