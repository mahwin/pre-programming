import styled from "styled-components";
import { motion } from "framer-motion";
import { vocaColors } from "@color/vocaColors";
import { CardContent } from "./CardContent";
import { LevelCardInfo } from "./type";
import { OpenSvg } from "@svg";

interface Props {
  index: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCard: boolean[];
  totalAmount: number;
  levelCardInfos: LevelCardInfo[];
  handleOpenCard: () => void;
}

export function LevelCardDetail({
  totalAmount,
  index,
  handleInputChange,
  selectedCard,
  levelCardInfos,
  handleOpenCard,
}: Props) {
  return (
    <CardBox>
      <SvgBox onClick={handleOpenCard}>
        <OpenSvg width="20" height="20" />
      </SvgBox>
      <CardHeader>
        <input
          type="checkbox"
          value={index}
          id={index}
          onChange={handleInputChange}
          checked={selectedCard[Number(index)]}
        />
        <label htmlFor={index}></label>
        <CardTitle>level : {Number(index) + 1}</CardTitle>
      </CardHeader>
      <CardBody>
        <CardContent
          totalAmount={totalAmount}
          levelCardInfo={levelCardInfos[Number(index)]}
        />
      </CardBody>
    </CardBox>
  );
}

const CardBox = styled(motion.section)`
  position: relative;
  padding: 24px;
  margin-bottom: 15px;
  border-radius: 5px;
  gap: 1rem;
  background-color: ${vocaColors.vocaDetail.cardBgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  label {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: ${vocaColors.vocaDetail.cardBoarderColor};
    border-radius: 4px;
    position: relative;
    box-shadow:
      inset 0px 1px 1px rgba(0, 0, 0, 0.5),
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
    position: absolute;
    &:checked + label::after {
      opacity: 1;
    }
  }
`;
const CardTitle = styled.h4`
  line-height: 1;
  color: ${vocaColors.vocaDetail.titleColor};
  font-size: ${(props) => props.theme.fontSize.base};
  font-weight: ${(props) => props.theme.fontWeight.xbold};
`;
const CardBody = styled.div`
  overflow: hidden;
  width: 100%;
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
