import { useMemo, useCallback } from "react";

import styled from "styled-components";
import { motion, Variants } from "framer-motion";
import { userVocaColor } from "@color/userVocaColor";
import { XMarkSvg } from "@svg";
import { UserVocabulary } from "@redux/userVocabulary/userVocabulary.dto";
import { CategoryBoardItem } from "./CategoryBoardItem";

import { isNil } from "@utils/typeGuard";
import { ClassifiedVocabulary } from "@type/commons/classifiedVocabulary";
import { CategoriesType } from "@type/commons/vocabulary";
import { SelectedCard } from "./index";

interface Props {
  handleClickClose: () => void;
  userVocabulary: null | UserVocabulary;
  clickedcategory: CategoriesType | null;
  handleClickBoardItem: (category: CategoriesType, cardIdx: number) => void;
  classifiedVocabulary: ClassifiedVocabulary | null;
  selectedCard: SelectedCard;
}

export function CategoryBoard({
  userVocabulary,
  clickedcategory,
  handleClickClose,
  handleClickBoardItem,
  classifiedVocabulary,
  selectedCard,
}: Props) {
  const boardSize = useMemo(() => {
    let size;
    if (isNil(userVocabulary)) size = 0;
    else {
      size = userVocabulary[clickedcategory as keyof UserVocabulary]?.length;
    }

    if (size <= 4) return "small";
    if (size <= 8) return "normal";
    return "big";
  }, [userVocabulary, clickedcategory]);

  const isEmpty = useCallback(() => {
    if (isNil(userVocabulary)) return true;
    if (isNil(clickedcategory)) return true;
    return (
      userVocabulary[clickedcategory as keyof UserVocabulary]?.length === 0
    );
  }, [clickedcategory, userVocabulary]);

  return (
    <Board initial={false} variants={BoardVariants} animate={boardSize}>
      <XBtnBox onClick={handleClickClose}>
        <XMarkSvg width="18" height="18" color="white" />
      </XBtnBox>
      <Arrow variants={ArrowVariants} animate={boardSize} />
      <CategoryBoardItems>
        <CategoryBoardItem
          {...{
            selectedCard,
            clickedcategory,
            userVocabulary,
            handleClickBoardItem,
            classifiedVocabulary,
          }}
          isEmpty={isEmpty()}
        />
      </CategoryBoardItems>
    </Board>
  );
}

const Board = styled(motion.ul)`
  grid-column: 1/-1;

  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${userVocaColor.userVoca.CardBgColor};
`;

const CategoryBoardItems = styled.div`
  padding: 24px;
  gap: 30px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
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
  border-bottom: 18px solid ${userVocaColor.userVoca.CardBgColor};
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
  small: {
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
  normal: {
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
  big: {
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
