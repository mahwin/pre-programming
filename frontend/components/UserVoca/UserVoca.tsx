import styled from "styled-components";
import { Fragment, useEffect, useState } from "react";
import { FolderSvg, FolderOpenSvg, XMarkSvg, FrownSvg } from "@svg";
import { motion, Variants } from "framer-motion";
import chunk from "@utils/chunk";
import { camelCaserHeadLower } from "@utils/camelCaser";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { userVocasActions } from "redux/userVocas/userVocasSlice";
import { vocasActions } from "redux/vocas/vocasSlice";
import LevelCard from "./LevelCard";
import VocaTable from "./VocaTable";

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
  div {
    pointer-events: none;
  }
`;

const Center = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 5px 0px;
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h1 {
    color: white;
    font-weight: 500;
  }
`;

const Overray = styled.div`
  pointer-events: none;
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

const Board = styled(motion.ul)`
  grid-column: 5/1;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #333a45;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoardItemWrapper = styled.div`
  padding: 24px;
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(4, 1fr);
`;

const XBtnBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  right: 5px;
  top: 5px;
  transition: all ease 2s;
  :hover {
    cursor: pointer;
    transform: rotate(180deg);
  }
`;

const Arrow = styled(motion.div)`
  position: absolute;
  width: 0;
  height: 0;
  top: 105px;
  border-bottom: 18px solid #333a45;
  border-right: 18px solid transparent;
  border-left: 18px solid transparent;
  :hover {
    transition: none;
  }
`;

const Row = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  :last-child {
    margin-bottom: -20px;
  }
