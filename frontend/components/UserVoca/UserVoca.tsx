import styled from "styled-components";
import { useEffect, useState } from "react";
import { FolderSvg, FolderOpenSvg, LoadingSvg } from "@svg";
import { motion, Variants } from "framer-motion";
import chunk from "@utils/chunk";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  h1 {
    margin-bottom: 20px;
    font-size: 24px;
    color: ${(props) => props.theme.colorTheme.textPrimary};
  }
`;

const VocaWrapper = styled.div`
  max-width: ${(props) => props.theme.windowSize.tablet};
  width: 100%;
  padding: 30px;
  background-color: white;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  margin-bottom: 50px;
`;

const VocaCard = styled(motion.div)`
  width: 100%;
  height: 100px;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #949fb0;
  font-weight: 500;
  span {
    display: block;
  }
  :hover {
    transform: scale(1.05);
    background-color: #1abc9c;
    transition: all 0.1s ease-in-out;
    cursor: pointer;
  }
`;

const Center = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 5px 0px;
`;

const Column = styled.div``;

const Overray = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    padding: 15px 10px;
    background-color: #4a5568;
    border-radius: 10px;
    display: flex;
    align-items: center;
    height: 30px;
    p {
      font-size: 16px;
      font-weight: 600;
      color: white;
    }
  }
`;

const Board = styled(motion.div)`
  grid-column: 5/1;
  position: relative;
  width: 100%;
  height: 120px;
  background-color: #333a45;
`;

const Arrow = styled(motion.div)`
  position: absolute;
  width: 0;
  height: 0;
  bottom: -20px;
  border-bottom: 20px solid #333a45;
  border-right: 20px solid transparent;
  border-left: 20px solid transparent;
`;

const Row = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  display: grid;
  gap: 20px;
  margin-bottom: 20px;
  grid-template-columns: repeat(4, 1fr);
  :last-child {
    margin-bottom: 0px;
  }
`;

const ArrowVariants: Variants = {
  open: { opacity: 1, transition: { delay: 0.2, duration: 1 } },
  closed: {
    opacity: 0,
    transition: { delay: 0.05, duration: 0.1 },
  },
};

const BoardVariants: Variants = {
  open: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      type: "linear",
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
  closed: {
    clipPath: "inset(10% 50% 90% 50%)",
    display: "none",
    transition: {
      type: "linear",
      bounce: 0,
      duration: 0.3,
      display: {
        delay: 0.3,
      },
    },
  },
};

interface IProps {
  title: string;
  ok: boolean;
  amount: string;
  install: string;
}

export default function UserVoca({ data }: { data: IProps[] }) {
  const [clickId, setClickId] = useState<string | null>(null);
  const [clickedRow, setClickedRow] = useState<string | null>(null);
  const [rowData, setRowData] = useState<IProps[][] | null>(null);
  const [userVocaData, setUserVocaData] = useState<any>(null);
  const {
    loading,
    data: userInfo,
    error,
  } = useSelector((state: any) => {
    state.userReducer;
    return state.user;
  });
  const router = useRouter();

  useEffect(() => {
    if (error) router.push("singIn");
  }, [loading, error]);
  useEffect(() => {
    if (userInfo) {
      axios
        .post(`${process.env.API_HOST}/vocas/me`, {
          userId: userInfo.id,
        })
        .then((res) => res.data)
        .then((data) => setUserVocaData(data));
    }
  }, [userInfo]);
  console.log(userVocaData);

  const handleClick = (e: any) => {
    const [tag, row] = e.target.id.split("|");
    console.log(tag, row);
    if (clickId === tag) {
      setClickedRow(null);
      return setClickId(null);
    }
    setClickId(tag);
    setClickedRow(row);
  };

  useEffect(() => {
    setRowData(chunk(data, 4));
  }, [data]);

  return (
    <Wrapper>
      <h1>Saved Vocabulary</h1>
      <VocaWrapper>
        {rowData?.map((data, rowIdx) => (
          <>
            <Row key={rowIdx}>
              {data.map((item, colIdx) => (
                <>
                  <VocaCard
                    id={item.title + "|" + rowIdx}
                    key={item.title}
                    style={{
                      backgroundColor:
                        clickId === item.title ? "#00b894" : "#949fb0",
                    }}
                    onClick={handleClick}
                  >
                    {!item.ok && (
                      <Overray>
                        <div>
                          <p>Not Yet</p>
                        </div>
                      </Overray>
                    )}
                    <Column>
                      <span>{item.title}</span>
                      <Center>
                        {clickId === item.title ? (
                          <FolderOpenSvg />
                        ) : (
                          <FolderSvg />
                        )}
                      </Center>
                    </Column>
                    <Arrow
                      variants={ArrowVariants}
                      animate={clickId === item.title ? "open" : "closed"}
                    />
                  </VocaCard>
                </>
              ))}
              <Board
                variants={BoardVariants}
                animate={clickedRow === rowIdx + "" ? "open" : "closed"}
              />
            </Row>
          </>
        ))}
      </VocaWrapper>
    </Wrapper>
  );
}
