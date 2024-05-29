import { useCallback, useMemo } from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

import { kebabToCamel } from "@utils/index";

import { CategoryCard } from "./CategoryCard";
import { CategoryBoard } from "./CategoryBoard";
import { ObjectKeys } from "@utils/array";

import { VocaBularyTable } from "./VocaBularyTable";
import { userVocaColor } from "@color/userVocaColor";
import { chunk } from "@fxts/core";
import { ClassifiedVocabularyItems } from "@type/commons/classifiedVocabulary";

import {
  CategoriesType,
  CATEGORIES,
  CategoryItems,
} from "@type/commons/categories";

import { isNil } from "@utils/typeGuard";
import { useAuthentication } from "@hooks/useAuthentication";
import { useUserVocabulary } from "@hooks/useUserVocabulary";
import { useCategory } from "@hooks/useCategory";
import { useClassifiedVocabulary } from "@hooks/useClassifedVocabulary";
import { DisabledCateogoryCard } from "./DisabledCategoryCard";
import { FloatingBtn } from "./FloatingBtn";

import { AuthContext } from "@contexts/AuthContext";

const ROW_SIZE = 4;

export type SelectedCard = Record<CategoriesType, Set<number>>;

export function UserVocabulary() {
  const [clickedCategory, setClickedCategory] = useState<CategoriesType | null>(
    null
  );
  const [clickedCategoryRow, setClickedCategoryRow] = useState<number | null>(
    null
  );
  const [rowData, setRowData] = useState<CategoryItems[]>([]);

  const [selectedCard, setSelectedCard] = useState<SelectedCard>(
    CATEGORIES.reduce((a, c) => {
      a[c] = new Set();
      return a;
    }, {} as SelectedCard)
  );

  const { data: category } = useCategory();
  const { data: userVocabulary, loading } = useUserVocabulary();
  const { data: classifiedVocabulary } = useClassifiedVocabulary();

  useEffect(() => {
    if (isNil(classifiedVocabulary)) return;
  }, []);

  useEffect(() => {
    if (isNil(category)) return;
    setRowData([...chunk(ROW_SIZE, category)]);
  }, [category]);

  const handleClickOpen = (category: CategoriesType, rowIdx: number) => () => {
    setClickedCategory(category);
    setClickedCategoryRow(rowIdx);
  };

  const handleClickClose = useCallback(() => {
    setClickedCategory(null);
    setClickedCategoryRow(null);
  }, []);

  const handleClickBoardItem = useCallback(
    (cate: CategoriesType, cardIdx: number) => {
      const copy = { ...selectedCard };
      copy[cate].has(cardIdx)
        ? copy[cate].delete(cardIdx)
        : copy[cate].add(cardIdx);
      setSelectedCard(copy);
    },
    []
  );

  const spreadSelectedVocabulary = useMemo(() => {
    if (isNil(selectedCard)) return [];
    if (isNil(classifiedVocabulary)) return [];

    return ObjectKeys(selectedCard).reduce((a, cate) => {
      if (selectedCard[cate].size === 0) return a;

      selectedCard[cate].forEach((level) => {
        a.push(...classifiedVocabulary[cate][level]);
      });

      return a;
    }, [] as ClassifiedVocabularyItems);
  }, [selectedCard, classifiedVocabulary]);

  return (
    <Wrapper>
      <header>
        <h1>Saved Vocabulary</h1>
      </header>
      <VocaCardWrapper>
        {rowData.map((data, rowIdx) => (
          <Row key={rowIdx}>
            {data.map((item, dataIdx) =>
              item.available ? (
                <CategoryCard
                  key={`${rowIdx}${dataIdx}`}
                  clickedcategory={clickedCategory}
                  handleClickOpen={handleClickOpen(
                    kebabToCamel(item.category) as CategoriesType,
                    rowIdx
                  )}
                  {...{
                    item,
                    handleClickClose,
                    userVocabulary,
                  }}
                />
              ) : (
                <DisabledCateogoryCard
                  key={`${rowIdx}${dataIdx}`}
                  item={item}
                />
              )
            )}
            {rowIdx === clickedCategoryRow && (
              <CategoryBoard
                clickedcategory={clickedCategory}
                {...{
                  userVocabulary,
                  handleClickClose,
                  handleClickBoardItem,
                  classifiedVocabulary,
                  selectedCard,
                }}
              />
            )}
          </Row>
        ))}
      </VocaCardWrapper>
      <VocaBularyTable {...{ spreadSelectedVocabulary }} />
      <FloatingBtn {...{ spreadSelectedVocabulary }} />
    </Wrapper>
  );
}

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  h1 {
    margin-bottom: 20px;
    font-size: ${(props) => props.theme.fontSize.lg};
    color: ${(props) => props.theme.colorTheme.textPrimary};
  }
`;

const VocaCardWrapper = styled.section`
  max-width: ${(props) => props.theme.windowSize.tablet};
  width: 100%;
  padding: 30px;
  background-color: white;
  box-shadow:
    0 1px 3px 0 rgb(0 0 0 / 0.1),
    0 1px 2px -1px rgb(0 0 0 / 0.1);
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Row = styled(motion.section)`
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;
