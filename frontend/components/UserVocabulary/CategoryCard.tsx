import { useCallback, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { userVocaColor } from "@color/userVocaColor";
import { CategoriesType, CategoryItem } from "@type/commons/categories";
import { kebabToCamel } from "@utils/index";
import { UserVocabulary } from "@redux/userVocabulary/userVocabulary.dto";
import { isNil } from "@utils/typeGuard";

import styled from "styled-components";

import { FolderSvg, FolderOpenSvg } from "@svg";

interface Props {
  item: CategoryItem;
  handleClickClose: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleClickOpen: (e: React.MouseEvent<HTMLDivElement>) => void;
  clickedcategory: CategoriesType | null;
  userVocabulary: UserVocabulary | null;
}

export function CategoryCard({
  item,
  clickedcategory,
  userVocabulary,
  handleClickOpen,
}: Props) {
  const currentCardOpened = useMemo(() => {
    if (isNil(clickedcategory)) return false;
    return clickedcategory === kebabToCamel(item.category);
  }, [clickedcategory]);

  const categoryItemLen = useCallback(
    (category: string) => {
      if (isNil(userVocabulary)) return 0;
      console.log(kebabToCamel(category), userVocabulary);
      const levels = userVocabulary[kebabToCamel(category) as CategoriesType];

      if (isNil(levels)) return 0;

      return levels.length;
    },
    [userVocabulary]
  );

  return (
    <VocaCard
      initial={false}
      onClick={handleClickOpen}
      whileHover={{ cursor: "pointer" }}
      isopened={currentCardOpened}
      clickedcategory={clickedcategory}
    >
      <Col>
        <h2>
          {item.category}
          {` (${categoryItemLen(item.category)})`}
        </h2>
        <SvgBox>{currentCardOpened ? <FolderOpenSvg /> : <FolderSvg />}</SvgBox>
      </Col>
      <Arrow
        initial={false}
        variants={ArrowVariants}
        animate={currentCardOpened ? "open" : "closed"}
      />
    </VocaCard>
  );
}

const VocaCard = styled(motion.article)<{
  isopened: boolean;
  clickedcategory: string | null;
}>`
  height: 100px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  font-weight: ${(props) => props.theme.fontWeight.base};

  background-color: ${({ isopened, clickedcategory }) =>
    isNil(clickedcategory)
      ? userVocaColor.userVoca.CardBgColor
      : isopened
        ? userVocaColor.userVoca.ClickedTargetCardBgColor
        : userVocaColor.userVoca.ClickedCardBgColor};

  opacity: ${(props) => (props.isopened ? 1 : 0.5)};
  transition: all 0.2s ease-in-out;

  &:hover {
    scale: calc(1.05);
    transition: all 0.2s ease-in-out;
  }
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

const SvgBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 5px 0px;
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
