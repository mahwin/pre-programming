import styled from "styled-components";

import { LoadingSvg } from "@svg";
import { CategoryCards } from "./CategoryCards";

import { isNil } from "@utils/typeGuard";
import { useCategory } from "@hooks/useCategory";

export function CategoryList() {
  const { data: categories } = useCategory();

  return (
    <Wrapper>
      {isNil(categories) ? (
        <LodingContainer>
          <LoadingSvg width="120px" height="120px" />
        </LodingContainer>
      ) : (
        <Container>
          <header>
            <Title>for web.dev</Title>
          </header>
          <CategoryCards {...{ categories }} />
        </Container>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 580px;
`;

const LodingContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.article<React.HTMLAttributes<HTMLElement>>`
  padding: 24px 0px 48px 0px;
  width: 100%;
  max-width: ${(props) => props.theme.windowSize.tablet};
`;

const Title = styled.h2`
  font-size: ${(props) => props.theme.fontSize.lg};
  font-weight: ${(props) => props.theme.fontWeight.xbold};
  color: ${(props) => props.theme.colorTheme.textPrimary};
`;
