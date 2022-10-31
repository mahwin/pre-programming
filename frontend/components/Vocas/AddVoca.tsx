import styled from "styled-components";
import { FolderOpenSvg, LoadingSvg } from "@svg";
import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { IState } from "../../redux/initialState";
import useMutation from "@utils/useMutation";

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
  background-color: #fff;
  height: 120px;
  width: 200px;
  border-radius: 3px;
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
  border: none;
  background-color: transparent;
  :hover {
    transform: scale(1.2);
    div {
      background-color: darkgray;
    }
  }
`;

const Bar = styled.div`
  position: absolute;
  border: none;
  width: 15px;
  height: 3px;
  transform: rotate(45deg);
  background-color: black;
  &:nth-child(2) {
    transform: rotate(135deg);
  }
`;

const CardContents = styled.div`
  h3 {
    padding: 5px;
    font-size: 16px;
    font-weight: 600;
    margin-top: 8px;
    text-align: center;
    color: black;
  }
  p {
    text-align: center;
    color: #8a81bd;
    font-weight: 600;
    margin-top: 10px;
  }
  h2 {
    text-align: center;
    font-weight: 600;
    margin-top: 10px;
    font-size: 36px;
    p {
      display: block;
      height: 100%;
      margin-top: 24px;
      color: black;
      font-size: 14px;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const CardContentBox = styled.div``;

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
  closed: { display: "none", opacity: 0, y: 20, transition: { duration: 0.1 } },
};

interface IAddVoca {
  cardData:
    | {
        amount: string;
        frequency: string;
      }[]
    | null;
  category: string;
  selected: boolean[];
  resetSelected: () => void;
  onClickCheck: (e: any) => void;
}

export default function AddVaca({
  cardData,
  selected,
  category,
  resetSelected,
  onClickCheck,
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
    const len = selected.length;
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
            {selected?.map(
              (voca, idx) =>
                voca && (
                  <Card variants={cardVariants} key={idx + ""}>
                    <CancleBtnBox onClick={onClickCheck} id={idx + ""}>
                      <Bar />
                      <Bar />
                    </CancleBtnBox>
                    <CardContents>
                      <h3>Level {idx}</h3>
                      <Grid>
                        <CardContentBox>
                          <p>
                            <small>
                              <b>words</b>
                            </small>
                          </p>

                          <h2>
                            <b>{cardData?.[idx - 1].amount}</b>
                          </h2>
                        </CardContentBox>
                        <CardContentBox>
                          <p>
                            <small>
                              <b>frequency</b>
                            </small>
                          </p>
                          <h2>
                            <p>{cardData?.[idx - 1].frequency} 이상</p>
                          </h2>
                        </CardContentBox>
                      </Grid>
                    </CardContents>
                  </Card>
                )
            )}
          </Cards>
        </div>
      </Board>
    </Wrapper>
  );
}
