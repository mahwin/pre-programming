import styled from "styled-components";
import { FolderOpenSvg, LoadingSvg } from "@svg";
import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { IState } from "@redux/initialState";
import useMutation from "@utils/useMutation";
import { vocaColors } from "@color/vocaColors";
import { IAddVoca } from "@type/vocas";
import { VocaCard } from "./VocaCard";

const cardsVariants: Variants = {
  open: {
    clipPath: "inset(0% 0% 0% 0% round 10px)",
    transition: {
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
  closed: {
    clipPath: "inset(10% 50% 90% 50% round 10px)",
    transition: {
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

export default function AddVaca({
  cardData,
  selected,
  category,
  resetSelected,
  handleClick,
}: IAddVoca) {
  const [isCardOpen, setIsCardOpen] = useState<boolean>(false);
  const [saveVoca, { loading, data, error }] = useMutation(
    `/vocas/${category}`
  );

  const onClickCard = () => {
    setIsCardOpen((prev) => !prev);
  };

  const userId = useSelector((state: IState) => {
    return state.user.data?.id;
  });

  const router = useRouter();

  const onClickSaved = () => {
    //로그인한 유저가 아닐 경우 로그인 페이지로
    if (!userId) router.push("/signIn");

    const level: number[] = [];
    selected.forEach((check, idx) => {
      if (check) level.push(idx);
    });

    //선택한 단어장이 없으면 동작 x
    if (level.length === 0) {
      alert("내 단어장어 포함될 단어 카드를 선택해 주세요.");
    }
    saveVoca({ userId, level: JSON.stringify(level) });
  };

  useEffect(() => {
    if (data?.ok) {
      resetSelected();
      setIsCardOpen(false);
    }
  }, [data]);

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
          {loading ? <LoadingSvg color="white" /> : "단어장에 저장"}
        </Button>
      </ButtonBox>
      <Board animate={isCardOpen ? "open" : "closed"}>
        <div>
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
            {selected.map((visible, idx) => (
              <VocaCard {...{ visible, cardData, idx, handleClick }} />
            ))}
          </Cards>
        </div>
      </Board>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 40px;
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
  border-radius: 5px;
  color: ${vocaColors.addVoca.btnColor};
  font-size: 20px;
  background-color: ${vocaColors.addVoca.btnBgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  :hover {
    background-color: ${(props) => props.theme.colorTheme.hoverPrimary};
    transition: all 0.2s ease-in-out;
    transform: scale(1.05);
  }
`;

const Cards = styled(motion.ul)`
  margin-top: 40px;
  padding: 24px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  background-color: ${vocaColors.addVoca.cardsBgColor};
`;

const Board = styled(motion.div)`
  position: relative;
`;

const Arrow = styled(motion.div)`
  position: absolute;
  top: -20px;
  right: 230px;
  width: 0;
  height: 0;
  border-bottom: 20px solid ${vocaColors.addVoca.cardsBgColor};
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
`;
