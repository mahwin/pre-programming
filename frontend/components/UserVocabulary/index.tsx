import { useCallback, useMemo } from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

import { camelCaser } from "@utils/index";

import { CategoryCard } from "./CategoryCard";
import { CategoryBoard } from "./CategoryBoard";
import { ObjectKeys } from "@utils/array";

import { VocaBularyTable } from "./VocaBularyTable";
import { userVocaColors } from "@color/userVocaColor";
import { chunk } from "@utils/chunk";
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
  const { data: userInfo } = useAuthentication();
  const { data: userVocabulary } = useUserVocabulary();
  const { data: classifiedVocabulary } = useClassifiedVocabulary();

  useEffect(() => {
    if (isNil(classifiedVocabulary)) return;
  }, []);

  useEffect(() => {
    if (isNil(category)) return;
    setRowData(chunk(category, ROW_SIZE));
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

  console.log(spreadSelectedVocabulary, classifiedVocabulary);

  return (
    <Wrapper>
      <header>
        <h1>Saved Vocabulary</h1>
      </header>
      <VocaCardWrapper>
        {rowData.map((data, rowIdx) => (
          <Row>
            {data.map((item) =>
              item.available ? (
                <CategoryCard
                  handleClickOpen={handleClickOpen(
                    camelCaser(item.category) as CategoriesType,
                    rowIdx
                  )}
                  {...{
                    item,
                    clickedCategory,
                    handleClickClose,
                    userVocabulary,
                  }}
                />
              ) : (
                <DisabledCateogoryCard item={item} />
              )
            )}
            {rowIdx === clickedCategoryRow && (
              <CategoryBoard
                {...{
                  userVocabulary,
                  clickedCategory,
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

const SvgBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 5px 0px;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: 14px;
`;

const Overray = styled.div`
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    padding: 15px 10px;
    background-color: ${userVocaColors.userVoca.overlayColor};
    border-radius: 10px;
    display: flex;
    align-items: center;
    height: 30px;
    font-weight: ${(props) => props.theme.fontWeight.xbold};
  }
`;

const CardDetail = styled(motion.ul)`
  grid-column: 5/1;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${userVocaColors.userVoca.CardBgColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DetailBox = styled.div`
  padding: 24px;
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(4, 1fr);
`;

const XBtnBox = styled.div<React.HTMLAttributes<HTMLElement>>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  right: 5px;
  top: 5px;
  transition: all ease 2s;
  :hover {
    cursor: pointer;
    transform: rotate(180deg);
  }
`;

const Arrow = styled(motion.div)`
  position: absolute;
  width: 0;
  height: 0;
  top: 105px;
  border-bottom: 18px solid ${userVocaColors.userVoca.CardBgColor};
  border-right: 18px solid transparent;
  border-left: 18px solid transparent;
  :hover {
    transition: none;
  }
`;

const Row = styled(motion.section)`
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const ArrowVariants: Variants = {
  open: {
    opacity: 1,
    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
    transition: { delay: 0.2, duration: 1 },
  },
  closed: {
    opacity: 0,
    clipPath: "polygon(50% 100%, 0% 100%, 100% 100%)",
    transition: { delay: 0.05, duration: 0.1 },
  },
};

const BoardVariants: Variants = {
  smallOpen: {
    clipPath: "inset(0% 0% 0% 0%)",
    height: "120px",
    marginBottom: "20px",
    transition: {
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
  normalOpen: {
    clipPath: "inset(0% 0% 0% 0%)",
    height: "240px",
    marginBottom: "20px",
    transition: {
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
  bigOpen: {
    clipPath: "inset(0% 0% 0% 0%)",
    height: "360px",
    marginBottom: "20px",
    transition: {
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
  closed: {
    clipPath: "inset(0% 0% 100% 0%)",
    height: "0px",
    transition: {
      bounce: 0,
      duration: 0.3,
    },
  },
};
