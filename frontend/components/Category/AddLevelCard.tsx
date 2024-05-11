import styled from "styled-components";
import { FolderOpenSvg, LoadingSvg } from "@svg";
import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { IState } from "@redux/initialState";
import useMutation from "@hooks/useMutation";
import { vocaColors } from "@color/vocaColors";
import { LevelCard } from "./LevelCard";
import { LevelCardInfo } from "./type";
import { CategoriesType } from "@type/commons/categories";

import { isNil } from "@utils/typeGuard";

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

interface Props {
  category: CategoriesType;
  selectedCard: boolean[];
  handleResetSelected: () => void;
  handleClickCheck: (e: React.MouseEvent<HTMLInputElement>) => void;
  levelCardInfos: LevelCardInfo[];
}

export function AddLevelCard({
  category,
  levelCardInfos,
  selectedCard,
  handleResetSelected,
  handleClickCheck,
}: Props) {
  const [boardOpen, setBoardOpen] = useState<boolean>(false);

  const [saveLevelCard, { loading, data: savedResponse, error }] = useMutation(
    `/vocas/${category}`
  );

  const handleClickBoardButton = () => {
    setBoardOpen((prev) => !prev);
  };

  const userId = useSelector((state: IState) => {
    return state.user.data?.id;
  });

  const router = useRouter();

  const onClickSaved = () => {
    //로그인한 유저가 아닐 경우 로그인 페이지로
    if (isNil(userId)) {
      alert("단어장을 저장하기 위해서는 로그인이 필요합니다.");
      router.push("/signIn");
      return;
    }

    const levels: number[] = [];

    levelCardInfos.forEach((l, level) => {
      if (l) levels.push(level + 1);
    });

    //선택한 단어장이 없으면 동작 x
    if (levels.length === 0) {
      alert("내 단어장에 포함될 단어 카드를 선택해 주세요.");
    }
    saveLevelCard({ userId, level: levels });
  };

  useEffect(() => {
    if (savedResponse?.ok) {
      handleResetSelected();
      setBoardOpen(false);
    }
  }, [savedResponse]);

  return (
    <Wrapper>
      <ButtonBox>
        <Button
          onClick={handleClickBoardButton}
          whileTap={{ scale: 0.97 }}
          style={{ backgroundColor: boardOpen ? "#00b894" : "#949fb0" }}
        >
          <p>CARD</p>
          <FolderOpenSvg />
        </Button>
        <Button onClick={onClickSaved} whileTap={{ scale: 0.97 }}>
          {loading ? <LoadingSvg color="white" /> : "단어장에 저장"}
        </Button>
      </ButtonBox>
      <Board animate={boardOpen ? "open" : "closed"}>
        <div>
          <Arrow
            variants={ArrowVariants}
            animate={boardOpen ? "open" : "closed"}
          />
          <Cards
            variants={cardsVariants}
            style={{
              pointerEvents: boardOpen ? "auto" : "none",
            }}
          >
            {selectedCard.map((visible, idx) => (
              <LevelCard
                key={idx}
                {...{ visible, levelCardInfos, idx, handleClickCheck }}
              />
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
