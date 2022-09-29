import styled from "styled-components";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  margin-bottom: 20px;
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
  gap: 20px;
`;

const VocaCard = styled(motion.div)`
  height: 30vh;
  width: 100%;
  border-radius: 5px;
  background-color: blue;
  cursor: pointer;
`;

const Overlay = styled(motion.div)`
  width: 100vw;
  height: 300vh;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function VocaDetail() {
  const [id, setId] = useState<string | null>(null);
  const router = useRouter();
  console.log(router.query);
  return (
    <Wrapper>
      <DetailWrapper>
        <Title>{router.query.voca}</Title>
        <VocaCardWrapper>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <VocaCard
              key={n + ""}
              layoutId={n + ""}
              onClick={() => setId(n + "")}
            />
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
                height: 300,
                top: "100px",
              }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}
