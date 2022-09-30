import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Table from "../components/Table";
import { OpenSvg } from "../assets/svg/RootSvg";
import VocaTable from "../components/VocaTable";

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
  /* background-color: ${(props) => props.theme.colorTheme.buttonPrimary}; */
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

const Overlay = styled(motion.div)`
  width: 100vw;
  height: 100%;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

interface IVocaDetail {
  data: number[];
  voca: string;
}
export default function VocaDetail({ data, voca }: IVocaDetail) {
  const [id, setId] = useState<string | null>(null);

  return (
    <Wrapper>
      <DetailWrapper>
        <Title>{voca}</Title>
        <VocaCardWrapper>
          {data.map((n, idx) => (
            <VocaCard key={n + ""} layoutId={n + ""}>
              <CheckBox>
                <input type="checkbox" value="None" id={n + ""} name="check" />
                <label htmlFor={n + ""}></label>
              </CheckBox>
              <LevelBox>
                <ContentTitle>{voca}</ContentTitle>
                <Level>Level : {idx + 1}</Level>
              </LevelBox>
              <VocaContentBox>
                <Table />
              </VocaContentBox>
              <SvgBox onClick={() => setId(n + "")}>
                <OpenSvg width="20" height="20" />
              </SvgBox>
            </VocaCard>
          ))}
        </VocaCardWrapper>
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
                width: 400,
                height: 400,
                top: "100px",
              }}
            >
              <Title>Level : 3</Title>
              <VocaTable />
            </VocaCard>
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}
