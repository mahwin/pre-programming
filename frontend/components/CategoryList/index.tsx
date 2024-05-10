import { useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";

import { LoadingSvg } from "@svg";

import { isNil } from "@utils/typeGuard";

import { CategoryCards } from "./CategoryCards";

import { useSelector, useDispatch } from "react-redux";
import { ICategoriesState } from "@redux/categories/categories.dto";
import { categoriesActions } from "@redux/categories/categoriesSlice";

export function CategoryList() {
  const { data: categories } = useSelector(
    ({ categories }: { categories: ICategoriesState }) => categories
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (!isNil(categories)) return;

    dispatch(categoriesActions.getCategories());
  }, [dispatch]);

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
