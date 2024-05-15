import styled from "styled-components";
import { vocaColors } from "@color/vocaColors";
import { ModalTable } from "./ModalTable";
import { HTMLAttributes } from "react";

import { LevelledVocabulary } from "@type/commons/vocabulary";

interface Props {
  selectedLevelCard: string;
  handleCheckClick: (e: React.MouseEvent<HTMLElement>) => void;
  selectedCard: boolean[];
  levelledVocabulary: LevelledVocabulary;
}

export function LevelCardDetailModal({
  selectedLevelCard,
  handleCheckClick,
  selectedCard,
  levelledVocabulary,
}: Props) {
  return (
    <ModalWrapper>
      <ModalTitleBox>
        <ModalLevel>Level : {Number(selectedLevelCard) + 1}</ModalLevel>
        <ModalButton
          type="text"
          name={selectedLevelCard}
          id={selectedLevelCard}
          onClick={handleCheckClick}
        >
          {selectedCard[Number(selectedLevelCard)] ? "해제" : "추가"}
        </ModalButton>
      </ModalTitleBox>
      <ModalTable
        tableData={levelledVocabulary[Number(selectedLevelCard) + 1]}
      />
    </ModalWrapper>
  );
}

const ModalWrapper = styled.section`
  padding: 36px 24px;
  border-radius: 20px;
  background: ${(props) => props.theme.colorTheme.backgroundColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  { name: string; type: string } & HTMLAttributes<HTMLButtonElement>
>`
  flex-grow: 1;
  height: 30px;
  color: white;
  border: none;
  background-color: ${vocaColors.vocaDetail.modalBtnColor};
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    box-shadow:
      0 0 0 2px white,
      0 0 0 3px ${vocaColors.vocaDetail.modalBtnColor};
  }
`;
