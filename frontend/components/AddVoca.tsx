import styled from "styled-components";
import { FolderOpenSvg } from "../assets/svg/RootSvg";
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 40px;
  gap: 30px;
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  gap: 20px;
`;
const Button = styled(motion.button)`
  height: 50px;
  width: 150px;
  border: none;
  color: #dfe6e9;
  font-size: 20px;
  background-color: #949fb0;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    background-color: ${(props) => props.theme.colorTheme.hoverPrimary};
    transition: all 0.2s ease-in-out;
    transform: scale(1.05);
  }
  p {
    margin-right: 10px;
  }
`;
const Cards = styled(motion.ul)`
  position: relative;
  margin-top: 40px;
  width: 100%;
  background-color: #333a45;

  padding: 24px;
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(3, 1fr);
`;

const Card = styled(motion.li)`
  position: relative;
  margin: 0 auto;
  background-color: teal;
  height: 120px;
  width: 200px;
`;

const Board = styled(motion.div)`
  position: relative;
`;

const VocaWrapper = styled(motion.div)``;

const Arrow = styled(motion.div)`
  position: absolute;
  top: -20px;
  right: 230px;
  width: 0;
  height: 0;
  border-bottom: 20px solid #333a45;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
`;

const CancleBtnBox = styled.button`
  position: absolute;
  height: 30px;
  width: 30px;
  top: 5px;
  right: 5px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  background-color: transparent;
  border: none;
  :hover {
    transform: scale(1.2);
  }
`;

const Bar = styled.div`
  position: absolute;
  border: none;
  background-color: white;
  width: 15px;
  height: 3px;
  transform: rotate(45deg);
  &:nth-child(2) {
    transform: rotate(135deg);
  }
`;

interface IAddVoca {
  vocas: boolean[];
}
const cardsVariants: Variants = {
  open: {
    clipPath: "inset(0% 0% 0% 0% round 10px)",
    transition: {
      type: "linear",
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
  closed: {
    clipPath: "inset(10% 50% 90% 50% round 10px)",
    transition: {
      type: "linear",
      bounce: 0,
      duration: 0.3,
    },
  },
};

const ArrowVariants: Variants = {
  open: { opacity: 1, transition: { delay: 0.2, duration: 1 } },
  closed: {
    opacity: 0,
    transition: { delay: 0.05, duration: 0.1 },
  },
};

const cardVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "linear", stiffness: 800, damping: 34 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.1 } },
};

export default function AddVaca({ vocas }: IAddVoca) {
  const [isCardOpen, setIsCardOpen] = useState<boolean>(false);

  const onCancleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.id);
  };

  const onClickCard = () => {
    setIsCardOpen((prev) => !prev);
  };
  const onClickSaved = () => {};
  return (
    <Wrapper>
      <ButtonBox>
        <Button
          onClick={onClickCard}
          whileTap={{ scale: 0.97 }}
          style={{ backgroundColor: isCardOpen ? "#00b894" : "#949fb0" }}
        >
          <p>CARD</p>
          <FolderOpenSvg />
        </Button>
        <Button onClick={onClickSaved} whileTap={{ scale: 0.97 }}>
          단어장에 저장
        </Button>
      </ButtonBox>
      <Board initial={false} animate={isCardOpen ? "open" : "closed"}>
        <VocaWrapper>
          <Arrow
            variants={ArrowVariants}
            animate={isCardOpen ? "open" : "closed"}
          />
          <Cards
            variants={cardsVariants}
            style={{
              pointerEvents: isCardOpen ? "auto" : "none",
            }}
          >
            {vocas.map(
              (voca, idx) =>
                voca && (
                  <Card variants={cardVariants} key={idx + ""}>
                    <CancleBtnBox onClick={onCancleClick} id={idx + ""}>
                      <Bar />
                      <Bar />
                    </CancleBtnBox>
                  </Card>
                )
            )}
          </Cards>
        </VocaWrapper>
      </Board>
    </Wrapper>
  );
}