`;

const ArrowVariants: Variants = {
  open: {
    opacity: 1,
    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
    transition: { delay: 0.2, duration: 1 },
  },
  closed: {
    opacity: 0,
    clipPath: "polygon(50% 100%, 0% 100%, 100% 100%)",
    transition: { delay: 0.05, duration: 0.1 },
  },
};

const BoardVariants: Variants = {
  smallOpen: {
    clipPath: "inset(0% 0% 0% 0%)",
    height: "120px",
    marginBottom: "20px",
    transition: {
      type: "linear",
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
  normalOpen: {
    clipPath: "inset(0% 0% 0% 0%)",
    height: "240px",
    marginBottom: "20px",
    transition: {
      type: "linear",
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
  bigOpen: {
    clipPath: "inset(0% 0% 0% 0%)",
    height: "360px",
    marginBottom: "20px",
    transition: {
      type: "linear",
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
  closed: {
    clipPath: "inset(0% 0% 100% 0%)",
    height: "0px",
    transition: {
      type: "linear",
      bounce: 0,
      duration: 0.3,
    },
  },
};

interface IProps {
  title: string;
  ok: boolean;
  amount: string;
  install: string;
}

type categoriesType =
  | "next"
  | "react"
  | "reactHookForm"
  | "reactQuery"
  | "reactRedux"
  | "reactRouter"
  | "recoil"
  | "styledComponents"
  | "tailwindcss"
  | "axios";

const categories = [
  "next",
  "react",
  "reactHookForm",
  "reactQuery",
  "reactRedux",
  "reactRouter",
  "recoil",
  "styledComponents",
  "tailwindcss",
  "axios",
];

interface IWord {
  word: string;
  mean: string;
  frequency: string;
}

interface ITmp {
  data: number[] | null;
  len: number;
}

interface IuserVocaData {
  [key: string]: ITmp | null;
}

interface IclickedVoca {
  next?: string[];
  react?: string[];
  reactHookForm?: string[];
  reactQuery?: string[];
  reactRedux?: string[];
  reactRouter?: string[];
  recoil?: string[];
  styledComponents?: string[];
  tailwindcss?: string[];
  axios?: string[];
}

export default function UserVoca({ baseData }: { baseData: IProps[] }) {
  const [clickId, setClickId] = useState<string | null>(null);
  const [clickedRow, setClickedRow] = useState<string | null>(null);
  const [rowData, setRowData] = useState<IProps[][] | null>(null);
  const [userVocaData, setUserVocaData] = useState<IuserVocaData | null>(null);
  const [clickedVoca, setClickedVoca] = useState<IclickedVoca>({});

  //유저 정보 없으면 로그인 페이지
  const userInfo = useSelector((state: any) => {
    state.userReducer;
    return state.user;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userVocasActions.getUserVocas());
  }, [userInfo.data, dispatch]);

  const router = useRouter();
  useEffect(() => {
    if (userInfo.error && !userInfo.data)
      router.push("http://localhost:3001/signIn");
  }, [userInfo, router]);

  //유저가 저장한 보카 목록 불러오기 ,항상 다시 불러옴
  const userVocas = useSelector((state: any) => {
    state.userVocasReducer;
    return state.userVocas;
  });

  //전체 보카 데이터 없으면 api 콜
  const vocas = useSelector((state: any) => {
    return state.vocas;
  });
  useEffect(() => {
    if (!vocas.data) {
      dispatch(vocasActions.getVocas());
    }
  }, [vocas, dispatch]);

  useEffect(() => {
    setRowData(chunk(baseData, 4));
  }, [baseData]);

  useEffect(() => {
    if (vocas.data && userVocas.data) {
      let userSavedData: IuserVocaData = {};
      for (let category of categories) {
        let savedData = userVocas.data[category];
        if (savedData) {
          let tmp = JSON.parse(userVocas.data[category]);
          userSavedData[category] = { data: tmp, len: tmp.length };
        } else {
          userSavedData[category] = { data: null, len: 0 };
        }
      }
      setUserVocaData(userSavedData);
    }
  }, [vocas.data, userVocas.data]);

  const handleClickOpen = (e: any) => {
    const [tag, row] = e.target.id.split("|");
    setClickId(camelCaserHeadLower(tag));
    setClickedRow(row);
  };

  const handleClickClose = () => {
    setClickId(null);
    setClickedRow(null);
  };

  const handleClickCard = (e: any) => {
    const [category, level] = e.currentTarget.id.split("|");
    let copy = clickedVoca[category as categoriesType] || [];
    if (copy.includes(level)) {
      copy = copy.filter((item) => level !== item);
    } else {
      copy.push(level);
    }
    setClickedVoca((prev) => ({ ...prev, [category]: copy }));
  };

  return (
    <>
      <Wrapper>
        <h1>Saved Vocabulary</h1>
        <VocaWrapper>
          {rowData?.map((data, rowIdx) => (
            <Row key={rowIdx} initial={false}>
              {data.map((item, colIdx) => (
                <Fragment key={item.title}>
                  {clickId !== null ? (
                    <VocaCard
                      initial={false}
                      id={item.title + "|" + rowIdx}
                      onClick={handleClickClose}
                      style={
                        clickId === camelCaserHeadLower(item.title)
                          ? {
                              backgroundColor: "#00b894",
                              opacity: 1,
                            }
                          : {
                              backgroundColor: "#949fb0",
                              opacity: 0.5,
                              pointerEvents: "none",
                            }
                      }
                      whileHover={
                        clickId === camelCaserHeadLower(item.title)
                          ? { cursor: "pointer" }
                          : { cursor: "none" }
                      }
                    >
                      {!item.ok && (
                        <Overray>
                          <div>
                            <p>Not Yet</p>
                          </div>
                        </Overray>
                      )}
                      <Column>
                        <span>
                          {item.title}
                          {userVocaData &&
                            " (" +
                              userVocaData?.[camelCaserHeadLower(item.title)]
                                ?.len +
                              ")"}
                        </span>
                        <Center>
                          {clickId === camelCaserHeadLower(item.title) ? (
                            <FolderOpenSvg />
                          ) : (
                            <FolderSvg />
                          )}
                        </Center>
                      </Column>
                      <Arrow
                        initial={false}
                        variants={ArrowVariants}
                        animate={
                          clickId === camelCaserHeadLower(item.title)
                            ? "open"
                            : "closed"
                        }
                      />
                    </VocaCard>
                  ) : (
                    <VocaCard
                      initial={false}
                      whileHover={
                        item.ok
                          ? {
                              scale: 1.05,
                              transition: { duration: 0.2 },
                              cursor: "pointer",
                            }
                          : {}
                      }
                      style={{ pointerEvents: item.ok ? "auto" : "none" }}
                      id={item.title + "|" + rowIdx}
                      onClick={handleClickOpen}
                    >
                      {!item.ok && (
                        <Overray>
                          <div>
                            <p>Not Yet</p>
                          </div>
                        </Overray>
                      )}
                      <Column>
                        <span>
                          {item.title}
                          {userVocaData &&
                            " (" +
                              userVocaData?.[camelCaserHeadLower(item.title)]
                                ?.len +
                              ")"}
                        </span>
                        <Center>
                          {clickId === item.title ? (
                            <FolderOpenSvg />
                          ) : (
                            <FolderSvg />
                          )}
                        </Center>
                      </Column>
                      <Arrow
                        initial={false}
                        variants={ArrowVariants}
                        animate={clickId === item.title ? "open" : "closed"}
                      />
                    </VocaCard>
                  )}
                </Fragment>
              ))}
              <Board
                key={rowIdx}
                initial={false}
                variants={BoardVariants}
                animate={
                  clickedRow === rowIdx + ""
                    ? (userVocaData?.[clickId as string]?.len as number) <= 4
                      ? "smallOpen"
                      : (userVocaData?.[clickId as string]?.len as number) <= 8
                      ? "normalOpen"
                      : "bigOpen"
                    : "closed"
                }
              >
                <XBtnBox onClick={handleClickClose}>
                  <XMarkSvg width="18" height="18" color="white" />
                </XBtnBox>
                <BoardItemWrapper>
                  {userVocas.data && clickId && (
                    <>
                      {userVocas.data[clickId] ? (
                        JSON.parse(userVocas?.data[clickId]).map(
                          (level: string) => (
                            <LevelCard
                              isClick={
                                clickedVoca?.[
                                  clickId as categoriesType
                                ]?.includes("" + level) || false
                              }
                              key={level}
                              amount={
                                vocas.data.category[clickId].level[level].length
                              }
                              onClickCard={handleClickCard}
                              level={level}
                              category={clickId}
                            />
                          )
                        )
                      ) : (
                        <div style={{ gridColumn: "5/1" }}>
                          <Column style={{ marginTop: "20px" }}>
                            <FrownSvg width="80" height="80" color="white" />
                            <h1>Empty</h1>
                          </Column>
                        </div>
                      )}
                    </>
                  )}
                </BoardItemWrapper>
              </Board>
            </Row>
          ))}
        </VocaWrapper>
        {clickedVoca && vocas.data && (
          <VocaTable clickedVoca={clickedVoca} vocas={vocas.data} />
        )}
      </Wrapper>
    </>
  );
}
