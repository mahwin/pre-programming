import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { AddLevelCard } from "./AddLevelCard";
import { Overlay } from "../Commons/Overlay";
import { AnimatePresence } from "framer-motion";

import { LevelCardDetailModal } from "./LevelCardDetailModal";
import { LevelledVocabulary } from "@type/commons/vocabulary";
import { CategoriesType } from "@type/commons/categories";
import { FloatingBtn } from "./FloatingBtn";

import { ObjectKeys } from "@utils/array";

import { LevelCardDetail } from "./LevelCardDetail";
import type { LevelCardInfo } from "./type";

const MAX_CARD_NUM = 10;

interface Props {
  category: CategoriesType;
  levelledVocabulary: LevelledVocabulary;
}

export function Category({ levelledVocabulary, category }: Props) {
  const [selectedLevelCard, setSelectedLevelCard] = useState<string | null>(
    null
  );
  const [selectedCard, setSelectedCard] = useState<boolean[]>(
    Array.from({ length: MAX_CARD_NUM }, () => false)
  );
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const [levelCardInfos, setLevelCardInfos] = useState<LevelCardInfo[]>([]);

  useEffect(
    function calTotalAmountAndCardIfno() {
      // 전체 단어수와 카드별 정보 계산

      let totalAmount = 0;

      setLevelCardInfos(
        ObjectKeys(levelledVocabulary).map((level) => {
          const item = levelledVocabulary[level];
          totalAmount += item.length;
          return {
            amount: item.length,
            frequency: item[Math.round(item.length / 2)].frequency,
          };
        })
      );
      setTotalAmount(totalAmount);
    },
    [levelledVocabulary]
  );

  console.log(levelCardInfos);

  const handleResetSelected = () => {
    setSelectedCard(Array.from({ length: 10 }, () => false));
  };

  const handleInputChange = (
    evt: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const level = Number(evt.currentTarget.value);
    console.log(level, "???????");
    setSelectedCard((prev) => {
      const newPrev = [...prev];
      newPrev[level] = !newPrev[level];
      return newPrev;
    });
  };

  const handleCheckClick = (evt: React.MouseEvent<HTMLElement>) => {
    const level = Number(evt.currentTarget.id);

    setSelectedCard((prev) => {
      const newPrev = [...prev];
      newPrev[level] = !newPrev[level];
      return newPrev;
    });
  };

  const handleOpenCard = (level: string) => () => {
    setSelectedLevelCard(level);
  };

  const handleCloseCard = () => {
    setSelectedLevelCard(null);
  };

  return (
    <>
      <Wrapper>
        <Title>{category}</Title>
        <LevelCardsWrapper>
          {ObjectKeys(levelledVocabulary).map((_, index) => (
            <LevelCardDetail
              key={index}
              {...{
                totalAmount,
                index: `${index}`,
                handleInputChange,
                selectedCard,
                levelCardInfos,
                setSelectedLevelCard,
                handleOpenCard: handleOpenCard(`${index}`),
              }}
            />
          ))}
        </LevelCardsWrapper>
        <AddLevelCard
          {...{
            category,
            levelCardInfos,
            selectedCard,
            handleResetSelected,
            handleCheckClick,
          }}
        />

        <AnimatePresence>
          {selectedLevelCard && (
            <Overlay handleClick={handleCloseCard}>
              <LevelCardDetailModal
                {...{
                  selectedLevelCard,
                  handleCheckClick,
                  selectedCard,
                  levelledVocabulary,
                }}
              />
            </Overlay>
          )}
        </AnimatePresence>
      </Wrapper>
      <FloatingBtn />
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  max-width: ${(props) => props.theme.windowSize.tablet};
  padding: 24px 0px;
`;

const Title = styled.h2`
  color: ${(props) => props.theme.colorTheme.textPrimary};
  font-size: ${(props) => props.theme.fontSize.lg};
  font-weight: ${(props) => props.theme.fontWeight.xbold};
  padding: 0px 0px 16px 0px;
`;

const LevelCardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
`;
