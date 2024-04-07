import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Table from "@components/Vocas/Table";
import { OpenSvg } from "@svg";
import VocaTable from "@components/Vocas/VocaTable";
import AddVoca from "./AddVoca";
import { vocaColors } from "@color/vocaColors";
import { ICard, IVocaDetail } from "@type/vocas";

const MAX_CARD_NUM = 10;

export default function VocaDetail({ voca, title }: IVocaDetail) {
  const [id, setId] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<boolean[]>(
    Array.from({ length: MAX_CARD_NUM }, () => false)
  );
  const [total, setTotal] = useState<number>(0);
  const [cardData, setCardData] = useState<ICard[] | null>(null);

  useEffect(() => {
    const levelArr = Object.keys(voca);
    let totalAmount = 0;
    let baseData: ICard[] = [];
    levelArr.forEach((level: string) => {
      const item = voca[level];
      let tmp = {
        amount: item.length + "",
        frequency: item[Math.round(item.length / 2)].frequency,
      };
      totalAmount += +tmp.amount;
      baseData.push(tmp);
    });

    setTotal(totalAmount);
    setCardData(baseData);
  }, [voca]);

  const onResetSelected = () => {
    setSelectedCard(Array.from({ length: 10 }, () => false));
  };

  const onClickCheck = (
    e: React.MouseEvent<HTMLInputElement | HTMLButtonElement>
  ): void => {
    const voca = Number(e.currentTarget.id || e.currentTarget.name);
    const copyVocas = [...selectedCard];
    copyVocas[voca] = !copyVocas[voca];
    setSelectedCard(copyVocas);
  };
  return (
    <Wrapper>
      <DetailWrapper>
        <Title>{title}</Title>
        <VocaCardWrapper>
          {Object.keys(voca).map((level: string) => (
            <VocaCard key={level}>
              <CardHeader>
                <Level> Level : {level}</Level>
                <input
                  type="checkbox"
                  value="None"
                  id={level}
                  name="check"
                  onClick={onClickCheck}
                  onChange={() => {}}
                  checked={selectedCard[+level]}
                />
                <label htmlFor={level}></label>
              </CardHeader>
              <VocaContentBox>
                {cardData && (
                  <Table cardData={cardData?.[+level - 1]} total={total} />
                )}
              </VocaContentBox>
              <SvgBox onClick={() => setId(level)}>
                <OpenSvg width="20" height="20" />
              </SvgBox>
            </VocaCard>
          ))}
        </VocaCardWrapper>
        {/* <AddVoca
          category={title}
          cardData={cardData}
          selected={selectedCard}
          resetSelected={onResetSelected}
          handleClick={onClickCheck}
        /> */}
      </DetailWrapper>

      {id ? (
        <Overlay onClick={() => setId(null)}>
          <VocaCard>
            <ModalTitleBox>
              <ModalLevel>Level : {id}</ModalLevel>
              <ModalButton name={id + ""} onClick={onClickCheck}>
                {selectedCard[+id] ? "해제" : "추가"}
              </ModalButton>
            </ModalTitleBox>
            <VocaTable voca={voca[+id]} />
          </VocaCard>
        </Overlay>
      ) : null}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin-bottom: 80px;
  justify-content: center;
`;

const Title = styled.h2`
  margin-top: -30px;
  margin-bottom: 10px;
  color: ${(props) => props.theme.colorTheme.textPrimary};
  font-size: ${(props) => props.theme.fontSize.lg};
  font-weight: ${(props) => props.theme.fontWeight.xbold};
`;

const DetailWrapper = styled.div`
  height: 100%;
  width: 100%;
  max-width: ${(props) => props.theme.windowSize.tablet};
`;

const VocaCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
`;

const VocaCard = styled.div<React.HTMLAttributes<HTMLElement>>`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  background-color: ${vocaColors.vocaDetail.cardBgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const VocaContentBox = styled.div`
  overflow: hidden;
  border-radius: 5px;
  margin-bottom: 20px;
  border: 1px solid ${vocaColors.vocaDetail.cardBoarderColor};
`;

const SvgBox = styled.div<React.HTMLAttributes<HTMLElement>>`
  cursor: pointer;
  position: absolute;
  right: 10px;
  bottom: 10px;
`;

const CardHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 60px;
  label {
    width: 20px;
    height: 20px;
    position: absolute;
    background-color: ${vocaColors.vocaDetail.cardBoarderColor};
    border-radius: 4px;
    box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5),
      0px 1px 0px rgba(255, 255, 255, 0.4);
    cursor: pointer;
    &:after {
      content: "";
      width: 9px;
      height: 5px;
      position: absolute;
      top: 4px;
      left: 4px;
      border: 3px solid ${vocaColors.vocaDetail.checkColor};
      border-top: none;
      border-right: none;
      opacity: 0;
      transform: rotate(-45deg);
    }
    &:hover::after {
      opacity: 0.3;
    }
  }
  input[type="checkbox"] {
    visibility: hidden;
    &:checked + label:after {
      opacity: 1;
    }
  }
`;

const Level = styled.h4`
  margin: 4px 0 0 40px;
  color: ${vocaColors.vocaDetail.titleColor};
  font-size: ${(props) => props.theme.fontSize.base};
  font-weight: ${(props) => props.theme.fontWeight.xbold};
`;

const ModalTitleBox = styled.div`
  display: flex;
  width: 300px;
  height: 80px;
  align-items: center;
  text-align: center;
`;

const ModalLevel = styled.label`
  color: white;
  flex-grow: 1;
  font-size: ${(props) => props.theme.fontSize.base};
  font-weight: ${(props) => props.theme.fontWeight.xbold};
`;

const ModalButton = styled.button<
  React.HTMLAttributes<HTMLButtonElement> & { name: string }
>`
  flex-grow: 1;
  height: 30px;
  color: white;
  border: none;
  background-color: ${vocaColors.vocaDetail.modalBtnColor};
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 0 2px white,
      0 0 0 3px ${vocaColors.vocaDetail.modalBtnColor};
  }
`;

const Overlay = styled.div<React.HTMLAttributes<HTMLElement>>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;
