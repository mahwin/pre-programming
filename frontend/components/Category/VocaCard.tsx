import styled from "styled-components";
import { vocaColors } from "@color/vocaColors";
import { motion, Variants } from "framer-motion";
import { ICard } from "@type/vocas";

const cardVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { stiffness: 800, damping: 34 },
  },
  closed: { display: "none", opacity: 0, y: 20, transition: { duration: 0.1 } },
};

export function VocaCard({
  visible,
  cardData,
  idx,
  handleClick,
}: {
  visible: boolean;
  cardData: ICard[] | null;
  idx: number;
  handleClick: (
    e: React.MouseEvent<HTMLInputElement | HTMLButtonElement>
  ) => void;
}) {
  if (!visible) return null;

  return (
    <Card variants={cardVariants} key={idx}>
      <CancleBtnBox onClick={handleClick} id={idx.toString()}>
        <XBar />
        <XBar />
      </CancleBtnBox>
      <CardContents>
        <h3>Level {idx}</h3>
        <Row>
          <div>
            <p>
              <small>
                <b>words</b>
              </small>
            </p>

            <h2>
              <b>{cardData?.[idx - 1].amount}</b>
            </h2>
          </div>
          <div>
            <p>
              <small>
                <b>frequency</b>
              </small>
            </p>
            <h2>
              <p>{cardData?.[idx - 1].frequency} 이상</p>
            </h2>
          </div>
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
  gap: 20px;
`;

const CardContents = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  h3 {
    padding: 5px;
    font-size: ${(props) => props.theme.fontSize.base};
    font-weight: ${(props) => props.theme.fontWeight.bold};
    color: black;
  }
  p {
    color: #8a81bd;
    font-weight: ${(props) => props.theme.fontWeight.xbold};
  }
  h2 {
    margin-top: 5px;
    text-align: center;
    font-weight: 600;
    font-size: ${(props) => props.theme.fontSize.lg};
  }
  h2 p {
    margin-top: 10px;
    color: black;
    font-size: 14px;
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
