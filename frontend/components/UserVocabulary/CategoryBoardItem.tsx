import { HTMLAttributes, useMemo } from "react";
import styled from "styled-components";
import { FrownSvg } from "@svg";
import { UserVocabulary } from "@redux/userVocabulary/userVocabulary.dto";
import { CheckSvg } from "@svg";
import { userVocaColor } from "@color/userVocaColor";

import { useSelector } from "react-redux";
import { IState } from "@redux/initialState";

import { isNil } from "@utils/typeGuard";
import { CategoriesType } from "@type/commons/vocabulary";
import { ClassifiedVocabulary } from "@type/commons/classifiedVocabulary";
import { SelectedCard } from "./index";
interface Props {
  isEmpty: boolean;
  userVocabulary: UserVocabulary | null;
  clickedcategory: CategoriesType | null;
  handleClickBoardItem: (category: CategoriesType, cardIdx: number) => void;
  classifiedVocabulary: ClassifiedVocabulary | null;
  selectedCard: SelectedCard;
}

export function CategoryBoardItem({
  userVocabulary,
  clickedcategory,
  isEmpty,
  classifiedVocabulary,
  selectedCard,
  handleClickBoardItem,
}: Props) {
  const boardItems = useMemo(() => {
    if (isEmpty) return null;
    if (isNil(userVocabulary)) return null;
    return userVocabulary?.[
      clickedcategory as keyof UserVocabulary
    ] as number[];
  }, [isEmpty, clickedcategory]);

  const getWordAmount = (level: number) => {
    if (isNil(classifiedVocabulary)) return 0;
    if (isNil(clickedcategory)) return 0;
    return classifiedVocabulary[clickedcategory][level].length;
  };

  if (isEmpty || isNil(boardItems) || isNil(clickedcategory))
    return (
      <Wrapper>
        <FrownSvg width="80" height="80" color="white" />
        <p>Empty</p>
      </Wrapper>
    );

  return (
    <>
      {boardItems.map((level, idx) => (
        <Card
          key={idx}
          isclicked={selectedCard[clickedcategory].has(level)}
          onClick={() => handleClickBoardItem(clickedcategory, level)}
        >
          <Check />
          <Title>
            <h3>level {level}</h3>
          </Title>
          <Row>
            <p>words</p>
            <h2>{getWordAmount(level)}</h2>
          </Row>
        </Card>
      ))}
    </>
  );
}

const Wrapper = styled.div`
  grid-column: 1/ -1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  p {
    color: whitesmoke;
    font-weight: 800;
  }
`;

const Card = styled.li<{ isclicked: boolean } & HTMLAttributes<HTMLLIElement>>`
  position: relative;
  background-color: #fff;
  height: 80px;
  width: 125px;
  border-radius: 3px;
  padding: 10px;
  cursor: pointer;
  :hover {
    transition: all 0.2s ease-in-out;
  }

  box-shadow: 0 0 0 4px
    ${(props) =>
      props.isclicked
        ? userVocaColor.selectedColor
        : userVocaColor.userVoca.ClickedCardBgColor};
  & > span {
    visibility: ${(props) => (props.isclicked ? "visible" : "hidden")};
  }
`;

const Title = styled.div`
  text-align: center;
  h3 {
    opacity: 0.7;
    color: ${(props) => props.theme.colorTheme.backgroundColor};
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.fontSize.base};
  }
`;

const Check = styled.span`
  position: absolute;
  top: -26px;
  right: -10px;
  height: 30px;
  width: 40px;

  z-index: 10;
  border-bottom: 8px solid ${userVocaColor.selectedColor};
  border-left: 8px solid ${userVocaColor.selectedColor};
  transform: rotate(310deg);
  transition: all 0.2s ease-in-out;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 12px;
  justify-content: space-around;
  p {
    font-size: 18px;
    display: inline-block;
    color: #a875d5;
    font-weight: 500;
  }
  h2 {
    font-size: 18px;
    font-weight: 700;
    color: #2d3436;
  }
`;
