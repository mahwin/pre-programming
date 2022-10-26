import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Table from "@components/voca/Table";
import { OpenSvg } from "@svg";
import VocaTable from "@components/voca/VocaTable";
import AddVoca from "./AddVoca";

const Wrapper = styled.div`
  width: 100vw;
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

const VocaCard = styled(motion.div)`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  background-color: #485460;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const VocaContentBox = styled.div`
  overflow: hidden;
  border-radius: 5px;
  margin-bottom: 20px;
  border: 1px solid #dfe6e9;
`;

const ContentTitle = styled.h3`
  color: #dfe6e9;
  font-size: ${(props) => props.theme.fontSize.base};
  font-weight: ${(props) => props.theme.fontWeight.xbold};
`;

const LevelBox = styled.div`
  justify-content: center;
  align-items: center;
  width: 50%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const SvgBox = styled.div`
  cursor: pointer;
  position: absolute;
  right: 10px;
  bottom: 10px;
`;

const CheckBox = styled.div`
  position: relative;
  margin: 10px auto;
  label {
    width: 20px;
    height: 20px;
    cursor: pointer;
    background-color: #dfe6e9;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(top, #222 0%, #45484d 100%);
    border-radius: 4px;
    box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5),
      0px 1px 0px rgba(255, 255, 255, 0.4);
    &:after {
      content: "";
      width: 9px;
      height: 5px;
      position: absolute;
      top: 4px;
      left: 4px;
      border: 3px solid #485460;
      border-top: none;
      border-right: none;
      background: transparent;
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
  color: #dfe6e9;
  font-size: ${(props) => props.theme.fontSize.base};
  font-weight: ${(props) => props.theme.fontWeight.xbold};
`;

const ModalTitleBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 300px;
  padding: 10px 8px 24px 8px;
  justify-content: space-around;
`;

const ModalLevel = styled(Level)`
  text-align: center;
  margin-top: 5px;
`;

const Button = styled.button`
  width: 100%;
  height: 30px;
  color: whitesmoke;
  border: none;
  background-color: #00b894;
  border-radius: 5px;
  &:hover {
    box-shadow: 0 0 0 2px white, 0 0 0 3px #27ae60;
  }
`;

const Overlay = styled(motion.div)`
  width: 100vw;
  height: 100%;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

interface IVocaItem {
  [key: string]: {
    mean: string;
    word: string;
    frequency: string;
  }[];
}

interface IVocaDetail {
  voca: IVocaItem;
  category: string;
}

interface ICard {
  amount: string;
  frequency: string;
}

export default function VocaDetail({ voca, category }: IVocaDetail) {
  console.log(voca);
  const [id, setId] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<boolean[]>(
    Array.from({ length: 10 }, () => false)
  );
  const [total, setTotal] = useState<number>(0);
  const [cardData, setCardData] = useState<ICard[] | null>(null);

  useEffect(() => {
    const levelArr = Object.keys(voca);
    setTotal(levelArr.length);
    let baseData: ICard[] = [];
    levelArr.forEach((level: string) => {
      const item = voca[level];
      let tmp = {
        amount: item.length + "",
        frequency: item[Math.round(item.length / 2)].frequency,
      };
      baseData.push(tmp);
    });
    setCardData(baseData);
  }, [voca]);

  const onResetSelected = () => {
    setSelectedCard(Array.from({ length: 10 }, () => false));
  };

  const onClickCheck = (e: any) => {
    const voca = Number(e.currentTarget.id || e.currentTarget.name);
    const copyVocas = [...selectedCard];
    copyVocas[voca] = !copyVocas[voca];
    setSelectedCard(copyVocas);
  };
  return (
    <Wrapper>
      <DetailWrapper>
        <Title>{category}</Title>
        <VocaCardWrapper>
          {Object.keys(voca).map((level: string) => (
            <VocaCard key={level + ""} layoutId={level + ""}>
              <CheckBox>
                <input
                  onChange={onClickCheck}
                  type="checkbox"
                  value="None"
                  id={level + ""}
                  name="check"
                  checked={selectedCard[+level]}
                />
                <label htmlFor={level + ""}></label>
              </CheckBox>
              <LevelBox>
                <ContentTitle>{category}</ContentTitle>
                <Level> Level : {level}</Level>
              </LevelBox>
              <VocaContentBox>
                {cardData && (
                  <Table cardData={cardData?.[+level]} total={total} />
                )}
              </VocaContentBox>
              <SvgBox onClick={() => setId(level + "")}>
                <OpenSvg width="20" height="20" />
              </SvgBox>
            </VocaCard>
          ))}
        </VocaCardWrapper>
        <AddVoca
          category={category}
          cardData={cardData}
          selected={selectedCard}
          resetSelected={onResetSelected}
          onClickCheck={onClickCheck}
        />
      </DetailWrapper>
      <AnimatePresence>
        {id ? (
          <Overlay
            onClick={() => setId(null)}
            initial={{ backgroundColor: "rgba(0,0,0,0)" }}
            animate={{ backgroundColor: "rgba(0,0,0,0.7)" }}
            exit={{ backgroundColor: "rgba(0,0,0,0)" }}
          >
            <VocaCard
              layoutId={id + ""}
              style={{
                position: "fixed",
                width: 600,
                height: 500,
                top: "80px",
                zIndex: 100,
              }}
            >
              <ModalTitleBox>
                <ModalLevel style={{ color: "white" }}>Level : {id}</ModalLevel>
                <Button name={id + ""} onClick={onClickCheck}>
                  {selectedCard[+id] ? "해제" : "추가"}
                </Button>
              </ModalTitleBox>
              <VocaTable voca={voca[+id]} />
            </VocaCard>
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}
