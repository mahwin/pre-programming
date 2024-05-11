import styled from "styled-components";
import { vocaColors } from "@color/vocaColors";
import { motion, Variants } from "framer-motion";
import { LevelCardInfo } from "./type";

const cardVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { stiffness: 800, damping: 34 },
  },
  closed: { display: "none", opacity: 0, y: 20, transition: { duration: 0.1 } },
};

interface Props {
  visible: boolean;
  levelCardInfos: LevelCardInfo[];
  handleClickCheck: (e: React.MouseEvent<HTMLInputElement>) => void;
  idx: number;
}

export function LevelCard({
  visible,
  levelCardInfos,
  idx,
  handleClickCheck,
}: Props) {
  if (!visible) return null;

  return (
    <Card variants={cardVariants} key={idx}>
      <CardContents>
        <Row>
          <p>Level {idx}</p>
          <CancleBtnBox onClick={handleClickCheck} id={idx.toString()}>
            <XBar />
            <XBar />
          </CancleBtnBox>
        </Row>
        <Row>
          <p>
            <small>words</small>
          </p>
          <b>{levelCardInfos?.[idx - 1].amount}</b>
        </Row>
        <Row>
          <p>
            <small>frequency</small>
          </p>
          <p>{levelCardInfos?.[idx - 1].frequency} 이상</p>
        </Row>
      </CardContents>
    </Card>
  );
}

const Card = styled(motion.li)`
  position: relative;
  margin: 0 auto;
  background-color: #fff;
  height: 120px;
  width: 200px;
  border-radius: 3px;
  padding: 1rem;
`;

const XBar = styled.div`
  position: absolute;
  border: none;
  width: 15px;
  height: 3px;
  transform: rotate(45deg);
  background-color: ${vocaColors.addVoca.xBtnColor};
  &:nth-child(2) {
    transform: rotate(135deg);
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const CardContents = styled.section`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;

  p {
    font-weight: 600;
    font-size: 0.8rem;
  }
  b {
    font-weight: 600;
    font-size: ${(props) => props.theme.fontSize.lg};
  }

  div > p > small {
    color: #8a81bd;
    font-weight: ${(props) => props.theme.fontWeight.xbold};
  }
`;

const CancleBtnBox = styled.div<React.HTMLAttributes<HTMLElement>>`
  position: absolute;
  height: 30px;
  width: 30px;
  top: 5px;
  right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  :hover {
    transform: scale(1.2);
  }
`;
